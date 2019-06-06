project.controller('cartCtrl', function ($scope,usercart,services,toastr, $rootScope) {
    $scope.cartproducts = usercart;
    console.log("cart ctrl");
    console.log(usercart);
    
    $scope.totalprice = 0;
    // $scope.totalprice = parseInt();
    // calculate totalprice of existing products
    for (let i = 0; i < $scope.cartproducts.length; i++) {
        console.log($scope.cartproducts[i]);
        $scope.totalprice += $scope.cartproducts[i].cant * $scope.cartproducts[i].price;
    }
    
    // increase or decrease product
    $scope.incDecQ = function(product,op){
        product.cant = parseInt(product.cant);
        if (op == "i") {
            product.cant += 1;  
            product.price = parseInt(product.price); 
            $scope.totalprice += product.price;
            $rootScope.cart_num_prod++;
        } else {
            if (product.cant > 1) {
                product.cant -= 1;
                $scope.totalprice -= product.price;
                $rootScope.cart_num_prod--;
            } else {
                toastr.error("Isn't possible still decreasing the quantity.","Error");
            }
        }
        services.req("PUT","api/cart/user--"+product.user+"/id_prod--"+product.id_prod,{data: product});
        console.log($scope.cartproducts);
    }

    $scope.removeFromCart = function(product){
        for (let i = 0; i < $scope.cartproducts.length; i++) {
            if ($scope.cartproducts[i].id_prod == product.id_prod && $scope.cartproducts[i].user == product.user) {
                console.log($scope.cartproducts[i]);
                $scope.cartproducts.splice(i,1);
                $scope.totalprice -= product.price*product.cant;
                $rootScope.cart_num_prod -= product.cant;
            }

        }
        services.req("DELETE","api/cart/user--"+product.user+"/id_prod--"+product.id_prod,{data: product});
    }

    $scope.checkOut = function(){
        
    }
   


});