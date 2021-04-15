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
    
    #get page number & calculate the value
    pageNo= event
    convert = pageNo["uplimit"]
    limit = 10
    lowlimitcalc= int(convert) - 1
    lowlimitcalc2 = lowlimitcalc*10
    lowlimit = str(lowlimitcalc2)
    uplimit = str(limit)
    
    print(uplimit)
    print(lowlimit)

    result = json.dumps(pageNo)
    cursor = connection.cursor()
   
    sql ="SELECT * FROM movie_dump_indexes LIMIT "+lowlimit+ "," + uplimit

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
            'pagination': json.dumps(rows)
            
        }
  
    
   
    
    

