$(document).ready(function() {
    setInterval(function() {
        Start();
        localStorage.setItem("Time", new Date().format("yyyy-MM-dd hh:mm:ss"));
    }, 15000);
});

var startInfo = false;
var Start = function() {
    if (!startInfo) {
        startInfo = true;
        gzfsearch();
        startInfo = false;
    }
};

var buildings = [
    //============软件公寓========
    { "id": "117b42bf-c11d-446e-b8b7-a76e01068aad", "name": "软件公寓", "community": "30a235ec-eb33-427e-a812-a76e01059827" },
    { "id": "92d9ace5-780a-43bc-86cd-a76e011aab78", "name": "软件公寓", "community": "30a235ec-eb33-427e-a812-a76e01059827" },
    //============锦业公寓========
    { "id": "a14b374b-bb3b-4b78-b574-a3c600a44858", "name": "锦业公寓", "community": "e46fe9e8-bd85-4b87-b68d-a3c501146273" },
    { "id": "09833413-73af-4ae4-9e0b-a3c600a5d182", "name": "锦业公寓", "community": "e46fe9e8-bd85-4b87-b68d-a3c501146273" },
    { "id": "7010a8ce-8fca-401d-a0d4-a3c601114e8c", "name": "锦业公寓", "community": "e46fe9e8-bd85-4b87-b68d-a3c501146273" },
    { "id": "bb88fc41-736e-49d4-964b-a3c60111b613", "name": "锦业公寓", "community": "e46fe9e8-bd85-4b87-b68d-a3c501146273" },
    { "id": "d54adc0d-9a44-478e-84d0-a3c60111e21c", "name": "锦业公寓", "community": "e46fe9e8-bd85-4b87-b68d-a3c501146273" },
    //============兰博公寓C区========
    { "id": "e74c6ef0-6e8e-4678-a915-a64000fa7473", "name": "兰博公寓C区", "community": "68fb5f57-5414-4295-a777-a64000f9cbc1" },
    { "id": "880a0eb0-1797-4d05-96ac-a640010d8e56", "name": "兰博公寓C区", "community": "68fb5f57-5414-4295-a777-a64000f9cbc1" },
    { "id": "4c2516c7-dfeb-4ccd-8898-a6fd00994aee", "name": "兰博公寓C区", "community": "68fb5f57-5414-4295-a777-a64000f9cbc1" },
    { "id": "9ee20a0a-794e-4338-8202-a761011a7c7d", "name": "兰博公寓C区", "community": "68fb5f57-5414-4295-a777-a64000f9cbc1" },
    //============兰博公寓B区========
    { "id": "dfff3ffa-2fdd-48e2-bcd7-a2190114b8ec", "name": "兰博公寓B区", "community": "3fec5392-a75a-43db-9dd0-a0970100a6d2" },
    { "id": "4f0674be-250d-42af-bf86-a21901144abf", "name": "兰博公寓B区", "community": "3fec5392-a75a-43db-9dd0-a0970100a6d2" },
    { "id": "e034bb86-10fb-424e-a620-a097010169ec", "name": "兰博公寓B区", "community": "3fec5392-a75a-43db-9dd0-a0970100a6d2" },
    { "id": "cdf913d1-5674-4872-b3ef-a09701012685", "name": "兰博公寓B区", "community": "3fec5392-a75a-43db-9dd0-a0970100a6d2" },
    //============兰博公寓A区========
    { "id": "ec96b26c-217c-45af-8346-a44f01281de3", "name": "兰博公寓A区", "community": "d0c18b09-39a0-4fde-adbb-a44f01276fa6" },
    //============韩风公寓========
    // {"id":"c3e6d711-7f1e-4f3c-9bb5-a3cd00ef4211","name":"韩风公寓","community":"19b0f030-53c2-49f2-b20a-a3cd00ee7aeb"},
    // {"id":"1a41baa8-3b0b-43ba-984d-a3cd00ef119e","name":"韩风公寓","community":"19b0f030-53c2-49f2-b20a-a3cd00ee7aeb"}
];
var gzfsearch = function() {
    buildings.forEach(function(building) {
        $.ajax({
            url: "http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/RetriveRoomTypeByBuilding/",
            data: { "id": building.id },
            type: "POST",
            dataType: "json",
            success: function(units) {
                units.forEach(function(unit) {
                    var tmp = building;
                    $.ajax({
                        url: "http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/GetRoomCountByRoomType/",
                        data: {
                            "roomtypeid": unit.ID,
                            "buildid": tmp.id
                        },
                        type: "POST",
                        dataType: "json",
                        success: function(result) {
                            if (result != 0) {
                                notify(tmp.name + " " + unit.UnitsName + "剩余房间数:" + result);
                                try {
                                    xiadan(tmp, unit, result);
                                } catch (e) { console.log(e); }
                            }
                            localStorage.setItem(unit.ID, tmp.name + " " + unit.UnitsName + "剩余房间数:" + result);
                            localStorage.setItem("size_" + unit.ID, result);
                        }
                    });
                });
            }
        });
    });
};


Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function notify(msg) {
    var opt = {
        type: "basic",
        title: "有空房间了",
        message: msg,
        iconUrl: "images/icon-48.png"
    }
    chrome.notifications.create('', opt, function(id) {})
}
var encodeFormData = function(data) {
    var pairs = [];
    var regexp = /%20/g;
    for (var name in data) {
        var value = data[name].toString();
        var pair = encodeURIComponent(name).replace(regexp, "+") + "=" +
            encodeURIComponent(value).replace(regexp, "+");
        pairs.push(pair);
    }
    return pairs.join("&");
};

function xiadan(budding, unit, result) {

    testPost(budding, unit, result);

    var auto = localStorage.getItem("_autoSubmit_auto");
    if (auto == '1') {
        var gongyu = localStorage.getItem("_autoSubmit_gongyu");
        if (gongyu.indexOf(budding.id) >= 0) {

            var name = localStorage.getItem("_autoSubmit_name");
            var danwei = localStorage.getItem("_autoSubmit_danwei");
            var certNo = localStorage.getItem("_autoSubmit_shenfenzheng");
            var phone = localStorage.getItem("_autoSubmit_phone");

            try {
                var getSelectRoomPage = function() {
                    if (window.XMLHttpRequest) {
                        return new XMLHttpRequest();
                    } else {
                        return new ActiveObject('Micrsorf.XMLHttp');
                    }
                }();
                getSelectRoomPage.onreadystatechange = function() {
                    switch (getSelectRoomPage.readyState) {
                        case 4:
                            if ((getSelectRoomPage.status >= 200 && getSelectRoomPage.status < 300) || getSelectRoomPage.status == 304) {
                                var html = getSelectRoomPage.responseText;
                                var start = html.indexOf('onclick="operateRoom(this') + 27;
                                var roomId = html.substring(start, start + 36);
                                $.post("http://gzfa.xdz.com.cn/ModuleBook/PersonalRentBook/Index", {
                                        UTPersonalRentBookEntity: {
                                            RoomTypeID: unit.ID,
                                            RoomID: roomId,
                                            Name: name,
                                            CompanyName: danwei,
                                            CertType: 0,
                                            CertNo: certNo,
                                            Mobile: phone,
                                            CommunityID: budding.id
                                        }
                                    },
                                    function(response) {
                                        alert("订单提交了");
                                        console.log(response);
                                    });
                            } else {
                                console.log('error:', getSelectRoomPage.status);
                            }
                            break;
                    }
                };
                getSelectRoomPage.open('post', 'http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/Index?CommunityID=' + budding.community);
                getSelectRoomPage.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                getSelectRoomPage.send(encodeFormData({ "roomtypeid": unit.ID, "buildid": budding.id }));
            } catch (e) { console.log(e); }
        }
    }
};


function testPost(budding, unit, result) {
    try {
        var getSelectRoomPage = function() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                return new ActiveObject('Micrsorf.XMLHttp');
            }
        }();
        getSelectRoomPage.onreadystatechange = function() {
            switch (getSelectRoomPage.readyState) {
                case 4:
                    if ((getSelectRoomPage.status >= 200 && getSelectRoomPage.status < 300) || getSelectRoomPage.status == 304) {
                        var html = getSelectRoomPage.responseText;
                        var start = html.indexOf('onclick="operateRoom(this') + 27;
                        var roomId = html.substring(start, start + 36);
                        console.log(roomId, html.substring(start - 10, start + 46));
                    } else {
                        console.log('error:', getSelectRoomPage.status);
                    }
                    break;
            }
        };
        getSelectRoomPage.open('post', 'http://gzfa.xdz.com.cn/ModuleBook/PersonSelectRoom/Index?CommunityID=' + budding.community);
        getSelectRoomPage.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        getSelectRoomPage.send(encodeFormData({ "roomtypeid": unit.ID, "buildid": budding.id }));
    } catch (e) { console.log(e); }
}
