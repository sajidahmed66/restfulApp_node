const {Schema, model} = require('mongoose');

// model creation
const Student = model('Student', Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true, min: 12},
    hobbies: {
        type:Array, 
        of: String, 
        validate: {
        validator: (value)=>value.length > 0,
        message: 'At least one hobby is required'
        }
    }
}));
//export model
exports.Student = Student;