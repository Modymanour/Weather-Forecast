"use server";
import { fetchWeatherApi } from 'openmeteo';

export async function getWeatherData(param: any){
    const params = {
	"latitude": param[0],
	"longitude": param[1],
	"hourly": "temperature_2m"
};
    try{
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];
        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();
        const hourly = response.hourly()!;
        const weatherData = {
        hourly: {
                time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                    (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                ),
                temperature2m: hourly.variables(0)!.valuesArray()!,
            },
        };

        // `weatherData` now contains a simple structure with arrays for datetime and weather data
        for (let i = 0; i < weatherData.hourly.time.length; i++) {
            console.log(
                weatherData.hourly.time[i].toISOString(),
                weatherData.hourly.temperature2m[i]
            );
        }
        return weatherData
    }   
    catch(error){
        console.error(error)
    }
}