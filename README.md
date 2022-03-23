
# Houze App

**Final project with [Manchester Codes](https://www.manchestercodes.com/)**

This is API for the Houze App. To be able to run the complete React app locally clone the [React frontend app](https://github.com/MaggieTheCoder/HauzeChores-app) and follow the installation below:

**Set up**

-clone this repo and set up local .env settings for:

DB_PASSWORD= choose your own password

DB_NAME=houze_app

DB_USER=root

DB_HOST=localhost

DB_PORT=3307

PORT=4000

-create .env.test file with same details.

-set up the database connection, pull docker image and use MySQLWorkbench to manage the database. Change password to your chosen one. 

```
docker run -d -p 3307:3306 --name houze_app -e MYSQL_ROOT_PASSWORD=password mysql
```

run:

```
npm i
```


**Project status**

**Contributors**

[Maggie](https://github.com/MaggieTheCoder)
[Rachel](https://github.com/greenchul)
[Heli](https://github.com/heliDevine)