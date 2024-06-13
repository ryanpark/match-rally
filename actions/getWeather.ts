interface ResponseType {
  error: boolean;
}

const WEATHER_URI =
  "https://api.openweathermap.org/data/2.5/forecast/?q=Sydney&appid=e67ef5bd9f979127c3ea930f50c12d9a&units=imperial";

const getWeather = async () => {
  try {
    const response = WEATHER_URI && (await fetch(WEATHER_URI));
    const res: ResponseType = response && (await response.json());

    if (res.error) {
      throw Error;
    }
    if (res) {
      return res;
    }
  } catch (error) {
    return error;
  }
};

export default getWeather;
