/**
 * like controller for the operations that doesn't occur in like page
 * working in home, shop and details
 *
 */
project.controller('likesop', function ($scope,services, CommonService,toastr) {
    console.log("likesopctrl");
    $scope.hasLike = false;
    $scope.classLikeBtn = "btn btn-default";

    /**
     * add the clicked product to likes
     *
     * @param object prod
     */
    $scope.addLike = function(prod) {
        try { // this adapt the variable depending on if is clicked in shop or in details
            if (prod.r) {
                prod = prod.r;
            }
        } catch (error) {}
        services.req("POST", "api/login", { op: "loggeduser" }).then(function (userinfo) {
            userinfo = CommonService.tryToParseJSON(userinfo);
            
            if (userinfo) {
                services.req("POST","api/likes",{data:{user_l: userinfo.data[0].ID,product_code:prod.product_code}}).then(function(data){
                    data = CommonService.tryToParseJSON(data);
                    
                    if (data) {
                        toastr.success("Product added to likes.","Done");
                        $scope.classLikeBtn = "btn btn-danger";
                    } 
                },function(){  // remove like
                    services.req("DELETE","api/likes/user_l--"+userinfo.data[0].ID+"/product_code--"+prod.product_code)
                    toastr.success("Product removed from favorites","Okay");
                    $scope.classLikeBtn = "btn btn-default";
                });
            } else {
                toastr.warning("Login if you want to add something to favs.","Not logged");
                location.href = "#/login";
            }
            
        });
    }

    /**
     * set the like button red when the product is already in user's likes
     * checked when the element is used
     * it uses the onready directive
     *
     * @param object prod
     */
    $scope.checkLike = function(prod) {
        services.req("POST", "api/login", { op: "loggeduser" }).then(function (userinfo) {
            userinfo = CommonService.tryToParseJSON(userinfo);
            if (userinfo) {
                services.req("GET","api/likes/user_l--"+userinfo.data[0].ID+"/product_code--"+prod.product_code).then(function(data){
                    if (data.length > 0) {
                        $scope.classLikeBtn = "btn btn-danger";
                    }
                });
            }
        });
    }
})