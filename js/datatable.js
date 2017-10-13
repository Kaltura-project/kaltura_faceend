function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
// Truncate a string
function strtrunc(str, max, add) {
    add = add || '...';
    return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
};

var adapter = new LocalStorage('db');
// const adapter = new FileSync('db.json')
const db = low(adapter)

// // Set some defaults
// db.defaults({ posts: [], user: {} })
//   .write()
//
// // Add a post
// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write()
//
// // Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write()
//
// console.log(makeid());
//
// db.write();
// console.log('State has been saved')
// var foo = db.read('posts');
// console.log(foo);
// console.log('State has been updated')
// db.set('ID', makeid()).write();
var dataset = [
    ["4dsi-caex", "16301-16399 Elmira St, Detroit, MI 48227, USA", "(42.370016069270704 -83.20635641917033)", "STOP", "GOOD", "img/1.png", "21/06/15"],
    ["7vky_j4pn", "16301-16399 Orangelawn St, Detroit, MI 48227, USA", "(42.36767742985984 -83.2062402542254)", "STOP", "GOOD", "img/2.png", "02/03/08"],
    ["m4qe-tv9n", "16231 Plymouth Rd, Detroit, MI 48227, USA", "(42.37243702723885 -83.20526145747874)", "STOP", "DAMAGED", "img/3.png", "04/05/12"],
    ["m4qe-tv9n", "16101-16199 Orangelawn Ave, Detroit, MI 48227, USA", "(42.36770177184374 -83.20381340661926)", "STOP", "GOOD", "img/4.png", "12/01/12"],
    ["32yr-tkxm", "16027-16031 Plymouth Rd, Detroit, MI 48227, USA", "(42.372473942986396 -83.2028194532294)", "STOP", "GOOD", "img/6.png", "29/05/07"],
    ["f3i9~27te", "16101,Plymouth Road,Detroit, MI 48227, USA", "(42.37245547910624 -83.20403922792286)", "STOP", "GOOD", "img/5.png", "01/01/05"],
    ["pin6~fzzh", "15728,Plymouth Road,Detroit, MI 48227, USA", "(42.37253260300733 -83.20046054481023)", "STOP", "GOOD", "img/8.png", "04/11/13"],
    ["t66i_a8c5", "15801-15999,Elmira Street,Detroit, MI 48227, USA", "(42.370120077216555 -83.2014855430128)", "STOP", "GOOD", "img/7.png", "14/03/05"],
    ["29hb.dtw5", "15622-15630,Plymouth Road,Detroit, MI 48227, USA", "(42.37253882712133 -83.19920538289166)", "STOP", "GOOD", "img/9.png", "12/06/13"],
    ["kjbu.86zy", "15601-15699,Orangelawn Street,Detroit, MI 48227, USA", "(42.3677972736828 -83.19901162835401)", "STOP", "GOOD", "img/10.png", "02/06/11"],
    ["sphm_x3b6", "15601-15699,Elmira Street,Detroit, MI 48227, USA", "(42.370167595297254 -83.19910851045566)", "STOP", "DAMAGED", "img/11.png", "07/05/15"],
    ["wdsw.43rz", "15501,Plymouth Road,Detroit, MI 48227, USA", "(42.372544645069155 -83.1980005772768)", "STOP", "GOOD", "img/13.png", "15/09/07"],
    ["2pqk-s9dy", "15501-15599,Elmira Street,Detroit, MI 48227, USA", "(42.3701861578512 -83.19790351198802)", "STOP", "GOOD", "img/12.png", "13/08/08"],
    ["vw6s-9yjf", "17701-18099,Elmira Street,Detroit, MI 48227, USA", "(42.36981709888222 -83.21579463529098)", "STOP", "GOOD", "img/14.png", "14/11/16"],
    ["yetw-2acc", "17701-18109,Orangelawn Street,Detroit, MI 48227, USA", "(42.3674740646073 -83.21578257192174)", "STOP", "GOOD", "img/15.png", "11/07/13"],
    ["cbiz.it57", "16201-16299 Orangelawn St, Detroit, MI 48227 USA", "(42.36768405698519 -83.20501833840981)", "YIELD", "GOOD", "", "23/06/10"],
    ["pz59~9iff", "16201-16299 Elmira St, Detroit, MI 48227 USA", "(42.37005346300989 -83.20511546545245)", "YIELD", "GOOD", "", "08/03/15"],
    ["wgjh_ptn2", "16101-16199 Elmira St, Detroit, MI 48227 USA", "(42.37007208931411 -83.20391047097804)", "YIELD", "GOOD", "", "31/07/15"],
    ["b663_airb", "16001-16099 Orangelawn St, Detroit, MI 48227 USA", "(42.367726757146535 -83.20260833834024)", "YIELD", "DAMAGED", "", "30/11/09"],
    ["R6ci-gfiz", "16001-16099 Elmira St, Detroit, MI 48227 USA", "(42.370089792426086 -83.20270549275936)", "YIELD", "DAMAGED", "", "17/05/06"],
    ["puae~rs2c", "15801-15999 Orangelawn St, Detroit, MI 48227 USA", "(42.367761605501734 -83.20138957747726)", "YIELD", "DAMAGED", "", "14/01/14"],
    ["hjtp.vv9b", "15701-15799 Orangelawn Ave, Detroit, MI 48228 USA", "(42.36777960978356 -83.20021656335021)", "YIELD", "GOOD", "", "15/04/05"],
    ["Thnr-a3ui", "15701-15799 Elmira St, Detroit, MI 48227 USA", "(42.37015009430834 -83.20032945189784)", "YIELD", "GOOD", "", "30/08/11"],
    ["Pttm-vh8t", "15501-15599 Orangelawn Ave, Detroit, MI 48227 USA", "(42.36782693697782 -83.197823658883)", "YIELD", "GOOD", "", "01/09/10"],
    ["bhzc_7mva", "17601-17699 Orangelawn Ave, Detroit, MI 48227 USA", "(42.36752702368048 -83.21471943852903)", "YIELD", "GOOD", "", "21/03/14"],
    ["Ndkq-vej4", "16319 Plymouth Rd, Detroit, MI 48227 USA", "(42.37239585942656 -83.2064006025636)", "SIGNAL", "GOOD", "", "26/10/10"],
    ["B3qe-bsju", "15820 Plymouth Rd, Detroit, MI 48227 USA", "(42.372503318607976 -83.20159947391522)", "SIGNAL", "GOOD", "", "26/04/06"],
    ["meha~4kvj", "17707 Plymouth Rd, Detroit, MI 48227 USA", "(42.372150603893935 -83.21585476795326)", "SIGNAL", "GOOD", "", "25/02/05"],
    ["Dq6i-asie", "16825 Plymouth Rd, Detroit, MI 48227 USA", "(42.3723073782159 -83.21120749973424)", "SIGNAL", "GOOD", "", "28/02/14"],
    ["swyi~bgdg", "18417-18435 Plymouth Rd, Detroit, MI 48228 USA", "(42.372119450349274 -83.22087793193279)", "SIGNAL", "GOOD", "", "28/10/07"],
    ["tw5f~b3m7", "16124 Fullerton Ave, Detroit, MI 48227 USA", "(42.37992144950064 -83.20432019526588)", "SIGNAL", "GOOD", "", "02/07/07"],
    ["mrkg_xt3t", "16135 Schoolcraft Ave, Detroit, MI 48227 USA", "(42.38687047283606 -83.20480492837527)", "SIGNAL", "GOOD", "", "28/12/16"],
    ["3b59-mjzz", "16611-16799 Schoolcraft Ave, Detroit, MI 48227 USA", "(42.38672193266466 -83.21095168323627)", "SIGNAL", "GOOD", "", "18/08/09"],
    ["crc2.wvux", "18919 Schoolcraft Ave, Detroit, MI 48223 USA", "(42.38636611830714 -83.22637831807695)", "SIGNAL", "GOOD", "", "26/07/07"],
    ["qwvk_35zz", "16003-16133 Fenkell Ave, Detroit, MI 48227 USA", "(42.40127431745006 -83.20572845005044)", "SIGNAL", "GOOD", "", "10/04/08"]
];
var foo = null;
var markers = [];
var table = null;
$(document).ready(function() {

    table = $('#datatable').DataTable({
        "createdRow": function(row, data, index) {


            var coordstring = dataset[index][2];
            var coords = coordstring.substring(1, coordstring.length - 1).split(" ");
            $('td', row).eq(1).attr("address", dataset[index][1]);
            $('td', row).eq(1).attr("img", dataset[index][5]);
            var coordId = coords.join('-').replace(/\./g, '').replace(/-/g, '');
            $(row).attr('id', coordId);
            var type = dataset[index][3];
            markers.push(addMarker(null, coords[0], coords[1], null, coordId, type));
        },
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
        data: dataset,
        columns: [{
                title: "ID"
            },
            {
                title: "Street"
            },
            {
                title: "Coord"
            },
            {
                title: "Type"
            },
            {
                title: "Condition"
            },
            {
                title: "Image URL"
            },
            {
                title: "Last Updated"
            },
        ],
        "columnDefs": [{
                "targets": [2, 5],
                "visible": false
            },
            {
                targets: 1,
                render: function(data, type, row) {
                    return data.substr(0, Math.round($("body").width() * .018)) + '...';
                }
            },
        ]
    });
    $('#datatable').dataTable().fnSettings()._iDisplayLength = Math.round(($("body").height() * .75) / $("#datatable tr").height());
    $('#datatable').dataTable().fnDraw();
    $('#datatable tbody').on('click', 'tr', function() {
        // console.log(this);
        foo = this;

        var rid = $($(this).children()[0]).text();
        var street = $($(this).children()[1]).attr("address");
        var type = $($(this).children()[2]).text();
        var image_url = $($(this).children()[1]).attr("img");
        var last_updated = $(this).children()[6];

        $("#image-holder").attr("src", image_url);

        // Google Map View Port Manipulation
        removeAllMarkers();
        addMarker(street, null, null, street, rid, type);

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });


    $('.buttons-copy').addClass('btn btn-info btn-sm');
    $('.buttons-excel').addClass('btn btn-info btn-sm');
    $('.buttons-csv').addClass('btn btn-info btn-sm');
    $('.buttons-pdf').addClass('btn btn-info btn-sm');
    $('.dt-buttons').prepend("<button class='btn btn-warning btn-sm' id='reset'>Reset</button>")

    $('#reset').on('click', function() {
        location.reload();
    });

    $('.buttons-copy').removeClass('dt-button');
    $('.buttons-excel').removeClass('dt-button');
    $('.buttons-csv').removeClass('dt-button');
    $('.buttons-pdf').removeClass('dt-button');
    markers.forEach(function(marker) {
        marker.addListener('click', function() {
            var lat = marker.position.lat();
            var lng = marker.position.lng();

            console.log('lat ' + lat);
            console.log('lng ' + lng);
            var coordId = lat + "" + lng + "";
            console.log('coordId ' + coordId);
            var coords = coordId.split(".").join("").split("-").join('');
            console.log(coords);

            console.log($('#' + coords));
            domObj = $('#' + coords);
            // var table = domObj.parent().parent();
            table.rows().deselect();
            table.row('#' + coords).select();
            var image_url = $(domObj.children()[1]).attr("img");
            $("#image-holder").attr("src", image_url);
            // if (domObj.hasClass('selected')) {
            //     domObj.removeClass('selected');
            // } else {
            //     domObj.parent().parent().find('tr.selected').removeClass('selected');
            //     domObj.addClass('selected');
            // }

            // console.log(marker)
            // var coordId = marker.position.lat() + "-" + marker.position.lng();
            // coordId = coordId;
            // // // coordId = coordId.hashCode();
            // // console.log('coordId in addListener '+ coordId);
            // //   // console.log(marker.position.lat(), marker.position.lng());
            // //   console.log(coordId);
            // //   console.log($("#"+coordId));
            // //   console.log($("#"+coordId).html());
            //   console.log('rowId ' + rowId);
            //   console.log($('#'+rowId));
            //
            //   if ($('#'+rowId).hasClass('selected')) {
            //       $('#'+rowId).removeClass('selected');
            //   } else {
            //       $('#'+rowId).parent().parent().find('tr.selected').removeClass('selected');
            //       $('#'+rowId).addClass('selected');
            //   }
            //   // $('#'+rowId).hasClass('selected');
            //   console.log('#'+rowId + ' added with class selected ');
            //   // $('#'+rowId).removeClass('selected');
            //   console.log($('#'+rowId).parent().parent());
            //   $('#'+rowId).parent().parent().find('tr.selected').removeClass('selected');
            //
            //   //TODO: HAN

        });
    });

    // $("#datatable_filter").html('<input type="search" class="form-control" placeholder="Search..." aria-controls="datatable">');
    // $
    // $("#datatable_filter").children().children().addClass('form-control');
    // $("#datatable_filter").children().children().attr('placeholder', 'Search...');

});
