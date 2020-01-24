DailyPlatformer.Character = CLASS({
	
	preset : () => {
		return SkyEngine.StateSet;
	},
	
	params : () => {
		return {
			baseState : 'idle'
		};
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.nickname
		//REQUIRED: params.costumeType
		//REQUIRED: params.isPlayer
		
		let nickname = params.nickname;
		let costumeType = params.costumeType;
		let isPlayer = params.isPlayer;
		
		let settingStore = DailyPlatformer.STORE('settingStore');
		
		let nicknameNode;
		self.append(nicknameNode = SkyEngine.Node({
			y : -125,
			domStyle : {
				zIndex : -1,
				width : 200,
				textAlign : 'center'
			},
			dom : SPAN({
				style : {
					fontFamily : 'Nanum Gothic',
					color : isPlayer === true ? '#FFD64F' : '#fff',
					textShadow : SkyEngine.TextBorderShadow(isPlayer === true ? '#CC6600' : '#000'),
					fontSize : 20
				},
				c : nickname
			})
		}));
		
		let image;
		
		let changeCostume = self.changeCostume = (costumeType) => {
			
			if (image !== undefined) {
				image.remove();
			}
			
			self.append(image = SkyEngine.Image({
				y : -49,
				src : DailyPlatformer.Costumes[costumeType].imgSrc
			}));
		};
		changeCostume(costumeType);
		
		self.setAccelY(3000);
		
		self.addCollider(SkyEngine.Rect({
			y : -49,
			width : 40,
			height : 99
		}));
		
		let moveLeft;
		OVERRIDE(self.moveLeft, (origin) => {
			moveLeft = self.moveLeft = () => {
				
				let checkRow = Math.round(self.getY() / 126);
				let checkCol = Math.round((self.getX() - 22) / 126);
				
				if (
				// 시작 지점
				(checkRow >= 7 && checkCol <= 3) !== true &&
				
				DailyPlatformer.Game.getTileMap().checkCollisionTile({
					row : checkRow,
					col : checkCol
				}) !== true) {
					self.unstuckLeft();
				}
				
				origin({
					speed : 500,
					toX : -30
				});
				self.setScaleX(-1);
				nicknameNode.setScaleX(-1);
				
				if (self.getState() !== 'jump') {
					self.setState('walk');
				}
			};
		});
		
		let moveRight;
		OVERRIDE(self.moveRight, (origin) => {
			moveRight = self.moveRight = () => {
				
				let checkRow = Math.round(self.getY() / 126);
				let checkCol = Math.round((self.getX() + 22) / 126);
				
				if (
				// 끝 지점
				(checkRow >= 7 && checkCol >= DailyPlatformer.Game.getTotalCol() - 6) !== true &&
				
				DailyPlatformer.Game.getTileMap().checkCollisionTile({
					row : checkRow,
					col : checkCol
				}) !== true) {
					self.unstuckRight();
				}
				
				origin({
					speed : 500,
					toX : DailyPlatformer.Game.getMaxX()
				});
				self.setScaleX(1);
				nicknameNode.setScaleX(1);
				
				if (self.getState() !== 'jump') {
					self.setState('walk');
				}
			};
		});
		
		let stopLeft;
		OVERRIDE(self.stopLeft, (origin) => {
			stopLeft = self.stopLeft = () => {
				if (self.getScaleX() === -1) {
					if (self.getSpeedX() < 0) {
						origin(2500);
					}
					if (self.getState() !== 'jump') {
						self.setState('idle');
					}
				}
			};
		});
		
		let stopRight;
		OVERRIDE(self.stopRight, (origin) => {
			stopRight = self.stopRight = () => {
				if (self.getScaleX() === 1) {
					if (self.getSpeedX() > 0) {
						origin(2500);
					}
					if (self.getState() !== 'jump') {
						self.setState('idle');
					}
				}
			};
		});
		
		let stop = self.stop = () => {
			stopLeft();
			stopRight();
		};
		
		let jump = self.jump = () => {
			
			if (self.getState() !== 'jump' && self.getSpeedY() === 0) {
				
				if (settingStore.get('isSoundOff') !== true && self.checkOffScreen() !== true) {
					SOUND_ONCE({
						ogg : DailyPlatformer.R('Sound/jump.ogg'),
						mp3 : DailyPlatformer.R('Sound/jump.mp3')
					});
				}
				
				self.setSpeedY(-1300);
				self.setAccelY(3000);
				
				self.setState('jump');
			}
		};
		
		let stopJump = self.stopJump = () => {
			if (self.getState() === 'jump' && self.getSpeedY() < 0) {
				// 점프 도중에 중단하면 낮게 점프
				//self.setSpeedY(self.getSpeedY() / 2);
			}
		};
		
		let isWaterDie = false;
		let dieParticle;
		let dieSound;
		
		let die = self.die = () => {
			
			if (isWaterDie !== true) {
				
				// BUG FIX
				if (self.getParent() !== undefined) {
					
					dieParticle = SkyEngine.ParticleSystemOnce({
						x : self.getX(),
						y : self.getY() - 50,
						particleFigure : 'rect',
						particleWidth : 30,
						particleHeight : 30,
						particleSpeed : 200,
						particleColor : '#ffffff',
						particleCount : 30,
						particleLifetime : 0.5,
						minParticleScale : 0.5,
						maxParticleScale : 1,
						particleFadingSpeed : -1,
						minParticleDirection : -45,
						maxParticleDirection : 45
					}).appendTo(self.getParent());
				}
				
				if (settingStore.get('isSoundOff') !== true && self.checkOffScreen() !== true) {
					dieSound = SOUND_ONCE({
						ogg : DailyPlatformer.R('Sound/die.ogg'),
						mp3 : DailyPlatformer.R('Sound/die.mp3')
					});
				}
			}
			
			self.remove();
		};
		
		let retry = self.retry = () => {
			
			self.setPosition({
				x : 189,
				y : 693
			});
			
			self.setAlpha(0);
			self.fadeIn(4);
		};
		
		// 물 타일과 만나 물이 튀는 효과
		self.onMeet(DailyPlatformer.Water, () => {
			
			if (isWaterDie !== true && self.checkIsRemoved() !== true) {
				
				if (dieParticle !== undefined) {
					dieParticle.remove();
					dieParticle = undefined;
				}
				
				if (dieSound !== undefined) {
					dieSound.stop();
					dieSound = undefined;
				}
				
				isWaterDie = true;
				
				// BUG FIX
				if (self.getParent() !== undefined) {
					
					SkyEngine.ParticleSystemOnce({
						x : self.getX(),
						y : self.getY(),
						particleFigure : 'rect',
						particleWidth : 30,
						particleHeight : 30,
						particleSpeed : 200,
						particleAccelY : 200,
						particleColor : '#3F65D7',
						particleCount : 30,
						particleLifetime : 0.5,
						minParticleScale : 0.5,
						maxParticleScale : 1,
						particleFadingSpeed : -1,
						minParticleDirection : -45,
						maxParticleDirection : 45
					}).appendTo(self.getParent());
				}
				
				if (settingStore.get('isSoundOff') !== true && self.checkOffScreen() !== true) {
					SOUND_ONCE({
						ogg : DailyPlatformer.R('Sound/water.ogg'),
						mp3 : DailyPlatformer.R('Sound/water.mp3')
					});
				}
			}
		});
		
		let shw = self.getCollider().getWidth() / 2;
		let sh = self.getCollider().getHeight();
		
		// 충돌 타일과 부딪힌 경우
		self.onMeet(SkyEngine.CollisionTile, (tile) => {
			
			let hw = tile.getCollider().getWidth() / 2;
			let hh = tile.getCollider().getHeight() / 2;
			
			// 아래로 부딪힘
			if (
			self.getBeforeY() <= tile.getY() - hh &&
			
			self.getX() - shw < tile.getX() + hw &&
			tile.getX() - hw < self.getX() + shw) {
				
				self.setY(tile.getY() - hh);
				self.stopDown();
				
				if (self.getState() === 'jump') {
					// 이동중이고, 가속도가 없어야 합니다. (가속도가 있다는 것은 멈추는 중인 상황)
					if (self.getSpeedX() !== 0 && self.getAccelX() === 0) {
						self.setState('walk');
					} else {
						self.setState('idle');
					}
				}
				
				// 구름인 경우 구름을 1초 후 터뜨림
				if (tile.checkIsInstanceOf(DailyPlatformer.Cloud) === true) {
					SkyEngine.Delay(1, () => {
						if (tile.checkIsRemoved() !== true) {
							
							tile.hide();
							SkyEngine.Delay(1, () => {
								if (tile.checkIsRemoved() !== true) {
									tile.show();
								}
							});
						}
					});
				}
			}
			
			// 위로 부딪힘
			else if (
			self.getBeforeY() - sh >= tile.getY() + hh &&
			
			self.getX() - shw < tile.getX() + hw &&
			tile.getX() - hw < self.getX() + shw) {
				
				self.setY(tile.getY() + hh + sh);
				self.stopUp();
			}
			
			// 좌우로 부딪힘
			else {
				
				// 왼쪽으로 부딪힘
				if (
				self.getBeforeX() - shw >= tile.getX() + hw &&
				
				self.getY() - sh < tile.getY() + hh &&
				tile.getY() - hh < self.getY()) {
					
					self.setX(tile.getX() + hw + shw);
					self.stuckLeft();
				}
				
				// 오른쪽으로 부딪힘
				if (
				self.getBeforeX() + shw <= tile.getX() - hw &&
				
				self.getY() - sh < tile.getY() + hh &&
				tile.getY() - hh < self.getY()) {
					
					self.setX(tile.getX() - hw - shw);
					self.stuckRight();
				}
			}
		});
		
		// 충돌 타일과 떨어진 경우
		self.onPart(SkyEngine.CollisionTile, (tile) => {
			
			let hw = tile.getCollider().getWidth() / 2;
			let hh = tile.getCollider().getHeight() / 2;
			
			// 왼쪽 타일로부터 떨어진 경우
			if (tile.getX() + hw <= self.getX() - shw) {
				self.unstuckLeft();
				
				// 떨어지는 경우
				if (tile.getY() - hh <= self.getY()) {
					self.setAccelY(3000);
				}
			}
			
			// 오른쪽 타일로부터 떨어진 경우
			else if (self.getX() + shw <= tile.getX() - hw) {
				self.unstuckRight();
				
				// 떨어지는 경우
				if (tile.getY() - hh <= self.getY()) {
					self.setAccelY(3000);
				}
			}
			
			// 왼쪽도 오른쪽도 아니면, 점프한 경우
			else {
				self.setAccelY(3000);
			}
		});
		
		self.setAlpha(0);
		self.fadeIn(4);
	}
});
