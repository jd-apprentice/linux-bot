#!/bin/bash

curl -sSfL https://get.tur.so/install.sh | bash

read -p "Whats the name of your DB? " db_name

echo "Creating DB 📦"

turso db create $db_name

url=$(turso db show $db_name | grep -i URL: | awk '{print $2}')
token=$(turso db tokens create $db_name)

turso db shell $db_name < users.sql

echo "DB created successfully 🎉"
echo "DB URL: $url"
echo "DB Token : $token"