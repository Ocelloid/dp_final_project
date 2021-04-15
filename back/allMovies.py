import json
import os
import pymysql


endpoint = 'DB_URL'
username = 'USERNAME'
password = 'PASSWORD'
db_name = 'movie_db'


connection = pymysql.connect(endpoint,user=username,passwd=password, db=db_name)

# get * data from the db
def lambda_handler(event, context):
    cursor = connection.cursor()
    cursor.execute('SELECT series_title,gross,meta_score FROM movie_dump_indexes')
    rows = cursor.fetchall()
    return{
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'title-gross-score': json.dumps(rows)
    }
        
