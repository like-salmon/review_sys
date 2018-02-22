//exec immediately

//when document ready
$(document).ready(function(){
   //申请开户
    var hid = $('#wbank option:selected').attr('hid');
    var bname = $('#wbank option:selected').val();
    var ihtml = "<input type='hidden' name='hid' value='"+hid+"-"+bname+"'/>";
    $("#aform").append(ihtml);
    var aclick = false;
    var ctclick = false;
    $("#apply,#contract").click(function(){
        if($("#contract").length){
            var top = $(document).scrollTop()+25;
            $(".modal-bg").addClass("active");
            $(".modal-ct").css("top",top).addClass("active");
            ctclick=true;
        }else{
            $(".modal-bg,.modal-ct").addClass("active");
        }
        $("body").css("overflow","hidden");
       //倒计时
        $("#atext").html("请认真查看<bold>服务条款和声明</bold>");
        if (aclick){
            $.countdown(8,"#countdown",true);
        }else{
            $.countdown(8,"#countdown");
        }
        //取消模态框
        $(".modal-bg.active,#mclose").click(function(){
            $("body").css("overflow","auto");
            $(".modal-ct.active").animate({top:-200,opacity:0.4},200,function(){
                $(this).fadeOut();
                $(this).css({"top":"","opacity":""});
                $(".modal-bg.active,.modal-ct.active").removeClass("active");

            });
        aclick = true;
    });
    });

    //查看手势照片
    $("#ps").click(function(){
        var img = '<img src="/static/img/u_acc/sample.jpg"/>';
        $.showModal(img);
    });
    //选择银行的id
        $("#wbank").change(function(){
            var sbank = $(this).val();
            if($("input[name=hid]").length){
                $("input[name=hid]").remove();
            }
            var hid = $('option:selected').attr('hid');
            var ihtml = "<input type='hidden' name='hid' value='"+hid+"-"+sbank+"'/>";
             $("#aform").append(ihtml);
        });
    //获取captcha
    $.getCaptcha("#captcha,.ccha");
    $.switchTabs(".content.service ul.snav li","click","data-target",".shtabs","active");
    $.switchTabs(".content.finance ul.ful li","click","data-target",".shtabs","active");
    var inputs = $("#aform input[type=text]");
    var objs = $.fieldsettings("#aform");
    if(inputs.length) {
        for (var i in objs){
            //console.log(objs[i])
            $.validateField.call(null,objs[i]);
        }
    }
    //disable btn on submit

    $("#aform").off().on("click","#apsm_btn",function(e){
        e.preventDefault();
        console.log(ctclick);
        if(!$("#ctcbox").prop("checked") && !ctclick){
            $("#ctcbox").siblings(".tips").children("p").text("请先查看客户协议书并勾选同意.");
            return;
        }else if($("#ctcbox").prop("checked") && !ctclick){
             $("#ctcbox").siblings(".tips").children("p").text("请先查看客户协议书.");
             return;
        }
        else if($("#ctcbox").prop("checked") && ctclick){
            $(this).css("background","#ccc").attr("disabled","true").val("正在提交...");
            $("#aform").submit();
        }
        /*$("input[type=text],input[type=file]").each(function(i,t){
            if(!$(t).val().length){
                $(t).siblings('.tips').children("p").text("请输入该字段要求信息!");
                $("#apsm_btn").css("background","#ccc").attr("disabled","true");
                return;
            }else if($(t).val().length && !$(t).siblings('.tips').hasClass("cr")){
                $("#apsm_btn").css("background","#ccc").attr("disabled","true");
            }
        });*/

    });

    //check if client mail exists
    //var mexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/;
    //$.validateField("#aform input[name=email]","#aform .tips.etips","#apsm_btn",mexp,"/checkClient",$.ajaxGet,"cmail","请输入合法邮箱地址.","该邮箱可以注册.","该邮箱已经被注册了,请更换另外一个邮箱.","请输入合法邮箱地址.");
    //申请开户提交前检验captcha
    //$.validateField("#aform .frow input[name=captcha]","#aform .tips.cctips","#apsm_btn",/[a-zA-Z0-9]{4}/,"/checkcaptcha",$.ajaxGet,"cc","请输入图中验证码","验证码正确","验证码出错","请输入图片验证码");
    //文件上传处理
    //开户成功后的跳转页面
    $.jump("#cjump",5);
    //form required field browsers comparibility

    if ($("<input />").prop("required") === undefined) {
        var scroll = 0;
        $(document).on("submit", function(e) {
            $(this)
                    .find("input, select, textarea")
                    .filter("[required]")
                    .filter(function() { return this.value == ''; })
                    .each(function() {
                        e.preventDefault();
                        $(this).siblings(".tips").hasClass("cr") ?$(this).siblings(".tips").removeClass("cr") : "";
                        scroll==0?$("body").animate({scrollTop:$(this).offset().top}):scroll+=1;
                        $(this).siblings('.tips').children("p").text("请输入该字段要求信息!");
                        $("input[type=submit]").css("background-color", "#ccc").attr("disabled", true);
                    });
        });
    }
//auto switch tap
$.autoTap(".quotes .qul li",0);
var turl = "ws://www.zjjz999.com/fewebsocket";
//var turl = "ws://localhost:8001/fewebsocket";
var support = "MozWebSocket" in window;
var ws_support = "WebSocket" in window || "MozWebSocket" in window;
if (ws_support){
    var ws = support?new MozWebSocket(turl):new WebSocket(turl);
    ws.onopen = function(){
    console.log("established");
    ws.send("hello");
};
ws.onmessage = function(evt){
    console.log(evt.data);
    ws.send("request");
};
}else{
//js heart beat
function sendHeartBeat() {
    window.setTimeout(function(){
        $.get("/jsheartbeat/",function(){
            sendHeartBeat();
        })
    },1000)
}
sendHeartBeat();
}
});

