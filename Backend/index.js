//import the require dependencies
var express = require('express');
var app = express();
const expressAsyncHandler = require('express-async-handler');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');

const User = require('./Models/userModel');
const Item = require('./Models/itemModel');
const { generateToken } = require('./auth');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
    // res.end();
});

const DB_URI = 'mongodb+srv://root:pass@cluster0.eohaa.mongodb.net/lab2?retryWrites=true&w=majority';
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

var Users = [
    { username : "admin", password : "admin", email : "admin@gmail.com"},
]

var items = [
  {itemID : 1, Title : "item 1", price : 1.5},
  {itemID : 2, Title : "item 2", price : 2.5},
  {itemID : 3, Title : "item 3", price : 3.5}
]

var shops = [{"shopID": "1", "owner": "admin", "items": [{"itemID" : "1", "Title" : "item 1", "price" : 1.5}]}]

//Route to get All items when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("items : ",JSON.stringify(items));
    res.end(JSON.stringify(items));
    
})

app.post('/search', function(req,res){
    const keyword = req.body.keyword;
    console.log("req: ", keyword)
    const results = items.filter((item) => {
        return item.Title.includes(keyword);    
    });
    console.log(results);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });

    res.end(JSON.stringify(results));
    
})

app.post('/login', expressAsyncHandler(async (req, res) => {
    console.log("Req Body : ", req);
    const user = await User.findOne({ email: req.body.email});
    
    if(user) {

        if(req.body.password === user.password) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user)
            });
        }else{
            res.status(401).send({ message: 'Wrong password'});
        }
    }else{
        res.status(401).send({ message: 'Email does not exist'});
    }
     
})
);

app.post('/signup', expressAsyncHandler(async ({body}, res) => {
    console.log("Req Body : ", body);

    // create a new user 
    const user = new User({
        name: body.name,
        email: body.email,
        password: body.password
    });
    // save new user in db
    const createdUser = await user.save();
    console.log("created user : ", createdUser);

    // send user obj back
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        token: generateToken(createdUser)
    });
})
);

app.post('/create', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Req Body : ", req.body);
        // Check if item ID is not duplicate
        const i = shops.findIndex( shop => {
            return shop.owner === req.body.owner;
        });

        if( i !== -1 ){
            console.log(i);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("Duplicate shop id")
        } else {
            console.log(i);
            shops.push({"shopID": req.body.shopID, "owner": req.body.owner, "items": []})
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("Shop creation successful")
        }       
    }

});

app.post('/delete', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Req Body : ", req.body);
        const i = items.findIndex( item => {
            return item.itemID === req.body.id;
        });
          
        if( i !== -1 ){
            items.splice(i, 1);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("item deletion successful")
        } else {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("item not found")
        }
        
    }
})

app.post('/edit-user', function (req, res) {
    
    if (!req.session.user) {
        res.redirect('/');
    } else {
        Users.map( user => {
            if (req.body.name === user.username){
                
                if ("nameNew" in req.body){
                    user.username = req.body.nameNew;
                    res.cookie('cookie',user.username,{maxAge: 900000, httpOnly: false, path : '/'});
                }
            }
                           
        });
          
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("name changed")
        
    }
})

app.post('/shop', function (req, res) {
    
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Req name: ", req.body.name);
        const i = shops.findIndex( shop => {
            return shop.owner === req.body.name;
        });
          
        if( i !== -1 ){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            console.log(shops[i])
            res.end(JSON.stringify(shops[i]));
        } else {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("Shop not found")
        }
    }
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");