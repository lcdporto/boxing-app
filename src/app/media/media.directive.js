(function () {
    'use strict';

    angular
        .module('app.media')
        .directive('mediaAutoUpload', MediaDirective);

    /* @ngInject */
    function MediaDirective($parse) {
        return {
            require: '?ngModel',
            link: function (scope, element, attributes) {
                var getter = $parse(attributes.ngModel);
                var setter = getter.assign;
                var $scope = scope;
                $scope.$watch(attributes.ngModel, function () {
                    var file = getter($scope);
                    if (
                        file &&
                        typeof file == 'object' &&
                        (file instanceof File || file instanceof Blob)
                    ) {
                        var promise = $scope.$Media.upload(file);
                        setter($scope, promise);
                        promise.then(function (data) {
                            setter($scope, data);
                        }, function (data) {
                            setter($scope, data);
                        });
                    }
                });
            }
        };
    }
})();