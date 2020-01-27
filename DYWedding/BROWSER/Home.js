DYWedding.Home = CLASS({

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
				backgroundImage : DYWedding.R('photo/main.jpg'),
				backgroundSize : 'cover',
				backgroundPosition : 'center center'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.append('안녕하십니까?');
	}
});
