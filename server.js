const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();


app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Routes
const OrderRoutes = require('./Routes/order');
const userRoutes = require('./Routes/user');
const petRoutes = require('./Routes/pet');

//routes
app.use('/store', OrderRoutes);
app.use("/user",userRoutes);
app.use('/',petRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//======================
// Fetch data from your JSON file
// const fs = require('fs')
// const databaseData = require('./database.json');

// // Convert data to JSON
// const jsonData = JSON.stringify(databaseData);

// // Write JSON data to a file
// fs.writeFile('database.json', jsonData, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('JSON data has been exported to database.json');
// });