const express = require('express');//load express npm, the framework we'll be using
const hbs = require('hbs');//loads handelbar. Using this view engine to make dynamic pages
const fs = require('fs');//loads file-system npm

var app = express();//stores server app

hbs.registerPartials(__dirname + '/views/partials');//Set up directory for partials: Parts of webpages that can be used on multiple pages
app.set('view engine','hbs');//key value pair. Sets express related configureation

app.use((req, res, next) =>{//registers middelware. Req stores all info about user/device
  var now = new Date().toString();//time server request was called
  var log = now + " : " + req.method + req.url;
  console.log(log);
  fs.appendFile('server.log', log + 'n', (err) =>{//uses fs npm to create file server.log with log data of how server is working
    if (err){
      console.log('Unable to append to server.log')
    }
  })
  next();//wont continue until next is called
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');//loads maintenance page then stops, as next isnt called
// })

app.use(express.static(__dirname +'/public'));//middelware configure how your third party app
//__dirname stores path to project directory + '/public' which is name of folder

hbs.registerHelper('getCurrentYear',()=>{//handelbar helper, stores info for use in all pages. stores function name and what happens when called
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

//we're setting up a handler for a get request. 2 arguments, URL + Function that runs ie response
app.get('/',(req,res) => {//req stores info from request, response stores methods for response.
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Sonam',
    likes: [
      'Biking',
      'Julie'
    ]
  })
});

app.get('/about', (req,res) => {//sets new route to localhost:3000/about. -Makes a new webpage
  res.render('about.hbs', {//renders template(about.hbs) and object passed in as arguments
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()//built in JS constructor
  })//Objects rendered through HBS can be accessed in html using double curly brackers
});

app.get('/home', (req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  })
});

app.get('/bad', (req,res) => {
  res.send({
    name: 'Error',
    problem: [
      'Page not found'
    ]
  })
});

app.listen(3000, () =>{
  console.log('Server is up on port 3000')
});//binds application to a port on our system
