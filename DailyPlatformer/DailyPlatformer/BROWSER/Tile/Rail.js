DailyPlatformer.Rail = CLASS({
	
	preset : () => {
		return DailyPlatformer.Tile;
	},
	
	init : (inner, self) => {
		
		self.append(SkyEngine.Image({
			src : DailyPlatformer.R('Tile/TileRail.png')
		}));
	}
});
