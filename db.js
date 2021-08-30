const fs = require('fs');

const getDbStudents = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            const students = JSON.parse(data);
            resolve(students);
        })
    })
}
module.exports.getDbStudents = getDbStudents;

const insertDbStudents = (student) => {
    return new Promise((resolve, reject) => {
        getDbStudents().then(data => {
            const students = data;
            students.push(student);// bad code 
            fs.writeFile('./db.json', JSON.stringify(students), (err) => {
                resolve(students)
            });
        });
    })
};

module.exports.insertDbStudents = insertDbStudents;
