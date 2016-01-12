var express = require('express');
var expressLayouts = require('cloud/express-layouts');
var parseExpressCookieSession = require('parse-express-cookie-session');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');

var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(expressLayouts);          // Use the layout engine for express
app.use(parseExpressHttpsRedirect());    // Automatically redirect non-secure urls to secure ones
app.use(express.bodyParser());    // Middleware for reading request body
app.use(express.methodOverride());
app.use(express.cookieParser('SECRET_SIGNING_KEY'));
app.use(parseExpressCookieSession({
  fetchUser: true,
  key: 'image.sess',
  cookie: {
    maxAge: 3600000 * 24 * 30
  }
}));



app.locals._ = require('underscore');


// Homepage endpoint


app.get('/', function(req, res) {
  // Get the latest images to show
  if (Parse.User.current()) {
    res.render('map');
    
  }
  else{
     res.render('home');
  }
});

app.get('/map', function(req, res) {
   
     res.redirect('');
  
  });

app.get('/Precios', function(req, res) {
   res.send('hola');
  });

app.get('/logOut', function(req, res) {
    Parse.User.logOut();
    res.redirect('/');
  });

 app.post('/logIn', function(req, res) {
    Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
     
      res.redirect('map');
    }, function(error) {
      // Show the error message and let the user try again
       res.render('login.ejs',{error:error.message});
      // res.send(error);
    });
  });

 // app.get('/isocrona', function(req, res) {
   
 //  });

 app.post('/register', function(req, res) {
   
    var user = new Parse.User();
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
     
    // other fields can be set just like with Parse.Object
    //user.set("phone", "415-392-0202");
      user.signUp().then(function(user) {
      res.redirect('/');
    }, function(error) {
      // Show the error message and let the user try again
      res.send(error.message);
    });
    
    

  });

  



// Attach the Express app to Cloud Code.
app.listen();