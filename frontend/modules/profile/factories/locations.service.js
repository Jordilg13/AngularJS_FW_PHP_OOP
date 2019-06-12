project.factory("locat", ['services',function (services) {
    var obj = {};

    obj.getProvinces = function(filename){
        return services.req("GET", "frontend/assets/resources/countries/" + filename + ".json")
    };


    return obj;
}]);
