const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
const PORT = process.env.PORT;

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

//import routes for actions to perform on DB
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);


app.get('/', (req, res) =>{
    res.send('We are on home');
});


//Connect to DB
mongoose.connect( 
    process.env.DB_CONNECTION, {
    useNewUrlParser: true,  
    useUnifiedTopology: true },
    ()=> console.log('connected to DB on port: ' + PORT)
);

//SCRAPING SCRIPT GOES HERE

app.get('/scrape', (req, res) =>{
    res.send('Time to scrape');
    //run scrape as child process
});

app.listen(PORT);

