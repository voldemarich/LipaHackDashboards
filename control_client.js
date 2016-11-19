/**
 * Created by voldemarich on 19.11.2016.
 */

conf = [
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
    row = "";
    if (x.id % 2 == 0){
        row = "#r2";
    }
    else row = "#r1";
    $(row).loadTemplate("templates/screen_op_template.html",
        {
            screen_name: x.screen_name,
            write_text: 'text_'+id,
            write_file: 'file_'+id,
            write_url: 'url_'+id,
            write_blank: 'blank_'+id,
            write_alert: 'alert_'+id,
            screen_img: 'av.jpg'
        }
    );
});

