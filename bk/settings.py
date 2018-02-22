#!/usr/bin/env python
#coding:utf-8

import os
import wmodules

settings={
"template_path": os.path.join(os.path.dirname(__file__), "template"),
"static_path": os.path.join(os.path.dirname(__file__), "static"),
"cookie_secret": "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
"xsrf_cookies": True,
"login_url": "/login",
"ui_modules": wmodules,
"debug":True,
}
