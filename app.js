//Express
const express = require('express');
const morgan = require('morgan');

const app = express();
const studentRouter = require('./routers/studentsRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');



// middleware
app.use(express.json()); // for parseing of Json data.
app.use(morgan('dev')); // for logging output.


// routers 
app.use('/api/students', studentRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


//initial route
app.get('/', (request, response) => {
    response.send("Hello from express js!");
});

module.exports = app;
