const express = require('express');
const router = express.Router();


const studentsList = (req, res) => {
  
};

const studentsDetails = (req, res) => {
    const studentId = parseInt(req.params.id);
     
};

const addStudent = (req, res) => {
    const student = req.body;
  
};

const editStudentDetails = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    
};

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
   
};

router.route('/')
    .get(studentsList) //get total list of students 
    .post(addStudent); //post a new student

router.route('/:id')
    .get(studentsDetails)
    .put(editStudentDetails)
    .delete(deleteStudent);

module.exports = router //default export 