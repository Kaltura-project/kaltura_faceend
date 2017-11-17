var STREET_OVERRIDE = true;
var foo = null;
var markers = [];
var table = null;

// add jumpToData to dataTable API
jQuery.fn.dataTable.Api.register('page.jumpToData()', function(data, column) {
    var pos = this.column(column, {
        order: 'current'
    }).data().indexOf(data);

    if (pos >= 0) {
        var page = Math.floor(pos / this.page.info().length);
        this.page(page).draw(false);
    }

    return this;
});

// Style mods to dataTable
function styletable() {
    $('#datatable').dataTable().fnSettings()._iDisplayLength = Math.round(($("body").height() * .75) / $("#datatable tr").height());
    $('#datatable').dataTable().fnDraw();

    $('.buttons-copy').addClass('btn btn-info btn-sm');
    $('.buttons-excel').addClass('btn btn-info btn-sm');
    $('.buttons-csv').addClass('btn btn-info btn-sm');
    $('.buttons-pdf').addClass('btn btn-info btn-sm');
    $('.buttons-copy').removeClass('dt-button');
    $('.buttons-excel').removeClass('dt-button');
    $('.buttons-csv').removeClass('dt-button');
    $('.buttons-pdf').removeClass('dt-button');

    $('.dt-buttons').prepend("<button class='btn btn-warning btn-sm' id='reset'>Reset</button>")
}

function loadtable(dataset){
    // street override tmp
    var d = [];
    dataset.forEach(function(e) {
        if (STREET_OVERRIDE) {
            e[1] = "W Main St, New York, New York, 10044, USA";
        }
        d.push(e);
    });
    // create the dataTable
    table = $('#datatable').DataTable({
        "createdRow": function(row, data, index) {
            $('td', row).eq(1).attr("address", dataset[index][1]);
            $('td', row).eq(1).attr("img", dataset[index][5]);
            var id = dataset[index][0];
            $(row).attr('id', id);
            var coordstring = dataset[index][2];
            var coords = coordstring.substring(1, coordstring.length - 1).split(" ");
            var type = dataset[index][3];
            markers.push(addMarker(null, coords[0], coords[1], null, id, type));
            $('td', row).eq(1).attr("longitude", coords[0]);
            $('td', row).eq(1).attr("latitude", coords[1]);
        },
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
        data: d,
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

    styletable();

    // handle click on reset
    $('#reset').on('click', function() {
        location.reload();
    });

    // handle click on dataTable row
    $('#datatable tbody').on('click', 'tr', function() {
        foo = this;

        var rid = $($(this).children()[0]).text();
        var street = $($(this).children()[1]).attr("address");
        var type = $($(this).children()[2]).text();
        var image_url = $($(this).children()[1]).attr("img");
        var last_updated = $(this).children()[6];
        var longitude = $($(this).children()[1]).attr("longitude");
        var latitude = $($(this).children()[1]).attr("latitude");

        $("#image-holder").attr("src", image_url);

        // Google Map View Port Manipulation
        removeAllMarkers();
        addMarker(street, longitude, latitude, null, rid, type);

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // handle click on map marker
    markers.forEach(function(marker) {
        marker.addListener('click', function() {
            var rowid = marker.id;
            table.rows().deselect();
            table.page.jumpToData(rowid, 0);
            table.rows("#" + rowid).select();
            var image_url = table.rows("#" + rowid).data()[0][5];
            $("#image-holder").attr("src", image_url);
        });
    });
}

$.getJSON("signs.json", function(json) {
    var nsigns = [];
    var sets = json['allsigns'];
    for (var i = 0; i < sets.length; i++) {
        signs = sets[i]['signs'];
        for (var j = 0; j < signs.length; j++) {
            nsigns.push($.map(signs[j], function(el) { return el }));
        }
    }
    loadtable(nsigns);
});
