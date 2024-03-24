import React, { useEffect } from "react";
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

import { Box } from "@shadow-panda/styled-system/jsx";

const addEvent = async () => {
  let res = await fetch("https://localhost:3000/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: "65e2edea0c0103f7f4008876",
      comments: {
        user: "kevin",
        comment: "third comment",
      },
    }),
  });
  res = await res.json();
  console.log(res);
};

interface EventsProps {
  title: string;
  start: string;
}

interface InfoProps {
  event: {
    title: string;
    start: Date | null;
  };
}

const openDialog = () => {
  console.log("open dialog");
};

const renderEventContent = (info) => {
  return (
    <div>
      <Example event={{ info }} />
    </div>
  );
};

export default function Calendar(events: EventsProps[]) {
  return (
    <div>
      <Link href="/">Index</Link>
      <FacebookLogin />
      <PostEventForm />
      <Box bg="brand">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          // height={'100%'}
          // aspectRatio={3 / 1.5}
          eventContent={(info) => renderEventContent(info)}
          headerToolbar={{
            left: "title",
            right:
              "resourceTimelineWeek,dayGridMonth,timeGridWeek, prev,next today",
          }} // eventClick={(info) => openDialog(info)}
          initialEvents={[
            { title: "nice event", start: new Date(), resourceId: "a" },
          ]}
          events={events}
        />
      </Box>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("TennisMatchFinder");
    const events = await db.collection("Users").find({}).limit(10).toArray();
    return {
      props: { events: JSON.parse(JSON.stringify(events)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { events: [] } };
  }
};
