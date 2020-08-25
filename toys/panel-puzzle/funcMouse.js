
// マウスクリック   //////////////////////////////////////////
function ClickCell( event ){
	
    // キャンバス上のマウス座標取得
    var X = event.clientX - canvas.offsetLeft;
	var Y = event.clientY - canvas.offsetTop;

    // x座標取得
	for( var i = 0; i < wid; i++ ){
		if( i * cell + offleft < X && X < (i+1) * cell + offleft ){
            mouseX = i + 1;
        }
	}

    // y座標取得
	for( var i = 0; i < hei; i++ ){
		if( i * cell + offtop < Y && Y < (i+1) * cell + offtop ){
            mouseY = i + 1;
		}
	}

    // パネル反転処理
    // モード取得
    var element = document.getElementById("mode");
    var radioNodeList = element.rdo;
    if( radioNodeList.value == "make" )
        MakePanel();
    else if( radioNodeList.value == "solve" )
        FlipPanel();
    
    // 盤再描写
    DrawBoard();

    // クリック回数カウント
    var buttonNode = element.count;
    buttonNode.value = ++count;

    /*
    ctx.fillStyle = "#ff0000";
    DrawPanel( mouseX, mouseY );
    */
}