//
// 충돌 처리 블록
//
DailyPlatformer.Block = CLASS({
	
	preset : () => {
		return SkyEngine.CollisionTile;
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
			//OPTIONAL: params.key
			
			let key = params.key;
			
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
		
		self.addCollider(SkyEngine.Rect({
			width : 128,
			height : 128
		}));
	}
});
