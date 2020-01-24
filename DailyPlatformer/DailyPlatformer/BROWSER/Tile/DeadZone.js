//
// 사망 블록
//
DailyPlatformer.DeadZone = CLASS({
	
	preset : () => {
		return DailyPlatformer.Tile;
	},
	
	init : (inner, self) => {
		
		self.addCollider(SkyEngine.Rect({
			width : 128,
			height : 128
		}));
	}
});
