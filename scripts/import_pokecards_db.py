import requests
import time
import json
import mysql.connector

api_endpoint = 'https://api.pokemontcg.io/v2/cards?pageSize=200'

db = mysql.connector.connect(
    host="localhost",
    user="dev",
    password="dev",
    database="dis_tcgc"
)
cur = db.cursor()
page = 1
while(True):
    response = requests.get(api_endpoint + "&page=" + str(page))
    if response.status_code == 200:
        data = json.loads(response.content)['data']
        print("Got {} new cards".format(len(data)))
        if len(data) < 1:
            print("No more cards to import, exiting...")
            break
        for d in data:
            sql = """
                INSERT INTO cards_pokemon
                (`external_id`, `super_type`, `sub_types`, `types`, `name`, `set`, rarity, image_small, image_large)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
                """
            if "rarity" in d:
                rarity = d['rarity']
            else:
                rarity = ""
            values = (
                d['id'],
                d['supertype'],
                "|" . join(d['subtypes']) if "subtypes" in d else "",
                "|" . join(d['types']) if "types" in d else "",
                d['name'],
                str(d['set']['name']).lower(),
                rarity,
                d['images']['small'],
                d['images']['large']
            )
            cur.execute(sql, values)
        db.commit()
        page = page + 1
        time.sleep(10)
    else:
        break
