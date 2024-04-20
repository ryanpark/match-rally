const getWeather = async () => {
  try {
    let res = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast/?q=Sydney&appid=e67ef5bd9f979127c3ea930f50c12d9a&units=imperial"
    );

    res = await res.json();
    console.log(res);
    if (res.error) {
      return "error";
      // throw new Error(`Failed to add event: ${res.status} - ${res.statusText}`);
    }
    if (res) {
      return res;
    }
  } catch (error) {
    return "error";
  }
};

export default getWeather;
