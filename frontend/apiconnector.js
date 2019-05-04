project.factory("services", ['$http','$q', function ($http, $q) {
    var obj = {};

    obj.get = function (modulee, functi) {

        var defered=$q.defer();
        var promise=defered.promise;

        $http({
              method: 'GET',
              url: "api/"+modulee
          }).success(function(data, status, headers, config) {
             defered.resolve(data);
          }).error(function(data, status, headers, config) {
             defered.reject(data);
          });

        return promise;
    };


}]);
