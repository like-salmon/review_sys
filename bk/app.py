#!/usr/bin/env python
#coding:utf-8

import tornado
import tornado.ioloop
import tornado.web
from tornado.options import define,options
from handlers import *
from config.settings import websettings
import tornado.httpserver

define("port", default=8080, help="run on the given port", type=int)

urls =[
    (r'/',MainHandler),
    (r'/login',LoginHandler)
]

app = tornado.web.Application(urls,**websettings)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


