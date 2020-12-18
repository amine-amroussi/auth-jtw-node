const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Set Middlewars
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Connetc To Mongoose 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin-amine:amine123@cluster0.yxsla.mongodb.net/userDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// Mongoose Schema 
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

// Mongoose Model 
const User = mongoose.model('User', userSchema);

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/register', (req, res)=>{
    const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });


    newUser.save(err=>{
        if (!err) {
            console.log('Add User Successefly !');
            res.send('Added With success !')
        }else{
            console.log(err);
        }
    })
});

app.listen(3000, err =>{
    if (!err) {
        console.log('The Server is Up and Running in port 3000 !');
    }else{
        console.log(err);
    }
});