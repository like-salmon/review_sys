#!/usr/bin/env python
#coding:utf-8

import os
from template import wmodules

#tornado setting
if os.name == "nt":
    rpath = "\\".join(os.path.dirname(__file__).split("\\")[0:len(os.path.dirname(__file__).split("\\")) - 1])
else:
    rpath = "/".join(os.path.dirname(__file__).split("/")[0:len(os.path.dirname(__file__).split("/")) - 1])

websettings={
"template_path": os.path.join(os.path.dirname(__file__), "../template"),
"static_path": os.path.join(os.path.dirname(__file__), "../static"),
"root_path":"/www/zhongjinjujin/",
"cookie_secret": "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
"xsrf_cookies": True,
"login_url": "/zxgjAdmin",
#"ui_modules": wmodules,
"debug":False
#"compiled_template_cache":True,
#"static_hash_cache":True
}

#mysql settings
dbsettings={
"host":'localhost',
'port':3306,
'user':'root',
'db':'zxgj',
#'passwd':"080826@zxgj"
'passwd':"zxgj0313"
}

#栢世嘉相关设置
bsjsettings = {
    'ac_prefix':'1180010001',
    'wsdlpath':'file:///F://mywork//zhongjinjujin//script//TradeCenter.xml',
    'lwsdlpath':'file:///www/zhongjinjujin/script/TradeCenter.xml',#linux path
    'apilink':"https://pstrade.pspme.cn/Service/TradeCenter.asmx?WSDL",
    'groupsId':"24",
    'admins':["admin","pspme"]
}

#mail settings
mailsettings={
    'mfrom':"service@dianxi999.com",
    'mpwd': "Server999",
    'msubj': "栢世嘉用户注册",
    'mserver': 'smtp.mxhichina.com',
    'lmpath':websettings["template_path"]+"/reg_mail.txt",
    'wmpath':"F:\\mywork\\zhongjinjujin\\template\\reg_mail.txt",
    'lnpath': websettings["template_path"] + "/notify_mail.txt",
    'wnpath': "F:\\mywork\\zhongjinjujin\\template\\notify_mail.txt",
    'mto':'keke323750@qq.com',
    'mtotest': ['simon110529@hotmail.com','517908183@qq.com'],
    'checker':['settlement@pspme.cn','dealingroom@pspme.cn'],
    'notifiees':['1466145008@qq.com','1126982522@qq.com']
}

#栢世嘉管理员用户
admins = {
    'au_name':"admin",
    'au_pwd':'123456'
}
#日志模块
ls ={
    "path":"/www/zhongjinjujin/config/loggingsettings.json",
    "wpath":"F:\\mywork\\zhongjinjujin\\config\\loggingsettings.json"
}
