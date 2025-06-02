"use server";

import { weatherData } from "./types/weather";
import {z} from "zod";

const weatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
    feels_like: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ),
  wind: z.object({
    speed: z.number(),
  }),
})
export async function getWeatherData_(param: string): Promise<{
    data?: weatherData,
    error?: string
}>{
    if(!param.trim()) return {error: "City name is required"}
    try{
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${param}&appid=05f76b1f6fd29c881b61acc1c0179613`)

        if(!res.ok){
            throw new Error("City not found")
        }
        const rawData = await res.json();
        const data = weatherSchema.parse(rawData);
        return {data}
    }
    catch(error){
        if(error instanceof z.ZodError){
            return {error: "invalid data recieved"}
        }
        return{
            error: error instanceof Error? error.message : "Failed to fetch data"
        }
    }
}