const User = require('../models/User');
const Course = require('../models/Course')
exports.deleteUser = async (req, res, next) =>{
    try {
        const { email } = req.body;
        const user = User.findOne({ email }); 
        if (!user){
            return res.status(404).json({ msg: "User not found."})
        }
        User.findOneAndDelete({ email });

    } catch (error) {
        
    }

};


exports.updateUserRole = async (req, res) =>{
    try {
        const { role } = req.body;
        let user = await user.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.role = role;
        await user.save();
        res.json({
            msg: "User role updated successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin'){
            return res.status(403).json({ msg: 'Permission denied' });
        }
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

//course management
exports.deleteCourse = async (req, res, next) => {

};