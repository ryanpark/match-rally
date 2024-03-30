import React, { useEffect, useInsertionEffect, useRef } from "react";
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
import { Button } from "../components/ui/button";

import { createClient } from "@supabase/supabase-js";

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
  const dStyle = `
  @media screen and (max-width:767px) { .fc .fc-view-harness { height: 1200px!important} .fc-toolbar.fc-header-toolbar {flex-direction:column;} .fc-toolbar-chunk { display: table-row; text-align:center; padding:5px 0; } }
    `;
  useInsertionEffect(() => {
    const styleEle = document.createElement("style");
    styleEle.innerHTML = dStyle;
    document.head.appendChild(styleEle);
    return () => {
      document.head.removeChild(styleEle);
    };
  }, []);

  const calRef = useRef(null);
  const handleWindowResize = (view: any): void => {
    const api = calRef?.current?.getApi();
    api?.changeView(
      window.innerWidth < 765 ? "dayGridFourWeek" : "dayGridMonth"
    );
  };

  const supabase = createClient(
    "https://ppelekmixqezqnxwyaci.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZWxla21peHFlenFueHd5YWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NjIzOTMsImV4cCI6MjAyNzIzODM5M30.xjde4LYdTh4LmvGxl0HDgyShcII9-pXxOgIJhd0s8D8"
  );

  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });

    console.log(data);
    console.log(error);
  }

  return (
    <div>
      <Link href="/">Index</Link>
      <FacebookLogin />
      <PostEventForm />
      <Button onClick={() => signInWithFacebook()}>Login Facebook shit</Button>
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
