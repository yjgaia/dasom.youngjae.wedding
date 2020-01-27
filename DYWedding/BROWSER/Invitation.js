DYWedding.Invitation = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				onDisplayResize : (width, height) => {
					return {
						width : width,
						height : height
					};
				},
				backgroundColor : '#fff',
				color : '#000'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.append('안녕하십니까?');
	}
});
