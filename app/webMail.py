#/usr/bin python
#coding:utf-8

import smtplib,os,time
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
from config.settings import mailsettings as ms
from email import encoders
from config.settings import websettings as ws
from email.utils import formataddr

__metaclass__= type

#cpath = os.path.join(os.path.dirname(__file__), "../")
class webMail():
    """mail handler"""
    def __init__(self,mto,msub,mfrom = ms["mfrom"]):
        self.mto = mto
        self.mfrom = mfrom
        self.mpwd =  ms["mpwd"]
        self.msgRoot = MIMEMultipart()
        self.msgRoot["From"] = formataddr(["中新国金",mfrom])
        self.msgRoot["To"] = formataddr(["栢世嘉",",".join(mto)])
        self.msgRoot['Subject'] = Header(msub,'utf-8')
        self.server = ms["mserver"]
        self.template = False#是否开启模板
        self.mail_msg = ''#邮件正文

    def notifyTemplate(self,mdata,mpath = ms["wnpath"] if os.name == "mt" else ms["lnpath"]):
        with open(mpath,"r") as f:
            msg = f.read()
        self.msgAlternative = MIMEMultipart('alternative')
        self.msgRoot.attach(self.msgAlternative)
        self.mail_msg = msg % (mdata[0],mdata[1],mdata[2])
        self.msgAlternative.attach(MIMEText(self.mail_msg, 'html', 'utf-8'))
        self.template = True
        return 1



    def setTemplate(self,imgs,user=""):
        # MIME内容
        mpath = ms["lmpath"]
        if os.name == "nt":
            mpath = ms["wmpath"]
        with open(mpath,"r") as f:
            msg = f.read()
        self.msgAlternative = MIMEMultipart('alternative')
        self.msgRoot.attach(self.msgAlternative)
        self.mail_msg = msg%(user[1].encode("utf-8"),user[8].encode("utf-8"),user[9].encode("utf-8"))
        #print self.mail_msg
        self.msgAlternative.attach(MIMEText(self.mail_msg, 'html', 'utf-8'))

        wimgs = ["/www/zhongjinjujin"+i for i in imgs]
        if os.name == "nt":
            wimgs = ["F:\\mywork\\zhongjinjujin" + i.replace("/", "\\") for i in imgs]
        for i in range(0,len(wimgs)):
            with open(wimgs[i],"rb") as f:
                if os.name =="nt":
                    self.msgImage = MIMEImage(f.read(),_subtype=wimgs[i].split("\\")[-1].split(".")[1])
                else:
                    self.msgImage = MIMEImage(f.read(), _subtype=wimgs[i].split("/")[-1].split(".")[1])
                self.msgImage.add_header('Content-ID', '<image%d>'%(i+1))
                self.msgRoot.attach(self.msgImage)
        self.template = True
        return 1

    def setAttachment(self,msg,imgs,type="plain"):
        #handler MIMEText
        if type == "plain":
            self.msgRoot.attach(MIMEText(msg, 'plain', 'utf-8'))
        elif type == "html":
            self.msgRoot.attach(MIMEText(msg, 'html', 'utf-8'))
        a,b,c,d = imgs[0],imgs[1],imgs[2],imgs[3]  #4 images body {"imagename":image[body]}
        msg1 = MIMEImage(a[a.keys()[0]], _subtype=a.keys()[0].split(".")[1])
        msg2 = MIMEImage(b[b.keys()[0]], _subtype=b.keys()[0].split(".")[1])
        msg3 = MIMEImage(c[c.keys()[0]], _subtype=c.keys()[0].split(".")[1])
        msg4 = MIMEImage(d[d.keys()[0]], _subtype=d.keys()[0].split(".")[1])
        # Set the filename parameter
        msg1.add_header('Content-Disposition', 'attachment', filename=a.keys()[0])
        msg2.add_header('Content-Disposition', 'attachment', filename=b.keys()[0])
        msg3.add_header('Content-Disposition', 'attachment', filename=c.keys()[0])
        msg4.add_header('Content-Disposition', 'attachment', filename=d.keys()[0])
        self.msgRoot.attach(msg1)
        self.msgRoot.attach(msg2)
        self.msgRoot.attach(msg3)
        self.msgRoot.attach(msg4)
        return 1

    def sendEmail(self):
        try:
            #smtpserver = smtplib.SMTP(self.server,25)#aliyun block port 25
            smtpserver = smtplib.SMTP_SSL(self.server,465)
            #smtpserver.set_debuglevel("1")
            #如果启用ssl连接,一般修改smtpserver的端口,aliyun 465
            #smtpserver.starttls()
            smtpserver.login(self.mfrom,self.mpwd)
            smtpserver.sendmail(self.mfrom,self.mto,self.msgRoot.as_string())
            smtpserver.quit()
            #print "mail sent"
        except (smtplib.SMTPException,Exception) as e:
            print "Error: 无法发送邮件",e
        finally:
            self.mail_msg =""
            self.msgAlternative = ""
            self.msgRoot = ""
            self.subject = ""

    
if __name__ == "__main__":
    mto = "517908183@qq.com"
    msub = "邮件测试"
    with open("C:\\mywork\\zhongjinjujin\\template\\reg_mail.txt","r+") as f:
        msg = f.read()
    imgsrc = "C:\\mywork\\zhongjinjujin\\static\\img\\slide01.jpg"
    mail = webMail(mto,msub,msg,imgsrc)
    mail.sendEmail()






