import simplejson as json
import os
import pymysql


endpoint = 'DB_URL'
username = 'USERNAME'
password = 'PASSWORD'
db_name = 'movie_db'


connection = pymysql.connect(endpoint,user=username,passwd=password, db=db_name)

# get specific data from the server
def lambda_handler(event, context):
    #movies released by year comparison
    
    cursor = connection.cursor()
    sql = "SELECT meta_score,gross FROM movie_dump_indexes GROUP BY gross ORDER BY COUNT(*) DESC"
    cursor.execute(sql)
    rows = cursor.fetchall()
    for row in rows:
        return{
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'score and gross income': json.dumps(rows)
        }