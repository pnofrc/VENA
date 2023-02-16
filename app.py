from flask import Flask, render_template, jsonify, request
import random
import json
import requests

# export FLASK_APP=app
# export FLASK_ENV=development
# flask run

baseURL = 'http://api.are.na/v2/channels/'

db = {} # database x form
projects = {}
projectsDiv = []
vene = []

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
  title = data['contents'][x]['title']
  title = title.replace(' ','_')
  uri = baseURL + str(id)
  try:
    uResponse = requests.get(uri)
  except requests.ConnectionError:
    print('error')
  Jresponse = uResponse.text
  project = json.loads(Jresponse)


  picsHigh = []
  picsLow = []

  for pic in range(len(project['contents'])):
    try:
      picsHigh.append(project['contents'][pic]['image']['display']['url'])   
      picsLow.append(project['contents'][pic]['image']['thumb']['url'])   
    except:
      print('SBATTIMENTO')
  
  picsTemp = list(zip(picsLow,picsHigh))
  pics = [list(p) for p in picsTemp]
  print(len(picsHigh))
  print(len(picsLow))

  audioDescription = []
  audioURL = []
  audioTitle = []
  videoDescription = []
  videoURL = []
  videoTitle = []

  for media in range(len(project['contents'])):
    description = project['contents'][media]['description_html']
    asset = project['contents'][media]['attachment']
    tempTitle = project['contents'][media]['title']

    try:
      if asset['extension'] == 'mp3' or asset['extension'] == 'wav':
        audioURL.append(asset['url'])
        audioTitle.append(tempTitle)
        if(description == ''):
          audioDescription.append('')
        else:
          audioDescription.append(description)
      if asset['extension'] == 'mp4' or asset['extension'] == 'mov':
        videoURL.append(asset['url'])
        videoTitle.append(tempTitle)
        if(description == ''):
          videoDescription.append('')
        else:
          videoDescription.append(description)
    except:
      print()

    

  audioTemp = list(zip(audioURL, audioDescription, audioTitle))
  videoTemp = list(zip(videoURL, videoDescription, videoTitle))
  audio= [[*aa] for aa in audioTemp]
  video= [[*vv] for vv in videoTemp]
 

  menu = f'<a onclick="closeMenu()" href=#'+str(title)+'>'+title.replace("_",' ')+'</a>'
  projects[x] = {'id':project['id'],'menu':menu,'title':project['title'],'description':project['metadata']['description'],'text':project['contents'][-1]['content_html'], 'pics': pics,'video':video,'audio':audio}
  projectsDiv.append(f'<div class="zoomSystem project"  id="{str(title)}">')

lenVideo = len(video)
lenAudio = len(audio)
lenP=len(projects)
lenV=len(vene)



with open('projects.json', 'w') as f:
    json.dump(projects, f)

app = Flask('app')

# HOMEPAGE
@app.route('/')
def index():
  return render_template('index.html',lenP=lenP,projects=projects,projectsDiv=projectsDiv,vene=vene,lenV=lenV,lenVideo=lenVideo,lenAudio=lenAudio)


# INFO CONTACTS
@app.route('/info')
def info():
  return render_template('info.html')


# FORM
@app.route('/form', methods=['POST', 'GET'])
def form():
  return render_template('form.html')

# OUTPUT FORM
@app.route('/submitSubscription', methods=['POST','GET'])
def out():
  if request.method == 'GET':
    return f'nope, go back to home'
  if request.method == 'POST':
    formData = request.form.getlist('setForm')
    formLen = len(formData)
    return render_template('out.html',formData=formData,formLen=formLen)


if __name__ == '__main__':
    app.run(host="0.0.0.0")

