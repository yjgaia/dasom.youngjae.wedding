DailyPlatformer.Game = CLASS((cls) => {
	
	let tileMap;
	
	let totalCol = 0;
	let maxX = 0;
	
	let gameRoom;
	
	let getTileMap = cls.getTileMap = () => {
		return tileMap;
	};
	
	let getTotalCol = cls.getTotalCol = () => {
		return totalCol;
	};
	
	let getMaxX = cls.getMaxX = () => {
		return maxX;
	};
	
	let getGameRoom = cls.getGameRoom = () => {
		return gameRoom;
	};
	
	return {
		
		preset : () => {
			return VIEW;
		},
		
		init : (inner) => {
			
			let settingStore = DailyPlatformer.STORE('settingStore');
			
			if (gameRoom === undefined) {
				gameRoom = DailyPlatformer.ROOM('Game');
			}
			
			let ready = () => {
				
				let characters = {};
				
				// 배경
				SkyEngine.Background({
					c : SkyEngine.Rect({
						color : '#AFE1FA',
						width : 1280,
						height : 1280
					})
				}).appendTo(SkyEngine.Screen);
				
				let stage = SkyEngine.Node({
					x : -300,
					y : -640
				}).appendTo(SkyEngine.Screen);
				
				let goal;
				
				// 스테이지 정보를 불러옴
				GET({
					uri : 'getStageInfo',
					data : settingStore.get('signedUserData').id
				}, (stageInfo) => {
					stageInfo = PARSE_STR(stageInfo);
					
					let sections = [];
					
					sections.push([
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[1,1,1,1],
						[1,1,1,1],
						[1,1,1,1],
						[1,1,1,1]
					]);
					
					EACH(stageInfo.sections, (section) => {
						sections.push(DailyPlatformer.Sections[section]);
					});
					
					sections.push([
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[1,1,1,1,1,1],
						[1,1,1,1,1,1],
						[1,1,1,1,1,1],
						[1,1,1,1,1,1]
					]);
					
					let tileKeyMap = [];
					
					EACH(sections, (_tileKeyMap) => {
						
						let maxCol = 0;
						
						EACH(_tileKeyMap, (tileKeys, i) => {
							
							if (tileKeyMap[i] === undefined) {
								tileKeyMap[i] = [];
							}
							
							if (maxCol < tileKeys.length) {
								maxCol = tileKeys.length;
							}
							
							EACH(tileKeys, (tileKey, j) => {
								tileKeyMap[i][totalCol + j] = tileKey;
							});
						});
						
						totalCol += maxCol;
					});
					
					maxX = (totalCol - 1) * 126;
					
					// 타일 생성
					tileMap = SkyEngine.TileMap({
						tileWidth : 126,
						tileHeight : 126,
						tileSet : {
							1 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.Ground({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							},
							2 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.Water({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							},
							3 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.Cloud({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							},
							4 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.Tree({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							},
							5 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.Leaf({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							},
							6 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.Rail({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							},
							7 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.Train({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							},
							8 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.Monster({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							},
							9 : (row, col) => {
								if (col >= 4 && col < totalCol - 6) {
									return DailyPlatformer.WaterMonster({
										tileKeyMap : tileKeyMap,
										row : row,
										col : col
									});
								}
							}
						},
						tileKeyMap : tileKeyMap
					}).appendTo(stage);
					
					// 시작 지점
					tileMap.append(SkyEngine.CollisionTile({
						x : 191,
						y : 1072,
						c : SkyEngine.Image({
							centerY : 75,
							src : DailyPlatformer.R('Object/StartSection.png')
						}),
						collider : SkyEngine.Rect({
							width : 126 * 4,
							height : 126 * 4
						}),
						isToCheckCollision : true
					}));
					
					// 도착 지점
					tileMap.append(SkyEngine.CollisionTile({
						x : (totalCol - 6) * 126 + 312,
						y : 1072,
						c : SkyEngine.Image({
							centerY : 75,
							src : DailyPlatformer.R('Object/FinishSection.png')
						}),
						collider : SkyEngine.Rect({
							width : 126 * 6,
							height : 126 * 4
						}),
						isToCheckCollision : true
					}));
					
					goal = SkyEngine.Node({
						x : (totalCol - 4) * 126 + 100,
						y : 780,
						collider : SkyEngine.Rect({
							width : 63,
							height : 63
						})
					}).appendTo(stage);
					
					let player;
					let gamePanel;
					
					// 게임 시작
					let start = (bestRecord) => {
						
						if (player !== undefined) {
							player.remove();
						}
						
						// 내 캐릭터 생성
						player = DailyPlatformer.Character({
							x : 189,
							y : 693,
							nickname : settingStore.get('signedUserData').nickname,
							costumeType : settingStore.get('signedUserData').costumeType,
							isPlayer : true
						}).appendTo(stage);
						
						// 화면 밖으로 = 사망
						player.on('offscreen', () => {
							if (player.getY() > 1000) {
								player.die();
								player = undefined;
								gameRoom.send('die');
								
								SkyEngine.Delay(1, () => {
									start(bestRecord);
								});
							}
						});
						
						// 사망
						player.onMeet(DailyPlatformer.DeadZone, () => {
							player.die();
							player = undefined;
							gameRoom.send('die');
							
							SkyEngine.Delay(1, () => {
								start(bestRecord);
							});
						});
						
						// 승리!
						let isAlreadyWin = false;
						player.onMeet(goal, () => {
							if (isAlreadyWin !== true) {
								gamePanel.win();
								isAlreadyWin = true;
							}
						});
						
						SkyEngine.Screen.cameraFollowX({
							target : player,
							minX : 0,
							maxX : (totalCol - 6) * 126
						});
						
						if (homePanel !== undefined) {
							homePanel.remove();
							homePanel = undefined;
						}
						
						if (gamePanel !== undefined) {
							gamePanel.dontStopBGM();
							gamePanel.remove();
						}
						
						gamePanel = DailyPlatformer.GamePanel({
							player : player,
							bestRecord : bestRecord
						}, start).appendTo(SkyEngine.Screen);
						
						// 다른 사람들에게 전송
						gameRoom.send('enter');
					};
					
					let homePanel = DailyPlatformer.HomePanel(stageInfo, start).appendTo(SkyEngine.Screen);
					
					gameRoom.send({
						methodName : 'connect',
						data : settingStore.get('signedUserData').id
					}, (userInfos) => {
						
						// 유저 생성
						EACH(userInfos, (userInfo, userId) => {
							
							if (characters[userId] !== undefined) {
								characters[userId].remove();
							}
							
							characters[userId] = DailyPlatformer.Character({
								x : userInfo.x,
								y : userInfo.y,
								nickname : userInfo.nickname,
								costumeType : userInfo.costumeType
							}).appendTo(stage);
							
							if (userInfo.direction === 'left') {
								characters[userId].setX(userInfo.x - 500 * TIME(userInfo.moveStartTime) / 1000);
								characters[userId].moveLeft();
							}
							
							if (userInfo.direction === 'right') {
								characters[userId].setX(userInfo.x + 500 * TIME(userInfo.moveStartTime) / 1000);
								characters[userId].moveRight();
							}
						});
						
						// 다른 사람이 접속했을 때
						gameRoom.on('enter', (userInfo) => {
							
							if (characters[userInfo.userId] !== undefined) {
								characters[userInfo.userId].remove();
							}
							
							characters[userInfo.userId] = DailyPlatformer.Character({
								x : userInfo.x,
								y : userInfo.y,
								nickname : userInfo.nickname,
								costumeType : userInfo.costumeType
							}).appendTo(stage);
						});
						
						// 다른 사람이 스킨을 변경했을 때
						gameRoom.on('changeSkin', (info) => {
							if (characters[info.userId] !== undefined && characters[info.userId].checkIsRemoved() !== true) {
								characters[info.userId].changeCostume(info.costumeType);
							}
						});
						
						// 다른 사람이 명령을 입력했을 때
						gameRoom.on('moveLeft', (userId) => {
							if (characters[userId] !== undefined && characters[userId].checkIsRemoved() !== true) {
								characters[userId].moveLeft();
							}
						});
						gameRoom.on('moveRight', (userId) => {
							if (characters[userId] !== undefined && characters[userId].checkIsRemoved() !== true) {
								characters[userId].moveRight();
							}
						});
						gameRoom.on('stop', (info) => {
							if (characters[info.userId] !== undefined && characters[info.userId].checkIsRemoved() !== true) {
								characters[info.userId].setPosition({
									x : info.x,
									y : info.y
								});
								characters[info.userId].stop();
							}
						});
						gameRoom.on('stopLeft', (info) => {
							if (characters[info.userId] !== undefined && characters[info.userId].checkIsRemoved() !== true) {
								characters[info.userId].setPosition({
									x : info.x,
									y : info.y
								});
								characters[info.userId].stopLeft();
							}
						});
						gameRoom.on('stopRight', (info) => {
							if (characters[info.userId] !== undefined && characters[info.userId].checkIsRemoved() !== true) {
								characters[info.userId].setPosition({
									x : info.x,
									y : info.y
								});
								characters[info.userId].stopRight();
							}
						});
						gameRoom.on('jump', (userId) => {
							if (characters[userId] !== undefined && characters[userId].checkIsRemoved() !== true) {
								characters[userId].jump();
							}
						});
						gameRoom.on('stopJump', (userId) => {
							if (characters[userId] !== undefined && characters[userId].checkIsRemoved() !== true) {
								characters[userId].stopJump();
							}
						});
						gameRoom.on('die', (userId) => {
							if (characters[userId] !== undefined && characters[userId].checkIsRemoved() !== true) {
								characters[userId].die();
								delete characters[userId];
							}
						});
						gameRoom.on('win', (userId) => {
							if (characters[userId] !== undefined && characters[userId].checkIsRemoved() !== true) {
								characters[userId].stop();
							}
						});
						gameRoom.on('retry', (userInfo) => {
							if (characters[userInfo.userId] !== undefined && characters[userInfo.userId].checkIsRemoved() !== true) {
								characters[userInfo.userId].retry();
							}
						});
						
						// 다른 사람이 접속을 끊었을 때
						gameRoom.on('exit', (exitedUserId) => {
							if (characters[exitedUserId] !== undefined) {
								characters[exitedUserId].remove();
								delete characters[exitedUserId];
							}
						});
					});
				});
				
				GET({
					uri : 'getUserData',
					data : settingStore.get('signedUserData').id
				}, (result) => {
					result = PARSE_STR(result);
					
					settingStore.save({
						name : 'signedUserData',
						value : result.userData
					});
					
					settingStore.save({
						name : 'costumeDataSet',
						value : result.costumeDataSet
					});
				});
				
				/*
				DailyPlatformer.UserModel.getWatching(settingStore.get('signedUserData').id, (userData, addUpdateHandler) => {
					
					settingStore.save({
						name : 'signedUserData',
						value : userData
					});
					
					addUpdateHandler((userData) => {
						
						settingStore.save({
							name : 'signedUserData',
							value : userData
						});
					});
				});
				
				DailyPlatformer.CostumeModel.find({
					filter : {
						userId : settingStore.get('signedUserData').id
					}
				}, (costumeDataSet) => {
					settingStore.save({
						name : 'costumeDataSet',
						value : costumeDataSet
					});
				});
				*/
			};
			
			RUN((f) => {
				
				if (settingStore.get('signedUserData') === undefined) {
					
					let nickname = prompt('이름을 입력해주시기 바랍니다.');
					
					if (nickname === TO_DELETE) {
						alert('이름이 입력되지 않았습니다. 다시 이름을 입력하시려면 새로고침 해주시기 바랍니다.');
					} else {
						
						POST({
							uri : 'createUser',
							data : {
								nickname : nickname
							}
						}, (result) => {
							result = PARSE_STR(result);
							
							let validErros = result.validErros;
							let userData = result.userData;
							
							if (validErros !== undefined) {
								
								if (validErros.nickname !== undefined && validErros.nickname.type === 'notEmpty') {
									alert('이름이 입력되지 않았습니다. 다시 이름을 입력하시려면 새로고침 해주시기 바랍니다.');
								} else if (validErros.nickname !== undefined && validErros.nickname.type === 'size') {
									alert('이름은 최대 20자로 입력해주세요.');
									f();
								} else {
									alert('알 수 없는 오류입니다.');
									f();
								}
							}
							
							else if (userData !== undefined) {
								
								settingStore.save({
									name : 'signedUserData',
									value : userData
								});
								
								ready();
							}
						});
						
						/*
						DailyPlatformer.UserModel.create({
							nickname : nickname
						}, {
							notValid : (validErros) => {
								
								if (validErros.nickname !== undefined && validErros.nickname.type === 'notEmpty') {
									alert('이름이 입력되지 않았습니다. 다시 이름을 입력하시려면 새로고침 해주시기 바랍니다.');
								} else if (validErros.nickname !== undefined && validErros.nickname.type === 'size') {
									alert('이름은 최대 20자로 입력해주세요.');
									f();
								} else {
									alert('알 수 없는 오류입니다.');
									f();
								}
							},
							success : (userData) => {
								
								settingStore.save({
									name : 'signedUserData',
									value : userData
								});
								
								ready();
							}
						});
						*/
					}
				}
				
				else {
					
					GET({
						uri : 'checkUserExists',
						data : settingStore.get('signedUserData').id
					}, (result) => {
						result = PARSE_STR(result);
						
						if (result.exists === true) {
							ready();
						} else {
							settingStore.remove('signedUserData');
							f();
						}
					});
					
					/*
					DailyPlatformer.UserModel.checkExists({
						filter : {
							id : settingStore.get('signedUserData').id
						}
					}, (exists) => {
						if (exists === true) {
							ready();
						} else {
							settingStore.remove('signedUserData');
							f();
						}
					});
					*/
				}
			});
		}
	};
});
