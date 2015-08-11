var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
var port = 3033;

// Twilio Credentials 
var accountSid = 'AC644e57e02118049702ba35d3b1cf95d5';
var authToken = '6517d94b52e41cd5b0abd2c84d38a0a3';

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);



var createMessageList = function(arr) {
    var result = [];
    console.log("moi");
    for (var i = 0; i < arr.length; i++) {
        result.push({
            to: arr[i].to,
            from: arr[i].from,
            message: arr[i].body,
            date: arr[i].dateCreated
        });
    }
    return result;
};


// client.messages.create({ 
// 	to: "+18582436018", 
// 	from: "+18583751208", 
// 	body: "Moi",   
// }, function(err, message) { 
// 	console.log(message.sid); 
// });

// MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//ENDPOINTS
// app.get("/api/message", function(req, res) {
//     res.send({
//         message: "Hello World!!"
//     });
// });



app.get("/api/messages/all", function(req, res) {
    client.messages.list({
        // from: "+18583751208"
    }, function(err, data) {
        console.log("data.messages", data.messages);
        // data.messages.forEach(function(message) {
        //     console.log(message.body, message.dateCreated);
        // });
        res.json(createMessageList(data.messages));
    });
    // res.send("OK");
});

// app.get("/api/messages/:tonumber", function(req, res) {
//     client.messages.list({
//         from: "+18583751208",
//         to: "+" + req.params.tonumber
//     }, function(err, data) {
//         // console.log("data.messages", data.messages);
//         data.messages.forEach(function(message) {
//             console.log(message.body, message.dateCreated);
//         });
//     });
//     res.send("OK");
// });

app.post("/api/send_message", function(req, res) {
    console.log("send msg", req.body, req.body.message);
    client.messages.create({
            // to: "+18582436018",
            to: req.body.toNumber,
            from: "+18583751208",
            body: req.body.message,
        },
        function(err, message) {
            console.log(message.sid);
        });

    res.send("OK");
});

app.post('/api/support/resources', function(req, res) {
    var filename = req.param('filename');
    console.log("req.param('filename')", filename);
    res.sendFile(__dirname + "/public/files/" + filename + ".pdf");
});

var server = app.listen(port, function() {
    console.log("Listening at address", server.address());
});
