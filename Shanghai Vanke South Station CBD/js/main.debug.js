﻿	function init() {
		var c = getId('canvas');
		c.width = window.innerWidth;
		c.height = window.innerHeight;
		var ctx = c.getContext("2d");
		var fcanvas = new fabric.Canvas('canvas');
		var ratio = fcanvas.height * 1.0 / fcanvas.width;

		/*************** start p1 ***************/
		// p1
		// plain canvas
		var p1_bg_el = getId("p1-bg");
		// ctx.drawImage(p1_bg_el, 0, 0);
		// fabric
		// fcanvas.setBackgroundImage(p1_bg_el, fcanvas.renderAll.bind(canvas));
		var radius = 1000;
		var p1_bg_instance = new fabric.Image(p1_bg_el, {
				left : 0,
				top : 0,
				clipTo : function (ctx) {
					ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
				}
			});
		fcanvas.add(p1_bg_instance);

		var p1_header_el = getId("p1-header");
		var p1_header_instance = new fabric.Image(p1_header_el, {
				left : 1000, // fcanvas.width / 2 - p1_header_el.width / 2,
				scaleX : 0.75,
				scaleY : 0.75,
				top : 50
			});
		fcanvas.add(p1_header_instance);
		p1_header_instance.animate('left', 70, {
			onChange : fcanvas.renderAll.bind(fcanvas),
			duration : 2000,
			easing : fabric.util.ease.easeOutBounce
		});

		var p1_footer_el = getId("p1-footer");
		var p1_footer_instance = new fabric.Image(p1_footer_el, {
				left : 50, // fcanvas.width / 2 - p1_header_el.width / 2,
				scaleX : 0.8,
				scaleY : 0.8,
				top : 0
			});
		fcanvas.add(p1_footer_instance);
		p1_footer_instance.animate('top', 750, {
			onChange : fcanvas.renderAll.bind(fcanvas),
			duration : 2000,
			easing : fabric.util.ease.easeOutBounce
		});
		// fadeOutAndRemove p1_header 
		setTimeout(function animate() {
			if (p1_header_instance.getOpacity() <= 0.05) {
				fcanvas.remove(p1_header_instance);	
				return;
			}
			p1_header_instance.setOpacity(p1_header_instance.getOpacity() - 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 150);
		}, 3000);
		
		setTimeout(function () {
			p1_footer_instance.animate('angle', '+=180', {
				onChange : fcanvas.renderAll.bind(fcanvas),
				duration : 3000
			});
			p1_footer_instance.animate('top', '+=90', {
				onChange : fcanvas.renderAll.bind(fcanvas),
				duration : 1000
			});
		}, 3000);

		setTimeout(function () {
			fcanvas.remove(p1_footer_instance);
		}, 6000);

		// resize to prepare p2

		setTimeout(function animate() {
			//if (p1_bg_instance.getScaleX() < 0.75) {
			//		return;
			//}
			if (p1_bg_instance.width < 600) {
				console.log("left: " + p1_bg_instance.left);
				console.log("top: " + p1_bg_instance.top);
				return;
			}
			p1_bg_instance.left = p1_bg_instance.left + 5;
			//p1_bg_instance.top = p1_bg_instance.top + 7;
			p1_bg_instance.width = p1_bg_instance.width - 3;
			p1_bg_instance.height = p1_bg_instance.height - 4;
			p1_bg_instance.setScaleX(p1_bg_instance.getScaleX() - 0.01);
			p1_bg_instance.setScaleY(p1_bg_instance.getScaleY() - 0.01);
			fcanvas.renderAll();
			setTimeout(animate, 100);
		}, 6000);
		// clip to circle

		setTimeout(function animate() {
			if (radius <= 300) {
				return;
			}
			fabric.util.animate({
				startValue : 500, // Math.round(radius) === 300 ? 300 : 500,
				endValue : 300, // Math.round(radius) === 300 ? 500 : 300,
				duration : 1000,
				onChange : function (value) {
					radius = value;
					fcanvas.renderAll();
				},
				onComplete : animate
			});
		}, 7000);
		// fadeOutAndRemove p1_bg
		setTimeout(function animate() {
			if (p1_bg_instance.getOpacity() <= 0.05) {
				fcanvas.remove(p1_bg_instance);	
				return;
			}
			p1_bg_instance.setOpacity(p1_bg_instance.getOpacity() - 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 50);
		}, 8000);

		// setTimeout(function () {
		// 	fcanvas.remove(p1_bg_instance);
		// }, 8800);
		/**************** end p1 ****************/

		/*************** start p2 ***************/
		var p2_earth_el = getId("p2-earth");
		var p2_earth_instance = new fabric.Image(p2_earth_el, {
				left : 65, // fcanvas.width / 2 - p1_header_el.width / 2,
				top : 125,
				scaleX : 0.75,
				scaleY : 0.75
			});
		p2_earth_instance.setOpacity(0);
		setTimeout(function animate() {
			fcanvas.add(p2_earth_instance);
		}, 8000);
		setTimeout(function animate() {
			if (p2_earth_instance.getOpacity() >= 0.95) {
				return;
			}
			p2_earth_instance.setOpacity(p2_earth_instance.getOpacity() + 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 50);
		}, 8800);

		var p2_shadow_el = getId("shadow");
		var p2_shadow_instance = new fabric.Image(p2_shadow_el, {
				left : 75, // fcanvas.width / 2 - p1_header_el.width / 2,
				top : 125 + p2_earth_instance.height * 0.75 + 15,
				scaleX : 0.75,
				scaleY : 0.75
			});
		p2_shadow_instance.setOpacity(0);
		setTimeout(function animate() {
			fcanvas.add(p2_shadow_instance);
		}, 9000);
		setTimeout(function animate() {
			p2_shadow_instance.setOpacity(p2_shadow_instance.getOpacity() + 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 50);
		}, 9800);
		/**************** end p2 ****************/
		
		/*************** start p3 ***************/
		var p3_footer_el = getId("p3-footer");
		var p3_footer_instance = new fabric.Image(p3_footer_el, {
				left : 120, // fcanvas.width / 2 - p1_header_el.width / 2,
				top : 125 + p2_earth_instance.height * 0.75 + 15 + p2_shadow_instance.height * 0.75 + 20,
				scaleX : 0.6,
				scaleY : 0.6
			});
		p3_footer_instance.setOpacity(0);
		setTimeout(function animate() {
			fcanvas.add(p3_footer_instance);
		}, 10000);
		setTimeout(function animate() {
			if (p3_footer_instance.getOpacity() >= 0.95) {
				p3_footer_instance.setOpacity(1);
				fcanvas.renderAll();
				return;
			}
			p3_footer_instance.setOpacity(p3_footer_instance.getOpacity() + 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 50);
		}, 10800);
		setTimeout(function animate() {
			p2_earth_instance.setOpacity(1);
			return;
		}, 12000);
		// fade out earth and fade in balls
		// fadeOutAndRemove p2_earth 
		setTimeout(function animate() {
			if (p2_earth_instance.getOpacity() <= 0.05) {
				fcanvas.remove(p2_earth_instance);	
				return;
			}
			p2_earth_instance.setOpacity(p2_earth_instance.getOpacity() - 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 20);
		}, 12000);
		
		// fadeOut footer and explode
		setTimeout(function animate() {
			if (p3_footer_instance.getOpacity() <= 0.05) {
				fcanvas.remove(p3_footer_instance);	
				fcanvas.remove(p2_shadow_instance);
				// fixme dirty solution to double num of balls;
				redNum = redNum * 2;
				yellowNum = yellowNum * 2;
				blackNum = blackNum * 2;
				grayNum = grayNum * 2;
				greenLightNum = greenLightNum * 2;
				greenNum = greenNum * 2;
				// blueNum = blueNum * 2;
				return;
			}
			p3_footer_instance.setOpacity(p3_footer_instance.getOpacity() - 0.05);
			p2_shadow_instance.setOpacity(p2_shadow_instance.getOpacity() - 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 20);
		}, 12000);
		/**************** end p3 ****************/
		
		/*************** start p4 ***************/
		// add balls to the back of the earth while fade out 
		var redNum = 19 * 2;
		var yellowNum = 7 * 2;
		var blackNum = 13 * 2;
		var grayNum = 1 * 2;
		var greenLightNum = 16 * 2;
		var greenNum = 14 * 2;
		var blueNum = 53 * 2;
		var totalNum = redNum + yellowNum + blackNum + grayNum + greenLightNum + greenNum + blueNum;
		var redBalls = new Array(0);
		var yellowBalls = new Array(0);
		var blackBalls = new Array(0);
		var grayBalls = new Array(0);
		var greenLightBalls = new Array(0);
		var greenBalls = new Array(0);
		var blueBalls = new Array(0);
		var allBalls = new Array(0);
		setTimeout(addBalls, 12000);
		// will double balls for each kind except for blue ones
		setTimeout(function animate() {
			if (allBalls.length == totalNum * 2 - blueNum) {
				console.log("Reach to maximum size");
				return;
			}
			addBallRandomly(600, 800); // new frame to footer
			setTimeout(animate, 10);
		}, 14000); // time should be after earth is removed
		
		// move the balls to pyramid position and fade out and remove them
		/**************** end p4 ****************/
		
		/*************** start p5 ***************/
		var explode = false;
		// move the ball and fade out
		setTimeout(function animate() {
			// TODO return condition
			if (explode) {
				return;
			}
			if (allBalls.length == totalNum * 2 - blueNum) {
				allBalls.forEach(function (b) {
					if (b.targetPoint === undefined) {
						b.targetPoint = randomizeBallTarget(allBalls.indexOf(b) % 3); 
					}
					animateBallScaleAndMoveToPyramid(b, b.targetPoint);
				});
				fcanvas.renderAll();
			}
			setTimeout(animate, 100);
		}, 15000);
		var pyramidL = Pyramid.createNew();
		pyramidL.init(175, 230, 65);		
		var pyramidC = Pyramid.createNew();
		pyramidC.init(400, 260, 70);
		var pyramidR = Pyramid.createNew();
		pyramidR.init(490, 450, 55);
		// add pyramid
		var p5_pyramid_el = getId("p5-pyramid");
		var p5_pyramid_instance = new fabric.Image(p5_pyramid_el, {
				opacity : 0,
				left : 40,
				scaleX : 1,
				scaleY : 1,
				top : 110
			});
		fcanvas.add(p5_pyramid_instance);
		// fade in side
		setTimeout(function animate() {
			if (p5_pyramid_instance.getOpacity() >= 0.95) {
				return;
			}
			p5_pyramid_instance.setOpacity(p5_pyramid_instance.getOpacity() + 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 50);
		}, 20000);
		
		var p5_body_el = getId("p5-body");
		var p5_body_instance = new fabric.Image(p5_body_el, {
				left : 1000,
				scaleX : 0.60,
				scaleY : 0.60,
				top : 480
			});
		// add body 
		setTimeout(function () {			
			fcanvas.add(p5_body_instance);
			p5_body_instance.animate('left', 210, {
				onChange : fcanvas.renderAll.bind(fcanvas),
				duration : 2000,
				easing : fabric.util.ease.easeOutCubic
			});
		}, 25100);
		
		// add side font 
		var p5_side_el = getId("p5-side");
		var p5_side_instance = new fabric.Image(p5_side_el, {
				opacity : 0,
				left : 20,
				scaleX : 0.70,
				scaleY : 0.70,
				top : 300
			});
		fcanvas.add(p5_side_instance);
		// fade in side
		setTimeout(function animate() {
			if (p5_side_instance.getOpacity() >= 0.95) {
				return;
			}
			p5_side_instance.setOpacity(p5_side_instance.getOpacity() + 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 50);
		}, 25000);
		
		var p5_footer_el = getId("p5-footer");
		var p5_footer_instance = new fabric.Image(p5_footer_el, {
				left : 1000,
				scaleX : 0.65,
				scaleY : 0.65,
				top : 800
			});
		// add footer
		setTimeout(function () {
			fcanvas.add(p5_footer_instance);
			p5_footer_instance.animate('left', 240, {
				onChange : fcanvas.renderAll.bind(fcanvas),
				duration : 2000,
				easing : fabric.util.ease.easeOutCubic
			});
		}, 25500);
		
		/**************** end p5 ****************/
		/*************** start p6 ***************/
		// fade out pyramid and remove 
		// setTimeout(animateFadeOutAndRemove(p5_pyramid_instance, -0.05, 50), 30000);			
		// fadeOutAndRemove p1_header 
		setTimeout(function animate() {
			if (p5_pyramid_instance.getOpacity() <= 0.05) {
				fcanvas.remove(p5_pyramid_instance);	
				return;
			}
			p5_pyramid_instance.setOpacity(p5_pyramid_instance.getOpacity() - 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 100);
		}, 35000);
		setTimeout(function animate() {
			if (p5_side_instance.getOpacity() <= 0.05) {
				fcanvas.remove(p5_side_instance);	
				return;
			}
			p5_side_instance.setOpacity(p5_side_instance.getOpacity() - 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 100);
		}, 35000);
		setTimeout(function animate() {
			if (p5_body_instance.getOpacity() <= 0.05) {
				fcanvas.remove(p5_body_instance);	
				return;
			}
			p5_body_instance.setOpacity(p5_body_instance.getOpacity() - 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 100);
		}, 35000);
		setTimeout(function animate() {
			if (p5_footer_instance.getOpacity() <= 0.05) {
				fcanvas.remove(p5_footer_instance);	
				return;
			}
			p5_footer_instance.setOpacity(p5_footer_instance.getOpacity() - 0.05);
			fcanvas.renderAll();
			setTimeout(animate, 100);
		}, 35000);		
		// explode 
		setTimeout(function resetExploded() {
			explode = true;
			allBalls.forEach(function (b) {
				b.targetPoint = randomizeTarget(60, 600, 75, 800);
			});
		}, 35000);
		setTimeout(function animate() {
			if (Steps.P07_STARTED) {
				return;
			}
			if (p5_footer_instance.getOpacity() <= 0.2) {
				allBalls.forEach(function (b) {
					//if (b.targetPoint === undefined) {
					//	b.targetPoint = randomizeBallTarget(allBalls.indexOf(b) % 3);
					//}
					animateBallScaleAndExplode(b, b.targetPoint);
				});
				fcanvas.renderAll();
			}
			setTimeout(animate, 100);
		}, 35000);
		/**************** end p6 ****************/
		
		
		function getId(id) {
			return document.getElementById(id);
		};	
		
		//function animateFadeOutAndRemove(instance, oInterval, inMillseconds) {
		//	if (instance.opacity <= oInterval) {
		//		fcanvas.remove(instance);	
		//		return;
		//	}
		//	instance.opacity = instance.opacity - oInterval;
		//	fcanvas.renderAll();
		//	setTimeout(animateFadeOutAndRemove, inMillseconds);
		//};
		
		function addBalls(topFrameFrom, topFrameTo) {
			while (allBalls.length != totalNum) {
				addBallRandomly();
			}
			setTimeout(function animate() {
				if (allBalls.length == totalNum * 2 - blueNum) {
					console.log("All balls rendered. Stop animate to move them");
					return;
				}
				allBalls.forEach(function (b) {
					animateBallScale(b);
				});
				fcanvas.renderAll();
				setTimeout(animate, 50);
				// fabric.util.requestAnimFrame(animate);

			}, 10);
			// randomLayoutBalls(redBalls, redNum, BallColorType.RED);
			// randomLayoutBalls(yellowBalls, yellowNum, BallColorType.YELLOW);
			// randomLayoutBalls(blackBalls, blackNum, BallColorType.BLACK);
			// randomLayoutBalls(grayBalls, grayNum, BallColorType.GRAY);
			// randomLayoutBalls(greenLightBalls, greenLightNum, BallColorType.GREEN, BallStyle.LIGHT);			
			// randomLayoutBalls(greenBalls, greenNum, BallColorType.GREEN);
			// randomLayoutBalls(blueBalls, blueNum, BallColorType.BLUE);			
			// fcanvas.renderAll();
		};
		
		function addBallRandomly(topFrameFrom, topFrameTo) {
			var slot = utils.random.getRandomInt(0, 6);
			switch (slot) {
					case 0:
						tryToAddBall(fcanvas, redBalls, redNum, allBalls, BallColorType.RED, '', topFrameFrom, topFrameTo);
						break;
					case 1:
						tryToAddBall(fcanvas, yellowBalls, yellowNum, allBalls, BallColorType.YELLOW, '', topFrameFrom, topFrameTo);
						break;
					case 2:
						tryToAddBall(fcanvas, blackBalls, blackNum, allBalls, BallColorType.BLACK, '', topFrameFrom, topFrameTo);
						break;
					case 3:
						tryToAddBall(fcanvas, grayBalls, grayNum, allBalls, BallColorType.GRAY, '', topFrameFrom, topFrameTo);
						break;
					case 4:
						tryToAddBall(fcanvas, greenLightBalls, greenLightNum, allBalls, BallColorType.GREEN, BallStyle.LIGHT, topFrameFrom, topFrameTo);
						break;
					case 5:
						tryToAddBall(fcanvas, greenBalls, greenNum, allBalls, BallColorType.GREEN, '', topFrameFrom, topFrameTo);
						break;
					case 6:
						tryToAddBall(fcanvas, blueBalls, blueNum, allBalls, BallColorType.BLUE, '');
						break;	
					default:
						var msg = "Unsupported ball style: " + slot;
						console.log(msg);
						throw msg;
				}	
		};
		
		// balls
		function animateBallScale(b, ratio) {
			if (ratio == undefined) {
				ratio = 1;
			}
			// var interval = 0.002;
			if (b.animInterval < 0.02) {
				b.animInterval += 0.0001;
			}
			if (b.getScaleX() >= b.originScaleX * ratio - 0.1 && b.getScaleX() <= b.originScaleX * ratio + 0.1) {
				var actualInterval = (b.animDirection === 'expand' ? b.animInterval : -b.animInterval);
				b.setScaleX(b.getScaleX() + actualInterval);
				b.setScaleY(b.getScaleY() + actualInterval);
			}
			if (b.getScaleX() >= b.originScaleX * ratio + 0.1) {
				b.animDirection = 'shrink';
				b.setScaleX(b.getScaleX() - b.animInterval);
				b.setScaleY(b.getScaleY() - b.animInterval);
			}
			if (b.getScaleX() <= b.originScaleX * ratio - 0.1) {
				b.animDirection = 'expand';
				b.setScaleX(b.getScaleX() + b.animInterval);
				b.setScaleY(b.getScaleY() + b.animInterval);
			}
			if (b.angle >= b.originAngle - 5 && b.angle <= b.originAngle + 5) {
				var actualAngle = (b.animDirection === 'expand' ? b.animAngle : -b.animAngle);
				b.angle = b.angle + actualAngle;
			}
			if (b.angle >= b.originAngle + 5) {
				b.animDirection = 'shrink';
				b.angle = b.angle - b.animAngle;				
			}
			if (b.angle <= b.originAngle - 5) {
				b.animDirection = 'expand';
				b.angle = b.angle + b.animAngle;
			}
		};
		
		function animateBallFadeIn(b, ratio) {
			if (ratio == undefined) {
				ratio = 1;
			}
			if (b.opacity <= 0.95) {
				b.opacity = b.opacity + 0.05;
			}
		};
		
		function animateBallScaleAndMoveToPyramid(b, target) {
			// shrink
			animateBallScale(b, 0.2);
			// move to 
			animateBallMove(b, target);
		};
		
		function animateBallScaleAndExplode(b, target) {
			// explode
			animateBallScale(b, 1.5);
			// fadeIn 
			animateBallFadeIn(b);
			// move to 
			animateBallMove(b, target);
		};
		
		function randomizeBallTarget(index) {
			var targetPoint = null;
			var px = 0;
			var py = 0;
			var pyramid = null;
			switch (index) {
				case 0:
					pyramid = pyramidL;
					break;
				case 1:
					pyramid = pyramidC;
					break;
				case 2:
					pyramid = pyramidR;
					break;
				default:
					var msg = "Out of pyramid scope: " + index;
					console.log(msg);
					throw msg;
			}
			var leftFrameFrom = pyramid.cCoordinateX - pyramid.rectWidth;
			var leftFrameTo = pyramid.cCoordinateX + pyramid.rectWidth;
			var topFrameFrom = pyramid.cCoordinateY - pyramid.rectWidth;
			var topFrameTo = pyramid.cCoordinateY + pyramid.rectWidth;
			// px = utils.random.getRandomInt(leftFrameFrom, leftFrameTo); 
			// py = utils.random.getRandomInt(topFrameFrom, topFrameTo);
			// targetPoint = {x : px, y : py};
			return randomizeTarget(leftFrameFrom, leftFrameTo, topFrameFrom, topFrameTo);
		};
		
		function randomizeTarget(leftFrameFrom, leftFrameTo, topFrameFrom, topFrameTo) {
			var px = utils.random.getRandomInt(leftFrameFrom, leftFrameTo); 
			var py = utils.random.getRandomInt(topFrameFrom, topFrameTo);
			var t = {x : px, y : py};
			return t;
		};
		
		force = 0.05;		
		var speed = 1; // 1 pixel toward the target
		function animateBallMove(b, target) {
			var dx = target.x - b.left;
            var dy = target.y - b.top;
			if ((Math.abs(dx) <= 20 || Math.abs(dy) <= 20) && b.getOpacity() >= 0.05 && b.frozen) {
				b.setOpacity(b.getOpacity() - 0.05);
			}
            if (Math.abs(dx) <= 2 && Math.abs(dy) <= 2) {
				b.frozen = true;
				b.setOpacity(0);
				return;
			}
			var angle = Math.atan2(dy, dx);
			var ax = Math.cos(angle) * force;
            var ay = Math.sin(angle) * force;
			b.vx += ax;
			b.vy += ay;
			b.left += b.vx;
			b.top += b.vy;
		};
		
		function tryToAddBall(c, array, limit, globalArray, colorType, style, topFrameFrom, topFrameTo) {
			if (array.length > limit) {
				return false;
			}
			var theBall = randomBall(colorType, style, topFrameFrom, topFrameTo);
			array.push(theBall);
			globalArray.push(theBall);
			fcanvas.add(theBall);
			fcanvas.renderAll();
			// console.log("ColorType: " + colorType + " Style: " + style + " Size:"+ array.length);
			return theBall;
		};
				
		function randomBall(colorType, style, topFrameFrom, topFrameTo) {
			if (topFrameFrom == undefined) {
				topFrameFrom = 75;
			}
			if (topFrameTo == undefined) {
				topFrameTo = 600;
			}
			// random access ball size 
			var theBall = makeBall(getBallEl(colorType, style,
						BallSize[Object.keys(BallSize)[utils.random.getRandomInt(0, 2)]] /* BallSize.SMALL */
					),
				utils.random.getRandomInt(60, 600), // left, 
				utils.random.getRandomInt(topFrameFrom, topFrameTo), // top, 
				utils.random.getRandomArbitrary(0.4, 0.9), // scale, 
				utils.random.getRandomInt(0, 360) // angle
				);
			return theBall;
		};
		
		
		function randomLayoutAllBalls(array, num, colorType, style) {
			for (var i = 0, len = num; i < len; i++) {
				var left = utils.random.getRandomInt(60, 600);
				var top = utils.random.getRandomInt(75, 600);				
				var scale = utils.random.getRandomArbitrary(0.4, 0.9);
				var angle = utils.random.getRandomInt(0, 360);
				var sizeRandomInt = utils.random.getRandomInt(0, 2);
				// random access ball size 
				var theBall = makeBall(getBallEl(colorType, style, BallSize[Object.keys(BallSize)[sizeRandomInt]]/* BallSize.SMALL */), 
					left, top, scale, angle);
				array[i] = theBall;
				fcanvas.add(theBall);
			}
		};
		
		function makeBall(image_el, left, top, scale, angle) {
			var _instance = new fabric.Image(image_el, {
				left : left, 
				top : top,
				vx : 0, 
				vy : 0, 
				scaleX : scale,
				scaleY : scale,
				originScaleX : scale,
				originScaleY : scale,
				animDirection : 'expand',
				animInterval : 0.002,				
				animAngle : 0.5,				
				angle : angle,
				originAngle : angle				
			});
			_instance.setOpacity(utils.random.getRandomArbitrary(0.8, 1.0));
			return _instance;
		};
		
		function getBallEl(colorType, light, xSize) {
			if (colorType == null || xSize == null) {
				throw "Both colorType and xSize can not be null";
			}
			var id = colorType;
			if (light != null && light != '') {
				id += "-" + light;
			}
			id += "-" + xSize;
			var el = getId(id);
			if (el === null) {
				throw "Element can not be found " 
					+ "color: " + colorType
					+ "light: " + light
					+ "xSize: " + xSize;
			}
			return el;
		};
		
		// full screen
		function fullscreen() {
			var el = getId('canvas');

			if (el.webkitRequestFullScreen) {
				el.webkitRequestFullScreen();
			} else {
				el.mozRequestFullScreen();
			}
		};
		getId('canvas').addEventListener("click", fullscreen);
	};
	/*
	(function() {
	// We are resizing for mobile devices only. For other devices, the
	// dimensions will be stuck at 800 * 600. To change the default dimensions,
	// change the height and width of the canvas and the width of the #container
	var win = window,
	doc = document,
	w = win.innerWidth,
	h = win.innerHeight,
	container = doc.getElementById('container'),
	canvas = doc.getElementById('canvas');

	if( win.navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/i) ) {
	canvas.height = h;
	canvas.width  = w;
	container.style.height = h+"px";
	container.style.width = w+"px";
	}
	})();

	function fullscreen() {
	var el = getId('canvas');

	if (el.webkitRequestFullScreen) {
	el.webkitRequestFullScreen();
	} else {
	el.mozRequestFullScreen();
	}
	}
	getId('canvas').addEventListener("click", fullscreen)


	*/