require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin')
const mongoose = require('mongoose');
const cors = require('cors');
// const { generateToken } = require('./middleware/auth');
// const { validateToken } = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cors());


//middlewares
app.use(bodyParser.json());



const PORT = process.env.PORT || 4000;

//cnnect to mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{console.log('MongoDB connected')})
  .catch(err => console.log(err));


// routes
app.get('/', (req, res) => {
    res.send('Personal Finance Management Tool API')
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})