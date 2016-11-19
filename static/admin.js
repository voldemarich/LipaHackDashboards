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
  ws.publish('msg.' + document.getElementById('screen_id').value, [ 'add', document.getElementById('obj_id').value ]);
}
function remove() {
  ws.publish('msg.' + document.getElementById('screen_id').value, [ 'remove', document.getElementById('obj_id').value ]);
}
