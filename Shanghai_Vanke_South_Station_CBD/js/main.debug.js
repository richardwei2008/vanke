	function init() {
		var normalizedWidth = 640;
		var normalizedHeight = 960;
		
		var c = getId('canvas');
		c.width = window.innerWidth;
		c.height = window.innerHeight;
		var ctx = c.getContext("2d");
		// var fcanvas = new fabric.Canvas('canvas');
		var fcanvas = new fabric.StaticCanvas('canvas');
		fcanvas.selection = false; // disable selection
		var aspectRatio = fcanvas.height * 1.0 / fcanvas.width;
		
		var globalRatio = fcanvas.width * 1.0 / normalizedWidth;
		
		var frameFreshTime = 20;
		var slideElFadeOutPace = 100;
		var slideElFadeOutThreshold = oInterval = 0.02;
		var slideElFadeInThreshold = 1 - slideElFadeOutThreshold;
		
		var easeDuration = 2000;
		var leftInPoint = 500;
		var rightInPoint = 1000;
		/*************** start p1 ***************/
		var p1_bg_el = getId("p1-bg");
		var radius = 1000 * globalRatio;		
		var p1_bg_instance = new fabric.Image(p1_bg_el, {
				left : - (p1_bg_el.width - fcanvas.width) / 2, // 0
				top : - (p1_bg_el.height - fcanvas.height) / 2, // 0
			});
		fcanvas.add(p1_bg_instance);
		
		var p1_header_el = getId("p1-header");
		var p1_header_top = 80 * globalRatio;
		var p1_header_instance = new fabric.Image(p1_header_el, {
				left : rightInPoint, // fcanvas.width / 2 - p1_header_el.width / 2,
				top : p1_header_top
			});
		fcanvas.add(p1_header_instance);
		var p1_header_move_to_left = (fcanvas.width - p1_header_instance.width) / 2;
		animateEase(p1_header_instance, p1_header_move_to_left, 'left', fabric.util.ease.easeOutBounce);
		
		var p1_footer_el = getId("p1-footer");
		var p1_footer_left = p1_header_move_to_left;
		var p1_footer_instance = new fabric.Image(p1_footer_el, {
				left : p1_footer_left * globalRatio, 
				top : 0
			});
		fcanvas.add(p1_footer_instance);
		var p1_footer_move_to_top = 750 * globalRatio;
	
		animateEase(p1_footer_instance, p1_footer_move_to_top, 'top', fabric.util.ease.easeOutBounce);
		// fadeOutAndRemove p1_header 
		var p1_fadeOutTime = 3000;
		setTimeout(animateFadeOutAndRemove(p1_header_instance, oInterval, frameFreshTime), p1_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p1_footer_instance, oInterval, frameFreshTime), p1_fadeOutTime);
		
		// resize to prepare p2
		// resize to earth
		var p2_earth_el = getId("p2-earth");
		var resizeRatio = 0.02;
		var earthShrinkPixel = 2;
		setTimeout(function animate() {
			if (p1_bg_instance.width <= p2_earth_el.width) {
				// console.log("left: " + p1_bg_instance.left);
				// console.log("top: " + p1_bg_instance.top);
				return;
			}
			// p1_bg_instance.top = p1_bg_instance.top + 7;
			p1_bg_instance.left = p1_bg_instance.left + earthShrinkPixel;
			p1_bg_instance.top = p1_bg_instance.top + earthShrinkPixel * 0.75;
			p1_bg_instance.width = p1_bg_instance.width - earthShrinkPixel * 2;
			p1_bg_instance.height = p1_bg_instance.height - earthShrinkPixel * 2;
//			p1_bg_instance.left = p1_bg_instance.left + resizeRatio * p1_bg_instance.width / 2;
			// p1_bg_instance.setScaleX(p1_bg_instance.getScaleX() - resizeRatio);
			// p1_bg_instance.setScaleY(p1_bg_instance.getScaleY() - resizeRatio);
			fcanvas.renderAll();
			setTimeout(animate, 20);
		}, p1_fadeOutTime - 1000);
		/**************** end p1 ****************/

		/*************** start p2 ***************/
		var p2_startTime = p1_fadeOutTime;
		var p2_earth_instance = p1_bg_instance;
		
		var p2_shadow_el = getId("shadow");
		var p2_shadow_instance = new fabric.Image(p2_shadow_el, {
				opacity : 0,
				left : (fcanvas.width - p2_shadow_el.width) / 2, 	// 75, // fcanvas.width / 2 - p1_header_el.width / 2,
				top : 64 * globalRatio + p2_earth_el.height + 20
			});
		fcanvas.add(p2_shadow_instance);
		setTimeout(animateFadeInAndDisplay(p2_shadow_instance, oInterval, frameFreshTime), p2_startTime);
		/**************** end p2 ****************/
		
		/*************** start p3 ***************/
		var p3_footer_el = getId("p3-footer");
		var p3_footer_instance = new fabric.Image(p3_footer_el, {
				opacity : 0,
				left : (fcanvas.width - p3_footer_el.width) / 2, // fcanvas.width / 2 - p1_header_el.width / 2,
				top : 64 * globalRatio + p2_earth_el.height + 15 + p2_shadow_instance.height + 20
			});
		fcanvas.add(p3_footer_instance);
		setTimeout(animateFadeInAndDisplay(p3_footer_instance, oInterval, frameFreshTime), p2_startTime + 500);
		// fade out earth and fade in balls
		// fadeOutAndRemove p2_earth 
		var earthFadeOutTime = p2_startTime + 2000;
		// fadeOut footer 
		setTimeout(animateFadeOutAndRemove(p2_earth_instance, oInterval, frameFreshTime), earthFadeOutTime);
		setTimeout(animateFadeOutAndRemove(p2_shadow_instance, oInterval, frameFreshTime), earthFadeOutTime);
		setTimeout(animateFadeOutAndRemove(p3_footer_instance, oInterval, frameFreshTime), earthFadeOutTime + 4000);
		/**************** end p3 ****************/
		
		/*************** start p4 ***************/
		// add balls to the back of the earth while fade out 
		var redNum = 19 		* 2;
		var yellowNum = 7 		* 2;
		var blackNum = 13 		* 2;
		var grayNum = 1 		* 2;
		var greenLightNum = 16 	* 2;
		var greenNum = 14 		* 2;
		var blueNum = 53 		;//* 2;
		var totalNum = redNum + yellowNum + blackNum + grayNum + greenLightNum + greenNum + blueNum;
		var redBalls = new Array(0);
		var yellowBalls = new Array(0);
		var blackBalls = new Array(0);
		var grayBalls = new Array(0);
		var greenLightBalls = new Array(0);
		var greenBalls = new Array(0);
		var blueBalls = new Array(0);
		var allBalls = new Array(0);
		
		setTimeout(addBalls(totalNum, 
					p2_shadow_instance.top - p2_earth_el.height - 20 * globalRatio, 
					p2_shadow_instance.top + 20 * globalRatio), 
			p1_fadeOutTime - 1000);	
		// opacity
		setTimeout(animateAllBallOpacity('P05_STARTED'), earthFadeOutTime);
		// scale 
		setTimeout(animateAllBallScale('P05_STARTED'), earthFadeOutTime);
		
		// will double balls for each kind except for blue ones
		// setTimeout(function animate() {
		// 	if (allBalls.length == totalNum) {
		// 		console.log("Reach to maximum size");
		// 		return;
		// 	}
		// 	addBallRandomly((fcanvas.width - 30 * globalRatio), (fcanvas.height - 40 * globalRatio)); // new frame to footer
		// 	setTimeout(animate, 10);
		// }, 14000); // time should be after earth is removed
		
		// move the balls to pyramid position and fade out and remove them
		/**************** end p4 ****************/
		
		/*************** start p5 ***************/
		var p5_startTime = 15000;
		setTimeout(function p5_started() {
			explode = false;
			Steps.P05_STARTED = true;
			allBalls.forEach(function (b) {
				b.targetPoint = undefined;
			}); 
		}, p5_startTime - 100);		
		// add pyramid
		var p5_pyramid_el = getId("p5-pyramid");
		
		var p5_pyramid_left = 40 * globalRatio;
		var p5_pyramid_top = 110 * globalRatio;
		var p5_larger_pyramid_height = 160 * globalRatio;
		var p5_smaller_pyramid_height = 120 * globalRatio;
				
		var pyramidL = Area.createNew();
		var plw = 130;
		var plx = p5_pyramid_left + plw/2; // 175;
		var ply = p5_pyramid_top + p5_larger_pyramid_height * 0.75; // 230;
		pyramidL.init(plx, ply, plw/2);		
		
		var pyramidC = Area.createNew();
		var pcw = 140;
		var pcx = p5_pyramid_left + plw + pcw/2; // 400;
		var pcy = p5_pyramid_top + p5_larger_pyramid_height * 0.75 + 10 * globalRatio; // 260; 10*globalRatio for adjust
		pyramidC.init(pcx, pcy, pcw/2);
		
		var pyramidR = Area.createNew();
		var prw = 110; // 55;
		var prx = p5_pyramid_left + p5_pyramid_el.width - prw/2;
		var pry = p5_pyramid_top + p5_pyramid_el.height - (p5_smaller_pyramid_height * 0.25);
		pyramidR.init(prx, pry, prw/2);
			
		var p5_pyramid_instance = new fabric.Image(p5_pyramid_el, {
				opacity : 0,
				left : p5_pyramid_left,
				top : p5_pyramid_top
			});
		fcanvas.add(p5_pyramid_instance);
		// fadeIn pyramid
		setTimeout(animateFadeInAndDisplay(p5_pyramid_instance, oInterval, frameFreshTime), p5_startTime + 6000);
		var explode = false;
		// move the ball and fade out
		setTimeout(moveBallScaleAndFadeOut(pyramidL, pyramidC, pyramidR), p5_startTime);
		// add side font 		
		var p5_side_el = getId("p5-side");
		var p5_side_left = 50 * globalRatio;
		var p5_side_top = p5_pyramid_instance.top + p5_larger_pyramid_height + 40 * globalRatio;
		var p5_side_instance = new fabric.Image(p5_side_el, {
				opacity : 0,
				left : p5_side_left, // 20,
				top : p5_side_top // 300
			});
		fcanvas.add(p5_side_instance);
		// fadeIn side
		var p5_renderingTime = p5_startTime + 5000;
		setTimeout(animateFadeInAndDisplay(p5_side_instance, oInterval, frameFreshTime), p5_renderingTime);
		// add body 
		var p5_body_el = getId("p5-body");
		var p5_body_instance = new fabric.Image(p5_body_el, {
				left : rightInPoint,
				top : p5_pyramid_top + p5_pyramid_instance.height + 20 * globalRatio
			});
		// easeOut body
		var p5_body_move_to_left = p5_side_left + p5_side_el.width + 10 * globalRatio;
		setTimeout(function () {			
			fcanvas.add(p5_body_instance);
			animateEase(p5_body_instance, p5_body_move_to_left, 'left', fabric.util.ease.easeOutCubic);
		}, p5_renderingTime + 100);
		// add footer
		var p5_footer_el = getId("p5-footer");
		var p5_footer_top = p5_side_top + p5_side_el.height - p5_footer_el.height - 10 * globalRatio;
		var p5_footer_instance = new fabric.Image(p5_footer_el, {
				left : rightInPoint,
				top : p5_footer_top
			});
		// easeOut footer
		var p5_footer_move_to_left = p5_side_left + p5_side_instance.width + 10 * globalRatio;
		setTimeout(function () {
			fcanvas.add(p5_footer_instance);
			animateEase(p5_footer_instance, p5_footer_move_to_left, 'left', fabric.util.ease.easeOutCubic);
		}, p5_renderingTime + 100);		
		// fadeOut pyramid and remove 		
		var p5_fadeOutTime = p5_startTime + 20000;
		setTimeout(animateFadeOutAndRemove(p5_pyramid_instance, oInterval, frameFreshTime), p5_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p5_side_instance, oInterval, frameFreshTime), p5_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p5_body_instance, oInterval, frameFreshTime), p5_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p5_footer_instance, oInterval, frameFreshTime), p5_fadeOutTime);
		
		/**************** end p5 ****************/
		/****************************************/
		/*************** start p6 ***************/		
		// explode 
		var p6_explodeTime = p5_fadeOutTime + 100;		
		// remove balls explode and move to pyramid
		setTimeout(removeAllBalls, p6_explodeTime - 2500);
		setTimeout(addBalls(totalNum, 
					p5_pyramid_instance.top - 20 * globalRatio, 
					p5_pyramid_instance.top + p5_pyramid_instance.height + 20 * globalRatio), 
			p6_explodeTime - 2000);
		// opacity
		setTimeout(animateAllBallOpacity("P07_STARTED"), p5_fadeOutTime);
		// scale 
		setTimeout(animateAllBallScale("P07_STARTED"), p5_fadeOutTime);
		/**************** end p6 ****************/
		/****************************************/
		/*************** start p7 ***************/
		// remove all
		var p7_startTime = p6_explodeTime + 5000;
		// setTimeout(removeAllBalls, p7_startTime);
		
		var p7_header_el = getId('p7-header');
		var p7_header_left = (fcanvas.width - p7_header_el.width) / 2;
		var p7_header_top =  p1_header_top;
		var p7_header_instance = new fabric.Image(p7_header_el, {
			opacity : 0,
			left : p7_header_left,
			top : p7_header_top
		});		
		fcanvas.add(p7_header_instance);		
		// fadeIn header
		setTimeout(animateFadeInAndDisplay(p7_header_instance, oInterval, frameFreshTime), p7_startTime + 10000);
		// add greatwall		
		var p7_greatwall_el = getId("p7-greatwall");
		
		var p7_greatwall_left = (fcanvas.width - p7_greatwall_el.width)/2; // 40 * globalRatio;
		var p7_greatwall_top = p7_header_left + p7_header_el.height + 80 * globalRatio;
		
		var greatwallL = Area.createNew();
		var plw = 80 * globalRatio;
		var plx = p7_greatwall_left + p7_greatwall_el.width * 0.2; 
		var ply = p7_greatwall_top + p7_greatwall_el.height * 0.5; // TBD
		greatwallL.init(plx, ply, plw/2);		
		
		var greatwallC = Area.createNew();
		var pcw = 80 * globalRatio;
		var pcx = p7_greatwall_left + p7_greatwall_el.width * 0.5; 
		var pcy = p7_greatwall_top + p7_greatwall_el.height * 0.5; // TBD
		greatwallC.init(pcx, pcy, pcw/2);
		
		var greatwallR = Area.createNew();
		var prw = 80 * globalRatio;
		var prx = p7_greatwall_left + p7_greatwall_el.width - p7_greatwall_el.width * 0.2;
		var pry = p7_greatwall_top + p7_greatwall_el.height * 0.5; // TBD
		greatwallR.init(prx, pry, prw/2);
			
		var p7_greatwall_instance = new fabric.Image(p7_greatwall_el, {
				opacity : 0,
				left : p7_greatwall_left,
				top : p7_greatwall_top
			});
		fcanvas.add(p7_greatwall_instance);
		// fadeIn greatwall and move balls to great wall
		setTimeout(function p7_started() {
			explode = false;
			Steps.P07_STARTED = true;
			allBalls.forEach(function (b) {
				b.targetPoint = undefined;
			}); // reset for future new target
			// force = force * 2; // reset force 
		}, p7_startTime - 100);		
		setTimeout(animateFadeInAndDisplay(p7_greatwall_instance, oInterval, frameFreshTime), p7_startTime + 6000);
		// move the ball and fade out
		setTimeout(moveBallScaleAndFadeOut(greatwallL, greatwallC, greatwallR), p7_startTime);
		// add header2  
		var p7_header2_el = getId("p7-header2");
		var p7_header2_instance = new fabric.Image(p7_header2_el, {
			left : rightInPoint,
			top : p7_header_top + p7_header_instance.height + 20 * globalRatio
		});
		// easeOut header2
		var p7_header2_move_to_left = p7_header_left + p7_header_el.width - p7_header2_el.width - 10 * globalRatio;
		setTimeout(function () {			
			fcanvas.add(p7_header2_instance);
			animateEase(p7_header2_instance, p7_header2_move_to_left, 'left', fabric.util.ease.easeOutCubic);
		}, p7_startTime + 10000 + 100);
		// add footer  
		var p7_footer_el = getId("p7-footer");
		var p7_footer_top = p7_greatwall_top + p7_greatwall_el.height + 20 * globalRatio;
		var p7_footer_instance = new fabric.Image(p7_footer_el, {
			left : rightInPoint,
			top : p7_footer_top
		});
		// easeOut footer
		var p7_footer_move_to_left = p7_header_left + p7_header_el.width - p7_footer_el.width;
		setTimeout(function () {			
			fcanvas.add(p7_footer_instance);
			animateEase(p7_footer_instance, p7_footer_move_to_left, 'left', fabric.util.ease.easeOutCubic);			
		}, p7_startTime + 10000 + 100);
		var p7_fadeOutTime = p7_startTime + 20000;
		// fadeOut greatwall and remove 		
		
		setTimeout(animateFadeOutAndRemove(p7_greatwall_instance, oInterval, frameFreshTime), p7_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p7_header_instance, oInterval, frameFreshTime), p7_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p7_header2_instance, oInterval, frameFreshTime), p7_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p7_footer_instance, oInterval, frameFreshTime), p7_fadeOutTime);
		/**************** end p7 ****************/
		/****************************************/
		/*************** start p8 ***************/
		// explode 
		var p8_explodeTime = p7_fadeOutTime + 100;
		// remove balls explode and move to pyramid
		setTimeout(removeAllBalls, p8_explodeTime - 2500);
		setTimeout(addBalls(totalNum, 
					p7_greatwall_instance.top - 20 * globalRatio, 
					p7_greatwall_instance.top + p7_greatwall_instance.height + 20 * globalRatio), 
			p8_explodeTime - 2000);
		// opacity
		setTimeout(animateAllBallOpacity("P09_STARTED"), p7_fadeOutTime);
		// scale 
		setTimeout(animateAllBallScale("P09_STARTED"), p7_fadeOutTime);
		/**************** end p8 ****************/
		/****************************************/
		/*************** start p9 ***************/
		// remove all
		var p9_startTime = p8_explodeTime + 5000;
		// setTimeout(removeAllBalls, p9_startTime);
		var p9_header_el = getId('p9-header');
		var p9_header_top =  p1_header_top + 20;
		var p9_header_instance = new fabric.Image(p9_header_el, {
			left : leftInPoint,
			top : p9_header_top
		});		
		// easeOut header
		var p9_header_move_to_right = 40 * globalRatio;;
		setTimeout(function () {			
			fcanvas.add(p9_header_instance);
			animateEase(p9_header_instance, p9_header_move_to_right, 'left', fabric.util.ease.easeOutCubic);
		}, p9_startTime + 10000 + 100);
		
		// add operahouse		
		var p9_operahouse_el = getId("p9-soh");
		
		var p9_operahouse_left = (fcanvas.width - p9_operahouse_el.width)/2; // 40 * globalRatio;
		var p9_operahouse_top = p9_header_top + p9_header_el.height + 40 * globalRatio;
		
		var operahouseL = Area.createNew();
		var hlw = 80 * globalRatio;
		var hlx = p9_operahouse_left + p9_operahouse_el.width * 0.2; 
		var hly = p9_operahouse_top + p9_operahouse_el.height * 0.5; // TBD
		operahouseL.init(hlx, hly, hlw/2);		
		
		var operahouseC = Area.createNew();
		var hcw = 80 * globalRatio;
		var hcx = p9_operahouse_left + p9_operahouse_el.width * 0.5; 
		var hcy = p9_operahouse_top + p9_operahouse_el.height * 0.5; // TBD
		operahouseC.init(hcx, hcy, hcw/2);
		
		var operahouseR = Area.createNew();
		var hrw = 80 * globalRatio;
		var hrx = p9_operahouse_left + p9_operahouse_el.width - p9_operahouse_el.width * 0.2;
		var hry = p9_operahouse_top + p9_operahouse_el.height * 0.5; // TBD
		operahouseR.init(hrx, hry, hrw/2);
			
		var p9_operahouse_instance = new fabric.Image(p9_operahouse_el, {
				opacity : 0,
				left : p9_operahouse_left,
				top : p9_operahouse_top
			});
		fcanvas.add(p9_operahouse_instance);
		// fadeIn greatwall and move balls to great wall
		setTimeout(function p9_started() {
			explode = false;
			Steps.P09_STARTED = true;
			allBalls.forEach(function (b) {
				b.targetPoint = undefined;
			}); // reset for future new target
			// force = force * 4; // reset force 
		}, p9_startTime - 100);		
		setTimeout(animateFadeInAndDisplay(p9_operahouse_instance, oInterval, frameFreshTime), p9_startTime + 6000);
		setTimeout(moveBallScaleAndFadeOut(operahouseL, operahouseC, operahouseR), p9_startTime);
				
		// add footer  
		var p9_footer_el = getId("p9-footer");
		var p9_footer_left = (fcanvas.width - p9_footer_el.width)/2;
		var p9_footer_top = p9_operahouse_top + p9_operahouse_el.height + 20 * globalRatio;
		var p9_footer_instance = new fabric.Image(p9_footer_el, {
			opacity : 0,
			left : p9_footer_left,
			top : p9_footer_top
		});
		fcanvas.add(p9_footer_instance);	
		// fadeIn footer
		setTimeout(animateFadeInAndDisplay(p9_footer_instance, oInterval, frameFreshTime), p9_startTime + 10000);
		
		// add footer2  
		var p9_footer2_el = getId("p9-footer2");
		var p9_footer2_top = p9_footer_top + p9_footer_el.height + 20 * globalRatio;
		var p9_footer2_instance = new fabric.Image(p9_footer2_el, {
			left : leftInPoint,
			top : p9_footer2_top
		});
		// easeOut footer2
		var p9_footer2_move_to_right = p9_footer_left;
		setTimeout(function () {			
			fcanvas.add(p9_footer2_instance);
			animateEase(p9_footer2_instance, p9_footer2_move_to_right, 'left', fabric.util.ease.easeOutCubic);
		}, p9_startTime + 10000 + 100);
		var p9_fadeOutTime = p9_startTime + 20000;
		// fadeOut greatwall and remove 	
		setTimeout(animateFadeOutAndRemove(p9_operahouse_instance, oInterval, frameFreshTime), p9_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p9_header_instance, oInterval, frameFreshTime), p9_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p9_footer_instance, oInterval, frameFreshTime), p9_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p9_footer2_instance, oInterval, frameFreshTime), p9_fadeOutTime);
		/**************** end p9 ****************/
		/****************************************/
		/*************** start p10 **************/
		var p10_explodeTime = p9_fadeOutTime + 100;
		setTimeout(removeAllBalls, p10_explodeTime - 2500);
		setTimeout(addBalls(totalNum, 
					p9_operahouse_instance.top - 20 * globalRatio, 
					p9_operahouse_instance.top + p9_operahouse_instance.height + 20 * globalRatio), 
			p10_explodeTime - 2000);
		// opacity
		setTimeout(animateAllBallOpacity("P11_STARTED"), p9_fadeOutTime);
		// scale 
		setTimeout(animateAllBallScale("P11_STARTED"), p9_fadeOutTime);
		/**************** end p10 ***************/
		/****************************************/
		/*************** start p11 **************/
		// remove all
		var p11_startTime = p10_explodeTime + 5000;
		// setTimeout(removeAllBalls, p9_startTime);
		setTimeout(function p11_started() {
			explode = false;
			Steps.P11_STARTED = true;
			allBalls.forEach(function (b) {
				b.targetPoint = undefined;
			}); // reset for future new target			
		}, p11_startTime - 100);		
		// add side   
		var p11_side_el = getId("p11-side");
		var p11_side_left = fcanvas.width - p11_side_el.width - 40 * globalRatio;
		var p11_side_top = p1_header_top;
		var p11_side_instance = new fabric.Image(p11_side_el, {
			opacity : 0,
			left : p11_side_left,
			top : p11_side_top
		});
		fcanvas.add(p11_side_instance);	
		// fadeIn footer
		setTimeout(animateFadeInAndDisplay(p11_side_instance, oInterval, frameFreshTime), p11_startTime + 10000);
		
		var p11_header_el = getId('p11-header');
		var p11_header_top =  p11_side_top + 80 * globalRatio;
		var p11_header_instance = new fabric.Image(p11_header_el, {
			left : leftInPoint,
			top : p11_header_top
		});			
		// easeOut header
		var p11_header_move_to_right = p11_side_left - p11_header_el.width - 20 * globalRatio;
		setTimeout(function () {			
			fcanvas.add(p11_header_instance);
			animateEase(p11_header_instance, p11_header_move_to_right, 'left', fabric.util.ease.easeOutCubic);
		}, p11_startTime + 10000 + 100);
		
		// add pearltower		
		var p11_pearltower_el = getId("p11-opt");
		
		var p11_pearltower_left = 0; 
		var p11_pearltower_top = p11_header_top + p11_header_el.height + 40 * globalRatio;
		
		var pearltowerL = Area.createNew();
		var olw = 80 * globalRatio;
		var olx = p11_pearltower_left + p11_pearltower_el.width * 0.2; 
		var oly = p11_pearltower_top + p11_pearltower_el.height * 0.9; // TBD
		pearltowerL.init(olx, oly, olw/2);		
		
		var pearltowerC = Area.createNew();
		var ocw = 80 * globalRatio;
		var ocx = p11_pearltower_left + p11_pearltower_el.width * 0.5; 
		var ocy = p11_pearltower_top + p11_pearltower_el.height * 0.5; // TBD
		pearltowerC.init(ocx, ocy, ocw/2);
		
		var pearltowerR = Area.createNew();
		var orw = 80 * globalRatio;
		var orx = p11_pearltower_left + p11_pearltower_el.width - p11_pearltower_el.width * 0.2;
		var ory = p11_pearltower_top + p11_pearltower_el.height * 0.9; // TBD
		pearltowerR.init(orx, ory, orw/2);
			
		var p11_pearltower_instance = new fabric.Image(p11_pearltower_el, {
				opacity : 0,
				left : p11_pearltower_left,
				top : p11_pearltower_top
			});
		fcanvas.add(p11_pearltower_instance); 	
		setTimeout(animateFadeInAndDisplay(p11_pearltower_instance, oInterval, frameFreshTime), p11_startTime + 8000);
		setTimeout(moveBallScaleAndFadeOut(pearltowerL, pearltowerC, pearltowerR), p11_startTime);
					
		// add header2  
		var p11_header2_el = getId("p11-header2");
		var p11_header2_top = p11_header_top - p11_header2_el.height - 20 * globalRatio;
		var p11_header2_instance = new fabric.Image(p11_header2_el, {
			left : leftInPoint,
			top : p11_header2_top
		});
		// easeOut header2
		var p11_header2_move_to_right = p11_side_left - p11_header2_el.width - 20 * globalRatio;
		setTimeout(function () {			
			fcanvas.add(p11_header2_instance);
			animateEase(p11_header2_instance, p11_header2_move_to_right, 'left', fabric.util.ease.easeOutCubic);
		}, p11_startTime + 10000 + 100);
		var p11_fadeOutTime = p11_startTime + 20000;
		// fadeOut pearl tower and remove 		
		setTimeout(animateFadeOutAndRemove(p11_pearltower_instance, oInterval, frameFreshTime), p11_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p11_header_instance, oInterval, frameFreshTime), p11_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p11_side_instance, oInterval, frameFreshTime), p11_fadeOutTime);
		setTimeout(animateFadeOutAndRemove(p11_header2_instance, oInterval, frameFreshTime), p11_fadeOutTime);
		
		/**************** end p11 ***************/
		/****************************************/
		/*************** start p12 **************/
		var p12_startTime = p11_fadeOutTime - 2000;
		setTimeout(function p12_started() {
			explode = false;
			Steps.P12_STARTED = true;
			allBalls.forEach(function (b) {
				b.targetPoint = undefined;
			}); 		
		}, p12_startTime);	
		
		var p12_bg_el = getId('p12-bg');
		var p12_bg_instance = new fabric.Image(p12_bg_el, {
			opacity : 0,
			left : (fcanvas.width - p12_bg_el.width)/2,
			top : 0
		});			
		fcanvas.add(p12_bg_instance);
		setTimeout(animateFadeInAndDisplay(p12_bg_instance, oInterval, frameFreshTime), p12_startTime);
		
		// fadeOutAndRemove allBalls
		setTimeout(function animate() {
			allBalls.forEach(function (b) {
				fcanvas.remove(b);	
				
			}); 
			fcanvas.renderAll();
		}, p12_startTime + 1000);
		/**************** end p12 ***************/
		
		function getId(id) {
			return document.getElementById(id);
		};	
		
		function animateEase(textInstance, moveTo, direction, easingType) {
			textInstance.animate(direction, moveTo, {
				onChange : fcanvas.renderAll.bind(fcanvas),
				duration : easeDuration,
				easing : easingType
			});
		};
		
		function animateFadeOutAndRemove(instance, oInterval, frameFreshInterval) {
			return function animate() {
				if (instance.opacity <= slideElFadeOutThreshold) {
					fcanvas.remove(instance);	
					return;
				}
				instance.opacity = instance.opacity - oInterval;
				fcanvas.renderAll();
				setTimeout(animate, frameFreshInterval);
			};
		};
		
		function animateFadeInAndDisplay(instance, oInterval, frameFreshInterval) {
			return function animate() {
				if (instance.opacity >= slideElFadeInThreshold) {
					instance.setOpacity(1);	
					return;
				}
				instance.opacity = instance.opacity + oInterval;
				fcanvas.renderAll();
				setTimeout(animate, frameFreshInterval);
			};
		};
		
		function removeAllBalls() {
			explode = true;
			allBalls.forEach(function (b) {
					fcanvas.remove(b);
			});
			redBalls = new Array(0);
			yellowBalls = new Array(0);
			blackBalls = new Array(0);
			grayBalls = new Array(0);
			greenLightBalls = new Array(0);
			greenBalls = new Array(0);
			blueBalls = new Array(0);
			allBalls = new Array(0);
			fcanvas.renderAll();
		};
		
		function addBalls(limit, topFrameFrom, topFrameTo) {
			return function() {
				// console.log("topFrameFrom: " + topFrameFrom);
				// console.log("topFrameTo: " + topFrameTo);
				while (allBalls.length != limit) {
					addBallRandomly(0, topFrameFrom, topFrameTo); // opacity
				}
			}
		};
		
		function addBallRandomly(opacity, topFrameFrom, topFrameTo) {
			var slot = utils.random.getRandomInt(0, 6);
			switch (slot) {
					case 0:
						tryToAddBall(fcanvas, redBalls, redNum, allBalls, BallColorType.RED, '', opacity, topFrameFrom, topFrameTo);
						break;
					case 1:
						tryToAddBall(fcanvas, yellowBalls, yellowNum, allBalls, BallColorType.YELLOW, '', opacity, topFrameFrom, topFrameTo);
						break;
					case 2:
						tryToAddBall(fcanvas, blackBalls, blackNum, allBalls, BallColorType.BLACK, '', opacity, topFrameFrom, topFrameTo);
						break;
					case 3:
						tryToAddBall(fcanvas, grayBalls, grayNum, allBalls, BallColorType.GRAY, '', opacity, topFrameFrom, topFrameTo);
						break;
					case 4:
						tryToAddBall(fcanvas, greenLightBalls, greenLightNum, allBalls, BallColorType.GREEN, BallStyle.LIGHT, opacity, topFrameFrom, topFrameTo);
						break;
					case 5:
						tryToAddBall(fcanvas, greenBalls, greenNum, allBalls, BallColorType.GREEN, '', opacity, topFrameFrom, topFrameTo);
						break;
					case 6:
						tryToAddBall(fcanvas, blueBalls, blueNum, allBalls, BallColorType.BLUE, '', opacity);
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
				b.animInterval += 0.00005;
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
		
		function animateAllBallOpacity(step) {
			return function animate() {
				var stop = undefined;
				if (stop === undefined) {
					Object.keys(Steps).forEach(function (name) {
						if (name == step) {
							stop = Steps[name];
						}
					});
				}
				if (stop) {
					// console.log(step + ": Stop ball scale animation");
					return;
				}
				allBalls.forEach(function (b) {
					if (b.opacity < b.animOpactity) {
						b.setOpacity(b.getOpacity() + 0.01);
					} else {
						b.setOpacity(b.animOpactity);					
					}
				});
				fcanvas.renderAll();
				setTimeout(animate, 20);
			}
		};
		function animateAllBallScale(step) {
			return function animate(){
				var stop = undefined;
				if (stop === undefined) {
					Object.keys(Steps).forEach(function(name) {
						if (name == step) {
							stop =  Steps[name];
						}
					}); 
				}
				if (stop) {
					// console.log(step + ": Stop ball scale animation");
					return;
				}
				allBalls.forEach(function (b) {				
					animateBallScale(b);
				});
				fcanvas.renderAll();
				setTimeout(animate, 50);
			};
		};
		function moveBallScaleAndFadeOut(areaL, areC, areR) {
			return function animate() {
				if (explode) {
					return;
				}
				if (allBalls.length == totalNum) {
					allBalls.forEach(function (b) {
						if (b.targetPoint === undefined) {
							  b.targetPoint = randomizeBallTarget(allBalls.indexOf(b) % 3,
								areaL, areC, areR); 
						}
						animateBallScaleAndMoveToTargetArea(b, b.targetPoint);
					});
					fcanvas.renderAll();
				}
				setTimeout(animate, 100);
			};
		};
		
		function animateBallScaleAndMoveToTargetArea(b, target) {
			// shrink
			animateBallScale(b, 0.2);
			// move to 
			animateBallMoveWithForce(b, target);
		};
		
		function animateBallScaleAndExplode(b, target) {
			// explode
			animateBallScale(b, 1.5);
			// fadeIn 
			animateBallFadeIn(b);
			// move to 
			animateBallMoveWithForce(b, target);
		};
		
		function randomizeBallTarget(index, areaL, areaC, areaR) {
			var targetPoint = null;
			var px = 0;
			var py = 0;
			var area = null;
			switch (index) {
				case 0:
					area = areaL;
					break;
				case 1:
					area = areaC;
					break;
				case 2:
					area = areaR;
					break;
				default:
					var msg = "Out of area scope: " + index;
					console.log(msg);
					throw msg;
			}
			var leftFrameFrom = area.cCoordinateX - area.rectWidth;
			var leftFrameTo = area.cCoordinateX + area.rectWidth;
			var topFrameFrom = area.cCoordinateY - area.rectWidth;
			var topFrameTo = area.cCoordinateY + area.rectWidth;
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
		
		var force = 0.05;		
		var speed = 1; // 1 pixel toward the target
		function animateBallMoveWithForce(b, target) {
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
		
		function tryToAddBall(c, array, limit, globalArray, colorType, style, opacity, topFrameFrom, topFrameTo) {
			if (array.length > limit) {
				return false;
			}
			var theBall = randomBall(colorType, style, opacity, topFrameFrom, topFrameTo);
			array.push(theBall);
			globalArray.push(theBall);
			fcanvas.add(theBall);
			fcanvas.renderAll();
			// console.log("ColorType: " + colorType + " Style: " + style + " Size:"+ array.length);
			return theBall;
		};
				
		function randomBall(colorType, style, opacity, topFrameFrom, topFrameTo) {
			if (topFrameFrom == undefined) {
				topFrameFrom = 75 * globalRatio;
			}
			if (topFrameTo == undefined) {
				topFrameTo = 600 * globalRatio;
			}
			// random access ball size 			
			var ballSizeIndex = utils.random.getRandomInt(0, 2);
			if (fcanvas.width > 320) {
				ballSizeIndex = utils.random.getRandomInt(1, 3);
			}
			var theBall = makeBall(getBallEl(colorType, style,
						BallSize[Object.keys(BallSize)[ballSizeIndex]] /* BallSize.SMALL */
					),
				utils.random.getRandomInt(60 * globalRatio, 600 * globalRatio), // left, 
				utils.random.getRandomInt(topFrameFrom, topFrameTo), // top, 
				opacity, 
				utils.random.getRandomArbitrary(0.4, 0.9), // utils.random.getRandomArbitrary(0.2, 0.8),  // scale, 
				utils.random.getRandomInt(0, 360) // angle
				);
			return theBall;
		};
		
		
		function randomLayoutAllBalls(array, num, colorType, style) {
			for (var i = 0, len = num; i < len; i++) {
				var left = utils.random.getRandomInt(60 * globalRatio, 600 * globalRatio);
				var top = utils.random.getRandomInt(75 * globalRatio, 600 * globalRatio);				
				var scale = utils.random.getRandomArbitrary(0.4, 0.9);
				var angle = utils.random.getRandomInt(0, 360);
				var ballSizeIndex = utils.random.getRandomInt(0, 2);
				if (fcanvas.width > 320) {
					ballSizeIndex = utils.random.getRandomInt(1, 3);
				}
				// var ballSizeIndex = utils.random.getRandomInt(0, 2);
				// random access ball size 
				var theBall = makeBall(getBallEl(colorType, style, BallSize[Object.keys(BallSize)[ballSizeIndex]]/* BallSize.SMALL */), 
					left, top, 1, scale, angle);
				array[i] = theBall;
				fcanvas.add(theBall);
			}
		};
		
		function makeBall(image_el, left, top, opacity, scale, angle) {
			var _instance = new fabric.Image(image_el, {
				opacity : opacity,
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
				animOpactity : utils.random.getRandomArbitrary(0.8, 1.0),
				angle : angle,
				originAngle : angle				
			});
			_instance.set('selectable', false);
//			_instance.setOpacity(utils.random.getRandomArbitrary(0.8, 1.0)); FIXME animate to random opacity
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