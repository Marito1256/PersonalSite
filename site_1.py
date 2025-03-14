from flask import Flask, render_template
#from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__, static_folder="static")

#adding https support behind a reverse proxy
#app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

@app.route('/')
def home():
    return render_template('index.html')
@app.route('/QTC')
def ITproject1():
    return render_template('QTC.html')
@app.route('/Resume')
def viewResume():
    return render_template('resume.html')
@app.route('/DiscordBot')
def viewBot():
    return render_template('MemeBot.html')#replace with actual html file later
if __name__ == '__main__':
    app.run(debug=True)
#port is 5000 by default
#http://127.0.0.1:5000/
