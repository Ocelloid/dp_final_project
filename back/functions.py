import json
import os
import pymysql

#TODO Connect to mysql db
#add data to the db from the dataset
#

endpoint = 'aws-project.cth6m6izvneu.us-east-1.rds.amazonaws.com'
username = 'admin'
password = ''
db_name = 'movie_db'

connection = pymysql.connect(endpoint,user=username,passwd=password, db=db_name)

# get * data from the db
def lambda_handler(event, context):
    cursor = connection.cursor()
    cursor.execute('SELECT * from movie_dump')
    rows = cursor.fetchall()
    for row in rows:
        #print("{0},{1},{2},{3},{4},{5},{6},{7},{8}".format(row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[0]))
        y = json.dumps(row)
        print(y)
        
    movieID= 'POST_REQ'        

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
