DYWedding.Map = CLASS({

	preset : () => {
		return DIV;
	},

	params : () => {
		return {
			style : {
				onDisplayResize : (width, height) => {
					return {
						width : width
					};
				},
				backgroundColor : '#fff',
				color : '#000',
				padding : '80px 0'
			}
		};
	},
	
	init : (inner, self) => {
		
		let mapWrapper;
		self.append(DIV({
			c : [
				
				H2({
					style : {
						textAlign : 'center',
						fontSize : 30
					},
					c : '오시는 길'
				}),
				
				DIV({
					style : {
						marginTop : 20,
						textAlign : 'center',
						fontSize : 16
					},
					c : [P({
						style : {
							lineHeight : '2em'
						},
						c : '홀리데이 인 광주 3층 컨벤션홀'
					}), P({
						style : {
							lineHeight : '2em'
						},
						c : '광주광역시 서구 상무누리로 55'
					}), P({
						style : {
							lineHeight : '2em'
						},
						c : ['전화번호 ', A({
							href : 'tel:0626107000',
							c : '062-610-7000'
						})]
					})]
				}),
				
				mapWrapper = DIV({
					style : {
						margin : 'auto',
						marginTop : 20,
						width : '100%',
						height : 250
					}
				}),
				
				DIV({
					c : [
					A({
						style : {
							float : 'left',
							fontSize : 20
						},
						c : '카카오 네비',
						on : {
							tap : () => {
								Kakao.Navi.start({
									name : '홀리데이 인 광주',
									x : 126.8381013,
									y : 35.1477065,
									coordType : 'wgs84'
								});
							}
						}
					}),
					
					A({
						style : {
							float : 'right',
							fontSize : 20
						},
						href : 'https://map.naver.com/v5/search/%ED%99%80%EB%A6%AC%EB%8D%B0%EC%9D%B4%EC%9D%B8%EA%B4%91%EC%A3%BC/place/19560475?c=14119514.1500732,4183961.0868027,18,0,0,0,dh',
						target : '_blank',
						c : '지도 보기'
					}),
					
					CLEAR_BOTH()]
				}),
				
				DIV({
					style : {
						marginTop : 50,
						padding : '0 30px'
					},
					c : [
					H3({
						style : {
							fontSize : 20
						},
						c : '지하철'
					}),
					P({
						c : '김대중컨벤션역(마륵역) 4번 출구 하차 후 도보 5분 거리'
					})
					]
				}),
				
				DIV({
					style : {
						marginTop : 30,
						padding : '0 30px'
					},
					c : [
					H3({
						style : {
							fontSize : 20
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
						marginTop : 30,
						padding : '0 30px'
					},
					c : [
					H3({
						style : {
							fontSize : 20
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
				})
			]
		}));
		
		self.on('show', () => {
			
			let map = new kakao.maps.Map(mapWrapper.getEl(), {
				center : new kakao.maps.LatLng(35.1477065, 126.8381013),
				level : 3
			});
			
			new kakao.maps.Marker({
				position : new kakao.maps.LatLng(35.1477065, 126.8381013)
			}).setMap(map);
		});
	}
});
