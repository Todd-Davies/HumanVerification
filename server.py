from flask import Flask, request, Response, render_template, send_from_directory
from functools import wraps
import sys, os, psutil

app = Flask(__name__)

#-----
#Basic functions
#-----

@app.route("/")
def index():
    return render_template('index.html')

#Favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route("/shutdown")
def killserver():
	shutdown_server()
	print("Shutdown request recieved, stopping the server")
	return "Stopping the server, goodbye!"

def shutdown_server():
	func = request.environ.get('werkzeug.server.shutdown')
	if func is None:
		raise RuntimeError('Failed to shutdown - not running with the Werkzeug Server')
	func()

if __name__ == "__main__":
    #app.run()
    app.run(host='192.168.0.13')
