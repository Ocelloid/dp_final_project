import json
import os
import pymysql
import threading
import time
from flask import Flask, request, jsonify, copy_current_request_context

endpoint = 'DB_URL'
username = 'USERNAME'
password = 'PASSWORD'
db_name = 'movie_db'

connection = pymysql.connect(endpoint,user=username,passwd=password, db=db_name)

app = Flask(__name__)
@app.route('/', methods=['POST'])

def lambda_handler(event, context):

    #Get Request DATA
    movie_name=event
    #extract event values
    convert = movie_name["movieID"]
    endSTR="%"
    concat = endSTR+convert+endSTR
    #result = json.dumps(movie_name)
 
    cursor = connection.cursor()
    sql = "SELECT * from movie_dump_indexes WHERE series_title LIKE '%s' ORDER BY series_title ASC"
 
    cursor.execute(sql % concat)
    rows = cursor.fetchall()
    for row in rows:
        return{
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        'movie': json.dumps(rows)
        }
