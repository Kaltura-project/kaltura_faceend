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

  ["4dsi-caex","(42.370016069270704 -83.20635641917033)","STOP","GOOD","img/1.png","12/14/14"],
  ["7vky_j4pn","(42.36767742985984 -83.2062402542254)","STOP","GOOD","img/2.png","8/27/11"],
  ["m4qe-tv9n","(42.37243702723885 -83.20526145747874)","STOP","BAD","img/3.png","8/19/17"],
  ["m4qe-tv9n","(42.36770177184374 -83.20381340661926)","STOP","GOOD","img/4.png","1/3/10"],
  ["32yr-tkxm","(42.372473942986396 -83.2028194532294)","STOP","GOOD","img/6.png","4/12/15"],
  ["f3i9~27te","(42.37245547910624 -83.20403922792286)","STOP","GOOD","img/5.png","12/26/13"],
  ["pin6~fzzh","(42.37253260300733 -83.20046054481023)","STOP","GOOD","img/8.png","5/8/14"],
  ["t66i_a8c5","(42.370120077216555 -83.2014855430128)","STOP","GOOD","img/7.png","2/12/14"],
  ["29hb.dtw5","(42.37253882712133 -83.19920538289166)","STOP","GOOD","img/9.png","8/28/16"],
  ["kjbu.86zy","(42.3677972736828 -83.19901162835401)","STOP","GOOD","img/10.png","1/28/16"],
  ["sphm_x3b6","(42.370167595297254 -83.19910851045566)","STOP","BAD","img/11.png","8/31/15"],
  ["wdsw.43rz","(42.372544645069155 -83.1980005772768)","STOP","GOOD","img/13.png","12/29/15"],
  ["2pqk-s9dy","(42.3701861578512 -83.19790351198802)","STOP","GOOD","img/12.png","6/14/15"],
  ["vw6s-9yjf","(42.36981709888222 -83.21579463529098)","STOP","GOOD","img/14.png","9/12/15"],
  ["yetw-2acc","(42.3674740646073 -83.21578257192174)","STOP","GOOD","img/15.png","1/3/10"],

];
var foo = null;
$(document).ready(function(){

  var table = $('#datatable').DataTable({
    "createdRow": function ( row, data, index ) {
      $('td', row).eq(1).addClass('addr');
    },
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
   ],
   "columnDefs": [
            {
                "targets": [ 4 ],
                // "visible": false
            },
          ]
  });

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
