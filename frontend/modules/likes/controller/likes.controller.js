project.controller('likesCtrl', function ($scope, userlikes, services, CommonService, toastr, $route) {
    $scope.therearentlikes = true;
    $scope.showProd = true;

    // if the user hasn't likes, 
    if (userlikes.length > 0) {
        $scope.therearentlikes = false;
    }
    $scope.products = userlikes;

    /**
     * remove the clicked products from the user's favs 
     *
     * @param object prod
     */
    $scope.removeLike = function (prod) {
        console.log(prod);

        services.req("POST", "api/login", { op: "loggeduser" }).then(function (userinfo) {
            services.req("DELETE", "api/likes/user_l--" + userinfo.data[0].ID + "/product_code--" + prod.product_code).then(function (data) {
                data = CommonService.tryToParseJSON(data);
                if (data) {
                    toastr.success("Product removed from favorites");
                    $route.reload();
                } else {
                    toastr.error("We can't remove your product from favorites, please try again.")
                }
            });
        })
    }

    /**
     * remove all likes of user
     *
     */
    $scope.removeAll = function(){
        services.req("POST", "api/login", { op: "loggeduser" }).then(function (userinfo) {
            services.req("DELETE", "api/likes/user_l--"+ userinfo.data[0].ID).then(function(data){
                data = CommonService.tryToParseJSON(data);
                
                if (data) {
                    toastr.success("All products removed");
                    $route.reload();
                } else {
                    toastr.error("We can't remove your products from favorites, please try again.")
                }
            });
        });
    }

})