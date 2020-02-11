DailyPlatformer.Tree = CLASS({
	
	preset : () => {
		return DailyPlatformer.Block;
	},
	
	init : (inner, self) => {
		
		self.append(SkyEngine.Image({
			src : RANDOM(2) === 0 ? DailyPlatformer.R('Tile/TileWood0001.png') : DailyPlatformer.R('Tile/TileWood0002.png')
		}));
	}
});
