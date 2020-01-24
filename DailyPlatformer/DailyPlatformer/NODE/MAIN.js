DailyPlatformer.MAIN = METHOD({

	run : (addRequestListener, addPreprocessor) => {
		
		let stageStore = DailyPlatformer.SHARED_STORE('stageStore');
		let userInfoStore = DailyPlatformer.SHARED_STORE('userInfoStore');
		let recordStore = DailyPlatformer.SHARED_STORE('recordStore');
		
		addRequestListener((requestInfo, _response, replaceRootPath, next) => {
			
			let uri = requestInfo.uri;
			let data = requestInfo.data;
			
			let response = (content) => {
				_response({
					headers : {
						'Access-Control-Allow-Origin' : '*'
					},
					content : content
				});
			};
			
			if (uri === 'createUser' && data !== undefined) {
				
				DailyPlatformer.UserModel.create({
					nickname : data.nickname
				}, {
					notValid : (validErrors) => {
						response(STRINGIFY({
							validErrors : validErrors
						}));
					},
					success : (userData) => {
						response(STRINGIFY({
							userData : userData
						}));
					}
				});
				
				return false;
			}
			
			if (uri === 'checkUserExists' && data !== undefined) {
				
				DailyPlatformer.UserModel.checkExists({
					filter : {
						id : data
					}
				}, (exists) => {
					response(STRINGIFY({
						exists : exists
					}));
				});
				
				return false;
			}
			
			if (uri === 'getStageInfo' && data !== undefined) {
				
				stageStore.get('stageInfo', (stageInfo) => {
					
					recordStore.get(data, {
						notExists : () => {
							
							response(STRINGIFY({
								sections : stageInfo.sections,
								bestRecord : stageInfo.bestRecord
							}));
						},
						success : (recordInfo) => {
							
							recordStore.count({
								second : {
									$lt : recordInfo.second
								}
							}, (count) => {
								
								response(STRINGIFY({
									sections : stageInfo.sections,
									bestRecord : stageInfo.bestRecord,
									myRecord : recordInfo.second,
									myRank : count + 1
								}));
							});
						}
					});
				});
				
				return false;
			}
			
			if (uri === 'getUserData' && data !== undefined) {
				
				DailyPlatformer.UserModel.get(data, (userData) => {
					
					DailyPlatformer.CostumeModel.find({
						filter : {
							userId : userData.id
						}
					}, (costumeDataSet) => {
						
						response(STRINGIFY({
							userData : userData,
							costumeDataSet : costumeDataSet
						}));
					});
				});
				
				return false;
			}
			
			if (uri === 'win' && data !== undefined) {
				
				let userId = data.userId;
				let second = data.second;
				
				// 10 골드 증정
				DailyPlatformer.UserModel.update({
					id : userId,
					$inc : {
						gold : 10
					}
				});
				
				NEXT([
				(next) => {
					recordStore.get(userId, {
						notExists : () => {
							recordStore.save({
								id : userId,
								data : {
									second : second
								}
							}, next);
						},
						success : (recordInfo) => {
							if (recordInfo.second > second) {
								recordStore.save({
									id : userId,
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
								
								response(STRINGIFY({
									bestRecord : recordInfo.second,
									myRecord : recordInfo.second,
									myRank : 1
								}));
							}
							
							else {
								
								recordStore.count({
									second : {
										$lt : recordInfo.second
									}
								}, (count) => {
									
									response(STRINGIFY({
										bestRecord : stageInfo.bestRecord,
										myRecord : recordInfo.second,
										myRank : count + 1
									}));
								});
							}
						});
					};
				}]);
				
				return false;
			}
			
			if (uri === 'buyCostume' && data !== undefined) {
				
				let userId = data.userId;
				let costumeType = data.costumeType;
				let gold = data.gold;
				
				// 코스튬 생성
				DailyPlatformer.CostumeModel.create({
					userId : userId,
					type : costumeType
				}, (costumeData) => {
					
					// 골드 줄이기
					DailyPlatformer.UserModel.update({
						id : userId,
						$inc : {
							gold : -gold
						}
					});
					
					response(STRINGIFY(costumeData));
				});
				
				return false;
			}
			
			if (uri === 'wearCostume' && data !== undefined) {
				
				let userId = data.userId;
				let costumeType = data.costumeType;
				
				DailyPlatformer.UserModel.update({
					id : userId,
					costumeType : costumeType
				});
				
				return false;
			}
		});
	}
});
