(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('ItemsTable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod) {
        return restmod.model('/items').mix('MixinContainable', {
            $config: {
                contains: {
                    category: {
                        type: 'belongsTo',
                        table: 'CategoriesTable',
                        foreignKey: 'category'
                    },
                    container: {
                        type: 'belongsTo',
                        table: 'ContainersTable',
                        foreignKey: 'container'
                    },
                    images: {
                        type:'hasMany',
                        table: 'MediaTable',
                        foreignKey: 'item'
                    }
                }
            }
        });
    }
})();
