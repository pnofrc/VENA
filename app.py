from flask import Flask, render_template, jsonify, request
import random
from datetime import datetime
import json
import os

import requests

baseURL = 'http://api.are.na/v2/channels/'


db = {} # database x form
projects = {}
projectsDiv = []

def r(): # random values x position
   return random.randint(100,900)



extension = 'website-assets-dkje44dpzvc'

uri = baseURL + extension
try:
  uResponse = requests.get(uri)
except requests.ConnectionError:
  print('error')

Jresponse = uResponse.text
data = json.loads(Jresponse)


for x in range(len(data['contents'])):
  id = data['contents'][x]['id']
  uri = baseURL + str(id)
  try:
    uResponse = requests.get(uri)
  except requests.ConnectionError:
    print('error')
  Jresponse = uResponse.text
  project = json.loads(Jresponse)
  menu = f'<a href=#'+str(project['id'])+'>'+project['title']+'</a>'
  print(menu)
  projects[x] = {'id':project['id'],'menu':menu,'title':project['title'],'description':project['metadata']['description'],'text':project['contents'][-1]['content_html']}
  projectsDiv.append(f'<div class="project" id="{str(id)}" style="top:{r()}%;left:{r()}%">')
  # print(project['contents'][-1]['content_html'])
  # print(project['metadata'])
  # print(project['title'])

len=len(projects)


with open('projects.json', 'w') as f:
    json.dump(projects, f)

app = Flask('app')

# HOMEPAGE
@app.route('/')
def index():
  return render_template('index.html',len=len,projects=projects,projectsDiv=projectsDiv)


# FORM
@app.route('/form', methods=['POST', 'GET'])
def form():
  return render_template('form.html')

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


# # PROJECTS PAGES DYNAMICALLY CREATED
# @app.route('/first')
# def proj():
#   return render_template('project.html', project=project, ids=ids)

app.run(host='0.0.0.0', port=8080, debug=True)
