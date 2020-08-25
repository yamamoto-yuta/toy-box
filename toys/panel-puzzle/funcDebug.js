// 盤上票の描写   ////////////////////////////////////////////
function DrawBoardInfo(){

    // デバッグモードONの時
    if( DEBUG == 0 ){
        // 何もしない
        return;
    }

    // テキストの情報を設定
    ctx.font = "40px''";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ff0000";

    // 盤情報を描写する
    for( var y=0; y<hei; y++ ){
        for( var x=0; x<wid; x++ ){
            ctx.fillText( board[x+1][y+1],
                          offleft + x*cell + cell/2,
                          offtop  + y*cell + cell/2 )
        }
    }
}