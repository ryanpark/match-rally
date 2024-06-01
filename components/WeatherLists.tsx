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

interface WeatherTypes {
  lists: Array<{
    weather: Array<{
      description: string;
    }>;
  }>;
}

type WeatherDescription =
  | "clearsky"
  | "fewclouds"
  | "scatteredclouds"
  | "brokenclouds"
  | "overcastclouds"
  | "showerrain"
  | "lightrain"
  | "rain"
  | "thunderstorm"
  | "snow"
  | "mist"
  | "moderaterain";

const dayIcons: Record<WeatherDescription, JSX.Element> = {
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
const getNextDayIndex = (currentIndex: number) =>
  (currentIndex + 1) % daysOfWeek.length;

const WeatherLists = ({ lists }: WeatherTypes) => {
  return (
    <div className={css({ display: "flex", gap: "10px" })}>
      {lists &&
        lists.length > 0 &&
        lists.map((list, index) => {
          const dayIndex =
            index === 0 ? currentDayIndex : getNextDayIndex(index - 1);
          const dayToDisplay = daysOfWeek[dayIndex];
          const weatherDescription = list.weather[0].description.replace(
            /\s+/g,
            ""
          ) as WeatherDescription;

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
                  {dayIcons[weatherDescription]}
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
