var pen = null;//声明一个全局变量
var offset = null;
var flag = 1;//1执白，2执黑
var status = "run";//run表示下棋
var data = [];//全局变量，所以要先定义
//游戏开始
function gameInit(id,_flag){
	var html = '<canvas id="five" width="935px" height="600px"></canvas>';//935
	if(id){
		$("#" + id).append(html);
	}else{
		$("body").append(html);
	}
	
	pen = $("#five").get(0).getContext("2d");
	
	//划横线
	for (var i = 0;i < 30;i++) {
		pen.beginPath();
		pen.strokeStyle = "#f0dda6";
		if(i == 1 || i ==10){
			pen.lineWidth = 4;
			pen.strokeStyle = "#eb6427";
		}else{
			pen.lineWidth = 1;
		}
//		pen.moveTo(0,i * 40);
//		pen.lineTo(600,i * 40);
		pen.moveTo(0,i * 55);
		pen.lineTo(935,i * 55);
		pen.stroke();
		pen.closePath();
	}
	
	//画竖线
	for (var j = 0;j < 30;j++) {
		pen.beginPath();
		pen.strokeStyle = "#f0dda6";
		//if(j == 3 || j ==12)
		if(j == 1 || j ==16){
			pen.lineWidth = 4;
			pen.strokeStyle = "#1a0223";
		}else{
			pen.lineWidth = 1;
		}
		pen.moveTo(j * 55,0);
		pen.lineTo(j * 55,935);
		//pen.moveTo(j * 40,0);
		//pen.lineTo(j * 40,600);
		pen.stroke();
		pen.closePath();
	}
	
	//初始化数组
	for(var i = 0;i < 30 ; i++){
		var temp = [];
		for(var j = 0; j < 30; j++){
			temp.push(-1);
		}
		data.push(temp);
	}
	offset = $("#five").offset();
	if( _flag == 1){
		flag = 1;
		status = "run";
		showChat({
			uname : "系统提示",
			msg : "系统分配，先手执白"
		},true);
	}else{
		flag = 2;
		status = "wait";
		showChat({
			uname : "系统提示",
			msg : "系统分配，后手执黑"
		},true);
	}
	
	
	$("#five").mousedown(function(event){
		//等待状态
		if(status == "wait"){
			return;
		}
		var x = event.clientX - offset.left;
		var y = event.clientY - offset.top;
		
		var row = Math.floor(y/55);//行
		var col = Math.floor(x/55);//列
		//var row = Math.floor(y/40);//行
		//var col = Math.floor(x/40);//列
		
		//画圆
		//如果已存在，则不画
		if(data[row][col] != -1){
			return;
		}
		data[row][col] = flag;
		pen.beginPath();
		if(flag == 1){
			pen.fillStyle = "#FFFFFF";
		}else{
			pen.fillStyle = "#000000";
		}
		//pen.arc(col * 40 + 20,row * 40 + 20,15,0,2*Math.PI);
		pen.arc(col * 55 + 27,row * 55 + 27,25,0,2*Math.PI);
		//pen.fillStyle = "darkgoldenrod";
		pen.fill();
		pen.closePath();
		
		//交换信息
		socket.emit("game.changedata",{
			row : row,
			col : col,
			flag : flag
		});
		status = "wait";
		if(gameOver(row,col,flag)){
			socket.emit("game.over");
		}
//		flag = flag == 1 ? 2 : 1;
	});
}

function drawFive(row,col,flag){
	data[row][col] = flag;
	pen.beginPath();
	if( flag == 1){
		pen.fillStyle = "#FFFFFF";
	}else{
		pen.fillStyle = "#000000"
	}
	//pen.arc(col * 40 + 20,row * 40 + 20,15,0,2*Math.PI);
	pen.arc(col * 55 + 27,row * 55 + 27,25,0,2*Math.PI);
	pen.fill();
	pen.closePath();
}

function gameOver(row,col,flag){
	//上下找
	var count = 1;
	for( var i = row - 1; i >= 0; i-- ){
		if( data[i][col] == flag){
			count ++;
		}else{
			break;
		}
	}
	for( var i = row + 1; i < 30; i++ ){
		if( data[i][col] == flag){
			count ++;
		}else{
			break;
		}
	}
	if( count >= 5){
		return true;
	}
	
	//左右找 
    var count = 1;
	for( var i = col - 1; i >= 0; i-- ){
		if( data[row][i] == flag){
			count ++;
		}else{
			break;
		}
	}
	for( var i = col + 1; i < 30; i++ ){
		if( data[row][i] == flag){
			count ++;
		}else{
			break;
		}
	}
	if( count >= 5){
		return true;
	}
	
	//左上右下
	var count = 1;
	for( var i =row - 1,j = col - 1; i >= 0 && j >= 0; i--, j--){
		if(data[i][j] == flag){
			count ++;
		}else{
			break;
		}
	}
	for( var i =row + 1,j = col + 1; i < 30 && j < 30; i++, j++){
		if(data[i][j] == flag){
			count ++;
		}else{
			break;
		}
	}
	if( count >= 5){
		return true;
	}
	
	//右上左下
	var count = 1;
	for( var i =row - 1,j = col + 1; i >= 0 && j < 30; i--, j++){
		if(data[i][j] == flag){
			count ++;
		}else{
			break;
		}
	}
	for( var i =row + 1,j = col - 1; i < 30 && j >= 0; i++, j--){
		if(data[i][j] == flag){
			count ++;
		}else{
			break;
		}
	}
	if( count >= 5){
		return true;
	}
		return false;
}


