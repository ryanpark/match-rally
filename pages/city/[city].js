import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import getWeather from "../../actions/getWeather";
import WeatherLists from "../../components/WeatherLists";
import CustomView from "../../plugin/customView";
import clientPromise from "../../lib/mongodb";
import EventDetails from "../../components/EventDetail";
import PostEventForm from "../../components/PostEventForm";
import FacebookLogin from "../../components/ui/loginButton";
import { Box } from "@shadow-panda/styled-system/jsx";
import { css } from "@shadow-panda/styled-system/css";

const renderEventContent = (info) => {
  return (
    <div>
      <EventDetails event={{ info }} />
    </div>
  );
};

export default function Calendar(events) {
  const calRef = useRef(null);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    function handleResize() {
      const api = calRef?.current?.getApi();
      if (api) {
        api.changeView(window.innerWidth < 765 ? "custom" : "dayGridMonth");
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const results = await getWeather();
        setWeather(results.list);
      } catch (e) {
        console.error(e);
      }
    };

    fetchWeatherData();
  }, []);

  console.log(weather);
  return (
    <div
      className={css({
        color: "black",
        height: "100%",
        padding: "10px",
        lg: { padding: "15px" },
        sm: { padding: "10px" },
      })}
    >
      <Box
        display="flex"
        justifyContent={"space-between"}
        ml={"-15px"}
        alignItems={"center"}
      >
        <img
          className={css({ width: "250px", sm: { width: "400px" } })}
          src="/logo.svg"
          alt="Match Points"
        />
        <WeatherLists lists={weather} />
        <PostEventForm />
      </Box>
      <Box display="flex" justifyContent={"flex-end"} mb={"2"}>
        <FacebookLogin />
      </Box>
      <FullCalendar
        ref={calRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, CustomView]}
        initialView="dayGridMonth"
        views={{
          custom: {
            type: "custom",
            duration: { days: 7 },
          },
        }}
        editable={false}
        selectable={true}
        aspectRatio={1 / 1.5}
        eventContent={(info) => renderEventContent(info)}
        headerToolbar={{
          left: "title",
          right: "today prev,next",
        }}
        initialEvents={{}}
        events={events}
      />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const client = await clientPromise;
    const db = client.db("TennisMatchFinder");
    const { city } = context.params;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    const events = await db
      .collection("Events")
      .find({ city: cityName })
      .limit(100)
      .toArray();
    console.log(city);
    return {
      props: { events: JSON.parse(JSON.stringify(events)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { events: [] } };
  }
};
