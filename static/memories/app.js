$(document).ready(function() {

  // TODO レスポンシブ
  // TODO 本文検索
  // TODO 検索はチェックボックスで
  // TODO 外部リンクは別タブで

  var speaker1 = "";
  var speaker2 = "";
  var speaker3 = "";
  // アイドル一覧を取得してドロップダウン化
  $.ajax({
    type: "GET",
    url: "http://million-memories-server.herokuapp.com/idols",
    dataType: "json",
    success: function(data){
      var idols = $.map(data, function(idol) {
        return $("<li></li>", {role: "presentation"})
          .append($("<a></a>", {role: "menuitem", tabindex: "-1", href: "#", text: idol.name}));
      });
    // ドロップダウン追加
    $("#speaker1").append(idols.map(function(a){return a.clone().addClass('speaker1')}));
    $("#speaker2").append(idols.map(function(a){return a.clone().addClass('speaker2')}));
    $("#speaker3").append(idols.map(function(a){return a.clone().addClass('speaker3')}));
    // ドロップダウン選択時
    $("li.speaker1").click(function(){
       speaker1 = $(this).text();
    });
    $("li.speaker2").click(function(){
       speaker2 = $(this).text();
    });
    $("li.speaker3").click(function(){
       speaker3 = $(this).text();
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
      data: {"speakers":[speaker1,speaker2,speaker3].join(',')},
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
