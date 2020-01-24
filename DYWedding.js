require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		
		defaultBoxName : 'DYWedding',
		title : 'Dasom & YoungJae Wedding',
		webServerPort : 0404
	},
	
	BROWSER_CONFIG : {
		SkyEngine : {
			isDebugMode : true,
			minWidth : 720,
			height : 1280
		}
	},

	NODE_CONFIG : {
		isSingleCoreMode : true,
		
		dbName : 'DYWedding'
	}
});
