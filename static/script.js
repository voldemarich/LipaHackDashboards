var ws;
var name = 'unnamed_screen';
document.addEventListener('DOMContentLoaded', function() {
  ws = new Wampy('/ws', { realm: 'AppRealm',
    onConnect: function () { status('bg-green'); init(); },
    onClose: function () { status('bg-red'); },
    onError: function () { status('bg-red'); },
    onReconnect: function () { status('bg-yellow'); },
    onReconnectSuccess: function () { status('bg-green'); }
  });
}, false);
function status(cl) {
  document.getElementById('status').className = cl;
}
function init() {
  ws.subscribe('screens.acknowledge', function (data) { ws.publish('screens.online', name); });
  ws.subscribe('msg.' + name, function (data) { whatdowedo(data); });
}
function add_obj(content) {
  var box = document.getElementById('box');
  box.innerHTML += "<div style='color: red;' id='" + content + "'>" + content + "</div>";
}
function remove_obj(id) {
  var obj = document.getElementById(id);
  obj.parentElement.removeChild(obj);
}
function whatdowedo(data) {
  switch (data[0]) {
    case 'add': add_obj(data[1]); break;
    case 'remove': remove_obj(data[1]); break;
    default: addmsg(data);
  }
}
function addmsg(msg) {
  var box = document.getElementById('box');
  box.innerHTML += msg + "<br />";
}
