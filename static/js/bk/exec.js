//exec immediately

//when document ready
$(document).ready(function(){
   //申请开户
    var hid = $('#wbank option:selected').attr('hid');
    var bname = $('#wbank option:selected').val();
    var ihtml = "<input type='hidden' name='hid' value='"+hid+"-"+bname+"'/>";
    $("#aform").append(ihtml);
    var aclick = false;
    $("#apply,#contract").click(function(){
        if($("#contract").length){
            var top = $(document).scrollTop()+25;
            $(".modal-bg").addClass("active");
            $(".modal-ct").css("top",top).addClass("active");

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

        $(".modal-bg.active,.modal-ct.active").removeClass("active");
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
    if(inputs.length) {
        for (var i = 0; i < inputs.length; i++) {
            var name = inputs.eq(i).attr("name");
            var selector = inputs.eq(i);
            if(name == "account"){
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", /\w{8,16}/, "", "", "", "账户名不能为空.", "该账户可以注册.", "", "请输入8-16位用户名.");
            }else if(name == "email"){
                var mexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/;
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", mexp, "/checkClient", $.ajaxGet, "cmail", "请输入合法邮箱地址.", "该邮箱可以注册.", "该邮箱已经被注册了,请更换另外一个邮箱.", "请输入合法邮箱地址.");
            }else if(name =="rcode"){
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", /^118[\d]{7}/, "", "", "", "推荐人编号不能为空.", "已输入推荐人编号", "", "请输入118开头的推荐人编号.");
            }else if(name =="mobile"){
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", /\d{11}/, "", "", "", "手机号码不能为空.", "已输入手机号码", "", "请输入可用的手机号码.");
            }else if(name == "addr"){
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", /^[\u4e00-\u9fa5A-Za-z0-9]{8,}/, "", "", "", "用户地址不能为空.", "已输入用户地址", "", "请输入至少8个中英文字符用户地址.");
            }else if(name =="idcard"){
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", /\w{15,18}/, "", "", "", "身份证号不能为空.", "已输入身份证号", "", "请输入身份证号");
            }else if(name =="bac"){
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", /\d{12,25}/, "", "", "", "银行卡号不能为空.", "已输入银行卡号", "", "请输入银行卡号");
            }else if(name =="branch"){
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", /^[\u4e00-\u9fa5A-Za-z0-9]{4,}/, "", "", "", "支行信息不能为空.", "已输入支行信息", "", "请输入支行信息");
            }else if(name=="name"){
                $.validateField(selector, inputs.eq(i).siblings(".tips"), "#apsm_btn", /^[\u4e00-\u9fa5]{2,4}/, "", "", "", "用户姓名不能为空.", "已输入用户姓名", "", "请输入2-4位用户姓名.");
            }else{
                $.validateField(selector, inputs.eq(i).siblings(".tips"),"#apsm_btn", /[a-zA-Z0-9]{4}/, "/checkcaptcha", $.ajaxGet, "cc", "请输入图中验证码", "验证码正确", "验证码出错", "请输入图片验证码");
            }
        }
    }

    //check if client mail exists
    //var mexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/;
    //$.validateField("#aform input[name=email]","#aform .tips.etips","#apsm_btn",mexp,"/checkClient",$.ajaxGet,"cmail","请输入合法邮箱地址.","该邮箱可以注册.","该邮箱已经被注册了,请更换另外一个邮箱.","请输入合法邮箱地址.");
    //申请开户提交前检验captcha
    //$.validateField("#aform .frow input[name=captcha]","#aform .tips.cctips","#apsm_btn",/[a-zA-Z0-9]{4}/,"/checkcaptcha",$.ajaxGet,"cc","请输入图中验证码","验证码正确","验证码出错","请输入图片验证码");
    //文件上传处理
    //开户成功后的跳转页面
    $.jump("#cjump",10);
});
