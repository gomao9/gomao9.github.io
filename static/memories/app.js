$(document).ready(function() {

  var speaker1 = "";
  $("a.speaker1").click(function(){
    speaker1 = $(this).text();
  });

  $("#search").click(function(){
    $dialogs = $('#dialogs');
    $.ajax({
      type: "GET",
      url: "http://million-memories-server.herokuapp.com/search",
      data: {"speakers":speaker1},
      dataType: "json",
      success: function(data){
        tags = data.map(function(dialog){
          content = dialog.attributes.dialogs.map(function(d){
            return $('<p></p>', {text:d.speaker + ':' + d.text});
          });
          return $('<li></li>', {class:"list-group-item"}).append($("<a></a>", {href:dialog.attributes.url, text:"参照"})).append(content);
        });
        return $dialogs.append(tags);
      }
    });
  });
});
