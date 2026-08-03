$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){
		var vw;
		$(window).resize(function(){
			vw = $(window).width()/2;
			var screenWidth = $(window).width();
			var totalBalloons = 7;
			var availableWidth = Math.min(screenWidth - 20, totalBalloons * 100);
			var spacing = availableWidth / (totalBalloons - 1);
			var startLeft = vw - (availableWidth / 2);
			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
			$('#b11').animate({top:330, left: startLeft + spacing * 0},500);
			$('#b22').animate({top:330, left: startLeft + spacing * 1},500);
			$('#b33').animate({top:330, left: startLeft + spacing * 2},500);
			$('#b44').animate({top:330, left: startLeft + spacing * 3},500);
			$('#b55').animate({top:330, left: startLeft + spacing * 4},500);
			$('#b66').animate({top:330, left: startLeft + spacing * 5},500);
			$('#b77').animate({top:330, left: startLeft + spacing * 6},500);
		});

	$('#turn_on').click(function(){
		// Light up all bulbs
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');

		// Start music immediately
		var audio = $('.song')[0];
		audio.play();

		// Show Engineer logo + ! centered for 5 seconds
		$(this).fadeOut('slow');
		$('#engineer_logo_wrap').fadeIn('slow');

		setTimeout(function(){
			$('#engineer_logo_wrap').fadeOut('slow', function(){
				// After logo fades, show name, subtitle, cap and continue
				$('#graduate_name, #graduate_subtitle').addClass('visible');
				$('#bulb_yellow').addClass('bulb-glow-yellow-after');
				$('#bulb_red').addClass('bulb-glow-red-after');
				$('#bulb_blue').addClass('bulb-glow-blue-after');
				$('#bulb_green').addClass('bulb-glow-green-after');
				$('#bulb_pink').addClass('bulb-glow-pink-after');
				$('#bulb_orange').addClass('bulb-glow-orange-after');
				$('body').addClass('peach-after');
				setTimeout(function(){
					$('#center_grad_cap_icon').addClass('bannar-come');
				}, 400);
				setTimeout(function(){
					$('#balloons_flying').fadeIn('slow');
				}, 2000);
			});
		}, 5000);
	});

	function loopOne() {
		var randleft = ($(window).width() - 100) * Math.random();
		var randtop = 500*Math.random();
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = ($(window).width() - 100) * Math.random();
		var randtop = 500*Math.random();
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = ($(window).width() - 100) * Math.random();
		var randtop = 500*Math.random();
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var randleft = ($(window).width() - 100) * Math.random();
		var randtop = 500*Math.random();
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var randleft = ($(window).width() - 100) * Math.random();
		var randtop = 500*Math.random();
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var randleft = ($(window).width() - 100) * Math.random();
		var randtop = 500*Math.random();
		$('#b6').animate({left:randleft,bottom:randtop},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var randleft = ($(window).width() - 100) * Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#graduate_subtitle').fadeOut('fast', function(){ $(this).closest('.row').hide(); });
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b3').addClass('balloons-rotate-behaviour-two');
		// $('#b4').addClass('balloons-rotate-behaviour-one');
		// $('#b5').addClass('balloons-rotate-behaviour-one');
		// $('#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b7').addClass('balloons-rotate-behaviour-one');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		 vw = $(window).width()/2;

		// Responsive balloon spacing: fit all 7 balloons within the screen width
		var balloonWidth = 100; // each balloon is 100px wide
		var screenWidth = $(window).width();
		var totalBalloons = 7;
		// Calculate spacing so all balloons fit with a small margin
		var availableWidth = Math.min(screenWidth - 20, totalBalloons * 100);
		var spacing = availableWidth / (totalBalloons - 1);
		var startLeft = vw - (availableWidth / 2);

		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22')
		$('#b3').attr('id','b33')
		$('#b4').attr('id','b44')
		$('#b5').attr('id','b55')
		$('#b6').attr('id','b66')
		$('#b7').attr('id','b77')
		$('#b11').animate({top:330, left: startLeft + spacing * 0},500);
		$('#b22').animate({top:330, left: startLeft + spacing * 1},500);
		$('#b33').animate({top:330, left: startLeft + spacing * 2},500);
		$('#b44').animate({top:330, left: startLeft + spacing * 3},500);
		$('#b55').animate({top:330, left: startLeft + spacing * 4},500);
		$('#b66').animate({top:330, left: startLeft + spacing * 5},500);
		$('#b77').animate({top:330, left: startLeft + spacing * 6},500);
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$('.balloon-spacer').addClass('active');
		$('#graduate_subtitle').closest('.row').hide();
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('#graduate_subtitle').closest('.row').hide();
		$('.message').fadeIn('slow');
		
		var i;

		function msgLoop (i) {
			$("p:nth-child("+i+")").fadeOut('slow').delay(800).promise().done(function(){
			i=i+1;
			$("p:nth-child("+i+")").fadeIn('slow').delay(1000);
			if(i==50){
				$("p:nth-child(49)").fadeOut('slow').promise().done(function () {
					$('.cake').fadeIn('fast');
				});
				
			}
			else{
				msgLoop(i);
			}			

		});
			// body...
		}
		
		msgLoop(0);
		
	});
});




//alert('hello');