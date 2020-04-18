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
									DYWedding.Gallery(),
									DYWedding.Invitation(),
									DYWedding.Map(),
									DIV({
										style : {
											borderTop : '1px solid #fff',
											width : 120,
											margin : 'auto',
											marginTop : 40
										}
									}),
									DIV({
										style : {
											padding : '40px 0 60px 0',
											color : '#fff',
											fontSize : 12,
											textAlign : 'center'
										},
										c : P({
											c : '코로나 바이러스 예방을 위해\n호텔 내 방역에 더욱 신경 쓸 예정이며,\n넓은 좌석 배치 제공 및 코스식 식사가 제공됩니다.'
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
