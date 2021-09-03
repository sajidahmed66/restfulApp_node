#  "Back-end development with nodejs , express & MongoDB". 

`A course from bohubrihi.`

;

### Middleware:

`middleware processes the request-responce that comes from the api. It intercepts the request-responce process and performs some pre-defined tasks` 


#### Built-in middleware in express

 ==> express.json() : this middleware intercepts PUT/POST/PATCH requests and parses the request object and puts it in req.body;

 ==> express.urlencoded() : parses data that is passed through the url like : id=1&&name=someThing;

 ==> express.static() :  helps express to serve the static file from working dir. like: Image,  Html and likewise.

#### Using Thrid party Middleware:

1. Morgan
        link: https://www.npmjs.com/package/morgan 
        it logs the request that is made on the backend.