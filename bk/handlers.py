#!/usr/bin/env python
#coding:utf-8

from __future__ import division
import tornado.web
from pyquery import PyQuery as pq
import os,re,sys,math
from wmodules import *

class BaseHanlder(tornado.web.RequestHandler):
    def get_current_user(self):
        """{current_user} in template,request:self.current_user"""
        return self.get_secure_cookie("user")

class MainHandler(BaseHanlder):
    def get(self):
        active ="index"
        self.render("index.html",active=active)
    def post(self):
        pass

class LoginHandler(BaseHanlder):
    def get(self):
        self.render("login.html")
    def post(self):
        pass

class RegHandler(BaseHanlder):
    def get(self):
        self.render("reg.html")
    def post(self):
        pass
