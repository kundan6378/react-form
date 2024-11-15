const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  console.log("db connection established");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    username:String,
    password:String
  });

  const User = mongoose.model('User', userSchema);

const server = express();
const port = 8080;

server.use(cors());
server.use(bodyParser.json());
server.post("/demo", async function(req, res){
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;

    const doc = await user.save()
    console.log(doc);
    res.json(doc);
    
});

server.get("/demo", async function(req, res){
    

    const docs = await User.find({});
    res.json(docs);
    
    
});
server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});