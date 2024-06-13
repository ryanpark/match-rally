import React, { useRef, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import getWeather from "../../actions/getWeather";
import WeatherLists, { WeatherTypes } from "../../components/WeatherLists";
import CustomView from "../../plugin/customView";
import clientPromise from "../../lib/mongodb";
import EventDetails, { ExtendProps } from "../../components/EventDetail";
import PostEventForm from "../../components/PostEventForm";
import FacebookLogin from "../../components/ui/loginButton";
import { Box } from "@shadow-panda/styled-system/jsx";
import { css } from "@shadow-panda/styled-system/css";

interface InfoTypes {
  event: {
    extendedProps: ExtendProps;
    title: string;
  };
  def: {
    extendedProps: ExtendProps;
    title: string;
  };
  range: {
    start: Date;
    end: Date;
  };
}

interface CalendarTypes {
  city: string;
  events: ExtendProps[];
}

interface ResultType {
  list: WeatherTypes;
  error: boolean;
}
const renderEventContent = (info: InfoTypes) => {
  return (
    <div>
      <EventDetails event={{ info }} />
    </div>
  );
};

export default function Calendar({ events, city }: CalendarTypes) {
  const calRef = useRef<any>(null);
  const [weather, setWeather] = useState<any>([]);
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
        const results = (await getWeather()) as ResultType;
        setWeather(results?.list);
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
          bg: "greeny",
          height: "10px",
          mb: "10px",
        })}
      ></div>
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
          mb="20px"
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
        <Box display="flex" justifyContent={"flex-end"} mb={"5"} mt={"5"}>
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
          //@ts-ignore wtf idk
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

interface PageProps {
  events: Event[];
  city: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  try {
    const client = await clientPromise;
    const db = client.db("TennisMatchFinder");
    const city = (context.params?.city as string) || "Sydney";
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
    return { props: { events: [], city: "Sydney" } };
  }
};
