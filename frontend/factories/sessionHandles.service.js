project.factory("sessionHandler", ['services', function (services) {
    var obj = {};
    
    obj.get = function(namevar) {
        return services.req("GET","backend/utils/getSession.php",{sessionvar: namevar});
    };
    
    return obj;
}]);
