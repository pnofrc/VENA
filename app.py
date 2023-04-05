from flask import Flask, render_template, jsonify, request,send_file
import json
import requests
import csv
from multiprocessing import Value


# export FLASK_APP=app
# export FLASK_ENV=development
# flask run



baseURL = 'http://api.are.na/v2/channels/'

db = {} # database x form
projects = {}
projectsDiv = []
vene = []
formData = []

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
  print(id)
  titleURL = title.replace(' ','_').replace('--','')
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
      print('')
  
  picsTemp = list(zip(picsLow,picsHigh))
  pics = [list(p) for p in picsTemp]


  audioDescription = []
  audioURL = []
  audioTitle = []
  videoDescription = []
  videoURL = []
  videoTitle = []
  pdfDescription = []
  pdfURL = []
  pdfTitle = []


  for media in range(len(project['contents'])):
    description = project['contents'][media]['description_html']
    asset = project['contents'][media]['attachment']
    embed = project['contents'][media]['embed']
    tempTitle = project['contents'][media]['title']

    try:
  
      if (embed):
        # print(embed['html'])
        # TODO: osdfbdendfjoeginks
        videoURL.append(embed['html'])
        videoTitle.append(tempTitle)
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
      if asset['extension'] == 'pdf':
        pdfURL.append(asset['url'])
        pdfTitle.append(tempTitle)
        if(description == ''):
          pdfDescription.append('')
        else:
          pdfDescription.append(description)  
    except:
      print()

    

  audioTemp = list(zip(audioURL, audioDescription, audioTitle))
  videoTemp = list(zip(videoURL, videoDescription, videoTitle))
  pdfTemp = list(zip(pdfURL, pdfDescription, pdfTitle))
  audio= [[*aa] for aa in audioTemp]
  video= [[*vv] for vv in videoTemp]
  pdf = [[*pp] for pp in pdfTemp]
  if title.endswith('--'):
    menuQuest = True
    title = title.replace('--','')
  else:
    menuQuest = False
 

  menu = f'<a onclick="closeMenu()" href=#'+str(titleURL)+'>'+title+'</a>'
  projects[x] = {'id':project['id'],'menu':menu,'title':title,'description':project['metadata']['description'],'text':project['contents'][-1]['content_html'], 'pics': pics,'video':video,'audio':audio,'pdf':pdf,'menuQuest': menuQuest}
  projectsDiv.append(f'<div class="animate__animated project"  id="{str(titleURL)}">')


lenVideo = len(video)
lenAudio = len(audio)
lenPdf = len(pdf)
lenP=len(projects)
lenV=len(vene)



with open('projects.json', 'w') as f:
    json.dump(projects, f)

app = Flask('app')

# HOMEPAGE
@app.route('/')
def index():
  counter = Value('i',0)
  with counter.get_lock():
    with open('./static/data/visits.txt', "r") as counterValue:
      previousValue = counterValue.read()
    counter.value += 1
    out = int(counter.value) + int(previousValue)
    with open('./static/data/visits.txt', "w") as counterValue:
     counterValue.write(str(out))

  return render_template('index.html',lenP=lenP,projects=projects,projectsDiv=projectsDiv,vene=vene,lenV=lenV,lenVideo=lenVideo,lenAudio=lenAudio,lenPdf=lenPdf)


# INFO CONTACTS
@app.route('/info')
def info():
  return render_template('info.html')

# bio
@app.route('/bio')
def bio():
  return render_template('bio.html')


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
    with open('./static/data/people.csv', "a", newline='') as csvfile:
      filewriter = csv.writer(csvfile, delimiter=',',quotechar='|', quoting=csv.QUOTE_MINIMAL)
      filewriter.writerow(formData)
    return render_template('out.html',formData=formData,formLen=formLen)


if __name__ == '__main__':
    app.run()