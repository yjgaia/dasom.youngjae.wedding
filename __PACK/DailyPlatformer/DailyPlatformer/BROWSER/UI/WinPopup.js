DailyPlatformer.WinPopup = CLASS({
	
	preset : () => {
		return SkyEngine.FixedNode;
	},
	
	init : (inner, self, records, start) => {
		//REQUIRED: records
		//OPTIONAL: records.bestRecord
		//OPTIONAL: records.myRecord
		//OPTIONAL: records.myRank
		//REQUIRED: start
		
		let bestRecord = records.bestRecord;
		let myRecord = records.myRecord;
		let myRank = records.myRank;
		
		let settingStore = DailyPlatformer.STORE('settingStore');
		
		let winSound;
		
		if (settingStore.get('isSoundOff') !== true) {
			winSound = SOUND_ONCE({
				ogg : DailyPlatformer.R('Sound/win.ogg'),
				mp3 : DailyPlatformer.R('Sound/win.mp3')
			});
		}
		
		self.append(SkyEngine.Node({
			dom : DIV({
				style : {
					width : 720,
					height : 1280,
					backgroundColor : 'rgba(0, 0, 0, 0.5)'
				}
			})
		}));
		
		self.append(SkyEngine.Node({
			dom : DIV({
				style : {
					width : 691,
					height : 694,
					backgroundImage : DailyPlatformer.R('UI/Result.png'),
					fontFamily : 'Nanum Gothic',
					color : '#616672',
					fontSize : 22
				},
				c : [H2({
					style : {
						position : 'absolute',
						top : 30,
						left : 0,
						color : '#fff',
						fontSize : 50,
						width : 691,
						textShadow : SkyEngine.TextBorderShadow('#000'),
						textAlign : 'center'
					},
					c : '게임 결과'
				}),
				
				DIV({
					style : {
						position : 'absolute',
						left : 48,
						top : 270,
						width : 198,
						textAlign : 'center'
					},
					c : ['오늘의 최고 기록', DIV({
						style : {
							marginTop : 5,
							color : '#FF7000',
							fontSize : 30
						},
						c : bestRecord === undefined ? '기록 없음' : bestRecord % 60 + '초'
					})]
				}), DIV({
					style : {
						position : 'absolute',
						left : 246,
						top : 270,
						width : 198,
						textAlign : 'center'
					},
					c : ['오늘 나의 기록', DIV({
						style : {
							marginTop : 5,
							color : '#FF7000',
							fontSize : 30
						},
						c : myRecord === undefined ? '기록 없음' : myRecord % 60 + '초'
					})]
				}), DIV({
					style : {
						position : 'absolute',
						left : 445,
						top : 270,
						width : 198,
						textAlign : 'center'
					},
					c : ['오늘 나의 랭킹', DIV({
						style : {
							marginTop : 5,
							color : '#FF7000',
							fontSize : 30
						},
						c : myRank === undefined ? '기록 없음' : myRank + '등'
					})]
				}),
				
				DIV({
					style : {
						position : 'absolute',
						bottom : 234,
						left : 160,
						fontFamily : 'Nanum Gothic',
						color : '#FFD64F',
						textShadow : SkyEngine.TextBorderShadow('#000'),
						fontSize : 48
					},
					c : '10'
				}),
				DIV({
					style : {
						position : 'absolute',
						bottom : 240,
						right : 80,
						fontFamily : 'Nanum Gothic',
						color : '#919191',
						fontSize : 38
					},
					c : '골드 획득'
				}),
				
				UUI.V_CENTER({
					style : {
						color : '#fff',
						position : 'absolute',
						bottom : 40,
						left : 40,
						width : 254,
						height : 143,
						backgroundImage : DailyPlatformer.R('UI/BtnYellow.png'),
						fontSize : 48,
						textShadow : SkyEngine.TextBorderShadow('#000'),
						cursor : 'pointer',
						textAlign : 'center'
					},
					c : '자랑하기',
					on : {
						tap : () => {
							alert('자랑하기 기능은 준비중입니다.');
						}
					}
				}), UUI.V_CENTER({
					style : {
						color : '#fff',
						position : 'absolute',
						bottom : 40,
						right : 40,
						width : 342,
						height : 143,
						backgroundImage : DailyPlatformer.R('UI/BtnGreen.png'),
						fontSize : 48,
						textShadow : SkyEngine.TextBorderShadow('#000'),
						cursor : 'pointer'
					},
					c : UUI.BUTTON_H({
						style : {
							margin : 'auto'
						},
						icon : IMG({
							src : DailyPlatformer.R('UI/IconRetry.png')
						}),
						spacing : 15,
						title : '다시하기'
					}),
					on : {
						tap : () => {
							
							if (winSound !== undefined) {
								winSound.stop();
							}
							
							start(bestRecord);
							
							self.remove();
						}
					}
				})]
			})
		}));
		
		self.setAlpha(0);
		self.fadeIn(2);
	}
});
