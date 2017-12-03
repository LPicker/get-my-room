var encodeFormData = function(data){  
    var pairs = [];  
    var regexp = /%20/g; 
    for (var name in data)  
    {  
    var value = data[name].toString();  
    var pair = encodeURIComponent(name).replace(regexp, "+") + "=" +  
        encodeURIComponent(value).replace(regexp, "+");  
    pairs.push(pair);  
    }  
    return pairs.join("&");  
};
var getSelectRoomPage = function(){
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}else{
		return new ActiveObject('Micrsorf.XMLHttp');
	}
}();
getSelectRoomPage.onreadystatechange = function(){
	switch(getSelectRoomPage.readyState){
		case 4 : 
			console.log(4,'响应全部接受完毕');
			if ((getSelectRoomPage.status >= 200 && getSelectRoomPage.status < 300) || getSelectRoomPage.status == 304) {
				var html = getSelectRoomPage.responseText;
				var start = html.indexOf('onclick="operateRoom(this') + 27;
				var roomId = html.substring(start, start + 36);
				console.log(roomId);
			}else{
				console.log('error:', getSelectRoomPage.status);
			}
			break;
	}
};
getSelectRoomPage.open('get','html.txt');
getSelectRoomPage.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
getSelectRoomPage.send(encodeFormData({"roomtypeid":'622de26b-e7c2-44c8-a37c-a3c60108d092',"buildid":'7010a8ce-8fca-401d-a0d4-a3c601114e8c'}));
