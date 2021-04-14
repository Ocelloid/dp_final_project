import json
import os
import pymysql

#TODO Connect to mysql db
#add data to the db from the dataset
#

endpoint = 'aws-project.cth6m6izvneu.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'Killzone3'
db_name = 'movie_db'
movieID = 'POST_REQ' 

connection = pymysql.connect(endpoint,user=username,passwd=password, db=db_name)

# get * data from the db
def lambda_handler(event, context):
    cursor = connection.cursor()
    cursor.execute('SELECT * from movie_dump')
    rows = cursor.fetchall()
    return{
        'statusCode': 200,
        'body': json.dumps(rows)
    }
        
# get specific data from the server
def get_searchData(event, context):
    cursor = connection.cursor()
    sql = "SELECT * from movie_dump WHERE Title='%s"
    cursor.execute(sql % UserId)
    rows = cursor.fetchall()
    for row in rows:
        print(row)
        search = json.dumps(row)
        print(search)
