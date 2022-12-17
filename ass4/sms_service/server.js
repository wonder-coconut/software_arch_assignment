const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.port || 4269;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routes = require('./api/routes');
routes(app);
app.listen(port, function() {
    console.log('server started on port ' + port);
})
