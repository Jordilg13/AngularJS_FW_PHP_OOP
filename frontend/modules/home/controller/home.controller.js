project.controller('homeCtrl', function ($scope, $location, products, services) {
   $scope.filteredProducts = {};
   // autocomplete (this should be a directive, but it has problems with the behavior of the products directive, and i haven't enough time to fix it)
   var filteredArray = [];

   /**
    * autocompletes the product names, the brand and the available date
    * 3 fields are dependents of each others
    *
    * @param string searched
    * @param angularjs_event_object event
    */
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

      angular.forEach(products,function(product){
         if (product['product_code'].toLowerCase().startsWith(searched['product_code'].toLowerCase()) &&
            product['product_name'].toLowerCase().startsWith(searched['product_name'].toLowerCase()) &&
            product['available_until'].toLowerCase().startsWith(searched['available_until'].toLowerCase())) {
               filteredArray.push(product);
               output.push(product[id]);
         }
      });

      $scope.filteredProducts[id] = output;
   }

   /**
    * fill the inputtext with the clicked value of the suggested values
    *
    * @param string string
    * @param angularjs_event_object event
    */
   $scope.fillTextbox = function (string, event) {
      var id = event.target.parentNode.parentNode.children[0].id;
      $scope.searched[id] = string;
      $scope.filteredProducts[id] = null;

      $scope.closesuggestions = false;
      $scope.closesuggestions2 = false;
      $scope.closesuggestions3 = false;
   }



   /**
    * search in the product database from the ones that match with the specified values
    * if there is only one product, it redirects the client to the details page
    *
    * @param string searched
    */
   $scope.searchButton = function(searched){
      if (searched) {
         var postdata = {sessionvar: "home_search_params", home_search_params: searched};
         services.req("POST","backend/utils/session/setSession.php",postdata).then(function(data){
            if (JSON.parse(data) == "setted") {
               location.href = "#/shop";
            }
         });   
      }
   }

});
