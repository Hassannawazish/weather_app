# weather_app
    $ docker build -t weather-api .
    $ docker run -p 5050:5050 \
        -e CONNECTION_STRING="mongodb+srv://Hassan_Nawazish:Hass@weatherdata.n5niixq.mongodb.net/" \
        -e MONGO_DB="WeatherData" \
        -e COLLECTION_NAME="weather_data" \
        -e PORT="5050" \
        weather-api
