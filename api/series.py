from app import app, mongo
import time
from bson.json_util import dumps
from flask import jsonify, flash, request
from espncricinfo.series import Series

@app.errorhandler(Exception)
def server_error(err):
	app.logger.exception(err)
	print("PRINTING ERROR BELOW")
	print(err)
	return "exception", 500

@app.route('/time')
def get_current_time():
	return {'time': time.time()}

@app.route('/series')
def series():
	series = mongo.db.series.find()
	list_cur = list(series)
	resp = dumps(list_cur)
	return resp

@app.route('/scrap-series/<id>', methods=['POST'])
def scrap_series(id):
	print("Scrapping Series Data....")
	s = Series(id)
	resp = {}
	try:
		resp = {'seriesId': id, 'seriesInfo': s.series_data['seriesInfo'], 'teamInfo': s.series_data['teamInfo']}
		mongo.db.series.insert(resp)
		return {'seriesId': id, 'seriesInfo': s.series_data['seriesInfo'], 'teamInfo': s.series_data['teamInfo']}
	except Exception as e:
		print("An exception occurred ::", e)
		resp = jsonify(e)
		resp.status_code = 500
		return resp
	return {}



	

