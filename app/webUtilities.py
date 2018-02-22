#!/usr/bin python
#coding:utf-8
from concurrent.futures import ThreadPoolExecutor
import time,os,random,datetime,sys
from tornado import concurrent, ioloop
from app.webCaptcha import webCaptcha
from PIL import Image

__metaclass__ = type

#run func every s seconds,decorate function with it

class everySeconds():
    def __init__(self,s):
        self.s = s

    def __call__(self,f):
        def wrap(*args,**kwargs):
            while 1:
                f(*args,**kwargs)
                time.sleep(self.s)
        return wrap

class Utilities():
    @classmethod
    def getnum(cls,n=5):
        a = []
        cset = [chr(i) for i in range(1, 256) if chr(i).isalnum()]#alphabet or number
        for i in range(1, n + 1):
            a.append(random.choice(cset))
        return "".join(a)
    @classmethod
    def processUserData(cls,uacc,umail,uname,urcode,umobile,uaddr,uidc,ubac,ubid,ubranch,uexcur,idcf,idcr,banki,psimg):
        pass
    @classmethod
    def resizeImg(cls,imgpath):
        """resize images if images width is more than 1024px"""
        with Image.open(imgpath) as f:
            w,h = f.size
            while 1:
                m= max(f.size)
                i = f.size.index(m)
                if m >768:
                    if i ==0:
                        nh = 768*h/w
                        f = f.resize((768,nh),Image.ANTIALIAS)
                    else:
                        nw=768*w/h
                        f = f.resize((nw,768), Image.ANTIALIAS)
                else:
                    break
            f.save(imgpath)




class AsyncProcessPostRequest():
    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=2)
        self.io_loop = ioloop.IOLoop.current()
    @concurrent.run_on_executor
    def processUserData(self,db,uacc,umail,uname,urcode,umobile,uaddr,uidc,ubac,ubid,ubranch,uexcur,idcf,idcr,banki,psimg,usdir):
        idcrname = idcr["filename"]
        idcrext = idcr["filename"].split(".")[1]
        idcfname = idcf['filename']
        idcfext = idcf['filename'].split(".")[1]
        pname = psimg["filename"]
        pext = psimg["filename"].split(".")[1]
        bankname = banki["filename"]
        bankext = banki["filename"].split(".")[1]
        # 图片链接保存到数据库中
        rname = webCaptcha.getRandomNum(12)
        upwd = webCaptcha.getRandomNum(8)  # 生成8位用户随机密码
        idcfimg = usdir + "/" + rname + "-" + str(int(time.time())) + "-idcf-" + "".join(
            [i for i in idcfname if i.isalpha() or i.isdigit()]) + "." + idcfext
        idcrimg = usdir + "/" + rname + "-" + str(int(time.time())) + "-idcr-" + "".join(
            [i for i in idcrname if i.isalpha() or i.isdigit()]) + "." + idcrext
        bankimg = usdir + "/" + rname + "-" + str(int(time.time())) + "-bankimg-" + "".join(
            [i for i in bankname if i.isalpha() or i.isdigit()]) + "." + bankext
        posimg = usdir + "/" + rname + "-" + str(int(time.time())) + "-posimg-" + "".join(
            [i for i in pname if i.isalpha() or i.isdigit()]) + "." + pext
        try:
            with open(idcfimg, "wb") as f1, open(idcrimg, "wb") as f2, open(bankimg, "wb") as f3, open(posimg,"wb") as f4:
                f1.write(idcf["body"])
                f2.write(idcr["body"])
                f3.write(banki["body"])
                f4.write(psimg["body"])
            #processing imgs
            map(lambda x:Utilities.resizeImg(x),[idcfimg,idcrimg,bankimg,posimg])
        except Exception as e:
            print "caught error when save imgs.", e
        values = (uacc, umail, uname, upwd, urcode, umobile, uaddr, uidc, ubac, ubid, ubranch, uexcur, "/" + idcfimg,
                  "/" + idcrimg, "/" + bankimg, "/" + posimg)
        sql = "insert into zxgj_users (u_Account,u_Email,u_RealName,u_Pwd,u_Recommander,u_Mobile,u_Address,u_IDcard,u_BankCardNumber,u_BankType,u_Branch,u_CurrencyType,u_IDcardFront,u_IDcardBack,u_BankCardFront,u_PostureImg) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        result = db.insertone(sql, values)
        return result




