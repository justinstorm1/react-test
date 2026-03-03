"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-react";

const getWeatherIcon = (main: string) => {
  switch (main.toLowerCase()) {
    case "clear":
      return <Sun className="w-12 h-12 text-yellow-500" />;
    case "clouds":
      return <Cloud className="w-12 h-12 text-gray-400" />;
    case "rain":
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    case "snow":
      return <CloudSnow className="w-12 h-12 text-blue-200" />;
    case "wind":
      return <Wind className="w-12 h-12 text-gray-600" />;
    default:
      return <Sun className="w-12 h-12 text-yellow-500" />;
  }
};

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async () => {
    if (!city) return;
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
  };

  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <div className="flex gap-2">
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <Button onClick={fetchWeather}>Get Weather</Button>
      </div>

      {weather && weather.error && (
        <p className="text-red-500 mt-4">{weather.error}</p>
      )}

      {weather && !weather.error && (
        <Card className="w-80 shadow-lg">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-2xl font-bold">{weather.name}</CardTitle>
            <p className="text-gray-500">{weather.weather[0].description}</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {getWeatherIcon(weather.weather[0].main)}
            <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <div className="flex justify-between w-full px-4">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
