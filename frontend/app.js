// MODULE
var project = angular.module('project', ['ngRoute']);
// CONF
project.config(['$routeProvider', function ($routeProvider) {$routeProvider

        .when('/', {
			templateUrl	: 'frontend/modules/home/view/home.view.html',
			controller 	: 'homeCtrl'
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
            templateUrl: "frontend/modules/home/view/home.view.html", 
            controller: "homeCtrl"
        });
    }]);
