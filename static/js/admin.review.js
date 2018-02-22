//remove user
(function ($) {
    $.removeAppt = function () {
        $(".review_tb.user tr td .remove").click(function (e) {
            e.preventDefault();
            var tid = $(this).parents("tr.alist").find(".tid").text();
            var path = $(this).parents("tr.alist").find("#imgpath").val();
            var that = this;
            var obj = {
                "text": "确认删除该用户?",
                "onConfirm": function () {
                    var url = "/admin/review/remove/";
                    var nthat = that;
                    $.ajax({
                        url: url,
                        data: {"tid": tid, "path": path},
                        method: "GET",
                        dataType: "JSON",
                        success: function (data) {
                            if (data["rr"] == 1) {
                                $(nthat).parents('tr').children('td, th').animate({padding: 0}).wrapInner('<div />').children().slideUp(function () {
                                    $(nthat).closest('tr').remove();
                                });
                                if ($("#review_tb tbody tr.alist").length < 6) {
                                    if (window.location.search) {
                                        window.location.href = "/admin/review/" + window.location.search;
                                    } else {
                                        window.location.href = "/admin/review/";
                                    }
                                }
                            }
                        },
                        error: function (a, b, c) {
                            console.error(a, b, c);
                        }
                    });
                }
            };
            $.confirm(obj);
        });
    }
})($);

//get xsrf cookie
+function ($) {
    $.getCookie = function (name) {
        var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
        return r ? r[1] : undefined;
    }
}($);
//admin remove applicant
(function ($) {
    $.adminremoveAppt = function () {
        $(".review_tb.admin tr td .remove").click(function (e) {
            e.preventDefault();
            var tid = $(this).parents("tr.alist").find(".tid").text();
            var that = this;
            var obj = {
                "text": "确认删除该用户?",
                "onConfirm": function () {
                    var url = "/admin/review/adminremove/";
                    var nthat = that;
                    $.ajax({
                        url: url,
                        data: {"tid": tid},
                        method: "GET",
                        dataType: "JSON",
                        success: function (data) {
                            if (data["rr"] == 1) {
                                $(nthat).parents('tr').children('td, th').animate({padding: 0}).wrapInner('<div />').children().slideUp(function () {
                                    $(nthat).closest('tr').remove();
                                });
                                if ($(".review_tb.admin tbody tr.alist").length < 6) {
                                    if (window.location.search) {
                                        window.location.href = "/admin/rvapplication/" + window.location.search;
                                    } else {
                                        window.location.href = "/admin/rvapplication/";
                                    }
                                }
                            }
                        },
                        error: function (a, b, c) {
                            console.error(a, b, c);
                        }
                    });
                }
            };
            $.confirm(obj);
        });
    }
})($);
//process review form
+function ($) {
    $.processForm = function (selector, data) {
        $(selector).empty();
        var html = '<input type="hidden" value="' + data.rs["uid"] + '" name="uid" />';
        if (data.rs["ifrv"] == "1") {
            html += '<img src="/static/img/icons/review.png" id="ifrvimg" style="position: absolute;top:20px;right: 30px;width: 203px;z-index: 10;"/>';
            html += '<div class="frow"> <label>用户账号:</label><input maxlength="15" type="text" pattern="[\d]{15}" class="finput" value="' + data.rs["uacc"] + '" name="uacc" readonly="readonly"/></div>';
            html += '<div class="frow"> <label>用户邮箱:</label><input class="finput" type="text" value="' + data.rs["umail"] + '" name="umail" readonly="readonly"/></div>';
        } else {
            html += '<div class="frow" style="height: 50px;"> <label>用户账号:</label><input maxlength="15" type="text" pattern="\d{15}" class="finput" value="' + data.rs["uacc"] + '" name="uacc" required/><div class="tips atips"><i></i><p></p></div></div></div>';
            html += '<div class="frow" style="height: 50px;"> <label>用户邮箱:</label><input class="finput" type="text" value="' + data.rs["umail"] + '" name="umail"/><div class="tips mtips"><i></i><p></p></div> </div>';
        }

        html += '<div class="frow"><label>用户姓名:</label><input class="finput" type="text" value="' + data.rs["uname"] + '" name="uname" readonly="readonly"/> </div>';
        //html += '<div class="frow"> <label>用户密码:</label><input class="finput" value="'+data.rs["upwd"]+'" name="upwd"/> </div>';
        html += '<div class="frow"> <label>推荐人编号:</label><input class="finput" type="text" value="' + data.rs["urcmd"] + '" name="urcmd" readonly="readonly"/> </div>';
        html += '<div class="frow"> <label>用户手机:</label><input class="finput" type="text" maxlength="11" value="' + data.rs["mobile"] + '" name="mobile" readonly="readonly"/></div>';
        html += '<div class="frow"> <label>用户地址:</label><input type="text" type="text" class="finput" value="' + data.rs["uadd"] + '" name="uadd" readonly="readonly"/> </div>';
        if (data.rs["ifrv"] == "1") {
            html += '<div class="frow"> <label>用户身份证:</label><input class="finput" type="text" maxlength="18" pattern="[a-zA-Z0-9]{15,18}" value="' + data.rs["idc"] + '" name="idc" readonly="readonly"/> </div>';
            html += '<div class="frow"> <label>银行卡号:</label><input class="finput" type="text" value="' + data.rs["bknum"] + '" pattern="\d{20}" maxlength="20" name="bknum" readonly="readonly"/> </div>';
        } else {
            html += '<div class="frow"> <label>用户身份证:</label><input class="finput" type="text" maxlength="18" pattern="[a-zA-Z0-9]{15,18}" value="' + data.rs["idc"] + '" name="idc"/> </div>';
            html += '<div class="frow"> <label>银行卡号:</label><input class="finput" type="text" value="' + data.rs["bknum"] + '" pattern="\d{20}" maxlength="20" name="bknum"/> </div>';
        }
        html += '<div class="frow"> <label>所属银行:</label><input class="finput" type="text" value="' + data.rs["bank"] + '" name="bank" readonly="readonly"/> </div>';
        html += '<div class="frow"> <label>该银行分行:</label><input class="finput" type="text" value="' + data.rs["branch"] + '" name="branch" readonly="readonly"/> </div>';
        html += '<div class="frow"> <label>交易货币:</label><input class="finput" type="text" value="' + data.rs["cr"] + '" name="cr" readonly="readonly"/> </div>';
        html += '<div class="frow"> <label style="margin-left: 204px;">用户认证照片:</label> <ul class="uimgs">';
        html += '<li> <img src="" data-src="' + data.rs["idcfimg"] + '" class="fimgs idcfimg"/><p>身份证正面照</p> </li>';
        html += '<li> <img src="" data-src="' + data.rs["idcrimg"] + '" class="fimgs idcrimg"/><p>身份证背面照</p> </li>';
        html += '<li> <img src="" data-src="' + data.rs["bkimg"] + '" class="fimgs bkimg"/><p>银行卡照片</p> </li>';
        html += '<li> <img src="" data-src="' + data.rs["psimg"] + '" class="fimgs psimg"/><p>手势照片</p> </li></ul>';

        html += '<input type="hidden" value="' + data.rs["idcfimg"] + '" name="idcfimg" />';
        html += '<input type="hidden" value="' + data.rs["idcrimg"] + '" name="idcrimg" />';
        html += '<input type="hidden" value="' + data.rs["bkimg"] + '" name="bkimg" />';
        html += '<input type="hidden" value="' + data.rs["psimg"] + '" name="psimg" /></div>';
        html += '<div class="frow"> <label>备注信息:</label><input type="text" value="' + data.rs["memo"] + '" class="finput" name="memo" /> </div>';
        //添加到当前模态框
        $(selector).append(html);
        $.lazyLoad();
    }
}($);
//review user
+function ($) {
    $.reviewUser = function () {
        $(".review_tb.user tr td .review").click(function () {
            var tid = $(this).parents("tr.alist").find(".tid").text();
            var that = $(this);
            var data = {tid: tid};
            //console.log($(this).parents("tr.alist").find(".rv").text()=="已审核");
            if ($(this).parents("tr.alist").find(".rv").text() == "已审核") {
                data = {tid: tid, ifrv: 1};
            }
            var tsrc = "/admin/rvuser/";
            //$("#rvif").attr("src",tsrc);
            $.ajax({
                _xsrf: $.getCookie("_xsrf"),
                url: tsrc,
                data: data,
                dataType: "json",
                method: "get",
                beforeSend: function () {
                    $(".loading").css({"top": "50%"}).show();
                },
                success: function (data) {
                    if (data.rs) {
                        //process form
                        $.processForm("#rvform .data", data);
                        //check acc
                        if (data.rs["ifrv"] != "1") {
                            //check acc and umail
                            var objs = $.cfsettings();
                            for (var i in objs) {
                                $.validateField(objs[i])
                            }
                            ;
                        }
                        //viewUserImgs
                        $.viewUserImgs();
                        $(".loading").hide();
                    }
                    else if (data.ers && data.ers == "1302") {
                        $("#rvform .data").empty();
                        $("#rvform .data").append("<div class='err' id='ne'><p>当前审核的用户不存在,请稍后再试.</p><input type='hidden' value='" + data.tid + "'/> </div>");
                        $("input[type='submit']").remove();
                        $(".loading").hide();
                        return;
                    } else if (data.ers && data.ers == "1301") {
                        $("#rvform .data").empty();
                        $("#rvform .data").append("<div class='err' id='ing'><p>当前用户正在被审核,请稍后再试.</p><img src='/static/img/hourglass.gif'/><input type='hidden' value='" + data.tid + "'/> </div>");
                        $("input[type='submit']").remove();
                        $(".loading").hide();
                        return;
                    }
                },
                error: function (a, b, c) {
                    console.error(a, b, c);
                    //$("#rvform .loading").hide();
                }
            });
            //激活按钮
            //$("#rvform input#rvbtn").attr("disabled",false).css({"background-color":"","color":""}).val("提交审核");
            $(".modal-ct-s-1,.modal-bg").toggleClass("active");
            $("body").css("overflow", "hidden");
            //取消模态框vnbtn
            $(".modal-bg.active,#mclose").on("click.last", function () {
                $("body").css("overflow", "auto");
                /*$("div[class^=modal-ct].active").animate({top:-1500},function () {
                 $(".modal-bg.active,div[class^=modal-ct].active").removeClass("active");
                 });*/
                $(".modal-ct-s-1").animate({top: -200, opacity: 0.4}, 200, function () {
                    $(this).fadeOut();
                    $(".modal-bg.active,div[class^=modal-ct].active").removeClass("active");
                    //restore reviewing status
                    $.get("/admin/review/restore?tid=" + tid);
                    if (window.location.search) {
                        window.location.href = "/admin/review/" + window.location.search;
                    } else {
                        window.location.href = "/admin/review/";
                    }
                });

            });

        });
    }
}($);

//admin review
+function ($) {
    $.adminReview = function () {
        $(".review_tb.admin tr td .review").click(function () {
            var tid = $(this).parents("tr.alist").find(".tid").text();
            var that = $(this);
            var data = {tid: tid};
            //console.log($(this).parents("tr.alist").find(".rv").text()=="已审核");
            if ($(this).parents("tr.alist").find(".rv").text() == "已审核") {
                data = {tid: tid, ifrv: 1};
            }
            var tsrc = "/admin/adminreview/";
            //$("#rvif").attr("src",tsrc);
            $.ajax({
                _xsrf: $.getCookie("_xsrf"),
                url: tsrc,
                data: data,
                dataType: "json",
                method: "get",
                beforeSend: function () {
                    $(".loading").css({"top": "50%"}).show();
                },
                success: function (data) {
                    if (data.rdrs) {
                        that.text("已审核");
                        window.setTimeout(function () {
                            that.parents('tr').children('td, th').animate({padding: 0}).wrapInner('<div />').children().slideUp(function () {
                                that.closest('tr').remove();
                            });
                            if (window.location.search) {
                                window.location.href = "/admin/rvapplication/" + window.location.search;
                            } else {
                                window.location.href = "/admin/rvapplication/";
                            }
                            $(".loading").hide();
                        }, 1000);

                    }
                },
                error: function (a, b, c) {
                    console.error(a, b, c);
                    //$("#rvform .loading").hide();
                }
            });
        });
    }
}($);

//view imgs
+function ($) {
    $.viewUserImgs = function () {
        /*
         * show active img in the middle of screen
         * thumbnail imgs at the bottom
         * thumbnail imgs is active accordingly when img is clicked
         * remove all once imgmodal is deactivated
         * */
        $("#rvform .frow .uimgs li").off().click(function () {
            var imgurl = $(this).children("img").attr("src");
            //add imgmodal
            !$(".imgmodal").length ? $("body").append("<div class='imgmodal'></div>") : $(".imgmodal").show();
            var imgs = [];
            var imgsobj = $("#rvform .uimgs li img");
            for (var i = 0; i < imgsobj.length; i++) {
                imgs.push(imgsobj.eq(i).attr("src"))
            }
            var order = imgs.indexOf(imgurl);
            if (order == 0 || order == 3) {
                !$("p#cnum").length ? $("body").append('<p id="cnum">' + $("#rvform .data .frow input[name=idc]").val() + '</p>') : $("p#cnum").html($("#rvform .data .frow input[name=idc]").val());
            } else if (order == 2) {
                !$("p#cnum").length ? $("body").append('<p id="cnum">' + $("#rvform .data .frow input[name=bknum]").val() + '</p>') : $("p#cnum").html($("#rvform .data .frow input[name=bknum]").val());
            }
            var html = "<div class='thumbnails'><ul><img id='rotate'src='/static/img/icons/rotate.png'/>";
            var atimg = '<ul id="imgactive">';
            for (var i = 0; i < imgs.length; i++) {
                if (i == imgs.indexOf(imgurl)) {
                    atimg += '<div class="active"><img class="oimg" src="' + imgs[i] + '"/></div>';
                    html += '<li class="active"><img src="' + imgs[i] + '"/></li>';
                } else if (i != imgs.indexOf(imgurl)) {
                    atimg += "<div class=''><img class='oimg' src='" + imgs[i] + "'/></div>";
                    html += '<li class=""><img src="' + imgs[i] + '"/></li>';
                }
            }
            html += "</ul></div>";
            //atimg += "<div class='navicon'><div class='prev'></div><div class='next'></div></div></div></ul>";
            atimg += "</ul>";
            $("body").append(html);
            $("body").append(atimg);
            //zoom active images
            $("#imgactive > .active").zoom();
            //slide imgs
            $(".thumbnails ul li").off().click(function () {
                var thisimg = $(this).children("img").attr("src");
                var order = imgs.indexOf(thisimg);
                //var cw = $("imgactive").width();
                //oimg.width()>cw?oimg.width(cw):"";//set avtive img to the max width to fit container.
                !$(this).hasClass("active") ? $(this).addClass("active").siblings().removeClass("active") : "";
                !$($("#imgactive > div")[order]).hasClass("active") ? $($("#imgactive > div")[order]).addClass("active").siblings().removeClass("active") : "";
                var oimg = $("#imgactive .active .oimg");
                //rotate zoom img
                oimg.attr("style") ? $("#imgactive div.active img.zoomImg").css("transform", oimg.attr("style").split(": ")[1].split(";")[0]) : "";
                if (order == 0 || order == 3) {
                    !$("p#cnum").length ? $("body").append('<p id="cnum">' + $("#rvform .data .frow input[name=idc]").val() + '</p>') : $("p#cnum").html($("#rvform .data .frow input[name=idc]").val());
                } else if (order == 2) {
                    !$("p#cnum").length ? $("body").append('<p id="cnum">' + $("#rvform .data .frow input[name=bknum]").val() + '</p>') : $("p#cnum").html($("#rvform .data .frow input[name=bknum]").val());
                } else {
                    $("p#cnum").remove();
                }
                //zoom active images
                $("#imgactive div.active img.zoomImg").length ? $("#imgactive div.active img.zoomImg").remove() : "";
                $("#imgactive > .active").zoom();
                oimg.attr("style") ? $("#imgactive div.active img.zoomImg").css(oimg.attr("style").split(": ")[0], oimg.attr("style").split(": ")[1].split(";")[0]) : "";
            });
            $.rotateZoomImgs("#imgactive div.active img.oimg", "#rotate");
            //deactivate imgmodal
            $(".imgmodal").click(function () {
                $(this).hide();
                $(".thumbnails,#imgactive,.zoomImg,#cnum").remove();
            });
        });
    }
}($);

+function ($) {
    $.rotateZoomImgs = function (selector, rotate) {
        var deg = 0;
        $(rotate).click(function () {
            var w = $(selector).width();
            var h = $(selector).height();
            var cw = $(selector).parents("#imgactive").width();
            var nw = w > cw ? cw : w;
            var nh = nw * h / w;
            var p = /rotate\((\d*)deg\)/;
            var r = p.exec($(selector).attr("style"));
            deg = r ? parseInt(r[1]) : 0;
            deg = deg == 360 ? 90 : deg += 90;
            var min = Math.min(w, h);
            var max = Math.max(w, h);
            var which = cw - w <= 0 ? w : h;//check if img's width surpasses container's width.pls note img will fit into container's width surpasses.
            //console.log("which:", which, "min/max:", min / max, "min:", min, "max:", max, "cw:", cw, "cw-w:", cw - w);
            if (deg == 90 || deg == 270) {
                //console.log($(selector).offset().top);
                $(selector).css({
                    "width": which == w ? max : (min / max * 100) + "%",//if img's width surpasses container's width,use rate else use max instead.when 90/270 deg,width/height is swapped.
                    "transform": "rotate(" + deg + "deg)",
                    "margin-top": 20
                    //"height": nh<660?660*nw/nh:nw
                }).parent().siblings(".display").find(".zoomImg").css({
                    "transform": "rotate(" + deg + "deg)"
                    //"height": parseInt((nh<660?660*nw/nh:nw) * 1.3)
                });
                max > cw ? $(selector).parent().width("100%") : max;
                //$(selector).offset().top > 50 ? $(selector).css("margin-top", -$(selector).offset().top + "px") : "";
            } else {
                $(selector).css("margin-top", "");
                $(selector).css({
                    "transform": "rotate(" + deg + "deg)",
                    "width": which ==w?max:"initial"//w/h is not swapped,if img's width surpasses container's width,use img's max else use min,this fits when img's width/height(on whichever deg) surpasses containers'width
                }).parent().siblings(".display").find(".zoomImg").css({
                    "transform": "rotate(" + deg + "deg)"
                });
            }
            //$("#imgactive div.active").zoom();
        });
    }
}($);
//submit review
+function ($) {
    $.submitReview = function () {
        $("#rvform #rvbtn").click(function (e) {
            e.preventDefault();
            var tid = $("#rvform input[name='uid']").val();
            var uacc = $("#rvform input[name='uacc']").val();
            var uidc = $("#rvform input[name='idc']").val();
            var ubc = $("#rvform input[name='bknum']").val();
            var umail = $("#rvform input[name='umail']").val();
            var url = "/admin/reviewed/";
            $.ajax({
                _xsrf: $.getCookie("_xsrf"),
                url: url,
                data: {tid: tid, uacc: uacc, idc: uidc, bknum: ubc, umail: umail},
                dataType: "json",
                metho: "get",
                beforeSend: function () {
                    $(".loading").css({"top": "79%"}).show();
                },
                success: function (data) {
                    if (data.rdrs == 1) {
                        $("#rvbtn").attr("disabled", true).css({
                            "background-color": "#ccc",
                            "color": "#555"
                        }).val("已提交审核.");
                        $(".loading").hide();

                    } else if (data.rdrs == 0) {
                        $("#rvbtn").attr("disabled", true).css({
                            "background-color": "#ccc",
                            "color": "red"
                        }).val("审核出错.");
                    }
                    //restore reviewing status
                    $.get("/admin/review/restore?tid=" + tid);
                },
                error: function (a, b, c) {
                    console.error(a, b, c);
                }
            })

        })
    }
}($);

//review next
+function ($) {
    $.reviewNext = function () {
        var tid = "";
        $("#rvform input#vnbtn").click(function (e) {
            e.preventDefault();
            tid = "" + (parseInt($("#rvform input[name='uid']").val()) - 1);
            var url = "/admin/viewnext";
            var data = {tid: tid};
            if ($("#ifrvimg").length) {
                data = {tid: tid, ifrv: 1};
            }
            $.ajax({
                url: url,
                data: data,
                dataType: "json",
                method: "get",
                beforeSend: function () {
                    $("#rvform input#vnbtn").attr("disabled", true).css({
                        "background-color": "#ccc",
                        "color": "#555"
                    }).val("正在获取...");
                    //restore reviewing status
                    $.get("/admin/review/restore?tid=" + (parseInt(data["tid"]) + 1));
                    $(".loading").show();
                },
                success: function (data) {
                    if (data['rs'] == 0) {
                        $(".loading").hide();
                        $("#rvform input#vnbtn").attr("disabled", true).css({
                            "background-color": "",
                            "color": ""
                        }).val("已审核完所有用户");
                        return;
                    } else if (data.ers && data.ers == "1302") {
                        $("#rvform .data").empty();
                        $("#rvform .data").append("<div class='err' id='ne'><p>当前审核的用户不存在,请稍后再试.</p><input type='hidden' value='" + data.tid + "'/> </div>");
                        $("input[type='submit']").remove();
                        $(".loading").hide();
                        return;
                    } else if (data.ers && data.ers == "1301") {
                        $("#rvform .data").empty();
                        $("#rvform .data").append("<div class='err' id='ing'><p>当前用户正在被审核,请稍后再试.</p><img src='/static/img/hourglass.gif'/><input type='hidden' value='" + data.tid + "'/> </div>");
                        $("input[type='submit']").remove();
                        $(".loading").hide();
                        return;
                    } else {
                        $(".modal-dt").animate({scrollTop: 0}, function () {
                            $.processForm("#rvform .data", data);
                            $(".loading").hide();
                            //activate the btn
                            $("#rvform input#vnbtn").attr("disabled", false).css({
                                "background-color": "",
                                "color": ""
                            }).val("审核下一个").blur();
                            $("#rvform input#rvbtn").attr("disabled", true).css({
                                "background-color": "#ccc",
                                "color": "#fff"
                            }).val("提交审核");
                            //check acc and umail
                            var objs = $.cfsettings();
                            for (var i in objs) {
                                $.validateField(objs[i])
                            }
                            ;

                            $.viewUserImgs();//activate this function
                        });
                    }
                    tid = data.rs.uid;
                    $(".modal-bg.active,#mclose").off().on("click.last", function () {
                        $("body").css("overflow", "auto");
                        var p = /\[(.*)\]/;
                        var uname = p.exec($("#wu").text())[1];
                        $(".modal-ct-s-1").animate({top: -200, opacity: 0.4}, 200, function () {
                            $(this).fadeOut();
                            $(".modal-bg.active,div[class^=modal-ct].active").removeClass("active");
                            //restore reviewing status
                            //console.log(tid);
                            data.rs.cuser ? uname == data.rs.cuser && $("#ne").length == 0 ? $.get("/admin/review/restore?tid=" + tid) : "" : "";
                            if (window.location.search) {
                                window.location.href = "/admin/review/" + window.location.search;
                            } else {
                                window.location.href = "/admin/review/";
                            }
                        });
                    });
                }
            });
        });
    }
}($);
//lazy load imgs
+function ($) {
    $.lazyLoad = function () {
        var d = 120;
        $("#rvform .frow img.fimgs").each(function (i, t) {
            $(t).delay(d += 120).attr("src", $(t).attr("data-src"));
        })
    }
}($);

//popup windows:confirm
+function ($) {
    $.confirm = function (obj) {
        /*
         *object passed to this function is like:
         *obj={
         * text:text,
         * onConfirm:function(){},
         * onCancel:function(){},
         * onClose:function(){}
         * }
         *
         */
        var getobj = {
            text: obj.text,
            onConfirm: function () {
                $(document).on("click", ".modal-ct-cf input.cfbtn", function () {
                    $(".modal-bg.active,.modal-ct-cf.active").removeClass("active");
                    Object.keys(obj).indexOf("onConfirm") && typeof obj.onConfirm === "function" ? obj.onConfirm() : "";//confirm callback
                });
            },
            onCancel: function () {
                $(document).on("click", ".modal-ct-cf input.ccbtn", function () {
                    $(".modal-bg.active,.modal-ct-cf.active").removeClass("active");
                    Object.keys(obj).indexOf("onCancel") && typeof obj.onCancel === "function" ? obj.onCancel() : "";//cancel callback
                });
            },
            onClose: function () {
                $(document).on("click", ".cfclose,.modal-bg.active", function () {
                    $(".modal-bg.active,.modal-ct-cf.active").removeClass("active");
                    Object.keys(obj).indexOf("onClose") && typeof obj.onClose === "function" ? obj.onClose() : "";//cancel callback
                });
            },
            displayModal: function () {
                var modalbg = '<div class="modal-bg active"></div>';
                var modalct = '<div class="modal-ct-cf active"><img id="mclose" class="cfclose" src="/static/img/close.png/"><div class="modal-dt-cf"><h3>' + obj.text + '</h3><div class="btn"><input type="button" class="cfbtn" value="确定"/><input type="button" class="ccbtn" value="取消" /></div></div></div>';
                //check if modal bg exists
                !$(".modal-bg").length ? $("body").append(modalbg) : $(".modal-bg").addClass("active");
                !$(".modal-ct-cf").length ? $("body").append(modalct) : $(".modal-ct-cf").addClass("active");
            }
        };
        for (var i in getobj) {
            if (typeof getobj[i] === "function") {
                getobj[i].call();
            }
        }
    }
}($);

+function ($) {
    $.checkField = function (form, btn) {
        $(form + " " + "input[type=text]," + form + " " + "input[type=file]").each(function (i, t) {
            if ($(t).val().length == 0) {
                if ($(t).attr("name") != "memo") {
                    $(btn).css("background-color", "#ccc").attr("disabled", true);
                }
                return;
            } else if ($(t).attr("type") == "text" && !$(t).siblings(".tips").hasClass("cr") && $(t).siblings(".tips").text().length) {
                $(btn).css("background-color", "#ccc").attr("disabled", true);
                return;
            }
        });
        $(form + " " + "input[type=file]").on("change", function () {
            $(form + " " + "input[type=file]," + form + " " + "input[type=text]").each(function (i, t) {
                if ($(t).val().length == 0) {
                    $(btn).css("background-color", "#ccc").attr("disabled", true);
                    return;
                } else if ($(t).attr("type") == "text" && !$(t).siblings(".tips").hasClass("cr") && $(t).siblings(".tips").text().length) {
                    $(btn).css("background-color", "#ccc").attr("disabled", true);
                    return;
                }
            });
        });
    }

}($);
//ajax get data from server
+function ($) {
    $.ajaxGet = function (url, valobj, tips, btn, crtext, extext) {
        //data[Object.keys(valobj)[0]] = Object.values(valobj)[0];
        $.ajax({
            url: url,
            data: valobj,
            method: "GET",
            dataType: "JSON",
            success: function (data) {
                if (data["cre"] == 0) {
                    $(tips).addClass("cr").text(crtext);
                    $(btn).css("background-color", "").attr("disabled", false);
                    $.checkField("#rvform", btn);

                } else if (data["cre"] == 1) {
                    $(tips).hasClass("cr") ? $(tips).removeClass("cr") : "";
                    $(tips).text(extext);
                    $(btn).css("background-color", "#ccc").attr("disabled", true);
                }
            }
        });
    }
}($);

//validate field of form
+function ($) {
    $.validateField = function (obj) {
        var field = obj.selector, tips = obj.tips, btn = obj.button, exp = obj.regexp, url = obj.cburl, callback = obj.callback, key = obj.cbkey, ngtext = obj.ngtext, crtext = obj.crtext, extext = obj.extext, rqtext = obj.rqtext;
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
                var turl = url;
                tval[key] = $(this).val();
                if (pat.test($(this).val())) {
                    if (typeof callback != "function") {
                        $(tips).addClass("cr").text(crtext);
                        $(btn).css("background-color", "").attr("disabled", false);
                        if ($(field).attr("name") == "ampwd") {
                            if ($("input[name=cfpwd]").val().length) {
                                if ($(field).val() != $("input[name=cfpwd]").val()) {
                                    $(tips).removeClass("cr").text("密码不一致.");
                                    $(btn).css("background-color", "#ccc").attr("disabled", true);
                                } else {
                                    $(tips).addClass("cr").text("已经输入密码.");
                                }
                            }

                        }
                        if ($(field).attr("name") == "cfpwd") {
                            if ($(field).val() != $("input[name=ampwd]").val()) {
                                $(tips).removeClass("cr").text("密码不一致.");
                                $(btn).css("background-color", "#ccc").attr("disabled", true);
                            } else {
                                $(tips).addClass("cr").text("密码一致.");
                            }
                        }
                        !$(".regform").length ? $.checkField("#rvform", btn) : $.checkField(".regform", btn);
                        return;
                    }
                    $(tips).addClass("cr").text(crtext);
                    $(btn).css("background-color", "").attr("disabled", false);
                    typeof callback == "function" ? callback(turl, tval, tips, btn, crtext, extext) : "";
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
                    if (typeof callback != "function") {
                        $(tips).addClass("cr").text(crtext);
                        $(btn).css("background-color", "").attr("disabled", false);
                        if ($(field).attr("name") == "ampwd") {
                            if ($("input[name=cfpwd]").val().length) {
                                if ($(field).val() != $("input[name=cfpwd]").val()) {
                                    $(tips).removeClass("cr").text("密码不一致.");
                                    $(btn).css("background-color", "#ccc").attr("disabled", true);
                                } else {
                                    $(tips).addClass("cr").text("已经输入密码.");
                                }
                            }

                        }
                        if ($(field).attr("name") == "cfpwd") {
                            if ($(field).val() != $("input[name=ampwd]").val()) {
                                $(tips).removeClass("cr").text("密码不一致.");
                                $(btn).css("background-color", "#ccc").attr("disabled", true);
                            } else {
                                $(tips).addClass("cr").text("密码一致.");
                            }
                        }
                        !$(".regform").length ? $.checkField("#rvform", btn) : $.checkField(".regform", btn);
                        return;
                    }
                    $(tips).addClass("cr").text(crtext);
                    $(btn).css({"background-color": "", "color": "#fff"}).attr("disabled", false);
                    typeof callback == "function" ? callback(turl, tval, tips, btn, crtext, extext) : "";

                } else {
                    $(tips).hasClass("cr") ? $(tips).removeClass("cr") : "";
                    $(tips).text(rqtext);
                    $(btn).css("background-color", "#ccc").attr("disabled", true);
                }
            }
        });
    }
}($);

+function ($) {
    $.getCaptcha = function (cc) {
        //获取captcha
        $(cc).click(function () {
            var date = new Date();
            var timestamp = date.getTime();
            var url = "/captcha";
            $.ajax({
                url: url,
                data: {tstamp: timestamp},
                method: "GET",
                dataType: "Json",
                beforeSend: function () {
                    $(cc).html("<img style='width:100px;' src='/static/img/loading.gif'");
                },
                success: function (data) {
                    if (data) {
                        var imgsrc = "<img src=" + data['imgsrc'] + "/>";
                        $(cc).html(imgsrc);
                    }
                }
            });
        });
    }
}($);

+function ($) {
    $.regfieldsettings = function (selector) {
        var selector = $(selector);
        return {
            "ampwd": {
                "selector": selector.find("input[name=ampwd]"),
                "tips": selector.find("input[name=ampwd]").siblings(".tips"),
                "button": "#adlgform .lgbtn",
                "regexp": /^[a-zA-Z0-9]{6,16}$/,
                "cburl": "",//callback url
                "callback": "",//callback function
                "cbkey": "",//key name in callback obj
                "ngtext": "请输入密码.",//when input is empty
                "crtext": "已输入密码.",//condition is met
                "extext": "",//text shows when already exists
                "rqtext": "请输入6-16位登陆密码,大小写字母或数字."
            },
            "cfpwd": {
                "selector": selector.find("input[name=cfpwd]"),
                "tips": selector.find("input[name=cfpwd]").siblings(".tips"),
                "button": "#adlgform .lgbtn",
                "regexp": /^[a-zA-Z0-9]{6,16}$/,
                "cburl": "",//callback url
                "callback": "",//callback function
                "cbkey": "",//key name in callback obj
                "ngtext": "请输入密码.",//when input is empty
                "crtext": "已输入密码.",//condition is met
                "extext": "",//text shows when already exists
                "rqtext": "请输入6-16位登陆密码,大小写字母或数字."
            },
            "unit": {
                "selector": selector.find("input[name=unit]"),
                "tips": selector.find("input[name=unit]").siblings(".tips"),
                "button": "#adlgform .lgbtn",
                "regexp": /^[a-zA-Z0-9]{3,5}$/,
                "cburl": "",//callback url
                "callback": "",//callback function
                "cbkey": "",//key name in callback obj
                "ngtext": "请输入会员单位编号.",//when input is empty
                "crtext": "已输入会员单位编号.",//condition is met
                "extext": "",//text shows when already exists
                "rqtext": "请输入3-5位会员单位,大小写字母或数字."
            },
            "amname": {
                "selector": selector.find("input[name=amname]"),
                "tips": selector.find("input[name=amname]").siblings(".tips"),
                "button": "#adlgform .lgbtn",
                "regexp": /^[a-zA-Z0-9]{8,16}$/,
                "cburl": "",//callback url
                "callback": "",//callback function
                "cbkey": "",//key name in callback obj
                "ngtext": "请输入用户名.",//when input is empty
                "crtext": "已输入用户名.",//condition is met
                "extext": "",//text shows when already exists
                "rqtext": "请输入8-16位用户名,大小写字母或数字."
            },
            "captcha": {
                "selector": selector.find("input[name=captcha]"),
                "tips": selector.find("input[name=captcha]").siblings(".tips"),
                "button": "#adlgform .lgbtn",
                "regexp": /\w{4}/,
                "cburl": "/checkcaptcha/",//callback url
                "callback": $.ajaxGet,//callback function
                "cbkey": "cc",//key name in callback obj
                "ngtext": "请输入图中验证码.",//when input is empty
                "crtext": "验证码正确.",//condition is met
                "extext": "验证码出错",//text shows when already exists
                "rqtext": "请输入图片验证码."
            },
            "mobile": {
                "selector": selector.find("input[name=mobile]"),
                "tips": selector.find("input[name=mobile]").siblings(".tips"),
                "button": "#adlgform .lgbtn",
                "regexp": /\d{11}/,
                "cburl": "",//callback url
                "callback": "",//callback function
                "cbkey": "",//key name in callback obj
                "ngtext": "手机号码不能为空.",//when input is empty
                "crtext": "已输入手机号码.",//condition is met
                "extext": "",//text shows when already exists
                "rqtext": "请输入可用的手机号码."
            },
            "rname": {
                "selector": selector.find("input[name=rname]"),
                "tips": selector.find("input[name=rname]").siblings(".tips"),
                "button": "#adlgform .lgbtn",
                "regexp": /^[\u4e00-\u9fa5]{2,4}$/,
                "cburl": "",//callback url
                "callback": "",//callback function
                "cbkey": "",//key name in callback obj
                "ngtext": "会员姓名不能为空.",//when input is empty
                "crtext": "已输入会员姓名.",//condition is met
                "extext": "",//text shows when already exists
                "rqtext": "请输入2-4位会员姓名."
            }
        }
    }
}($);

//settings on fields required to be checking
+function ($) {
    $.cfsettings = function () {
        return {
            "uacc": {
                "selector": "#rvform input[name=uacc]",
                "tips": "#rvform .tips.atips",
                "button": "#rvbtn",
                "regexp": /\d{15}/,
                "cburl": "/checkClient",
                "callback": $.ajaxGet,
                "cbkey": "cid",
                "ngtext": "账户名不能为空.",
                "crtext": "该账户可以注册.",
                "extext": "当前账号已经存在,请更换另一个账号",
                "rqtext": "请输入15位纯数字用户名."
            },
            "umail": {
                "selector": "#rvform input[name=umail]",
                "tips": "#rvform .tips.mtips",
                "button": "#rvbtn",
                "regexp": /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/,
                "cburl": "/checkClient",
                "callback": $.ajaxGet,
                "cbkey": "cmail",
                "ngtext": "请输入合法邮箱地址.",
                "crtext": "该邮箱可以注册.",
                "extext": "该邮箱已经被注册了,请更换另外一个邮箱.",
                "rqtext": "请输入合法邮箱地址."
            }
        };
    }
}($);
//zoom image
+function ($) {
    $.zoom = function (target, source, img, magnify) {
        var targetHeight,
            targetWidth,
            sourceHeight,
            sourceWidth,
            xRatio,
            yRatio,
            offset,
            $target = $(target),
            imgOffset,
            $source = $(source);

        //var position = $target.css('position');
        var position = "relative";
        // The parent element needs positioning so that the zoomed element can be correctly positioned within.
        $(target).css({"position": /(absolute|fixed)/.test(position) ? position : 'relative', "overflow": "hidden"});
        img.style.width = img.style.height = '';
        var display = "<div class='display'></div>";
        !$(target).parent().find(".display").length ? $(target).parent().append(display) : "";
        $(img)
            .addClass('zoomImg')
            .css({
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0,
                width: img.width * magnify,
                height: img.height * magnify,
                border: 'none',
                maxWidth: 'none',
                maxHeight: 'none'
            })
            .appendTo(".display");
        var box = "<div class='zoombox'></div>";

        !$(target).find(".zoombox").length ? $(target).append(box) : "";

        return {
            init: function () {
                targetWidth = $target.find(".active").outerWidth();
                targetHeight = $target.outerHeight();
                var targetImgWidth = $target.find(".oimg").width();
                if (source === target) {
                    sourceWidth = targetWidth;
                    sourceHeight = targetHeight;
                } else {
                    sourceWidth = $source.outerWidth();
                    sourceHeight = $source.outerHeight();
                }
                xRatio = (img.width - targetWidth) / sourceWidth;
                yRatio = (img.height - targetHeight) / sourceHeight;
                offset = $source.offset();
                $target.find(".zoombox").css({
                    "width": 200 * targetImgWidth / 660,
                    "height": 200 * targetImgWidth / 660 / 2
                });
            },
            move: function (e) {
                //console.log(e.pageX);
                //console.log("mouse",e.pageX,e.pageY);
                var $zoombox = $target.find(".zoombox");
                var $oimg = $target.find(".oimg");
                var left = (e.pageX - $target.find(".oimg").offset().left - $zoombox.width() / 2),
                    top = (e.pageY - $target.find(".oimg").offset().top - $zoombox.height() / 2);
                var owidth = $oimg.width();
                var oheight = $oimg.height();
                var imgTop = $target.find(".oimg").offset().top;
                var imgHeight = $target.find(".oimg").height();
                var maxMoveLeft = $target.find(".oimg").offset().left + $target.find(".oimg").outerWidth();
                var maxMoveTop = $target.find(".oimg").offset().top + $target.find(".oimg").outerHeight();
                //console.log(".oimg",left,top);
                //top = Math.max(Math.min(top, sourceHeight), 0);
                //left = Math.max(Math.min(left, sourceWidth), 0);
                img.style.left = (-left * img.width / owidth) + 'px';
                img.style.top = (-top * img.height / oheight) + 'px';
                //console.log("zoomImg","left:",$(".zoomImg").offset().left,"top:",$(".zoomImg").offset().top,"width:",$(".zoomImg").width(),"height:",$(".zoomImg").height());
                //$zoombox.css({"left":(left) + 'px',"top":(top) + 'px'});
            }
        };
    };
    $.fn.zoom = function () {
        var settings = {
            url: false,
            callback: false,
            target: false,
            duration: 120,
            on: 'mouseover', // other options: grab, click, toggle
            touch: true, // enables a touch fallback
            onZoomIn: false,
            onZoomOut: false,
            magnify: 3//zoom in 3 ratio.
        };
        var target = this;
        var source = this;
        var $source = $(source).find(".oimg");
        var img = document.createElement('img');
        var $img = $(img);
        var mousemove = 'mousemove.zoom';
        var clicked = false;
        var touched = false;
        var srcElement = $(source).children('img').eq(0);
        if (srcElement) {
            $img.attr("src", srcElement.attr('data-src') || srcElement.attr("currentSrc") || srcElement.attr("src"));
        }
        var zoom = $.zoom(target, source, img, settings.magnify);

        function start(e) {
            zoom.init();
            zoom.move(e);
            // Skip the fade-in for IE8 and lower since it chokes on fading-in
            // and changing position based on mousemovement at the same time.
            $img.stop().fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
        }

        function stop() {
            $img.stop().fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
        }

        zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.
        $source.on('mouseenter.zoom', start).on('mouseleave.zoom', stop).on(mousemove, zoom.move);
    }
}($);
/*
 (function(){
 //var turl = "ws://www.zjjz999.com/notification";
 function initws(){
 //var turl = "ws://localhost/notification";
 var turl = "ws://www.zjjz999.com/notification";
 var support = "MozWebSocket" in window;
 var ws = support?new MozWebSocket(turl):new WebSocket(turl);
 ws.onopen = function(){
 ws.send("request");
 console.log("ws is open");
 };
 ws.onmessage = function (evt) {
 console.log(evt)
 if (!("Notification" in window)) {
 console.error("该浏览器不支持桌面通知.");
 } else if (Notification.permission === "granted") {
 notify(evt);
 } else if (Notification.permission !== "denied") {
 Notification.requestPermission(function (permission) {
 if (permission === "granted") {
 notify(evt)
 }
 });
 }

 };
 ws.onclose = function(){
 initws();
 };
 }

 function notify(evt){
 var notification = new Notification("有新的用户提交开户申请!",{
 icon:"/static/img/icons/notify.png",
 body:"开户用户:"+evt.data.split("|")[0]+";手机号码:"+evt.data.split("|")[1],
 requireInteraction:true
 });
 notification.onclick = function(){
 window.open("http://www.zjjz999.com/admin/review/?smem="+evt.data.split("|")[1])
 }
 }
 initws();

 })();
 */
/* execute js */
//remove applicant
$.removeAppt();
//reviewUser
$.reviewUser();
//view users imgs
$.viewUserImgs();
//submit review
$.submitReview();
//view next applicant
$.reviewNext();
//get captcha
$.getCaptcha(".ccha");
//admin remove
$.adminremoveAppt();
//admin review
$.adminReview();
