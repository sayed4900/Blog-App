const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser'); 

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(cookieParser())
app.use(express.json());
app.use(cors())
app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/posts',postRoutes);

app.listen(5000,()=>{
  console.log("Connected!");
})