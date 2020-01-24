DailyPlatformer.Monster = CLASS({
	
	preset : () => {
		return DailyPlatformer.DeadZone;
	},
	
	init : (inner, self) => {
		
		self.getCollider().setWidth(80);
		self.getCollider().setHeight(105);
		self.getCollider().setY(10);
		
		self.append(SkyEngine.Image({
			y : 10,
			src : DailyPlatformer.R('Object/ObjMonster1.png')
		}));
		
		SkyEngine.Delay(() => {
			if (self.checkIsRemoved() !== true) {
				let originX = self.getX();
				RUN((f) => {
					self.moveRight({
						speed : 200,
						toX : originX + 126 * 2 + 21
					}, () => {
						self.moveLeft({
							speed : 200,
							toX : originX - 21
						}, f);
					});
				});
			}
		});
	}
});
