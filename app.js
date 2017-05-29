const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//set static Folder
app.use(express.static(path.join(__dirname,'public')));
//CORS middleware
app.use(cors());
//boyd-parse middleware
app.use(bodyParser.json());

//index route
app.get('/', (req,res) => {
    res.send('Invalid Endpoint');
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})

app.listen(port,() => {
    console.log('Server started on port '+port);
});