DailyPlatformer.GameRoom = OBJECT({

	init : (inner, self) => {
		
		let stageStore = DailyPlatformer.SHARED_STORE('stageStore');
		let userInfoStore = DailyPlatformer.SHARED_STORE('userInfoStore');
		let recordStore = DailyPlatformer.SHARED_STORE('recordStore');
		
		DISTRIBUTE_PROCESS({
			tag : 'stageInfo'
		}, () => {
			
			let sections = [];
			
			REPEAT(4, () => {
				sections.push(RANDOM(12));
			});
			
			stageStore.save({
				id : 'stageInfo',
				data : {
					sections : sections
				}
			});
		});
		
		DailyPlatformer.ROOM('Game', (clientInfo, on, off, send, broadcastExceptMe) => {
			
			let nowUserId;
			
			on('connect', (userId, ret) => {
				if (userId !== undefined) {
					
					nowUserId = userId;
					
					userInfoStore.all((userInfos) => {
						ret(userInfos);
					});
					
					/*
					stageStore.get('stageInfo', (stageInfo) => {
						
						userInfoStore.all((userInfos) => {
							
							recordStore.get(userId, {
								notExists : () => {
									
									ret({
										sections : stageInfo.sections,
										bestRecord : stageInfo.bestRecord,
										userInfos : userInfos
									});
								},
								success : (recordInfo) => {
									
									recordStore.count({
										second : {
											$lt : recordInfo.second
										}
									}, (count) => {
										
										ret({
											sections : stageInfo.sections,
											bestRecord : stageInfo.bestRecord,
											userInfos : userInfos,
											myRecord : recordInfo.second,
											myRank : count + 1
										});
									});
								}
							});
						});
					});
					*/
				}
			});
			
			// 접속
			on('enter', (notUsing, ret) => {
				if (nowUserId !== undefined) {
					
					DailyPlatformer.UserModel.get(nowUserId, (userData) => {
						
						broadcastExceptMe({
							roomName : 'Game',
							methodName : 'enter',
							data : {
								userId : nowUserId,
								nickname : userData.nickname,
								costumeType : userData.costumeType,
								x : 189,
								y : 693
							}
						});
						
						userInfoStore.save({
							id : nowUserId,
							data : {
								userId : nowUserId,
								nickname : userData.nickname,
								costumeType : userData.costumeType,
								x : 189,
								y : 693
							}
						});
					});
				}
			});
			
			// 스킨 변경
			on('changeSkin', (costumeType, ret) => {
				if (nowUserId !== undefined && costumeType !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'changeSkin',
						data : {
							userId : nowUserId,
							costumeType : costumeType
						}
					});
					
					userInfoStore.update({
						id : nowUserId,
						data : {
							costumeType : costumeType
						}
					}, {
						notExists : () => {
							// ignore.
						}
					});
				}
			});
			
			// 왼쪽으로 이동
			on('moveLeft', (notUsing, ret) => {
				if (nowUserId !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'moveLeft',
						data : nowUserId
					});
					
					userInfoStore.update({
						id : nowUserId,
						data : {
							direction : 'left',
							moveStartTime : new Date()
						}
					});
				}
			});
			
			// 오른쪽으로 이동
			on('moveRight', (notUsing, ret) => {
				if (nowUserId !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'moveRight',
						data : nowUserId
					});
					
					userInfoStore.update({
						id : nowUserId,
						data : {
							direction : 'right',
							moveStartTime : new Date()
						}
					});
				}
			});
			
			// 중지
			on('stop', (data, ret) => {
				if (nowUserId !== undefined && data !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'stop',
						data : {
							userId : nowUserId,
							x : data.x,
							y : data.y
						}
					});
					
					userInfoStore.update({
						id : nowUserId,
						data : {
							x : data.x,
							y : data.y,
							direction : TO_DELETE,
							moveStartTime : TO_DELETE
						}
					});
				}
			});
			
			on('stopLeft', (data, ret) => {
				if (nowUserId !== undefined && data !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'stopLeft',
						data : {
							userId : nowUserId,
							x : data.x,
							y : data.y
						}
					});
					
					userInfoStore.update({
						id : nowUserId,
						data : {
							x : data.x,
							y : data.y,
							direction : TO_DELETE,
							moveStartTime : TO_DELETE
						}
					});
				}
			});
			
			on('stopRight', (data, ret) => {
				if (nowUserId !== undefined && data !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'stopRight',
						data : {
							userId : nowUserId,
							x : data.x,
							y : data.y
						}
					});
					
					userInfoStore.update({
						id : nowUserId,
						data : {
							x : data.x,
							y : data.y,
							direction : TO_DELETE,
							moveStartTime : TO_DELETE
						}
					});
				}
			});
			
			// 점프
			on('jump', (notUsing, ret) => {
				if (nowUserId !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'jump',
						data : nowUserId
					});
				}
			});
			
			// 점프 중단
			on('stopJump', (notUsing, ret) => {
				if (nowUserId !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'stopJump',
						data : nowUserId
					});
				}
			});
			
			// 사망
			on('die', (notUsing, ret) => {
				if (nowUserId !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'die',
						data : nowUserId
					});
				}
			});
			
			// 승리
			on('win', (second, ret) => {
				if (nowUserId !== undefined && second !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'win',
						data : nowUserId
					});
					
					// 10 골드 증정
					/*DailyPlatformer.UserModel.update({
						id : nowUserId,
						$inc : {
							gold : 10
						}
					});
					
					NEXT([
					(next) => {
						recordStore.get(nowUserId, {
							notExists : () => {
								recordStore.save({
									id : nowUserId,
									data : {
										second : second
									}
								}, next);
							},
							success : (recordInfo) => {
								if (recordInfo.second > second) {
									recordStore.save({
										id : nowUserId,
										data : {
											second : second
										}
									}, next);
								} else {
									next(recordInfo);
								}
							}
						});
					},
					
					() => {
						return (recordInfo) => {
							
							stageStore.get('stageInfo', (stageInfo) => {
								
								if (stageInfo.bestRecord === undefined || stageInfo.bestRecord > recordInfo.second) {
									
									stageStore.update({
										id : 'stageInfo',
										data : {
											bestRecord : recordInfo.second
										}
									});
									
									ret({
										bestRecord : recordInfo.second,
										myRecord : recordInfo.second,
										myRank : 1
									});
								}
								
								else {
									
									recordStore.count({
										second : {
											$lt : recordInfo.second
										}
									}, (count) => {
										
										ret({
											bestRecord : stageInfo.bestRecord,
											myRecord : recordInfo.second,
											myRank : count + 1
										});
									});
								}
							});
						};
					}]);*/
				}
			});
			
			// 재도전
			on('retry', (notUsing, ret) => {
				if (nowUserId !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'retry',
						data : nowUserId
					});
					
					userInfoStore.update({
						id : nowUserId,
						data : {
							x : 189,
							y : 693
						}
					});
				}
			});
			
			// 접속 끊어짐
			on('__DISCONNECTED', () => {
				if (nowUserId !== undefined) {
					
					broadcastExceptMe({
						roomName : 'Game',
						methodName : 'exit',
						data : nowUserId
					});
					
					userInfoStore.remove(nowUserId, {
						notExists : () => {
							// ignore.
						}
					});
					
					nowUserId = undefined;
				}
			});
		});
	}
});
