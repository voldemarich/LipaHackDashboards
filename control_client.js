/**
 * Created by voldemarich on 19.11.2016.
 */
    
var wp = new Wampy("ws://192.168.15.115:8080/ws", {realm:"AppRealm"});

    
var conf = [
    {
        screen_name: "Kokoustila-1",
        id: 1
    },
    {
        screen_name: "Kokoustila-2",
        id: 2
    },
    {
        screen_name: "Sisäänkäynti-1",
        id: 3
    },
    {
        screen_name: "Tehtaalla-4",
        id: 4
    }
];

var getBoardFromId = function(id){
    //alert(id);
    return id.match("\\d+")[0]
};

var send_text = function (board) {
    board = board.data.boardnum;
    text = prompt("Put text here.");
    html = "<div class='jumbotron' style='align-self: center; alignment: center;'><h1 style='align-content: center'>"+text+"</h1></div>";
    wp.publish("client.control", [board, "text", html]);
    $("#img_"+board).html(html);
};

var send_img = function (board) {
    board = board.data.boardnum;
    //html = "<div class=''>"
};

var send_file = function (board) {
    board = board.data.boardnum;


};

var send_blank = function (board) {
    board = board.data.boardnum;
    wp.publish("client.control", [board, "text", ""]);
    $("#img_"+board).html("");
};

var send_url = function (board) {
    board = board.data.boardnum;
    text = prompt("Put url here.");
    html = "<div class='thumbnail' style='align-self: center; alignment: center;'><iframe src=\"http://"+text+"\"/></h1></div>";
    wp.publish("client.control", [board, "text", html]);
    $("#img_"+board).html(html);
};

var send_alert = function (board) {
    board = board.data.boardnum;
    text = prompt("Put text here.");
    html = "<div class='jumbotron' style='background-color: red; align-self: center; alignment: center;'><h1 style='align-content: center'>"+text+"</h1></div>";
    wp.publish("client.control", [board, "text", html]);
    $("#img_"+board).html(html);
};




conf.forEach(function (x) {
    var row = "";
    if (x.id % 2 == 0){
        row = "#r2";
    }
    else row = "#r1";
    text= "text_"+ x.id;
    file= "file_"+ x.id;
    url= "url_"+ x.id;
    blank= "blank_"+ x.id;
    alrt= "alert_"+ x.id;
    img_uid = "img_" + x.id
    
    $(row).loadTemplate($("#kek"),
        {
            screen_name: x.screen_name,
            write_text: text,
            write_file: file,
            write_url: url,
            write_blank: blank,
            write_alert: alrt,
            img_id:img_uid,
            screen_img: "c2s.jpg"
        },
        {append:true}
    );
    
    var param = [
        {
            format:text,
            action:send_text
        },
        {
            format:file,
            action:send_file
        },        {
            format:url,
            action:send_url
        },        {
            format:blank,
            action:send_blank
        },        {
            format:alrt,
            action:send_alert
        }
        ];
    param.forEach(function(x){
       $("#"+ x.format).on("click", null, {boardnum:getBoardFromId(x.format)}, x.action);
    });
});



