
// パネルの描写   ////////////////////////////////////////////
// x : x座標
// y : y座標
function DrawPanel( x, y ){
    ctx.fillRect( offleft + x*cell,
                  offtop + y*cell,
                  cell, cell
    );
}



// 盤の描写      ////////////////////////////////////////////
function DrawBoard(){

    for( var y=0; y<hei; y++ ){
        for( var x=0; x<wid; x++ ){
            switch( board[x+1][y+1] ){
                
                // 不要マス
                case 0:
                    ctx.clearRect( offleft + x*cell,
                                   offtop + y*cell,
                                   cell, cell
                    );
                    break;
                
                // 白マス
                case 1:
                    ctx.fillStyle = "#cbc9c6"
                    DrawPanel( x, y );
                    break;

                // 黒マス
                case 2:
                    ctx.fillStyle = "#4a2e19";
                    DrawPanel( x, y );
                    break;
            }
        }
    }

    // 罫線再描写
    DrawCell();
    DrawBoardInfo();
}



// 罫線の描写    ////////////////////////////////////////////
function DrawCell(){

    // 罫線の色
    ctx.strokeStyle = "#000000";
    
    // 横線描写
    for( var i=0; i<=wid; i++ ){
        var n = i * cell;
        ctx.beginPath();
        ctx.moveTo( offleft, offtop + n );
        ctx.lineTo( canvas.width - offleft, offtop + n );
        ctx.closePath();
        ctx.stroke();
    }

    // 縦線描写
    for( var i=0; i<=hei; i++ ){
        var n = i * cell;
        ctx.beginPath();
        ctx.moveTo( offleft + n, offtop );
        ctx.lineTo( offleft + n, canvas.height - offleft );
        ctx.closePath();
        ctx.stroke();
    }
}


// テキスト設定    ////////////////////////////////////////////
function SetTextOption(){
    ctx.font = "40px''";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
}

// ハイライト    ////////////////////////////////////////////
// x : x座標
// y : y座標
function DrawHighLight( x, y ){

    // テキスト設定
    SetTextOption();
    ctx.fillStyle = "#ff0000";

    // 座標ズレ修正
    x--;
    y--;

    // ハイライトを記録(最小count=1なので-1)
    hilight[count-1][0] = x;
    hilight[count-1][1] = y;

    // 盤情報を描写する
    for( var i=0; i<count; i++ ){
        ctx.fillText( i+1,
                      offleft + hilight[i][0]*cell + cell/2,
                      offtop  + hilight[i][1]*cell + cell/2 )
    }
    
}
