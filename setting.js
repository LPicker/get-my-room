$(document).ready(function() {
    $('#btn_submit').click(function () {
        var data = $("#form").serializeArray();
        var gongyu = [];
        data.forEach(function(d){
            if(d.name == 'gongyu'){
                gongyu.push(d.value);
            }else{
                localStorage.setItem("_autoSubmit_" + d.name, d.value);
            }
        });
        localStorage.setItem("_autoSubmit_gongyu", gongyu);
        alert("已保存");
        window.close();
    });

    var init = function(){
        var data = {
            auto : localStorage.getItem('_autoSubmit_auto'),
            name : localStorage.getItem('_autoSubmit_name'),
            danwei : localStorage.getItem('_autoSubmit_danwei'),
            shenfenzheng : localStorage.getItem('_autoSubmit_shenfenzheng'),
            phone : localStorage.getItem('_autoSubmit_phone'),
            gongyu : localStorage.getItem('_autoSubmit_gongyu').split(",")
        };
        $("#auto").val(data.auto);
        $("#name").val(data.name);
        $("#danwei").val(data.danwei);
        $("#shenfenzheng").val(data.shenfenzheng);
        $("#phone").val(data.phone);
        $("input[name='gongyu']").val(data.gongyu);
    };
    init();
});
