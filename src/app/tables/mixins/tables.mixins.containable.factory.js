(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('MixinContainable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod, $injector) {

        function recordLoad(record, key, config, additionalFilters) {
            additionalFilters = additionalFilters || {};

            function recordLoadBelongsTo(table) {
                record['$' + key] = table.$new();
                record.$then(function () {
                    record['$' + key].$pk = record[config.foreignKey];
                    record['$' + key].$fetch();
                });
            }

            function recordLoadHasMany(table) {
                record['$' + key] = table.$collection(additionalFilters);
                record.$then(function () {
                    record['$' + key].$params[config.foreignKey] = record.$pk;
                    record['$' + key].$fetch();
                });
            }

            var loader = false;
            switch (config.type) {
                case 'belongsTo':
                    loader = recordLoadBelongsTo;
                    break;
                case 'hasMany':
                    loader = recordLoadHasMany;
                    break;
                default:
                    throw new Error('Unknown contain type "' + config.type + '" for MixinContainable');
            }

            loader.$inject = [config.table];
            $injector.invoke(loader);

            return record;
        }

        function collectionLoad(collection, key, config, additionalFilters) {
            additionalFilters = additionalFilters || {};

            function collectionLoadBelongsTo(table) {
                collection.$then(function () {
                    var keys = collection.map(function (obj) {
                        return obj[config.foreignKey];
                    });

                    var request = table.$search({
                        'id__in': keys.join(',')
                    }).$then(function (data) {
                        var objsById = {};
                        angular.forEach(data, function (respObj) {
                            objsById[respObj.$pk] = respObj;
                        });

                        angular.forEach(collection, function (item) {
                            item['$' + key] = objsById[item[config.foreignKey]];
                        });
                    });
                    angular.forEach(collection, function (item) {
                        item['$' + key] = request;
                    });
                    collection['$' + key] = request;
                });
            }

            function collectionLoadHasMany(table) {
                var fieldName = config.foreignKey;
                collection['$' + key] = table.$collection(additionalFilters);
                collection.$then(function () {
                    collection['$' + key].$params[fieldName] = collection.$pk;
                    collection['$' + key].$fetch();
                });
            }

            var loader = false;
            switch (config.type) {
                case 'belongsTo':
                    loader = collectionLoadBelongsTo;
                    break;
                case 'hasMany':
                    loader = collectionLoadHasMany;
                    break;
                default:
                    throw new Error('Unknown contain type "' + config.type + '" for MixinContainable');
            }

            loader.$inject = [config.table];
            $injector.invoke(loader);

            return collection;
        }

        function getModelConfigs(model, relatedModel) {
            var contains = model.$type.getProperty('contains');
            if (contains && contains[relatedModel]) {
                var config = angular.copy(contains[relatedModel]);
                config['filters'] = config['filters'] || {};
                return config;
            } else {
                throw new Error('Cannot find MixinContainable configs for ' + model);
            }
        }

        return restmod.mixin({
            $extend: {
                Collection: {
                    $load: function (relatedModel, additionalFilters) {
                        var configs = getModelConfigs(this, relatedModel);
                        additionalFilters = angular.extend(configs.filters, additionalFilters);
                        return collectionLoad(this, relatedModel, configs, additionalFilters);
                    }
                },
                Record: {
                    $load: function (relatedModel, additionalFilters) {
                        var configs = getModelConfigs(this, relatedModel);
                        additionalFilters = angular.extend(configs.filters, additionalFilters);
                        return recordLoad(this, relatedModel, configs, additionalFilters);
                    }
                }
            }
        });
    }
})();
