#!/usr/bin python
#coding:utf-8
import os,time,sys,random
import urllib2
class everySeconds():
    def __init__(self,s):
        self.s = s
    def __call__(self,f):
        def wrap(*args,**kwargs):
            while True:
                f(*args,**kwargs)
                time.sleep(self.s)
        return wrap
        
    
@everySeconds(10)
def printx():
    print "x"
    
if __name__ =="__main__":
    url = "http://www.baidu.com"
    def x():
        html=urllib2.urlopen(url).read()
        return len(html)
    for i in range(10):
        print "start"
        a=x()
        print a
        print "skip"
        
        
