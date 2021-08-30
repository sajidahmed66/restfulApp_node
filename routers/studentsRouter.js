const express = require('express');
const router = express.Router();
const { getDbStudents, insertDbStudents } = require('../db')

const studentsList = (req, res) => {
    getDbStudents().then(
        students => {
            res.send(students)
        }
    )
};

const studentsDetails = (req, res) => {
    const studentId = parseInt(req.params.id);
    getDbStudents().then(
        students => {
            const student = students.find(student => student.id === studentId);
            if (!student) { res.status(404).send("No student found  with this id") }
            res.send(student);
        }
    )
};

const addStudent = (req, res) => {
    const student = req.body;
    insertDbStudents(student).then(
        students => res.send(student)
    )
};

const editStudentDetails = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    getDbStudents().then(students => {
        const student = students.find(student => student.id === id)
        if (!student) {
            res.status(404).send("No student found  with this id")
        } else {
            const insertIndex = students.findIndex(student => student.id === id);
            //write a controller for inserting/updating value
            students[insertIndex] = updatedData
            console.log(students)
        }
    }
    )
};

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    getDbStudents().then(students => {
        const student = students.find(student => student.id === id)
        if (!student) {
            res.status(404).send("No student found  with this id")
        }
        //write a delete controller with filter aurg
    })
};

router.route('/')
    .get(studentsList) //get total list of students 
    .post(addStudent); //post a new student

router.route('/:id')
    .get(studentsDetails)
    .put(editStudentDetails)
    .delete(deleteStudent);

module.exports = router