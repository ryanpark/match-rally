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

export default function Calendar({ events, city }) {
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

  return (
    <div
      className={css({
        bg: "brand",
        height: "100%",
        sm: { height: "auto" },
      })}
    >
      <div
        className={css({
          bg: "brand",

          maxWidth: "1320px",
          margin: "0 auto",
          color: "white",
          padding: "10px",
          lg: { padding: "15px" },
          sm: { padding: "10px" },
        })}
      >
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <a href="/home">
            <img
              className={css({ width: "200px", sm: { width: "400px" } })}
              src="/logo.svg"
              alt="Match Points"
            />
          </a>
          <WeatherLists lists={weather} />
          <PostEventForm />
        </Box>
        <Box display="flex" justifyContent={"flex-end"} mb={"2"} mt={"2"}>
          <FacebookLogin />
        </Box>
        <FullCalendar
          ref={calRef}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            CustomView,
          ]}
          initialView="dayGridMonth"
          customButtons={{
            cityName: {
              text: city,
            },
          }}
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
          titleFormat={{
            month: "short",
            day: "numeric",
          }}
          headerToolbar={{
            left: "title",
            center: "cityName",
            right: "today, prev,next",
          }}
          initialEvents={{}}
          events={events}
        />
      </div>
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
    return {
      props: { events: JSON.parse(JSON.stringify(events)), city: cityName },
    };
  } catch (e) {
    console.error(e);
    return { props: { events: [] } };
  }
};
