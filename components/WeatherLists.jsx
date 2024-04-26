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

const dayIcons = {
  clearsky: <SunDim size="30" />,
  fewclouds: <CloudSun size="30" />,
  scatteredclouds: <Cloud size="30" />,
  brokenclouds: <Cloudy size="30" />,
  overcastclouds: <Cloudy size="30" />,
  showerrain: <CloudRainWind size="30" />,
  lightrain: <CloudDrizzle size="30" />,
  rain: <CloudRain size="30" />,
  thunderstorm: <CloudLightning size="30" />,
  snow: <CloudSnow size="30" />,
  mist: <CloudFog size="30" />,
  moderaterain: <CloudDrizzle size="30" />,
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentDate = new Date();
const currentDayIndex = currentDate.getDay();
const getNextDayIndex = (currentIndex) =>
  (currentIndex + 1) % daysOfWeek.length;

const WeatherLists = ({ lists }) => {
  return (
    <div className={css({ display: "flex", gap: "10px" })}>
      {lists &&
        lists.length > 0 &&
        lists.map((list, index) => {
          const dayIndex =
            index === 0 ? currentDayIndex : getNextDayIndex(index - 1);
          const dayToDisplay = daysOfWeek[dayIndex];

          if (index === 0 || (index + 1) % 8 === 0) {
            return (
              <div
                key={index}
                title={list.weather[0].description}
                className={css({
                  color: "white",
                  display: "none",
                  pl: "15px",
                  sm: { display: "block" },
                })}
              >
                {dayToDisplay}
                <div className={css({ pt: "5px" })}>
                  {dayIcons[list.weather[0].description.replace(/\s+/g, "")]}
                </div>
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
