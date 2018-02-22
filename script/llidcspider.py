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
from socket import error as SocketError
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
class Spider():
    """spider for zxgj_users,used for retrieving data from news websites """
    def __init__(self,baseurl,turl,ua,sname,oururl):
        self.baseurl = baseurl
        self.turl = turl
        self.oururl = oururl
        self.db = MySQLdb.connect(host = ds["host"],port = ds["port"],user = ds["user"],passwd = ds["passwd"],db = ds["db"],use_unicode=1,charset = "utf8")
        self.ua = ua
        self.cur = self.db.cursor()
        self.header = {'User-Agent':random.choice(ua)}
        self.request = urllib2.Request(turl, None, self.header)
        self.sname = sname#来源
        self.retry = 0
        
    def geturls(self,urlcs):
        """get url lists from target url"""
        try:
            html = pq(urllib2.urlopen(self.request).read())
            urls = html.find(urlcs)
            ct = []
            for i in range(0,len(urls)):
                ct.append(urls.eq(i).attr("href"))
            print "got %d urls"%len(ct)
            return ct
        except (urllib2.URLError,socket.timeout,SocketError) as e:
            print 'encountered urlerror',e
            time.sleep(20)
            dt=datetime.datetime.strftime(datetime.datetime.today(),"%Y-%m-%d %H:%M:%S")
            print '%s:reexecuting the spider.'%dt
            self.retry += 1
            self.geturls(urlcs) if self.retry <20 else None
        
    
    def getnews(self,url,tcs,ctcs):
        """retrieve targeted data from url"""
        try:
            req = urllib2.Request(url, None, self.header)
            html = pq(urllib2.urlopen(req).read())
            tt = html.find(tcs).text()#标题
            bc = html.find(ctcs).text()[0:80]+"..."#brief
            sc = self.turl#source
            imgs = html.find(ctcs+" "+"img")
            if len(imgs) > 1:
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
                    if any([j == exten.lower() for j in ["jpg","jpeg","gif","png"]]):#confict with previous i
                        try:
                            mreq = urllib2.Request(mlink,None,self.header)
                            imgc = urllib2.urlopen(mreq).read()
                            imgname = str(int(time.time())) + "-" + random.choice([chr(k) for k in range(1, 256) if chr(k).isdigit() or chr(k).isalpha()]) + "-" + random.choice(list("llidcnewsimg")) + random.choice(list("zxghnewsimg")) + "." + exten
                            cmlink = td + "/" + imgname
                            if os.name == "nt":
                                cmlink = td + "\\" + imgname
                            with open(os.path.join(twd, cmlink), "wb") as f:
                                f.write(imgc)
                            cmlink = cmlink if os.name != "nt" else cmlink.replace("\\", "/")
                            imgs.eq(i).attr("src", "/static/img/news/" + cmlink)
                        except (urllib2.URLError, socket.timeout,SocketError) as e:
                            time.sleep(20)
                            print 'reexecuting the spider.'
                            self.retry += 1
                            self.getnews(url, tcs, ctcs) if self.retry <20 else None
            else:
                pass
            tc = html.find(ctcs).html()#内容
            return [tt,tc,bc,sc]
        except (urllib2.URLError,socket.timeout,SocketError) as e:
            print 'encountered urlerror',e
            time.sleep(20)
            dt=datetime.datetime.strftime(datetime.datetime.today(),"%Y-%m-%d %H:%M:%S")
            print '%s:reexecuting the spider.'%dt
            self.retry +=1
            self.getnews(url,tcs,ctcs) if self.retry <20 else None

    def processdata(self,s):
        """process data and save it to database,return list"""
        if s:
            #check if exists
            qsql = "select * from zxgj_news where n_title = '%s'"%s[0].encode("utf-8")
            result = self.cur.execute(qsql)
            if not result:
                values = (s[0],s[1],s[2],"1",s[3])
                sql = "insert into zxgj_news (n_title,n_content,n_brief,n_type,n_memo) values(%s,%s,%s,%s,%s)"
                #if not exist:
                #esql = "select count(*) from zxgj_news where n_title = "+s[0]
                #ere = self.cur.execute(esql)
                #if not ere:#then feed to mysql
                result = self.cur.execute(sql,values)
                self.db.commit()
                dt=datetime.datetime.strftime(datetime.datetime.today(),"%Y-%m-%d %H:%M:%S")
                print "%s feeded llic_news table,news title is:%s"%(dt,str(s[0].encode("utf-8")))
            else:
                pass
        else:
            pass
        
    def __del__(self):
        self.cur.close()
        self.db.close()
            
if __name__ =="__main__":
    #ua
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
    sname = "凤凰财经"
    baseurl = "http://finance.ifeng.com"
    n = "http://finance.ifeng.com/listpage/597/1/list.shtml"#宏观新闻
    urlcs = ".box_list #list01 li h3 a"
    oururl = "http://www.zjjz999.com"
    #每隔1小时抓取一次
    @everySeconds(11000)
    def fetch():
        ss = Spider(baseurl,n,ua,sname,oururl)
        urls = ss.geturls(urlcs)
        urls = filter(lambda x:x if x.startswith("http") else None,urls)
        assert len(urls) >= 1
        tcs = "#artical_topic"
        ctcs = "#main_content"
        results = map(lambda y:ss.processdata(y),map(lambda x:ss.getnews(urls[x],tcs,ctcs),range(0,len(urls))))
        dt = datetime.datetime.strftime(datetime.datetime.today(), "%Y-%m-%d %H:%M:%S")
        print "%s:finished"%dt
    fetch()
        

