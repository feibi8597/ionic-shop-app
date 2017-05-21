/**
 * Created by toothless on 2017/4/27.
 */
module.exports = function (m) {
  m.directive('repeat', [
    function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
          console.log(ctrl);
          if(ctrl) {
            var otherInput = element.inheritedData('$formController')[attrs.repeat];
            var repeatValidator = function (value) {
              var validity = value === otherInput.$viewValue;
              ctrl.$setValidity("repeat", validity);
              return validity ? value : undefined;
            };
            ctrl.$parsers.push(repeatValidator);
            ctrl.$formatters.push(repeatValidator);
            otherInput.$parsers.push(function (value) {
              ctrl.$setValidity("repeat", value === ctrl.$viewValue);
              return value;
            });
          }
        }
      };
    }
  ]);
};
