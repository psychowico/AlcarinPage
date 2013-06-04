'use strict';

namespace('Admin.Angular', function(exports, Alcarin) {
  $.fn.editable.defaults.ajaxOptions = {
    type: 'put',
    dataType: 'json'
  };
  return angular.module('ng-x-editable').directive('ngXEditable', function() {
    return {
      restrict: 'A',
      scope: {
        options: "&ngXEditable"
      },
      link: function($scope, element, attrs) {
        var options, _success;
        options = $scope.options();
        if (options.success) {
          _success = options.success;
          options.success = function(response, newVal) {
            if ($scope.$$phase) {
              return _success(response, newVal);
            } else {
              return $scope.$apply(function() {
                return _success(response, newVal);
              });
            }
          };
        }
        return element.editable(options);
      }
    };
  });
});
