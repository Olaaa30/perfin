require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const logger = require('./utils/logger')
// const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler/index');
// const { generateToken } = require('./middleware/auth');
// const { validateToken } = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cors());


//middlewares
app.use(bodyParser.json());
app.use(errorHandler);



const PORT = process.env.PORT || 4000;

//cnnect to mongodb
connectDB();


// routes
app.get('/', (req, res) => {
    res.send('Personal Finance Management Tool API')
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes)

app.listen(PORT, () =>{
    logger.info(`Server is running on port ${PORT}`)
})