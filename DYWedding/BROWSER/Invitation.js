DYWedding.Invitation = CLASS({

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
				color : '#fff'
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
					style : {
						padding : '30px 0',
						backgroundColor : '#fff',
						color : '#000',
						fontSize : 15
					},
					c : [P({
						style : {
							lineHeight : '2em'
						},
						c : [SPAN({
							c : '황인효 · 정정미'
						}), SPAN({
							style : {
								fontSize : 14
							},
							c : '의 차녀'
						}), SPAN({
							style : {
								marginLeft : 10
							},
							c : '황다솜'
						}), A({
							style : {
								marginLeft : 10
							},
							href : 'tel:01033909459',
							c : FontAwesome.GetIcon('phone')
						})]
					}),
					P({
						style : {
							lineHeight : '2em'
						},
						c : [SPAN({
							c : '심성우 · 노연옥'
						}), SPAN({
							style : {
								fontSize : 14
							},
							c : '의 장남'
						}), SPAN({
							style : {
								marginLeft : 10
							},
							c : '심영재'
						}), A({
							style : {
								marginLeft : 10
							},
							href : 'tel:01098622026',
							c : FontAwesome.GetIcon('phone')
						})]
					}),
					P({
						style : {
							marginTop : 30,
							lineHeight : '2em'
						},
						c : [SPAN({
							c : '2020년 5월 16일 토요일 오후 1시\n홀리데이 인 광주 3층 컨벤션홀'
						})]
					})]
				})
			]
		}));
	}
});
