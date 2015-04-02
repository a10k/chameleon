/**
 *
 * Chemeleon angular code
 *
 *
 * Alok Pepakayala (c)
 */

'use strict';
angular.module('chemo', []);

/*
 * start  page ng controller
 *
 */
function chemoControl($scope, $http) {
	
    $scope.array = chemist.nm.array;
	/*
 	$scope.refreshView = function(){
 		$scope.adder = 1;
		$scope.checked = 1;
 		$scope.rooms ={};
 		$scope.people = {};
 		$scope.notif = {};
		var temp = {
			"id":$scope.fbUser
		};

 		$http.post('../notifications',temp).success(function(data) {
 			$scope.notif = data;
 		});	

 		$http.post('../tenants',temp).success(function(data) {
 			$scope.people = data;
 		});
 		$http.post('../rooms',temp).success(function(data) {
 			$scope.rooms = data;
 		});
 	}*/

}