//Express
const express = require('express');
const morgan = require('morgan');
const app = express();
const studentRouter = require('./routers/studentsRouter')

app.use(express.json()); // for parseing of Json data.

app.use(express.urlencoded({ extended: true }));// parses data that is passed through the url like : id=1&&name=someThing
app.use(express.static('public'))


app.use(morgan('dev'))

// routers 
app.use('/api/students', studentRouter);


//initial route
app.get('/', (request, response) => {
    response.send("Hello from express js!");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
})