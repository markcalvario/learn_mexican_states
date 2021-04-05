import json, os
from flask import Flask, url_for, render_template, request, jsonify,redirect

cwd = os.getcwd()
filename = os.path.join(cwd, "./static/","data.json")
with open(filename) as f:
    data = json.load(f)
    states = data["Mexican States"]

state_num = 0
# create an app instance
app = Flask(__name__)

# create a base route
@app.route('/get_states')
def get_states():    
    return jsonify(states = states)

# create a base route
@app.route('/learn/<id>')
def get_state(id):    
    current_state = states[int(id)-1]
    return jsonify(state = current_state)
# create a base route
@app.route('/quiz/start')
def get_quiz_question():    
    global state_num
    current_state = states[state_num]
    state_num+=1
    return jsonify(state = current_state)

if __name__=="__main__":
    app.run(debug=True)