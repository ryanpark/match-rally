import { sliceEvents, createPlugin } from "@fullcalendar/core";
import { Box, Grid } from "@shadow-panda/styled-system/jsx";
import EventDetails from "../components/EventDetail";
import type { ExtendProps } from "../components/EventDetail";

interface DateRangeTypes {
  startDate: string;
  endDate: string;
  events: SegsTypes[];
}

interface CustomViewProps {
  dateProfile: {
    activeRange: {
      start: string;
      end: string;
    } | null;
  };
}

interface SegsTypes {
  range: {
    start: Date;
    end: Date;
  };
  event: {
    extendedProps: ExtendProps;
    title: string;
  };
  def: {
    extendedProps: ExtendProps;
    title: string;
  };
}

const DateRange = ({ startDate, endDate, events }: DateRangeTypes) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  const formattedDates = dates.map((date) => {
    const displayEvents = events.map((event) => {
      const eventDate = new Date(event.range.start);

      if (eventDate.toDateString() === date.toDateString()) {
        const info = event;
        return (
          <Box mb="15px" key={info?.event?.title}>
            <EventDetails event={{ info }} />
          </Box>
        );
      }
      return null;
    });

    return displayEvents.filter((item) => item !== null);
  });

  return (
    <Box height={"100%"}>
      <Grid
        columns={3}
        height={"100%"}
        gap={0.5}
        background="none"
        borderStyle={"solid"}
        borderColor="white"
        border={1}
      >
        {formattedDates.map((formattedDate, index) => (
          <Box
            key={index}
            color="white"
            padding="2"
            backgroundColor={"rgba(255, 255, 255, 15%)"}
          >
            {formattedDate}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

function CustomView(props: CustomViewProps) {
  // @ts-ignore: idk wtf to do
  let segs: any = sliceEvents(props, true); // allDay=true

  const { dateProfile } = props;
  if (!dateProfile.activeRange) {
    return null;
  }
  const {
    activeRange: { start, end },
  } = dateProfile;

  return (
    <>
      <DateRange startDate={start} endDate={end} events={segs} />
    </>
  );
}

export default createPlugin({
  views: {
    // @ts-ignore: idk wtf to do
    custom: CustomView,
  },
});
