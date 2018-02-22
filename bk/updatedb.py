#!/usr/bin/env python
# coding:utf-8

import MySQLdb,time,datetime
conn = MySQLdb.connect(
    host = 'localhost',
    port = 3306,
    user= 'root',
    passwd = 'root',
    db = 'dianwei'
)
cur = conn.cursor()
cusers = cur.execute("select Id from yywl_user")
users = cur.fetchmany(cusers)
maxlen = len(users)
dcommis = "2,0.15,0.05,0.05,0.05"
for i in range(1,len(users)):
    cur.execute("insert into yywl_commission values(%s,%s,%s,%s,%s)",(str(i),str(users[i][0]),dcommis,time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),''))

cur.close()
conn.commit()
conn.close()
