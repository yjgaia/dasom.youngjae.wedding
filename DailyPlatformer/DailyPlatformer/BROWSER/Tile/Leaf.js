DailyPlatformer.Leaf = CLASS({
	
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
			}) === true || inner.checkExists({
				row : row,
				col : col - 1
			}) === true ? DailyPlatformer.R('Tile/TileBlock17.png') : DailyPlatformer.R('Tile/TileBlock13.png')
		}));
		
		self.append(SkyEngine.Image({
			x : 32,
			y : -32,
			src : inner.checkExists({
				row : row - 1,
				col : col
			}) === true || inner.checkExists({
				row : row,
				col : col + 1
			}) === true ? DailyPlatformer.R('Tile/TileBlock18.png') : DailyPlatformer.R('Tile/TileBlock14.png')
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
			}) === true ? DailyPlatformer.R('Tile/TileBlock19.png') : DailyPlatformer.R('Tile/TileBlock15.png')
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
			}) === true ? DailyPlatformer.R('Tile/TileBlock20.png') : DailyPlatformer.R('Tile/TileBlock16.png')
		}));
	}
});
