"use client";

import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import weatherData from '../weatherData.json'; 

const WeatherCard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [cities, setCities] = useState<any[]>([]);
  const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
    setCities(weatherData.cities);
  }, []);

  const currentCity = cities[currentCityIndex];

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth w-full">
        {cities.map((city, index) => (
          <Card
            key={index}
            className={`h-screen snap-start flex flex-col justify-center items-center max-w-[500px] m-auto shadow-lg rounded-lg bg-gradient-to-br from-orange-400 to-yellow-300 dark:from-blue-900 dark:to-black`}
          >
            <CardHeader className="text-center">
              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">{city.name} Weather</p>
                <p className="text-lg text-white">Current Temperature: {city.temperature.current}°C</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center w-full px-4">
                <div className="w-1/2 flex justify-center">
                  <Image
                    src={isDarkMode ? "/second.png" : "/second.png"} // Adjust the images for dark/light mode
                    alt="Weather Icon"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Button variant="outline" className="rounded-full mb-2 text-white" onClick={() => setCurrentCityIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length)}>
                    Previous
                  </Button>
                  <Button variant="outline" className="rounded-full text-white" onClick={() => setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length)}>
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-center">
              <div className="space-y-2 text-white">
                <p>Condition: {city.condition}</p>
                <p>Humidity: {city.humidity}%</p>
                <p>Wind Speed: {city.windSpeed} km/h</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;


