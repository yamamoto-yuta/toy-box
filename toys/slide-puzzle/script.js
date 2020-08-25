var canvas = document.getElementById("001");
var ctx = canvas.getContext('2d');

var Cell_num = [];
for( var i=0; i<6; i++ ) Cell_num[i] = [];
var start = 0, fin = 0;
var offLeft = 30, offTop = 30, a = 100;
var count_move = 0;
var count_time = 0, time_start = 0, time_A = 0, time_B = 0;

//#############################################################################
function initialize(){
	var k = 1;
	var shf = 0;
	var iniMove = 0;

	for( var i=1; i<=4; i++ ){
		for( var j=1; j<=4; j++ ){
			Cell_num[j][i] = k;
			k++;
		}
	}
	
	do{
		shf = Math.floor( Math.random() * 1000 );
	}while( shf<100 )

	for( var i=0; i<shf; i++ ){
		do{
			iniMove = Math.floor( Math.random() * 10 );
		}while( 3<iniMove )

		switch( iniMove ){
			case 0:
				mx = -1;
				my = 0;
				move( mx, my );
				break;
			case 1:
				mx = 1;
				my = 0;
				move( mx, my );
				break;
			case 2:
				mx = 0;
				my = -1;
				move( mx, my );
				break;
			case 3:
				mx = 0;
				my = 1;
				move( mx, my );
				break;
		}
	}

	drawCell();
	count_move = 0;
	information();
}
initialize();

//#############################################################################
function drawCell(){

	ctx.fillStyle = "#002000";
	ctx.beginPath();
	ctx.fillRect( 0, 0, canvas.width, canvas.height );
	ctx.closePath();
	ctx.fill();

	ctx.lineWidth = 1;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "40px 'Meiryo UI'";

	for( var i=1; i<=4; i++ ){
		for( var j=1; j<=4; j++ ){
			ctx.beginPath();
			ctx.fillStyle = "#005000";
			if( Cell_num[j][i] != 16 )
				ctx.fillRect( (j-1)*a+offLeft, (i-1)*a+offTop, a, a );
			ctx.strokeStyle = "#ffffff";
			ctx.strokeRect( (j-1)*a+offLeft, (i-1)*a+offTop, a, a );


			ctx.fillStyle = "#ffffff";
			if( Cell_num[j][i] != 16 )
				ctx.fillText( Cell_num[j][i], (j-1)*a+50+offLeft, (i-1)*a+50+offTop);
		}
	}
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.strokeRect( offLeft, offTop,400,400 );
	ctx.closePath();
}

//#############################################################################
function information(){
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 10;
	ctx.textBaseline = "alphabetic";
	
	ctx.beginPath();
	ctx.strokeRect( offLeft+a*4, offTop,180,400 );

	ctx.textAlign = "left";
	ctx.font = "20px 'Meiryo UI'";
	ctx.fillText( "move:", offLeft+a*4+10, offTop+50);
	ctx.textAlign = "right";
	ctx.font = "40px 'Meiryo UI'";
	ctx.fillText( count_move, offLeft+a*4+180-10, offTop+50);

	ctx.beginPath();
	ctx.textAlign = "left";
	ctx.font = "20px 'Meiryo UI'";
	ctx.fillText( "time:", offLeft+a*4+10, offTop+100);
	ctx.textAlign = "right";
	ctx.font = "40px 'Meiryo UI'";
	ctx.fillText( count_time, offLeft+a*4+180-10, offTop+100);

	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

//#############################################################################
document.onkeyup = function (e){
	if( fin == 0 ){
		var keycode = e.keyCode;
		var mx = 0, my = 0;
	
		if( keycode == 37 ){
			mx = -1;
			my = 0;
			move( mx, my );
			startSet();
		}
		if( keycode == 38 ){
			mx = 0;
			my = -1;
			move( mx, my );
			startSet();
		}
		if( keycode == 39 ){
			mx = 1;
			my = 0;
			move( mx, my );
			startSet();
		}
		if( keycode == 40 ){
			mx = 0;
			my = 1;
			move( mx, my );
			startSet();
		}

		drawCell();
		information();
		finish();
	}
}

//#############################################################################
function startSet(){
	if( start == 0 ){
		var date = new Date();
		time_start = date.getTime();
		time_B = time_start;
		start = 1;
	}
}

//#############################################################################
setInterval( function(){
	if( start == 1 && fin == 0 ){
		var date = new Date();
		time_A = date.getTime();
		count_time = Math.floor( ( time_A - time_B ) / 1000 );

		drawCell();
		information();

		ctx.fillStyle = "#ffffff";
		ctx.textBaseline = "alphabetic";
	
		ctx.textAlign = "right";
		ctx.font = "40px 'Meiryo UI'";
		ctx.fillText( count_time, offLeft+a*4+180-10, offTop+100);

		ctx.closePath();
		ctx.fill();
	}
}, 1000/60 );

//#############################################################################
function move( mx, my ){
	var k = 1;

	LabelMove:
	for( var i=1; i<=4; i++ ){
		for( var j=1; j<=4; j++ ){
			if( Cell_num[j+mx][i+my] == 16 ){
				Cell_num[j+mx][i+my] = Cell_num[j][i];
				Cell_num[j][i] = 16;
				count_move++;
				break LabelMove;
			}
			k++;
		}
	}
}

//#############################################################################
function finish(){
	var k = 1;
	var check = 0;
	for( var i=1; i<=4; i++ ){
		for( var j=1; j<=4; j++ ){
			if( Cell_num[j][i] == k ) check++;
			k++;
		}
	}
	if( check == 16 ){
		alert("FINISH!!!");
		fin = 1;
	}
}