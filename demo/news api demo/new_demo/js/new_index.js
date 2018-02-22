$(document).ready(function () {
	
    //jQuery.cssProps.opacity = 'opacity';   
    //初始化
    //时间按钮绑定事件
	connect_News();
	
});
var ws_News = null;
//连接服务器
function connect_News() {
    var con = 'wss://demo.pspme.cn:4991/CN';
   
    if (con != "") {
        try {
            if ("WebSocket" in window) {
                ws_News = new WebSocket(con);
            }
            else if ("MozWebSocket" in window) {
                ws_News = new MozWebSocket(con);
            }
            else {

            }
        } catch (ex) {
            setTimeout(connect_News, 5000);
        }
        if (ws_News != null) {
            $("#NewsTable").html("");
            ws_News.onopen = onOpen_News;
            ws_News.onmessage = onMessage_News;
            ws_News.onclose = onClose_News;
            ws_News.onerror = onError_News;
        }
    }
}



//打开链接时触发的事件
function onOpen_News() {
    sentMsg_News();
};

//接受消息
function onMessage_News(event) {
	
    if (event.data != "") {
    	
    	var tbody = "";
    	
    	document.getElementById("sjjz").style.display = "none"; 
    	
    	 var obj = eval(event.data);
    	 var i = 0;
    	 $.each(obj, function (n, value) {
             var trs = "";
             trs += "<tr><td style='width: 20%;'><a href='/index.php/article/show_new/id/"+ value.ID +"html' style='color: #294877;'>" + value.Time + "</a></td> <td><a href='/index.php/article/show_new/id/"+ value.ID+"html' style='color: #294877;'>" + value.Title + "</a></td></tr>";
             tbody += trs;
             i = i+1;
         });
    	 if($("#new_three tr").length==8){
    		 for(var z=0;z<i;z++)
    			 {
    			 $("#new_three").find("tr").last().remove();
    			 }
    		 
    	 }
    	 $("#new_three").prepend(tbody);
    	 
    	
    }
};

// 向服务端发送消息  
function sentMsg_News() {
    if (ws_News != null) {
        var message = "{'COMMAND':'News','Num':'8'}";
        ws_News.send(message);

    } else {
        //alert('WebSocket Connection Not Established, Please Connect.');
    }

}

//关闭链接时触发的事件
function onClose_News() {
    setTimeout(connect_News, 5000);
};

//当服务器挂掉了，会触发该事件
function onError_News() {
    //alert("News Server Error!");
};


// 关闭WebSocket连接  
function disconnect_News() {
    if (ws_News != null) {
        ws_News.close();
        ws_News = null;
    }
}
