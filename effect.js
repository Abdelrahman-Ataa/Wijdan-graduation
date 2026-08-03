'use strict';
/* ================================================================
   effect.js — Wijdan Graduation
   Effects: sakura petals · floating balloons · fireworks · glitter
   Message: full-screen overlay, no scroll, hero slides up
   ================================================================ */

/* ----------------------------------------------------------------
   1. SAKURA PETALS
   ---------------------------------------------------------------- */
function makeSakura(canvasId, count) {
	var canvas = document.getElementById(canvasId);
	if (!canvas) return { stop: function(){} };
	function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
	resize(); window.addEventListener('resize', resize);
	var ctx = canvas.getContext('2d');

	function Petal(scatter) { this.init(scatter); }
	Petal.prototype.init = function(scatter) {
		this.x  = Math.random() * canvas.width;
		this.y  = scatter ? Math.random() * canvas.height : -12;
		this.r  = 3.5 + Math.random() * 5.5;
		this.vy = 0.6 + Math.random() * 1.3;
		this.vx = (Math.random()-0.5) * 1.0;
		this.a  = Math.random() * Math.PI * 2;
		this.sp = (Math.random()-0.5) * 0.05;
		this.sw = 0.2 + Math.random() * 0.8;
		this.sf = 0.008 + Math.random() * 0.016;
		this.so = Math.random() * Math.PI * 2;
		this.op = 0.5 + Math.random() * 0.45;
		this.t  = 0;
	};
	Petal.prototype.update = function() {
		this.t++;
		this.y += this.vy;
		this.x += this.vx + Math.sin(this.t*this.sf+this.so)*this.sw;
		this.a += this.sp;
		if (this.y > canvas.height+20) this.init(false);
	};
	Petal.prototype.draw = function() {
		ctx.save(); ctx.globalAlpha=this.op;
		ctx.translate(this.x, this.y); ctx.rotate(this.a);
		for (var i=0;i<5;i++){
			var ang=(i/5)*Math.PI*2-Math.PI/2;
			ctx.save();
			ctx.translate(Math.cos(ang)*this.r*0.42, Math.sin(ang)*this.r*0.42);
			ctx.rotate(ang); ctx.scale(this.r*0.5, this.r*0.85);
			ctx.beginPath(); ctx.arc(0,0,1,0,Math.PI*2);
			ctx.fillStyle='rgba(196,72,116,0.72)'; ctx.fill();
			ctx.restore();
		}
		ctx.restore();
	};
	var petals=[]; for(var i=0;i<count;i++) petals.push(new Petal(true));
	var rafId;
	function loop(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var j=0;j<petals.length;j++){ petals[j].update(); petals[j].draw(); }
		rafId=requestAnimationFrame(loop);
	}
	loop();
	return { stop:function(){ cancelAnimationFrame(rafId); } };
}

/* ----------------------------------------------------------------
   2. FLOATING BALLOONS  (drawn on canvas, rise from bottom)
   ---------------------------------------------------------------- */
function makeBalloons(canvasId) {
	var canvas = document.getElementById(canvasId);
	if (!canvas) return;
	function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
	resize(); window.addEventListener('resize', resize);
	var ctx = canvas.getContext('2d');

	/* Balloon colours — festive pinks, reds, purples, gold */
	var colors = [
		'#FF85A1','#FF4F7B','#FFB3C6',
		'#C94080','#a03055','#FF69B4',
		'#FFD700','#FFA0C8','#FF6EB4',
		'#E040FB','#F48FB1','#FF80AB'
	];

	function Balloon() { this.reset(true); }
	Balloon.prototype.reset = function(scatter) {
		this.x      = 40 + Math.random() * (canvas.width - 80);
		this.y      = scatter
			? canvas.height + 50 + Math.random() * canvas.height
			: canvas.height + 60 + Math.random() * 80;
		this.ry     = 22 + Math.random() * 20;   /* vertical radius */
		this.rx     = this.ry * 0.78;             /* horizontal radius */
		this.vy     = -(0.35 + Math.random() * 0.55);  /* rise speed */
		this.vx     = (Math.random()-0.5) * 0.4;       /* horizontal drift */
		this.sway   = 0.3 + Math.random() * 0.5;
		this.swayF  = 0.008 + Math.random() * 0.012;
		this.swayO  = Math.random() * Math.PI * 2;
		this.t      = 0;
		this.color  = colors[Math.floor(Math.random()*colors.length)];
		this.alpha  = 0.82 + Math.random() * 0.18;
		this.rotate = (Math.random()-0.5) * 0.25;
		this.rotV   = (Math.random()-0.5) * 0.004;
		/* string length */
		this.strLen = 28 + Math.random() * 16;
	};
	Balloon.prototype.update = function() {
		this.t++;
		this.y  += this.vy;
		this.x  += this.vx + Math.sin(this.t*this.swayF+this.swayO)*this.sway;
		this.rotate += this.rotV;
		if (this.y < -this.ry * 2 - this.strLen) this.reset(false);
	};
	Balloon.prototype.draw = function() {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotate);

		/* string */
		ctx.beginPath();
		ctx.moveTo(0, this.ry);
		ctx.bezierCurveTo(
			6, this.ry + this.strLen*0.4,
			-6, this.ry + this.strLen*0.7,
			0, this.ry + this.strLen
		);
		ctx.strokeStyle = 'rgba(100,40,60,0.5)';
		ctx.lineWidth = 1.2;
		ctx.stroke();

		/* balloon body */
		ctx.beginPath();
		ctx.ellipse(0, 0, this.rx, this.ry, 0, 0, Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();

		/* highlight */
		ctx.beginPath();
		ctx.ellipse(-this.rx*0.28, -this.ry*0.32, this.rx*0.22, this.ry*0.2, -0.5, 0, Math.PI*2);
		ctx.fillStyle = 'rgba(255,255,255,0.38)';
		ctx.fill();

		/* knot */
		ctx.beginPath();
		ctx.arc(0, this.ry+1, 4, 0, Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();

		ctx.restore();
	};

	var balloons = [];
	/* start with 12 balloons already at various heights */
	for (var i=0;i<12;i++) balloons.push(new Balloon());

	/* spawn a new balloon every ~2.5s */
	setInterval(function(){
		if (balloons.length < 18) balloons.push(new Balloon());
	}, 2500);

	var rafId;
	function loop(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var j=0;j<balloons.length;j++){ balloons[j].update(); balloons[j].draw(); }
		rafId=requestAnimationFrame(loop);
	}
	loop();
}

/* ----------------------------------------------------------------
   3. FIREWORKS + GLITTER
   ---------------------------------------------------------------- */
function makeFireworks(canvasId) {
	var canvas = document.getElementById(canvasId);
	if (!canvas) return { burst:function(){} };
	function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
	resize(); window.addEventListener('resize', resize);
	var ctx = canvas.getContext('2d');

	var palettes = [
		['#FF85A1','#FFB3C6','#fff','#FFD700'],
		['#f0d060','#ffe87a','#fff','#FF85A1'],
		['#d4607a','#ff85a1','#ffd6e0','#fff'],
		['#fff','#FFE4EC','#f0d060','#FFB3C6'],
		['#c8940a','#f5dc6a','#fff','#FF69B4']
	];

	var particles = [];

	function Spark(x, y, palette, isGlitter) {
		var angle = Math.random()*Math.PI*2;
		var speed = isGlitter ? (0.5+Math.random()*1.5) : (1.8+Math.random()*5.5);
		this.x  = x; this.y = y;
		this.vx = Math.cos(angle)*speed * (isGlitter ? 0.4 : 1);
		this.vy = Math.sin(angle)*speed - (isGlitter ? 0.5 : 1.8);
		this.alpha  = 1;
		this.decay  = isGlitter ? (0.005+Math.random()*0.008) : (0.01+Math.random()*0.013);
		this.r      = isGlitter ? (1+Math.random()*1.5) : (2.2+Math.random()*2.8);
		this.color  = palette[Math.floor(Math.random()*palette.length)];
		this.gravity= isGlitter ? 0.015 : 0.09;
		this.glow   = !isGlitter && Math.random()<0.4;
	}
	Spark.prototype.update = function(){
		this.vy   += this.gravity;
		this.x    += this.vx; this.y += this.vy;
		this.vx   *= 0.98;
		this.alpha -= this.decay;
	};
	Spark.prototype.draw = function(){
		ctx.save();
		ctx.globalAlpha = Math.max(this.alpha,0);
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fillStyle   = this.color;
		ctx.shadowColor = this.color;
		ctx.shadowBlur  = this.glow ? 10 : 3;
		ctx.fill();
		ctx.restore();
	};

	function burst(x, y) {
		var pal = palettes[Math.floor(Math.random()*palettes.length)];
		var n   = 60 + Math.floor(Math.random()*35);
		for(var i=0;i<n;i++) particles.push(new Spark(x,y,pal,false));
	}

	/* glitter rain — falling sparkles from top */
	function spawnGlitter(){
		var pal=['#FFD700','#fff','#FFB3C6','#f5dc6a','#FF85A1'];
		for(var i=0;i<3;i++){
			var g=new Spark(Math.random()*canvas.width, -5, pal, true);
			g.vx=(Math.random()-0.5)*1.2;
			g.vy=0.5+Math.random()*1.2;
			g.gravity=0.01;
			g.decay=0.004+Math.random()*0.005;
			particles.push(g);
		}
	}
	setInterval(spawnGlitter, 120);

	var rafId;
	function loop(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(var i=particles.length-1;i>=0;i--){
			particles[i].update(); particles[i].draw();
			if(particles[i].alpha<=0) particles.splice(i,1);
		}
		rafId=requestAnimationFrame(loop);
	}
	loop();
	return { burst:burst, stop:function(){ cancelAnimationFrame(rafId); } };
}

/* ----------------------------------------------------------------
   BOOT
   ---------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', function(){

	var startSakura = makeSakura('sakura-start-canvas', 55);

	/* ---- START BUTTON ---- */
	document.getElementById('start-btn').addEventListener('click', function(){
		var screen = document.getElementById('start-screen');
		screen.style.transition = 'opacity 0.85s ease';
		screen.style.opacity    = '0';

		setTimeout(function(){
			screen.parentNode.removeChild(screen);
			startSakura.stop();

			document.getElementById('main-page').style.display = 'block';

			makeSakura('sakura-canvas', 45);
			makeBalloons('balloon-canvas');
			var fw = makeFireworks('fireworks-canvas');

			celebrate(fw);
		}, 900);
	});

	/* ----------------------------------------------------------------
	   CELEBRATION SEQUENCE
	   ---------------------------------------------------------------- */
	function celebrate(fw) {
		document.body.classList.add('celebrate');

		var music = document.getElementById('bg-music');
		if (music) music.play().catch(function(){});

		var W = window.innerWidth, H = window.innerHeight;

		/* initial fireworks burst wave */
		setTimeout(function(){ fw.burst(W*0.15, H*0.35); }, 200);
		setTimeout(function(){ fw.burst(W*0.85, H*0.35); }, 420);
		setTimeout(function(){ fw.burst(W*0.50, H*0.22); }, 650);
		setTimeout(function(){ fw.burst(W*0.25, H*0.48); }, 900);
		setTimeout(function(){ fw.burst(W*0.75, H*0.42); }, 1100);

		/* show name + subtitle */
		setTimeout(function(){
			addClass('graduate-name',     'visible');
			addClass('graduate-subtitle', 'visible');
			['s1','s2','s3','s4'].forEach(function(id){
				var el = document.getElementById(id);
				if(el){ el.style.opacity='1'; el.classList.add('visible'); }
			});
		}, 750);

		/* drop cap */
		setTimeout(function(){ addClass('grad-cap-wrap','drop-in'); }, 1150);

		/* second burst wave */
		setTimeout(function(){
			fw.burst(W*0.20, H*0.28);
			fw.burst(W*0.80, H*0.28);
			fw.burst(W*0.50, H*0.18);
		}, 2000);

		/* periodic auto-bursts every 7s */
		setInterval(function(){
			fw.burst(Math.random()*W, H*(0.1+Math.random()*0.45));
		}, 7000);

		/* show button after 2.5s */
		setTimeout(function(){ showBtn('btn-story'); }, 2500);
	}

	/* ----------------------------------------------------------------
	   MESSAGE  —  full screen, no scroll, hero hidden
	   ---------------------------------------------------------------- */
	var messages = [
		['🌸 today is your day 🌸', 'sweet wijdan'],
		['you have blossomed', 'into something truly beautiful'],
		['✨ you did it 🎓 ✨', ''],
		['every early morning', 'every late night study'],
		['every exam you faced', 'with courage and grace'],
		['has led you', 'to this moment'],
		['today you close', 'one beautiful chapter'],
		['high school is behind you', 'and the whole world is ahead'],
		['you have so much to give', 'so much to become'],
		['we are endlessly proud of you', ''],
		['your strength, your kindness', 'your beautiful spirit'],
		['will take you far', ''],
		['🎀 congratulations 🎀', 'on your high school graduation'],
		['the best is yet to come 🌸', '']
	];

	on('btn-story', 'click', function(){
		hideBtn('btn-story');

		/* hide hero, show message screen */
		var hero = document.getElementById('hero');
		hero.classList.add('hidden');

		var msgScreen = document.getElementById('msg-screen');
		msgScreen.classList.add('active');

		var line1El = document.getElementById('msg-line1');
		var line2El = document.getElementById('msg-line2');
		var idx = 0;

		function showPair(){
			if(idx >= messages.length) return;

			var pair = messages[idx];
			idx++;

			/* clear previous */
			line1El.classList.remove('show'); line2El.classList.remove('show');
			line1El.textContent = ''; line2El.textContent = '';

			/* set text */
			line1El.textContent = pair[0];
			line2El.textContent = pair[1];

			/* force reflow then show */
			line1El.getBoundingClientRect();
			line1El.classList.add('show');

			if(pair[1]){
				setTimeout(function(){
					line2El.getBoundingClientRect();
					line2El.classList.add('show');
				}, 500);
			}

			/* hold then fade out → show next pair */
			var hold = pair[1] ? 3000 : 2400;
			setTimeout(function(){
				line1El.classList.remove('show');
				line2El.classList.remove('show');
				setTimeout(showPair, 700);
			}, hold);
		}

		setTimeout(showPair, 400);
	});

	/* ----------------------------------------------------------------
	   UTILS
	   ---------------------------------------------------------------- */
	function byId(id)          { return document.getElementById(id); }
	function addClass(id,cls)  { var el=byId(id); if(el) el.classList.add(cls); }
	function on(id,ev,fn)      { var el=byId(id); if(el) el.addEventListener(ev,fn); }
	function showBtn(id)       { var el=byId(id); if(el) el.style.display='inline-block'; }
	function hideBtn(id)       { var el=byId(id); if(el) el.style.display='none'; }
});
