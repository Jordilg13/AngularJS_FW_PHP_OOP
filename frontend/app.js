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
        
        .when('/contactus', {
			templateUrl	: 'frontend/modules/contactus/view/contactus.view.html',
			controller 	: 'contactusCtrl'
        })
        
        .when('/api', {
			templateUrl	: 'backend',
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
