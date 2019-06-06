// MODULE
var project = angular.module('project', ['ngRoute', 'toastr', 'ui.bootstrap']);

// CONF
project.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'frontend/modules/home/view/home.view.html',
            controller: 'homeCtrl',
            resolve: {
                products: function (services) {
                    return services.req("GET", "api/home");
                }
            }
        })

        .when('/shop', {
            templateUrl: 'frontend/modules/shop/view/shop.view.html',
            controller: 'shopCtrl',
            resolve: {
                products: function (services) {
                    return services.req("GET", "api/home");
                }
            }
        })
        .when('/shop/:id', {
            templateUrl: 'frontend/modules/shop/view/details.view.html',
            controller: 'shopDetailCtrl',
            resolve: {
                detailsproduct: function (services, $route) {
                    console.log($route.current.params.id);
                    return services.req("GET", "api/home/product_code--" + $route.current.params.id);
                },
            }
        })

        .when('/contactus', {
            templateUrl: 'frontend/modules/contactus/view/contactus.view.html',
            controller: 'contactusCtrl'
        })

        .when('/login', {
            templateUrl: 'frontend/modules/login/view/login.view.html',
            controller: 'loginCtrl'
        })

        .when('/register', {
            templateUrl: 'frontend/modules/login/view/register.view.html',
            controller: 'registerCtrl'
        })

        .when('/confirmaccount/:username/:token', {
            resolve: {
                confiracc: function (services, $route, toastr) {
                    return services.req("POST", "api/login/username--" + $route.current.params.username, { op: "enableaccount", token: $route.current.params.token }).then(function (response) {
                        response = JSON.parse(JSON.stringify(response));
                        console.log(response);
                        if (response == "true") {
                            toastr.success("Your account has been activated succesfully.", "Enjoy!");
                        } else {
                            toastr.error("Something went wrong.", "Error");
                        }
                        location.href = "#/";
                    });
                }
            }
        })

        .when('/logout', {
            resolve: {
                logout: function (services, toastr, $rootScope) {
                    return services.req("DELETE", "api/login").then(function (data) {
                        data = JSON.parse(data);
                        if (data) {
                            toastr.success("Logged out");
                        } else {
                            toastr.error("Something went wrong", "Error");
                        }
                        location.href = "#/";
                        $rootScope.loggeduser = false;
                    });
                }
            }
        })

        .when('/recoverPassword/:token', {
            templateUrl: 'frontend/modules/login/view/recoverpass.view.html',
            controller: 'recoverCtrl',
            resolve: {
                token: function ($route) {
                    return $route.current.params.token;
                }
            }
        })

        .when('/profile', {
            templateUrl: 'frontend/modules/profile/view/profile.view.html',
            controller: 'profileCtrl',
            resolve: {
                userdata: function (services) {
                    return services.req("POST", "api/login", { op: "loggeduser" });
                }
            }
        })
        .when('/cart', {
            templateUrl: 'frontend/modules/cart/view/cart.view.html',
            controller: 'cartCtrl',
            resolve: {
                usercart: function (services,) {
                    return services.req("POST", "api/login", { op: "loggeduser" }).then(function (userinfo) {
                        return services.req("GET", "api/cart/user--" + userinfo.data[0].ID);
                    });
                }
            }

        })
        .otherwise("/", {
            templateUrl: 'frontend/modules/home/view/home.view.html',
            controller: 'homeCtrl',
            resolve: {
                products: function (services) {
                    return services.req("GET", "api/home");
                }
            }
        });

}]); // end app.config

project.run(function (services, $rootScope, toastr) {

    // when the route changes
    $rootScope.$on("$routeChangeSuccess", function () {

        // autodetect logged user
        $rootScope.login_card = {};
        services.req("POST", "api/login", { op: "loggeduser" }).then(function (data) {
            console.log(data);            

            if (data == '"token expired"') {

                $rootScope.loggeduser = false;
                location.href = "#/login";
                toastr.warning("Please log in again.", "Session expired");

            } else if (data == "false") {

                $rootScope.loggeduser = false;

            } else {
                // ng-show
                $rootScope.loggeduser = true;
                // user data
                $rootScope.login_card['username'] = data['data'][0]['username'];
                $rootScope.login_card['img'] = data['data'][0]['img'];
            }

        });

    });

    //

});

// TODO: remove consoles.log/error_log all website