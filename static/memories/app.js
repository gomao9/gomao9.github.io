$(document).ready(function() {

  // TODO レスポンシブ
  // TODO 再検索時結果クリア
  // TODO 検索待ちgifアニメ
  // TODO 本文検索
  // TODO 3アイドル検索（ドロップダウンを3つ)
  // TODO 外部リンクは別タブで

  var speaker1 = "";
  // アイドル一覧を取得してドロップダウン化
  $.ajax({
    type: "GET",
    url: "http://million-memories-server.herokuapp.com/idols",
    dataType: "json",
    success: function(data){
      var idols = $.map(data, function(idol) {
        return $("<li></li>", {role: "presentation"})
          .append($("<a></a>", {role: "menuitem", tabindex: "-1", class: "speaker1", href: "#", text: idol.name}));
      });
    // ドロップダウン追加
    $("#speaker1").append(idols);
    // ドロップダウン選択時
    $("a.speaker1").click(function(){
       speaker1 = $(this).text();
    });
    }
  });

  // 検索
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
