/**
 * compare the value of the element with other, until they're equals
 * 
 * @example
 * <input ng-model="registerdata.password" type="password"/>
 * <input compare-to="registerdata.password" type="password"/>
 */
project.directive('compareTo', function() {
    return {
        require: 'ngModel',
        scope: {

        reference: '=compareTo'

        },
        link: function(scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue, $scope) {

            var noMatch = viewValue != scope.reference
            ctrl.$setValidity('noMatch', !noMatch);
            return (noMatch)?noMatch:!noMatch;
        });

        scope.$watch("reference", function(value) {;
            ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

        });
        }
    }
});
