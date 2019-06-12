project.factory("autocomplete", [function () {
    var obj = {};

    obj.checkElement = function(products,id,searched){
        var filteredProducts = [];

        angular.forEach(products, function (product) {
            if (product[id].toLowerCase().startsWith(searched[id])) {
                filteredProducts.push(product);
            }
        });

        return filteredProducts;

    };


    return obj;
}]);
