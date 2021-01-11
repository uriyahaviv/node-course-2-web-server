const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); // build in module

var app = express();

// register templates
hbs.registerPartials(__dirname + '/views/partials');
// set view engine to hbs file extension
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();

	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log', log + '\n', (err) => {
		console.log('Unable to append log server.log!');
	});
	next(); // continue our app from here
});

// app.use((req, res, next) => {
	// res.render('maintenance.hbs');
// });

// use public folder as main folder
app.use(express.static(__dirname + '/public')); // dirname is the main directory 'node-web-app'

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => { // request, response
	// res.send('<h1>Hello Express</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to my website'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle this request'
	})
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
