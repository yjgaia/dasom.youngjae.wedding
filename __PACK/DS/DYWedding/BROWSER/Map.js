DYWedding.Map = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				backgroundColor : '#163a2c',
				color : '#000'
			}
		};
	},
	
	init : (inner, self) => {
		
		let mapWrapper;
		self.append(DIV({
			style : {
				position : 'relative'
			},
			c : [
				
				DIV({
					style : {
						paddingTop : 60,
						textAlign : 'center'
					},
					c : [
					H2({
						style : {
							textAlign : 'center',
							fontSize : 16,
							color : '#fff',
							borderTop : '1px solid #fff',
							width : 120,
							margin : 'auto',
							paddingTop : 30
						},
						c : '오시는 길'
					})]
				}),
				
				mapWrapper = DIV({
					style : {
						margin : 'auto',
						marginTop : 40,
						height : 250
					}
				}),
				
				A({
					style : {
						position : 'absolute',
						top : 360,
						right : 14,
						zIndex : 9
					},
					href : 'https://map.naver.com/v5/search/%ED%99%80%EB%A6%AC%EB%8D%B0%EC%9D%B4%EC%9D%B8%EA%B4%91%EC%A3%BC/place/19560475?c=14119514.1500732,4183961.0868027,18,0,0,0,dh',
					target : '_blank',
					c : [
						IMG({
							style : {
								flt : 'left',
								width : 30,
								borderRadius : 10
							},
							src : DYWedding.R('navermap.png')
						})
					]
				}),
				
				DIV({
					style : {
						position : 'relative',
						backgroundColor : '#fff',
						color : '#000',
						padding : '40px 20px',
						lineHeight : '2em',
						fontSize : 12
					},
					c : [H3({
						style : {
							fontSize : 16,
							fontWeight : 'bold'
						},
						c : '홀리데이인광주 호텔, 3층 컨벤션홀'
					}), P({
						c : '광주광역시 서구 상무누리로 55'
					}), P({
						c : [A({
							href : 'tel:0626107000',
							c : '062-610-7000'
						})]
					}),
					
					A({
						style : {
							position : 'absolute',
							top : 44,
							right : 20
						},
						href : 'tel:0626107000',
						c : IMG({
							style : { width : 16 },
							src : DYWedding.R('phone.png')
						})
					}),
					
					DIV({
						style : {
							marginTop : 30
						},
						c : [
						H3({
							style : {
								fontSize : 16
							},
							c : '지하철'
						}),
						P({
							c : '김대중컨벤션역(마륵역) 4번 출구 하차 후 도보 5분'
						})
						]
					}),
					
					DIV({
						style : {
							marginTop : 20
						},
						c : [
						H3({
							style : {
								fontSize : 16
							},
							c : '버스'
						}),
						P({
							c : '김대중컨벤션센터 하차: 38, 64, 1000'
						}),
						P({
							c : '마륵역 하차: 19, 20, 38, 62, 69, 73, 160, 270'
						}),
						P({
							c : '5.18자유공원 하차: 1, 518'
						})
						]
					}),
					
					DIV({
						style : {
							marginTop : 20
						},
						c : [
						H3({
							style : {
								fontSize : 16
							},
							c : '주차안내'
						}),
						P({
							c : '김대중컨벤션센터 제1야외주차장 이용'
						}),
						P({
							c : '홀리데이 인 광주호텔 지하주차장 이용'
						})
						]
					})]
				})
			]
		}));
		
		self.on('show', () => {
			
			let map = new kakao.maps.Map(mapWrapper.getEl(), {
				center : new kakao.maps.LatLng(35.1477065, 126.8381013),
				level : 4
			});
			
			new kakao.maps.Marker({
				position : new kakao.maps.LatLng(35.1477065, 126.8381013),
				image : new kakao.maps.MarkerImage(DYWedding.R('marker.png'), new kakao.maps.Size(50, 50))
			}).setMap(map);
			
			let overlay = new kakao.maps.CustomOverlay({
				position : new kakao.maps.LatLng(35.1477065, 126.8381013),
				content : DIV({
					style : {
						marginTop : -60,
						border : '1px solid #999',
						backgroundColor : '#fff',
						borderRadius : 3,
						padding : '2px 5px',
						fontWeight : 'bold',
						fontSize : 12
					},
					c : 'Som & Youngjae'
				}).getEl()
			});
			overlay.setMap(map);
		});
	}
});
