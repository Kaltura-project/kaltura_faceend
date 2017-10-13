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

// Set some defaults
db.defaults({
        posts: [],
        user: {}
    })
    .write()

// Add a post
db.get('posts')
    .push({
        id: 1,
        title: 'lowdb is awesome'
    })
    .write()

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
    .write()

console.log(makeid());

db.write();
console.log('State has been saved')
var foo = db.read('posts');
console.log(foo);
console.log('State has been updated')
db.set('ID', makeid()).write();

$(document).ready(function() {
    $('#datatable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        iDisplayLength: Math.round(($("body").height() * .55) / $("#datatable tr").height())
    });
});
