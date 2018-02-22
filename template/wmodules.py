#!/usr/bin/env python
#coding:utf-8

from tornado.web import UIModule
class Nav(UIModule):
    def render(self,active="index"):
        return self.render_string("admin_nav.html",active=active)
