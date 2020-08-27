(function() {
    "use strict";
    angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .component("foundItems", {
        bindings: {
            foundItems: "<",
            onRemove: "&"
        },
        controller: "NarrowItDownController as narrow",
        templateUrl: "foundItems.html"
    });

    NarrowItDownController.$inject = [ "MenuSearchService" ];
    function NarrowItDownController(MenuSearchService) {
        var narrow = this;
        narrow.searchTerm = "";
        narrow.getFoundItems = function() {
            var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
            promise.then(function(result) {
                narrow.foundItems = result;
            });
        };
        narrow.removeItem = function(itemIndex) {
            narrow.foundItems.splice(itemIndex, 1);
        };
    }
    
    MenuSearchService.$inject = [ "$http" ];
    function MenuSearchService($http) {
        var service = this;
        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function(result) {
                var foundItems = [];
                if (searchTerm == "") {
                    return [];
                }
                for (var item in result.data.menu_items) {
                    var menu_item = result.data.menu_items[item];
                    if (menu_item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(menu_item);
                    }
                }
                return foundItems;
            });
        };
    }
})();