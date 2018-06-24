FROM mongo

COPY users.json /users.json
COPY todos.json /todos.json

CMD mongoimport --host database --db test --collection users --type json --file /users.json --jsonArray; mongoimport --host database --db test --collection todos --type json --file /todos.json --jsonArray
