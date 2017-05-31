const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/app');
const bodyParser = require('body-parser');
const app = express();
const users = require('./routes/unsplash');
const port = 3000;

//set static Folder
app.use(express.static(path.join(__dirname,'public')));
//CORS middleware
app.use(cors());
//boyd-parse middleware
app.use(bodyParser.json());
app.use('/users',users);
//index route
app.get('/', (req,res) => {
    res.send('Invalid Endpoint');
})

app.listen(port,() => {
    console.log('Server started on port '+port);
});