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
				width : '100%',
				height : '100%'
			}
		}));
		
		self.append(IMG({
			style : {
				position : 'absolute',
				left : '10%',
				top : 0,
				width : '80%'
			},
			src : DYWedding.R('topframe.png')
		}));
		
		self.append(IMG({
			style : {
				position : 'absolute',
				left : '10%',
				bottom : 0,
				width : '80%',
				transform : 'scaleY(-1)'
			},
			src : DYWedding.R('topframe.png')
		}));
		
		self.append(TABLE({
			style : {
				position : 'absolute',
				left : 0,
				top : 10,
				width : '100%',
				height : '20%',
				fontFamily : 'Nanum Myeongjo',
				fontWeight : 800,
				textAlign : 'center'
			},
			c : TR({
				c : TD({
					c : [DIV({
						style : {
							paddingTop : 5,
							fontFamily : 'Classical',
							textAlign : 'center',
							fontSize : 40
						},
						c : 'Youngjae & Dasom'
					})]
				})
			})
		}));
		
		self.append(DIV({
			style : {
				position : 'absolute',
				left : '10%',
				top : '20%',
				width : '80%',
				height : '60%',
				backgroundImage : DYWedding.R('main.jpg'),
				backgroundSize : 'cover',
				backgroundPosition : 'center center'
			}
		}));
		
		self.append(TABLE({
			style : {
				position : 'absolute',
				left : 0,
				bottom : 5,
				width : '100%',
				height : '20%',
				fontFamily : 'Nanum Myeongjo',
				fontWeight : 400,
				textAlign : 'center',
				fontSize : 12
			},
			c : TR({
				c : TD({
					c : 'Saturday, 16th of May, 2020\n1 o\'clock in the afternoon.\nHoliday inn Gwangju hotel, 3F'
				})
			})
		}));
	}
});
