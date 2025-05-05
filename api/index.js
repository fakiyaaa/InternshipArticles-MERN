const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
// Store credentials separately to make them easier to manage
const username = 'fakiya';
const password = '01a7jOlqYW0ckIuh';

mongoose.connect('mongodb+srv://${username}:${encodeURIComponent(password)}@cluster0.ccho5zb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ');

app.post('/register', (req,res) =>{
  const {username, password} = req.body;
  res.json({requestData: {username, password}});


});
app.listen(4000);
