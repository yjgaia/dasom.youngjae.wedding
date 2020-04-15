DYWedding.Home = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				height : 480
			}
			/*style : {
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
			}*/
		};
	},
	
	init : (inner, self) => {
		
		let video;
		self.append(DIV({
			style : {
				position : 'absolute',
				left : 0,
				top : 0,
				width : '100%',
				height : 480,
				overflow : 'hidden'
			},
			c : video = DIV({
				style : {
					position : 'absolute',
					left : '50%',
					top : 0,
					marginLeft : -360,
					width : 720,
					height : 480
				}
			})
		}));
		
		video.getEl().innerHTML = '<video autoplay muted loop style="width: 100%; height: 100%;"><source src="/R/background.mp4" type="video/mp4"></video>';
		
		self.append(DIV({
			style : {
				position : 'absolute',
				left : 0,
				top : 0,
				zIndex : 1,
				width : '100%',
				height : 480,
				textAlign : 'center'
			},
			c : [H1({
				style : {
					marginTop : 70,
					fontSize : 30
				},
				c : 'dasom & youngjae'
			}), H2({
				style : {
					marginTop : 10,
					fontSize : 38
				},
				c : 'Wedding Story'
			}), P({
				style : {
					marginTop : 250,
					fontSize : 20
				},
				c : '2020.05.16'
			})]
		}));
		
		/*self.append(DIV({
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
		}));*/
	}
});
