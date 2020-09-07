var express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
let contacts = new Map();
let projections = new Map();
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

router.post('/postprojection',(request,response) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  let jsonBody = request.body;
  projections.set(jsonBody.projectCode, request.body);
  response.send('success');
  response.end();
});

router.post('/postprojectionbymonth',(request,response) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  let jsonBody = request.body;
  let projectCode = jsonBody.projectCode;
  console.log(jsonBody);
  console.log(projectCode);
  if(projections.has(projectCode)){
    let projection = projections.get(projectCode);
    console.log(projection);
    projection.projections.push({
      'offshoreAddition': jsonBody.offshoreAddition,
      'onshoreReduction': jsonBody.onshoreReduction,
      'month': jsonBody.month,
      'year': jsonBody.year
    });
    projections.set(projectCode, projection);
    console.log(projections.get(projectCode));
  }
  else{
    let projectProjection = {
      'employeeId' : jsonBody.employeeId,
      'projectCode': jsonBody.projectCode,
      'serviceLine': jsonBody.serviceLine,
      'projections': []
    };
    projectProjection.projections.push({
        'offshoreAddition': jsonBody.offshoreAddition,
        'onshoreReduction': jsonBody.onshoreReduction,
        'month': jsonBody.month,
        'year': jsonBody.year
    });
    projections.set(jsonBody.projectCode, projectProjection);
  }
  response.send('success');
  response.end();
});

router.get('/projectionbyYear/:code/:year', function(req, res) {
  let projectCode = req.params.code;
  let year = req.params.year;
  if(projections.has(projectCode)){
    let projectionsMap = projections.get(projectCode).projections.filter(element => element.year == year);
    return res.json(projectionsMap); 
  }
  else
   return res.json({});
});

router.get('/projectionbyMonth/:code/:year/:month', function(req, res) {
  let projectCode = req.params.code;
  let year = req.params.year;
  let month = req.params.month;
  if(projections.has(projectCode)){
    let projectionsMap = projections.get(projectCode).projections.filter(element => element.month == month
        && element.year == year);
    return res.json(projectionsMap); 
  }
  else
   return res.json({});
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