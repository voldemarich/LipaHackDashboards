var ws;
var chart;
var data;
document.addEventListener('DOMContentLoaded', function() {
  ws = new Wampy('/ws', { realm: 'AppRealm',
    onConnect: function () { status('bg-green'); init(); },
    onClose: function () { status('bg-red'); },
    onError: function () { status('bg-red'); },
    onReconnect: function () { status('bg-yellow'); },
    onReconnectSuccess: function () { status('bg-green'); }
  });
  data = { labels : ["1","2","3","4","5", "6", "7", "8", "9", "10"],
        datasets : [ { backgroundColor: "rgba(0, 0, 0, 0)", borderColor: "rgba(220, 0, 0, 0.9)", data : [5,10,15,20,5,15,10,20,5,5] } ] };
chart = new Chart("chart", {
    type: 'line',
    data: data,
    options: {
        responsive: false,
    }
});
}, false);
function status(cl) {
  document.getElementById('status').className = cl;
}

function add(num) {
  data.datasets[0].data.splice(0, 1);
  data.datasets[0].data.push(num);
  chart.update();
}
    
function init() {
  to();
}
function to() {
    var rnd = getRandomArbitrary(5, 20);
    ws.publish('upd.chart', rnd);
    add(rnd);
    setTimeout(to, rnd * 50);
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
