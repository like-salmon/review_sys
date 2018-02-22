#!/usr/bin/env python
#coding:utf-8

import tornado
class Nav(tornado.web.UIModule):
    def render(self,active):
        return self.render_string("nav.html",active=active)