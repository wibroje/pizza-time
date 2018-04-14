/* dependencies & app setup */
const pizza = require('./pizza.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();

/* set the view engine */
// app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

/* error logger, static routes */
app.use(express.static('public'));
app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get("/", function(req,res){
	res.sendfile('index.html')
});

app.get("/allpizza", function(req,res){
	res.render( 'index', {pizza:pizza} )
});

app.get("/allpizza/:id", function(req,res){
	let id = req.params.id;
	res.render( 'indiv/index', pizza[id-1])
})

/* error handler */
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});

/* setting up port & listen */
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});