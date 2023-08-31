import { useWeather } from "@/providers/WeatherProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Search, XCircle, Loader } from "lucide-react"

const SideCard = () => {
  const [inputVal, setInputVal] = useState<string>("")  
  const { searchCity, country, isLoading, cityWeatherData, clearResults } = useWeather()  

  return (
    <Card className="w-[25%]">
      <CardHeader>
        <CardTitle>Search City</CardTitle>
        <CardDescription>Search for any city to get the weather details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-5">
            <Input 
                placeholder="Enter City Name"
                onChange={(e) => setInputVal(e.target.value)}
            />
            <div className="flex flex-row gap-2">
              <Button variant="outline" size="icon" onClick={() => {
                searchCity(inputVal)
                setInputVal("")
              }}>
                <Search size={20} />
              </Button>
              {
                cityWeatherData !== null && (
                  <Button onClick={clearResults} variant="outline" size="icon">
                    <XCircle size={20} />
                  </Button>
                )
              }
              {
                isLoading && <Loader className="mt-2 text-gray-400 animate-spin" />
              }
            </div>
        </div>
        {
            cityWeatherData !== null && (
                <div className="flex flex-col gap-4 py-5 px-5">
                    <h1 className="text-xl font-semibold">City: <span className="font-normal">{cityWeatherData.name}</span></h1>
                    <h1 className="text-xl font-semibold">Country: <span className="font-normal">{country}</span></h1>
                    <h1 className="text-xl font-semibold">Weather: <span className="font-normal">{cityWeatherData.weather[0].main}</span></h1>
                    <h1 className="text-xl font-semibold">Weather Description: <span className="font-normal">{cityWeatherData.weather[0].description}</span></h1>
                    <h1 className="text-xl font-semibold">Humidity: <span className="font-normal">{cityWeatherData.main.humidity} %</span></h1>
                    <h1 className="text-xl font-semibold">Temperature: <span className="font-normal">{cityWeatherData.main.temp} K</span></h1>
                    <h1 className="text-xl font-semibold">Max Temperature: <span className="font-normal">{cityWeatherData.main.temp_max} K</span></h1>
                    <h1 className="text-xl font-semibold">Min Temperature: <span className="font-normal">{cityWeatherData.main.temp_min} K</span></h1>
                    <h1 className="text-xl font-semibold">Pressure: <span className="font-normal">{cityWeatherData.main.pressure} hPa</span></h1>
                    <h1 className="text-xl font-semibold">Wind Speed: <span className="font-normal">{cityWeatherData.wind.speed} m/s</span></h1>
                    <h1 className="text-xl font-semibold">Wind Direction: <span className="font-normal">{cityWeatherData.wind.deg} meteorological degrees</span></h1>
                    <h1 className="text-xl font-semibold">Latitude: <span className="font-normal">{cityWeatherData.coord.lat}</span></h1>
                    <h1 className="text-xl font-semibold">Longitude: <span className="font-normal">{cityWeatherData.coord.lon}</span></h1>
                </div>
            )
        }
      </CardContent>
    </Card>
  );
};

export default SideCard;
