var express = require('express'),
   bodyParser = require('body-parser'),
   _ = require('lodash');


var app = express()
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
   res.status(500).send('root');
})




app.use((req, res, next) => {
   res.send('not found');
})

app.listen(3005, function(){console.log('listening on 3000')});
