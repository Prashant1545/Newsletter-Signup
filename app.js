const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");
const  response = require("express");

const app = express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data ={
        members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }
        ]

};



const jsonData = JSON.stringify(data);
const url =  "https://us20.api.mailchimp.com/3.0/lists/a9496778b4";
const options = {
    method: "POST",
    auth: "Prashant1545:eac151ad39993d4472c5334d58583a7c-us20"

}

const request = https.request(url, options, function (response) {
    if(response.statusCode===200){
        res.sendFile(__dirname+ "/success.html")
    }else{
        res.sendFile(__dirname+ "/failure.html")
    }
    response.on("data", function (data) {
        console.log(JSON.parse(data));
    })
})
    request.write(jsonData);
    request.end();
});



app.listen(process.env.PORT || 3000, function () {
    console.log("Your server is running");
});

// API keys
// eac151ad39993d4472c5334d58583a7c-us20
// List Id
// a9496778b4