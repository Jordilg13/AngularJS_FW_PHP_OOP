project.controller('cartop', function ($scope,services,toastr,$rootScope) {
    $rootScope.cart_num_prod = 0;

    services.req("POST","api/login",{op: "loggeduser"}).then(function(data){
        if (data != "false") {
            
            services.req("GET", "api/cart/user--" + data.data[0].ID).then(function(usercartload){
                var actualcant = 0;
                $rootScope.cart_num_prod = 0;
                usercartload.forEach(function (value, index, array) {
                    actualcant = parseInt(value.cant);
                    $rootScope.cart_num_prod += actualcant;
                });
                
                // $rootScope.cart_num_prod = usercartload.length;
            });
        }
    });
    

    $scope.addToCart = function(prod){
        try {
            if (prod.r) {
                prod = prod.r;
            }
        } catch (error) {
            
        }
        
        var cant = 1;
        services.req("POST","api/login",{op: "loggeduser"}).then(function(data){
            try { // parse if request doesn't return a parsed object
                data = JSON.parse(data);
            } catch (error) {}
            
            console.log(data);
            if (data != false) {

                services.req("GET","api/cart/user--"+data.data[0].ID+"/id_prod--"+prod.product_code).then(function(reqprod){
                    console.log(reqprod);
                    if (reqprod.length == 0) {
                        var prodata = {
                            data:{
                                price: prod.price,
                                user: data.data[0].ID,
                                id_prod: prod.product_code,
                                cant: cant,
                                img: prod.img        
                        }};
                        console.log(prodata);
                        
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
                        
                        services.req("PUT","api/cart/user--"+data.data[0].ID+"/id_prod--"+prod.product_code,prodata).then(function(putdata){
                            try { // parse if request doesn't return a parsed object
                                data = JSON.parse(data);
                            } catch (error) {}

                            if (putdata) {
                                toastr.success("Item quantity increased succesfully.","Congratulations");
                                $rootScope.cart_num_prod++;
                            } else {
                                toastr.error("Something went wrong.","Error");
                            }
                        });
                    }
                    
                });

                
            } else {
                location.href = "#/login";
                toastr.warning("Login if you want to add something to the cart.","Error");
            }

            
        });
        
        
        
    }
})
