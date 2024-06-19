require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const weatherRoutes = require('./routes/weather');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const CONNECTION_STRING = process.env.CONNECTION_STRING;
let weatherDataCollection;

MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('MongoDB connected');
    const db = client.db(process.env.MONGO_DB);
    weatherDataCollection = db.collection(process.env.COLLECTION_NAME);
    app.locals.weatherDataCollection = weatherDataCollection;
  })
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/weather_data', weatherRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('<h1><p>Go to UI or Postman to call and test API\'s.................!</p></h1>');
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
