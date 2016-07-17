var pen = null;//声明一个全局变量
var offset = null;
var flag = 1;//1执白，2执黑
var data = [];//1表示白子，2表示黑子

//游戏开始
function gameInit(id){
	var html = '<canvas id="five" width="935px" height="600px"></canvas>';
	if(id){
		$("#" + id).append(html);
	}else{
		$("body").append(html);
	}
	
	pen = $("#five").get(0).getContext("2d");
	
	//划横线
	
	for (var i = 0;i < 30;i++) {
		pen.beginPath();
		if(i == 1 || i ==10){
			pen.lineWidth = 4;
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
		//if(j == 3 || j ==12)
		if(j == 1 || j ==16){
			pen.lineWidth = 4;
		}else{
			pen.lineWidth = 1;
		}
		pen.moveTo(j * 55,0);
		pen.lineTo(j * 55,935);
//		pen.moveTo(j * 40,0);
//		pen.lineTo(j * 40,600);
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
		if(data[row][col] = -1){
		   data[row][col] = flag;
		   pen.beginPath();
		if(flag == 1){
			pen.fillStyle = "#FFFFFF";
		}else{
			pen.fillStyle = "#000000";
		}
		//pen.arc(col * 40 + 20,row * 40 + 20,15,0,2*Math.PI);
		pen.arc(col * 55 + 27,row * 55 + 27,25,0,2*Math.PI);
		pen.fill();
		pen.closePath();
		}
	    gameOver(row,col,flag);
	    flag = flag == 1 ? 2 : 1;
	});
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
		alert("game over!");
		return;
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
		alert("game over!");
		return;
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
		alert("game over!");
		return;
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
		alert("game over!");
		return;
	}
}


