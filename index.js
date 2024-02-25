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
const ObjectId = mongoose.Types.ObjectId;

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


app.post('/nutrients', (req, res) => {
  console.log(req.body);
  let {nutriments, nutrition_data_per, product_name, quantity} = req.body;
  
  res.status(201).send('Nutrients received successfully');
});

async function addFoodsToUser(userId, foods, date) {
  console.log(date);
  const usersCollection = mongoose.connection.collection('users');
  const user = await usersCollection.findOne({ googleId: userId });
  console.log(user)
  const userDatesCollection = mongoose.connection.collection('userDates');
  let userDate = await userDatesCollection.findOne({ userId: user._id, date });
  if (!userDate) {
    // If the user date entry doesn't exist, create it
    const userDateInsertResult = await userDatesCollection.insertOne({
      userId: user._id,
      date: date
    })
    const { insertedId } = userDateInsertResult;
    console.log(insertedId);
    userDate = {
        _id: insertedId,
        userId: user._id,
        date
    };
  }

  const userFoodsCollection = mongoose.connection.collection('userFoods');
  await userFoodsCollection.insertOne({
    userId: user._id,
    userDatesId: userDate._id,
    foods
  });

  // user.foods = foods;
  // await usersCollection.updateOne({ googleId: userId }, { $set: user });
  //console.log('Foods added to the user successfully');
}

app.post('/takePicture', (req, res) => {
  console.log("Taking picture");
  //console.log(req.body.id);
  var pyshell = new PythonShell('CV/barcode_to_nutrients.py');
  var outsidemess='';
  pyshell.on('message', function (message) {
    outsidemess=message;
    //console.log(message);
  });
  pyshell.end(function (err) {
    if (err) {
      reject(err);
    } else {
      //console.log("THIS IS WHERE I AM RN");
      // const validJsonString = outsidemess.replace(/'/g, '"').replace(/None/g, 'null');
      // //console.log(validJsonString);
      // const data = JSON.parse(validJsonString);
      // //console.log(data);
      // // Access the values
      // const productName = data.product_name;
      // const quantity = data.quantity;
      // const nutriments = data.nutriments;
      // const carbohydrates = nutriments.carbohydrates;
      // const proteins = nutriments.proteins;
      // const sodium = nutriments.sodium;
      // const energyKcal = nutriments['energy-kcal'];
      // const saturatedFat = nutriments['saturated-fat'];
      // const nutritionDataPer = data.nutrition_data_per;
      // const nutritionDataPreparedPer = data.nutrition_data_prepared_per;
      //  console.log(productName);
      // console.log(quantity);
      // console.log(nutriments);

      addFoodsToUser(req.body.id, outsidemess, req.body.date);

    }
  });
})

app.get('/api/userfoods', async (req, res) => {
  try {
    const usersCollection = mongoose.connection.collection('users');
    const user = await usersCollection.findOne({ googleId: req.query.id });

    const userDatesCollection = mongoose.connection.collection('userDates');
    const userDate = await userDatesCollection.findOne({
      userId: user._id,
      date: req.query.date
    });

    if (!userDate) {
      return res.json([]);
    }

    const userFoodsCollection = mongoose.connection.collection('userFoods');
    const userFoods = await userFoodsCollection.find({ userId: user._id, userDatesId: userDate._id }).toArray();

    if (!userFoods || userFoods.length === 0) {
      return res.json([]);
    }
    // console.log("I AM HERE");
    // console.log("I AM HERE");

    // console.log("I AM HERE");
    // console.log("I AM HERE");
    // console.log("I AM HERE");
    // console.log("I AM HERE");
    // console.log("I AM HERE");
    // console.log("I AM HERE");
    // console.log("I AM HERE");

    console.log(userFoods);
    const foods = userFoods.map(food => food.foods); // Extract the foods array from each document
    console.log(foods);
    res.json(foods);
  } catch (error) {
    console.error('Error fetching user foods:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  });


app.listen(5004, () => {
  console.log(`Server is running on http://localhost:${5004}`);
});
