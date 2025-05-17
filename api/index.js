const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});

const salt = bcrypt.genSaltSync(10);
const secret = 'kqjdwqnxjwxns2';

app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://fakiya:CQKVmRzYMwWqGo5o@cluster0.njwfids.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req,res) =>{
  const {username, password} = req.body;
  try{
    const userDoc = await User.create({
      username, 
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }

});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  
  const passOk = bcrypt.compareSync(password, userDoc.password)
  if (passOk){
    //logged in
    jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('Wrong Credentials. Try Again Please');
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});


app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadsMiddleware.single('file'), (req,res) => {
  res.json(req.files);
});

app.listen(4000);
