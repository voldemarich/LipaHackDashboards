/**
 * Created by voldemarich on 19.11.2016.
 */

var conf = [
    {
        screen_name: 'Kokoustila-1',
        id: 1
    },
    {
        screen_name: 'Kokoustila-2',
        id: 2
    },
    {
        screen_name: 'Sisäänkäynti-1',
        id: 3
    },
    {
        screen_name: 'Tehtaalla-4',
        id: 4
    }
];

conf.forEach(function (x) {
    var row = "";
    if (x.id % 2 == 0){
        row = "#r2";
    }
    else row = "#r1";
    alert(row+x.screen_name+x.id);
    $(row).loadTemplate("templates/screen_op_template.html",
        {
            screen_name: x.screen_name,
            write_text: 'text_'+ x.id,
            write_file: 'file_'+ x.id,
            write_url: 'url_'+ x.id,
            write_blank: 'blank_'+ x.id,
            write_alert: 'alert_'+ x.id,
            screen_img: 'av.jpg'
        }
    );
});

