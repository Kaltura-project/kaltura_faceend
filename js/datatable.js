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

  ["1", "MacKenzie and Strathmoor", "Good", "Stop", "images/1.jpg", "Timestamp 2"],
  ["2", "", "Poor", "Yield", "images/2.png", "Timestamp 1"],
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
      var street = $(this).children()[1];
      var condition = $(this).children()[2];
      var type = $(this).children()[3];
      var text = $(this).children()[4];
      var image_url = $(this).children()[5];
      var last_updated = $(this).children()[6];

      if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
      }
      else {
          table.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
      }
  } );
});
