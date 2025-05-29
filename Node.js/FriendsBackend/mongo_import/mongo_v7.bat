@echo off
chcp 65001
"c:\Program Files\MongoDB\Server\7.0\bin\mongoimport.exe" --uri="mongodb://localhost:27017" --db=friends --collection=seasons --drop --file=db_one.json --jsonArray
"c:\Program Files\MongoDB\Server\7.0\bin\mongoimport.exe" --uri="mongodb://localhost:27017" --db=friends --collection=episodes --drop --file=db_many.json --jsonArray
echo PLEASE KILL AND RESTART YOUR BACKEND SERVER DEV TASK IF RUNNING!