const mongoose = require('mongoose');
// . Courses
// Fields:
// course_id: UUID, Primary Key
// title: String
// description: Text
// thumbnail: String (URL)
// instructor_id: UUID, Foreign Key to Users(user_id)
// category: String
// created_at: Timestamp
// updated_at: Timestamp

const courseSchema = mongoose.Schema({
    course_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    instructor_id: { type: String, required: true },
    category: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;