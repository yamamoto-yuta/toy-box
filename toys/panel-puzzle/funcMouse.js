
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

    // パネル反転処理 //
    // ラジオボタンからモード取得
    var radioNodeList = element.rdo;

    // カウントボックスのノード取得
    var buttonNode = element.count;

    // チェックボックスのノード取得
    var checkboxNode = element.hilight;

    // makeモード
    if( radioNodeList.value == "make" ){
        MakePanel();
        count = 0;
        buttonNode.value = count;
        checkboxNode.checked = false;
    }
    // solveモード
    else if( radioNodeList.value == "solve" ){
        FlipPanel();
        buttonNode.value = ++count;
    }

    // 盤再描写
    DrawBoard();

    // ハイライト機能
    if( checkboxNode.checked == true )
        DrawHighLight( mouseX, mouseY );

    /*
    ctx.fillStyle = "#ff0000";
    DrawPanel( mouseX, mouseY );
    */
}