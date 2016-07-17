$(function() {
	$(".contain .left img").click(function() {
		var type = $(this).data("type");

		var type2 = $(temp).data("type");
		var arr = $(".contain .right img");
		var temp = $(arr[Math.floor(Math.random() * arr.length)]);
		//值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)
		//Math.random()用来生成随机数，返回大于等于 0 小于 1 的一个随机数



		if(type == 0) {
			$(this).css("transform", "translate(150px,140px)");
		} else if(type == 1) {
			$(this).css("transform", "translate(150px,0px)");
		} else if(type == 2) {
			$(this).css("transform", "translate(150px,-140px)");
		}

		if(type2 == 0) {
			temp.css("transform", "translate(-150px,140px)")
		} else if(type2 == 1) {
			temp.css("transform", "translate(-150px,0px)");
		} else if(type2 == 2) {
			temp.css("transform", "translate(-150px,-140px)");
		}

		var that = $(this);
		//this对象在程序中随时会改变，而var that=this之后，that没改变之前仍然是指向当时的this，这样就不会出现找不到原来的对象。
		setTimeout(function() {
			that.css("transform", "translate(0px,0px)");
			temp.css("transform", "translate(0px,0px)");
		}, 1000);

		//比较
		var diff = type - type2;
		if(diff == 0) {
			$(".info ul").prepend("<li>平局" + new Date() + "</li>");
		} else if(diff == -1 || diff == 2) {
			$(".info ul").prepend("<li>我赢了" + new Date() + "</li>");
		} else {
			$(".info ul").prepend("<li>我输了" + new Date() + "</li>");
		}
	});
});