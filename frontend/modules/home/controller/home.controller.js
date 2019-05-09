project.controller('homeCtrl', function ($scope, products) {
   
   // pagination
   $scope.products = products;
   $scope.numPerPage = 4;
   $scope.currentPage = 1;
   $scope.filteredproducts = $scope.products.slice(0, 4);
   $scope.filteredProducts = {};
   $scope.pageChanged = function () {
      var startPos = ($scope.currentPage - 1) * 4;
      $scope.filteredproducts = $scope.products.slice(startPos, startPos + 4);
   };

   // var searched = {product_code: "", product_name: "", available_until:""};
   // autocomplete
   console.log(Object.keys($scope.filteredProducts).length);

   var filteredArray = [];
   $scope.complete = function (searched, event) {
      var id = event.target.id;
      var output = [];
      searched['product_code'] = searched['product_code'] || "";
      searched['product_name'] = searched['product_name'] || "";
      searched['available_until'] = searched['available_until'] || "";
      console.log(searched);
   
      
      if (Object.keys($scope.filteredProducts).length == 0) {
         $scope.filteredProducts[id] = products;
      } else {
         $scope.filteredProducts[id] = filteredArray;
         filteredArray = [];
      }

      // angular.forEach($scope.filteredProducts[id],function(product){
      //    if (product[id].toLowerCase().startsWith(searched[id])) {
      //       filteredArray.push(product);
      //       output.push(product[id]);
      //    }
      // });

      angular.forEach(products,function(product){
         if (product['product_code'].toLowerCase().startsWith(searched['product_code'].toLowerCase()) &&
            product['product_name'].toLowerCase().startsWith(searched['product_name'].toLowerCase()) &&
            product['available_until'].toLowerCase().startsWith(searched['available_until'].toLowerCase())) {
               filteredArray.push(product);
               output.push(product[id]);
         }
      });
      console.log(filteredArray);

      $scope.filteredProducts[id] = output;

   }
   $scope.fillTextbox = function (string, event) {
      var id = event.target.parentNode.parentNode.children[0].id;
      $scope.searched[id] = string;
      $scope.filteredProducts[id] = null;
   }


});
