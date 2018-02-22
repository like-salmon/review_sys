#!/usr/bin/env python
#coding:utf-8

import tornado
from tornado.options import define,options
from config.settings import websettings,ls
import tornado.httpserver
from handlers.handlers import *
from app.dbWrapper import dbWrapper
import logging
import logging.config
import os

from tornado.escape import json_decode,json_encode

define("port", default=80, help="run on the given port", type=int)

class Application(tornado.web.Application):
    def __init__(self):
        self.web_handlers = [
            (r'/', mainHandler),#when import two modules each other ,do not import its namespace directly just import on class level
            (r'/login/?', loginHandler),
            (r'/apply/?', applyHandler),
            (r'/captcha/?', captchaHandler),
            (r'/checkcaptcha/?', checkCaptchaHandler),
            (r'/checkClient/?', checkClientHandler),
            (r'/zxgjAdmin/?', adminLoginHandler),
            (r'/adminreg/?',adminRegHandler),
            (r'/admin/?', adminHandler),
            (r'/admin/review/?', adminReviewHandler),
            (r'/admin/rvapplication/?',adminReviewApplicationHandler),
            (r'/admin/adminreview/?',adminreviewHandler),
            (r'/admin/review/remove/?', removeHandler),
            (r'/admin/review/adminremove/?',adminRemoveHandler),
            (r'/admin/rvuser/?', rvuserHandler),
            (r'/admin/viewnext/?', viewNextHandler),
            (r'/quit/?', quitHandler),
            (r'/admin/reviewed/?', adminReviewedHandler),
            (r'/news/(\d+)', newsHandler),
            (r'/newslist/?',newsListHandler),
            (r'/trade/?', tradeHandler),
            (r'/finance/?', financeHandler),
            (r'/applysuccess/?', applySuccessHandler),
            (r'/rasuccess/?',raSuccessHandler),
            (r'/service/?', serviceHandler),
            (r'/websocket/?', getVisitWebSocket),
            (r'/fewebsocket/?',heartBeatHandler),
            (r'/jsheartbeat/?',jsHeartBeatHandler),
            (r'/notification/?',notificationHandler),
            (r'/admin/review/restore/?',restoreStatusHandler),
            (r'/test/?', testHandler),
            (r'/error/?', errorHandler),
            (r'(.*)', baseHandler)
        ]
        super(Application, self).__init__(self.web_handlers,**websettings)
        self.db = dbWrapper()

if __name__ == '__main__':
    #logging
    tornado.options.parse_command_line()
    """if(os.path.exists(ls["path"])):
        with open(ls["path"],"r") as f:
            lsetting = json_decode(f.read())
            logging.config.dictConfig(lsetting)
    """
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.PeriodicCallback(dbWrapper().clean,10000).start()
    tornado.ioloop.IOLoop.instance().start()


