const express = require('express');
const router = express.Router();
const { Student } = require('../models/students');

const studentsList = async (req, res) => {
    try {
        const result = await Student.find()
            .sort({ name: 1 });
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }

};

const studentsDetails = async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await Student.findOne({ _id: studentId }); // can also use findById instead of findOne
        if (!student) return res.status(404).send("Id not found");
        res.send(student);
    } catch (err) {
        res.status(400).send("Id not found");
    }
};

const addStudent = async (req, res) => {

    const student = new Student(req.body)
    try {
        const result = await student.save();
        res.send(result);
    } catch (err) {
        const errorMesg = [];
        for (field in err.errors) {
            errorMesg.push(err.errors[field].message);
        }
        return res.status(400).send(errorMesg);
    }
};

const editStudentDetails = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const student = await Student.findOneAndUpdate({ _id: id }, updatedData, { new: true });
        if (!student) return res.send(400).send("Id not found");
        res.send(student);
    } catch (err) {
        res.status(400).send("Id not found");
    }

};

const deleteStudent = (req, res) => {
    const id = req.params.id;
    Student.findOneAndRemove({ _id: id })
        .then(student => {
            if (!student) return res.send(400).send("Id not found");
            return res.send("Id deleted");
        })
        .catch(err => {
            res.status(400).send("Id not found");
        });

};

router.route('/')
    .get(studentsList) //get total list of students 
    .post(addStudent); //post a new student

router.route('/:id')
    .get(studentsDetails)
    .put(editStudentDetails)
    .delete(deleteStudent);

module.exports = router //default export nameless export