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
				backgroundColor : '#fff',
				color : '#000',
				padding : '80px 0'
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
				P({
					style : {
						lineHeight : '2em'
					},
					c : '다솜과 영재가 함께하는 여덟번째 봄,\n사랑을 약속합니다.'
				}),
				P({
					style : {
						marginTop : 50,
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
						marginTop : 50,
						lineHeight : '2em'
					},
					c : [SPAN({
						c : '2020년 4월 4일 토요일 오후 1시\n홀리데이 인 광주 3층 컨벤션홀'
					})]
				})
			]
		}));
	}
});
