project.controller('cartCtrl', function ($scope, usercart, services, toastr, $rootScope,previousCart, CommonService, $route) {
    $scope.cartproducts = usercart;
    $scope.lastPurchase = previousCart; // last purchase table
    $scope.showLastP = true;
  
    $scope.totalprice = 0;
    // calculate totalprice of existing products
    for (let i = 0; i < $scope.cartproducts.length; i++) {
        $scope.totalprice += $scope.cartproducts[i].cant * $scope.cartproducts[i].price;
    }


    /**
     * increase or decrease the quantity of a product depending of op
     * value "i" means increase, any other means decrease
     * Min value = 1
     *
     * @param object product
     * @param string op
     */
    $scope.incDecQ = function (product, op) {
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
                toastr.error("Isn't possible still decreasing the quantity.", "Error");
            }
        }
        services.req("PUT", "api/cart/user--" + product.user + "/id_prod--" + product.id_prod, { data: product });
    }

    /**
     * delete a product from the user's cart
     *
     * @param object product
     */
    $scope.removeFromCart = function (product) {
        for (let i = 0; i < $scope.cartproducts.length; i++) {
            if ($scope.cartproducts[i].id_prod == product.id_prod && $scope.cartproducts[i].user == product.user) {
                $scope.cartproducts.splice(i, 1);
                $scope.totalprice -= product.price * product.cant;
                $rootScope.cart_num_prod -= product.cant;
            }

        }
        services.req("DELETE", "api/cart/user--" + product.user + "/id_prod--" + product.id_prod, { data: product });
    }

    /**
     * insert user's cart into purchases and deletes products of cart
     *
     */
    $scope.checkOut = function () {
        
        services.req("POST", "api/cart", { checkout: true, cart: $scope.cartproducts }).then(function (data) {
            data = CommonService.tryToParseJSON(data);

            if (data) {
                toastr.success("Purchase made succesfully.","Congratulations");
                $scope.totalprice = 0;
                $rootScope.cart_num_prod = 0;
                $scope.cartproducts = {};
                $scope.showLastP = false;

            } else {
                toastr.error("Something went wrong","Error");
            }
        });

    }

    $scope.reload = function(){
        $route.reload();
    }

    /**
     * removes all cart products
     *
     */
    $scope.clearCart = function(){
        services.req("POST", "api/login", { op: "loggeduser" }).then(function (userinfo) {
            services.req("DELETE", "api/cart/user--"+ userinfo.data[0].ID).then(function(data){
                data = CommonService.tryToParseJSON(data);
                
                if (data) {
                    toastr.success("All products removed");
                    $rootScope.cart_num_prod = 0;
                    $route.reload();
                } else {
                    toastr.error("We can't clear your cart, please try again.")
                }
            });
        });
    }


});