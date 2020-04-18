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
				padding : '50px 0',
				overflow : 'hidden'
			}
		};
	},
	
	init : (inner, self) => {
		
		let audio;
		self.append(DIV({
			style : {
				fontSize : 16,
				textAlign : 'center'
			},
			c : [
				/*DIV({
					c : [audio = AUDIO({
						style : {
							position : 'absolute',
							left : -999999,
							top : -999999
						},
						mp3 : DYWedding.R('music.mp3')
					}), A({
						style : {
							float : 'right',
							marginRight : 30
						},
						c : IMG({
							style : {
								width : 25
							},
							src : DYWedding.R('music.png')
						})
					}), CLEAR_BOTH()]
				}),*/
				P({
					style : {
						padding : '0 0 20px',
						lineHeight : '2em',
						fontSize : 16,
						fontFamily : 'Nanum Myeongjo'
					},
					c : '다솜과 영재가 함께하는 여덟번째 봄,\n사랑을 약속합니다.'
				})
			]
		}));
		
		let page = 0;
		let prev, next;
		let wrapper;
		let image1, image2;
		let image3, image4;
		let image5, image6;
		
		self.append(DIV({
			style : {
				width : 350,
				margin : 'auto',
				transform : 'scale(1.1)'
			},
			c : DIV({
				style : {
					position : 'relative',
					width : 336
				},
				c : [IMG({
					style : {
						paddingLeft : 33.6,
						width : 302.4,
					},
					src : DYWedding.R('book.png')
				}), prev = A({
					style : {
						position : 'absolute',
						left : 56,
						top : 90
					},
					c : IMG({
						style : {
							width : 25
						},
						src : DYWedding.R('prev.png')
					}),
					on : {
						tap : () => {
							changePage(page - 1);
						}
					}
				}), wrapper = DIV({
					c : [image1 = A({
						style : {
							position : 'absolute',
							left : 80,
							top : 50
						},
						href : DYWedding.R('photo/4.jpg'),
						c : IMG({
							style : {
								height : 100
							},
							src : DYWedding.R('photo/thumb/4.jpg')
						})
					}), image2 = A({
						style : {
							position : 'absolute',
							right : 80,
							top : 50
						},
						href : DYWedding.R('photo/6.jpg'),
						c : IMG({
							style : {
								height : 100
							},
							src : DYWedding.R('photo/thumb/6.jpg')
						})
					}), image3 = A({
						style : {
							position : 'absolute',
							left : 80,
							top : 50
						},
						href : DYWedding.R('photo/1.jpg'),
						c : IMG({
							style : {
								height : 100
							},
							src : DYWedding.R('photo/thumb/1.jpg')
						})
					}), image4 = A({
						style : {
							position : 'absolute',
							right : 80,
							top : 50
						},
						href : DYWedding.R('photo/2.jpg'),
						c : IMG({
							style : {
								height : 100
							},
							src : DYWedding.R('photo/thumb/2.jpg')
						})
					}), image5 = A({
						style : {
							position : 'absolute',
							left : 80,
							top : 50
						},
						href : DYWedding.R('photo/5.jpg'),
						c : IMG({
							style : {
								height : 100
							},
							src : DYWedding.R('photo/thumb/5.jpg')
						})
					}), image6 = A({
						style : {
							position : 'absolute',
							right : 80,
							top : 50
						},
						href : DYWedding.R('photo/3.jpg'),
						c : IMG({
							style : {
								height : 100
							},
							src : DYWedding.R('photo/thumb/3.jpg')
						})
					})]
				}), next = A({
					style : {
						position : 'absolute',
						right : 58,
						top : 90
					},
					c : IMG({
						style : {
							width : 25
						},
						src : DYWedding.R('next.png')
					}),
					on : {
						tap : () => {
							changePage(page + 1);
						}
					}
				})]
			})
		}));
		
		image3.hide();
		image4.hide();
		image5.hide();
		image6.hide();
		
		let changePage = (p) => {
			
			if (p < 0) { p = 0; }
			if (p > 2) { p = 2; }
			
			if (p === 0) {
				image1.show();
				image2.show();
				image3.hide();
				image4.hide();
				image5.hide();
				image6.hide();
			}
			
			if (p === 1) {
				image1.hide();
				image2.hide();
				image3.show();
				image4.show();
				image5.hide();
				image6.hide();
			}
			
			if (p === 2) {
				image1.hide();
				image2.hide();
				image3.hide();
				image4.hide();
				image5.show();
				image6.show();
			}
			
			page = p;
		};
		
		lightGallery(wrapper.getEl());
		
		/*let wrapper;
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
		}));*/
		
		self.append(DIV({
			style : {
				fontSize : 16,
				textAlign : 'center'
			},
			c : [
				P({
					style : {
						padding : '40px 0 0 0',
						lineHeight : '2em',
						fontSize : 12,
						fontFamily : 'Nanum Myeongjo'
					},
					c : '5월 16일 토요일 오후 1시\n홀리데이인 광주호텔 3층 (컨벤션홀)'
				})
			]
		}));
	}
});
