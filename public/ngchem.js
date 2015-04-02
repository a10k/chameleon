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
    $scope.paints = chemist.p.array;
    $scope.move = chemist.game.maxmoves - chemist.game.moves.length;
    $scope.game = 1;
    $scope.lose = 0;
    $scope.win = 0;
    $scope.clicked = function(arg){
    	var ret = chemist.game.update(arg)
    	if(ret == 1){
	    	$scope.game = 0;
	    	$scope.lose =1;
    	}else if (ret == 2){
    		$scope.game = 0;
    		$scope.win = 1;
    	}
    	$scope.move = chemist.game.maxmoves - chemist.game.moves.length;
    }
    $scope.painter = function(arg){
    	return {"background-color": chemist.p.paint(arg)}
    }
}