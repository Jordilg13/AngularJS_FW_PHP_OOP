project.factory("loginFunctions", ['$http','$q', function (services) {

    var obj = {};
    
    obj.getLoggedUser = function() {
        return services.req("GET","backend/utils/getSession.php",{sessionvar: "logged_user"});
    };
    
    return obj;
}]);
