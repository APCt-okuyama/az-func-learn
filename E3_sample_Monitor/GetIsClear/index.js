/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */
const request = require("request-promise-native");

const clearWeatherConditions = ['Overcast', 'Clear', 'Partly Cloudy', 'Mostly Cloudy', 'Scattered Clouds'];

module.exports = async function (context, location) {
    context.log(`start GetIsClear...${location}`);
    try {
        const data = await getCurrentConditionsByOpenWeather(location);
        return data;
    } catch ( error ){
        context.log(`[ERROR]:GetIsClear ${error}`);
        throw new Error(error);
    }
};

async function getCurrentConditionsByOpenWeather(location) {
    console.log('getCurrentConditionsByOpenWeather start...');
    const myUrl = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=37fe5e83f7d4a7fb7bf7db741f6afc01";
    const options = {
        url: myUrl,
        method: 'GET',
        json: true
    };

    const body = await request(options);
    if (body.error) {
        throw body.error;
    } else if (body.response && body.response.error) {
        throw body.response.error;
    } else {
        console.log("body.weather[0].main :" + body.weather[0].main);
        return body.weather[0].main;        
    }
}