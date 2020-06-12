const express = require('express');
var path = require('path');
var app = express();

var bodyParser =require('body-parser')


app.set('port',3000)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'client/dist')));



app.get('/', (req,res)=>{
  res.statusCode(200);
})
app.post('/',(req,res)=>{
  var check = req.body;
  res.send(check);
})

app.listen(app.get('port'),()=>{
  console.log("server listening on port: "+ app.get('port'));
})
