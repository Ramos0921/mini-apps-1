
var app ={
  initiate: function(){

    $('#app').append(`<form id = "textArea"></form>`)
    $('#textArea').append(`<textarea id = "textbox" type= textarea rows ="4" cols="25"></textarea>`)
    $('#textArea').append(`<button type=submit id="submit">Submit</button>`);
    $('#submit').on('click', app.handleClick);


  },

  handleClick: function(event){

    var userData = {textArea: $('#textbox').val()};

    $.ajax({
      method:'POST',
      url: '/text',
      data: JSON.stringify(userData),
      contentType: 'application/json',
      success: function(data){

        app.render(data);
      },
      error: function(error){
        console.error("Failed: ",error);
      }
    });
    event.preventDefault();
  },

  render: function(data){
    console.log(typeof data);
    $('#app').append(data);
  }

}