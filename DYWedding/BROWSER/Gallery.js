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
		
		let wrapper;
		self.append(wrapper = DIV({
			style : {
				backgroundColor : '#0a4f56',
				lineHeight : 0,
				padding : 6
			},
			c : RUN(() => {

				let photos = [];

				REPEAT(9, (index) => {

					photos.push(A({
						href : DYWedding.R('photo/' + (index + 1) + '.jpg'),
						c : IMG({
							style : {
								width : 'calc(33% - 2px)',
								transform : 'scale(0.8)'
							},
							src: DYWedding.R('photo/thumb/' + (index + 1) + '.jpg')
						})
					}));
					
					if ((index = 1) % 3 === 0) {
						photos.push(BR());
					}
				});

				return photos;
			})
		}));
		
		lightGallery(wrapper.getEl());
	}
});
