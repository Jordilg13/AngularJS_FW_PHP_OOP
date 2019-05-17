project.factory("loginFunctions", ['$http','$q', function (services) {
    var obj = {};
    
    obj.getUserToken = function() {
        services.req("GET","").then(function(){

        });
    };

    return obj;
}]);
