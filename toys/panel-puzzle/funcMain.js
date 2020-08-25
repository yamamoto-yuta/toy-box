
// 盤情報作成      //////////////////////////////////////////
function MakePanel(){
    Make( mouseX, mouseY );
    WriteBoard( mouseX, mouseY );
}

// パネル設定処理  ///////////////////////////////////////////
// x : x座標
// y : y座標
function Make( x, y ){
    board[x][y] = ( board[x][y] + 1 ) % 3;
}

// 盤情報反転     ///////////////////////////////////////////
function FlipPanel(){
    for( var my = -1; my<=1; my++ ){
        for( var mx = -1; mx<=1; mx++ ){
            Flip( mouseX + mx, mouseY + my );
        }
    }
}

// 反転処理     ////////////////////////////////////////////
// x : x座標
// y : y座標
function Flip( x, y ){
    switch( board[x][y] ){
        case 1: return board[x][y]++;
        case 2: return board[x][y]--;
    }
}

// 盤情報書き込み  //////////////////////////////////////////
// x : x座標
// y : y座標
function WriteBoard( x, y ){
    copy[x][y] = board[x][y];
}
