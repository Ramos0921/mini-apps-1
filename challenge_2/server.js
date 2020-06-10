var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client'));

app.set('port',3000)


app.get('/', (req,res)=>{


})
app.post('/text',(req,res)=>{
  fs.open(path.join(__dirname +'data.csv'),'w',()=>{
    var text= req.body.textArea;


    if(text[text.length-1] === ';'){
      text = text.slice(0,-1);

    };
    var data = JSON.parse(text);
    var header = '';
    for(key in data){
      if(key !== 'children'){
        header = header +key +',';
      };
    }
    header = header.slice(0,-1)+'\n';
    //takes a path and text and callback
    fs.appendFile('data.csv', header,()=>{
      var totalRows = '';
      var recurse = function(data){
        //base case
        if(!data.children){
          return;
        }
        var row = '';

        for(var key in data){
          if(key !== "children"){
            row = row+ data[key]+',';
          }
        }

        row = row.slice(0,-1)+'\n';
        totalRows = totalRows+row;
        for(var i =0; i<data.children.length;i++){
          recurse(data.children[i]);
        };
      }

      recurse(data);

      fs.appendFile('data.csv',totalRows,()=>{

        res.sendFile(path.join(__dirname,'data.csv'));
      })

    })

  })

})

app.listen(app.get('port'),()=>{
  console.log('listening on port', app.get('port'))
})

module.exports.app = app;
