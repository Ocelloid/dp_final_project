import json
import os
import pymysql


endpoint = 'DB_URL'
username = 'USERNAME'
password = 'PASSWORD'
db_name = 'movie_db'


connection = pymysql.connect(endpoint,user=username,passwd=password, db=db_name)

# get specific data from the server
def lambda_handler(event, context):
 
 #todo
 #List all the data & search partial strings
 
 
    #Get Request DATA
    movie_id=event
    #extract event values
    convert = movie_id["id"]
    #result = json.dumps(movie_name)
 
    cursor = connection.cursor()
    sql = "SELECT * FROM  movie_dump_indexes WHERE movieID = '%s';"
 
    cursor.execute(sql % convert)
    rows = cursor.fetchall()
    for row in rows:
        return{
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'movie': json.dumps(rows)
        }
