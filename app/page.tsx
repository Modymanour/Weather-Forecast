"use client";
import Image from "next/image";
import clouds from "./utils/clouds.png"
import Searchbutton from "./utils/searchbutton"
import { getWeatherData } from "./actions";
import { getWeatherData_ } from "./openweather";
import './globals.css'
import { useState } from "react";
import { weatherData } from "./types/weather";
import {motion} from "framer-motion";
export default function Home() {
    const [weather,setWeather] = useState<weatherData | null>(null);
    const [error,seterror] = useState<string>("")
    const handleSearch = async (formData: FormData) => {
        // const Longitude = formData.get("Longitude") as string;
        // const Latitude = formData.get("Latitude") as string;
        // const data = await getWeatherData([Longitude,Latitude]);
        // console.log(data);
        
        const city = formData.get("city") as string;
        const {data,error:weathererror} = await getWeatherData_(city);
        console.log(weathererror)
        if(weathererror){
            seterror(weathererror);
            setWeather(null)
        }
        if(data){
            setWeather(data);
            seterror("")
        }
    }
    return(
        <>
        <div>
            <div className="container">
            <form className="formContainer" action={handleSearch}>
                <div>
                    <input type="text"
                    placeholder="Enter the city..."
                    className="textbox"
                    name="city"></input>
                </div>
                <div>
                    <Searchbutton />
                </div>
            </form>
            {error && (
                <motion.div
                initial={{opacity:0,y:10}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0}}
                transition={{duration:0.3}}
                 className="errorContainer">
                    <div className="errorText">{error}</div>
                </motion.div>
            )}
            {weather && (
                <motion.div
                initial={{opacity:0,y:10}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0}}
                transition={{duration:0.3}}
                className="resultContainer">
                    <div className="cityName">
                        {weather.name}
                    </div>
                    <div className="secondRow">
                        <div>
                            <Image src={clouds}
                        alt={weather.weather[0].description}
                        width={32}
                        height={32}
                        className="weatherImg"
                        />
                        </div>
                        <div className="temp">{Math.round((weather.main.temp/10))} C</div>
                    </div>
                    <div className="desc">{weather.weather[0].description}</div>
                </motion.div>
            )}
            </div>
        </div>
        
        </>
    )
}
