const addEvent = async (event) => {
  try {
    let res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: event.date,
        title: event.location,
        city: event.city,
        time: event.time,
        user: event.session,
        message: event.message,
        level: event.level,
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
