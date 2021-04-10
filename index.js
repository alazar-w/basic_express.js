const express = require('express');
const app = express();
const path = require('path');

const logger = require('./middleware/logger')

const PORT = process.env.PORT || 5000;

//set static folder
// app.use(express.static(path.join(__dirname,'public')));

// app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname,'public','index.html'));
//   })



//Init logger
app.use(logger);

//Init body parser middle ware(used to parse the content of the body we we send data to the server like in CREATE A POST)
//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// This method is called as a middleware in your application using the code: app.use(express.json());
app.use(express.json())

//Handling form submission
//express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
// This method is called as a middleware in your application using the code: app.use(express.urlencoded());
app.use(express.urlencoded({extended:false}));

//Members Api Routes
app.use('/api/members',require('./routes/api/members'));


app.listen(PORT,()=> console.log(`server started on port ${PORT}`));
