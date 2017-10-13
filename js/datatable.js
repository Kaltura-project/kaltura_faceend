function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

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

  ["1", "MacKenzie and Strathmoor", "STOP", "Good", "img/1.png", "Timestamp 2"],
  ["2", "8558 Strathmoor", "STOP", "BAD", "img/2.png", "Timestamp 1"],
  ["row-4dsi-caex.ge5c","8800 Mark Twain","STOP","GOOD","img/1.png","14-Dec-2014 00:08:31"],
  ["row-7vky_j4pn-u6zr","(-83.2062402542254 42.36767742985984)","STOP","GOOD","img/2.png","27-Aug-2011 15:12:41"],
  ["row-m4qe-tv9n_94z9","Mark Twain and Joy","STOP","BAD","img/3.png","19-Aug-2017 23:10:49"],
  ["row-ery5_jrrc-68vm","(-83.20381340661926 42.36770177184374)","STOP","GOOD","img/4.png","03-Jan-2010 06:08:53"],
  ["row-32yr-tkxm.egm4","(-83.2028194532294 42.372473942986396)","STOP","GOOD","img/6.png","12-Apr-2015 15:45:45"],
  ["row-f3i9~27te-x34q","(-83.20403922792286 42.37245547910624)","STOP","GOOD","img/5.png","26-Dec-2013 08:46:33"],
  ["row-pin6~fzzh.5v7h","(-83.20046054481023 42.37253260300733)","STOP","GOOD","img/8.png","08-May-2014 17:39:50"],
  ["row-t66i_a8c5_afe6","(-83.2014855430128 42.370120077216555)","STOP","GOOD","img/7.png","12-Feb-2014 12:03:10"],
  ["row-29hb.dtw5.rrre","(-83.19920538289166 42.37253882712133)","STOP","GOOD","img/9.png","28-Aug-2016 08:37:42"],
  ["row-kjbu.86zy_8njc","(-83.19901162835401 42.3677972736828)","STOP","GOOD","img/10.png","28-Jan-2016 20:26:10"],
  ["row-sphm_x3b6.x898","(-83.19910851045566 42.370167595297254)","STOP","BAD","img/11.png","31-Aug-2015 12:54:23"],
  ["row-wdsw.43rz~vrjv","(-83.1980005772768 42.372544645069155)","STOP","GOOD","img/13.png","29-Dec-2015 05:44:04"],
  ["row-2pqk-s9dy-f9qp","(-83.19790351198802 42.3701861578512)","STOP","GOOD","img/12.png","14-Jun-2015 09:37:59"],
  ["row-vw6s-9yjf.zg64","(-83.21579463529098 42.36981709888222)","STOP","GOOD","img/14.png","12-Sep-2015 09:34:50"],
  ["row-yetw-2acc.6sn6","(-83.21578257192174 42.3674740646073)","STOP","GOOD","img/15.png","03-Jan-2010 17:45:06"],

];
var foo = null;
$(document).ready(function(){

  var table = $('#datatable').DataTable({
    dom: 'Bfrtip',
    buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5'
    ],
    data: dataset,
    columns: [
     { title: "ID" },
     { title: "Street" },
     { title: "Condition" },
     { title: "Type" },
     { title: "Image URL" },
     { title: "Last Updated" },
    ]
  });

  dataset = [
    ["1", "", "Good", "Stop", "Stop", "stop_url", "Timestamp 2"],
  ]

  $('#datatable tbody').on( 'click', 'tr', function () {
      console.log(this);
      foo = this;

      var rid = $(this).children()[0];
      var street = $($(this).children()[1]).text();
      var condition = $(this).children()[2];
      var type = $(this).children()[3];
      var image_url = $($(this).children()[4]).text();
      var last_updated = $(this).children()[5];

      $("#image-holder").attr("src",image_url);

      // Google Map View Port Manipulation
      removeAllMarkers();
      var complete_street = street + "St, Detroit, MI 48228, USA";
      removeMarker(complete_street, null, null, complete_street);

      if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
      }
      else {
          table.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
      }
  } );
});
