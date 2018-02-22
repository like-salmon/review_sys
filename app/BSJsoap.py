#!/usr/bin/env python
#coding:cp936
#soap里面的字符需要用到cp936的编码
from suds.client import Client
#from pysimplesoap.client import SoapClient
from tornado.escape import json_decode,json_encode
#from tornado.concurrent.futures import ThreadPoolExecutor
import tornado.ioloop,re
from tornado import concurrent
from tornado import gen
from config.settings import bsjsettings as bs

__metaclass__ = type

class BSJsoap:

    def __init__(self):
        self.client = Client(url=bs["wsdlpath"], location=bs["apilink"])#use nosend to get soapclient context

    def getBankList(self):
        #获取银行列表soap
        response = self.client.service.GetBanksList()
        resp = response
        resp1 = '{"title":' + resp + '}'
        resp2 = resp1.replace("\\", "")
        resp3 = resp2.replace("：".decode("gb2312"), ":")
        resp4 = json_decode(resp3)
        blist = []
        for i in range(0,len(resp4['title'])):
            if resp4['title'][i]["Status"] == "True":
                blist.append(resp4['title'][i])
        return blist

    def getCurrency(self):
        pass

    def checkIfExist(self,clientid):
        """check if client exists,return True or False"""
        return self.client.service.CheckClientAccount(clientid)

    def checkEmail(self,mail):
        """check client's email if exists"""
        return self.client.service.CheckEmail(mail)

    def insertClient(self,clientAccount,name,password,email,groupsId,phone,address,idCard,bankAccount,currencyId,inputUser,banksId,bankRemark):
        """{'InsertClientResult': u'<Data><Result>3</Result><ErrorMsgs></ErrorMsgs></Data>'}"""
        try:
            result = self.client.service.InsertClient(clientAccount,name,password,email,int(groupsId),phone,address,idCard,bankAccount,str(currencyId),inputUser,str(banksId),bankRemark)
            #print result
            pat = re.compile("<Result>(\d+)<\/Result>")
            rs = int(pat.search(result["InsertClientResult"]).group(1))
            if rs:
                return 2
            elif rs == 0:
                return 0
        except Exception as e:
            print "caught error when insert client into remote database.",e
            return 0

"""
class asyncExec(object):

    def __init__(self,ioloop = None):
        self.executor = ThreadPoolExecutor(max_workers=10)
        self.io_loop = ioloop or tornado.ioloop.IOLoop.instance()

      #client is the suds client and remoteMethod is the blocking function

    @run_on_executor
    def getResponse(self,client,args):
        response = client.service.remoteMethod(args)
        return(response)


    #getResponse returns a future object which can be yielded in a coroutine :
    @gen.coroutine
    def makeRequest():
        asyncCaller = AsyncExec()
        response = yield asyncCaller.getResponse(client, args)
    # Do something with response
"""
