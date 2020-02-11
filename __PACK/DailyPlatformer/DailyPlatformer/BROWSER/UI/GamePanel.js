DailyPlatformer.GamePanel = CLASS((cls) => {
	
	let bgm;
	
	return {
		
		preset : () => {
			return SkyEngine.FixedNode;
		},
		
		init : (inner, self, params, start) => {
			//REQUIRED: params
			//REQUIRED: params.player
			//OPTIONAL: params.bestRecord
			
			let player = params.player;
			let bestRecord = params.bestRecord;
			
			let settingStore = DailyPlatformer.STORE('settingStore');
			let gameRoom = DailyPlatformer.Game.getGameRoom();
			
			let isDontStopBGM = false;
			
			let visibilitychangeEvent;
			
			if (bgm === undefined) {
				bgm = SOUND({
					ogg : DailyPlatformer.R('Sound/main.ogg'),
					mp3 : DailyPlatformer.R('Sound/main.mp3'),
					isLoop : true
				});
				
				if (settingStore.get('isSoundOff') !== true) {
					bgm.play();
				}
				
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
			
			let dontStopBGM = self.dontStopBGM = () => {
				isDontStopBGM = true;
			};
			
			self.on('remove', () => {
				if (isDontStopBGM !== true) {
					bgm.stop();
					bgm = undefined;
					
					if (visibilitychangeEvent !== undefined) {
						visibilitychangeEvent.remove();
					}
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
								DailyPlatformer.CostumePopup(player).appendTo(SkyEngine.Screen);
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
			
			// 타이머
			let second = 0;
			let timer;
			
			self.append(SkyEngine.Node({
				y : -585,
				dom : timer = DIV({
					style : {
						fontFamily : 'Nanum Gothic',
						color : '#FFD64F',
						textShadow : SkyEngine.TextBorderShadow('#000'),
						fontSize : 50
					},
					c : '00:00'
				})
			}));
			
			let timerInterval = SkyEngine.Interval(1, () => {
				second += 1;
				
				timer.empty();
				
				let m = INTEGER(second / 60);
				let s = second % 60;
				timer.append((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
			});
			
			// 오늘의 최고 기록
			self.append(SkyEngine.Node({
				y : -530,
				dom : UUI.V_CENTER({
					style : {
						fontFamily : 'Nanum Gothic',
						backgroundImage : DailyPlatformer.R('UI/TimeBar.png'),
						width : 304,
						height : 38,
						textAlign : 'center',
						fontSize : 20
					},
					c : '오늘의 최고 기록 : ' + (bestRecord === undefined ? '기록 없음' : bestRecord + '초')
				})
			}));
			
			// 키를 눌렀다.
			let keydownEvent = EVENT('keydown', (e) => {
				
				if (e.getKey() === 'ArrowLeft') {
					player.moveLeft();
					gameRoom.send('moveLeft');
				}
				
				if (e.getKey() === 'ArrowRight') {
					player.moveRight();
					gameRoom.send('moveRight');
				}
				
				if (e.getKey() === ' ') {
					player.jump();
					gameRoom.send('jump');
				}
			});
			
			// 키를 뗐다.
			let keyupEvent = EVENT('keyup', (e) => {
				
				if (e.getKey() === 'ArrowLeft') {
					player.stopLeft();
					gameRoom.send({
						methodName : 'stopLeft',
						data : {
							x : player.getX(),
							y : player.getY()
						}
					});
				}
				
				if (e.getKey() === 'ArrowRight') {
					player.stopRight();
					gameRoom.send({
						methodName : 'stopRight',
						data : {
							x : player.getX(),
							y : player.getY()
						}
					});
				}
				
				if (e.getKey() === ' ') {
					player.stopJump();
					gameRoom.send('stopJump');
				}
			});
			
			self.on('remove', () => {
				
				if (timerInterval !== undefined) {
					timerInterval.remove();
				}
				
				if (keydownEvent !== undefined) {
					keydownEvent.remove();
				}
				if (keyupEvent !== undefined) {
					keyupEvent.remove();
				}
			});
			
			let joystick;
			let jumpButton;
			
			if (INFO.checkIsTouchDevice() === true) {
				
				joystick = SkyJoystick.LeftAndRight({
					img : IMG({
						style : {
							width : 160
						},
						src : DailyPlatformer.R('UI/Joystick.png')
					}),
					on : {
						
						left : () => {
							player.moveLeft();
							gameRoom.send('moveLeft');
						},
						
						right : () => {
							player.moveRight();
							gameRoom.send('moveRight');
						},
						
						touchend : () => {
							player.stop();
							gameRoom.send({
								methodName : 'stop',
								data : {
									x : player.getX(),
									y : player.getY()
								}
							});
						}
					}
				}).appendTo(BODY);
				
				jumpButton = SkyJoystick.KeySet({
					keys : [SkyJoystick.Key({
						img : IMG({
							style : {
								width : 73.5
							},
							src : DailyPlatformer.R('UI/BtnJump.png')
						}),
						value : 'Jump'
					})],
					on : {
						change : (e, keySet) => {
							player.jump();
							gameRoom.send('jump');
						},
						touchend : () => {
							player.stopJump();
							gameRoom.send('stopJump');
						}
					}
				}).appendTo(BODY);
				
				UANI.FADE_IN({
					node : joystick,
					duration : 0.5
				});
				
				UANI.FADE_IN({
					node : jumpButton,
					duration : 0.5
				});
				
				self.on('remove', () => {
					if (joystick !== undefined) {
						joystick.remove();
					}
					if (jumpButton !== undefined) {
						jumpButton.remove();
					}
				});
			}
			
			self.setAlpha(0);
			self.fadeIn(2);
			
			let win = self.win = () => {
				
				let signedUserData = settingStore.get('signedUserData');
				
				signedUserData.gold += 10;
				
				settingStore.save({
					name : 'signedUserData',
					value : signedUserData
				});
				
				gameRoom.send({
					methodName : 'win',
					data : second
				}, (records) => {
					//DailyPlatformer.WinPopup(records, start).appendTo(SkyEngine.Screen);
				});
				
				POST({
					uri : 'win',
					data : {
						userId : signedUserData.id,
						second : second
					}
				}, (records) => {
					records = PARSE_STR(records);
					
					DailyPlatformer.WinPopup(records, start).appendTo(SkyEngine.Screen);
				});
				
				player.stop();
				
				bgm.stop();
				bgm = undefined;
				
				timerInterval.remove();
				timerInterval = undefined;
				
				keydownEvent.remove();
				keydownEvent = undefined;
				
				keyupEvent.remove();
				keyupEvent = undefined;
				
				if (joystick !== undefined) {
					joystick.remove();
					joystick = undefined;
				}
				
				if (jumpButton !== undefined) {
					jumpButton.remove();
					jumpButton = undefined;
				}
			};
		}
	};
});
