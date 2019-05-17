// MODULE
var project = angular.module('project', ['ngRoute','toastr','ui.bootstrap']);

// CONF
project.config(['$routeProvider', function ($routeProvider) {$routeProvider

        .when('/', {
			templateUrl	: 'frontend/modules/home/view/home.view.html',
            controller 	: 'homeCtrl',
            resolve: {
                products: function (services) {
                    return services.req("GET","api/home");
                }
            }
        })

        .when('/shop', {
			templateUrl	: 'frontend/modules/shop/view/shop.view.html',
			controller 	: 'shopCtrl',
            resolve: {
                products: function (services) {
                    return services.req("GET","api/home");
                }
            }
        })
        .when('/shop/:id', {
			templateUrl	: 'frontend/modules/shop/view/details.view.html',
			controller 	: 'shopDetailCtrl',
            resolve: {
                detailsproduct: function (services,  $route) {
                    console.log($route.current.params.id);
                    return services.req("GET","api/home/product_code-"+$route.current.params.id);
                },
            }
        })
        
        .when('/contactus', {
			templateUrl	: 'frontend/modules/contactus/view/contactus.view.html',
			controller 	: 'contactusCtrl'
        })

        .when('/login', {
			templateUrl	: 'frontend/modules/login/view/login.view.html',
        })

        .when('/register', {
			templateUrl	: 'frontend/modules/login/view/register.view.html',
			controller 	: 'registerCtrl'
        })
        
        .when('/confirmaccount/:username/:token', {
			resolve: {
                confiracc: function(services, $route,toastr){
                    return services.req("POST","api/login/username-"+$route.current.params.username,{op: "enableaccount", token: $route.current.params.token}).then(function(response){
                        response=JSON.parse(JSON.stringify(response));
                        console.log(response);
                        if (response == "true") {
                            toastr.success("Your account has been activated succesfully.","Enjoy!");
                            location.href="#/";
                        } else {
                            toastr.error("Something went wrong.","Error");
                            location.href="#/";
                        }
                    });
                }
            }
        })


 
        .otherwise("/", {
            templateUrl	: 'frontend/modules/home/view/home.view.html',
            controller 	: 'homeCtrl',
            resolve: {
                products: function (services) {
                    return services.req("GET","api/home");
                }
            }
        });
    }]);
