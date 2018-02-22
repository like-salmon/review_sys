#!/usr/bin/env python
#coding:utf-8

from __future__ import division
import tornado.web,traceback,datetime
from pyquery import PyQuery as pq
import os,re,sys,math,random,json,time,hashlib
from template.wmodules import *
from app.webCaptcha import webCaptcha
from app.BSJsoap import BSJsoap
from tornado.escape import json_decode,json_encode
from tornado import gen
from app.webMail import webMail
from config.settings import *
from app.webUtilities import Utilities,AsyncProcessPostRequest
from tornado.httpclient import AsyncHTTPClient
from config.settings import bsjsettings as bs
from suds.client import Client
from xml.dom.minidom import parseString
from tornado.websocket import WebSocketHandler
from tornado.ioloop import PeriodicCallback
from tornado.ioloop import IOLoop
from PIL import Image
#import server

class baseHandler(tornado.web.RequestHandler):
    """intermediary here,processing each request"""
    def __init__(self,application,*args,**kwds):
        tornado.web.RequestHandler.__init__(self,application,*args,**kwds)
        self.path = self.request.uri
        x_real_ip = self.request.headers.get("X-Real-IP")
        self.ua = self.request.headers.get("User-Agent")
        self.remote_ip = x_real_ip or self.request.remote_ip  # when use nginx we get x_real_ip or we just get remote_ip
        sql = "insert into zxgj_visiters (v_path,v_ip,v_ua,v_ing) values(%s,%s,%s,%s)"
        values = (self.path if self.path else "/", self.remote_ip, self.ua,2) if "spider" in self.ua else (self.path if self.path else "/", self.remote_ip, self.ua,1)
        self.db.insertone(sql, values)
        self.isMobile = any([i in self.request.headers.get("User-Agent") for i in ["Android", "iPhone", "Mobile"]])
        self.cck = ""
        if self.path.startswith("/admin") and not self.cck:
            if self.get_current_user():
                self.cck = self.get_current_user()
                self.cunit = self.db.where("a_name = '%s'"%self.cck).getone("select a_unit from zxgj_admin_users")[0].encode("utf8")
                self.isadmin = self.cck in bs["admins"]

    def get_current_user(self):
        """{current_user} in template,request:self.current_user"""
        return self.get_secure_cookie("_u")

    @property
    def db(self):
        return self.application.db

    def write_error(self,status_code,**kwargs):
        if websettings['debug']:
            self.set_header('Content-Type', 'text/plain')
            for line in traceback.format_exception(*kwargs["exc_info"]):
                self.write(line)
            self.finish()
        elif status_code:
            return self.render("error.html",active="index")

class mainHandler(baseHandler):
    def get(self):
        #print self._headers
        if self.isMobile:
            #使用mobile 模板
            pass
            #return self.render("wap/index.html")
        active ="index"
        #get news
        sql = "select * from zxgj_news"
        news = self.db.orderby("n_datetime","desc").limit(5).getmany(sql)
        return self.render("index.html",active=active,news = news)

    def post(self):
        pass

class loginHandler(baseHandler):
    def get(self):
        return self.render("login.html")
    def post(self):
        pass

class regHandler(baseHandler):
    def get(self):
        return self.render("reg.html")
    def post(self):
        pass

#申请开户页面
class applyHandler(baseHandler):
    @gen.coroutine
    @tornado.web.asynchronous
    def get(self):
        """get soap client asynchorously"""
        client = Client(url= bs["wsdlpath"] if os.name == "nt" else bs["lwsdlpath"], location=bs["apilink"], nosend=True)#setting nosend to True makes soapclient request do not send  for further configuration
        context = client.service.GetBanksList()
        url = context.client.location()
        async_httpclient = AsyncHTTPClient()
        try:
            async_httpclient.fetch(url,body=str(context.envelope),method="POST",headers=context.client.headers(),callback = self.blist_response)
        except Exception as e:
            print "encountered error when send soap request to remote server.",e

    def blist_response(self,response):
        imgc = webCaptcha()
        imglist = imgc.saveImg()
        thiscc = imglist[1]  # 当前的验证码
        self.set_secure_cookie("cc", thiscc, 1)
        for node in parseString(str(response.body)).getElementsByTagName('GetBanksListResult'):
            resp1 = node.firstChild.wholeText
        resp1 = '{"title":' + resp1 + '}'
        resp2 = resp1.encode("utf-8").replace("\\", "").replace("：", ":")
        resp3 = json_decode(resp2)
        blist = []
        for i in range(0, len(resp3['title'])):
            if resp3['title'][i]["Status"] == "True":
                blist.append(resp3['title'][i])
        self.render("apply.html", active="apply", cimg=imglist[0], blist=blist)

    @gen.coroutine
    def post(self):
        """when deploy better use nginx loadup modole to lower ram usage"""
        uacc = self.get_argument("account")  # 账号,15位纯数字
        umail = self.get_argument("email")#邮箱
        uname = self.get_argument("name")#用户姓名
        urcode = self.get_argument("rcode","")#推荐人编号
        umobile = self.get_argument("mobile")#手机号码
        uaddr = self.get_argument("addr")#地址
        uidc = self.get_argument("idcard")#身份证号
        ubac = self.get_argument("bac")#银行卡号
        #ubid = self.get_argument("bkid")#所属银行id
        ubid = self.get_argument("hid")#所属银行id
        ubranch = self.get_argument("branch")#分行名称
        uexcur = self.get_argument("excur")#交易货币
        ucc = self.get_argument("captcha").upper()#验证码
        idcf = self.request.files["idcfimg"][0]#身份证正面
        idcr = self.request.files["idcrimg"][0]#身份证背面
        banki = self.request.files["bankimg"][0]#身份证背面
        psimg = self.request.files["posimg"][0]#指定动作照
        #检查当前用户目录是否存在o
        usdir = "static/img/u_acc/"+uacc+"-"+webCaptcha.getRandomNum(12)
        checker = self.get_current_user()
        if not os.path.isdir(usdir):
            os.mkdir(usdir)
        asyncPost = AsyncProcessPostRequest()
        result = yield asyncPost.processUserData(self.db,uacc,umail,uname,urcode,umobile,uaddr,uidc,ubac,ubid,ubranch,uexcur,idcf,idcr,banki,psimg,usdir)
        #print result
        if result:
            udata =uname+"|"+umobile
            #tornado.ioloop.IOLoop.instance().spawn_callback(notificationHandler.notify,udata)     ms data can not share between processes,use mail instead
            """
            msubj = "您收到用户: %s 的开户申请"%uname.encode("utf-8")
            wm = webMail(mailsettings["notifiees"], msubj)
            wm.notifyTemplate((uname.encode("utf-8"),uacc.encode("utf-8"),umobile.encode("utf-8")))
            wm.sendEmail()"""
            #print notificationHandler.notify(udata)
            #print 'test done,took:%f'%(time.time()-stime)
            self.redirect("/applysuccess/?uid="+uacc)
            #return self.render("regsuccess.html",active="index")
        else:
            self.send_error(500)
        # get post data
        #身份证正面照

#admin panel
class adminLoginHandler(baseHandler):
    def get(self):
        if self.get_secure_cookie("_u",""):
            self.redirect("/admin",True)
        imgc = webCaptcha()
        imglist = imgc.saveImg()
        thiscc = imglist[1]  # 当前的验证码
        self.set_secure_cookie("cc",thiscc,expires_days=1)
        return self.render("admin/admin_login.html",acc=imglist[0])

    def post(self):
        amname = self.get_argument("amname","")
        ampwd = self.get_argument("ampwd","")
        md5 = hashlib.md5()
        md5.update(ampwd+"zxgj_admin")
        ampwded = md5.hexdigest()
        sql = "SELECT * FROM zxgj_admin_users"
        where = "a_name = '%s'"%amname
        admin = self.db.where(where).getone(sql)
        if ampwded == admin[3]:
            self.set_secure_cookie("_u", amname)
            next = self.get_argument("next","")
            if next:
                return self.redirect(next)#rediret to the previous url
            self.redirect("/admin",True)
        else:
            self.redirect("/")

class adminRegHandler(baseHandler):
    def get(self):
        if self.get_secure_cookie("_u", ""):#atte
            self.redirect("/admin", True)
        imgc = webCaptcha()
        imglist = imgc.saveImg()
        thiscc = imglist[1]  # 当前的验证码
        self.set_secure_cookie("cc", thiscc, expires_days=1)
        return self.render("admin/admin_reg.html", acc=imglist[0])

    def post(self):
        amname = self.get_argument("amname", "")
        ampwd = self.get_argument("ampwd", "")
        cfpwd = self.get_argument("cfpwd","")
        amunit = self.get_argument("unit","")
        amobile = self.get_argument("mobile","")
        arname = self.get_argument("rname","")
        if cfpwd == ampwd:
            md5 = hashlib.md5()
            md5.update(ampwd + "zxgj_admin")
            ampwded = md5.hexdigest()
            sql = "insert into zxgj_admin_users (a_name,a_realname,a_pwd,a_unit,a_mobile) values(%s,%s,%s,%s,%s)"
            values = (amname,arname,ampwded,amunit,amobile)
            result = self.db.insertone(sql,values)
            if result:
                #self.set_secure_cookie("_u", amname)
                next = self.get_argument("next", "")
                if next:
                    return self.redirect(next)  # rediret to the previous url
                self.redirect("/rasuccess/", True)
            else:
                self.redirect("/")
        else:
            self.send_error(403)

#admin panel
class adminHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        rcondition = "u_Ifreview = '1'"
        sql = "select count(*) from zxgj_users"
        pcondition = "u_Ifreview = '0'"
        reviewed = self.db.where(rcondition).getsum(sql)
        pending = self.db.where(pcondition).getsum(sql)
        return self.render("admin/admin_overview.html",active="index",reviewed = reviewed,pending = pending)

#review applicant
class adminReviewHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        active = "applicant"
        kwds = self.get_argument("smem","").encode("utf8")#unicode to utf8
        offset = int(self.get_argument("offset","1")) - 1
        ifrv = self.get_argument("ifrv","")
        condition = ""
        if not self.isadmin:
            if kwds:  # search user by account or mobile only
                if kwds.isalnum():
                    condition = "u_Account = '%s' or u_Mobile = '%s'" % (kwds,kwds)
                else:
                    condition = "u_RealName = '%s'"%kwds
                if ifrv:
                    condition += " and u_Ifreview = '1' and u_Recommander regexp '^%s'"%self.cunit
                else:
                    condition += " and u_Recommander regexp '^%s'" %self.cunit
            else:
                if ifrv:
                    condition = " u_Ifreview = '1' and u_Recommander regexp '^%s'" %self.cunit
                else:
                    condition = "u_Ifreview = '0' and u_Recommander regexp '^%s'" %self.cunit
        else:
            if kwds:
                if kwds.isalnum():
                    condition = "u_Account = '%s' or u_Mobile = '%s'" % (kwds, kwds)
                else:
                    condition = "u_RealName = '%s'" % kwds
                if ifrv:
                    condition += " and u_Ifreview = '1'"
                else:
                    #condition += " and u_Ifreview = '0'"
                    condition += ""
            else:
                if ifrv:
                    condition = "u_Ifreview = '1'"
                else:
                    condition = "u_Ifreview = '0'"
        #print condition
        sql = "select * from zxgj_users"
        csql = "select count(*) from zxgj_users"
        field = "u_Regtime"
        num = 13
        count = self.db.where(condition).getsum(csql)  # total num of applicants
        if count % num == 0:
            pages = count//num
        else:
            pages = count//num + 1
        applicants = self.db.where(condition).orderby(field, "desc").limit((offset)*13,num).getmany(sql)
        return self.render("admin/admin_applicant.html",users = applicants,active = active,count = count,pages = pages,offset = offset + 1,kwds = kwds,ifrv = ifrv)

class adminReviewedHandler(baseHandler):
    @gen.coroutine
    @tornado.web.asynchronous
    @tornado.web.authenticated
    def get(self):
        tid = self.get_query_argument("tid","")#用户编号
        uacc = self.get_query_argument("uacc","")#用户账号
        uidc = self.get_query_argument("idc","")#用户身份证号
        ubc = self.get_query_argument("bknum","")#用户银行卡号
        umail = self.get_query_argument("umail","")#用户邮箱
        self.tid = tid
        if tid:
            sql = "update zxgj_users set u_Ifreview = '1',u_Account = '%s',u_IDcard = '%s',u_BankCardNumber = '%s',u_Email = '%s',u_Checker = '%s',u_Ving = '0'"%(uacc,uidc,ubc,umail,self.cck)
            condition = "u_Id = "+tid+" and u_Ifreview = '0'"#0 means reviewed.
            result = self.db.where(condition).updateone(sql)
            if result:
                sql = "select * from zxgj_users"
                condition = "u_Id = " + tid + " and u_Ifreview = '1'"
                u = self.db.where(condition).getone(sql)
                client = Client(bs["wsdlpath"] if os.name == "nt" else bs["lwsdlpath"],location=bs["apilink"], nosend=True)
                self.u = u if u else None
                if u:
                    context = client.service.InsertClient(u[1],u[3],u[4],u[2],24,u[6],u[7],u[8],u[9],8,u[3],u[10].split("-")[len(u[10].split("-"))-2],u[11])
                    url = context.client.location()
                    async_httpclient = AsyncHTTPClient()
                    try:
                        async_httpclient.fetch(url, body=str(context.envelope), method="POST",headers=context.client.headers(), callback=self.useradd_resposne)
                    except Exception as e:
                        sql = "update zxgj_users set u_Ifreview = '0',u_Memo = '%s'" %str(e)
                        condition = "u_Id = " + tid + " and u_Ifreview = '1'"
                        self.db.where(condition).updateone(sql)
                        print "encountered error when insert user into remote server",e
                else:
                    sql = "update zxgj_users set u_Ifreview = '0',u_Memo = '提交用户数据到数据库失败'"
                    condition = "u_Id = " + tid + " and u_Ifreview = '1'"
                    self.db.where(condition).updateone(sql)
                    self.finish(json_encode({"rdrs": 0})) #fail to review
            else:
                sql = "update zxgj_users set u_Ifreview = '0',u_Memo = '提交用户数据到数据库失败'"
                condition = "u_Id = " + tid + " and u_Ifreview = '1'"
                self.db.where(condition).updateone(sql)
                self.finish(json_encode({"rdrs": 0}))#fail to review
        else:
            self.send_error(403)
    def useradd_resposne(self,response):
        for node in parseString(str(response.body)).getElementsByTagName('InsertClientResult'):
            resp = node.firstChild.wholeText
        pat = re.compile("<Result>(\d+)<\/Result>")
        rs = int(pat.search(resp).group(1))
        if rs:
            # 正式发送邮件
            u = self.u
            msubj = "栢世嘉用户注册-用户账号:" + u[1].encode("utf-8") + "-ts-" + str(int(time.time()))  # prevent abuse
            wm = webMail(mailsettings["checker"], msubj)
            imgs = [u[13], u[14], u[15], u[16]]
            wm.setTemplate(imgs, u)
            wm.sendEmail()
            self.finish(json_encode({"rdrs": 1}))  # reviewed user
        elif rs == 0:
            sql = "update zxgj_users set u_Ifreview = '0',u_Memo = '%s'" % str(response.body)
            condition = "u_Id = " + self.tid + " and u_Ifreview = '1'"
            self.db.where(condition).updateone(sql)
            self.finish(json_encode({"rdrs": 0}))  # fail to review

class adminReviewApplicationHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        active = "group"
        kwds = self.get_argument("smem", "")
        offset = int(self.get_argument("offset", "1")) - 1
        ifrv = self.get_argument("ifrv", "")
        condition = "a_ifreview = 0"
        if ifrv:
            condition = "a_ifreview = 1"
        sql = "select * from zxgj_admin_users"
        csql = "select count(*) from zxgj_admin_users"
        if kwds:  # search user by account or mobile only
            condition += " and a_name = '%s' OR a_realname = '%s' OR a_mobile = '%s'" % (kwds, kwds, kwds)
        field = "a_regtime"
        num = 13
        count = self.db.where(condition).getsum(csql)  # total num of applicants
        if count % num == 0:
            pages = count // num
        else:
            pages = count // num + 1
        applicants = self.db.where(condition).orderby(field, "desc").limit((offset) * 13, num).getmany(sql)
        return self.render("admin/admin_reviewer_application.html", users=applicants, active=active, count=count, pages=pages,offset=offset + 1, kwds=kwds, ifrv=ifrv)

class adminreviewHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        tid = self.get_argument("tid","")
        sql = "update zxgj_admin_users set a_ifreview = '1'"
        condition = "a_id = '%s' and a_ifreview = 0"%tid
        result = self.db.where(condition).updateone(sql)
        if result:
            self.finish(json_encode({"rdrs": 1}))  # reviewed user
        else:
            self.finish(json_encode({"rdrs": 0}))  # fail to review

#generate captcha
class captchaHandler(baseHandler):
    def get(self):
        """get current timestamp,if abuse then forbid,one ip"""
        tstamp = self.get_argument("tstamp","")
        lstamp = self.get_secure_cookie("ts")#获取上次生成验证的时间
        if not lstamp:
            self.set_secure_cookie("ts",tstamp,2)
            imgc = webCaptcha()
            imglist = imgc.saveImg()
            thiscc = imglist[1]  # 当前验证码
            self.set_secure_cookie("cc", thiscc, 1)
            imgjson = json.dumps({"imgsrc": imglist[0]})
            return self.write(imgjson)
        else:
            self.set_secure_cookie("ts",lstamp+","+tstamp)
            td = [int(i) for i in (lstamp+","+tstamp).split(",")]
        if len(td) >5 and len(td)%2 ==0:
            diff = reduce(lambda x,y:y-x,td)
            if diff<3000:
                self.set_secure_cookie("ts",tstamp,2)
                imgc = webCaptcha()
                imglist = imgc.saveImg()
                thiscc = imglist[1]  # 当前验证码
                self.set_secure_cookie("cc", thiscc, 1)
                #imgjson = json.dumps({"imgsrc": imglist[0],"cre":1})
                return self.write(json.dumps({"tscre":{"imgsrc": imglist[0],"cre":1}}))
            else:
                self.set_secure_cookie("ts", tstamp, 2)
                imgc = webCaptcha()
                imglist = imgc.saveImg()
                thiscc = imglist[1]  # 当前验证码
                self.set_secure_cookie("cc", thiscc, 1)
                imgjson = json.dumps({"imgsrc": imglist[0]})
                return self.write(imgjson)
        else:
            imgc = webCaptcha()
            imglist = imgc.saveImg()
            thiscc = imglist[1]  # 当前验证码
            self.set_secure_cookie("cc", thiscc, 1)
            imgjson = json.dumps({"imgsrc": imglist[0]})
            return self.write(imgjson)

#check  if client exists
class checkClientHandler(baseHandler):
    @gen.coroutine
    @tornado.web.asynchronous
    def get(self):
        cid = self.get_query_argument("cid","")
        cmail = self.get_query_argument("cmail","")
        #print cmail
        #client = BSJsoap()
        client = Client(url=bs["wsdlpath"] if os.name == "nt" else bs["lwsdlpath"],location=bs["apilink"], nosend=True)
        if cid:
            #result = client.checkIfExist(cid)
            context = client.service.CheckClientAccount(cid)
            url = context.client.location()
            async_httpclient = AsyncHTTPClient()
            try:
                async_httpclient.fetch(url, body=str(context.envelope), method="POST", headers=context.client.headers(),callback=self.ifExist_response)
            except Exception as e:
                print "encountered error when check client account in remote server.",e
        elif cmail:
            #result = client.checkEmail(cmail)
            context = client.service.CheckEmail(cmail)
            url = context.client.location()
            async_httpclient = AsyncHTTPClient()
            try:
                async_httpclient.fetch(url, body=str(context.envelope), method="POST", headers=context.client.headers(),callback=self.ifExist_response)
            except Exception as e:
                print "encountered error when check client email in remote server.", e
            #print result
        else:
            self.send_error(403)
    def ifExist_response(self,response):
        """when used in asynchronous programming ,use self.finish instead of self.write"""
        dom = parseString(str(response.body))
        element = dom.getElementsByTagName('CheckEmailResult') if dom.getElementsByTagName('CheckEmailResult') else dom.getElementsByTagName('CheckClientAccountResult')
        for node in element:
            resp = node.firstChild.wholeText
        if resp == "true":
            self.finish(json_encode({"cre": 1}))  # client email exists
        else:
            self.finish(json_encode({"cre": 0}))


#check captcha
class checkCaptchaHandler(baseHandler):
    def get(self):
        cc = self.get_query_argument("cc", "").upper()
        if cc:
            # 验证用户输入的验证码
            ckcc = self.get_secure_cookie("cc").upper()
            if cc != ckcc:
                ccerr = {"cre": 1}
                return self.write(json.dumps(ccerr))
            else:
                cccr = {"cre": 0}
                return self.write(json.dumps(cccr))
        else:
            self.send_error(403)

    def post(self):
        pass

#remove current applicant
class removeHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        tid = self.get_query_argument("tid","")
        path = self.get_query_argument("path", "")
        tpath  = "/www/zhongjinjujin"+path if not os.name =="nt" else "F:\\mywork\\zhongjinjujin"+path.replace("/","\\")
        if tid:
            if not self.isadmin:
                cond = "u_Id = "+tid+" and u_Ifreview = '0' and u_Recommander regexp '^%s'"%self.cunit
            else:
                cond = "u_Id = " + tid + " and u_Ifreview = '0'"
            sql = "delete from zxgj_users"
            result = self.db.where(cond).remove(sql)
            if os.path.exists(tpath):
                map(lambda x:os.remove(tpath+"\\"+x if os.name == "nt" else tpath+"/"+x),os.listdir(tpath))
                os.rmdir(tpath)
            if result:
                self.write(json_encode({"rr":"1"}))#record removed
            else:
                self.write(json_encode({"rr":""}))
        else:
            self.send_error(403)

# admin remove current applicant
class adminRemoveHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        tid = self.get_query_argument("tid", "")
        if tid:
            cond = "a_id = " + tid + " and a_ifreview = 0"
            sql = "delete from zxgj_admin_users"
            result = self.db.where(cond).remove(sql)
            if result:
                self.write(json_encode({"rr": "1"}))  # record removed
            else:
                self.write(json_encode({"rr": ""}))
        else:
            self.send_error(403)
#review current applicant
class rvuserHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        tid = self.get_query_argument("tid","")
        ifrv = self.get_query_argument("ifrv","")
        memo =""
        if tid:
            sql = "select * from zxgj_users"
            if self.isadmin:
                cond = "u_Id = "+tid+" and u_Ifreview = '0'"
                if ifrv:
                    cond = "u_Id = " + tid + " and u_Ifreview = '1'"
            else:
                cond = "u_Id = " + tid + " and u_Ifreview = '0' and u_Recommander regexp '^%s'"%self.cunit
                if ifrv:
                    cond = "u_Id = " + tid + " and u_Ifreview = '1' and u_Recommander regexp '^%s'"%self.cunit
            user = self.db.where(cond).getone(sql)
            if user and user[23] == "1":
                dt = datetime.datetime.strptime(datetime.datetime.fromtimestamp(time.time() - 300).strftime('%Y-%m-%d %H:%M:%S'),'%Y-%m-%d %H:%M:%S')
                if user[22] >= dt:
                    return self.write(json_encode({"ers": 1301,"tid":tid,"cuser":self.cck}))#当前用户正在被审核
            elif not user:
                return self.write(json_encode({"ers":1302,"tid":tid}))#当前审核的用户不存在
            udata = {"rs": {"uid": user[0], "uacc": user[1], "umail": user[2], "uname": user[3], "upwd": user[4],
                            "urcmd": user[5], "mobile": user[6], "uadd": user[7], "idc": user[8], "bknum": user[9],
                            "bank": user[10].split("-")[len(user[10].split("-")) - 1], "branch": user[11],
                            "cr": user[12].split("-")[len(user[12].split("-")) - 1], "idcfimg": user[13],
                            "idcrimg": user[14], "bkimg": user[15], "psimg": user[16], "ifrv": ifrv, "memo": user[20]}}
            if not ifrv:
                usql = "update zxgj_users set u_Ving = '1'"
                ucondition = "u_Id = '%s'" % tid
                self.db.where(ucondition).updateone(usql)
            return self.write(json_encode(udata))
        else:
            return self.send_error(403)

#view next handler
class viewNextHandler(baseHandler):
        @tornado.web.authenticated
        def get(self):
            tid = self.get_query_argument("tid","")#previous id minus 1
            sql = "select * from zxgj_users"
            ifrv = self.get_query_argument("ifrv","")#if reviewed or not
            memo = ""
            if tid:
                if self.isadmin:
                    condition = "u_Id = " + tid + " and u_Ifreview = '0'"
                    if ifrv:
                        condition = "u_Id = "+tid+" and u_Ifreview = '1'"
                else:
                    condition = "u_Id = " + tid + " and u_Ifreview = '0' and u_Recommander regexp '^%s'"%self.cunit
                    if ifrv:
                        condition = "u_Id = " + tid + " and u_Ifreview = '1' and u_Recommander regexp '^%s'"%self.cunit
                #check if this id is available
                result = self.db.where(condition).checkIfExist(sql)
                if result:
                    user = self.db.where(condition).getone(sql)
                else:
                    #fetch many rows and order them then get the first one
                    if self.isadmin:
                        condition = "u_Id < "+tid+" and u_Ifreview = '0'"
                        if ifrv:
                            condition = "u_Id < " + tid + " and u_Ifreview = '1'"
                    else:
                        condition = "u_Id < " + tid + " and u_Ifreview = '0' and u_Recommander regexp '^%s'" % self.cunit
                        if ifrv:
                            condition = "u_Id < " + tid + " and u_Ifreview = '1' and u_Recommander regexp '^%s'" % self.cunit
                    field = "u_Regtime"
                    user = self.db.where(condition).orderby(field,"desc").getone(sql)
                if not user:
                    return self.write(json_encode({"ers":1302,"tid":tid}))#该用户不存在
                elif user and user[23] == "1":
                    dt = datetime.datetime.strptime(datetime.datetime.fromtimestamp(time.time() - 300).strftime('%Y-%m-%d %H:%M:%S'),'%Y-%m-%d %H:%M:%S')
                    if user[22] >= dt:
                        return self.write(json_encode({"ers": 1301,"tid":tid,"cuser":self.cck}))#当前用户正在被审核
                udata = {"rs": {"uid": user[0], "uacc": user[1], "umail": user[2], "uname": user[3], "upwd": user[4],
                                "urcmd": user[5], "mobile": user[6], "uadd": user[7], "idc": user[8], "bknum": user[9],
                                "bank": user[10].split("-")[len(user[10].split("-"))-1], "branch": user[11], "cr": user[12].split("-")[len(user[12].split("-"))-1], "idcfimg": user[13],
                                "idcrimg": user[14], "bkimg": user[15], "psimg": user[16],"ifrv":ifrv,"memo": user[20],"cuser":self.cck}}
                if not ifrv:
                    usql = "update zxgj_users set u_Ving = '1'"
                    ucondition = "u_Id = '%s'" % tid
                    self.db.where(ucondition).updateone(usql)
                return self.write(json_encode(udata))
            else:
                return self.send_error(403)

class blockHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        pass
    def post(self):
        pass

class applySuccessHandler(baseHandler):
    def get(self):
        return self.render("regsuccess.html", active="index")
    def post(self):
        self.send_error(403)

class raSuccessHandler(baseHandler):
    def get(self):
        return self.render("rasuccess.html", active="index")
    def post(self):
        self.send_error(403)

class newsHandler(baseHandler):
    def get(self,tid):
        if tid:
            sql = "select * from zxgj_news"
            condition = "n_id = %s"%tid
            news = self.db.where(condition).getone(sql)
            return self.render("news.html",n=news,active = "index")
        else:
            self.send_error(403)

#buy and sell
class tradeHandler(baseHandler):
    def get(self):
        return self.render("trade.html",active = "index")

#products & service
class serviceHandler(baseHandler):
    def get(self):
        return self.render("service.html",active = "index")

#finance
class financeHandler(baseHandler):
    def get(self):
        return self.render("finance.html",active = "index")

#log out
class quitHandler(baseHandler):
    @tornado.web.authenticated
    def get(self):
        self.clear_cookie("_u")
        self.redirect("/")

class errorHandler(baseHandler):
    def get(self):
        self.render("error.html",active="index")

class testHandler(baseHandler):
    def get(self):
        self.write("test")

class getVisitWebSocket(WebSocketHandler,baseHandler):
    """website live visiting data passes via websocket"""
    waiters = set()
    def open(self):
        self.set_nodelay(True)
        getVisitWebSocket.waiters.add(self)
        self.callback = PeriodicCallback(self.send_resp, 1000)#non blocking
        self.callback.start()
        """prepare data for further usage"""
        #print self.request
        print "ws open"

    def send_resp(self):
        try:
            #lastsec = datetime.datetime.fromtimestamp(time.time() - 1).strftime('%Y-%m-%d %H:%M:%S')  # '2017-05-19 11:38:32'
            sql = "select count(DISTINCT v_ip) from zxgj_visiters"
            condition = "v_ing = '1'"
            num = str(self.db.where(condition).getone(sql)[0])
            for waiter in getVisitWebSocket.waiters:
                try:
                    waiter.write_message(num)
                except Exception as e:
                    print "encountered error when send resp to websocket client"
        except Exception as e:
            print "encountered error when write response to client",e

    def on_message(self, message):
        """retrieve data from database or get data from open function if meets the condition then return data"""
        pass

    def on_close(self):
        getVisitWebSocket.waiters.remove(self)
        self.callback.stop()
        print "ws close"

class heartBeatHandler(WebSocketHandler,baseHandler):
    """heart beat handler to check if user is online"""
    waiters = set()
    def open(self):
        self.set_nodelay(True)
        heartBeatHandler.waiters.add(self)
        self.callback = PeriodicCallback(heartBeatHandler.send_resp, 5000)#non blocking
        self.callback.start()

    def on_message(self, message):
        ts = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')  # clean
        if not "spider" in self.ua:
            sql = "update zxgj_visiters set v_ing = '1',v_ts = '%s'"%ts
            condition = "v_ip = '%s' and v_path = '%s'" % (self.remote_ip,self.path)
            self.db.where(condition).updateone(sql)

    @classmethod
    def send_resp(cls,msg="resp"):#send resp to every client
        for waiter in cls.waiters:
            try:
                waiter.write_message(msg)
            except Exception as e:
                print "encountered error when write resp to fewebsocket clients"

    def on_close(self):
        heartBeatHandler.waiters.remove(self)
        self.callback.stop()
        if not "spider" in self.ua:
            sql = "update zxgj_visiters set v_ing = '0'"
            condition = "v_ip = '%s'"%self.remote_ip
            self.db.where(condition).updateone(sql)

class notificationHandler(WebSocketHandler):
    """this handlers send notification on user posts data to server"""
    waiter = set()
    def open(self):
        notificationHandler.waiter.add(self)
        self.set_nodelay(True)

    @staticmethod
    def notify(*args):
        if args:
            for waiter in notificationHandler.waiter:
                try:
                    waiter.write_message(args[0])
                except Exception as e:
                    print "encountered error when send resp to websocket client"

    def on_message(self, message):
        pass

    def on_close(self):
        notificationHandler.waiter.remove(self)


class jsHeartBeatHandler(baseHandler):
    """for those uas which don't support websocket we use js heart beat to detect if user is online."""
    def get(self):
        ts = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
        sql = "update zxgj_visiters set v_ts = '%s',v_ing = '1'"%ts
        condition  = "v_ip = '%s' and v_path = '%s'"%(self.remote_ip,self.path)
        self.db.where(condition).updateone(sql)

class restoreStatusHandler(baseHandler):
    def get(self):
        tid = self.get_query_argument("tid")
        usql = "update zxgj_users set u_Ving = '0'"
        ucondition = "u_Id = '%s'" % tid
        self.db.where(ucondition).updateone(usql)
        return self.finish({"udrs":1})

class newsListHandler(baseHandler):
    def get(self):
        offset = int(self.get_argument("offset", "1")) - 1
        sql = "select * from zxgj_news"
        csql = "select count(*) from zxgj_news"
        field = "n_datetime"
        num = 13
        count = self.db.getsum(csql)  # total num of applicants
        #print count
        if count % num == 0:
            pages = count // num
        else:
            pages = count // num + 1
        news = self.db.orderby(field,"desc").limit((offset) * 13, num).getmany(sql)
        return self.render("newslist.html", news=news, count=count, active="index",pages=pages if pages < 100 else 100,offset=offset + 1)







