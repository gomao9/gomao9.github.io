$(document).ready(function() {

  // TODO レスポンシブ
  // TODO 本文検索
  // TODO 3アイドル検索（ドロップダウンを3つ)
  // TODO 外部リンクは別タブで
  // TODO ドロップダウンをちゃんとつかえるものにする

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
    // ロード中
    $btn = $(this).button('loading');
    $dialogs = $('#dialogs');
    $dialogs.empty();

    $.ajax({
      type: "GET",
      url: "http://million-memories-server.herokuapp.com/search",
      data: {"speakers":speaker1},
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
