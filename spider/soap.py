#!/usr/bin python
#coding:utf-8

import os,random,time

def getrand(n):
    a=[]
    cset = [chr(i) for i in range(1,256) if chr(i).isalpha() or chr(i).isdigit()]
    for i in range(1,n+1):
        a.append(random.choice(cset))
    return "".join(a)

if __name__ == "__main__":
    print getrand(10)
 
