(function(){
	'use strict';

	angular.module('DietApp', [])
	.controller('DietController', DietController);

	DietController.$inject =['$scope'];
	function DietController($scope){
		$scope.menu = "";
		$scope.msgDiet = "";

		$scope.sayResult = function (){
		var result = checkMenu($scope.menu);
		$scope.msgDiet = result;	
		};

		function checkMenu(string){
			const comma = ',';
			var dishes = string.split(comma);
			var value = 0;
			for (var i = dishes.length - 1; i >= 0; i--) {
				if (dishes[i].match(/\w/)) {value += 1}
			}
			if (!value) {return 'Please enter data first';}
			else if (value <= 3) {return 'Enjoy!';}
			else {return 'Too much!';}
		}
	}

})();
