DYWedding.Home = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				onDisplayResize : (width, height) => {
					if (width > 800) {
						return {
							width : 'auto',
							height : 741
						};
					} else {
						return {
							width : width,
							height : height
						};
					}
				},
				backgroundImage : DYWedding.R('photo/4.jpg'),
				backgroundSize : 'cover',
				backgroundPosition : 'center center'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.append(P({
			style : {
				padding : '15px 20px',
				fontFamily : 'Philosopher',
				color : '#000',
				fontSize : 30,
				background : 'rgba(255, 255, 255, 0.8)'
			},
			c : [
				SPAN({
					c : 'DASOM\nYOUNGJAE\nWEDDING\n'
				}),
				SPAN({
					style : {
						fontSize : 16
					},
					c : '2020 0404'
				})
			]
		}));
	}
});
