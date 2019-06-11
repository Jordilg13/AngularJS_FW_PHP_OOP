project.controller('likesop', function ($scope,services, CommonService,toastr) {
    console.log("likesopctrl");
    $scope.hasLike = false;
    $scope.classLikeBtn = "btn btn-default";

    $scope.addLike = function(prod) {
        try {
            if (prod.r) {
                prod = prod.r;
            }
        } catch (error) {}
        services.req("POST", "api/login", { op: "loggeduser" }).then(function (userinfo) {
            userinfo = CommonService.tryToParseJSON(userinfo);
            console.log(userinfo);
            
            if (userinfo) {
                services.req("POST","api/likes",{data:{user_l: userinfo.data[0].ID,product_code:prod.product_code}}).then(function(data){
                    console.log(data);
                    data = CommonService.tryToParseJSON(data);
                    
                    if (data) {
                        toastr.success("Product added to likes.","Done");
                        $scope.classLikeBtn = "btn btn-danger";
    
                    } 
                },function(){  // remove like
                    services.req("DELETE","api/likes/user_l--"+userinfo.data[0].ID+"/product_code--"+prod.product_code)
                    toastr.success("Product removed from favorites","Okay");
                    $scope.classLikeBtn = "btn btn-default";
                }
                    
                );
            } else {
                toastr.warning("Login if you want to add something to favs.","Not logged");
                location.href = "#/login";
            }
            
        });
    }

    // set the like button red when the product is already in user's likes
    $scope.checkLike = function(prod) {
        console.log(prod);
        services.req("POST", "api/login", { op: "loggeduser" }).then(function (userinfo) {
            services.req("GET","api/likes/user_l--"+userinfo.data[0].ID+"/product_code--"+prod.product_code).then(function(data){
                if (data.length > 0) {
                    $scope.classLikeBtn = "btn btn-danger";
                }
            });
        });
        
        
    }
    
})