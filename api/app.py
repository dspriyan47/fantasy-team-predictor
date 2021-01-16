from gevent import monkey as curious_george
curious_george.patch_all(thread=False, select=False)

import time
from flask import Flask
from flask_pymongo import PyMongo
from espncricinfo.match import Match
from espncricinfo.summary import Summary
from espncricinfo.series import Series
import json

app = Flask(__name__)
app.secret_key = "secret key"
app.config["MONGO_URI"] = "mongodb://localhost:27017/fantasy-team-predictor"
mongo = PyMongo(app)
# s = Series('1226769')




