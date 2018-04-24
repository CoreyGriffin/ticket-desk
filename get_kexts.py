#! /usr/bin/python
import sqlite3
db = sqlite3.connect('/var/db/SystemPolicyConfiguration/KextPolicy')
cur = db.cursor()
cur.execute('SELECT * FROM kext_policy;')
results = cur.fetchall()
for result in results:
    print("Team ID: " + result[0] + " --- " + "Bundle ID: " + result[1])