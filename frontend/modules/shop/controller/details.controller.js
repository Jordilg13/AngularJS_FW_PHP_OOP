project.controller('shopDetailCtrl', function ($scope,detailsproduct) {
    $scope.product = {};

    angular.forEach(detailsproduct[0],function(value,key){
        console.log(key);
        $scope.product[key] = value;
    });
    
});