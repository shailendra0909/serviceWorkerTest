const express = require('express');
var path = require('path');
const port = 3000;
const app = express();

app.use(express.static('./static'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log(req);
    res.sendFile(path.join(__dirname + '/index.html'));
});
//url config for the apps
app.get('/intercept', (request, response)=>{
    response.send({
        test: 'hello world'
    });
});

//start on the post
app.listen(port, (event)=>{
    console.log("server is running...")
})
