$(window).load(function(){

	window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

	var canvas;
	var ctx;
	var WIDTH = $("#art").innerWidth();
	var HEIGHT = $("#art").innerHeight();
	var items =[];
	var trails = [];
	var frame = 0;
	console.log(WIDTH, HEIGHT);

	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function init(){
		canvas = document.getElementById("art");
		ctx = canvas.getContext("2d");

		for (var i = 0; i < 20; i++) {
			var newitem = new item();
			newitem.x = getRandomInt(0,WIDTH);
			newitem.y = getRandomInt(0,HEIGHT);
			newitem.size = getRandomInt(20,40);
			items.push(newitem);
		};	
		draw();
	}

	function item() {
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
		this.size = 30;
		this.emit = getRandomInt(-40,40);

		this.display = function(){
			ctx.fillStyle = '#daebca';
			ctx.translate(this.x,this.y);
			ctx.rotate((Math.PI/180) * this.rotation);
			ctx.beginPath();
			ctx.arc(0,0, this.size, 0, Math.PI*2, true);
			ctx.fill();
			ctx.fillStyle = '#696c6e';
			ctx.fillRect(this.size/2-this.size,this.size/6-this.size/3,this.size,this.size/3);
			ctx.fillRect(this.size/6-this.size/3,this.size/2-this.size,this.size/3,this.size);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}

	function dot(x,y){
		ctx.fillStyle = '#51584c';
		ctx.fillRect(x,y, 1, 2);
	}

	function clear(){
	  ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}

	function draw(){
		requestAnimFrame(draw);
		frame++;
		clear();
		for (var i = trails.length - 1; i >= 0; i--) {
			dot(trails[i].x, trails[i].y);
			trails[i].life += 0.03;
			trails[i].y += trails[i].emit/20 *trails[i].life;
			if ((trails[i].y>HEIGHT)|| (trails[i].y<0)){
				trails.splice(i,1);
			};
		};
		for (var i = items.length - 1; i >= 0; i--) {
			items[i].display();
			items[i].x += (items[i].size^2)*0.1;
			items[i].rotation += 2*(items[i].size/20);
			if (items[i].x-items[i].size > WIDTH){
				items[i].x = 0-items[i].size;
			};
			if (frame%3==0){
				trails.push({ x: items[i].x , y: items[i].y, emit: items[i].emit, life : 0.1 });
			}
		};
		

	}

	init();

});
