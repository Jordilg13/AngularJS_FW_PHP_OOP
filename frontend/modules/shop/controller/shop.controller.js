project.controller('shopCtrl', function ($scope, products, services) {
   $scope.filteredProducts = {};
   // filtered products if session has parameters
   services.req("POST", "backend/utils/session/getSession.php", { sessionvar: "home_search_params" }).then(function (data) {
      // data = JSON.parse(data);
      if (typeof data == "object") {
         var urltopost = "";
         for (const key in data) {
            urltopost += key+"--"+data[key]+"!/";
         }
         console.log(urltopost);
         services.req("POST", "backend/utils/session/clearSession.php",{sessionvar: "home_search_params"}).then(function(){});

         services.req("GET","api/home/"+urltopost).then(function(getproducts){
            console.log(getproducts);
            setTimeout(function(){
               $scope.products = getproducts;
               $scope.numPerPage = 4;
               $scope.currentPage = 1;
               $scope.filteredProducts = {};
               $scope.filteredproducts = $scope.products.slice(0, 4);
               $scope.pageChanged = function () {
                  var startPos = ($scope.currentPage - 1) * 4;
                  $scope.filteredproducts = $scope.products.slice(startPos, startPos + 4);
               };
            },400);

            
         })
      }
   });



   // autocomplete
   var filteredArray = [];
   $scope.complete = function (searched, event) {
      var id = event.target.id;
      var output = [];
      // set 3 keys before being evaluated by the if inside the foreach(searched isn't initialized with 3 keys, they'll are dynamicaly added)
      searched['product_code'] = searched['product_code'] || "";
      searched['product_name'] = searched['product_name'] || "";
      searched['available_until'] = searched['available_until'] || "";


      if (Object.keys($scope.filteredProducts).length == 0) {
         $scope.filteredProducts[id] = products;
      } else {
         $scope.filteredProducts[id] = filteredArray;
         filteredArray = [];
      }

      angular.forEach(products, function (product) {
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

      $scope.closesuggestions = false;
      $scope.closesuggestions2 = false;
      $scope.closesuggestions3 = false;
   }

});
