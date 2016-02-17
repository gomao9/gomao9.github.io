$(document).ready(function() {

  // TODO レスポンシブ
  // TODO 本文検索
  // TODO 外部リンクは別タブで

  var speaker1 = "";
  var speaker2 = "";
  var speaker3 = "";
  // アイドル一覧を取得してドロップダウン化
  $.ajax({
    type: "GET",
    url: "http://million-memories-server.herokuapp.com/idols",
    dataType: "json",
  }).done(function(data){
    var idols = $.map(data, function(idol) {
        $label = $('<label></label>', {class: 'btn btn-default', text: idol.name})
        return $label.append($('<input />', {type: 'checkbox', value: idol.name}));
    });
    $('#idols').append(idols);
  });

  // 検索
  $("#search").click(function(){
    // ロード中
    $btn = $(this).button('loading');
    $dialogs = $('#dialogs');
    $dialogs.empty();

    var speakers = $.makeArray($(':checked').map(function(){return this.value})).join(',');

    $.ajax({
      type: "GET",
      url: "http://million-memories-server.herokuapp.com/search",
      data: {"speakers": speakers},
      dataType: "json"
    }).done(function(data){
        tags = data.map(function(dialog){
          content = dialog.dialogs.map(function(d){
            return $('<p></p>', {text:d.speaker + ':' + d.text});
          });
          return $('<li></li>', {class:"list-group-item"}).append($("<a></a>", {href:dialog.url, text:"参照"})).append(content);
        });
        return $dialogs.append(tags);
    }).always(function() {
      $btn.button("reset");
    });

  });
});
