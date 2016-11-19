var ws;
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
  ws.subscribe('screens.online', function (data) { addmsg(data); });
  ws.publish('screens.acknowledge');
}
function addmsg(msg) {
  var box = document.getElementById('box');
  box.innerHTML += msg + "<br />";
}
function add() {
  ws.publish('msg.' + document.getElementById('screen_id').value, [ 'add', document.getElementById('obj_id').value, document.getElementById('obj_content').value ]);
}
function remove() {
  ws.publish('msg.' + document.getElementById('screen_id').value, [ 'remove', document.getElementById('obj_id').value ]);
}
function update() {
  ws.publish('msg.' + document.getElementById('screen_id').value, [ 'update', document.getElementById('obj_id').value, document.getElementById('obj_content').value ]);
}
function img1() {
  ws.publish('back.' + document.getElementById('screen_id').value, 'static/spreadsheet-hell.png');
}
function img2() {
  ws.publish('back.' + document.getElementById('screen_id').value, 'static/slide4.jpg');
}
function img3() {
  ws.publish('back.' + document.getElementById('screen_id').value, 'static/soydyot.jpg');
}
function imgnon() {
  ws.publish('back.' + document.getElementById('screen_id').value, '');
}
