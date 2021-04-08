const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');
const fetch = require("node-fetch");
const PORT = process.env.PORT;

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());//change to express.json?

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

var db = mongoose.connection;
const scrape = require('./scripts/scrape');
scrape.posts('https://reddit.com/r/ACturnips/new.json?raw_json=1')
    .then((post) => post.save())




/*clean database
**ATLEAST**
start with a simple expiration date 10 hours from insertion
since the store has prices from 8am-noon, noon-10pm

**better solution**
revisit the post and check if "link_flair_text" = "finished" => delete from database
*/
app.listen(PORT);

