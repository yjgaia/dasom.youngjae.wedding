DailyPlatformer.WaterMonster = CLASS({
	
	preset : () => {
		return DailyPlatformer.DeadZone;
	},
	
	params : () => {
		return {
			isToCheckCollision : true
		};
	},
	
	init : (inner, self, params) => {
		
		self.append(DailyPlatformer.Water(params));
		
		// 수중 몬스터 생성
		let monster;
		self.append(monster = SkyEngine.Image({
			zIndex : -1,
			src : DailyPlatformer.R('Object/ObjMonster2.png'),
			collider : SkyEngine.Rect({
				width : 80,
				height : 80
			})
		}));
		
		SkyEngine.Interval(3, () => {
			if (self.checkIsRemoved() !== true) {
				monster.setY(0);
				monster.setSpeedY(-2000);
				monster.setAccelY(3000);
			}
		});
	}
});
