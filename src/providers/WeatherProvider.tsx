import { createContext, useContext, useState } from "react"
import axios, { AxiosError } from "axios"
import { cityWeatherDataType, globalVariantType } from "@/types";
import { getCountryName } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export type WeatherContextType = {
    cityWeatherData: cityWeatherDataType | null,
    cityValue: string;
    country: string;
    globeVariant: string;
    searchCity: (cityVal: string) => void;
    isLoading: boolean;
    clearResults: () => void;
    selectGlobeVariant: (globeVariantString: string) => void;
}

const WeatherContext = createContext<WeatherContextType>({
    cityWeatherData: null,
    cityValue: "",
    country:"",
    globeVariant: "",
    searchCity: () => {},
    clearResults: () => {},
    selectGlobeVariant: () => {},
    isLoading: false
})

// eslint-disable-next-line
export const useWeather = () => useContext(WeatherContext)

export default function WeatherProvider({ children } : { children: React.ReactNode }) {
    const [cityValue, setCityValue] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cityWeatherData, setCityWeatherData] = useState<cityWeatherDataType | null>(null)
    const [country, setCountry] = useState<string>("")
    const [globeVariant, setGlobeVariant] = useState<globalVariantType | string>("//unpkg.com/three-globe@2.28.0/example/img/earth-blue-marble.jpg")

    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

    const { toast } = useToast()

    const searchCity = async (cityVal: string) => {
        try {
            setIsLoading(true)
            setCityValue(cityVal)
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${API_KEY}`)
            setCityWeatherData({
                coord: {
                    lat: res.data.coord.lat,
                    lon: res.data.coord.lon,
                },
                weather: res.data.weather,
                main: {
                    temp: res.data.main.temp,
                    temp_max: res.data.main.temp_max,
                    temp_min: res.data.main.temp_min,
                    pressure: res.data.main.pressure,
                    humidity: res.data.main.humidity,
                },
                wind: {
                    speed: res.data.wind.speed,
                    deg: res.data.wind.deg
                },
                name: res.data.name,
                country: res.data.sys.country
            })
            const countryName = getCountryName(res.data.sys.country)
            setCountry(countryName)
        } catch (error) {
            setCityValue("")
            if (error instanceof AxiosError) {
                toast({
                    description: error.response?.data.message,
                    variant: "destructive"
                })
            }
            toast({
                description: "Something went wrong!",
                variant: "destructive"
            })
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const selectGlobeVariant = (globeVariantString: string) => {
        setGlobeVariant(globeVariantString)
    }

    const clearResults = () => {
        setCityValue("")
        setCityWeatherData(null)
        setCountry("")
    }

    const values = {
        cityValue,
        isLoading,
        cityWeatherData,
        searchCity,
        country,
        globeVariant,
        selectGlobeVariant,
        clearResults
    }

    return (
        <WeatherContext.Provider value={values}>
            {children}
        </WeatherContext.Provider>
    )
}