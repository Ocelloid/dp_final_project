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
    #Gross Genre and meta score

    cursor = connection.cursor()
    sql = "SELECT genre, 100.0 * SUM(gross) / (SELECT SUM(gross) FROM movie_dump) AS amct,100.0 * SUM(meta_score) / (SELECT SUM(meta_score) FROM movie_dump) AS mmct, COUNT(genre) FROM movie_dump_indexes GROUP BY genre ORDER BY COUNT(*) DESC"
    cursor.execute(sql)
    rows = cursor.fetchall()
    for row in rows:
        return{
        'statusCode': 200,
        'genre-avg-count': json.dumps(rows)
        }