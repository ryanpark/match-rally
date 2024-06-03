interface EventTypes {
  date: object;
  location: string;
  city: string;
  time: object;
  user: string;
  message: string;
  level: string;
  email: string;
}

interface ResponseType {
  error: boolean;
  success: boolean;
}

const addEvent = async (event: EventTypes) => {
  try {
    const { date, location, city, time, user, message, level, email } = event;

    const response = await fetch("/api/post", {
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

    let res: ResponseType = await response.json();
    if (res.error) {
      throw new Error();
    }
    if (res.success) {
      return res;
    }
  } catch (error) {
    return error;
  }
};

export default addEvent;
