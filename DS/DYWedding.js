require(process.env.UPPERCASE_PATH + '/index.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		
		defaultBoxName : 'DYWedding',
		title : 'Dasom & YoungJae Wedding',
		webServerPort : 8404
	},
	
	NODE_CONFIG : {
		isSingleCoreMode : true
	}
});
