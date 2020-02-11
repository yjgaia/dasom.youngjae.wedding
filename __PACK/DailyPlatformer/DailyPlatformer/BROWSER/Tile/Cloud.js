DailyPlatformer.Cloud = CLASS({
	
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
				col : col,
				key : 3
			}) === true || inner.checkExists({
				row : row,
				col : col - 1,
				key : 3
			}) === true ? DailyPlatformer.R('Tile/TileBlock25.png') : DailyPlatformer.R('Tile/TileBlock21.png')
		}));
		
		self.append(SkyEngine.Image({
			x : 32,
			y : -32,
			src : inner.checkExists({
				row : row - 1,
				col : col,
				key : 3
			}) === true || inner.checkExists({
				row : row,
				col : col + 1,
				key : 3
			}) === true ? DailyPlatformer.R('Tile/TileBlock26.png') : DailyPlatformer.R('Tile/TileBlock22.png')
		}));
		
		self.append(SkyEngine.Image({
			x : -32,
			y : 32,
			src : inner.checkExists({
				row : row + 1,
				col : col,
				key : 3
			}) === true || inner.checkExists({
				row : row,
				col : col - 1,
				key : 3
			}) === true ? DailyPlatformer.R('Tile/TileBlock27.png') : DailyPlatformer.R('Tile/TileBlock23.png')
		}));
		
		self.append(SkyEngine.Image({
			x : 32,
			y : 32,
			src : inner.checkExists({
				row : row + 1,
				col : col,
				key : 3
			}) === true || inner.checkExists({
				row : row,
				col : col + 1,
				key : 3
			}) === true ? DailyPlatformer.R('Tile/TileBlock28.png') : DailyPlatformer.R('Tile/TileBlock24.png')
		}));
	}
});
