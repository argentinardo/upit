/****
* Assets
****/
LK.init.shape('cat-hit', {width:180, height:180, color:0xfee87c, shape:'box'})
LK.init.shape('dangerousObject', {width:100, height:100, color:0xed5c7c, shape:'box'})
LK.init.shape('gatoBaila', {width:180, height:180, color:0x7f134c, shape:'box'})
LK.init.shape('laserDot', {width:15, height:15, color:0xff0000, shape:'ellipse'})
LK.init.image('Cat-step', {width:180, height:180, id:'688174e58a10be04e179465c'})
LK.init.image('Dog-close', {width:300, height:286, id:'687fee3dc018371eaf0b9e15'})
LK.init.image('Gato-enjabonado', {width:160, height:160, id:'6881ff55957ff79db8c80f6b'})
LK.init.image('Raton-normal', {width:160, height:160, id:'688014c54b18603ea42487f7'})
LK.init.image('cat', {width:180, height:180, id:'6881756f8a10be04e1794664'})
LK.init.image('cat-block', {width:180, height:180, id:'6888e337fda9581915120bf2'})
LK.init.image('cat-jump', {width:180, height:180, id:'688252893cf08f876d9dace8'})
LK.init.image('catElectrocuted', {width:240, height:180, id:'68811ad20167e711346df4db'})
LK.init.image('dog', {width:300, height:286, id:'687eb15dfa2cf73da94880ff'})
LK.init.image('gato-kiss', {width:160, height:160, id:'68873789d79209b11a68b06c'})
LK.init.image('lamp', {width:40, height:60, id:'68810476b1b31e1884ae3a82'})
LK.init.image('laserPointer', {width:50, height:26, id:'687ea9f2fa2cf73da94880b6'})
LK.init.image('lightbulb', {width:40, height:60, id:'6881037db1b31e1884ae3a58'})
LK.init.image('mouse', {width:160, height:139.2, id:'687eaf3bfa2cf73da94880f7'})
LK.init.image('object1', {width:50, height:74.5, id:'6881fd221ec60ae272fb859a'})
LK.init.image('object2', {width:60, height:60, id:'687f60f7b0fbb8ba89f0578b'})
LK.init.image('object3', {width:35, height:43.5, id:'687f84a3ffc990ba21391fd8'})
LK.init.image('separator', {width:40, height:61.69, id:'687ecad3fa2cf73da94881ba'})
LK.init.image('shelf', {width:400, height:75, id:'687ead55fa2cf73da94880db'})
LK.init.image('soap', {width:100, height:100, id:'687fe32388fabecfe2dd5671'})
LK.init.image('zarpazo', {width:160, height:160, id:'687fed0dc018371eaf0b9de3'})
LK.init.sound('bubble', {volume:1, start:0.154, end:1, id:'688ccdc1434e4b0fac5f4cff'})
LK.init.sound('catFall', {volume:1, start:0, end:1, id:'68812ab3f94a38cca99dd05c'})
LK.init.sound('dangerousFall', {volume:1, start:0, end:1, id:'688ca7e47b8a9a7b8375216d'})
LK.init.sound('dogBark', {volume:1, start:0.171, end:0.821, id:'688f3d2ee0d9f2c7c65f34c5'})
LK.init.sound('electricShock', {volume:1, start:0, end:1, id:'688ca80a7b8a9a7b83752171'})
LK.init.sound('gato-kiss', {volume:1, start:0, end:1, id:'688a348deb579d504a1b1cb8'})
LK.init.sound('laserPickup')
LK.init.music('mainTheme', {volume:1, start:0, end:1, id:'6882273af94a38cca99dd0d9'})
LK.init.sound('mouseSqueak')
LK.init.sound('objectHit', {volume:1, start:0, end:1, id:'68812accf94a38cca99dd05e'})
LK.init.sound('soapSlip')
LK.init.sound('successSong')
LK.init.sound('zarpazo', {volume:1, start:0.185, end:0.295, id:'688f3f12e0d9f2c7c65f34c7'})

/**** 
* Plugins
****/
var tween = LK.import("@upit/tween.v1");
var storage = LK.import("@upit/storage.v1");

/**** 
* Classes
****/
var Cat = Container.expand(function () {
	var self = Container.call(this);
	var catGraphics = self.attachAsset('cat', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	var catStepGraphics = self.attachAsset('Cat-step', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	catStepGraphics.visible = false;
	self.walkAnimTimer = 0;
	self.isWalkAnimStep = false;
	self.catElectrocutedGraphics = self.attachAsset('catElectrocuted', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	self.catElectrocutedGraphics.visible = false;
	self.gatoEnjabonado = self.attachAsset('Gato-enjabonado', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	self.gatoEnjabonado.visible = false;
	self.catJumpGraphics = self.attachAsset('cat-jump', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	self.catJumpGraphics.visible = false;
	self.speed = 10; // Much faster cat movement
	self.direction = 1; // 1 for right, -1 for left
	self.targetShelfLevel = 2; // Start on middle shelf (0-4)
	self.currentShelfLevel = 2;
	self.isLaserMode = false;
	self.laserModeTimer = 0;
	self.normalSpeed = 8;
	self.laserSpeed = 15;
	self.isChasing = false;
	self.chaseTarget = null;
	self.isHiding = false;
	self.hideTarget = null;
	self.isJumping = false;
	self.lives = 3;
	self.isInvulnerable = false;
	self.invulnerabilityTimer = 0;
	self.isZarpazoMode = false;
	self.zarpazoGraphics = null;
	self.gatoKissGraphics = self.attachAsset('gato-kiss', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	self.gatoKissGraphics.visible = false;
	self.isKissMode = false;
	self.catHitGraphics = self.attachAsset('cat-hit', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	self.catHitGraphics.visible = false;
	self.isHitMode = false;
	self.hitTimer = 0;
	self.catBlockGraphics = self.attachAsset('cat-block', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	self.catBlockGraphics.visible = false;
	self.isBlockMode = false;
	self.blockTimer = 0;
	self.isFloating = false;
	self.floatingTimer = 0;
	self.gatoBailaGraphics = self.attachAsset('gatoBaila', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 2,
		scaleY: 2
	});
	self.gatoBailaGraphics.visible = false;
	self.isDancing = false;
	self.activateZarpazo = function () {
		LK.getSound('zarpazo').play();
		if (self.isZarpazoMode || self.isKissMode) {
			return;
		} // Already in zarpazo or kiss mode
		self.isZarpazoMode = true;
		// Stop movement during zarpazo
		var originalSpeed = self.speed;
		self.speed = 0;
		// Create zarpazo graphics if not exists
		if (!self.zarpazoGraphics) {
			self.zarpazoGraphics = self.attachAsset('zarpazo', {
				anchorX: 0.5,
				anchorY: 0.5,
				scaleX: 2,
				scaleY: 2
			});
		}
		// Hide all other cat graphics - only show zarpazo
		catGraphics.visible = false;
		catStepGraphics.visible = false;
		self.catJumpGraphics.visible = false;
		self.catElectrocutedGraphics.visible = false;
		self.gatoEnjabonado.visible = false;
		self.gatoKissGraphics.visible = false;
		// Show only zarpazo graphics
		self.zarpazoGraphics.visible = true;
		self.zarpazoGraphics.scaleX = 2 * self.direction;
		self.zarpazoGraphics.scaleY = 2;
		LK.getSound('zarpazo').play();
		// Return to normal after zarpazo
		tween.stop(self, {
			isZarpazoMode: true
		}); // Stop any existing zarpazo tween
		LK.setTimeout(function () {
			self.isZarpazoMode = false;
			self.isKissMode = true;
			// Hide zarpazo and show kiss
			if (self.zarpazoGraphics) {
				self.zarpazoGraphics.visible = false;
			}
			self.gatoKissGraphics.visible = true;
			self.gatoKissGraphics.scaleX = 2 * self.direction;
			self.gatoKissGraphics.scaleY = 2;
			// Play kiss sound when entering kiss mode
			LK.getSound('gato-kiss').play();
			// After kiss, return to normal walking
			LK.setTimeout(function () {
				self.isKissMode = false;
				self.gatoKissGraphics.visible = false;
				catGraphics.visible = true;
				// Restore movement speed
				self.speed = originalSpeed;
			}, 500); // Kiss lasts 0.5 seconds
		}, 1000); // 1 second for zarpazo duration
	};
	self.activateBubble = function (duration) {
		if (self.isInBubble) {
			return; // Already in bubble
		}
		self.isInBubble = true;
		self.bubbleTimer = duration || 600; // Default 10 seconds at 60fps
		self.originalTargetShelf = self.targetShelfLevel;
		// Stop any existing movement tweens
		tween.stop(self, {
			y: true
		});
		self.isJumping = false;
		// Visual effect when bubble starts
		LK.effects.flashObject(self, 0x87CEEB, 300);
	};
	self.update = function () {
		// Move towards target shelf level with dynamic jumping animation
		var targetY = shelfLevels[self.targetShelfLevel] - 208; // Position to stand on shelf - raised by 30px
		if (Math.abs(self.y - targetY) > 5) {
			// Check if we need to start a new jump animation
			if (!self.isJumping) {
				self.isJumping = true;
				var jumpDistance = targetY - self.y;
				var jumpDuration = Math.abs(jumpDistance) * 0.8; // Duration based on distance
				// Stop any existing tween
				tween.stop(self, {
					y: true
				});
				// Create dynamic jump with bounce effect
				if (self.y < targetY) {
					// Jumping down - show cat-jump tilted downward
					catGraphics.visible = false;
					self.catJumpGraphics.visible = true;
					self.catJumpGraphics.rotation = self.direction > 0 ? 0.5 : -0.5; // Tilt downward for jumping down, consider direction
					self.catJumpGraphics.scaleX = self.direction > 0 ? 2 : -2;
					// Jumping down - faster with bounce landing
					tween(self, {
						y: targetY
					}, {
						duration: jumpDuration,
						easing: tween.linear,
						onFinish: function onFinish() {
							self.y = targetY;
							self.currentShelfLevel = self.targetShelfLevel;
							// Switch back to normal cat after landing
							self.catJumpGraphics.visible = false;
							self.catJumpGraphics.rotation = 0;
							catGraphics.visible = true;
							// Add bounce effect when landing - move down and up a few pixels
							tween(self, {
								y: self.y + 15
							}, {
								duration: 150,
								easing: tween.easeOut,
								onFinish: function onFinish() {
									tween(self, {
										y: self.y - 15
									}, {
										duration: 100,
										easing: tween.bounceOut
									});
								}
							});
							self.isJumping = false;
						}
					});
				} else {
					// Jumping up - show cat-jump tilted upward and squeeze first for momentum
					catGraphics.visible = false;
					self.catJumpGraphics.visible = true;
					self.catJumpGraphics.rotation = self.direction > 0 ? -0.5 : 0.5; // Tilt upward for jumping up, consider direction
					self.catJumpGraphics.scaleX = self.direction > 0 ? 2 : -2;
					// First squeeze to take impulse
					tween(self.catJumpGraphics, {
						scaleX: (self.direction > 0 ? 2 : -2) * 1.3,
						scaleY: 2 * 0.7
					}, {
						duration: jumpDuration * 0.3,
						easing: tween.easeIn,
						onFinish: function onFinish() {
							// Then jump with normal scale
							tween(self.catJumpGraphics, {
								scaleX: self.direction > 0 ? 2 : -2,
								scaleY: 2
							}, {
								duration: 100,
								easing: tween.easeOut
							});
							// Actual jump movement
							tween(self, {
								y: targetY
							}, {
								duration: jumpDuration * 1.2,
								easing: tween.easeOut,
								onFinish: function onFinish() {
									self.y = targetY;
									self.currentShelfLevel = self.targetShelfLevel;
									self.isJumping = false;
									// Switch back to normal cat after landing
									self.catJumpGraphics.visible = false;
									self.catJumpGraphics.rotation = 0;
									catGraphics.visible = true;
								}
							});
						}
					});
				}
			}
		} else {
			self.y = targetY;
			self.currentShelfLevel = self.targetShelfLevel;
			self.isJumping = false;
		}
		// Handle laser mode
		if (self.isLaserMode) {
			self.laserModeTimer--;
			if (self.laserModeTimer <= 0) {
				self.isLaserMode = false;
				self.speed = self.normalSpeed;
			}
		}
		// Handle walking animation - alternate between cat and cat-step every 15 frames (0.25 seconds)
		self.walkAnimTimer++;
		if (self.walkAnimTimer >= 15) {
			self.walkAnimTimer = 0;
			self.isWalkAnimStep = !self.isWalkAnimStep;
			// Only show walking animation when cat is moving and not in special states (including bubble and floating)
			var showWalkAnim = !self.isElectrocuted && !self.isSlipping && !self.isJumping && !self.isZarpazoMode && !self.isInBubble && !self.isFloating;
			if (showWalkAnim) {
				if (self.isWalkAnimStep) {
					catGraphics.visible = false;
					catStepGraphics.visible = true;
				} else {
					catGraphics.visible = true;
					catStepGraphics.visible = false;
				}
			} else if (!self.isJumping && !self.isInBubble && !self.isFloating) {
				// Show normal cat when not walking or in special states (but not when jumping, in bubble, or floating)
				catGraphics.visible = true;
				catStepGraphics.visible = false;
			}
			// When jumping, ensure only cat-jump is visible
			if (self.isJumping) {
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				// cat-jump visibility is handled in the jumping animation logic above
			}
			// When in bubble, hide walking animation
			if (self.isInBubble) {
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				self.gatoEnjabonado.visible = true;
			}
			// When floating with soap, hide all other animations
			if (self.isFloating) {
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				if (self.catElectrocutedGraphics) {
					self.catElectrocutedGraphics.visible = false;
				}
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				self.gatoEnjabonado.visible = true;
			}
			// When in zarpazo mode, hide all other animations
			if (self.isZarpazoMode) {
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				if (self.catElectrocutedGraphics) {
					self.catElectrocutedGraphics.visible = false;
				}
				self.gatoEnjabonado.visible = false;
				self.gatoKissGraphics.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = true;
				}
			}
			// When in kiss mode, hide all other animations
			if (self.isKissMode) {
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				if (self.catElectrocutedGraphics) {
					self.catElectrocutedGraphics.visible = false;
				}
				self.gatoEnjabonado.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				if (self.catHitGraphics) {
					self.catHitGraphics.visible = false;
				}
				self.gatoKissGraphics.visible = true;
			}
			// When in hit mode, hide all other animations
			if (self.isHitMode) {
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				if (self.catElectrocutedGraphics) {
					self.catElectrocutedGraphics.visible = false;
				}
				self.gatoEnjabonado.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				self.gatoKissGraphics.visible = false;
				if (self.catBlockGraphics) {
					self.catBlockGraphics.visible = false;
				}
				self.catHitGraphics.visible = true;
			}
			// When in block mode, hide all other animations
			if (self.isBlockMode) {
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				if (self.catElectrocutedGraphics) {
					self.catElectrocutedGraphics.visible = false;
				}
				self.gatoEnjabonado.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				self.gatoKissGraphics.visible = false;
				self.catHitGraphics.visible = false;
				self.gatoBailaGraphics.visible = false;
				self.catBlockGraphics.visible = true;
			}
			// When dancing, hide all other animations and show dance
			if (self.isDancing) {
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				if (self.catElectrocutedGraphics) {
					self.catElectrocutedGraphics.visible = false;
				}
				self.gatoEnjabonado.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				self.gatoKissGraphics.visible = false;
				self.catHitGraphics.visible = false;
				self.catBlockGraphics.visible = false;
				self.gatoBailaGraphics.visible = true;
				// Dancing animation with bounce effect
				var danceScale = 2 + Math.sin(LK.ticks * 0.3) * 0.3;
				self.gatoBailaGraphics.scaleX = danceScale * self.direction;
				self.gatoBailaGraphics.scaleY = danceScale;
			}
		}
		// Update graphics direction based on movement direction
		if (self.direction > 0) {
			catGraphics.scaleX = 2;
			catStepGraphics.scaleX = 2;
			if (self.catElectrocutedGraphics) {
				self.catElectrocutedGraphics.scaleX = 2;
			}
			if (self.zarpazoGraphics) {
				self.zarpazoGraphics.scaleX = 2;
			}
			if (self.gatoEnjabonado) {
				self.gatoEnjabonado.scaleX = 2;
			}
			if (self.catJumpGraphics) {
				self.catJumpGraphics.scaleX = 2;
			}
			if (self.gatoKissGraphics) {
				self.gatoKissGraphics.scaleX = 2;
			}
			if (self.catHitGraphics) {
				self.catHitGraphics.scaleX = 2;
			}
			if (self.catBlockGraphics) {
				self.catBlockGraphics.scaleX = 2;
			}
			if (self.gatoBailaGraphics) {
				self.gatoBailaGraphics.scaleX = 2;
			}
		} else {
			catGraphics.scaleX = -2;
			catStepGraphics.scaleX = -2;
			if (self.catElectrocutedGraphics) {
				self.catElectrocutedGraphics.scaleX = -2;
			}
			if (self.zarpazoGraphics) {
				self.zarpazoGraphics.scaleX = -2;
			}
			if (self.gatoEnjabonado) {
				self.gatoEnjabonado.scaleX = -2;
			}
			if (self.catJumpGraphics) {
				self.catJumpGraphics.scaleX = -2;
			}
			if (self.gatoKissGraphics) {
				self.gatoKissGraphics.scaleX = -2;
			}
			if (self.catHitGraphics) {
				self.catHitGraphics.scaleX = -2;
			}
			if (self.catBlockGraphics) {
				self.catBlockGraphics.scaleX = -2;
			}
			if (self.gatoBailaGraphics) {
				self.gatoBailaGraphics.scaleX = -2;
			}
		}
		// Handle floating timer countdown
		if (self.isFloating) {
			self.floatingTimer--;
			if (self.floatingTimer <= 0) {
				// Stop floating after timer expires
				self.isFloating = false;
				self.floatingTimer = 0;
				// Stop any floating tween
				tween.stop(self, {
					y: true
				});
				self.gatoEnjabonado.visible = false;
				catGraphics.visible = true;
				// Return to current shelf level
				self.y = shelfLevels[self.currentShelfLevel] - 208;
			}
		}
		// Handle hit timer countdown
		if (self.isHitMode) {
			self.hitTimer--;
			if (self.hitTimer <= 0) {
				// Recover from hit mode
				self.isHitMode = false;
				self.catHitGraphics.visible = false;
				catGraphics.visible = true;
				// Restore movement speed
				self.speed = self.isLaserMode ? self.laserSpeed : self.normalSpeed;
			}
		}
		// Handle block timer countdown
		if (self.isBlockMode) {
			self.blockTimer--;
			if (self.blockTimer <= 0) {
				// Recover from block mode
				self.isBlockMode = false;
				self.catBlockGraphics.visible = false;
				catGraphics.visible = true;
				// Restore movement speed
				self.speed = self.isLaserMode ? self.laserSpeed : self.normalSpeed;
			}
		}
		// Handle horizontal movement when not electrocuted, slipping, floating, in zarpazo, kiss, hit, or block mode
		if (!self.isElectrocuted && (!self.isSlipping || self.slipTimer % 30 !== 0) && !self.isFloating && !self.isZarpazoMode && !self.isKissMode && !self.isHitMode && !self.isBlockMode) {
			var newX = self.x + self.speed * self.direction;
			// Check if cat reaches right edge of screen (not world boundary)
			var rightScreenEdge = cameraX + 2048;
			if (newX >= rightScreenEdge) {
				// Cat stops responding when reaching right edge of screen
				self.speed = 0;
				self.x = rightScreenEdge;
				return;
			}
			// Check for barrier blocking before moving
			var wouldBeBlocked = false;
			for (var i = separators.length - 1; i >= 0; i--) {
				var separator = separators[i];
				// Calculate which shelf level the separator is on
				var sepShelfLevel = -1;
				for (var level = 0; level < 5; level++) {
					if (Math.abs(separator.y - (shelfLevels[level] - 150)) < 50) {
						sepShelfLevel = level;
						break;
					}
				}
				// Check if separator would block movement on same shelf level
				if (separator.isBlocking && sepShelfLevel === self.currentShelfLevel) {
					var distanceToSeparator = Math.abs(newX - separator.x);
					if (distanceToSeparator < 100 && (self.direction > 0 && newX > separator.x && self.x <= separator.x || self.direction < 0 && newX < separator.x && self.x >= separator.x)) {
						wouldBeBlocked = true;
						break;
					}
				}
			}
			if (wouldBeBlocked && !self.isBlockMode) {
				// Enter block mode when stuck against barrier
				self.isBlockMode = true;
				self.blockTimer = 180; // 3 seconds at 60fps
				// Stop movement during block
				self.speed = 0;
				// Show only cat-block graphics
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				self.catElectrocutedGraphics.visible = false;
				self.gatoEnjabonado.visible = false;
				self.gatoKissGraphics.visible = false;
				self.catHitGraphics.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				self.catBlockGraphics.visible = true;
				self.catBlockGraphics.scaleX = 2 * self.direction;
				self.catBlockGraphics.scaleY = 2;
			} else if (!wouldBeBlocked) {
				// Constrain cat movement within reduced world boundaries (24 sections * 400px = 9600px)
				// Allow some buffer on both sides for smooth movement
				self.x = Math.max(-50, Math.min(newX, 9650)); // Keep cat within reduced world bounds
			}
		}
		for (var i = shelfObjects.length - 1; i >= 0; i--) {
			var obj = shelfObjects[i];
			if (self.intersects(obj) && !obj.isFalling) {
				obj.startFalling();
				// Update objects knocked down counter based on objects that are NOT falling
				var actualObjectsRemaining = 0;
				for (var j = 0; j < shelfObjects.length; j++) {
					if (!shelfObjects[j].isFalling) {
						actualObjectsRemaining++;
					}
				}
				objectsKnockedDown = totalObjectsToKnock - actualObjectsRemaining;
				storage.objectsKnockedDown = objectsKnockedDown;
				// Check if all objects have been knocked down
				if (actualObjectsRemaining <= 0) {
					// Calculate final score based on remaining time and penalties
					var remainingSeconds = Math.max(0, Math.ceil((TIME_LIMIT - gameTimer) / 60));
					finalScore = remainingSeconds * 10 - obstaclePenalties; // 10 points per remaining second minus penalties
					finalScore = Math.max(finalScore, 0); // Ensure score doesn't go negative
					// Set the calculated score
					LK.setScore(finalScore);
					// Stop the game timer to prevent time-based game over
					gameTimer = TIME_LIMIT;
					// Activate dancing mode for cat
					self.isDancing = true;
					// Stop cat movement during victory dance
					self.speed = 0;
					// Stop all cat behaviors
					self.isElectrocuted = false;
					self.isSlipping = false;
					self.isFloating = false;
					self.isZarpazoMode = false;
					self.isKissMode = false;
					self.isHitMode = false;
					self.isBlockMode = false;
					// Play success song
					LK.getSound('successSong').play();
					// Wait a moment then show victory
					LK.setTimeout(function () {
						// Player wins when all objects are knocked down - reset storage for new game
						storage.totalObjectsToKnock = 0;
						storage.objectsKnockedDown = 0;
						// Show level complete message
						LK.showYouWin();
					}, 2000); // Wait 2 seconds to show the dance
					return;
				}
				// Play random knock sound
				var soundId = 'knock' + (Math.floor(Math.random() * 3) + 1);
				LK.getSound(soundId).play();
				// Activate zarpazo mode when knocking objects
				self.activateZarpazo();
			}
		}
		// Check for collisions with dangerous objects - only on same shelf level
		for (var i = dangerousObjects.length - 1; i >= 0; i--) {
			var dangerousObj = dangerousObjects[i];
			// Calculate which shelf level the dangerous object is on
			var objShelfLevel = -1;
			for (var level = 0; level < 5; level++) {
				if (Math.abs(dangerousObj.y - (shelfLevels[level] - 75)) < 50) {
					objShelfLevel = level;
					break;
				}
			}
			// Only collide if on same shelf level
			if (self.intersects(dangerousObj) && dangerousObj.isDangerous && !dangerousObj.isFalling && objShelfLevel === self.currentShelfLevel && !self.isHitMode) {
				// Cat gets hit and stops for a few seconds
				dangerousObj.startFalling();
				obstaclePenalties += 10; // Add penalty for hitting dangerous object
				LK.getSound('catFall').play();
				LK.effects.flashScreen(0xff0000, 500);
				// Enter hit mode
				self.isHitMode = true;
				self.hitTimer = 180; // 3 seconds at 60fps
				// Stop movement during hit
				self.speed = 0;
				// Show only cat-hit graphics
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				self.catElectrocutedGraphics.visible = false;
				self.gatoEnjabonado.visible = false;
				self.gatoKissGraphics.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				self.catHitGraphics.visible = true;
				self.catHitGraphics.scaleX = 2 * self.direction;
				self.catHitGraphics.scaleY = 2;
			}
		}
		// Check for collisions with dogs
		for (var i = dogs.length - 1; i >= 0; i--) {
			var dog = dogs[i];
			if (self.intersects(dog)) {
				if (self.isJumping && self.y < dog.y - 20) {
					// Cat falls on dog and kills it
					LK.getSound('dogBark').play();
					LK.effects.flashObject(self, 0x00ff00, 500);
					// Remove dog from game
					dog.destroy();
					dogs.splice(i, 1);
					// Stop hiding behavior if this was the hide target
					if (dog === self.hideTarget) {
						self.isHiding = false;
						self.hideTarget = null;
					}
				} else if (!self.isHitMode && !self.isInvulnerable) {
					// Dog knocks down the cat
					LK.getSound('dogBark').play();
					LK.getSound('catFall').play();
					LK.effects.flashScreen(0xff0000, 500);
					obstaclePenalties += 15; // Add penalty for being knocked down by dog
					// Enter hit mode
					self.isHitMode = true;
					self.hitTimer = 180; // 3 seconds at 60fps
					// Stop movement during hit
					self.speed = 0;
					// Show only cat-hit graphics
					catGraphics.visible = false;
					catStepGraphics.visible = false;
					self.catJumpGraphics.visible = false;
					self.catElectrocutedGraphics.visible = false;
					self.gatoEnjabonado.visible = false;
					self.gatoKissGraphics.visible = false;
					if (self.zarpazoGraphics) {
						self.zarpazoGraphics.visible = false;
					}
					self.catHitGraphics.visible = true;
					self.catHitGraphics.scaleX = 2 * self.direction;
					self.catHitGraphics.scaleY = 2;
				}
			}
		}
		// Check if cat reaches right world boundary and trigger block mode
		if (self.x >= 9500 && !self.isBlockMode) {
			// Enter block mode when reaching right boundary barriers
			self.isBlockMode = true;
			self.blockTimer = 180; // 3 seconds at 60fps
			// Stop movement during block
			self.speed = 0;
			// Show only cat-block graphics
			catGraphics.visible = false;
			catStepGraphics.visible = false;
			self.catJumpGraphics.visible = false;
			self.catElectrocutedGraphics.visible = false;
			self.gatoEnjabonado.visible = false;
			self.gatoKissGraphics.visible = false;
			self.catHitGraphics.visible = false;
			if (self.zarpazoGraphics) {
				self.zarpazoGraphics.visible = false;
			}
			self.catBlockGraphics.visible = true;
			self.catBlockGraphics.scaleX = 2 * self.direction;
			self.catBlockGraphics.scaleY = 2;
		}
		// Check if cat reaches left world boundary and lose life
		if (!self.isInvulnerable && self.x <= -150) {
			// Cat reaches left world limit and loses a life
			self.lives--;
			self.isInvulnerable = true;
			self.invulnerabilityTimer = 120; // 2 seconds of invulnerability
			obstaclePenalties += 25; // Add penalty for losing a life
			LK.getSound('catFall').play();
			LK.effects.flashScreen(0xff0000, 1000);
			// Dramatic fall animation
			tween(self, {
				y: 2732 + 200 // Fall off screen bottom
			}, {
				duration: 1000,
				easing: tween.easeIn,
				onFinish: function onFinish() {
					// Reset cat position after fall - keep at horizontal center
					self.x = 1024;
					self.y = shelfLevels[2] - 208;
					self.targetShelfLevel = 2;
					self.currentShelfLevel = 2;
				}
			});
			// Update lives display
			livesText.setText('Lives: ' + self.lives);
			// Check for game over
			if (self.lives <= 0) {
				LK.showGameOver();
			}
		}
		// Check for collisions with separators - only on same shelf level
		for (var i = separators.length - 1; i >= 0; i--) {
			var separator = separators[i];
			// Calculate which shelf level the separator is on
			var sepShelfLevel = -1;
			for (var level = 0; level < 5; level++) {
				if (Math.abs(separator.y - (shelfLevels[level] - 150)) < 50) {
					sepShelfLevel = level;
					break;
				}
			}
			// Only collide if on same shelf level
			if (self.intersects(separator) && separator.isBlocking && sepShelfLevel === self.currentShelfLevel && !self.isBlockMode) {
				// Enter block mode when hitting separator
				self.isBlockMode = true;
				self.blockTimer = 180; // 3 seconds at 60fps
				// Stop movement during block
				self.speed = 0;
				// Show only cat-block graphics
				catGraphics.visible = false;
				catStepGraphics.visible = false;
				self.catJumpGraphics.visible = false;
				self.catElectrocutedGraphics.visible = false;
				self.gatoEnjabonado.visible = false;
				self.gatoKissGraphics.visible = false;
				self.catHitGraphics.visible = false;
				if (self.zarpazoGraphics) {
					self.zarpazoGraphics.visible = false;
				}
				self.catBlockGraphics.visible = true;
				self.catBlockGraphics.scaleX = 2 * self.direction;
				self.catBlockGraphics.scaleY = 2;
			}
		}
		// Handle electrocution
		if (self.isElectrocuted === undefined) {
			self.isElectrocuted = false;
			self.electrocutionTimer = 0;
		}
		if (self.isElectrocuted) {
			self.electrocutionTimer--;
			// Cat cannot move when electrocuted
			self.speed = 0;
			// Switch to electrocuted asset
			catGraphics.visible = false;
			catStepGraphics.visible = false;
			self.catElectrocutedGraphics.visible = true;
			// Electric flash effect on electrocuted graphics
			var electricFlash = Math.sin(LK.ticks * 2) > 0;
			self.catElectrocutedGraphics.tint = electricFlash ? 0x00FFFF : 0xFFFFFF;
			self.catElectrocutedGraphics.alpha = 0.7 + Math.sin(LK.ticks * 1.5) * 0.3;
			// Update scale to match direction
			self.catElectrocutedGraphics.scaleX = self.direction > 0 ? 2 : -2;
			self.catElectrocutedGraphics.scaleY = 2;
			if (self.electrocutionTimer <= 0) {
				self.isElectrocuted = false;
				self.speed = self.isLaserMode ? self.laserSpeed : self.normalSpeed;
				// Switch back to normal cat
				catGraphics.visible = true;
				catStepGraphics.visible = false;
				self.catElectrocutedGraphics.visible = false;
				catGraphics.tint = 0xFFFFFF;
				catGraphics.alpha = 1;
			}
		}
		// Handle soap slipping
		if (self.isSlipping === undefined) {
			self.isSlipping = false;
			self.slipTimer = 0;
			self.originalDirection = self.direction;
		}
		if (self.isSlipping) {
			self.slipTimer--;
			// Cat slides uncontrollably in random directions
			if (self.slipTimer % 30 === 0) {
				// Change direction every 0.5 seconds
				self.direction = Math.random() < 0.5 ? 1 : -1;
			}
			// Slipping animation - cat tilts side to side
			var tilt = Math.sin(LK.ticks * 0.4) * 0.3;
			catGraphics.rotation = tilt;
			catGraphics.alpha = 0.8; // Slightly transparent while slipping
			if (self.slipTimer <= 0) {
				self.isSlipping = false;
				self.direction = self.originalDirection;
				catGraphics.rotation = 0;
				catGraphics.alpha = 1;
				// Switch back to normal cat
				self.gatoEnjabonado.visible = false;
				catGraphics.visible = true;
				catStepGraphics.visible = false;
			}
		}
		// Handle lamp immunity timer
		if (self.lampImmunity === undefined) {
			self.lampImmunity = false;
			self.lampImmunityTimer = 0;
		}
		if (self.lampImmunity) {
			self.lampImmunityTimer--;
			if (self.lampImmunityTimer <= 0) {
				self.lampImmunity = false;
			}
		}
		// Handle bubble floating mechanics
		if (self.isInBubble === undefined) {
			self.isInBubble = false;
			self.bubbleTimer = 0;
			self.bubbleFloatSpeed = -4; // Negative for upward movement - like a helium balloon
			self.originalTargetShelf = self.targetShelfLevel;
		}
		if (self.isInBubble) {
			self.bubbleTimer--;
			// Float upward continuously like a real bubble/balloon
			self.y += self.bubbleFloatSpeed;
			// Add gentle side-to-side floating motion like real bubbles
			var sideFloat = Math.sin(LK.ticks * 0.05) * 1.5;
			self.x += sideFloat;
			// Gradually increase floating speed as it goes up (buoyancy effect)
			if (self.bubbleFloatSpeed > -8) {
				self.bubbleFloatSpeed -= 0.02; // Accelerate upward gradually
			}
			// Check which shelf level we're passing through and update target
			for (var level = 4; level >= 0; level--) {
				var shelfY = shelfLevels[level] - 208;
				if (self.y <= shelfY + 50 && self.y >= shelfY - 50) {
					self.targetShelfLevel = level;
					break;
				}
			}
			// Gentle floating animation with tween - more bubble-like
			if (LK.ticks % 90 === 0) {
				// Every 1.5 seconds - slower, more gentle
				tween(catGraphics, {
					scaleX: Math.abs(catGraphics.scaleX) * 1.05,
					scaleY: catGraphics.scaleY * 1.15
				}, {
					duration: 750,
					easing: tween.easeInOut,
					onFinish: function onFinish() {
						tween(catGraphics, {
							scaleX: Math.abs(catGraphics.scaleX) / 1.05,
							scaleY: catGraphics.scaleY / 1.15
						}, {
							duration: 750,
							easing: tween.easeInOut
						});
					}
				});
			}
			// Bubble bursts after timer expires
			if (self.bubbleTimer <= 0) {
				self.isInBubble = false;
				// Reset bubble float speed
				self.bubbleFloatSpeed = -4;
				// Find nearest shelf level to current position
				var nearestShelf = 0;
				var minDistance = Math.abs(self.y - (shelfLevels[0] - 208));
				for (var level = 1; level < 5; level++) {
					var distance = Math.abs(self.y - (shelfLevels[level] - 208));
					if (distance < minDistance) {
						minDistance = distance;
						nearestShelf = level;
					}
				}
				// Land on nearest shelf with bounce effect
				self.targetShelfLevel = nearestShelf;
				self.currentShelfLevel = nearestShelf;
				tween(self, {
					y: shelfLevels[nearestShelf] - 208
				}, {
					duration: 800,
					easing: tween.bounceOut,
					onFinish: function onFinish() {
						// Reset cat graphics to normal
						catGraphics.scaleY = Math.abs(catGraphics.scaleY);
						catGraphics.scaleX = self.direction > 0 ? 2 : -2;
						// Flash effect when landing
						LK.effects.flashObject(self, 0x87CEEB, 500);
					}
				});
			}
		}
		// Handle invulnerability timer
		if (self.isInvulnerable) {
			self.invulnerabilityTimer--;
			// Flash effect during invulnerability (only if not electrocuted)
			if (!self.isElectrocuted) {
				catGraphics.alpha = Math.sin(LK.ticks * 0.5) * 0.5 + 0.5;
				if (self.catElectrocutedGraphics) {
					self.catElectrocutedGraphics.alpha = Math.sin(LK.ticks * 0.5) * 0.5 + 0.5;
				}
			}
			if (self.invulnerabilityTimer <= 0) {
				self.isInvulnerable = false;
				if (!self.isElectrocuted) {
					catGraphics.alpha = 1;
					if (self.catElectrocutedGraphics) {
						self.catElectrocutedGraphics.alpha = 1;
					}
				}
			}
		}
		// Check for collisions with lamps - only on same shelf level
		for (var i = lamps.length - 1; i >= 0; i--) {
			var lamp = lamps[i];
			// Calculate which shelf level the lamp is on
			var lampShelfLevel = -1;
			for (var level = 0; level < 5; level++) {
				if (Math.abs(lamp.y - shelfLevels[level]) < 50) {
					lampShelfLevel = level;
					break;
				}
			}
			// Only collide if on same shelf level and cat is not immune to lamp electrocution
			if (self.intersects(lamp) && lampShelfLevel === self.currentShelfLevel && !self.isElectrocuted) {
				// Electrocute cat for 2 seconds
				self.isElectrocuted = true;
				self.electrocutionTimer = 120; // 2 seconds at 60fps
				obstaclePenalties += 15; // Add penalty for lamp electrocution
				// Play electric shock sound
				LK.getSound('electricShock').play();
				// Flash screen blue/white for electric effect
				LK.effects.flashScreen(0x00FFFF, 1000);
				// Push cat away from lamp with stronger force to prevent getting stuck
				var pushDirection = self.x > lamp.x ? 1 : -1;
				var pushDistance = 250;
				var targetX = self.x + pushDistance * pushDirection;
				// Ensure target position is within game bounds
				targetX = Math.max(200, Math.min(targetX, 9600));
				// Stop any existing movement tweens on cat
				tween.stop(self, {
					x: true
				});
				// Make cat get pushed away with stronger force
				tween(self, {
					x: targetX
				}, {
					duration: 200,
					easing: tween.easeOut,
					onFinish: function onFinish() {
						// Additional push to ensure separation
						var secondPushX = targetX + pushDirection * 100;
						secondPushX = Math.max(200, Math.min(secondPushX, 9600));
						tween(self, {
							x: secondPushX
						}, {
							duration: 150,
							easing: tween.easeOut
						});
					}
				});
			}
		}
		// Check for soap collision - only on same shelf level and causes floating upward
		var _loop = function _loop() {
				soap = soaps[i]; // Calculate which shelf level the soap is on
				soapShelfLevel = -1;
				for (level = 0; level < 5; level++) {
					if (Math.abs(soap.y - (shelfLevels[level] - 40)) < 50) {
						soapShelfLevel = level;
						break;
					}
				}
				// Only collide if on same shelf level
				if (self.intersects(soap) && !soap.hasBeenUsed && !self.isSlipping && soapShelfLevel === self.currentShelfLevel) {
					soap.hasBeenUsed = true;
					// Set floating state
					self.isFloating = true;
					self.floatingTimer = 300; // 5 seconds at 60fps
					// Show only the soapy cat asset and hide all others
					catGraphics.visible = false;
					catStepGraphics.visible = false;
					self.catJumpGraphics.visible = false;
					self.catElectrocutedGraphics.visible = false;
					if (self.zarpazoGraphics) {
						self.zarpazoGraphics.visible = false;
					}
					self.gatoEnjabonado.visible = true;
					// Stop any existing movement animations
					self.isJumping = false;
					self.isElectrocuted = false;
					self.isZarpazoMode = false;
					// Play slip sound
					LK.getSound('soapSlip').play();
					// Stop any existing tweens on cat position
					tween.stop(self, {
						y: true
					});
					// Float upward continuously for 5 seconds
					tween(self, {
						y: -200
					}, {
						duration: 5000,
						easing: tween.easeOut,
						onFinish: function onFinish() {
							// Reset cat state after floating off screen
							self.isFloating = false;
							self.floatingTimer = 0;
							self.gatoEnjabonado.visible = false;
							catGraphics.visible = true;
							// Return to current shelf level
							self.y = shelfLevels[self.currentShelfLevel] - 208;
						}
					});
					// Visual effect - soap disappears with tween
					tween(soap, {
						alpha: 0,
						scaleX: 0.1,
						scaleY: 0.1
					}, {
						duration: 500,
						easing: tween.easeOut,
						onFinish: function onFinish() {
							soap.destroy();
							var index = soaps.indexOf(soap);
							if (index > -1) {
								soaps.splice(index, 1);
							}
						}
					});
					// Flash screen light blue for soap effect
					LK.effects.flashScreen(0x87CEEB, 800);
					return 1; // break
				}
			},
			soap,
			soapShelfLevel,
			level;
		for (var i = soaps.length - 1; i >= 0; i--) {
			if (_loop()) {
				break;
			}
		}
		// Check for collisions with mice - cat can eat mouse
		for (var i = mice.length - 1; i >= 0; i--) {
			var mouse = mice[i];
			// Calculate which shelf level the mouse is on
			var mouseShelfLevel = -1;
			for (var level = 0; level < 5; level++) {
				if (Math.abs(mouse.y - (shelfLevels[level] - 75)) < 50) {
					mouseShelfLevel = level;
					break;
				}
			}
			// Only collide if on same shelf level
			if (self.intersects(mouse) && mouseShelfLevel === self.currentShelfLevel) {
				// Cat eats mouse
				LK.getSound('mouseSqueak').play();
				LK.effects.flashObject(self, 0x00ff00, 500);
				// Activate zarpazo mode when eating mouse
				self.activateZarpazo();
				// Remove mouse from game
				mouse.destroy();
				mice.splice(i, 1);
				// Stop chasing behavior if this was the chase target
				if (mouse === self.chaseTarget) {
					self.isChasing = false;
					self.chaseTarget = null;
				}
			}
		}
		// Check for laser pointer pickup - only on same shelf level
		for (var i = laserPointers.length - 1; i >= 0; i--) {
			var pointer = laserPointers[i];
			// Calculate which shelf level the laser pointer is on
			var pointerShelfLevel = -1;
			for (var level = 0; level < 5; level++) {
				if (Math.abs(pointer.y - (shelfLevels[level] - 75)) < 50) {
					pointerShelfLevel = level;
					break;
				}
			}
			// Only collide if on same shelf level
			if (self.intersects(pointer) && pointerShelfLevel === self.currentShelfLevel) {
				self.isLaserMode = true;
				self.laserModeTimer = 300; // 5 seconds at 60fps
				self.speed = self.laserSpeed;
				LK.getSound('laserPickup').play();
				pointer.destroy();
				laserPointers.splice(i, 1);
				// Create laser dot
				if (!laserDot) {
					laserDot = game.addChild(LK.getAsset('laserDot', {
						anchorX: 0.5,
						anchorY: 0.5
					}));
				}
				laserDot.x = self.x + 100;
				laserDot.y = self.y;
				laserDot.visible = false; // Hide the laser dot
				// Activate zarpazo mode when picking up laser pointer
				self.activateZarpazo();
				break;
			}
		}
	};
	return self;
});
var DangerousObject = Container.expand(function () {
	var self = Container.call(this);
	var dangerousGraphics = self.attachAsset('dangerousObject', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 4,
		scaleY: 4
	});
	self.isFalling = false;
	self.fallSpeed = 0;
	self.isDangerous = true;
	self.pulseTimer = 0;
	self.startFalling = function () {
		self.isFalling = true;
		self.fallSpeed = 2;
		self.isDangerous = false; // Not dangerous when falling
		// Play dangerous object falling sound
		LK.getSound('dangerousFall').play();
	};
	self.update = function () {
		if (!self.isFalling) {
			// Pulse effect to show it's dangerous
			self.pulseTimer++;
			var scale = 1 + Math.sin(self.pulseTimer * 0.15) * 0.3;
			dangerousGraphics.scaleX = scale;
			dangerousGraphics.scaleY = scale;
		} else {
			self.y += self.fallSpeed;
			self.fallSpeed += 0.2; // Gravity
			self.rotation += 0.1;
			if (self.y > 2732 + 50) {
				// Emit sound when dangerous object falls off screen
				LK.getSound('dangerousFall').play();
				self.destroy();
				var index = dangerousObjects.indexOf(self);
				if (index > -1) {
					dangerousObjects.splice(index, 1);
				}
			}
		}
	};
	return self;
});
var Dog = Container.expand(function () {
	var self = Container.call(this);
	var dogGraphics = self.attachAsset('dog', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 4,
		scaleY: 4
	});
	self.speed = 8; // Much faster dog movement
	self.direction = 1;
	self.alertRadius = 200;
	self.pulseTimer = 0;
	self.barkTimer = 0;
	self.isBarkingOpen = false;
	self.dogCloseGraphics = null;
	self.isTweening = false; // Flag for smooth movement
	self.update = function () {
		// Pulse effect to show dog is dangerous
		self.pulseTimer++;
		var scale = 1 + Math.sin(self.pulseTimer * 0.15) * 0.2;
		dogGraphics.scaleX = scale * self.direction;
		dogGraphics.scaleY = scale;
		// Dog follows cat behavior
		var distanceToCat = Math.abs(self.x - cat.x);
		var catDirection = cat.x > self.x ? 1 : -1;
		// Follow cat if within following range (500px) but maintain some distance (100px)
		if (distanceToCat > 100 && distanceToCat < 500) {
			self.direction = catDirection;
			// Move towards cat with smooth tweening
			if (!self.isTweening) {
				var followSpeed = Math.min(self.speed, distanceToCat / 50); // Slower when closer
				var targetX = self.x + followSpeed * self.direction * 20;
				tween(self, {
					x: targetX
				}, {
					duration: 400,
					easing: tween.easeInOut,
					onFinish: function onFinish() {
						self.isTweening = false;
					}
				});
				self.isTweening = true;
			}
		} else {
			// Regular movement when not following
			if (!self.isTweening) {
				var targetX = self.x + self.speed * self.direction * 30; // Move distance over 0.5 seconds
				tween(self, {
					x: targetX
				}, {
					duration: 500,
					easing: tween.easeInOut,
					onFinish: function onFinish() {
						self.isTweening = false;
					}
				});
				self.isTweening = true;
			}
			// Change direction randomly or when hitting boundaries with bounce animation
			if (Math.random() < 0.008) {
				self.direction *= -1;
				tween(dogGraphics, {
					scaleX: scale * self.direction * 1.3
				}, {
					duration: 200,
					easing: tween.bounceOut,
					onFinish: function onFinish() {
						tween(dogGraphics, {
							scaleX: scale * self.direction
						}, {
							duration: 100,
							easing: tween.easeOut
						});
					}
				});
			}
		}
		// Handle barking animation - 2 times per second (every 15 ticks = 4 times per second, so every 30 ticks = 2 times per second)
		self.barkTimer++;
		if (self.barkTimer >= 30) {
			// Change every 0.5 seconds (30 ticks) for 2 times per second
			self.barkTimer = 0;
			if (self.isBarkingOpen) {
				// Switch to normal dog with smooth tween
				tween(dogGraphics, {
					alpha: 1
				}, {
					duration: 100,
					easing: tween.easeOut,
					onFinish: function onFinish() {
						dogGraphics.visible = true;
						if (self.dogCloseGraphics) {
							self.dogCloseGraphics.visible = false;
						}
						self.isBarkingOpen = false;
					}
				});
			} else {
				// Switch to barking dog (close mouth) with smooth tween
				if (!self.dogCloseGraphics) {
					self.dogCloseGraphics = self.attachAsset('Dog-close', {
						anchorX: 0.5,
						anchorY: 0.5,
						scaleX: 4,
						scaleY: 4
					});
				}
				tween(self.dogCloseGraphics, {
					alpha: 1
				}, {
					duration: 10,
					easing: tween.easeOut,
					onFinish: function onFinish() {
						dogGraphics.visible = false;
						self.dogCloseGraphics.visible = true;
						self.dogCloseGraphics.scaleX = scale * self.direction;
						self.dogCloseGraphics.scaleY = scale;
						self.isBarkingOpen = true;
					}
				});
			}
		}
		// Sync dog-close graphics scale with regular graphics
		if (self.dogCloseGraphics && self.dogCloseGraphics.visible) {
			self.dogCloseGraphics.scaleX = scale * self.direction;
			self.dogCloseGraphics.scaleY = scale;
		}
		// Check if cat is within alert radius for barking only
		var distance = Math.abs(self.x - cat.x) + Math.abs(self.y - cat.y);
		if (distance < self.alertRadius) {
			if (Math.random() < 0.08) {
				// Increased from 0.02 to 0.08 for more frequent barking
				LK.getSound('dogBark').play();
			}
		}
		// Additional barking when mouth opens (barking animation)
		if (self.barkTimer === 0 && !self.isBarkingOpen && Math.random() < 0.7) {
			// 70% chance to bark when switching to open mouth
			LK.getSound('dogBark').play();
		}
	};
	return self;
});
var Lamp = Container.expand(function () {
	var self = Container.call(this);
	// Create visible light bulb first (behind)
	var lightBulbGraphics = self.attachAsset('lightbulb', {
		anchorX: 0.5,
		anchorY: 1,
		scaleX: 2.5,
		scaleY: 2.5
	});
	lightBulbGraphics.y = -130; // Position higher above lamp base
	// Create lamp base second (in front)
	var lampGraphics = self.attachAsset('lamp', {
		anchorX: 0.5,
		anchorY: 1,
		scaleX: 3,
		scaleY: 3
	});
	self.isFalling = false;
	self.fallSpeed = 0;
	self.pulseTimer = 0;
	self.hasElectrocuted = false;
	self.flickerTimer = 0;
	self.isFlickering = false;
	self.flickerInterval = 60 + Math.random() * 120; // Random flicker every 1-3 seconds
	self.startFalling = function () {
		if (self.isFalling) {
			return;
		}
		self.isFalling = true;
		self.fallSpeed = 2;
		// Play lamp falling sound
		LK.getSound('objectHit').play();
		// Add falling animation with rotation
		tween(self, {
			rotation: self.rotation + Math.PI * 2
		}, {
			duration: 1500,
			easing: tween.easeOut
		});
	};
	self.update = function () {
		if (!self.isFalling) {
			// Handle bulb flickering like electrical fault
			self.flickerTimer++;
			if (self.flickerTimer >= self.flickerInterval) {
				self.flickerTimer = 0;
				self.flickerInterval = 60 + Math.random() * 120; // New random interval
				self.isFlickering = true;
				// Quick flicker sequence - on/off/on rapidly
				tween(lightBulbGraphics, {
					alpha: 0.1 // Almost off
				}, {
					duration: 80,
					easing: tween.linear,
					onFinish: function onFinish() {
						tween(lightBulbGraphics, {
							alpha: 1 // Bright on
						}, {
							duration: 60,
							easing: tween.linear,
							onFinish: function onFinish() {
								tween(lightBulbGraphics, {
									alpha: 0.2 // Dim again
								}, {
									duration: 100,
									easing: tween.linear,
									onFinish: function onFinish() {
										tween(lightBulbGraphics, {
											alpha: 1 // Back to normal
										}, {
											duration: 120,
											easing: tween.easeOut,
											onFinish: function onFinish() {
												self.isFlickering = false;
											}
										});
									}
								});
							}
						});
					}
				});
			}
			// Create pulsing glow effect with tint when not flickering
			if (!self.isFlickering && self.flickerTimer % 120 === 0) {
				// Every 2 seconds, create a glow pulse
				tween(lightBulbGraphics, {
					tint: 0xFFFF88 // Bright yellow glow
				}, {
					duration: 1000,
					easing: tween.easeInOut,
					onFinish: function onFinished() {
						tween(lightBulbGraphics, {
							tint: 0xFFFFFF // Back to white
						}, {
							duration: 1000,
							easing: tween.easeInOut
						});
					}
				});
			}
		} else {
			self.y += self.fallSpeed;
			self.fallSpeed += 0.3; // Gravity
			// Check for collision with cat when falling
			if (!self.hasElectrocuted && self.intersects(cat)) {
				self.hasElectrocuted = true;
				// Electrocute cat for 2 seconds (reduced from 3)
				cat.isElectrocuted = true;
				LK.getSound('electricShock').play();
				cat.electrocutionTimer = 120; // 2 seconds at 60fps
				// Play electric shock sound
				LK.getSound('electricShock').play();
				// Flash screen blue/white for electric effect
				LK.effects.flashScreen(0x00FFFF, 1000);
				// Push cat away from lamp with stronger force to prevent getting stuck
				var pushDirection = cat.x > self.x ? 1 : -1;
				var pushDistance = 250; // Increased from 150 to 250
				var targetX = cat.x + pushDistance * pushDirection;
				// Ensure target position is within game bounds
				targetX = Math.max(200, Math.min(targetX, 3800));
				// Stop any existing movement tweens on cat
				tween.stop(cat, {
					x: true
				});
				// Make cat get pushed away with stronger force
				tween(cat, {
					x: targetX
				}, {
					duration: 200,
					// Faster push
					easing: tween.easeOut,
					onFinish: function onFinish() {
						// Additional push to ensure separation
						var secondPushX = targetX + pushDirection * 100;
						secondPushX = Math.max(200, Math.min(secondPushX, 3800));
						tween(cat, {
							x: secondPushX
						}, {
							duration: 150,
							easing: tween.easeOut
						});
					}
				});
			}
			// Remove when off screen
			if (self.y > 2732 + 100) {
				// Emit sound when lamp falls off screen
				LK.getSound('electricShock').play();
				self.destroy();
				var index = lamps.indexOf(self);
				if (index > -1) {
					lamps.splice(index, 1);
				}
			}
		}
	};
	return self;
});
var LaserPointer = Container.expand(function () {
	var self = Container.call(this);
	var pointerGraphics = self.attachAsset('laserPointer', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 4,
		scaleY: 4
	});
	self.pulseTimer = 0;
	self.update = function () {
		self.pulseTimer++;
		// Hide laser pointer
		pointerGraphics.visible = false;
		// Dynamic pulsing with tween animation
		if (self.pulseTimer % 120 === 0) {
			// Every 2 seconds
			tween(pointerGraphics, {
				scaleX: 6,
				scaleY: 6
			}, {
				duration: 600,
				easing: tween.elasticOut,
				onFinish: function onFinish() {
					tween(pointerGraphics, {
						scaleX: 4,
						scaleY: 4
					}, {
						duration: 400,
						easing: tween.bounceOut
					});
				}
			});
		}
		// Add rotation animation for more visual appeal
		tween(pointerGraphics, {
			rotation: pointerGraphics.rotation + Math.PI * 2
		}, {
			duration: 3000,
			easing: tween.linear
		});
	};
	return self;
});
var Mouse = Container.expand(function () {
	var self = Container.call(this);
	var mouseGraphics = self.attachAsset('mouse', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 4,
		scaleY: 4
	});
	self.speed = 12; // Much faster mouse movement
	self.direction = 1;
	self.isBeingChased = false;
	self.pulseTimer = 0;
	self.isTweening = false; // Flag for smooth movement
	self.update = function () {
		// Pulse effect to make mouse visible
		self.pulseTimer++;
		var scale = 1 + Math.sin(self.pulseTimer * 0.2) * 0.3;
		mouseGraphics.scaleX = scale * self.direction;
		mouseGraphics.scaleY = scale;
		// Move mouse
		self.x += self.speed * self.direction;
		// Change direction randomly or when hitting boundaries
		if (Math.random() < 0.01 || self.x < cat.x - 600 || self.x > cat.x + 600) {
			self.direction *= -1;
			// Add dynamic bounce effect when changing direction
			tween(mouseGraphics, {
				scaleX: scale * self.direction * 1.5,
				scaleY: scale * 1.2
			}, {
				duration: 300,
				easing: tween.elasticOut,
				onFinish: function onFinish() {
					tween(mouseGraphics, {
						scaleX: scale * self.direction,
						scaleY: scale
					}, {
						duration: 200,
						easing: tween.easeOut
					});
				}
			});
		}
		// Mouse squeaks when cat gets close
		var distance = Math.abs(self.x - cat.x) + Math.abs(self.y - cat.y);
		if (distance < 100 && !self.isBeingChased) {
			self.isBeingChased = true;
			LK.getSound('mouseSqueak').play();
		}
	};
	return self;
});
var Separator = Container.expand(function () {
	var self = Container.call(this);
	var separatorGraphics = self.attachAsset('separator', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 4,
		scaleY: 4
	});
	self.isBlocking = true;
	return self;
});
var ShelfObject = Container.expand(function (objectType) {
	var self = Container.call(this);
	var assetName = 'object' + (objectType || 1);
	var objectGraphics = self.attachAsset(assetName, {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 4,
		scaleY: 4
	});
	self.isFalling = false;
	self.fallSpeed = 0;
	self.startFalling = function () {
		self.isFalling = true;
		self.fallSpeed = 2;
		// Play sound based on object type
		var soundId = 'objectFall' + (objectType || 1);
		LK.getSound(soundId).play();
		// Add dynamic falling animation with scaling and rotation
		tween(objectGraphics, {
			scaleX: 6,
			scaleY: 6
		}, {
			duration: 800,
			easing: tween.bounceOut
		});
		// Add spinning effect while falling
		var spinDirection = Math.random() < 0.5 ? 1 : -1;
		tween(self, {
			rotation: self.rotation + Math.PI * 4 * spinDirection
		}, {
			duration: 2000,
			easing: tween.easeOut
		});
	};
	self.update = function () {
		if (self.isFalling) {
			self.y += self.fallSpeed;
			self.fallSpeed += 0.2; // Gravity
			self.rotation += 0.1;
			// Check for collisions with dogs when falling
			for (var i = dogs.length - 1; i >= 0; i--) {
				var dog = dogs[i];
				if (self.intersects(dog)) {
					// Object hits dog - dog runs away scared
					LK.getSound('dogBark').play();
					LK.effects.flashObject(dog, 0xFFFF00, 300);
					// Make dog run away fast
					dog.speed = 25; // Much faster running speed
					dog.direction = dog.x > cat.x ? 1 : -1; // Run away from cat
					dog.isRunningAway = true;
					// Add running away animation
					tween(dog, {
						x: dog.x + dog.direction * 800,
						y: dog.y + 100
					}, {
						duration: 1000,
						easing: tween.easeOut,
						onFinish: function onFinish() {
							// Remove dog after running away
							dog.destroy();
							var dogIndex = dogs.indexOf(dog);
							if (dogIndex > -1) {
								dogs.splice(dogIndex, 1);
							}
							// Stop hiding behavior if this was the hide target
							if (dog === cat.hideTarget) {
								cat.isHiding = false;
								cat.hideTarget = null;
							}
						}
					});
					// Remove the object that hit the dog
					self.destroy();
					var index = shelfObjects.indexOf(self);
					if (index > -1) {
						shelfObjects.splice(index, 1);
					}
					return; // Exit early since object is destroyed
				}
			}
			if (self.y > 2732 + 50) {
				// Emit sound when object falls off screen
				LK.getSound('objectHit').play();
				self.destroy();
				var index = shelfObjects.indexOf(self);
				if (index > -1) {
					shelfObjects.splice(index, 1);
				}
			}
		}
	};
	return self;
});
var Soap = Container.expand(function () {
	var self = Container.call(this);
	var soapGraphics = self.attachAsset('soap', {
		anchorX: 0.5,
		anchorY: 0.5,
		scaleX: 3,
		scaleY: 3
	});
	self.pulseTimer = 0;
	self.hasBeenUsed = false;
	self.update = function () {
		// Gentle shine effect to make soap visible
		self.pulseTimer++;
		var shine = 1 + Math.sin(self.pulseTimer * 0.15) * 0.2;
		soapGraphics.alpha = shine;
		soapGraphics.tint = 0xF0F8FF; // Light blue tint for soap
	};
	return self;
});

/**** 
* Initialize Game
****/
var game = new LK.Game({
	backgroundColor: 0x87CEEB
});

/**** 
* Game Code
****/
var cat;
var shelfObjects = [];
var dangerousObjects = [];
var laserPointers = [];
var laserDot = null;
var mice = [];
var dogs = [];
var separators = [];
var lamps = [];
var soaps = [];
var nextMouseSpawn = 0;
var nextDogSpawn = 0;
var nextSeparatorSpawn = 0;
var nextLampSpawn = 0;
var nextSoapSpawn = 0;
var shelfLevels = [500, 1000, 1500, 2000, 2500]; // Y positions for 5 shelf levels aligned with object feet
var shelves = [];
var nextObjectSpawn = 0;
var nextDangerousSpawn = 0;
var nextLaserSpawn = 0;
var cameraX = 0;
var gameTimer = 0;
var TIME_LIMIT = 9600; // 160 seconds at 60fps (9600 ticks)
// Always start fresh - ignore storage values to ensure correct initialization
var totalObjectsToKnock = 15;
var objectsKnockedDown = 0;
var obstaclePenalties = 0; // Track penalties from hitting obstacles
var finalScore = 0;
// Score display removed - game now uses timer-based gameplay
// Create lives display
var livesText = new Text2('Lives: 3', {
	size: 60,
	fill: 0xFF6B6B
});
livesText.anchor.set(0, 0);
LK.gui.topLeft.addChild(livesText);
livesText.x = 120; // Avoid the menu icon area
livesText.y = 50;
// Create timer display
var timerText = new Text2('Time: 60', {
	size: 60,
	fill: 0xFFD700
});
timerText.anchor.set(1, 0);
LK.gui.topRight.addChild(timerText);
timerText.x = -20;
timerText.y = 50;
// Create progress display with initial values
var progressText = new Text2('Objects: 0/15', {
	size: 60,
	fill: 0x00FF00
});
progressText.anchor.set(0.5, 0);
LK.gui.top.addChild(progressText);
progressText.y = 120;
// Create score display
var scoreText = new Text2('Score: 0', {
	size: 50,
	fill: 0xFFFFFF
});
scoreText.anchor.set(0.5, 0);
LK.gui.top.addChild(scoreText);
scoreText.y = 180;
// Claw button removed - zarpazo is now automatic when picking up objects
// Create shelves first - reduced to 96 shelves wide (24 sections per level)
for (var level = 0; level < 5; level++) {
	for (var section = 0; section < 24; section++) {
		var shelf = game.addChild(LK.getAsset('shelf', {
			anchorX: 0,
			anchorY: 1
		}));
		shelf.x = section * 400;
		shelf.y = shelfLevels[level];
		shelves.push(shelf);
	}
}
// Initialize objects at the beginning of the game with persistence
// Reset counters at game start to ensure proper initialization
totalObjectsToKnock = 15; // Always start with 15 objects
objectsKnockedDown = 0; // Always start with 0 knocked down
storage.totalObjectsToKnock = totalObjectsToKnock;
storage.objectsKnockedDown = objectsKnockedDown;
// Clear any existing objects from previous games
shelfObjects = [];
// Pre-define object positions ensuring proper spacing (minimum 500px apart) within shelf boundaries (400-9200px)
var objectPositions = [{
	x: 600,
	level: 0,
	type: 1
},
// Object 1
{
	x: 1200,
	level: 1,
	type: 2
},
// Object 2  
{
	x: 1800,
	level: 2,
	type: 3
},
// Object 3
{
	x: 2400,
	level: 3,
	type: 1
},
// Object 4
{
	x: 3000,
	level: 4,
	type: 2
},
// Object 5
{
	x: 3600,
	level: 0,
	type: 3
},
// Object 6
{
	x: 4200,
	level: 1,
	type: 1
},
// Object 7
{
	x: 4800,
	level: 2,
	type: 2
},
// Object 8
{
	x: 5400,
	level: 3,
	type: 3
},
// Object 9
{
	x: 6000,
	level: 4,
	type: 1
},
// Object 10
{
	x: 6600,
	level: 0,
	type: 2
},
// Object 11
{
	x: 7200,
	level: 1,
	type: 3
},
// Object 12
{
	x: 7800,
	level: 2,
	type: 1
},
// Object 13
{
	x: 8400,
	level: 3,
	type: 2
},
// Object 14
{
	x: 9000,
	level: 4,
	type: 3
} // Object 15
];
// Create all 15 objects at game start with proper spacing
for (var i = 0; i < totalObjectsToKnock; i++) {
	var pos = objectPositions[i];
	var obj = new ShelfObject(pos.type);
	obj.x = pos.x;
	obj.y = shelfLevels[pos.level] - 75; // Position on top of shelf
	obj.objectNumber = i + 1; // Add numbering for identification
	game.addChild(obj);
	shelfObjects.push(obj);
}
// Create barrier columns at start and end of game world
var leftBarriers = [];
var rightBarriers = [];
// Create left barrier column (at the beginning)
for (var level = 0; level < 5; level++) {
	var leftBarrier = game.addChild(new Separator());
	leftBarrier.x = -200; // Position at the very start
	leftBarrier.y = shelfLevels[level] - 150; // Position on each shelf level
	leftBarrier.isBlocking = true;
	leftBarriers.push(leftBarrier);
}
// Create right barrier column (at the end) - positioned for 96 shelves wide
for (var level = 0; level < 5; level++) {
	var rightBarrier = game.addChild(new Separator());
	rightBarrier.x = 9600; // Position at end of 24 sections (24 * 400 = 9600)
	rightBarrier.y = shelfLevels[level] - 150; // Position on each shelf level
	rightBarrier.isBlocking = true;
	rightBarriers.push(rightBarrier);
}
// Pre-define separator positions ensuring proper spacing (minimum 500px apart) within shelf boundaries
var separatorPositions = [{
	x: 1500,
	level: 0
}, {
	x: 2500,
	level: 2
}, {
	x: 3500,
	level: 1
}, {
	x: 4500,
	level: 4
}, {
	x: 5500,
	level: 3
}, {
	x: 6500,
	level: 0
}, {
	x: 7500,
	level: 2
}, {
	x: 8500,
	level: 1
}];
// Create all separators at game start with proper spacing
for (var i = 0; i < separatorPositions.length; i++) {
	var sepPos = separatorPositions[i];
	var separator = new Separator();
	separator.x = sepPos.x;
	separator.y = shelfLevels[sepPos.level] - 150; // Position higher above shelf
	separator.isBlocking = true;
	game.addChild(separator);
	separators.push(separator);
}
// Create cat after shelves so it appears in front
cat = game.addChild(new Cat());
// Position cat at horizontal center of screen
cat.x = 1024; // Center of screen horizontally (2048/2 = 1024)
cat.targetShelfLevel = 2; // Start on middle shelf
cat.currentShelfLevel = cat.targetShelfLevel;
cat.y = shelfLevels[cat.targetShelfLevel] - 208; // Position cat to stand on shelf (accounting for cat height and anchor) - raised by 30px
// Handle swipe controls
var swipeStartX = 0;
var swipeStartY = 0;
var isDragging = false;
game.down = function (x, y, obj) {
	swipeStartX = x;
	swipeStartY = y;
	isDragging = true;
	// If in laser mode, move laser dot
	if (cat.isLaserMode && laserDot) {
		laserDot.x = x;
		laserDot.y = y;
		laserDot.visible = false; // Keep laser dot hidden
	}
};
game.move = function (x, y, obj) {
	// If in laser mode, move laser dot
	if (cat.isLaserMode && laserDot) {
		laserDot.x = x;
		laserDot.y = y;
		laserDot.visible = false; // Keep laser dot hidden
	}
};
game.up = function (x, y, obj) {
	if (!isDragging) {
		return;
	}
	isDragging = false;
	// Don't respond to swipe controls when floating
	if (cat.isFloating) {
		return;
	}
	var deltaX = x - swipeStartX;
	var deltaY = y - swipeStartY;
	var swipeDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	if (swipeDistance < 50) {
		return;
	} // Minimum swipe distance
	if (Math.abs(deltaY) > Math.abs(deltaX)) {
		// Vertical swipe - change shelf level
		if (deltaY < 0 && cat.targetShelfLevel > 0) {
			cat.targetShelfLevel--; // Swipe up
		} else if (deltaY > 0 && cat.targetShelfLevel < 4) {
			cat.targetShelfLevel++; // Swipe down
		}
	} else {
		// Horizontal swipe - change direction
		if (!cat.isLaserMode) {
			if (deltaX > 0) {
				cat.direction = 1; // Right
			} else {
				cat.direction = -1; // Left
			}
		}
	}
};
// Spawn objects and laser pointers
function spawnObject() {
	// Objects are distributed at the beginning and remain persistent
	// No automatic spawning during gameplay
	return;
}
function spawnDangerousObject() {
	if (LK.ticks < nextDangerousSpawn) {
		return;
	}
	// Find a valid position with proper spacing (minimum 300px from other objects)
	var attempts = 0;
	var validPosition = false;
	var xPos, level;
	while (!validPosition && attempts < 20) {
		level = Math.floor(Math.random() * 5);
		xPos = 200 + Math.random() * 9400; // Spawn within shelf boundaries (200-9600)
		validPosition = true;
		// Check distance from existing objects on same shelf level
		for (var i = 0; i < shelfObjects.length; i++) {
			var obj = shelfObjects[i];
			var objLevel = -1;
			for (var l = 0; l < 5; l++) {
				if (Math.abs(obj.y - (shelfLevels[l] - 75)) < 50) {
					objLevel = l;
					break;
				}
			}
			if (objLevel === level && Math.abs(obj.x - xPos) < 300) {
				validPosition = false;
				break;
			}
		}
		// Check distance from other dangerous objects on same level
		for (var i = 0; i < dangerousObjects.length; i++) {
			var dObj = dangerousObjects[i];
			var dObjLevel = -1;
			for (var l = 0; l < 5; l++) {
				if (Math.abs(dObj.y - (shelfLevels[l] - 75)) < 50) {
					dObjLevel = l;
					break;
				}
			}
			if (dObjLevel === level && Math.abs(dObj.x - xPos) < 300) {
				validPosition = false;
				break;
			}
		}
		attempts++;
	}
	// Only spawn if valid position found
	if (validPosition) {
		var dangerousObj = new DangerousObject();
		dangerousObj.x = xPos;
		dangerousObj.y = shelfLevels[level] - 75; // Position on top of shelf
		game.addChild(dangerousObj);
		dangerousObjects.push(dangerousObj);
	}
	nextDangerousSpawn = LK.ticks + 300 + Math.random() * 450; // 10% spawn rate - 5-12.5 seconds
}
function spawnLaserPointer() {
	if (LK.ticks < nextLaserSpawn) {
		return;
	}
	var pointer = new LaserPointer();
	var level = Math.floor(Math.random() * 5);
	var xPos = 200 + Math.random() * 9400; // Spawn within shelf boundaries (200-9600)
	pointer.x = xPos;
	pointer.y = shelfLevels[level] - 75; // Position on top of shelf
	game.addChild(pointer);
	laserPointers.push(pointer);
	nextLaserSpawn = LK.ticks + 600 + Math.random() * 600; // 10-20 seconds
}
function spawnMouse() {
	if (LK.ticks < nextMouseSpawn) {
		return;
	}
	var mouse = new Mouse();
	var level = Math.floor(Math.random() * 5);
	var xPos = 200 + Math.random() * 9400; // Spawn within shelf boundaries (200-9600)
	mouse.x = xPos;
	mouse.y = shelfLevels[level] - 75; // Position on top of shelf
	game.addChild(mouse);
	mice.push(mouse);
	nextMouseSpawn = LK.ticks + 4500 + Math.random() * 3000; // 10% spawn rate - 75-125 seconds
}
function spawnDog() {
	if (LK.ticks < nextDogSpawn) {
		return;
	}
	var dog = new Dog();
	var level = Math.floor(Math.random() * 5);
	var xPos = 200 + Math.random() * 9400; // Spawn within shelf boundaries (200-9600)
	dog.x = xPos;
	dog.y = shelfLevels[level] - 75; // Position on top of shelf
	game.addChild(dog);
	dogs.push(dog);
	nextDogSpawn = LK.ticks + 12000 + Math.random() * 9000; // 10% spawn rate - 200-350 seconds
}
function spawnSeparator() {
	// Separators are now pre-defined at game start - no dynamic spawning
	return;
}
function spawnLamp() {
	if (LK.ticks < nextLampSpawn) {
		return;
	}
	// Find a valid position with proper spacing (minimum 350px from other objects)
	var attempts = 0;
	var validPosition = false;
	var xPos, level;
	while (!validPosition && attempts < 20) {
		level = Math.floor(Math.random() * 5);
		xPos = 200 + Math.random() * 9400; // Spawn within shelf boundaries (200-9600)
		validPosition = true;
		// Check distance from existing objects on same shelf level
		for (var i = 0; i < shelfObjects.length; i++) {
			var obj = shelfObjects[i];
			var objLevel = -1;
			for (var l = 0; l < 5; l++) {
				if (Math.abs(obj.y - (shelfLevels[l] - 75)) < 50) {
					objLevel = l;
					break;
				}
			}
			if (objLevel === level && Math.abs(obj.x - xPos) < 350) {
				validPosition = false;
				break;
			}
		}
		// Check distance from other lamps on same level
		for (var i = 0; i < lamps.length; i++) {
			var otherLamp = lamps[i];
			var lampLevel = -1;
			for (var l = 0; l < 5; l++) {
				if (Math.abs(otherLamp.y - shelfLevels[l]) < 50) {
					lampLevel = l;
					break;
				}
			}
			if (lampLevel === level && Math.abs(otherLamp.x - xPos) < 350) {
				validPosition = false;
				break;
			}
		}
		attempts++;
	}
	// Only spawn if valid position found
	if (validPosition) {
		var lamp = new Lamp();
		lamp.x = xPos;
		lamp.y = shelfLevels[level]; // Position on shelf
		game.addChild(lamp);
		lamps.push(lamp);
	}
	nextLampSpawn = LK.ticks + 900 + Math.random() * 1200; // 15-35 seconds
}
function spawnSoap() {
	if (LK.ticks < nextSoapSpawn) {
		return;
	}
	var soap = new Soap();
	var level = Math.floor(Math.random() * 5);
	var xPos = 200 + Math.random() * 9400; // Spawn within shelf boundaries (200-9600)
	soap.x = xPos;
	soap.y = shelfLevels[level] - 40; // Position on shelf
	game.addChild(soap);
	soaps.push(soap);
	nextSoapSpawn = LK.ticks + 1200 + Math.random() * 1800; // 20-50 seconds
}
// Camera follow with smooth tweening
function updateCamera() {
	var targetCameraX = cat.x - 1024; // Center cat on screen (2048/2 = 1024)
	// Smooth camera movement with easing
	if (Math.abs(cameraX - targetCameraX) > 5) {
		tween.stop(game, {
			x: true
		}); // Stop any existing camera tween
		tween(game, {
			x: -targetCameraX
		}, {
			duration: 300,
			easing: tween.easeOut,
			onFinish: function onFinish() {
				cameraX = targetCameraX;
			}
		});
	} else {
		cameraX = targetCameraX;
		game.x = -cameraX;
	}
	// Keep world size limited to 96 shelves - no dynamic expansion
	var rightmostShelf = Math.max.apply(Math, shelves.map(function (s) {
		return s.x;
	}));
	// No shelf expansion - world stays at fixed 96 shelves wide (9600px)
}
// Play main theme music
LK.playMusic('mainTheme');
game.update = function () {
	gameTimer++;
	var remainingTime = Math.max(0, Math.ceil((TIME_LIMIT - gameTimer) / 60));
	timerText.setText('Time: ' + remainingTime);
	// Update progress display based on objects that are NOT falling
	var actualObjectsRemaining = 0;
	for (var j = 0; j < shelfObjects.length; j++) {
		if (!shelfObjects[j].isFalling) {
			actualObjectsRemaining++;
		}
	}
	var actualObjectsKnockedDown = totalObjectsToKnock - actualObjectsRemaining;
	progressText.setText('Objects: ' + actualObjectsKnockedDown + '/' + totalObjectsToKnock);
	// Update score display with current calculated score
	var currentRemainingSeconds = Math.max(0, Math.ceil((TIME_LIMIT - gameTimer) / 60));
	var currentScore = Math.max(0, currentRemainingSeconds * 10 - obstaclePenalties);
	scoreText.setText('Score: ' + currentScore);
	// Check if time limit reached (only if cat is not dancing - i.e., game hasn't been won)
	if (gameTimer >= TIME_LIMIT && !cat.isDancing) {
		// Time's up - player loses regardless of objects remaining
		LK.showGameOver();
		return;
	}
	spawnObject();
	spawnDangerousObject();
	spawnLaserPointer();
	spawnMouse();
	spawnDog();
	spawnLamp();
	spawnSoap();
	updateCamera();
	// Keep all objects persistent - no cleanup during gameplay
	// Objects remain in their positions until knocked down by the cat
	// Only clean up non-persistent objects that spawn dynamically
	for (var i = dangerousObjects.length - 1; i >= 0; i--) {
		var dangerousObj = dangerousObjects[i];
		if (dangerousObj.x < cameraX - 500) {
			dangerousObj.destroy();
			dangerousObjects.splice(i, 1);
		}
	}
	for (var i = laserPointers.length - 1; i >= 0; i--) {
		var pointer = laserPointers[i];
		if (pointer.x < cameraX - 500) {
			pointer.destroy();
			laserPointers.splice(i, 1);
		}
	}
	// Separators are now persistent and don't need cleanup
	// Clean up lamps only if they have fallen off screen, not just off camera
	for (var i = lamps.length - 1; i >= 0; i--) {
		var lamp = lamps[i];
		if (lamp.y > 2732 + 100 && lamp.isFalling) {
			lamp.destroy();
			lamps.splice(i, 1);
		}
	}
	// Clean up soaps only if they have been used and destroyed
	for (var i = soaps.length - 1; i >= 0; i--) {
		var soap = soaps[i];
		if (soap.alpha <= 0 || soap.destroyed) {
			soaps.splice(i, 1);
		}
	}
	// Clean up mice
	for (var i = mice.length - 1; i >= 0; i--) {
		var mouse = mice[i];
		if (mouse.x < cameraX - 600 || mouse.x > cameraX + 2500) {
			if (mouse === cat.chaseTarget) {
				cat.isChasing = false;
				cat.chaseTarget = null;
			}
			mouse.destroy();
			mice.splice(i, 1);
		}
	}
	// Clean up dogs
	for (var i = dogs.length - 1; i >= 0; i--) {
		var dog = dogs[i];
		if (dog.x < cameraX - 600 || dog.x > cameraX + 2500) {
			if (dog === cat.hideTarget) {
				cat.isHiding = false;
				cat.hideTarget = null;
			}
			dog.destroy();
			dogs.splice(i, 1);
		}
	}
	// Remove laser dot when laser mode ends
	if (!cat.isLaserMode && laserDot) {
		laserDot.destroy();
		laserDot = null;
	}
};