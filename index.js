const express = require('express')
const bodyParser = require("body-parser");
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var logs = [];

function buildHTML(){

    return html;
}

app.post('/', (req, res) => {
    
    if(req.body.user){
        var date = new Date();
        var msg = date.toGMTString() + ": " + req.body.user.name ;
        logs.push(msg);
    }
    html = "";
    for(var index in logs){
        html += "<br>" + logs[index];
    }

    html += `
    <form method="post" action="/">
    <input type="text" name="user[name]">
    <input type="submit" value="Submit">
    </form>
    `;
    res.send(html)
});



app.get('/', (req, res) => {
    var html = "";
    for(var index in logs){
        html += "<br>" + logs[index];
    }

    html += `
    <form method="post" action="/">
    <input type="text" name="user[name]">
    <input type="submit" value="Submit">
    </form>
    `;
    res.send(html)
})

app.listen(port, () => console.log('Example app listening on port ' + port))