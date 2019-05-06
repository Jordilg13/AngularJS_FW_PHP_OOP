project.controller('homeCtrl', function ($scope,products) {
   $scope.products = products;
   $scope.numPerPage = 4;
   $scope.currentPage = 1;

   $scope.filteredproducts = $scope.products.slice(0, 4);
   $scope.pageChanged = function() {
      var startPos = ($scope.currentPage - 1) * 4;
      $scope.filteredproducts = $scope.products.slice(startPos, startPos + 4);
  };
  console.log(products);

});
