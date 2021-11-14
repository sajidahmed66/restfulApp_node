//Express
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const studentRouter = require('./routers/studentsRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');


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


// routers 
app.use('/api/students', studentRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


//initial route
app.get('/', (request, response) => {
    response.send("Hello from express js!");
});

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
})

