var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client'));

app.set('port',3000)
app.listen(app.get('port'),()=>{
  console.log('listening on port', app.get('port'))
})

app.get('/', (req,res)=>{


})
app.post('/text',(req,res)=>{

  fs.writeFile('result.txt', makeJson(req.body.textArea),(err)=>{
    if(err){
      throw err;
    }
    //res.download('result.txt')
  })
})

var makeJson= function(string){
  var stringSplit = string.split(';')[0];
  var arr = [];

  stringSplit = JSON.parse(stringSplit);

  var recurse = function(obj){
    var result =[];
    result.push(Object.values(obj).slice(0,-1))
    console.log(result)
  }
  recurse(stringSplit)
}

module.exports.app = app;
