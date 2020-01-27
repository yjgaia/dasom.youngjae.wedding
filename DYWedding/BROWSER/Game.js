DYWedding.Game = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				onDisplayResize : (width, height) => {
					return {
						width : width
					};
				},
				backgroundColor : '#fff',
				color : '#000'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.append(DIV({
			c : [
				H3({
					c : '게임하기'
				})
			]
		}));
	}
});
