const addEvent = async (event) => {
  try {
    const { date, location, city, time, user, message, level, email } = event;

    let res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: date,
        title: location,
        city: city,
        time: time,
        user: user,
        message: message,
        level: level,
        email: email,
      }),
    });

    res = await res.json();
    if (res.error) {
      return "error";
      // throw new Error(`Failed to add event: ${res.status} - ${res.statusText}`);
    }
    if (res.success) {
      return res;
    }
  } catch (error) {
    return "error";
  }
};

export default addEvent;
