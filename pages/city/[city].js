import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CustomView from "../../plugin/customView";
import Link from "next/link";
import clientPromise from "../../lib/mongodb";
import EventDetails from "../../components/EventDetail";
import PostEventForm from "../../components/PostEventForm";
import FacebookLogin from "../../components/ui/loginButton";
import { Box } from "@shadow-panda/styled-system/jsx";

const renderEventContent = (info) => {
  return (
    <div>
      <EventDetails event={{ info }} />
    </div>
  );
};

export default function Calendar(events) {
  // const dStyle = `
  // @media screen and (max-width:767px) { .fc .fc-view-harness { height: 1200px!important} .fc-toolbar.fc-header-toolbar {flex-direction:column;} .fc-toolbar-chunk { display: table-row; text-align:center; padding:5px 0; } }
  //   `;
  // useInsertionEffect(() => {
  //   const styleEle = document.createElement("style");
  //   styleEle.innerHTML = dStyle;
  //   document.head.appendChild(styleEle);
  //   return () => {
  //     document.head.removeChild(styleEle);
  //   };
  // }, []);
  const calRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      const api = calRef?.current?.getApi();
      console.log(api);
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

  return (
    <Box bg="brand" p={10} color="black" height="100vh">
      <Link href="/">Index</Link>
      <FacebookLogin />
      <PostEventForm />
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
        editable={true}
        selectable={true}
        aspectRatio={1 / 1.5}
        eventContent={(info) => renderEventContent(info)}
        headerToolbar={{
          left: "title",
          right:
            "resourceTimelineWeek,dayGridMonth, timeGridWeek, prev,next today",
        }}
        initialEvents={{}}
        events={events}
      />
    </Box>
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
