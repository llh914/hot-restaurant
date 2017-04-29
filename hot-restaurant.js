//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Data
var tables = [{
    table: 'table1',
    name: 'Stacy',
    phoneNumber: '8675309',
    email: 'stacy@awesome.com',
    uniqueID: '9'
}, {
    table: 'table2',
    name: 'John',
    phoneNumber: '6453746',
    email: 'john@notcool.com',
    uniqueID: '7'
}, {
    table: 'table3',
    name: 'Edward',
    phoneNumber: '8574635',
    email: 'ed@gmail.com',
    uniqueID: '8'
}, {
    table: 'table4',
    name: 'Paul',
    phoneNumber: '5643424',
    email: 'paul@gmail.com',
    uniqueID: '6'
}, {
    table: 'table5',
    name: 'Jenny',
    phoneNumber: '4536271',
    email: 'jenny@coolgirl.com',
    uniqueID: '34'
}];

var waiting = [{
    name: 'Linette',
    phoneNumber: '8675309',
    email: 'linette@awesome.com',
    uniqueID: '3'
}, {
    name: 'Zach',
    phoneNumber: '6453746',
    email: 'zach@notcool.com',
    uniqueID: '5'
}, {
    name: 'Panos',
    phoneNumber: '8574635',
    email: 'panos@gmail.com',
    uniqueID: '14'
}, {
    name: 'Lauren',
    phoneNumber: '5643424',
    email: 'lauren@gmail.com',
    uniqueID: '23'
}, {
    name: 'Adam',
    phoneNumber: '4536271',
    email: 'adam@coolguy.com',
    uniqueID: '12'
}];


//Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/api/tables/:name?", function(req, res) {
    var name = req.params.name;
    console.log(tables);
    console.log(tables[0]);

    if (name) {
        console.log(name);
        for (var i = 0; i < tables.length; i++) {
            if (name === tables[i].name) {
                return res.json(tables[i]);
            }
        }
        return res.json(false);
    }
    return res.json(tables);
});

app.get("/api/waitlist/:name?", function(req, res) {
    var name = req.params.name;
    console.log(waiting);
    console.log(waiting[0]);

    if (name) {
        console.log(name);
        for (var i = 0; i < waiting.length; i++) {
            if (name === waiting[i].name) {
                return res.json(waiting[i]);
            }
        }
        return res.json(false);
    }
    return res.json(waiting);
});
app.post('/api/clear', function(req, res) {
    tables = [];
    waiting = [];
});

//Add New Reservations

app.post("/api/new", function(req, res) {
    var newtable = req.body;
    if (tables.length < 5) {
        tables.push(newtable);
        res.json(newtable);
    } else {
        waiting.push(newtable);
        res.json(newtable);
    }
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
