from flask import Flask, render_template, jsonify, request
import random
from datetime import datetime
import json
import os

import requests

db = {}
baseURL = 'http://api.are.na/v2/channels/'
pages = []
ids = []


extension = 'website-assets-dkje44dpzvc'

uri = baseURL + extension
try:
  uResponse = requests.get(uri)
except requests.ConnectionError:
  print('error')

Jresponse = uResponse.text
data = json.loads(Jresponse)


# GET IDS OF CHANNEL'S PROJECTS
for x in range(len(data['contents'])):
  pages.append(data['contents'][x]['title'])
  ids.append(data['contents'][x]['id'])



# GET DATA FOR PROJECTS
project = str(ids[2])
uri = baseURL + project
try:
  uResponse = requests.get(uri)
except requests.ConnectionError:
  print('error')

Jresponse = uResponse.text
project = json.loads(Jresponse)




app = Flask('app')

# HOMEPAGE
@app.route('/')
def index():
  return render_template('index.html', )


# FORM
@app.route('/form', methods=['POST', 'GET'])
def form():
  return render_template('form.html', project=project, ids=ids)

# OUTPUT FORM
@app.route('/allGood', methods=['POST', 'GET'])
def formDone():
  # if request.method == 'GET':
  #  return f'nope, go back to home'
  if request.method == 'POST':
    name = request.form["fname"],request.form["lname"]
    birth = request.form["birthplace"],request.form["birthday"]
    address = request.form["addressStreet"],request.form["addressCity"], request.form["zip"]
    email = request.form["email"]
    city = request.form["city"]
    # db[len(db)] = {'name':name,'birth':birth,'address':address,'email':email,'city':city}
  return render_template('success.html', name,birth,address,email,city)




# PROJECTS PAGES DYNAMICALLY CREATED
@app.route('/first')
def proj():
  return render_template('project.html', project=project, ids=ids)

app.run(host='0.0.0.0', port=8080, debug=True)
