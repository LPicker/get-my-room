var storage = window.localStorage;
function showStorage(div){
 for(var i=0;i<storage.length;i++){
	var key = storage.key(i);
	var value = storage.getItem(key);
	var line;
	if(!key.startsWith("size_") && !key.startsWith("Time") && !key.startsWith("_")){
		var size = storage.getItem("size_" + key);
		if(size == 0){
			line = "<lable>" + value + "</lable><br>";
		}else{
			line = "<lable style='color:red;'>" + value + "</lable><br>";
		}
		div.append(line);
	}
 }
}

$(document).ready(function() {
	document.body.innerHTML="";
	var div = $("<div style='width:250px;'></div>");
	$("body").append(div);
	var value = storage.getItem("Time");
	var line = "<lable style='color:#a83cc8;'>" + value + "</lable><br>";
	div.append(line);
	showStorage(div);
});