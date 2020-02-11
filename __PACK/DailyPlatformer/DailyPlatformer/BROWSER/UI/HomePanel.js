DailyPlatformer.HomePanel = CLASS({
	
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
		
		let bgm = SOUND({
			ogg : DailyPlatformer.R('Sound/loading.ogg'),
			mp3 : DailyPlatformer.R('Sound/loading.mp3'),
			isLoop : true
		});
		
		let visibilitychangeEvent;
		
		if (settingStore.get('isSoundOff') !== true) {
			bgm.play();
			
			visibilitychangeEvent = EVENT('visibilitychange', () => {
				if (settingStore.get('isSoundOff') !== true) {
					if (document.hidden === true) {
						bgm.pause();
					} else {
						bgm.play();
					}
				}
			});
		}
		
		self.on('remove', () => {
			bgm.stop();
			bgm = undefined;
			
			if (visibilitychangeEvent !== undefined) {
				visibilitychangeEvent.remove();
			}
		});
		
		// 코스튬 버튼
		self.append(SkyEngine.Node({
			x : -305,
			y : -585,
			dom : A({
				c : IMG({
					src : DailyPlatformer.R('UI/BtnCostume.png')
				}),
				on : {
					tap : () => {
						if (settingStore.get('isSoundOff') !== true) {
							SOUND_ONCE({
								ogg : DailyPlatformer.R('Sound/button.ogg'),
								mp3 : DailyPlatformer.R('Sound/button.mp3')
							});
						}
						
						if (settingStore.get('costumeDataSet') !== undefined) {
							DailyPlatformer.CostumePopup().appendTo(SkyEngine.Screen);
						}
					}
				}
			})
		}));
		
		// 소리 세팅 버튼
		let soundButtonImg;
		self.append(SkyEngine.Node({
			x : 305,
			y : -585,
			dom : A({
				c : soundButtonImg = IMG({
					src : settingStore.get('isSoundOff') === true ? DailyPlatformer.R('UI/BtnSoundOff.png') : DailyPlatformer.R('UI/BtnSoundOn.png')
				}),
				on : {
					tap : () => {
						settingStore.save({
							name : 'isSoundOff',
							value : settingStore.get('isSoundOff') !== true
						});
						soundButtonImg.setSrc(settingStore.get('isSoundOff') === true ? DailyPlatformer.R('UI/BtnSoundOff.png') : DailyPlatformer.R('UI/BtnSoundOn.png'));
						
						if (settingStore.get('isSoundOff') === true) {
							bgm.stop();
						} else {
							bgm.play();
						}
					}
				}
			})
		}));
		
		// 타이틀
		self.append(SkyEngine.Node({
			y : -280,
			dom : IMG({
				src : DailyPlatformer.R('UI/Title.png')
			})
		}));
		
		// 정보
		let bestRecordPanel;
		let myRecordPanel;
		let myRankPanel;
		self.append(SkyEngine.Node({
			y : 360,
			dom : DIV({
				style : {
					fontFamily : 'Nanum Gothic',
					backgroundImage : DailyPlatformer.R('UI/TitleInfo.png'),
					width : 595,
					height : 221,
					color : '#616672',
					fontSize : 22
				},
				c : [DIV({
					style : {
						position : 'absolute',
						top : 120,
						width : 198,
						textAlign : 'center'
					},
					c : ['오늘의 최고 기록', bestRecordPanel = DIV({
						style : {
							marginTop : 5,
							color : '#FF7000',
							fontSize : 30
						},
						c : bestRecord === undefined ? '기록 없음' : bestRecord + '초'
					})]
				}), DIV({
					style : {
						position : 'absolute',
						left : 198,
						top : 120,
						width : 198,
						textAlign : 'center'
					},
					c : ['오늘 나의 기록', myRecordPanel = DIV({
						style : {
							marginTop : 5,
							color : '#FF7000',
							fontSize : 30
						},
						c : myRecord === undefined ? '기록 없음' : myRecord + '초'
					})]
				}), DIV({
					style : {
						position : 'absolute',
						left : 397,
						top : 120,
						width : 198,
						textAlign : 'center'
					},
					c : ['오늘 나의 랭킹', myRankPanel = DIV({
						style : {
							marginTop : 5,
							color : '#FF7000',
							fontSize : 30
						},
						c : myRank === undefined ? '기록 없음' : myRank + '등'
					})]
				})]
			})
		}));
		
		// 시작 버튼
		self.append(SkyEngine.Node({
			y : 538,
			dom : UUI.V_CENTER({
				style : {
					width : 639,
					height : 143,
					backgroundImage : DailyPlatformer.R('UI/BtnStart.png'),
					textAlign : 'center',
					fontSize : 65,
					fontFamily : 'Nanum Gothic',
					color : '#FFEA4F',
					cursor : 'pointer'
				},
				contentStyle : {
					paddingBottom : 10
				},
				c : '게임 시작',
				on : {
					tap : () => {
						
						if (settingStore.get('isSoundOff') !== true) {
							SOUND_ONCE({
								ogg : DailyPlatformer.R('Sound/button.ogg'),
								mp3 : DailyPlatformer.R('Sound/button.mp3')
							});
						}
						
						self.fadeOut(2, () => {
							start(bestRecord);
						});
					}
				}
			})
		}));
	}
});
