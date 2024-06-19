const mongoUser = 'Hassan_Nawazish';
const mongoPassword = 'Hassan12345';
const mongoHost = 'localhost';
const mongoPort = '27017';
const mongoDb = 'WeatherData';
const collectionName = 'weather_data';

module.exports = {
  mongoURI: `mongodb+srv://${mongoUser}:${mongoPassword}@weatherdata.n5niixq.mongodb.net/${mongoDb}?retryWrites=true&w=majority`
};
