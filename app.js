const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){

var firstName = req.body.fname;
var lastname = req.body.lname;
var email = req.body.mail;

var data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastname
        },
    }
]
};

var jsonData = JSON.stringify(data);

var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/f8c5fb5b18",
    method: "POST",
    headers:{
        "Authorization": "bigrich 719cd6c9b465ba3b450098221bc69e6e-us4"
    },

    body: jsonData
};


request(options, function(error,response,body){
    if(error){
        res.sendFile(__dirname + '/failure.html');
    }
    else{
        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        }
        else{
            res.sendFile(__dirname + '/failure.html');
        }
    }

});

});

app.post("/failure", function(req, res){
    res.redirect('/');
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server 3000");
});
