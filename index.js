// create http server
const express = require('express')
const app = express()

// just to handle post message parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

/* the OS can pass environment variable to the nodejs server
   if we dont get one, use 3000 by default
   
   the trick here: || have lazy loading, so you can use it instead of something like this:
   var port = 3000
   if (process.env.PORT){
       port = process.env.PORT
   }
*/

var port = process.env.PORT || 3000;
// current logs in a variable - without DB. will be lost at server restart
var logs = [];

// helper function to build our minimal page
function buildHTML(){

    html = "";
    // concat log
    for(var index in logs){
        html += "<br>" + logs[index];
    }
    // add basic textfield
    html += `
    <form method="post" action="/">
    <input type="text" name="message">
    <input type="submit" value="Submit">
    </form>
    `;
    return html;
}

/**
 * If we send some data with POST to /, store it with the date
 */
app.post('/', (req, res) => {
    
    if(req.body.message){
        var date = new Date();
        var msg = date.toGMTString() + ": " + req.body.message ;
        logs.push(msg);
    }

    res.send(buildHTML())
});

app.get('/about', (req, res) => { res.render("pages/about")})

/**
 * Just generate the current list for / GET
 */
app.get('/', (req, res) => {
    res.send(buildHTML())
})

app.listen(port, () => console.log('Example app listening on port ' + port))