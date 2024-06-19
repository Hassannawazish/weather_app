const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  detail: { type: Object, default: {} },
  wind_speed: { type: Number, default: null }
});

module.exports = mongoose.model('Weather', WeatherSchema);
