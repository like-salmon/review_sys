$(document).ready(function () {

    //jQuery.cssProps.opacity = 'opacity';   
    //初始化
    //时间按钮绑定事件
	connect();

});


function connect() {
    var con = 'ws://121.14.7.144:4959/';
    if (con != "") {
        try {
            if ("WebSocket" in window) {
                ws1 = new WebSocket(con);

            }
            else if ("MozWebSocket" in window) {
                ws1 = new MozWebSocket(con);

            }
            else {
            	 ws1 = new MozWebSocket(con);
            }
        } catch (ex) {
        	
            setTimeout(connect, 5000);
        }
        if (ws1 != null) {
        	ws1.onopen = onOpen_one;
            ws1.onmessage = onMessage;
            ws1.onclose = onClose_one;
            ws1.onerror = onError_one; 
        }
    }
}

function connect_tow() {
    var con = 'ws://121.14.7.144:4958/';
    if (con != "") {
        try {
            if ("WebSocket" in window) {
                ws = new WebSocket(con);
               
            }
            else if ("MozWebSocket" in window) {
                ws = new MozWebSocket(con);
                
            }
            else {
            	$("#TimeLi").removeAttr("style");
                UpdatePrice();
                GetDayHighLow();
            }
        } catch (ex) {
        	
            setTimeout(connect_tow, 5000);
        }
        if (ws != null) {
        	ws.onopen = onOpen;
            ws.onmessage = onMessage_tow;
            ws.onclose = onClose;
            ws.onerror = onError; 
        }
    }
}

//接受消息
function onMessage_tow(event) {
    var str = [];
    if (event.data != "") {
    	
    	var ldj=event.data.match(/LLSUSD\)(.*?)\(/g);
    	if(ldj)
    	{}else
    	{
    		var ldj=event.data.match(/LLSUSD\)(.*?)\//g);
    	}
    	if(ldj)
    	{
    		var ldj = ldj[0].match(/\d+\.?\d*/g)
    		var ldj_new = parseFloat(ldj[0]);
    		var ldj_top = parseFloat(ldj[1]);
    		var ldj_low = parseFloat(ldj[2]);
    		var ldj_open = parseFloat(ldj[3]);
    		var ldj_close = parseFloat(ldj[4]);
    		
    		var ldj_new_s = document.getElementById('ldj_new_s').value;
    		if(ldj_new_s!=0)
    		{
    			if(ldj_new_s<ldj_new)
    			{
    				document.getElementById("ldj_new_one").className = 'green';
    			}else
    			{
    				document.getElementById("ldj_new_one").className = 'red';
    			}
    		}
    		document.getElementById('ldj_new_s').value = ldj_new;
    		document.getElementById("ldj_new").innerHTML =ldj_new.toFixed(3);
    		document.getElementById("ldj_new_one").innerHTML =ldj_new.toFixed(3);
    		
    		document.getElementById("ldj_top").innerHTML =ldj_top.toFixed(3);
    		document.getElementById("ldj_low").innerHTML =ldj_low.toFixed(3);
    		document.getElementById("ldj_open").innerHTML =ldj_open.toFixed(3);
    		document.getElementById("ldj_close").innerHTML =ldj_close.toFixed(3);
    	}
    	
    	var xhby=event.data.match(/SILRMB\)(.*?)\(/g);
    	if(xhby)
    	{}else
    	{
    		var xhby=event.data.match(/SILRMB\)(.*?)\//g);
    	}
    	if(xhby)
    	{
    		var xhby = xhby[0].match(/\d+\.?\d*/g)
    		var xhby_new = parseFloat(xhby[0]);
    		var xhby_top = parseFloat(xhby[1]);
    		var xhby_low = parseFloat(xhby[2]);
    		var xhby_open = parseFloat(xhby[3]);
    		var xhby_close = parseFloat(xhby[4]);
    		
    		var xhby_new_s = document.getElementById('xhby_new_s').value;
    		if(xhby_new_s!=0)
    		{
    			if(xhby_new_s<xhby_new)
    			{
    				document.getElementById("xhby_new_one").className = 'green';
    			}else
    			{
    				document.getElementById("xhby_new_one").className = 'red';
    			}
    		}
    		document.getElementById('xhby_new_s').value = xhby_new;
    		document.getElementById("xhby_new").innerHTML =xhby_new.toFixed(2);
    		document.getElementById("xhby_new_one").innerHTML =xhby_new.toFixed(2);
    		
    		document.getElementById("xhby_top").innerHTML =xhby_top.toFixed(2);
    		document.getElementById("xhby_low").innerHTML =xhby_low.toFixed(2);
    		document.getElementById("xhby_open").innerHTML =xhby_open.toFixed(2);
    		document.getElementById("xhby_close").innerHTML =xhby_close.toFixed(2);
    	}
    }
}
//打开链接时触发的事件
function onOpen() {
    sentMsg();
};
//打开链接时触发的事件
function onOpen_one() {
    sentMsg_one();
};
//接受消息
//接受消息
function onMessage(event) {
    var str = [];
    if (event.data != "") {
    	
        var currencyProduct_id = $("#productselect option:selected").val();
    	
        
        
    	var oyry=event.data.match(/EURJPY\)(.*?)\(/g);
    	if(oyry)
    	{}else
    	{
    		var oyry=event.data.match(/EURJPY\)(.*?)\//g);
    	}
    	if(oyry)
    	{
    	var oyry111 = oyry[0].match(/-\d+(\.\d+)?/g);
	    var oyry = oyry[0].match(/\d+(\.\d+)?/g);
	    var oyry_up_s = oyry[2];
	    var oyry_down_s = document.getElementById("oyry_down_s").value;
	    if(oyry111)
	    {
	    	document.getElementById("oyry_up").className = 'down';
    		document.getElementById("oyry_down").className = 'down';
	    }else
    	{
    		
    		document.getElementById("oyry_up").className = 'up';
	    	document.getElementById("oyry_down").className = 'up';
    	}
	    document.getElementById('oyry_up_s').value = oyry[0];
	    document.getElementById("oyry_down_s").value = oyry[1];
	    document.getElementById("oyry_up").innerHTML =oyry[0];
	    document.getElementById("oyry_down").innerHTML =oyry[1];

    	}
    	
    	var oyrl=event.data.match(/EURCHF\)(.*?)\(/g);
    	if(oyrl)
    	{}else
    	{
    		var oyrl=event.data.match(/EURCHF\)(.*?)\//g);
    	}
    	if(oyrl)
    	{
    		var oyrl111 = oyrl[0].match(/-\d+(\.\d+)?/g);
	    var oyrl = oyrl[0].match(/\d+(\.\d+)?/g);
	    var oyrl_up_s = oyrl[2];
	    var oyrl_down_s = document.getElementById("oyrl_down_s").value;
	    if(oyrl111)
	    {
	    	document.getElementById("oyrl_up").className = 'down';
    		document.getElementById("oyrl_down").className = 'down';
	    	
	    	
	    }else
    	{
	    	document.getElementById("oyrl_up").className = 'up';
	    	document.getElementById("oyrl_down").className = 'up';
    		
    	}	   
	    document.getElementById('oyrl_up_s').value = oyrl[0];
	    document.getElementById("oyrl_down_s").value = oyrl[1];
	    document.getElementById("oyrl_up").innerHTML =oyrl[0];
	    document.getElementById("oyrl_down").innerHTML =oyrl[1];
    	}
    	
    	var oyyb=event.data.match(/EURGBP\)(.*?)\(/g);
    	if(oyyb)
    	{}else
    	{
    		var oyyb=event.data.match(/EURGBP\)(.*?)\//g);
    	}
    	if(oyyb)
    	{
    		var oyyb111 = oyyb[0].match(/-\d+(\.\d+)?/g);
	    var oyyb = oyyb[0].match(/\d+(\.\d+)?/g);
	    var oyyb_up_s = oyyb[2];
	    var oyyb_down_s = document.getElementById("oyyb_down_s").value;
	    if(oyyb111)
	    {
	    	document.getElementById("oyyb_up").className = 'down';
    		document.getElementById("oyyb_down").className = 'down';
	    	
	    	
	    }
	    else
    	{
	    	document.getElementById("oyyb_up").className = 'up';
	    	document.getElementById("oyyb_down").className = 'up';
    	}
	    document.getElementById('oyyb_up_s').value = oyyb[0];
	    document.getElementById("oyyb_down_s").value = oyyb[1];
	    document.getElementById("oyyb_up").innerHTML =oyyb[0];
	    document.getElementById("oyyb_down").innerHTML =oyyb[1];
    	}
    	
    	var ybry=event.data.match(/GBPJPY\)(.*?)\(/g);
    	if(ybry)
    	{}else
    	{
    		var ybry=event.data.match(/GBPJPY\)(.*?)\//g);
    	}
    	if(ybry)
    	{
    		var ybry111 = ybry[0].match(/-\d+(\.\d+)?/g);
	    var ybry = ybry[0].match(/\d+(\.\d+)?/g);
	    var ybry_up_s = ybry[2];
	    var ybry_down_s = document.getElementById("ybry_down_s").value;
	    if(ybry111)
	    {
	    	document.getElementById("ybry_up").className = 'down';
    		document.getElementById("ybry_down").className = 'down';
	    	
	    }else
    	{
	    	document.getElementById("ybry_up").className = 'up';
	    	document.getElementById("ybry_down").className = 'up';
    	}
	    document.getElementById('ybry_up_s').value = ybry[0];
	    document.getElementById("ybry_down_s").value = ybry[1];
	    document.getElementById("ybry_up").innerHTML =ybry[0];
	    document.getElementById("ybry_down").innerHTML =ybry[1];
    	}
    	
    	
    	var ybrl=event.data.match(/GBPCHF\)(.*?)\(/g);
    	if(ybrl)
    	{}else
    	{
    		var ybrl=event.data.match(/GBPCHF\)(.*?)\//g);
    	}
    	if(ybrl)
    	{
    		var ybrl111 = ybrl[0].match(/-\d+(\.\d+)?/g);
	    var ybrl = ybrl[0].match(/\d+(\.\d+)?/g);
	    var ybrl_up_s = ybrl[2];
	    var ybrl_down_s = document.getElementById("ybrl_down_s").value;
	    if(ybrl111)
	    {
	    	document.getElementById("ybrl_up").className = 'down';
    		document.getElementById("ybrl_down").className = 'down';
	    }
	    else
    	{
    		
    		document.getElementById("ybrl_up").className = 'up';
	    	document.getElementById("ybrl_down").className = 'up';
    	}
	    
	    document.getElementById('ybrl_up_s').value = ybrl[0];
	    document.getElementById("ybrl_down_s").value = ybrl[1];
	    document.getElementById("ybrl_up").innerHTML =ybrl[0];
	    document.getElementById("ybrl_down").innerHTML =ybrl[1];
    	}
    	
    	var ayry=event.data.match(/AUDJPY\)(.*?)\(/g);
    	if(ayry)
    	{}else
    	{
    		var ayry=event.data.match(/AUDJPY\)(.*?)\//g);
    	}
    	if(ayry)
    	{
    		var ayry111 = ayry[0].match(/-\d+(\.\d+)?/g);
	    var ayry = ayry[0].match(/\d+(\.\d+)?/g);
	    var ayry_up_s = ayry[2];
	    var ayry_down_s = document.getElementById("ayry_down_s").value;
	    if(ayry111)
	    {
	    	document.getElementById("ayry_up").className = 'down';
    		document.getElementById("ayry_down").className = 'down';
	    }else
    	{
    		
    		document.getElementById("ayry_up").className = 'up';
	    	document.getElementById("ayry_down").className = 'up';
    	}
	    document.getElementById('ayry_up_s').value = ayry[0];
	    document.getElementById("ayry_down_s").value = ayry[1];
	    document.getElementById("ayry_up").innerHTML =ayry[0];
	    document.getElementById("ayry_down").innerHTML =ayry[1];
    	}
    	
    	var nymy=event.data.match(/NZDUSD\)(.*?)\(/g);
    	if(nymy)
    	{}else
    	{
    		var nymy=event.data.match(/NZDUSD\)(.*?)\//g);
    	}
    	if(nymy)
    	{
    		var nymy111 = nymy[0].match(/-\d+(\.\d+)?/g);
	    var nymy = nymy[0].match(/\d+(\.\d+)?/g);
	    var nymy_up_s = nymy[2];
	    var nymy_down_s = document.getElementById("nymy_down_s").value;
	    if(nymy111)
	    {
	    	document.getElementById("nymy_up").className = 'down';
    		document.getElementById("nymy_down").className = 'down';
	    }else
    	{
    		
    		document.getElementById("nymy_up").className = 'up';
	    	document.getElementById("nymy_down").className = 'up';
    	}
	    document.getElementById('nymy_up_s').value = nymy[0];
	    document.getElementById("nymy_down_s").value = nymy[1];
	    document.getElementById("nymy_up").innerHTML =nymy[0];
	    document.getElementById("nymy_down").innerHTML =nymy[1];
    	}
    	
    	var ayny=event.data.match(/AUDNZD\)(.*?)\(/g);
    	if(ayny)
    	{}else
    	{
    		var ayny=event.data.match(/AUDNZD\)(.*?)\//g);
    	}
    	if(ayny)
    	{
    		var ayny111 = ayny[0].match(/-\d+(\.\d+)?/g);
	    var ayny = ayny[0].match(/\d+(\.\d+)?/g);
	    var ayny_up_s = ayny[2];
	    var ayny_down_s = document.getElementById("ayny_down_s").value;
	    if(ayny111)
	    {
	    	document.getElementById("ayny_up").className = 'down';
    		document.getElementById("ayny_down").className = 'down';
	    }else
    	{
    		document.getElementById("ayny_up").className = 'up';
	    	document.getElementById("ayny_down").className = 'up';
    	}
	    
	    document.getElementById('ayny_up_s').value = ayny[0];
	    document.getElementById("ayny_down_s").value = ayny[1];
	    document.getElementById("ayny_up").innerHTML =ayny[0];
	    document.getElementById("ayny_down").innerHTML =ayny[1];
    	}
    	var rmbmy=event.data.match(/USDCNH\)(.*?)\(/g);
    	if(rmbmy)
    	{}else
    	{
    		var rmbmy=event.data.match(/USDCNH\)(.*?)\//g);
    	}
    	if(rmbmy)
    	{
    		var rmbmy111 = rmbmy[0].match(/-\d+(\.\d+)?/g);
	    var rmbmy = rmbmy[0].match(/\d+(\.\d+)?/g);
	    var rmbmy_up_s = rmbmy[2];
	    var rmbmy_down_s = document.getElementById("rmbmy_down_s").value;
	    if(rmbmy111)
	    {
	    	document.getElementById("rmbmy_up").className = 'down';
    		document.getElementById("rmbmy_down").className = 'down';
	    }else
    	{
    		
    		document.getElementById("rmbmy_up").className = 'up';
	    	document.getElementById("rmbmy_down").className = 'up';
    	}
	    
	    document.getElementById('rmbmy_up_s').value = rmbmy[0];
	    document.getElementById("rmbmy_down_s").value = rmbmy[1];
	    document.getElementById("rmbmy_up").innerHTML =rmbmy[0];
	    document.getElementById("rmbmy_down").innerHTML =rmbmy[1];
    	}
    	var hszs=event.data.match(/HSI\)(.*?)\(/g);
    	if(hszs)
    	{}else
    	{
    		var hszs=event.data.match(/HSI\)(.*?)\//g);
    	}
    	if(hszs)
    	{
    		//document.getElementById("hszs_up").innerHTML =hszs;
		var hszs111 = hszs[0].match(/-\d+(\.\d+)?/g);
	    var hszs = hszs[0].match(/\d+(\.\d+)?/g);
	    var hszs_up_s = document.getElementById('hszs_up_s').value;
	    
	    	if(hszs111)
	    	{
	    		document.getElementById("hszs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("hszs_down").className = 'up';
	    	}
	    
	    document.getElementById('hszs_up_s').value = hszs[0];
	    document.getElementById("hszs_up").innerHTML =hszs[0];
	    document.getElementById("hszs_down").innerHTML =hszs[1];
    	}
    	
    	var hsgqzs=event.data.match(/HSCE\)(.*?)\(/g);
    	if(hsgqzs)
    	{}else
    	{
    		var hsgqzs=event.data.match(/HSCE\)(.*?)\//g);
    	}
    	if(hsgqzs)
    	{
    		//document.getElementById("hsgqzs_up").innerHTML =hsgqzs;
		var hsgqzs111 = hsgqzs[0].match(/-\d+(\.\d+)?/g);
	    var hsgqzs = hsgqzs[0].match(/\d+(\.\d+)?/g);
	    var hsgqzs_up_s = document.getElementById('hsgqzs_up_s').value;
	    
	    	if(hsgqzs111)
	    	{
	    		document.getElementById("hsgqzs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("hsgqzs_down").className = 'up';
	    	}
	    
	    document.getElementById('hsgqzs_up_s').value = hsgqzs[0];
	   document.getElementById("hsgqzs_up").innerHTML =hsgqzs[0];
	    document.getElementById("hsgqzs_down").innerHTML =hsgqzs[1];
    	}
    	
    	var djrjzs=event.data.match(/Nikkei\)(.*?)\(/g);
    	if(djrjzs)
    	{}else
    	{
    		var djrjzs=event.data.match(/Nikkei\)(.*?)\//g);
    	}
    	if(djrjzs)
    	{
		var djrjzs111 = djrjzs[0].match(/-\d+(\.\d+)?/g);
	    var djrjzs = djrjzs[0].match(/\d+(\.\d+)?/g);
	    var djrjzs_up_s = document.getElementById('djrjzs_up_s').value;
	    
	    	if(djrjzs111)
	    	{
	    		document.getElementById("djrjzs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("djrjzs_down").className = 'up';
	    	}
	    
	    document.getElementById('djrjzs_up_s').value = djrjzs[0];
	    document.getElementById("djrjzs_up").innerHTML =djrjzs[0];
	    document.getElementById("djrjzs_down").innerHTML =djrjzs[1];
    	}
    	
    	var djrjqh=event.data.match(/Nikkei Future\)(.*?)\(/g);
    	if(djrjqh)
    	{}else
    	{
    		var djrjqh=event.data.match(/Nikkei Future\)(.*?)\//g);
    	}
    	if(djrjqh)
    	{
		var djrjqh111 = djrjqh[0].match(/-\d+(\.\d+)?/g);
	    var djrjqh = djrjqh[0].match(/\d+(\.\d+)?/g);
	    var djrjqh_up_s = document.getElementById('djrjqh_up_s').value;
	    
	    	if(djrjqh111)
	    	{
	    		document.getElementById("djrjqh_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("djrjqh_down").className = 'up';
	    	}
	    
	    document.getElementById('djrjqh_up_s').value = djrjqh[0];
	    document.getElementById("djrjqh_up").innerHTML =djrjqh[0];
	    document.getElementById("djrjqh_down").innerHTML =djrjqh[1];
    	}
    	
    	var shagzs=event.data.match(/SSEC\)(.*?)\(/g);
    	if(shagzs)
    	{}else
    	{
    		var shagzs=event.data.match(/SSEC\)(.*?)\//g);
    	}
    	if(shagzs)
    	{
		var shagzs111 = shagzs[0].match(/-\d+(\.\d+)?/g);
	    var shagzs = shagzs[0].match(/\d+(\.\d+)?/g);
	    var shagzs_up_s = document.getElementById('shagzs_up_s').value;
	    
	    	if(shagzs111)
	    	{
	    		document.getElementById("shagzs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("shagzs_down").className = 'up';
	    	}
	    
	    document.getElementById('shagzs_up_s').value = shagzs[0];
	    document.getElementById("shagzs_up").innerHTML =shagzs[0];
	    document.getElementById("shagzs_down").innerHTML =shagzs[1];
    	}
    	
    	var szzhzs=event.data.match(/SGXA50\)(.*?)\(/g);
    	if(szzhzs)
    	{}else
    	{
    		var szzhzs=event.data.match(/SGXA50\)(.*?)\//g);
    	}
    	if(szzhzs)
    	{
		var szzhzs111 = szzhzs[0].match(/-\d+(\.\d+)?/g);
	    var szzhzs = szzhzs[0].match(/\d+(\.\d+)?/g);
	    var szzhzs_up_s = document.getElementById('szzhzs_up_s').value;
	    
	    	if(szzhzs111)
	    	{
	    		document.getElementById("szzhzs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("szzhzs_down").className = 'up';
	    	}
	    
	    document.getElementById('szzhzs_up_s').value = szzhzs[1];
	    document.getElementById("szzhzs_up").innerHTML =szzhzs[1];
	    document.getElementById("szzhzs_down").innerHTML =szzhzs[2];
    	}
    	
    	var dbjqzs=event.data.match(/Taiwan\)(.*?)\(/g);
    	if(dbjqzs)
    	{}else
    	{
    		var dbjqzs=event.data.match(/Taiwan\)(.*?)\//g);
    	}
    	if(dbjqzs)
    	{
		var dbjqzs111 = dbjqzs[0].match(/-\d+(\.\d+)?/g);
	    var dbjqzs = dbjqzs[0].match(/\d+(\.\d+)?/g);
	    var dbjqzs_up_s = document.getElementById('dbjqzs_up_s').value;
	   
	    	if(dbjqzs111)
	    	{
	    		document.getElementById("dbjqzs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("dbjqzs_down").className = 'up';
	    	}
	    
	    document.getElementById('dbjqzs_up_s').value = dbjqzs[0];
	    document.getElementById("dbjqzs_up").innerHTML =dbjqzs[0];
	    document.getElementById("dbjqzs_down").innerHTML =dbjqzs[1];
    	}
    	
    	var dgdaxzs=event.data.match(/DAX\)(.*?)\(/g);
    	if(dgdaxzs)
    	{}else
    	{
    		var dgdaxzs=event.data.match(/DAX\)(.*?)\//g);
    	}
    	if(dgdaxzs)
    	{
		var dgdaxzs111 = dgdaxzs[0].match(/-\d+(\.\d+)?/g);
	    var dgdaxzs = dgdaxzs[0].match(/\d+(\.\d+)?/g);
	    
	    
	    	if(dgdaxzs111)
	    	{
	    		
	    		document.getElementById("dgdaxtzs_down").className = 'down';
	    		
	    	}else
	    	{
	    		
	    		document.getElementById("dgdaxtzs_down").className = 'up';
	    	}
	    
	  
	    
	    
	    document.getElementById("dgdaxtzs_up").innerHTML =dgdaxzs[0];
	    document.getElementById("dgdaxtzs_down").innerHTML =dgdaxzs[1];
	    
    	}
    	var dgdaxzsx=event.data.match(/CHINEXTP\)(.*?)\(/g);
    	if(dgdaxzsx)
    	{}else
    	{
    		var dgdaxzsx=event.data.match(/CHINEXTP\)(.*?)\//g);
    	}
    	if(dgdaxzsx)
    	{
		var dgdaxzsx111 = dgdaxzsx[0].match(/-\d+(\.\d+)?/g);
	    var dgdaxzsx = dgdaxzsx[0].match(/\d+(\.\d+)?/g);
	    var dgdaxzsx_up_s = document.getElementById('dgdaxzsx_up_s').value;
	    
	    	if(dgdaxzsx111)
	    	{
	    		document.getElementById("dgdaxzsx_down").className = 'down';
	    		document.getElementById("dgdaxtzs_down").className = 'down';
	    		
	    	}else
	    	{
	    		document.getElementById("dgdaxzsx_down").className = 'up';
	    		document.getElementById("dgdaxtzs_down").className = 'up';
	    	}
	    
	    document.getElementById('dgdaxzsx_up_s').value = dgdaxzsx[0];
	    document.getElementById("dgdaxzsx_up").innerHTML =dgdaxzsx[0];
	    document.getElementById("dgdaxzsx_down").innerHTML =dgdaxzsx[1];


    	}


    	var dszs=event.data.match(/DJ\)(.*?)\(/g);
    	if(dszs)
    	{}else
    	{
    		var dszs=event.data.match(/DJ\)(.*?)\//g);
    	}
    	if(dszs)
    	{
		var dszs111 = dszs[0].match(/-\d+(\.\d+)?/g);
	    var dszs = dszs[0].match(/\d+(\.\d+)?/g);
	    var dszs_up_s = document.getElementById('dszs_up_s').value;
	    
	    	if(dszs111)
	    	{
	    		document.getElementById("dszs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("dszs_down").className = 'up';
	    	}
	    
	    document.getElementById('dszs_up_s').value = dszs[0];
	    document.getElementById("dszs_up").innerHTML =dszs[0];
	    document.getElementById("dszs_down").innerHTML =dszs[1];
    	}
    	
    	var ldfszs=event.data.match(/FTSE\)(.*?)\(/g);
    	if(ldfszs)
    	{}else
    	{
    		var ldfszs=event.data.match(/FTSE\)(.*?)\//g);
    	}
    	if(ldfszs)
    	{
		var ldfszs111 = ldfszs[0].match(/-\d+(\.\d+)?/g);
	    var ldfszs = ldfszs[0].match(/\d+(\.\d+)?/g);
	    var ldfszs_up_s = document.getElementById('ldfszs_up_s').value;
	   
	    	if(ldfszs111)
	    	{
	    		document.getElementById("ldfszs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("ldfszs_down").className = 'up';
	    	}
	    
	    document.getElementById('ldfszs_up_s').value = ldfszs[0];
	    document.getElementById("ldfszs_up").innerHTML =ldfszs[0];
	    document.getElementById("ldfszs_down").innerHTML =ldfszs[1];
    	}

    	var mgamexzs=event.data.match(/AMEX Composite Index\)(.*?)\(/g);
    	if(mgamexzs)
    	{}else
    	{
    		var mgamexzs=event.data.match(/AMEX Composite Index\)(.*?)\//g);
    	}
    	if(mgamexzs)
    	{
		var mgamexzs111 = mgamexzs[0].match(/-\d+(\.\d+)?/g);
	    var mgamexzs = mgamexzs[0].match(/\d+(\.\d+)?/g);
	    var mgamexzs_up_s = document.getElementById('mgamexzs_up_s').value;

	    	if(mgamexzs111)
	    	{
	    		document.getElementById("mgamexzs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("mgamexzs_down").className = 'up';
	    	}
	    
	    document.getElementById('mgamexzs_up_s').value = mgamexzs[0];
	    document.getElementById("mgamexzs_up").innerHTML =mgamexzs[0];
	    document.getElementById("mgamexzs_down").innerHTML =mgamexzs[1];
    	}
    	
    	var bzpszs=event.data.match(/S & P 500\)(.*?)\(/g);
    	if(bzpszs)
    	{}else
    	{
    		var bzpszs=event.data.match(/S & P 500\)(.*?)\//g);
    	}
    	if(bzpszs)
    	{
		var bzpszs111 = bzpszs[0].match(/-\d+(\.\d+)?/g);
	    var bzpszs = bzpszs[0].match(/\d+(\.\d+)?/g);
	    var bzpszs_up_s = document.getElementById('bzpszs_up_s').value;
	    
	    	if(bzpszs111)
	    	{
	    		document.getElementById("bzpszs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("bzpszs_down").className = 'up';
	    	}
	    
	    document.getElementById('bzpszs_up_s').value = bzpszs[0];
	    document.getElementById("bzpszs_up").innerHTML =bzpszs[1];
	    document.getElementById("bzpszs_down").innerHTML =bzpszs[2];
    	}
    	
    	var nsdkzs=event.data.match(/NASDAQ\)(.*?)\(/g);
    	if(nsdkzs)
    	{}else
    	{
    		var nsdkzs=event.data.match(/NASDAQ\)(.*?)\//g);
    	}
    	if(nsdkzs)
    	{
		var nsdkzs111 = nsdkzs[0].match(/-\d+(\.\d+)?/g);
	    var nsdkzs = nsdkzs[0].match(/\d+(\.\d+)?/g);
	    var nsdkzs_up_s = document.getElementById('nsdkzs_up_s').value;
	    
	    	if(nsdkzs111)
	    	{
	    		document.getElementById("nsdkzs_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("nsdkzs_down").className = 'up';
	    	}
	    
	    document.getElementById('nsdkzs_up_s').value = nsdkzs[0];
	    document.getElementById("nsdkzs_up").innerHTML =nsdkzs[0];
	    document.getElementById("nsdkzs_down").innerHTML =nsdkzs[1];
    	}
    	
    	var nyyy=event.data.match(/Crude Oil\)(.*?)\(/g);
    	if(nyyy)
    	{}else
    	{
    		var nyyy=event.data.match(/Crude Oil\)(.*?)\//g);
    	}
    	if(nyyy)
    	{
		var nyyy111 = nyyy[0].match(/-\d+(\.\d+)?/g);
	    var nyyy = nyyy[0].match(/\d+(\.\d+)?/g);
	    var nyyy_up_s = document.getElementById('nyyy_up_s').value;
	    
	    	if(nyyy111)
	    	{
	    		document.getElementById("nyyy_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("nyyy_down").className = 'up';
	    	}
	    
	    document.getElementById('nyyy_up_s').value = nyyy[0];
	    document.getElementById("nyyy_up").innerHTML =nyyy[0];
	    document.getElementById("nyyy_down").innerHTML =nyyy[1];
    	}
    	
    	var mg30ngz=event.data.match(/US30Y-Bond\)(.*?)\(/g);
    	if(mg30ngz)
    	{}else
    	{
    		var mg30ngz=event.data.match(/US30Y-Bond\)(.*?)\//g);
    	}
    	if(mg30ngz)
    	{
		var mg30ngz111 = mg30ngz[0].match(/-\d+(\.\d+)?/g);
	    var mg30ngz = mg30ngz[0].match(/\d+(\.\d+)?/g);
	    var mg30ngz_up_s = document.getElementById('mg30ngz_up_s').value;
	    
	    	if(mg30ngz111)
	    	{
	    		document.getElementById("mg30ngz_down").className = 'down';
	    	}else
	    	{
	    		document.getElementById("mg30ngz_down").className = 'up';
	    	}
	    
	    document.getElementById('mg30ngz_up_s').value = mg30ngz[0];
	    document.getElementById("mg30ngz_up").innerHTML =mg30ngz[1];
	    document.getElementById("mg30ngz_down").innerHTML =mg30ngz[2];
    	}





    	var ldjmyn=event.data.match(/LLGUSD\)(.*?)\(/g);
    	
    	if(ldjmyn)
    	{}else
    	{
    		var ldjmyn=event.data.match(/LLGUSD\)(.*?)\//g);
    	}
    	
    	
    	if(ldjmyn)
    	{
    		var ldjmyn111 = ldjmyn[0].match(/-\d+(\.\d+)?/g);
    		var ldjmyn = ldjmyn[0].match(/\d+(\.\d+)?/g);
    		
    		var ldjmyn_up_s = document.getElementById('ldjmyn_up_s').value;
    	    var ldjmyn_down_s = document.getElementById("ldjmyn_down_s").value;
    	    ldjmyn_up_s = ldjmyn[2];
    	    if(ldjmyn111)
    	    {
    	    	
    	    	document.getElementById("ldjmyn_up").className = 'down';
	    		document.getElementById("ldjmyn_down").className = 'down';
    	    	
    	    }else
	    	{
	    		
	    		document.getElementById("ldjmyn_up").className = 'up';
    	    	document.getElementById("ldjmyn_down").className = 'up';
	    	}
    	    
    	    document.getElementById('ldjmyn_up_s').value = ldjmyn[0];
    	    document.getElementById("ldjmyn_down_s").value = ldjmyn[1];
    	    document.getElementById("ldjmyn_up").innerHTML =ldjmyn[0];
    	    document.getElementById("ldjmyn_down").innerHTML =ldjmyn[1];
    	}
    	
    	var ldymyn=event.data.match(/LLSUSD\)(.*?)\(/g);
    	if(ldymyn)
    	{}else
    	{
    		var ldymyn=event.data.match(/LLSUSD\)(.*?)\//g);
    	}
    	if(ldymyn)
    	{
    		var ldymyn111 = ldymyn[0].match(/-\d+(\.\d+)?/g);
    		var ldymyn = ldymyn[0].match(/\d+(\.\d+)?/g);
    		
    		var ldymyn_up_s = document.getElementById('ldymyn_up_s').value;
    	    var ldymyn_down_s = document.getElementById("ldymyn_down_s").value;
    	    ldymyn_up_s = ldymyn[2];
    	    if(ldymyn111)
    	    {
    	    	document.getElementById("ldymyn_up").className = 'down';
	    		document.getElementById("ldymyn_down").className = 'down';
    	    	
    	    	
    	    }
    	    else
	    	{
    	    	document.getElementById("ldymyn_up").className = 'up';
    	    	document.getElementById("ldymyn_down").className = 'up';
	    	}
    	    document.getElementById('ldymyn_up_s').value = ldymyn[0];
    	    document.getElementById("ldymyn_down_s").value = ldymyn[1];
    	    document.getElementById("ldymyn_up").innerHTML =ldymyn[0];
    	    document.getElementById("ldymyn_down").innerHTML =ldymyn[1];
    	}
    	
    	var gjgyn=event.data.match(/HKGHKD\)(.*?)\(/g);
    	if(gjgyn)
    	{}else
    	{
    		var gjgyn=event.data.match(/HKGHKD\)(.*?)\//g);
    	}
    	if(gjgyn)
    	{
    		var gjgyn111 = gjgyn[0].match(/-\d+(\.\d+)?/g);
    		var gjgyn = gjgyn[0].match(/\d+(\.\d+)?/g);
    		
    		var gjgyn_up_s = document.getElementById('gjgyn_up_s').value;
    	    var gjgyn_down_s = document.getElementById("gjgyn_down_s").value;
    	    gjgyn_up_s = gjgyn[2];
    	    if(gjgyn111)
    	    {
    	    	document.getElementById("gjgyn_up").className = 'down';
	    		document.getElementById("gjgyn_down").className = 'down';
    	    }
    	    else
	    	{
	    		
	    		document.getElementById("gjgyn_up").className = 'up';
    	    	document.getElementById("gjgyn_down").className = 'up';
	    	}
    	    document.getElementById('gjgyn_up_s').value = gjgyn[0];
    	    document.getElementById("gjgyn_down_s").value = gjgyn[1];
    	    document.getElementById("gjgyn_up").innerHTML =gjgyn[0];
    	    document.getElementById("gjgyn_down").innerHTML =gjgyn[1];
    	}
    	var olmyn=event.data.match(/EURUSD\)(.*?)\(/g);
    	if(olmyn)
    	{}else
    	{
    		var olmyn=event.data.match(/EURUSD\)(.*?)\//g);
    	}
    	if(olmyn)
    	{
    		var olmyn111 = olmyn[0].match(/-\d+(\.\d+)?/g);
    		var olmyn = olmyn[0].match(/\d+(\.\d+)?/g);
    		
    		var olmyn_up_s = document.getElementById('olmyn_up_s').value;
    	    var olmyn_down_s = document.getElementById("olmyn_down_s").value;
    	    olmyn_up_s = olmyn[2];
    	    if(olmyn111)
    	    {
    	    	
    	    	document.getElementById("olmyn_up").className = 'down';
	    		document.getElementById("olmyn_down").className = 'down';	
    	    	
    	    }
    	    else
	    	{
	    		
	    		document.getElementById("olmyn_up").className = 'up';
	    		document.getElementById("olmyn_down").className = 'up';
	    	}
    	    document.getElementById('olmyn_up_s').value = olmyn[0];
    	    document.getElementById("olmyn_down_s").value = olmyn[1];
    	    document.getElementById("olmyn_up").innerHTML =olmyn[0];
    	    document.getElementById("olmyn_down").innerHTML =olmyn[1];
    	}
    	
    	var myryn=event.data.match(/USDJPY\)(.*?)\(/g);
    	if(myryn)
    	{}else
    	{
    		var myryn=event.data.match(/USDJPY\)(.*?)\//g);
    	}
    	if(myryn)
    	{
    		var myryn111 = myryn[0].match(/-\d+(\.\d+)?/g);
    		var myryn = myryn[0].match(/\d+(\.\d+)?/g);
    		
    		var myryn_up_s = document.getElementById('myryn_up_s').value;
    	    var myryn_down_s = document.getElementById("myryn_down_s").value;
    	    myryn_up_s = myryn[2];
    	    if(myryn111)
    	    {
    	    	
    	    	document.getElementById("myryn_up").className = 'down';
	    		document.getElementById("myryn_down").className = 'down';
    	    	
    	    }
    	    else
	    	{
	    		
	    		document.getElementById("myryn_up").className = 'up';
    	    	document.getElementById("myryn_down").className = 'up';
	    	}
    	    document.getElementById('myryn_up_s').value = myryn[0];
    	    document.getElementById("myryn_down_s").value = myryn[1];
    	    document.getElementById("myryn_up").innerHTML =myryn[0];
    	    document.getElementById("myryn_down").innerHTML =myryn[1];
    	}
    	var ybmyn=event.data.match(/GBPUSD\)(.*?)\(/g);
    	if(ybmyn)
    	{}else
    	{
    		var ybmyn=event.data.match(/GBPUSD\)(.*?)\//g);
    	}
    	if(ybmyn)
    	{
    		var ybmyn111 = ybmyn[0].match(/-\d+(\.\d+)?/g);
    		var ybmyn = ybmyn[0].match(/\d+(\.\d+)?/g);
    		
    		var ybmyn_up_s = document.getElementById('ybmyn_up_s').value;
    	    var ybmyn_down_s = document.getElementById("ybmyn_down_s").value;
    	    ybmyn_up_s = ybmyn[2];
    	    if(ybmyn111)
    	    {
    	    	document.getElementById("ybmyn_up").className = 'down';
	    		document.getElementById("ybmyn_down").className = 'down';
    	    	
    	    }else
	    	{
	    		
	    		document.getElementById("ybmyn_up").className = 'up';
    	    	document.getElementById("ybmyn_down").className = 'up';
	    	}
    	    document.getElementById('ybmyn_up_s').value = ybmyn[0];
    	    document.getElementById("ybmyn_down_s").value = ybmyn[1];
    	    document.getElementById("ybmyn_up").innerHTML =ybmyn[0];
    	    document.getElementById("ybmyn_down").innerHTML =ybmyn[1];
    	}
    	var myrln=event.data.match(/USDCHF\)(.*?)\(/g);
    	if(myrln)
    	{}else
    	{
    		var myrln=event.data.match(/USDCHF\)(.*?)\//g);
    	}
    	if(myrln)
    	{
    		var myrln111 = myrln[0].match(/-\d+(\.\d+)?/g);
    		var myrln = myrln[0].match(/\d+(\.\d+)?/g);
    		
    		var myrln_up_s = myrln[2];
    	    var myrln_down_s = document.getElementById("myrln_down_s").value;
    	    if(myrln111)
    	    {
    	    	document.getElementById("myrln_up").className = 'down';
	    		document.getElementById("myrln_down").className = 'down';
    	    }else
	    	{
	    		
	    		document.getElementById("myrln_up").className = 'up';
    	    	document.getElementById("myrln_down").className = 'up';
	    	}
    	    document.getElementById('myrln_up_s').value = myrln[0];
    	    document.getElementById("myrln_down_s").value = myrln[1];
    	    document.getElementById("myrln_up").innerHTML =myrln[0];
    	    document.getElementById("myrln_down").innerHTML =myrln[1];
    	}
    	
    	var aymyn=event.data.match(/AUDUSD\)(.*?)\(/g);
    	if(aymyn)
    	{}else
    	{
    		var aymyn=event.data.match(/AUDUSD\)(.*?)\//g);
    	}
    	if(aymyn)
    	{
    		var aymyn111 = aymyn[0].match(/-\d+(\.\d+)?/g);
    		var aymyn = aymyn[0].match(/\d+(\.\d+)?/g);
    		
    		var aymyn_up_s = aymyn[2];
    	    var aymyn_down_s = document.getElementById("aymyn_down_s").value;
    	    if(aymyn111)
    	    {
    	    	document.getElementById("aymyn_up").className = 'down';
	    		document.getElementById("aymyn_down").className = 'down';
    	    }else
	    	{
	    		
	    		document.getElementById("aymyn_up").className = 'up';
    	    	document.getElementById("aymyn_down").className = 'up';
	    	}
    	    document.getElementById('aymyn_up_s').value = aymyn[0];
    	    document.getElementById("aymyn_down_s").value = aymyn[1];
    	    document.getElementById("aymyn_up").innerHTML =aymyn[0];
    	    document.getElementById("aymyn_down").innerHTML =aymyn[1];
    	}
    	
    	var myjyn=event.data.match(/USDCAD\)(.*?)\(/g);
    	if(myjyn)
    	{}else
    	{
    		var myjyn=event.data.match(/USDCAD\)(.*?)\//g);
    	}
    	if(myjyn)
    	{
    		var myjyn111 = myjyn[0].match(/-\d+(\.\d+)?/g);
    		var myjyn = myjyn[0].match(/\d+(\.\d+)?/g);
    		
    		var myjyn_up_s = myjyn[2];
    	    var myjyn_down_s = document.getElementById("myjyn_down_s").value;
    	    if(myjyn111)
    	    {
    	    	document.getElementById("myjyn_up").className = 'down';
	    		document.getElementById("myjyn_down").className = 'down';
    	    }else
	    	{
	    		
	    		document.getElementById("myjyn_up").className = 'up';
    	    	document.getElementById("myjyn_down").className = 'up';
	    	}
    	    document.getElementById('myjyn_up_s').value = myjyn[0];
    	    document.getElementById("myjyn_down_s").value = myjyn[1];
    	    document.getElementById("myjyn_up").innerHTML =myjyn[0];
    	    document.getElementById("myjyn_down").innerHTML =myjyn[1];
    	}
    	var sgy=event.data.match(/SILRMB\)(.*?)\(/g);
    	if(sgy)
    	{}else
    	{
    		var sgy=event.data.match(/SILRMB\)(.*?)\//g);
    	}
    	if(sgy)
    	{
    		var sgy111 = sgy[0].match(/-\d+(\.\d+)?/g);
    		var sgy = sgy[0].match(/\d+(\.\d+)?/g);
    		
    		var sgy_up_s = sgy[2];
    	    var sgy_down_s = document.getElementById("sgy_down_s").value;
    	    if(sgy111)
    	    {
    	    	document.getElementById("sgy_up").className = 'down';
	    		document.getElementById("sgy_down").className = 'down';
    	    		
    	    	
    	    }else
	    	{
	    		
	    		document.getElementById("sgy_up").className = 'up';
	    		document.getElementById("sgy_down").className = 'up';
	    	}
    	    
    	    document.getElementById('sgy_up_s').value = sgy[0];
    	    document.getElementById("sgy_down_s").value = sgy[1];
    	    document.getElementById("sgy_up").innerHTML =sgy[0];
    	    document.getElementById("sgy_down").innerHTML =sgy[1];
    	}
    
    	var sgp=event.data.match(/XPDRMB\)(.*?)\(/g);
    	if(sgp)
    	{}else
    	{
    		var sgp=event.data.match(/XPDRMB\)(.*?)\//g);
    	}
    	if(sgp)
    	{
    		var sgp111 = sgp[0].match(/-\d+(\.\d+)?/g);
    		var sgp = sgp[0].match(/\d+(\.\d+)?/g);
    		
    		var sgp_up_s = sgp[2];
    	    var sgp_down_s = document.getElementById("sgp_down_s").value;
    	    if(sgp111)
    	    {
    	    	document.getElementById("sgp_up").className = 'down';
	    		document.getElementById("sgp_down").className = 'down';	
    	    }
	    	else
	    	{
	    		
	    		document.getElementById("sgp_up").className = 'up';
	    		document.getElementById("sgp_down").className = 'up';
	    	}
    	    
    	    document.getElementById('sgp_up_s').value = sgp[0];
    	    document.getElementById("sgp_down_s").value = sgp[1];
    	    document.getElementById("sgp_up").innerHTML =sgp[0];
    	    document.getElementById("sgp_down").innerHTML =sgp[1];
    	}
    	var sgb=event.data.match(/XPTRMB\)(.*?)\(/g);
    	if(sgb)
    	{}else
    	{
    		var sgb=event.data.match(/XPTRMB\)(.*?)\//g);
    	}
    	if(sgb)
    	{
    		var sgb111 = sgb[0].match(/-\d+(\.\d+)?/g);
    		var sgb = sgb[0].match(/\d+(\.\d+)?/g);
    		
    		var sgb_up_s = sgb[2];
    	    var sgb_down_s = document.getElementById("sgb_down_s").value;
    	    if(sgb111)
    	    {
    	    	
    	    	document.getElementById("sgb_up").className = 'down';
	    		document.getElementById("sgb_down").className = 'down';	
    	    	
    	    }else
	    	{
	    		
	    		document.getElementById("sgb_up").className = 'up';
	    		document.getElementById("sgb_down").className = 'up';
	    	}
    	    document.getElementById('sgb_up_s').value = sgb[0];
    	    document.getElementById("sgb_down_s").value = sgb[1];
    	    document.getElementById("sgb_up").innerHTML =sgb[0];
    	    document.getElementById("sgb_down").innerHTML =sgb[1];
    	}
    	
    	
    	var sgbt=event.data.match(/SHGRMB\)(.*?)\(/g);
    	if(sgbt)
    	{}else
    	{
    		var sgbt=event.data.match(/SHGRMB\)(.*?)\//g);
    	}
    	if(sgbt)
    	{
    		var sgbt111 = sgbt[0].match(/-\d+(\.\d+)?/g);
    		var sgbt = sgbt[0].match(/\d+(\.\d+)?/g);
    		
    		var sgbt_up_s = sgbt[2];
    	    var sgbt_down_s = document.getElementById("sgbt_down_s").value;
    	    if(sgbt111)
    	    {
    	    	
    	    	document.getElementById("sgbt_up").className = 'down';
	    		document.getElementById("sgbt_down").className = 'down';
    	    }
    	    else
	    	{

	    		document.getElementById("sgbt_down").className = 'up';
    	    	document.getElementById("sgbt_up").className = 'up';
	    	}
    	    document.getElementById('sgbt_up_s').value = sgbt[0];
    	    document.getElementById("sgbt_down_s").value = sgbt[1];
    	    document.getElementById("sgbt_up").innerHTML =sgbt[0];
    	    document.getElementById("sgbt_down").innerHTML =sgbt[1];
    	}
    }
};

//向服务端发送消息  
function sentMsg() {
    if (ws != null) {
        var message = "ok";
        ws.send(message);
        setTimeout(sentMsg, 5000);
    } else {
        //alert('WebSocket Connection Not Established, Please Connect.');
    }

}
//向服务端发送消息  
function sentMsg_one() {
    if (ws1 != null) {
        var message = "ok";
        ws1.send(message);
        setTimeout(sentMsg_one, 5000);
    } else {
        //alert('WebSocket Connection Not Established, Please Connect.');
    }

}
//关闭链接时触发的事件
function onClose() {
    setTimeout(connect_tow, 5000);
};

//当服务器挂掉了，会触发该事件
function onError() {
    
    //disconnect();
};
//关闭链接时触发的事件
function onClose_one() {
    setTimeout(connect, 5000);
};

//当服务器挂掉了，会触发该事件
function onError_one() {
    //disconnect();
};

// 关闭WebSocket连接  
function disconnect() {
    if (ws != null) {
        ws.close();
        ws = null;
    }
}


function change_page(id)
{
	if(id==1)
	{
		document.getElementById("page_one").style.display = '';
		document.getElementById("page_tow").style.display = 'none';
	}else
	{
		document.getElementById("page_one").style.display = 'none';
		document.getElementById("page_tow").style.display = '';
	}
}