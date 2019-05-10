project.directive('shopproducts', function () {

    var controller = ['$scope','services', function ($scope,services) {
        services.req("GET","api/home").then(function(data){
            $scope.products = data;
            $scope.numPerPage = 4;
            $scope.currentPage = 1;
            $scope.filteredproducts = $scope.products.slice(0, 4);
            $scope.filteredProducts = {};
            $scope.pageChanged = function () {
                var startPos = ($scope.currentPage - 1) * 4;
                $scope.filteredproducts = $scope.products.slice(startPos, startPos + 4);
            };
        });
        
        
    }],

    template = ` <div class="container py-xl-5 py-lg-3">
    <h3 class="tittle text-center text-uppercase text-white font-weight-bold mb-sm-5 mb-4">Filtered products</h3>
    <div class="row box2" id="home_products" >
    <div class='col-md-3 col-6 s-1' ng-repeat="r in filteredproducts">
        <a href="#/shop/{{r.product_code}}">
            <div class='view view-fifth'>
                <i class='fas fa-home'></i>
                <div class='mask'>
                    <h4 id='individual_card' name='{{r.product_code}}'>{{r.product_name}}   {{r.price}}€<p id='{{r.product_code}}' class='like'>❤</p></h4>
                </div>
            </div>
        </a>
        </div></div></div>
    </div>
    <div id="pager">
        <uib-pagination class="pagination" 
            total-items="products.length" 
            ng-model="currentPage"
            ng-change="pageChanged()" 
            previous-text="&lsaquo;" 
            next-text="&rsaquo;" 
            items-per-page="numPerPage"
        />
    </div>`;

    return {
        restrict: 'EA', //Default in 1.3+
        scope: {},
        controller: controller,
        template: template
    };

});