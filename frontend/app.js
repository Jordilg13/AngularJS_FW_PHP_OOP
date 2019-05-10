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
