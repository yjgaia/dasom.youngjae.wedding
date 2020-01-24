DailyPlatformer.Water = CLASS({
	
	preset : () => {
		return DailyPlatformer.DeadZone;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.row
		//REQUIRED: params.col
		
		let row = params.row;
		let col = params.col;
		
		self.append(SkyEngine.Image({
			src : RANDOM(2) === 0 ? DailyPlatformer.R('Tile/TileSea0001.png') : DailyPlatformer.R('Tile/TileSea0002.png')
		}));
	}
});
