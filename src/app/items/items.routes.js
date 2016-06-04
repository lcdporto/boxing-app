(function () {
    'use strict';

    angular
        .module('app.items')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'itemsList',
                config: {
                    url: '/items',
                    templateUrl: 'app/items/views/items.list.view.html',
                    controller: 'ItemsListController',
                    controllerAs: 'vm',
                    resolve: {
                        /* @ngInject */
                        items: function (ItemsTable, $rootScope) {
                            var params = $rootScope.lastSearch || {};
                            return ItemsTable.$search(params).$then(function (items) {
                                return items;
                            }).$promise;
                        },
                        /* @ngInject */
                        categories: function (CategoriesTable) {
                            return CategoriesTable.$search().$then(function (categories) {
                                return categories;
                            }).$promise;
                        },
                        /* @ngInject */
                        containers: function (ContainersTable) {
                            return ContainersTable.$search().$then(function (containers) {
                                return containers;
                            }).$promise;
                        }
                    }
                }
            },
            {
                state: 'itemDetails',
                config: {
                    url: '/items/:id',
                    templateUrl: 'app/items/views/items.item.details.view.html',
                    controller: 'ItemDetailsController',
                    controllerAs: 'vm',
                    resolve: {
                        /* @ngInject */
                        item: function (ItemsTable, $stateParams, $state, $mdToast) {
                            return ItemsTable.$find($stateParams.id).$then(function (item) {
                                return item;
                            }, function () {
                                $mdToast.show($mdToast.simple().textContent('Item not found!'));
                                $state.go('itemsList');
                            }).$promise;
                        }
                    }
                }
            }
        ];
    }

})();
