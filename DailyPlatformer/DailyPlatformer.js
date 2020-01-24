require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'DailyPlatformer',
		
		title : 'Daily Platformer',
		
		isDevMode : true,
		webServerPort : 8118
	},
	
	BROWSER_CONFIG : {
		
		SkyEngine : {
			//isDebugMode : true,
			width : 720,
			height : 1280,
			maxCollisionWidth : 100,
			maxCollisionHeight : 200
		}
	},
	
	NODE_CONFIG : {
		// 테스트 목적이기 때문에 CPU 클러스터링 기능을 사용하지 않습니다.
		isNotUsingCPUClustering : true,
		
		dbName : 'DailyPlatformer-test'
	}
});
