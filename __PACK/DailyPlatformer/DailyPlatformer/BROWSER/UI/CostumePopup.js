DailyPlatformer.CostumePopup = CLASS({
	
	preset : () => {
		return SkyEngine.FixedNode;
	},
	
	init : (inner, self, player) => {
		//OPTIONAL: player
		
		let settingStore = DailyPlatformer.STORE('settingStore');
		
		self.append(SkyEngine.Node({
			domStyle : {
				zIndex : 999999
			},
			dom : DIV({
				style : {
					width : 720,
					height : 1280,
					backgroundColor : 'rgba(0, 0, 0, 0.5)'
				}
			})
		}));
		
		let costumeList;
		let goldPanel;
		self.append(SkyEngine.Node({
			domStyle : {
				zIndex : 9999999
			},
			dom : DIV({
				style : {
					width : 691,
					height : 1102,
					backgroundImage : DailyPlatformer.R('UI/Costume.png')
				},
				c : [H2({
					style : {
						position : 'absolute',
						top : 30,
						left : 100,
						fontFamily : 'Nanum Gothic',
						color : '#fff',
						fontSize : 50
					},
					c : '의상 바꾸기'
				}), A({
					style : {
						position : 'absolute',
						top : 20,
						right : 20
					},
					c : IMG({
						src : DailyPlatformer.R('UI/BtnClose.png')
					}),
					on : {
						tap : () => {
							if (settingStore.get('isSoundOff') !== true) {
								SOUND_ONCE({
									ogg : DailyPlatformer.R('Sound/button.ogg'),
									mp3 : DailyPlatformer.R('Sound/button.mp3')
								});
							}
							
							self.remove();
						}
					}
				}), costumeList = DIV({
					style : {
						position : 'absolute',
						top : 160,
						left : 4,
						width : 684,
						height : 819,
						overflowY : 'scroll'
					}
				}), goldPanel = DIV({
					style : {
						position : 'absolute',
						bottom : 50,
						left : 100,
						fontFamily : 'Nanum Gothic',
						color : '#FFD64F',
						fontSize : 48,
						width : 565,
						textAlign : 'center'
					},
					c : settingStore.get('signedUserData').gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
				})]
			})
		}));
		
		let wearingCostumeButton;
		
		EACH(DailyPlatformer.Costumes, (info, costumeType) => {
			
			let existed = false;
			
			EACH(settingStore.get('costumeDataSet'), (costumeData) => {
				if (costumeData.type === costumeType) {
					existed = true;
					return false;
				}
			});
			
			let button;
			
			costumeList.append(DIV({
				style : {
					position : 'relative',
					marginLeft : 42,
					marginBottom : 40,
					flt : 'left',
					width : 172,
					height : 272,
					backgroundImage : DailyPlatformer.R('UI/CostumeListBg.png'),
					fontFamily : 'Nanum Gothic',
					textAlign : 'center'
				},
				c : [H5({
					style : {
						position : 'absolute',
						top : 18,
						left : 0,
						width : 172,
						fontSize : 20,
						textShadow : SkyEngine.TextBorderShadow('#000')
					},
					c : info.name
				}), IMG({
					style : {
						marginTop : 58
					},
					src : info.imgSrc
				}), button = UUI.V_CENTER({
					style : {
						position : 'absolute',
						bottom : 15,
						left : 10,
						width : 150,
						height : 64,
						backgroundImage : settingStore.get('signedUserData').costumeType === costumeType ? DailyPlatformer.R('UI/BtnSmallGray.png') : (existed === true ? DailyPlatformer.R('UI/BtnSmallGreen.png') : DailyPlatformer.R('UI/BtnSmallYellow.png')),
						fontSize : 30,
						textShadow : SkyEngine.TextBorderShadow('#000'),
						cursor : 'pointer',
						color : settingStore.get('signedUserData').costumeType === costumeType || existed === true ? '#fff' : '#FFCC66'
					},
					c : settingStore.get('signedUserData').costumeType === costumeType ? '착용중' : (existed === true ? '교체' : UUI.BUTTON_H({
						style : {
							margin : 'auto'
						},
						icon : IMG({
							src : DailyPlatformer.R('UI/IconGold.png')
						}),
						spacing : 20,
						title : info.gold
					})),
					on : {
						tap : () => {
							if (settingStore.get('isSoundOff') !== true) {
								SOUND_ONCE({
									ogg : DailyPlatformer.R('Sound/button.ogg'),
									mp3 : DailyPlatformer.R('Sound/button.mp3')
								});
							}
							
							// 갖고 있는지 다시한번 체크
							EACH(settingStore.get('costumeDataSet'), (costumeData) => {
								if (costumeData.type === costumeType) {
									existed = true;
									return false;
								}
							});
							
							// 이미 갖고 있는 것이면 착용
							if (existed === true) {
								
								wearingCostumeButton.addStyle({
									backgroundImage : DailyPlatformer.R('UI/BtnSmallGreen.png')
								});
								
								wearingCostumeButton.empty();
								wearingCostumeButton.append('교체');
								
								button.addStyle({
									backgroundImage : DailyPlatformer.R('UI/BtnSmallGray.png')
								});
								
								button.empty();
								button.append('착용중');
								
								wearingCostumeButton = button;
								
								POST({
									uri : 'wearCostume',
									data : {
										userId : settingStore.get('signedUserData').id,
										costumeType : costumeType
									}
								});
								
								let signedUserData = settingStore.get('signedUserData');
								
								signedUserData.costumeType = costumeType;
								
								settingStore.save({
									name : 'signedUserData',
									value : signedUserData
								});
								
								/*
								DailyPlatformer.UserModel.update({
									id : settingStore.get('signedUserData').id,
									costumeType : costumeType
								});
								*/
								
								// 서버로 전달
								DailyPlatformer.Game.getGameRoom().send({
									methodName : 'changeSkin',
									data : costumeType
								});
								
								if (player !== undefined) {
									player.changeCostume(costumeType);
								}
							}
							
							// 없으면 구매
							else {
								
								if (settingStore.get('signedUserData').gold < info.gold) {
									alert('골드가 부족합니다.');
								}
								
								// 구매 완료
								else {
									
									// 골드 줄이기
									/*
									DailyPlatformer.UserModel.update({
										id : settingStore.get('signedUserData').id,
										$inc : {
											gold : -info.gold
										}
									});
									*/
									
									goldPanel.empty();
									goldPanel.append((settingStore.get('signedUserData').gold - info.gold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
									
									// 골드 줄이기
									let signedUserData = settingStore.get('signedUserData');
									
									signedUserData.gold -= info.gold;
									
									settingStore.save({
										name : 'signedUserData',
										value : signedUserData
									});
									
									// 코스튬 생성
									POST({
										uri : 'buyCostume',
										data : {
											userId : settingStore.get('signedUserData').id,
											costumeType : costumeType,
											gold : info.gold
										}
									}, (costumeData) => {
										costumeData = PARSE_STR(costumeData);
										
										let costumeDataSet = settingStore.get('costumeDataSet');
										
										costumeDataSet.push(costumeData);
										
										settingStore.save({
											name : 'costumeDataSet',
											value : costumeDataSet
										});
									});
									
									/*
									DailyPlatformer.CostumeModel.create({
										userId : settingStore.get('signedUserData').id,
										type : costumeType
									}, (costumeData) => {
										
										let costumeDataSet = settingStore.get('costumeDataSet');
										
										costumeDataSet.push(costumeData);
										
										settingStore.save({
											name : 'costumeDataSet',
											value : costumeDataSet
										});
									});
									*/
									
									// 버튼 변경
									existed = true;
									
									button.addStyle({
										backgroundImage : DailyPlatformer.R('UI/BtnSmallGreen.png'),
										color : '#fff'
									});
									
									button.empty();
									button.append('교체');
								}
							}
						}
					}
				})]
			}));
			
			if (settingStore.get('signedUserData').costumeType === costumeType) {
				wearingCostumeButton = button;
			}
		});
		
		costumeList.append(CLEAR_BOTH());
	}
});
