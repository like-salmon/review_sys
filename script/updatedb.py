#!/usr/bin/ python
#coding:utf-8

import MySQLdb,time,datetime

conn = MySQLdb.connect(
    host = 'localhost',
    port = 3306,
    user= 'root',
    passwd = 'llidc0313',
    db = 'zxgj',
    charset = 'utf8'
)

cur = conn.cursor()
"""
sql = "select * from zxgj_users where u_Id = 1;"
cur.execute(sql)
result=cur.fetchone()
print result[3]
"""

"""
cusers = cur.execute("select Id from yywl_user")
users = cur.fetchmany(cusers)
maxlen = len(users)
dcommis = "2,0.15,0.05,0.05,0.05"
for i in range(1,len(users)):
    cur.execute("insert into yywl_commission values(%s,%s,%s,%s,%s)",(str(i),str(users[i][0]),dcommis,time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),''))

"""
fields = "(u_Account,u_Email,u_RealName,u_Recommander,u_Mobile,u_Address,u_IDcard,u_BankCardNumber,u_BankType,u_Branch,u_CurrencyType,u_IDcardFront,u_IDcardBack,u_BankCardFront,u_PostureImg)"
values = (fields,"123456","simon110529@hotmail.com",u"users"," ","12341657891","fdsfdsf","4409231795512313","12313123131312","12","branch","rmb","/usr1/fds.img","/usr1/fds.img","/usr1/fds.img","/usr1/fds.img")
sql = "insert into zxgj_users %s values('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')"%values
for i in range(1,100):
    result = cur.execute(sql)
    print result

cur.close()
conn.commit()
conn.close()
"""
transaction:
conn = MySQLdb.connect(host="1.2.3.4", port=1234, user="root", passwd="x", db="test")

for j in range(10):
    try:
        for i in range(10):
            cur = conn.cursor()
            query = "DELETE FROM SomeTable WHERE ID = %d" % i
            cur.execute(query)
            cur.close()
        conn.commit()
    except Exception:
        conn.rollback()

conn.close()
"""
