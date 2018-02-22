#/usr/bin python
#coding:utf-8

from captcha.image import ImageCaptcha
import random,os,time
from io import BytesIO

"""
image = ImageCaptcha()
data = image.generate('1234')
image.write('1234', 'out.png')
"""

__metaclass__= type

class webCaptcha(ImageCaptcha):
    def __init__(self):
        super(webCaptcha,self).__init__()

    @classmethod
    def getRandomNum(self,n=4):
        """生成四位随机字符,数字和字母"""
        a = []
        cset = [chr(i) for i in range(1, 256) if chr(i).isalpha() or chr(i).isdigit()]
        for i in range(1, n + 1):
            a.append(random.choice(cset))
        return "".join(a)
    def saveImg(self):
        #获取当前的图片路径,当用户提交正确的验证码需要清空当前captcha图片
        #print os.getcwd()#根目录
        sysname = os.name#ubuntu:'posix',windows:'nt', 'mac', 'os2', 'ce', 'java', 'riscos'.
        tpath = os.path.join("/".join(os.path.dirname(__file__).split("/")[0:len(os.path.dirname(__file__).split("/")) - 1]), "static/img")
        ctime = str(float(time.time()))
        if sysname=="nt":
            tpath = os.path.join("\\".join(os.path.dirname(__file__).split("\\")[0:len(os.path.dirname(__file__).split("\\")) - 1]),"static\\img")
            #tpath = "E:\mywork\zhongjinjujin\static\img"
        rnum = self.getRandomNum()
        fname = random.choice(list(rnum))+ctime[0:int(random.choice(range(1,len(ctime))))]+"-"+rnum + ctime[1:random.choice(range(1,len(ctime)))]
        imgpath = tpath + "/captcha/" + fname +".png"
        if sysname =="nt":
            imgpath = tpath + "\\captcha\\" + fname + ".png"
        imglink = "/static/img/captcha/"+ fname +".png"
        #检测文件是否存在,后续修改图片名称fname
        if(os.path.isfile(imgpath)):
            os.remove(imgpath)
            rnum = self.getRandomNum()#重新生成随机数
            fname = random.choice(list(rnum))+ctime[0:int(random.choice(list(ctime)))] + "-" + rnum + ctime[random.choice(range(1,len(ctime))):int(random.choice(list(ctime)))]
            imgpath = tpath + "/captcha/" + fname + ".png"
            if sysname == "nt":
                imgpath = tpath + "\\captcha\\" + fname + ".png"
            imglink = "/static/img/captcha/" + fname + ".png"
        else:
            data = self.generate(rnum)
            self.write(rnum,imgpath)
        return [imglink,rnum]

if __name__ =="__main__":
    print os.path.dirname(__file__)
    print "/".join(os.path.dirname(__file__).split("\\")[0:1])
    print webCaptcha.getRandomNum(8)

