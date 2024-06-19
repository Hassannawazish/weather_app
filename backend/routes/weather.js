const express = require('express');
const router = express.Router();

// Utility function to format data
const formatData = (data) => ({
  _id: data._id.toString(),
  temperature: data.temperature,
  humidity: data.humidity,
  detail: data.detail || {},
  wind_speed: data.wind_speed || null
});

// GET all weather data
router.get('/', async (req, res) => {
  try {
    const weatherDataCollection = req.app.locals.weatherDataCollection;
    const allData = await weatherDataCollection.find().toArray();
    console.log('All data retrieved from MongoDB:', allData);
    const formattedData = allData.map(formatData);
    console.log('Formatted data:', formattedData);
    res.json({ status: 'success', data: formattedData });
  } catch (err) {
    console.error('Error in GET /weather_data:', err);
    res.status(500).json({ detail: `An error occurred: ${err.message}` });
  }
});

// GET weather data by ID
router.get('/:data_id', async (req, res) => {
  try {
    const weatherDataCollection = req.app.locals.weatherDataCollection;
    const data = await weatherDataCollection.findOne({ _id: new require('mongodb').ObjectID(req.params.data_id) });
    console.log('Data retrieved by ID from MongoDB:', data);
    if (data) {
      res.json({ status: 'success', data: [formatData(data)] });
    } else {
      res.status(404).json({ detail: 'Data not found' });
    }
  } catch (err) {
    console.error('Error in GET /weather_data/:data_id:', err);
    res.status(500).json({ detail: `An error occurred: ${err.message}` });
  }
});

// POST create new weather data
router.post('/', async (req, res) => {
  try {
    const weatherDataCollection = req.app.locals.weatherDataCollection;
    const result = await weatherDataCollection.insertOne(req.body);
    const insertedData = await weatherDataCollection.findOne({ _id: result.insertedId });
    console.log('Saved data:', insertedData);
    res.json({ status: 'success', data: [formatData(insertedData)] });
  } catch (err) {
    console.error('Error in POST /weather_data:', err);
    res.status(500).json({ detail: `An error occurred: ${err.message}` });
  }
});

// PUT update weather data by ID
router.put('/:data_id', async (req, res) => {
  try {
    const weatherDataCollection = req.app.locals.weatherDataCollection;
    const updatedData = await weatherDataCollection.findOneAndUpdate(
      { _id: new require('mongodb').ObjectID(req.params.data_id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    console.log('Updated data:', updatedData.value);
    if (updatedData.value) {
      res.json({ status: 'success', data: [formatData(updatedData.value)] });
    } else {
      res.status(404).json({ detail: 'Data not found' });
    }
  } catch (err) {
    console.error('Error in PUT /weather_data/:data_id:', err);
    res.status(500).json({ detail: `An error occurred: ${err.message}` });
  }
});

// DELETE weather data by ID
router.delete('/:data_id', async (req, res) => {
  try {
    const weatherDataCollection = req.app.locals.weatherDataCollection;
    const deletedData = await weatherDataCollection.findOneAndDelete({ _id: new require('mongodb').ObjectID(req.params.data_id) });
    console.log('Deleted data:', deletedData.value);
    if (deletedData.value) {
      res.json({ status: 'success', data: [] });
    } else {
      res.status(404).json({ detail: 'Data not found' });
    }
  } catch (err) {
    console.error('Error in DELETE /weather_data/:data_id:', err);
    res.status(500).json({ detail: `An error occurred: ${err.message}` });
  }
});

module.exports = router;
