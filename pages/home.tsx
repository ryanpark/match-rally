import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from "next/link";
import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from "next";

const addEvent = async () => {
  let res = await fetch("http://localhost:3000/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Jessica Lee",
      start: "2024-03-01",
    }),
  });
  res = await res.json();
  console.log(res);
};

interface EventsProps {
  title: string;
  start: string;
}

export default function Calendar(events: EventsProps[]) {
  return (
    <>
      <Link href="/">Index</Link>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        headerToolbar={{
          // left: "prev,next today",
          left: "title",
          center: "customButton",
          right:
            "resourceTimelineWeek,dayGridMonth,timeGridWeek, prev,next today",
        }}
        customButtons={{
          customButton: {
            text: "add event",
            click: () => addEvent(),
          },
        }}
        initialEvents={[
          { title: "nice event", start: new Date(), resourceId: "a" },
        ]}
        events={events}
      />
    </>
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
