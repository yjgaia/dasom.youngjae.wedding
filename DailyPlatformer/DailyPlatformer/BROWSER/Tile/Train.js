DailyPlatformer.Train = CLASS({
	
	preset : () => {
		return DailyPlatformer.Block;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.row
		//REQUIRED: params.col
		
		let row = params.row;
		let col = params.col;
		
		self.append(SkyEngine.Image({
			x : -32,
			zIndex : inner.checkExists({
				row : row,
				col : col - 1,
				key : 7
			}) === true ? -1 : 0,
			src : inner.checkExists({
				row : row,
				col : col - 1,
				key : 7
			}) === true ? DailyPlatformer.R('Tile/TileTrain0003.png') : DailyPlatformer.R('Tile/TileTrain0001.png')
		}));
		
		self.append(SkyEngine.Image({
			x : 32,
			zIndex : inner.checkExists({
				row : row,
				col : col + 1,
				key : 7
			}) === true ? -1 : 0,
			src : inner.checkExists({
				row : row,
				col : col + 1,
				key : 7
			}) === true ? DailyPlatformer.R('Tile/TileTrain0003.png') : DailyPlatformer.R('Tile/TileTrain0002.png')
		}));
		
		SkyEngine.Delay(() => {
			if (self.checkIsRemoved() !== true) {
				let originX = self.getX();
				RUN((f) => {
					self.moveRight({
						speed : 200,
						toX : self.getX() + 126 * 4
					}, () => {
						self.moveLeft({
							speed : 200,
							toX : originX
						}, f);
					});
				});
			}
		});
	}
});
