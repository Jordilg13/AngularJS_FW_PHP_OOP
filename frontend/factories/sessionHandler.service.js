project.factory("sessionHandler", ['services', function (services) {
    var obj = {};
    
    /**
     * get the session value of the passed name of var($_SESSION[namevar])
     *
     * @param string namevar
     * @returns Promise
     */
    obj.get = function(namevar) {
        return services.req("GET","backend/utils/getSession.php",{sessionvar: namevar});
    };
    
    return obj;
}]);
