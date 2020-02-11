DailyPlatformer.Ground = CLASS({
	
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
			y : -32,
			src : inner.checkExists({
				row : row - 1,
				col : col
			}) === true ? DailyPlatformer.R('Tile/TileBlock11.png') : (
				inner.checkExists({
					row : row,
					col : col - 1
				}) === true ? DailyPlatformer.R('Tile/TileBlock5.png') : DailyPlatformer.R('Tile/TileBlock1.png')
			)
		}));
		
		self.append(SkyEngine.Image({
			x : 32,
			y : -32,
			src : inner.checkExists({
				row : row - 1,
				col : col
			}) === true ? DailyPlatformer.R('Tile/TileBlock12.png') : (
				inner.checkExists({
					row : row,
					col : col + 1
				}) === true ? DailyPlatformer.R('Tile/TileBlock6.png') : DailyPlatformer.R('Tile/TileBlock2.png')
			)
		}));
		
		self.append(SkyEngine.Image({
			x : -32,
			y : 32,
			src : inner.checkExists({
				row : row + 1,
				col : col
			}) === true || inner.checkExists({
				row : row,
				col : col - 1
			}) === true ? DailyPlatformer.R('Tile/TileBlock7.png') : DailyPlatformer.R('Tile/TileBlock3.png')
		}));
		
		self.append(SkyEngine.Image({
			x : 32,
			y : 32,
			src : inner.checkExists({
				row : row + 1,
				col : col
			}) === true || inner.checkExists({
				row : row,
				col : col + 1
			}) === true ? DailyPlatformer.R('Tile/TileBlock8.png') : DailyPlatformer.R('Tile/TileBlock4.png')
		}));
	}
});
