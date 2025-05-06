const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./models/User');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://fakiya:CQKVmRzYMwWqGo5o@cluster0.njwfids.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req,res) =>{
  const {username, password} = req.body;
  try{
    const userDoc = await User.create({username, password});
    res.json(userDoc);
  } catch(e) {
    res.status(400).json(e);
  }

});
app.listen(4000);
