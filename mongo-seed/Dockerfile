FROM mongo

COPY init.json /init.json

CMD mongoimport --host database --db todo --collection users --type json --file /init.json --jsonArray
