//Express
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const studentRouter = require('./routers/studentsRouter');

//Mongoose connect
mongoose.connect('mongodb://localhost:27017/my-students-2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log("Unable to connect.... ", err));

// middleware
app.use(express.json()); // for parseing of Json data.
app.use(morgan('dev')); // for logging output.

// parses data that is passed through the url like : id=1&&name=someThing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'))



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

