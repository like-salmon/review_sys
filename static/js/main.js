//标签切换
+function($){
    $.switchTabs=function(classname,event,target,shtabs,active){
        $(classname).on(event,function(){
            if($(this).hasClass(active)) return;
            $(this).addClass(active).siblings().removeClass(active);
            if($(shtabs+"."+active))$(shtabs+"."+active).removeClass("active");
            $(shtabs).hide();
            var tab = $(this).attr(target);
            $("#"+tab).fadeIn("3000");
        });
    }
    }($);

//兼容性
/*IE placeholder*/
+function($){
    $.placeHoldercp=function(){
        (function ($) {
            $.support.placeholder = ('placeholder' in document.createElement('input'));
        })(jQuery);
        //fix for IE7 and IE8
        $(function () {
            if (!$.support.placeholder) {
                $("[placeholder]").focus(function () {
                    if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
                }).blur(function () {
                    if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
                }).blur();

                $("[placeholder]").parents("form").submit(function () {
                    $(this).find('[placeholder]').each(function() {
                        if ($(this).val() == $(this).attr("placeholder")) {
                            $(this).val("");
                        }
                    });
                });
            }
        });
    }
}($);

//检测是否是IE浏览器
+function($){
   $.checkIfIe=function(){
       var ua = window.navigator.userAgent;
       var msie = ua.indexOf("MSIE ");
       return msie>0;
   }
}($);

+function($){
    $.cnwebSocket = function(){
           var turl = "ws://121.14.7.144:4959/";
           var support = "MozWebSocket" in window;
           var ws = support?new MozWebSocket(turl):new WebSocket(turl);
            ws.onopen = function() {
            ws.send("request");
            };

            //处理接收的信息
            ws.onmessage = function (evt) {
                function getdata(tstr,dindex,upordown,flag,evt){
                    var pat = /tstr\)(.*)\(/g;
                    var shindex = evt.data.match(pat);
                    if(shindex){
                            //down
                            var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                            var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                            $(dindex).html(uindex[0]);
                            if(dindex && dindex[1]<0){
                                $(upordown).addClass("down").html(uindex[1]);
                            }else{
                                $(upordown).addClass("up").html(uindex[0]);
                            }
                        }else{
                            console.warn("no data received!");
                        }
                }
                if(evt.data.length){
                    //上证指数
                    //getdata("SSEC","#shindex ~ .cindex","#shi_up_or_down","",evt);
                    var shindex = evt.data.match(/SSEC\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#shindex ~ .cindex").html(uindex[0]);
                        if(dindex &&　dindex[1]<0){
                            $("#shi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#shi_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }

                    }else{
                        //console.warn("no data received!");
                    }
                    //深证指数
                    var shindex = evt.data.match(/SZSC1\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#szindex ~ .cindex").html(uindex[1]);
                        if(dindex && dindex[1]<0){
                            $("#szi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#szi_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }

                    }else{
                        //console.warn("no data received!");
                    }
                    //创业板
                    var shindex = evt.data.match(/CHINEXTP\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#cybindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[0]<0){
                            $("#cybi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#cybi_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }

                    }else{
                        //console.warn("no data received!");
                    }
                    //恒生指数
                    var shindex = evt.data.match(/HSI\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#hsindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[1] <0){
                            $("#hsi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#hsi_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }

                    }else{
                        //console.warn("no data received!");
                    }
                    //恒生国有指数
                    var shindex = evt.data.match(/HSCE\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#hsgqindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[1] <0){
                            $("#hsgqi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#hsgqi_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }

                    }else{
                        //console.warn("no data received!");
                    }
                    //东京日经指数
                     var shindex = evt.data.match(/Nikkei\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#jpindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[1] <0){
                            $("#jpi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#jpi_up_or_down").addClass("up").siblings(".udval").html(uindex[2]);
                        }

                    }else{
                        //console.warn("no data received!");
                    }
                    //东京日经期货指数
                     var shindex = evt.data.match(/Nikkei Future\)(.*?)\(/g);
                    if(shindex){
                        //down

                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#jpftindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[1] < 0){
                            $("#jpfti_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#jpfti_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }

                    }else{
                        //console.warn("no data received!");
                    }
                    //台北加权指数
                     var shindex = evt.data.match(/Taiwan\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#twindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[1] <0){
                            $("#twi_up_or_down").addClass("down").siblings(".udval").html(dindex[1]);
                        }else{
                            $("#twi_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //杜琼斯指数
                    var shindex = evt.data.match(/DJ\)(.*?)\(/g);
                    //console.log(shindex);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#djindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[1] <0){
                            $("#dji_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#dji_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //德国DAX指数
                    var shindex = evt.data.match(/DAX\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#gdaxindex ~ .cindex").html(uindex[0]);
                        if(dindex){
                            $("#gdaxi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#gdaxi_up_or_down").addClass("up").siblings(".udval").html(uindex[2]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //伦敦富时指数
                    var shindex = evt.data.match(/FTSE\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#ftseindex ~ .cindex").html(uindex[0]);
                        if(dindex){
                            $("#ftsei_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#ftsei_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //美国 AMEX 综合指数
                     var shindex = evt.data.match(/AMEX Composite Index\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#amexindex ~ .cindex").html(uindex[0]);
                        if(dindex){
                            $("#amexi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#amexi_up_or_down").addClass("up").siblings(".udval").html(uindex[0]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //标淮普尔500指数
                    var shindex = evt.data.match(/S & P 500\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#spindex ~ .cindex").html(uindex[1]);
                        if(dindex && dindex[1] < 0){
                            $("#spi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#spi_up_or_down").addClass("up").siblings(".udval").html(uindex[2]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //纳斯达克指数
                    var shindex = evt.data.match(/NASDAQ\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#nsdkindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[1] < 0){
                            $("#nsdki_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#nsdki_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //纽约原油
                    var shindex = evt.data.match(/Crude Oil\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#nyoindex ~ .cindex").html(uindex[0]);
                        if(dindex && dindex[1] < 0){
                            $("#nyoi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#nyoi_up_or_down").addClass("up").siblings(".udval").html(uindex[1]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //美国30年国债
                    var shindex = evt.data.match(/US30Y-Bond\)(.*?)\(/g);
                    if(shindex){
                        //down
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#usbindex ~ .cindex").html(uindex[1]);
                        if(dindex && dindex[1] < 0){
                            $("#usbi_up_or_down").addClass("down").siblings(".udval").html(dindex[0]);
                        }else{
                            $("#usbi_up_or_down").addClass("up").siblings(".udval").html(uindex[2]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    //外汇交易
                    function getcrexchange(exp,con,icon){
                         var shindex = evt.data.match(exp);
                         if(shindex){
                                var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                                var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                                //console.log(uindex);
                                $(con).html(uindex[0]);
                                if(dindex && dindex[2] < 0){
                                    $(icon).hasClass("up")?$(icon).removeClass("up"):"";
                                    $(icon).addClass("down").siblings(".mcindex.buy").html(uindex[0]);
                                    $(icon+" ~ .mcindex.sell").html(uindex[1]);
                                }else{
                                    $(icon).hasClass("down")?$(icon).removeClass("down"):"";
                                    $(icon+" ~ .mcindex.buy").html(uindex[0]);
                                    $(icon).addClass("up").siblings(".mcindex.sell").html(uindex[1]);
                                }
                        }else{
                             //console.warn("no data received!");
                         }
                    }
                    //伦敦兑美元
                    var crexps = [/LLGUSD\)(.*?)\(/g,/LLSUSD\)(.*?)\(/g,/HKGHKD\)(.*?)\//g,/EURUSD\)(.*?)\//g,/USDJPY\)(.*?)\//g,/GBPUSD\)(.*?)\//g,/USDCHF\)(.*?)\//g,
                    /AUDUSD\)(.*?)\//g,/USDCAD\)(.*?)\//g,/EURJPY\)(.*?)\//g,/EURCHF\)(.*?)\//g,/EURGBP\)(.*?)\//g,/GBPJPY\)(.*?)\//g,/GBPCHF\)(.*?)\//g,/AUDJPY\)(.*?)\//g,
                        /NZDUSD\)(.*?)\//g,/AUDNZD\)(.*?)\//g,/USDCNH\)(.*?)\//g
                    ]
                    //var crexps = [/LLGUSD\)[\.\d ]*\(/g,/LLSUSD\)[\.\d ]*\(/g,/HKGHKD\)[\.\d ]*\(/g,/EURUSD\)[\.\d ]*\(/g,/USDJPY\)[\.\d ]*\(/g,/GBPUSD\)[\.\d ]*\(/g,/USDCHF\)[\.\d ]*\(/g,
                    ///AUDUSD\)[\.\d ]*\(/g,/USDCAD\)[\.\d ]*\(/g,/EURJPY\)[\.\d ]*\(/g,/EURCHF\)[\.\d ]*\(/g,/EURGBP\)[\.\d ]*\(/g,/GBPJPY\)[\.\d ]*\(/g,/GBPCHF\)[\.\d ]*\(/g,/AUDJPY\)[\.\d ]*\(/g,
                      //  /NZDUSD\)[\.\d ]*\(/g,/AUDNZD\)[\.\d ]*\(/g,/USDCNH\)[\.\d ]*\(/g
                    //]
                    var cons = [];
                    var tds = $(".nqdt .quotes div[id=index-tag3] table tr td");
                    for(var i=0;i<tds.length;i++){
                        if($(tds[i]).attr("id")){
                            cons.push($(tds[i]).attr("id"))
                        }
                    }
                    for(var i=0;i<crexps.length;i++){
                        getcrexchange(crexps[i],"#"+cons[i]+" ~ .mcindex","."+cons[i]+"_up_or_down");
                    }
                    //getcrexchange(/LLGUSD\)(.*?)\(/g,"#lgucr ~ .mcindex",".lgucr_up_or_down");


                    /*
                    var shindex = evt.data.match(/LLGUSD\)(.*?)\(/g);
                    if(shindex){
                        var dindex = shindex[0].match(/-\d+(\.\d+)?/g);
                        var uindex = shindex[0].match(/\d+(\.\d+)?/g);
                        $("#lgucr ~ .mcindex").html(uindex[0]);
                        if(dindex && dindex[0] < 0){
                            $(".lgucr_up_or_down").addClass("down").siblings(".mcindex.buy").html(uindex[0]);
                            $(".lgucr_up_or_down ~ .mcindex.sell").html(uindex[1]);
                        }else if(dindex && dindex[0] > 0){
                            $(".lgucr_up_or_down ~ .mcindex.buy").html(uindex[0]);
                            $(".lgucr_up_or_down").addClass("up").siblings(".mcindex.sell").html(uindex[1]);
                        }
                    }else{
                        //console.warn("no data received!");
                    }
                    */
                }
            };
    }
}($);
+function($){
    $.countdown=function(n,selector,s){
        var stop = s || false;
        if (stop){//prevent executing again
            return;
        }
        //倒计时为n秒
        var timeid=setInterval(function(){$(selector).html("("+n+"s)");n--;
        if(n<0){
            clearInterval(timeid);
            $(selector).empty();
            //写入提交按钮
            var applybtn = "<a id='applylink' href='/apply'>我同意</a>";
            $(".modal-dt ~ div").html(applybtn);
        }
        },1000);
    }
}($);
//check captcha before form is posted

//countdown then jump
+function(a){
    a.jump = function(selector,n) {
        if ($(selector).length) {
            var timeout = window.setInterval(function () {
                $(selector).html(n);
                n--;
                if (n < 0) {
                    clearInterval(timeout);
                    window.location.href = "/";
                }

            }, 1000);
        }
    }
}($);

+function($){
    $.checkField = function (btn){
           $("input[type=text],input[type=file]").each(function(i,t){
                    if($(t).val().length==0){
                        $(btn).css("background-color", "#ccc").attr("disabled", true);
                        return;
                    }else if($(t).attr("type") == "text" && !$(t).siblings(".tips").hasClass("cr") && $(t).siblings(".tips").text().length){
                        $(btn).css("background-color", "#ccc").attr("disabled", true);
                        return;
                    }
                });
           $("input[type=file]").on("change",function(){
               $("input[type=file],input[type=text]").each(function(i,t){
                    if($(t).val().length==0){
                        $(btn).css("background-color", "#ccc").attr("disabled", true);
                        return;
                    }else if($(t).attr("type") == "text" && !$(t).siblings(".tips").hasClass("cr") && $(t).siblings(".tips").text().length){
                        $(btn).css("background-color", "#ccc").attr("disabled", true);
                        return;
                    }
                });
           });
       }

}($);
//ajax get data from server
+function($){
    $.ajaxGet=function(url,valobj,tips,btn,crtext,extext){

        var data = {};
        $.ajax({
            url: url,
            data: valobj,
            method: "GET",
            dataType: "JSON",
            success: function (data) {
                //console.log(data["cre"] == 1);
                if (data["cre"] == 0) {
                    $(tips).addClass("cr").text(crtext);
                    $(btn).css("background-color", "").attr("disabled", false);
                    $.checkField(btn);
                }else if(data["cre"] == 1) {
                    $(tips).text(extext);
                    $(tips).hasClass("cr")?$(tips).removeClass("cr"):"";
                    $(btn).css("background-color", "#ccc").attr("disabled", true);
                }
            }
        });
    }
}($);

//validate field of form
+function($){
   $.validateField = function(obj){
       var field = obj.selector,tips = obj.tips,btn = obj.button,exp = obj.regexp,url = obj.cburl,callback = obj.callback,key = obj.cbkey,ngtext = obj.ngtext,crtext = obj.crtext,extext = obj.extext,rqtext = obj.rqtext;
       var pat = new RegExp(exp);
       $(field).on({
        "keyup": function () {
            if (!$(this).val()) {
                $(tips).hasClass("cr") ? $(tips).removeClass("cr") : "";
                $(tips).text(ngtext);
                $(btn).css("background-color", "#ccc").attr("disabled", true);
                return;
            }
            var tval = {};
            tval[key] = $(this).val();
            var turl = url;
            if (pat.test($(this).val())) {
                if(typeof callback != "function"){
                    $(tips).addClass("cr").text(crtext);
                    $(btn).css("background-color", "").attr("disabled", false);
                    $.checkField(btn);
                    return;
                }
                callback(turl,tval,tips,btn,crtext,extext);
            } else {
                $(tips).hasClass("cr") ? $(tips).removeClass("cr") : "";
                $(tips).text(rqtext);
                $(btn).css("background-color", "#ccc").attr("disabled", true);
            }
        },
        "blur": function () {
            if (!$(this).val()) {
                $(tips).hasClass("cr") ? $(tips).removeClass("cr") : "";
                $(tips).text(ngtext);
                $(btn).css("background-color", "#ccc").attr("disabled", true);
                return;
            }
            var turl = url;
            var tval = {};
            tval[key] = $(this).val();
            if (pat.test($(this).val())) {
                if(typeof callback != "function"){
                    $(tips).addClass("cr").text(crtext);
                    $(btn).css("background-color", "").attr("disabled", false);
                    $.checkField(btn);
                    return;
                }
                callback(turl,tval,tips,btn,crtext,extext);

            } else {
                $(tips).hasClass("cr") ? $(tips).removeClass("cr") : "";
                $(tips).text(rqtext);
                $(btn).css("background-color", "#ccc").attr("disabled", true);
            }
        }
    });
   }
}($);
+function($){
    $.t = 1;//captcha iterval if abuse,increment by 1
   $.getCaptcha = function(cc){
       //获取captcha
    $(cc).click(function(){
        var date = new Date();
        var timestamp = date.getTime();
        var url = "/captcha";
        var itv = 5000;
        $.ajax({
            url:url,
            data:{tstamp:timestamp},
            method: "GET",
            dataType:"Json",
            beforeSend:function(){
                $(cc).html("<img style='width:100px;' src='/static/img/loading.gif'");
                    },
            success:function(data){
                if(data.imgsrc){
                    var imgsrc = "<img src="+data['imgsrc']+"/>";
                    $(cc).html(imgsrc);
                }else if(data.tscre){
                    $(cc).siblings(".tips").text("获取过于频繁,请稍后再试.");
                    var imgsrc = "<img id='fbdimg'style='width: initial;position: absolute;right:99px;margin-top: -11px;' src='/static/img/icons/forbidden.png'/>";
                    $(imgsrc).insertAfter(".frow input[name=captcha]");
                    window.setTimeout(function(){
                        $("#fbdimg").fadeOut();
                        var ccimg = "<img src="+data["tscre"]['imgsrc']+"/>";
                        $(cc).siblings(".tips").text("请输入图中验证码.");
                        $(cc).html(ccimg);
                    },itv*$.t);
                    $.t+=1;
                }
            }
        });

    });
   }
}($);
/*show img/text in modal */
+function($){
   $.showModal=function(img){
       var modalbg = '<div class="modal-bg active"></div>';
       var modalct = '<div class="modal-ct-img"><img class="mclose" src="/static/img/close.png"/>'+img+'</div>';
       !$(".modal-bg").length?$("body").append(modalbg):$(".modal-bg").addClass("active");
       !$(".modal-ct-img").length?$("body").append(modalct):"";
       $("body").css({"overflow":"hidden"});
       $(".mclose,.modal-bg").off("click").click(function(){
           $(".modal-bg").removeClass("active");
           $(".modal-ct-img").remove();
           $("body").css({"overflow":"scroll"});
       });
   }
}($);
/*auto hide tips*/
(function($){
    $.autotips=function(selector,text,cover){
        var cover = cover || true;
        if (cover) {
            $(selector).html(text);
            $(selector).show();
            setTimeout(function () {
                $(selector).slideUp("slow");
            }, 4000);
            return;
        } else {
            if ($(selector).text().length > 1) {
                $(selector).show();
            } else {
                $(selector).html(text);
                $(selector).show();
            }
            setTimeout(function () {
                $(selector).slideUp("slow");
            }, 4000);
        }
    }
})($);

/*auto switch tap intervally */
(function($){
    $.autoTap=function(selector,ntime){
        var n=ntime+1||0;
        var tid = window.setInterval(function(){
        $(selector).eq(n).click();
        n<$(selector).length-1?n++:n=0;
        $("#"+$(selector).eq(n).attr("data-target")).hover(function(){
            window.clearInterval(tid);
        },$.autoTap);//$.autoTap is not executed on hover out.
        },4000);
    }
})($);

+function($){
    $.fieldsettings = function(selector){
        //inputs =>$("#aform input[type=text]");
        var selector = $(selector);
        return {
            "account":{
                "selector":selector.find("input[name=account]"),
                "tips":selector.find("input[name=account]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/^[0-9a-zA-Z]{8,16}$/,
                "cburl":"",//callback url
                "callback":"",//callback function
                "cbkey":"",//key name in callback obj
                "ngtext":"账户名不能为空.",//when condition is empty
                "crtext":"该账户可以注册.",//condition is met
                "extext":"",//account already exists
                "rqtext":"请输入8-16位用户名."
            },
            "email":{
                "selector":selector.find("input[name=email]"),
                "tips":selector.find("input[name=email]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/,
                "cburl":"/checkClient",//callback url
                "callback":$.ajaxGet,//callback function
                "cbkey":"cmail",//key name in callback obj
                "ngtext":"请输入合法邮箱地址.",//when condition is empty
                "crtext":"该邮箱可以注册.",//condition is met
                "extext":"该邮箱已经被注册了,请更换另外一个邮箱.",//text show when already exists
                "rqtext":"请输入合法邮箱地址."
            },
            "rcode":{
                "selector":selector.find("input[name=rcode]"),
                "tips":selector.find("input[name=rcode]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/^[\d]{10}/,
                "cburl":"",//callback url
                "callback":"",//callback function
                "cbkey":"",//key name in callback obj
                "ngtext":"推荐人编号不能为空.",//when condition is empty
                "crtext":"已输入推荐人编号.",//condition is met
                "extext":"",//text show when already exists
                "rqtext":"请输入10位推荐人编号."
            },
            "mobile":{
                "selector":selector.find("input[name=mobile]"),
                "tips":selector.find("input[name=mobile]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/\d{11}/,
                "cburl":"",//callback url
                "callback":"",//callback function
                "cbkey":"",//key name in callback obj
                "ngtext":"手机号码不能为空.",//when condition is empty
                "crtext":"已输入手机号码",//condition is met
                "extext":"",//text show when already exists
                "rqtext":"请输入可用的手机号码."
            },
            "addr":{
                "selector":selector.find("input[name=addr]"),
                "tips":selector.find("input[name=addr]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/.*/,
                "cburl":"",//callback url
                "callback":"",//callback function
                "cbkey":"",//key name in callback obj
                "ngtext":"用户地址不能为空.",//when condition is empty
                "crtext":"已输入用户地址",//condition is met
                "extext":"",//text show when already exists
                "rqtext":"请输入至少8个中英文字符用户地址."
            },
            "idcard":{
                "selector":selector.find("input[name=idcard]"),
                "tips":selector.find("input[name=idcard]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/[\w()]{8,19}/,
                "cburl":"",//callback url
                "callback":"",//callback function
                "cbkey":"",//key name in callback obj
                "ngtext":"身份证号不能为空.",//when condition is empty
                "crtext":"已输入身份证号",//condition is met
                "extext":"",//text show when already exists
                "rqtext":"请输入身份证号"
            },
            "bac":{
                "selector":selector.find("input[name=bac]"),
                "tips":selector.find("input[name=bac]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/\d{12,25}/,
                "cburl":"",//callback url
                "callback":"",//callback function
                "cbkey":"",//key name in callback obj
                "ngtext":"银行卡号不能为空.",//when condition is empty
                "crtext":"已输入银行卡号",//condition is met
                "extext":"",//text show when already exists
                "rqtext":"请输入银行卡号"
            },
            "branch":{
                "selector":selector.find("input[name=branch]"),
                "tips":selector.find("input[name=branch]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/.*/,
                "cburl":"",//callback url
                "callback":"",//callback function
                "cbkey":"",//key name in callback obj
                "ngtext":"支行信息不能为空.",//when condition is empty
                "crtext":"已输入支行信息",//condition is met
                "extext":"",//text show when already exists
                "rqtext": "请输入支行信息"
            },
            "name":{
                "selector":selector.find("input[name=name]"),
                "tips":selector.find("input[name=name]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/^[\u4e00-\u9fa5]{2,4}/,
                "cburl":"",//callback url
                "callback":"",//callback function
                "cbkey":"",//key name in callback obj
                "ngtext":"用户姓名不能为空.",//when condition is empty
                "crtext":"已输入用户姓名",//condition is met
                "extext":"",//text show when already exists
                "rqtext": "请输入2-4位用户姓名."
            },
            "captcha":{
                "selector":selector.find("input[name=captcha]"),
                "tips":selector.find("input[name=captcha]").siblings(".tips"),
                "button":"#apsm_btn",
                "regexp":/[a-zA-Z0-9]{4}/,
                "cburl":"/checkcaptcha",//callback url
                "callback":$.ajaxGet,//callback function
                "cbkey":"cc",//key name in callback obj
                "ngtext":"请输入图中的验证码",//when condition is empty
                "crtext":"验证码正确",//condition is met
                "extext":"验证码出错",//text show when already exists
                "rqtext": "请输入图中的验证码."
            }
        }


    }
}($);

