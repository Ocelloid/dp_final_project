import json
import pymysql

#TODO Connect to mysql db
#add data to the db from the dataset
#

enpoint = ''
username = ''
password = ''
db_name = 'movie_db'

connection = pymysql(endpoint,user=username,passwd=password, db=db_name)

# get * data from the db
def get_data(even, context):
    cursor = connection.cursor()
    cursor.execute('SELECT * from Movies')
    rows = cursor.fetchall()
    for row in rows:
        print({0},{1})