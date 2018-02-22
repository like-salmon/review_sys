#!/usr/bin/python
#coding:utf-8

"""
put this file in directory spider of llidc.com 
"""
from __future__ import division
import datetime
from pyquery import PyQuery as pq
import random,re,os,time,MySQLdb,urllib2
from tornado import escape
import socket

__metaclass__ = type

class everySeconds():
    def __init__(self,s):
        self.s = s
    def __call__(self,f):
        def wrap(*args,**kwargs):
            while 1:
                f(*args,**kwargs)
                time.sleep(self.s)
        return wrap

ds={
"host":'localhost',
'port':3306,
'user':'root',
'db':'zxgj',
'passwd':"zxgj0313",
'charset':'utf8'
}

sname = "凤凰财经"
baseurl = "http://finance.ifeng.com"
n = "http://finance.ifeng.com/macro/"#宏观新闻
urlcs = ".box_list #list01 li h3 a"
oururl = "http://www.zjjz999.com"

ua = random.choice([
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Baiduspider',
    'Baidu Web Search',
    'Baidu Image Search',
    'Baiduspider-image',
    'Baidu Mobile Search',
    'Baiduspider-mobile',
    'Baidu Video Search',
    'Baiduspider-video',
    'Baidu News Search',
    'Baiduspider-news',
    'Baidu Bookmark Search',
    'Baiduspider-favo',
    'Baidu Union Search',
    'Baiduspider-cpro',
    'Baidu Business Search',
    'Baiduspider-ads',
    'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',
    'Baiduspider+(+http://www.baidu.com/search/spider_jp.html)',
    'Baiduspider+(+http://www.baidu.com/search/spider.htm)',
    ])

global retry
header = {'User-Agent':random.choice(ua)}
retry = 0
db = MySQLdb.connect(host = ds["host"],port = ds["port"],user = ds["user"],passwd = ds["passwd"],db = ds["db"],use_unicode=1,charset = "utf8")
cur = db.cursor()
request = urllib2.Request(n, None, header)
def geturls(urlcs,request):
    """get url lists from target url"""
    try:
        html = pq(urllib2.urlopen(request).read())
        urls = html.find(urlcs)
        ct = []
        for i in range(0,len(urls)):
            ct.append(urls.eq(i).attr("href"))
        print "got urls:%d条"%len(ct)
        return ct
    except (urllib2.URLError,socket.timeout) as e:
        print 'encountered urlerror',e
        time.sleep(20)
        print 'reexecuting the spider.'
        retry += 1
        geturls(urlcs) if retry <20 else None
        

def getnews(url,tcs,ctcs,turl):
    try:
        req = urllib2.Request(url, None, header)
        html = pq(urllib2.urlopen(req).read())
        tt = html.find(tcs).text()#标题
        tc = html.find(ctcs).html()#内容
        bc = html.find(ctcs).text()[0:80]+"..."#brief
        sc = turl#source
        imgs = html.find(ctcs).find("img")
        if len(imgs) > 1 and len(tc) > 50:
            print "processing imgs..."
            td = str(float(time.time()))
            twd = os.path.join("/".join(os.getcwd().split("/")[0:len(os.getcwd().split("/"))-1]),"static/img/news")
            if os.name == "nt":
                twd = os.path.join("\\".join(os.getcwd().split("\\")[0:len(os.getcwd().split("\\"))-1]),"static\\img\\news")
            os.mkdir(os.path.join(twd,td))
            for i in range(0,len(imgs)):
                mlink = imgs.eq(i).attr("src")
                mlink = mlink.replace("\\","") if "\\" in mlink else mlink
                print "processing img:","http:"+mlink
                exten =mlink.split(".")[-1]
                if any([i == exten.lower() for i in ["jpg","jpeg","gif","png"]]):
                    try:
                        mreq = urllib2.Request(mlink,None,header)
                        imgc = urllib2.urlopen(mreq).read()
                    except (urllib2.URLError, socket.timeout) as e:
                        time.sleep(20)
                        print 'reexecuting the spide        r.'
                        retry += 1
                        getnews(url, tcs, ctcs) if retry <20 else None
                    imgname = str(int(time.time()))+"-"+random.choice([chr(i) for i in range(1,256) if chr(i).isdigit() or chr(i).isalpha()])+"-"+random.choice(list("llidcnewsimg"))+random.choice(list("zxghnewsimg"))+"."+exten
                    cmlink = td +"/"+imgname
                    if os.name == "nt":
                        cmlink = td +"\\"+imgname
                    with open(os.path.join(twd,cmlink),"wb") as f:
                        f.write(imgc)
                    imgs.eq(i).attr("src","img/news/"+cmlink)
            tc = html.find(ctcs).html()
            return [tt,tc,bc,sc]
        else:
            pass
    except (urllib2.URLError,socket.timeout) as e:
        print 'encountered urlerror',e
        time.sleep(20)
        print 'reexecuting the spider.'
        retry +=1
        #getnews(url,tcs,ctcs) if retry <20 else None

def processdata(s):

    if s:
        #check if exists
        qsql = "select * from zxgj_news where n_title = '%s'"%s[0].encode("utf-8")
        result = cur.execute(qsql)
        if not result:
            values = (s[0],s[1],s[2],"1",s[3])
            sql = "insert into zxgj_news (n_title,n_content,n_brief,n_type,n_memo) values(%s,%s,%s,%s,%s)"
            #if not exist:
            #esql = "select count(*) from zxgj_news where n_title = "+s[0]
            #ere = cur.execute(esql)
            #if not ere:#then feed to mysql
            result = cur.execute(sql,values)
            db.commit()
            dt=datetime.datetime.strftime(datetime.datetime.today(),"%Y-%m-%d %H:%M:%S")
            print "%s feeded llic_news table,news title is:%s"%(dt,str(s[0].encode("utf-8")))
        else:
            pass

    else:
        pass
        
    def __del__(self):
        cur.close()
        db.close()
           
if __name__ =="__main__":
    #每隔1小时抓取一次
    @everySeconds(11000)
    def fetch():
        urls = geturls(urlcs,request)
        assert len(urls) >= 1
        tcs = "#artical_topic"
        ctcs = "#main_content"
        for i in urls:
            print "start"
            s=getnews(i,tcs,ctcs,n)
            print "skip"
            processdata(s)

    fetch()
        

