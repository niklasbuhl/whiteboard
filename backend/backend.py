import time
from flask import Flask, session, request
import secrets
import json

secret = secrets.token_urlsafe(32)


app = Flask(__name__)
app.secret_key = secret

items = {
    'tweets': []
}
tweetCount = 0

# Tweets
# - ID
# - Text
# - Username
# - Date

# Videos
# - ID
# - Link
# - Username
# - Date

@app.route('/time')
def get_time():
    return {'time': time.time()}

# Login

@app.route('/login', methods=['GET', 'POST'])
def login():
    print("Login requested.")

    print(request.get_json(force=True))

    data = request.get_json(force=True)
    print(data['username'])
    message = ''

    # check for valid username

    # check for valid password

    if data['username'] == 'Sam' or data['username'] == 'Bertha':
        if data['password'] == 'hack the planet':
            session['user_id'] = data['username']
            message = "Access granted! You're logged in as " + data['username'] + "."
            session['logged_in'] = True
        else:
            message = "Access denied!"
    else:
        message = "Access denied!"

    print(message)

    return {'login': session.get('logged_in'), 'message': message}


@app.route('/logout')
def logout():
    print("Logout.")

    try:
        if session['logged_in'] == False:
            message = "You're not logged in."
            return {'message': message}
        else:
            message = "Logged out succesfully"

    except:
        message = "You're not logged in."
        return {'message': message}

    session['logged_in'] = False
    return {'login': session.get('logged_in'), 'message': message}

@app.route('/checklogin')
def checklogin():
    print("Checking Login...")
    print(session.get('logged_in'))
    return {'login': session.get('logged_in')}

# Tweeting

@app.route('/tweet', methods=['POST'])
def tweet():

    # Something security about preventing attacks, like injections

    message = ''

    try:
        if session['logged_in'] == False:
            message = "You're not logged in."
            return {'message': message}

    except:
        message = "You're not logged in."
        return {'message': message}

    data = request.get_json(force=True)

    tweetStr = data['tweet']
    tweetLen = len(tweetStr)
    print("Tweet Length: " + str(tweetLen) + ".")

    # Twitters maximum is 240.
    if tweetLen > 240:
        message = "Your tweet is too long."
        return {'message': message}
#
#     # tweet = [
#     #     'id': 0,
#     #     'user_id': session['user_id'],
#     #     'str': str,
#     #     'time': time.time()
#     #     ]
#
    print(tweetStr)

    tweet = {
        'user_id': session['user_id'],
        'text': tweetStr,
        'time': time.time()
    }

    items['tweets'].append(tweet)

    print(items['tweets'])

    message = "Tweeted succesfully"

    return {'message': message}

@app.route('/gettweets', methods=['GET'])
def get_tweets():
    message = 'Error'

    json_tweets = json.dumps(items['tweets'])
    print(json_tweets)

    # print(items['tweets'])

    return {'message': message, 'tweets': json_tweets}

# @app.route('deletetweet', methods=['POST'])
# def delete_tweet():
#     message = ''
#
#     if session['logged_in'] == False:
#         message = "You're not logged in."
#         return {'message': message}
#

# check if tweets matches in id, text, time and username


#     return {'message': message}

# Video

# Drawing
