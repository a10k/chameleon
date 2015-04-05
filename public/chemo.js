/**
 * Chemeleon Game !
 *
 *
 * written by alok pepakayala (c)
 * 
 * Copyright(c) 2015 
 * a10k@icloud.com
 */

l = function() { return console.log.apply(console, arguments); };
//l("Chemeleon Game!!");



/*
 * CONFIGURATION SAMPLE

var conf = {
	CONF_N :20,// size of 2d 
	CONF_M :10,// size of 2d
	CONF_P :6,// number of paints used
	CONF_PLIST :["#FFFF2A","#F8171B","#B3DBDB","#C8F526","#003300","#E599E5"],
	CONF_MAXMOVES :25,
	CONF_BRUSH : [90,80],
	CONF_PIXY :[27,27],


	comment : " Basic Configuration"
}
 */



// BUILD THE GAME !!

chemeleonMaker = function(cnf,chemist){
	//backup the conf!
	chemist.conf = cnf;

	// Paint store
	chemist.p = {};
	chemist.p.count = cnf.CONF_P;
	chemist.p.array = [];
	chemist.p.paintslist = cnf.CONF_PLIST;

	chemist.p.paint = function(arg){
		return chemist.p.paintslist[arg];
	}

	chemist.p.populate = function(){
		/* This function to populate an array of paints
		*/
		for (var i = 0; i <= chemist.p.count -1; i++) {
			var tmp = {};
			tmp.val = i;
			tmp.color = chemist.p.paint(i);
			chemist.p.array.push(tmp);
		};
	}
	chemist.p.populate();
	chemist.p.random = function(){
		/* This function returns a random number within the range,
		 * this random number is the key for resolving the color
		 * and also used to map to the color accordingly
		*/
		return Math.floor( Math.random() * ( 1 + (chemist.p.count-1) - 0 ) ) + 0;
	}
	//





	// NM pixelated object
	chemist.nm = {};
	chemist.nm.n = cnf.CONF_N;
	chemist.nm.m = cnf.CONF_M;
	chemist.nm.array = [];
	chemist.nm.makenm = function (n,m){
		/* This function creates a 2D matrix of objects
	     * Takes the dimensions as the arguments and returns nothing!
	     * The created Array is chemist.nm.array, make sure it exists
		*/
		for (var i = 0; i <= n - 1; i++) {
			//first create a blank row
			var tmprow = [];
			for (var j = 0; j <= m - 1; j++) {
				//create elements inside the row
				var tmp = {};
				tmp.row = i;
				tmp.col = j;
				tmp.adj = 0;
				tmp.val = chemist.p.random();
				// add element to row
				tmprow.push(tmp);
			};
			// add rows to array
			chemist.nm.array.push(tmprow);
		};
	}
	chemist.nm.makenm(chemist.nm.n,chemist.nm.m);
	//

	// The game
	chemist.game = {};
	chemist.game.moves = [];
	chemist.game.maxmoves = cnf.CONF_MAXMOVES;
	chemist.game.win = 0;

	chemist.game.update = function(arg){
		//inc moves
		chemist.game.moves.push("arg");
		//set the top one as adj by default
		var top = chemist.nm.array[0][0];
		top.adj = 1;

		// mark all adjecent blocks
		for (var i = 0; i <= chemist.nm.n - 1; i++) {
			for (var j = 0; j <= chemist.nm.m - 1; j++) {
				if (chemist.nm.array[i][j].adj == 1) {

					var color = chemist.nm.array[i][j].val;
					// check for the four adjecent sides
					//top
					if (i > 0 && chemist.nm.array[i - 1][j] && chemist.nm.array[i - 1][j].val == color ) {
						chemist.nm.array[i - 1][j].adj = 1;
						//l("top");
					}
					//left
					if (j > 0 && chemist.nm.array[i][j - 1] && chemist.nm.array[i][j - 1].val == color ) {
						chemist.nm.array[i][j - 1].adj = 1;
						//l("left");
					}
					//right
					if (j < (chemist.nm.m - 1) && chemist.nm.array[i][j + 1] && chemist.nm.array[i][j + 1].val == color ) {
						chemist.nm.array[i][j + 1].adj = 1;
						//l("right");
					}
					//bottom
					if (i < (chemist.nm.n - 1) && chemist.nm.array[i + 1][j] && chemist.nm.array[i + 1][j].val == color ) {
						chemist.nm.array[i + 1][j].adj = 1;
						//l("bottom");
					}
				};
			};
		};



		//paint all adj blocks
		for (var i = 0; i <= chemist.nm.n - 1; i++) {
			for (var j = 0; j <= chemist.nm.m - 1; j++) {
				if (chemist.nm.array[i][j].adj == 1) {
					chemist.nm.array[i][j].val = arg;
					chemist.nm.array[i][j].adj = 0;
				};
			};
		};


		//win condition
		var win = 0;
		for (var i = 0; i <= chemist.nm.n - 1; i++) {
			for (var j = 0; j <= chemist.nm.m - 1; j++) {
				if (chemist.nm.array[i][j].val !== arg) {
					win = win + 1;
				};
			};
		};
		if (win == 0) {
			return 2;
		};



		// max moves reached warn
		if (chemist.game.moves.length == chemist.game.maxmoves){
			return 1;
		}
	}

	//set the ready flag!
	chemist.ready = 1;
	return chemist;
}
