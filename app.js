//Express
const express = require('express');
const app = express();
const studentRouter = require('./routers/studentsRouter')

app.use(express.json()); // for parseing of Json data.
app.use('/api/students', studentRouter);
//initial route
app.get('/', (request, response) => {
    response.send("Hello from express js!");
});


//get a single student
// app.get('/api/students/:id', studentsDetails);


// Updating a student info:
// eventhough the logic is ok here this is really an unoptimized approch to this problem:
// find what solution that can be appied here to make this algorithm efficient
//app.put('/api/students/:id', editStudentDetails);


//delet a single student
//app.delete('/api/students/:id', deleteStudent)
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`)
})