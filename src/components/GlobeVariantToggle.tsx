import { useWeather } from "@/providers/WeatherProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const GlobeVariantToggle = () => {
  const { selectGlobeVariant } = useWeather()

  return (
    <Select onValueChange={(val) => selectGlobeVariant(val)} defaultValue="//unpkg.com/three-globe@2.28.0/example/img/earth-blue-marble.jpg">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Globe Variant" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="//unpkg.com/three-globe@2.28.0/example/img/earth-blue-marble.jpg">Light</SelectItem>
        <SelectItem value="//unpkg.com/three-globe/example/img/earth-night.jpg">Dark</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default GlobeVariantToggle;
