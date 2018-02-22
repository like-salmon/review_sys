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
"debug":False,
"autoreload":True,
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
    'apilink':"https://trade.pspme.cn/API/TradeCenter.asmx?WSDL",
    'groupsId':"24"
}

#mail settings
mailsettings={
    'mfrom':"service@dianxi999.com",
    'mpwd': "Server999",
    'msubj': "栢世嘉用户注册",
    'mserver': 'smtp.mxhichina.com',
    #'mserver':'smtpdm.aliyun.com',
    'lmpath':websettings["template_path"]+"/reg_mail.txt",
    'wmpath':"F:\\mywork\\zhongjinjujin\\template\\reg_mail.txt",
    'mto':'keke323750@qq.com',
    'mtotest': ['simon110529@hotmail.com','517908183@qq.com'],
    'checker':['settlement@pspme.cn','dealingroom@pspme.cn']
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
