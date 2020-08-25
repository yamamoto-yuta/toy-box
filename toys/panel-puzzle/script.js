
// キャンバス情報
var canvas = document.getElementById("cav01");
var ctx = canvas.getContext('2d');

// フォーム情報取得
var element = document.getElementById("mode");

// 盤定数
var wid = 6;
var offset = 0.05;      // 割合（0～1）

var offleft = canvas.width/2 * offset;
var hei = wid;
var offtop = offleft;
var cell = ( canvas.width - offleft*2 ) / wid;

// マウス変数
var mouseX;
var mouseY;
var count = 0;

// 盤初期状態
// 0 = 不要
// 1 = 白
// 2 = 黒
// 9 = 盤外
var board = [
    [ 9, 9, 9, 9, 9, 9, 9 ],
    [ 9, 0, 0, 0, 0, 0, 9 ],
    [ 9, 0, 2, 2, 2, 1, 9 ],
    [ 9, 0, 2, 1, 1, 1, 9 ],
    [ 9, 0, 2, 1, 1, 1, 9 ],
    [ 9, 0, 1, 1, 1, 1, 9 ],
    [ 9, 0, 0, 0, 0, 0, 9 ],
    [ 9, 9, 9, 9, 9, 9, 9 ],
];

// デバッグモード
var DEBUG = 0;

// 盤初期状態のコピー
var copy = [];
for( var x=0; x<wid+2; x++ ){
    copy[x] = [];
    for( var y=0; y<hei+2; y++ )
        copy[x][y] = board[x][y];
}

// マウスクリックイベント
canvas.addEventListener("click", ClickCell, false );

// 初期化関数
Initialize();
function Initialize(){

    // 盤情報初期化
    for( var x=0; x<wid+2; x++ )
        for( var y=0; y<hei+2; y++ )
            board[x][y] = copy[x][y];

    // 各種再描写
    DrawBoard();
    DrawCell();
    DrawBoardInfo();

    // クリック回数初期化
    count = 0;
}




