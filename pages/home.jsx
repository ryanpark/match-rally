import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from "next";
import Example from "../components/EventDetail";
import PostEventForm from "../components/PostEventForm";
import FacebookLogin from "../components/ui/loginButton";
import { css } from "@shadow-panda/styled-system/css";
import { Box } from "@shadow-panda/styled-system/jsx";

const renderEventContent = (info) => {
  console.log(info);
  return (
    <div>
      <Example event={{ info }} />
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
  const handleWindowResize = () => {
    const api = calRef?.current?.getApi();
    api?.changeView(
      window.innerWidth < 765 ? "dayGridFourWeek" : "dayGridMonth"
    );
  };

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
          }} // eventClick={(info) => openDialog(info)}
          initialEvents={[
            { title: "nice event", start: new Date(), resourceId: "a" },
          ]}
          // windowResize={handleWindowResize}
          events={events}
          windowResize={handleWindowResize}
        />
      </Box>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("TennisMatchFinder");
    const events = await db.collection("Events").find({}).limit(10).toArray();
    return {
      props: { events: JSON.parse(JSON.stringify(events)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { events: [] } };
  }
};
