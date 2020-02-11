DailyPlatformer.Tile = CLASS({
	
	preset : () => {
		return SkyEngine.Tile;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.tileKeyMap
		//REQUIRED: params.row
		//REQUIRED: params.col
		
		let tileKeyMap = params.tileKeyMap;
		let row = params.row;
		let col = params.col;
		
		let checkExists = inner.checkExists = (params) => {
			//REQUIRED: params
			//REQUIRED: params.row
			//REQUIRED: params.col
			
			return tileKeyMap[params.row] !== undefined &&
				tileKeyMap[params.row][params.col] !== undefined &&
				(
					key !== undefined ? tileKeyMap[params.row][params.col] === key : (
						tileKeyMap[params.row][params.col] !== 0 &&
						tileKeyMap[params.row][params.col] !== 3 &&
						tileKeyMap[params.row][params.col] !== 6 &&
						tileKeyMap[params.row][params.col] !== 7 &&
						tileKeyMap[params.row][params.col] !== 8 &&
						tileKeyMap[params.row][params.col] !== 9
					)
				);
		};
	}
});
