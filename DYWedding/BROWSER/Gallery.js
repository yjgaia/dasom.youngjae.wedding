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
				backgroundColor : '#163a2c',
				color : '#fff',
				padding : '50px 0'
			}
		};
	},
	
	init : (inner, self) => {
		
		self.append(DIV({
			style : {
				fontSize : 16,
				textAlign : 'center'
			},
			c : [
				DIV({
					c : AUDIO({
						mp3 : DYWedding.R('music.mp3')
					})
				}),
				P({
					style : {
						padding : '50px 0',
						lineHeight : '2em',
						fontSize : 16,
						fontFamily : 'Nanum Myeongjo'
					},
					c : '다솜과 영재가 함께하는 여덟번째 봄,\n사랑을 약속합니다.'
				})
			]
		}));
		
		let wrapper;
		self.append(DIV({
			style : {
				position : 'relative',
				backgroundColor : '#163a2c',
				lineHeight : 0,
				padding : '50px 30px'
			},
			c : [DIV({
				style : {
					position : 'absolute',
					left : 0,
					top : 0,
					border : '100px solid',
					borderImage : 'url(' + DYWedding.R('mainframe.png') + ') 250 / 100px round',
					width : 'calc(100% - 200px)',
					height : 'calc(100% - 200px)'
				}
			}), wrapper = DIV({
				c : RUN(() => {
	
					let photos = [];
	
					REPEAT(6, (index) => {
	
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
			})]
		}));
		
		lightGallery(wrapper.getEl());
	}
});
