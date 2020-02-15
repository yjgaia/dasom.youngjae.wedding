require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		
		defaultBoxName : 'DYWedding',
		title : 'Dasom & YoungJae Wedding',
		webServerPort : 8404
	},
	
	BROWSER_CONFIG : {
		SkyEngine : {
			isDebugMode : true,
			isNotUsingScreen : true
		}
	},

	NODE_CONFIG : {
		isSingleCoreMode : true
	}
});
