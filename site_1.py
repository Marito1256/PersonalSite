from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import psycopg2
import os
from dotenv import load_dotenv
#from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__, static_folder="static")

#Loading environment variables from the env file (create this locally with the correct credentials)
load_dotenv()
app.secret_key = os.getenv("SESSIONKEY")
DB_NAME = os.getenv("POSTGRES_DB")
DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = os.getenv("POSTGRES_HOST")
DB_PORT = os.getenv("POSTGRES_PORT")
SQLconnection = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
)
#test connection

cursor1 = SQLconnection.cursor()
cursor1.execute('SELECT version();')
db_version = cursor1.fetchone()
print(f"Connected to: {db_version}")
cursor1.close()
SQLconnection.close()
#adding https support behind a reverse proxy
#app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)
#FLask assumes get request if not specified
@app.route('/')
def home():
    username = session.get('username')
    return render_template('index.html',username = username)
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
@app.route('/SignUpPage')
def signup():
    return render_template('/SignUpPage.html')
# API routes
@app.route('/SignUp', methods = ['POST'])
def signUp():
    newUser = request.form.get('username')
    newPass = request.form.get('password')
    with psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        ) as SQLconnection:
        passCheck = request.form.get('password-check')
        with SQLconnection.cursor() as cur:
            cur.execute(
                "SELECT * FROM users WHERE username = %s",
                (newUser,)
            )
            if(cur.fetchone() is not None):
                print()
                print()
                print("ERROR USERNAME IS TAKEN")
                print()
                print()
    return render_template('/SignUpPage.html')
@app.route('/Login', methods=['POST'])
def loginAttempt():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '')
    print(username)
    print(password)
    with psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    ) as SQLconnection:
        with SQLconnection.cursor() as cur:
            # Correct the SQL syntax
            cur.execute(
                "SELECT * FROM users WHERE username = %s;",
                (username,)
            )
            userRow = cur.fetchone()
            print()
            print()
            if(userRow != None):
                if(password == userRow[2]):
                    session['user_id'] = userRow[0]
                    session['username'] = userRow[1]
                    session['role'] = userRow[3]
                    return jsonify(success=True)
                else:
                    return jsonify(success = False, message = 'Incorrect Password'), 401
            else:
                    return jsonify(success = False, message = 'User does not exist'), 401
            print()
            print()

    return f"Trying to login as {username}?"
@app.route('/Logout', methods=['POST'])
def logout():
    session.clear()
    return redirect(url_for('home'))
if __name__ == '__main__':
    app.run(debug=True)
#port is 5000 by default
#http://127.0.0.1:5000/
