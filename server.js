const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{console.log('MongoDB connected')})
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Personal Finance Management Tool API')
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})