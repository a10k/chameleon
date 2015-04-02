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
l("Chemeleon Game!!");



/*
 * CONFIGURATION
 */
var CONF_N = 7;// size of 2d 
var CONF_M = 7;// size of 2d
var CONF_P = 6;// number of paints used
var CONF_PLIST = [];
//


// Master store 
var chemist = {};
//


// Paint store
chemist.p = {};
chemist.p.count = CONF_P;
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
chemist.nm.n = CONF_N;
chemist.nm.m = CONF_M;
chemist.nm.array = [];
chemist.nm.makenm = function (n,m){
	/* This function creates a 2D matrix of objects
     * Takes the dimensions as the arguments and returns nothing!
     * The created Array is chemist.nm.array, make sure it exists
	*/
	for (var i = 0; i <= n - 1; i++) {
		//first create a blank row
		var tmprow = [];
		for (var j = 0; j <= m -1; j++) {
			//create elements inside the row
			var tmp = {};
			tmp.row = i;
			tmp.col = j;
			tmp.abj = 0;
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