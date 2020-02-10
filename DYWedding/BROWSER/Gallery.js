DYWedding.Gallery = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				onDisplayResize : (width, height) => {
					if (width > 800) {
						return {
							width : 'auto'
						};
					} else {
						return {
							width : width
						};
					}
				},
				backgroundColor : '#fff',
				color : '#000'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.append(DIV({
			c : [
				
				DYWedding.Slider({
					slides : RUN(() => {
	
						let slides = [];
	
						REPEAT(4, (index) => {
	
							slides.push(DYWedding.Slide({
								style : {
									backgroundImage : DYWedding.R('photo/' + (index + 1) + '.jpg'),
									backgroundPosition : 'center',
									backgroundSize : 'cover',
									onDisplayResize : (width, height) => {
										return {
											height : height - 30
										};
									}
								},
								contentStyle : {
									position : 'relative',
									width : '100%',
									height : '100%'
								}
							}));
						});
	
						return slides;
					})
				})
			]
		}));
	}
});
