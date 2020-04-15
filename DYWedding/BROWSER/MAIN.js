DYWedding.MAIN = METHOD({
	
	run : () => {

		TABLE({
			style : {
				minHeight : '100%'
			},
			c : TR({
				c : TD({
					style : {
						onDisplayResize : (width, height) => {
							if (width > 800) {
								return {
									padding : '30px 0'
								};
							} else {
								return {
									padding : 0
								};
							}
						}
					},
					c : DIV({
						style : {
							margin : 'auto',
							onDisplayResize : (width, height) => {
								if (width > 800) {
									return {
										width : 538,
										height : 814,
										backgroundImage : DYWedding.R('iphone.png')
									};
								} else {
									return {
										width : 'auto',
										height : 'auto',
										backgroundImage : 'none'
									};
								}
							},
						},
						c : DIV({
							style : {
								onDisplayResize : (width, height) => {
									if (width > 800) {
										return {
											paddingTop : 22,
											paddingLeft : 100
										};
									} else {
										return {
											paddingTop : 0,
											paddingLeft : 0
										};
									}
								}
							},
							
							c : DIV({
								style : {
									position : 'relative',
									onDisplayResize : (width, height) => {
										if (width > 800) {
											return {
												width : 342,
												height : 741,
												'-webkit-mask-image': 'url("' + DYWedding.R('iphone-mask.png') + '")',
												overflowY : 'scroll'
											};
										} else {
											return {
												width : 'auto',
												height : 'auto',
												'-webkit-mask-image': 'none'
											};
										}
									},
									backgroundColor : '#163a2c'
								},
								c : [
									DYWedding.Home(),
									DYWedding.Invitation(),
									DYWedding.Gallery(),
									DYWedding.Map(),
									DIV({
										style : {
											padding : '40px 40px 60px 40px',
											color : '#3CB68A'
										},
										c : DIV({
											c : [P({
												c : '코로나 바이러스 위험에 대비하여,\n호텔 내 방역에 더욱 신경 쓸 예정입니다.'
											}), P({
												style : {
													marginTop : 10,
													fontSize : 12
												},
												c : '* 넓은 좌석 배치 및 코스식 식사가 제공됩니다.'
											})]
										})
									})
								]
							})
						})
					})
				})
			})
		}).appendTo(BODY);
		
		Kakao.init('e676de846520395b3f998af409d62351');
	}
});
