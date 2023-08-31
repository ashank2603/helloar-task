export type cityWeatherDataType = {
    coord: {
        "lon": number,
        "lat": number
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    name: string;
    country: string;
}

export type globalVariantType = "//unpkg.com/three-globe/example/img/earth-night.jpg" | "//unpkg.com/three-globe@2.28.0/example/img/earth-blue-marble.jpg"

export type globeDataType = {
    latitude: number | undefined;
    longitude: number | undefined;
    cityName: string;
    tvalue: number;
}