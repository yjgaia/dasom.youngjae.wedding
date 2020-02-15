DYWedding.Game = CLASS({

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
				backgroundColor : '#fff',
				color : '#000'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.on('show', () => {
			
			let subScreen;
			
			self.append(DIV({
				style : {
					backgroundColor : '#b0e1fa',
					onDisplayResize : () => {
						subScreen.setSize({
							width : self.getWidth(),
							height : self.getHeight()
						});
					}
				},
				c : subScreen = SkyEngine.SubScreen({
					width : self.getWidth(),
					height : self.getHeight()
				})
			}));
		});
	}
});
