(function () {
    'use strict';

    angular
        .module('app.tables')
        .factory('OffersTable', RestmodFactory);

    /* @ngInject */
    function RestmodFactory(restmod) {
        var offerStates = {
            Draft: 1,
            InPayment: 2,
            Open: 3,
            Full: 4,
            Progress: 5,
            Completed: 6,
            Contentious: 7,
            Processed: 8,
            Canceled: 9
        };
        offerStates.Active = [offerStates.Open, offerStates.Full, offerStates.Progress];
        offerStates.InConstruction = [offerStates.Draft, offerStates.InPayment];

        var stateIsFuncs = {};
        angular.forEach(offerStates, function (id, name) {
            stateIsFuncs['$is' + name] = function () {
                if (angular.isArray(id)) {
                    return (id.indexOf(this.state) !== -1);
                } else {
                    return (this.state === id);
                }
            };
            stateIsFuncs['$set' + name] = function () {
                if (!angular.isArray(id)) {
                    this.state = id;
                }
            };
        });

        return restmod.model('/job_offers').mix('MixinContainable', {
            'hourRate': {
                decode: function (value) {
                    return Number(value);
                }
            },
            $config: {
                contains: {
                    company: {
                        type: 'belongsTo',
                        table: 'CompaniesTable',
                        foreignKey: 'company'
                    },
                    location: {
                        type: 'belongsTo',
                        table: 'LocationsTable',
                        foreignKey: 'location'
                    },
                    category: {
                        type: 'belongsTo',
                        table: 'CategoriesTable',
                        foreignKey: 'category'
                    },
                    applications: {
                        type: 'hasMany',
                        table: 'OfferApplicationsTable',
                        foreignKey: 'job_offer'
                    },
                    selectedApplications: {
                        type: 'hasMany',
                        table: 'OfferApplicationsTable',
                        foreignKey: 'job_offer',
                        filters: {
                            'is_selected': 'True'
                        }
                    },
                    workingShifts: {
                        type: 'hasMany',
                        table: 'WorkingShiftsTable',
                        foreignKey: 'job_offer'
                    }
                }
            },
            $extend: {
                Model: {
                    states: offerStates
                },
                Record: stateIsFuncs
            }
        });
    }
})();