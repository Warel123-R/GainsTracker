const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/dev');
const bodyParser = require('body-parser');
console.log('Here2');
require('./services/passport');
console.log('here3');
mongoose.connect(keys.mongoURI);

const {PythonShell} = require('python-shell');


const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60* 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

// let pastMeals = [
//   { date: '2024-02-22', calories: 300, protein: 25, carbs: 40, fat: 15 },
//   { date: '2024-02-23', calories: 350, protein: 30, carbs: 45, fat: 17 },
//   // Add more past meal data as needed
// ];

// // Route to get past meals
// app.get('/past-meals', (req, res) => {
//   res.json(pastMeals);
// });
// Route to add a new current meal


app.post('/current-meals', (req, res) => {
  const newMeal = req.body;
  // Here you would typically validate the input data before adding it to the database
  pastMeals.push(newMeal);
  res.status(201).send('Meal added successfully');
});

const users = [
    { id: 1, username: 'admin', password: 'password' },
];
  
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.cookie('user', user.username, { httpOnly: true });
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Route to check current user
app.get('/current-user', (req, res) => {
  const currentUser = req.cookies.user;
  if (currentUser) {
    res.json({ username: currentUser });
  } else {
    res.status(401).json({ error: 'User not logged in' });
  }
});

app.post('/nutrients', (req, res) => {
  console.log(req.body);
  let {nutriments, nutrition_data_per, product_name, quantity} = req.body;
  res.status(201).send('Nutrients received successfully');
});

app.post('/takePicture', (req, res) => {
  console.log("Taking picture");
  var pyshell = new PythonShell('CV/barcode_to_nutrients.py');
  pyshell.on('message', function (message) {
    console.log(message);
  });
})

app.listen(5004, () => {
  console.log(`Server is running on http://localhost:${5004}`);
});
