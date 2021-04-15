import json
import os
import pymysql
import threading
from flask import Flask, request, jsonify, copy_current_request_context

endpoint = 'DB_URL'
username = 'USERNAME'
password = 'PASSWORD'
db_name = 'movie_db'

connection = pymysql.connect(endpoint,user=username,passwd=password, db=db_name)

app = Flask(__name__)
@app.route('/', methods=['POST'])

# get specific data from the server
def lambda_handler(event, context):
    
    #Get Request DATA
    movie_year= event
    #extract event values
    convert = movie_year["year"]
    result = json.dumps(movie_year)
    #printing result as string
    print ("Movie Year = ", convert)
    
    cursor = connection.cursor()
    sql = "SELECT * from movie_dump WHERE released_year='%s'"
    cursor.execute(sql % convert)
    rows = cursor.fetchall()
    for row in rows:
        return{
        'statusCode': 200,
        'body': json.dumps(rows)
            
        }
