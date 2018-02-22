#!/usr/bin python
# -*- coding: cp936 -*

from pysimplesoap.client import SoapClient
from tornado.escape import json_decode,json_encode

client = SoapClient(wsdl="https://trade.pspme.cn/service/TradeCenter.asmx?wsdl", trace=False)

#check if client exists:
print client.CheckClientAccount("12345")
print client.CheckEmail("12345@qq.com")
#get banklist
"""
response = client.GetBanksList()
resp = response["GetBanksListResult"]
resp1 = '{"title":'+resp+'}'
resp2 = resp1.replace("\\","")
resp3 = resp2.replace("：".decode("cp936"),":")
resp4 = json_decode(resp3)
"""


