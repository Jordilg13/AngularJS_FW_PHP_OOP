/**
 * execute the specified function when the element is ready
 *
 * 
 * @example <h1 elem-ready="functioname()">Title ready</h1>
 */
project.directive( 'elemReady', function( $parse ) {
    return {
        restrict: 'A',
        link: function( $scope, elem, attrs ) {    
           elem.ready(function(){
             $scope.$apply(function(){
                 var func = $parse(attrs.elemReady);
                 func($scope);
             })
           })
        }
     }
 })