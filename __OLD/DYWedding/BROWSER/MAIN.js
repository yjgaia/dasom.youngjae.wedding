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
									}
								},
								c : [
									DYWedding.Home(),
									DYWedding.Invitation(),
									DYWedding.Gallery(),
									DYWedding.Map()
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
