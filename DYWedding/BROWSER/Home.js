DYWedding.Home = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				position : 'relative',
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
				backgroundColor : '#163a2c'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.append(DIV({
			style : {
				width : 'calc(100% - 200px)',
				height : 'calc(100% - 200px)',
				border : '100px solid',
				borderImage : 'url(' + DYWedding.R('mainframe.png') + ') 250 / 100px round'
			}
		}));
		
		self.append(DIV({
			style : {
				position : 'absolute',
				left : '50%',
				top : 50,
				width : 250,
				marginLeft : -125,
				fontFamily : 'Philosopher',
				textAlign : 'center',
				fontSize : 25
			},
			c : 'The Love Story'
		}));
		
		self.append(DIV({
			style : {
				position : 'absolute',
				left : '50%',
				top : '50%',
				width : 250,
				marginLeft : -125,
				height : 350,
				marginTop : -175,
				backgroundImage : DYWedding.R('photo/4.jpg'),
				backgroundSize : 'cover',
				backgroundPosition : 'center center'
			}
		}));
		
		self.append(DIV({
			style : {
				position : 'absolute',
				left : '50%',
				bottom : 50,
				width : 250,
				marginLeft : -125,
				fontFamily : 'Philosopher',
				textAlign : 'center'
			},
			c : 'Saturday, 16th of May, 2020\nHoliday inn Gwangju hotel, 3F'
		}));
	}
});
