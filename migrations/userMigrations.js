const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.once('open', async () => {
//     try {
//         console.log('Connected to MongoDB');
//         const result = await User.updateMany({}, {
//             $set: {
//                 firstName: '', 
//                 lastName: '',  
//                 updatedAt: new Date(), 
//                 role: 'user', 
//                 profilePicture: ''
//             }
//         });
//         console.log(`Migration completed successfully. Updated ${result.nModified} documents.`);
//     } catch (error) {
//         console.error('Migration failed:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// });

mongoose.connection.once('open', async () => {
    try {
        // Remove the 'name' field from all documents
        const result = await User.updateMany({}, { $unset: { name: "" } });

        console.log(`Migration completed successfully. Modified ${result.nModified} documents.`);
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        mongoose.connection.close();
    }
});
