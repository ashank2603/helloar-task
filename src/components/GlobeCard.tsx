import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Globe from 'react-globe.gl';
import { useWeather } from "@/providers/WeatherProvider";
import { useEffect, useState, useRef, MutableRefObject } from "react";
import { globeDataType } from "@/types";
import GlobeVariantToggle from "./GlobeVariantToggle";

const GlobeCard = () => {
  const { cityValue, country, cityWeatherData, globeVariant } = useWeather()
  // @ts-expect-error globe-ref-error
  const globeRef = useRef<MutableRefObject<>>(null)
  const [globeData, setGlobeData] = useState<globeDataType[]>([]);

  useEffect(() => {
    if (cityWeatherData) {
      globeRef.current.controls().autoRotate = false;
    } else {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.1;
    }

  }, [cityWeatherData]);

  useEffect(() => {
    if (cityWeatherData) {
      setGlobeData([
        {
          latitude: cityWeatherData.coord.lat,
          longitude: cityWeatherData.coord.lon,
          cityName: cityValue,
          tvalue: 18978000
        }
      ]);

      if (globeRef.current) {
        const { current } = globeRef;
        current.pointOfView({ lat: cityWeatherData.coord.lat, lng: cityWeatherData.coord.lon }, 2000);
      }
    }
  }, [cityWeatherData, cityValue]);

  return (
    <Card className="w-[75%]">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
            {cityValue ? `${cityValue}, ${country}` : "Search city to display here"}
            <GlobeVariantToggle />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-center">
        <div className="md:w-[500px] lg:w-full flex flex-row justify-center">
          <Globe 
              ref={globeRef}
              width={850}
              height={700}
              globeImageUrl={globeVariant}
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              labelsData={globeData}
              // @ts-expect-error object-type-mismatch
              labelLat={d => d.latitude}
              // @ts-expect-error object-type-mismatch
              labelLng={d => d.longitude}
              // @ts-expect-error object-type-mismatch
              labelText={d => d.cityName}
              // @ts-expect-error object-type-mismatch
              labelSize={d => Math.sqrt(d.tvalue) * 4e-4}
              // @ts-expect-error object-type-mismatch
              labelDotRadius={d => Math.sqrt(d.tvalue) * 4e-4}
              labelColor={() => 'rgba(255, 165, 0, 0.75)'}
              labelResolution={2}
              showAtmosphere
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobeCard;
