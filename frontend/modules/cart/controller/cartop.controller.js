/**
 * controller for all operations made out of the cart page
 * 
 * Working in home, shop and details
 *
 */
project.controller('cartop', function ($scope,services,toastr,$rootScope, CommonService) {
    $rootScope.cart_num_prod = 0;

    /**
     * set the number of products in the cart, in the cart icon
     * the user must be logged
     *
     */
    services.req("POST","api/login",{op: "loggeduser"}).then(function(data){
        data = CommonService.tryToParseJSON(data);
            
        
        if (data != false && data != 'token expired') {
            
            services.req("GET", "api/cart/user--" + data.data[0].ID).then(function(usercartload){
                var actualcant = 0;
                $rootScope.cart_num_prod = 0;
                usercartload.forEach(function (value, index, array) {
                    actualcant = parseInt(value.cant);
                    $rootScope.cart_num_prod += actualcant;
                });
                
            });
        }
    });
    
    /**
     * add the clicked product in the cart
     *
     * @param object prod
     */
    $scope.addToCart = function(prod){
        try {
            if (prod.r) {
                prod = prod.r;
            }
        } catch (error) {}
        
        var cant = 1;

        /**
         * the user must be logged
         */
        services.req("POST","api/login",{op: "loggeduser"}).then(function(data){
            data = CommonService.tryToParseJSON(data);
            
            if (data != false) {
                // get the cart of the user
                services.req("GET","api/cart/user--"+data.data[0].ID+"/id_prod--"+prod.product_code).then(function(reqprod){

                    if (reqprod.length == 0) {
                        var prodata = {
                            data:{
                                price: prod.price,
                                user: data.data[0].ID,
                                id_prod: prod.product_code,
                                cant: cant,
                                img: prod.img        
                        }};
                        // it adds the product to the cart
                        services.req("POST","api/cart",prodata).then(function(data){
                            if (data) {
                                toastr.success("Item added to cart succesfully.","Congratulations");
                                $rootScope.cart_num_prod++;
                            }
                        });
                    } else { // if the item is already in cart, the quantity is increased by 1
                        cant = parseInt(reqprod[0].cant)+1;
                        var prodata = {
                            data:{
                                price: prod.price,
                                user: data.data[0].ID,
                                id_prod: prod.product_code,
                                cant: cant,
                                img: prod.img        
                        }};
                        // quntity increase by 1
                        services.req("PUT","api/cart/user--"+data.data[0].ID+"/id_prod--"+prod.product_code,prodata).then(function(putdata){
                            data = CommonService.tryToParseJSON(data);

                            if (putdata) {
                                toastr.success("Item quantity increased succesfully.","Congratulations");
                                $rootScope.cart_num_prod++;
                            } else {
                                toastr.error("Something went wrong.","Error");
                            }
                        });
                    }
                    
                });

                
            } else { // if not logged
                location.href = "#/login";
                toastr.warning("Login if you want to add something to the cart.","Error");
            }

            
        });
        
        
        
    }
})
