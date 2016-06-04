(function (angular) {
    'use strict';

    angular.module('app').config(Config);

    /* @ngInject */
    function Config($provide) {

        $provide.decorator('ngModelDirective', function ($delegate) {
            var directive = $delegate[0];
            var shouldSetBlurUpdateEvent = function (nodeName, inputType) {
                // The blur event is only really applicable to input controls so
                // we want to stick with the default events for selects, checkboxes & radio buttons
                return nodeName.toLowerCase() === 'textarea' ||
                    (nodeName.toLowerCase() === 'input' &&
                    inputType.toLowerCase() !== 'checkbox' &&
                    inputType.toLowerCase() !== 'radio');
            };

            // save a reference to the original compile function
            var compileFn = directive.compile;

            directive.compile = function () {

                var link = compileFn.apply(this, arguments);

                return {
                    pre: function ngModelPostLink(scope, element, attr, ctrls) {
                        if (angular.isDefined(attr.autoSave)) {
                            if (!ctrls[2]) {
                                ctrls[2] = {};
                            }

                            var ngModelOptions = ctrls[2];

                            if (angular.isUndefined(ngModelOptions.$options) && shouldSetBlurUpdateEvent(element[0].nodeName, element[0].type)) {
                                ngModelOptions.$options = {
                                    updateOn: 'default blur',
                                    debounce: {'default': 1000, 'blur': 0},
                                    updateOnDefault: true
                                };
                            }
                        }

                        link.pre.apply(this, arguments);
                    },
                    post: link.post
                };
            };

            return $delegate;
        });

    }

}(angular));