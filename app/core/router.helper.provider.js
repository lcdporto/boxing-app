(function() {
    'use strict';

    angular
    .module('app.core')
    .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        '$urlMatcherFactoryProvider',
        '$locationProvider'];

    /* @ngInject */
    function routerHelperProvider(
        $stateProvider,
        $urlRouterProvider,
        $urlMatcherFactoryProvider,
        $locationProvider) {

        /* jshint validthis:true */
        this.$get = RouterHelper;

        // enabling the html5Mode will get rid of the urls with
        // the fragment hash, so we go from the ugly http://www.domain.com/#/list
        // to the nicer http://www.domain.com/list
        // for more information: https://docs.angularjs.org/api/ng/provider/$locationProvider
        $locationProvider.html5Mode(true);
        $urlMatcherFactoryProvider.strictMode(false);

        RouterHelper.$inject = ['$state'];

        /* @ngInject */
        function RouterHelper($state) {
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {

                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });

                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() {
                return $state.get();
            }
        }
    }

})();
