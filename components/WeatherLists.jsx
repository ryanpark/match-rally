import {
  SunDim,
  CloudSun,
  Cloud,
  Cloudy,
  CloudRainWind,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  CloudDrizzle,
} from "lucide-react";
import { css } from "@shadow-panda/styled-system/css";

const displayIcons = {
  clearsky: <SunDim />,
  fewclouds: <CloudSun />,
  scatteredclouds: <Cloud />,
  brokenclouds: <Cloudy />,
  overcastclouds: <Cloudy />,
  showerrain: <CloudRainWind />,
  lightrain: <CloudDrizzle />,
  rain: <CloudRain />,
  thunderstorm: <CloudLightning />,
  snow: <CloudSnow />,
  mist: <CloudFog />,
};

const currentDate = new Date();
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentDay = daysOfWeek[currentDate.getDay()];

const WeatherLists = ({ lists }) => {
  return (
    <div className={css({ display: "flex", gap: "10px" })}>
      {lists &&
        lists.length > 0 &&
        lists.map((list, index) => {
          let dayToDisplay;
          if (index === 0) {
            dayToDisplay = currentDay;
          } else {
            const nextDayIndex = (index + index) % 7;
            dayToDisplay = daysOfWeek[nextDayIndex];
          }
          if (index === 0 || (index + 1) % 8 === 0) {
            return (
              <div
                key={index}
                title={list.weather[0].description}
                className={css({
                  color: "white",
                  display: "none",
                  sm: { display: "block" },
                })}
              >
                <div>{dayToDisplay}</div>
                {displayIcons[list.weather[0].description.replace(/\s+/g, "")]}
              </div>
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default WeatherLists;
