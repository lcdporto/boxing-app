(function () {
    'use strict';

    angular
            .module('app')
            .service('ItemsService', function () {

                var items = [
                    {
                        name: "Alicate",
                        img: "http://www.ferramentaskennedy.com.br/loja/fotos/alicate-universal-8-200mm-isolado-8280-200-iox-gedore.jpg",
                        Box: {
                            name: 'Box 1',
                            Container: {
                                name: 'Container 1'
                            }
                        }
                    },
                    {
                        name: "Arduino",
                        img: "https://content.solarbotics.com/products/photos/a0266346bdc1b2028b4066554730ddfa/lrg/50450-IMG_5222.jpg",
                        Box: {
                            name: 'Box 1',
                            Container: {
                                name: 'Container 1'
                            }
                        }
                    },
                    {
                        name: "Vassoura",
                        img: "http://www.isthmus.com.br/lojaflex/imagem/imagem_produtos/1_Vassoura-Voadora-Modelo-Rustico.jpg",
                        Box: {
                            name: 'Box 1',
                            Container: {
                                name: 'Container 1'
                            }
                        }
                    }
                ];
                
               
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(item) {
                        var lowercaseItem = angular.lowercase(item.name);
                        return (lowercaseItem.indexOf(lowercaseQuery) !== -1);
                    };
                }

                this.find = function (name) {
                    if (name) {
                        return items.filter(createFilterFor(name));
                    } else {
                        return items;
                    }
                };

                this.view = function (id) {
                    for (var i in items) {
                        if (items[i].id == id) {
                            return items[i];
                        }
                    }
                };
            });
})();