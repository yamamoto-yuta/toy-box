var canvas = document.getElementById("id01");
var ctx = canvas.getContext('2d');

var wid = canvas.width;
var hei = canvas.height;

var ply = 5;
var mode = 8;
var rate = 1;
var memo = [];

var hideHei = 30;
var hidePos = 45;

var inc = 0;
var clkCount = 0;

function setMode(myForm){
	if( !inc ){
		ply = Number( myForm.player.value );
		mode = Number( myForm.mode.value );
		rate = Number( myForm.rate.value );
		main();
		inc = 1;
	}
}

//#############################################################################
function main(){
	drawLine();
	drawWeb();
	drawHide();
	canvas.addEventListener("click", removeHide, false );
	canvas.addEventListener("touchend", removeHide, false );
}


//#############################################################################
function drawLine(){
	var tof = 0, count0 = 0, count1 = 0;

	ctx.font = "24px ''";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = "#ffffff";

	for( var i=0; i<ply; i++ ){
		ctx.beginPath();
		ctx.moveTo( (wid/ply)/2 + (wid/ply)*i, 60 );
		ctx.lineTo( (wid/ply)/2 + (wid/ply)*i, hei-60 );
		ctx.fillText( i, (wid/ply)/2 + (wid/ply)*i, hidePos - hideHei/2 );

		switch( mode ){
			case 0:
				tof = Math.round( Math.random() );
				if( tof == 0 ) ctx.fillText("×", (wid/ply)/2 + (wid/ply)*i, hei - hidePos + hideHei/2 );
				if( tof == 1 ) ctx.fillText("○", (wid/ply)/2 + (wid/ply)*i, hei - hidePos + hideHei/2 );
				memo[i] = tof;
				break;

			case 1:
			case 8:
				tof = Math.round( Math.random() );
				if( mode == 8 ){
					rate = 1;
					tof = 1;
				}
				if( count1 == rate ) tof = 0;
				if( count0 == ply-rate ) tof = 1;
				if( tof == 0 ){
					ctx.fillText("×", (wid/ply)/2 + (wid/ply)*i, hei - hidePos + hideHei/2 );
					count0++;
				}
				if( tof == 1 ){
					ctx.fillText("○", (wid/ply)/2 + (wid/ply)*i, hei - hidePos + hideHei/2 );
					count1++;
				}
				memo[i] = tof;
				break;
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
}


//#############################################################################
function drawWeb(){
	var n = 0, ini = 0, crd = 0, den = Math.floor( Math.random()*10 );

	ctx.strokeStyle = "#ffffff";

	do{		
		den = Math.floor( Math.random()*10 );
	}while( den<5 )

	if( mode == 8 ) ini = 1;
	for( n=ini; n<ply-1; n++ ){
		for( var j=0; j<den; j++ ){
			do{		
				crd = Math.floor( Math.random()*100 ) * 10;
			}while( crd<70 || hei-70<crd )
			if( n%2 == 0 ) crd += 5;

			ctx.beginPath();
			ctx.moveTo( (wid/ply)/2 + (wid/ply)*n, crd );
			ctx.lineTo( (wid/ply)/2 + (wid/ply)*(n+1), crd );
			ctx.closePath();
			ctx.stroke();
		}
	}
}


//#############################################################################
function drawHide(){
	ctx.font = "24px ''";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.beginPath();
	ctx.fillStyle = "#ffffff";
	ctx.fillRect( 0, hei - hidePos, wid, hideHei);
	ctx.fillStyle = "#002000";
	ctx.fillText("?", wid/2, hei - hidePos + hideHei/2 );
	ctx.closePath();
	ctx.fill();
}


//#############################################################################
function DocumentGetScrollPosition( document_obj ){
	return{
		y:document_obj.body.scrollTop || document_obj.documentElement.scrollTop
	};
}

//#############################################################################
function removeHide( event ){
	var musY = 0;
	var scrollPos = DocumentGetScrollPosition( document );

	musY = event.clientY - canvas.offsetTop + scrollPos.y;

	if( hei - hidePos < musY && musY < hei - hidePos + hideHei ){
		if( clkCount % 2 == 0 ){
			ctx.beginPath();
			ctx.fillStyle = "#002000";
			ctx.fillRect( 0, hei - hidePos, wid, hideHei+1);
			ctx.closePath();
			ctx.fill();

			ctx.fillStyle = "#ffffff";
			ctx.beginPath();
			for( var i=0; i<ply; i++ ){
				if( memo[i] == 0 ) ctx.fillText("×", (wid/ply)/2 + (wid/ply)*i, hei - hidePos + hideHei/2 );
				if( memo[i] == 1 ) ctx.fillText("○", (wid/ply)/2 + (wid/ply)*i, hei - hidePos + hideHei/2 );
			}
			ctx.closePath();
			ctx.fill();
		}
		else drawHide();

		clkCount++;
	}

}
