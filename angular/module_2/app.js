(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController (ShoppingListCheckOffService){
		var buyCtrl = this;

		buyCtrl.toBuy = ShoppingListCheckOffService.getToBuyItems();
		buyCtrl.buy = function(itemIndex){
			ShoppingListCheckOffService.buy(itemIndex);
		};
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController (ShoppingListCheckOffService){
		var boughtCtrl = this;

		boughtCtrl.bought = ShoppingListCheckOffService.getBought();
	}

	function ShoppingListCheckOffService (){
		var service = this;

		var toBuy = [
			{
				name: 'Cookies',
				quantity: '10 bags'
			},
			{
				name: 'Milk',
				quantity: '5 bottles'
			},
			{
				name: 'Bread',
				quantity: '8 packs'
			},
			{
				name: 'Cola',
				quantity: '10 bottles'
			},
			{
				name: 'Cheese',
				quantity: '6 packs'
			},
		];
		var bought = [];

		service.buy = function(itemIndex){
			bought.push(toBuy[itemIndex]);
			toBuy.splice(itemIndex, 1);
		}; 

		service.getToBuyItems = function(){
			return toBuy;
		};

		service.getBought = function(){
			return bought;
		};	
	}
})();