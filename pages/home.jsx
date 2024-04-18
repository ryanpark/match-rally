import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from "next";
import EventDetails from "../components/EventDetail";
import PostEventForm from "../components/PostEventForm";
import FacebookLogin from "../components/ui/loginButton";
import { Box } from "@shadow-panda/styled-system/jsx";

const renderEventContent = (info) => {
  console.log(info);
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
      if (api) {
        api.changeView(
          window.innerWidth < 765 ? "dayGridFourWeek" : "dayGridMonth"
        );
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Link href="/">Index</Link>
      <FacebookLogin />
      <PostEventForm />
      <Box bg="brand">
        <FullCalendar
          ref={calRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridFourWeek"
          views={{
            dayGridFourWeek: {
              type: "dayGrid",
              duration: { days: 4 },
            },
          }}
          editable={true}
          selectable={true}
          // height={"1000px"}
          aspectRatio={2 / 1.5}
          // initialView="dayGridWeek"
          eventContent={(info) => renderEventContent(info)}
          headerToolbar={{
            left: "title",
            right:
              "resourceTimelineWeek,dayGridMonth, timeGridWeek, prev,next today",
          }}
          initialEvents={[{}]}
          events={events}
        />
      </Box>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  try {
    const client = await clientPromise;
    const db = client.db("TennisMatchFinder");

    const events = await db.collection("Events").find({}).limit(100).toArray();
    console.log(params);
    return {
      props: { events: JSON.parse(JSON.stringify(events)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { events: [] } };
  }
};
