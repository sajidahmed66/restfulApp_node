#  "Back-end development with nodejs , express & MongoDB". 

`A course from bohubrihi.`

learning Repo;

## Middleware:

`middleware processes the request-responce that comes from the api. It intercepts the request-responce process and performs some pre-defined tasks` 


### Built-in middleware in express

 ==> express.json() : this middleware intercepts PUT/POST/PATCH requests and parses the request object and puts it in req.body;

 ==> express.urlencoded() : parses data that is passed through the url like : id=1&&name=someThing;

 ==> express.static() :  helps express to serve the static file from working dir. like: Image,  Html and likewise.

### Using Thrid party Middleware:

1. Morgan
        link: https://www.npmjs.com/package/morgan 
        it logs the request that is made on the backend.



### MongoDB Intregation :

    add path variable to local system, 
    C:\Program Files\MongoDB\Server\4.4\bin

after adding path variable , mongo-cli can be used from your command shell/bash shell

#### start server : from shell run

        mongod.exe

Now the mongo Server is running.

now to connect your database: run this command from a new shell window

        mongo

we'll be taken to a mongo shell now diffrent shell command can be performed.

create data base: 
        
        db.use.my-test
A new db named my-test is created and switched to  my-test

creating a colloction:

        db.students.insertOne({...}) //creates one field in a collection named students
        db.students.insertMany([{},{},...]) //

reading a collection : 

        db.students.find()  // finds a collection named students 

Get list of all db in local:
        
        show dbs


switch between database:

        use dbName
