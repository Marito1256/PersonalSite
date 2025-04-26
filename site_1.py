from flask import Flask, render_template
import psycopg2
import os
from dotenv import load_dotenv
#from werkzeug.middleware.proxy_fix import ProxyFix

#Loading environment variables from the env file (create this locally with the correct credentials)
load_dotenv()

app = Flask(__name__, static_folder="static")

DB_NAME = os.getenv("POSTGRES_DB")
DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = os.getenv("POSTGRES_HOST")
DB_PORT = os.getenv("POSTGRES_PORT")

SQLconnection = psycopg2.connect(
    dbname = DB_NAME,
    user = DB_USER,
    password = DB_PASSWORD,
    # host = DB_HOST,
    host = '192.168.50.136',
    port = DB_PORT
)
#test connection

cursor1 = SQLconnection.cursor()
cursor1.execute('SELECT version();')
db_version = cursor1.fetchone()
print(f"Connected to: {db_version}")
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
    return render_template('CleanBot.html')#replace with actual html file later
@app.route('/PersonalSite')
def viewSite():
    return render_template('PersonalSite.html')#replace with actual html file later
@app.route('/SnakeGame')
def playSnake():
    return render_template('Snakegame.html')
@app.route('/Scraper')
def viewScraper():
    return render_template('Scraper.html')
if __name__ == '__main__':
    app.run(debug=True)
#port is 5000 by default
#http://127.0.0.1:5000/
