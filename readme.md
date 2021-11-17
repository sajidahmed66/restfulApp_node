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



## MongoDB Intregation :

    add path variable to local system, 
    C:\Program Files\MongoDB\Server\4.4\bin

after adding path variable , mongo-cli can be used from your command shell/bash shell

### start server : from shell run

        mongod.exe

Now the mongo Server is running.

now to connect your database: run this command from a new shell window

        mongo

we'll be taken to a mongo shell now diffrent shell command can be performed.

### create data base: 
        
        db.use.my-test
A new db named my-test is created if no db named 'my-test' is found and switched to  my-test.

### creating documents in a  colloction:

        db.students.insertOne({...}) //creates one document in a collection named students
        db.students.insertMany([{},{},...]) // to create multiple documents in a collection.


### Get list of all db in local:
        
        show dbs


### switch between database:

        use dbName
### Queue from documents, 
 1. reading a collection : 

        db.students.find()  // finds a collection named students 

2. Condition based queue:
   
        doc link: https://docs.mongodb.com/mongodb-shell/crud/read/

 
 `Any keyword starts with '$' is an operator`

### performing Update operation. 


### usung mongoose with mongodb and express:

 connecting to the db:
    mongoose.connect("url_of_db",{extra_prapms})
    
 this is a callback function returns a promise

 creation of  scheme--> model --> export model--> import model to controller(not sure)
 --> conncet to database.

  findbyId/findOne will return null if length of the id(string) passed as param is same as the actual lenght od id of an object in collection. so validation or error must be checked for that occurence.

### User Authentication & Authorization:
        authentication : defination goes here
         authorization : defination goes here
Authentication:
1. creaton of user.
2. saving hash password in db.
3. authentication of user (compaing hash password).
4. generate Jwt.
5. set environment variables and get secret for jwt from env.
6. created a method in schema/model to generate jwt/authToken,
7. send jwt by calling the method on the object

Authorization:
1. extract the token from req object.
2. validate the token.
3. Give access or send error mesg.
4. Do all above processes as middlewere.
5. Protect all route with middleware. Here the middlewere is the one to checks JWT and varifies the user and authorizes access to the content.

NOTE: JWT secret is stored as environment variable. user of a third party libary called "dotenv" . And is processes must be initiated before express app loads.
### Role based user authorization.
Access to handle diffrent content based on role.

1. field for diffent role at user/admin scheme.
2. assign diffrent role at time of creation.
3. have a midleware that checks the role and calls the next function.(well this turned out to be really simple)
4. If a route takes multiple middleware pass them as array

didn't test role based access in code (too lazy);

======================================================================

this marks the ending of the tutorial serie. Dated : 17-11-21;

======================================================================

