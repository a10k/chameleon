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
    $scope.clicked = function(arg){
    	l("Clicked on " + arg );
    	chemist.game.update(arg);
    }
    $scope.painter = function(arg){
    	return {"background-color": chemist.p.paint(arg)}
    }

}