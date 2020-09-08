const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://postsadmin:postsadminpwd@cluster0-zqzck.mongodb.net/MyPosts?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    console.log('Database connected successfully');
})
.catch((err)=>{
    console.log("Connection failed......exiting !!!");
    console.log(err);
    return;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

app.use(userRoutes);
app.use(questionRoutes);

module.exports = app;