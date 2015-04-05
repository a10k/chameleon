/**
 *
 * Chemeleon angular code
 *
 *
 * Alok Pepakayala (c)
 */

'use strict';
angular.module('chemo', []);
angular.module("userbook",[]);


/*
 * User book controls
 *
 */
function userControl($scope, $http){
	$scope.fbUser = null;
	$scope.userAccessToken = null;
	$scope.fbEmail = null;
	$scope.fbName = null;

	 //FB init
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1610782812470939',
			xfbml      : true,
			version    : 'v2.3'});
		//   FB.ui({method: 'feed'}

		//JS based login	
		FB.login(function(response) {
		   if (response.authResponse) {
		     console.log('Loged in!');
		     //FB.api('/me', function(response) {
		      // console.log('Good to see you, ' + response.name + '.');
		     //});
		   } else {
		     console.log('User cancelled login or did not fully authorize.');
		   }
		 }, {scope: 'manage_notifications,email,publish_actions,public_profile'});




		setInterval(function(){
			FB.getLoginStatus(function(response) {
			if (response.status === 'connected' ) {
				if (!$scope.fbUser) {
					var uid = response.authResponse.userID;
					var accessToken = response.authResponse.accessToken;

					$scope.fbUser = uid;
					$scope.userAccessToken = accessToken;
					$scope.facebookDone();
				};
			} 
		 });

		}, 1000);
	};
	//FB JS SDK
	(function(d, s, id){
		 var js, fjs = d.getElementsByTagName(s)[0];
		 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
	 }(document, 'script', 'facebook-jssdk'));

	//On successfull facebook login
	$scope.facebookDone = function(){
		var getUserInfoPath = "/"+$scope.fbUser;	
		FB.api(getUserInfoPath, {fields:[ 'last_name','email','first_name']}, function(response) {
			$scope.fbEmail = response.email;
			$scope.fbName = response.first_name+" "+response.last_name;
			$scope.finished();
		});
	}

	//When everythign is done
	$scope.finished = function(){
		var temp = {
			"email":$scope.fbEmail,
			"id":$scope.fbUser,
			"name":$scope.fbName,
			"token":$scope.userAccessToken
		};
		$http.post('../fbuserchk',temp).success(function(data) {
			document.getElementById("starter").style.display = "block";
		});
	}

}


/*
 * start  page ng controller
 *
 */
function chemoControl($scope, $http) {

	$scope.level = 1;

	var chemist = {};
	var lvl1 = {
		CONF_N :10,// size of 2d 
		CONF_M :10,// size of 2d
		CONF_P :3,// number of paints used
		CONF_PLIST :["#FFFF2A","#F8171B","#B3DBDB","#C8F526","#003300","#E599E5"],
		CONF_MAXMOVES :10,
		CONF_BRUSH : [90,80],
		CONF_PIXY :[27,27],
		comment : " level 1"
	}
	var lvl2 = {
		CONF_N :20,// size of 2d 
		CONF_M :10,// size of 2d
		CONF_P :6,// number of paints used
		CONF_PLIST :["#FFFF2A","#F8171B","#B3DBDB","#C8F526","#003300","#E599E5"],
		CONF_MAXMOVES :35,
		CONF_BRUSH : [90,80],
		CONF_PIXY :[27,27],
		comment : " level 2"
	}

	$scope.loadlvl = function(lvlconf){
		chemist = chemeleonMaker(lvlconf,{});
		if (chemist.ready) {
		    $scope.array = chemist.nm.array;
		    $scope.paints = chemist.p.array;
		    $scope.move = chemist.game.maxmoves - chemist.game.moves.length;
		    $scope.game = 1;
		    $scope.lose = 0;
		    $scope.win = 0;
		};
	}
	//load level 1
	$scope.loadlvl(lvl1);
	//$scope.loadlvl(lvl2);


    $scope.clicked = function(arg){
    	var ret = chemist.game.update(arg)
    	if(ret == 1){
    		$scope.game = 0;
    		$scope.lose = 1;

    	}else if (ret == 2){
    		$scope.game = 0;
    		$scope.win = 1;
    		$scope.level++;
    		if ($scope.level == 2) {
	    		$scope.loadlvl(lvl2);
    		};
    	}
    	$scope.move = chemist.game.maxmoves - chemist.game.moves.length;
    }

    $scope.painter = function(arg){
    	var tmp = {};
    	if (chemist.ready) {
	    	tmp['background-color'] = chemist.p.paint(arg.val);
	    	tmp.width = chemist.conf.CONF_BRUSH[0] + "px";
			tmp.height = chemist.conf.CONF_BRUSH[1] + "px";
			tmp.float =  "left";
		}
    	return tmp;
    }

    $scope.pixel = function(arg){
    	var tmp = {};
    	if (chemist.ready) {
	    	tmp['background-color'] = chemist.p.paint(arg.val);
	    	tmp.width = chemist.conf.CONF_PIXY[0] + "px";
	    	tmp.height = chemist.conf.CONF_PIXY[1] + "px";
    	}
    	return tmp;
    }
}