
import requests
import time
import json
import mysql.connector

api_endpoint = 'https://api.pokemontcg.io/v2/sets'

db = mysql.connector.connect(
    host="localhost",
    user="dev",
    password="dev",
    database="dis_tcgc"
)
cur = db.cursor()


response = requests.get(api_endpoint) 
if response.status_code == 200:
    data = json.loads(response.content)['data']
    print("Got {} new sets".format(len(data)))

    for s in data:
        sql = """
            INSERT INTO sets_pokemon (e_id, `name`, `series`, `total`, `symbol`, `logo`)
            VALUES (%s,%s,%s,%s,%s,%s)
        """
        values = (s['id'], s['name'], s['series'], s['total'], s['images']['symbol'], s['images']['logo'])
        cur.execute(sql, values)

db.commit()
