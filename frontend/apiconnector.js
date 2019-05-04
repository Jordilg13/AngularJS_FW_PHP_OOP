project.factory("services", ['$http','$q', function ($http, $q) {
    var obj = {};

    obj.req = function (type,url,data = {}) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http({
              method: type,
              url: url,
              data: data
          }).success(function(data, status, headers, config) {
             defered.resolve(data);
          }).error(function(data, status, headers, config) {
             defered.reject(data);
          });
        return promise;
    };


}]);
