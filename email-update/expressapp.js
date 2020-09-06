var express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
let contacts = new Map();
var app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./emailutil.js')();

module.exports = function(){

router.post('/postmessage',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log(request.body.employeeId);
    let jsonBody = request.body;
    contacts.set(jsonBody.employeeId, request.body);
    response.send('success');
    response.end();
});
router.get('/getalloc/:id', function(req, res) {
    let employeedid = req.params.id;
    if(contacts.has(employeedid))
     return res.json(contacts.get(employeedid)); 
    else
     return res.json({});
});

router.get('/sendreminder', function(req, res) {
  sendReminder();
  return res.json({'status':'success'});
});

// add router in the Express app.
app.use("/", router);
app.listen(3001);
};