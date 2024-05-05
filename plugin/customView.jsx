import { sliceEvents, createPlugin } from "@fullcalendar/core";
import { Box, Grid } from "@shadow-panda/styled-system/jsx";
import EventDetails from "../components/EventDetail";

const DateRange = ({ startDate, endDate, events }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  const formattedDates = dates.map((date) => {
    const formatter = new Intl.DateTimeFormat("en-AU", {
      weekday: "short",
      day: "2-digit",
    });
    const formattedDate = formatter.format(date);

    const displayEvents = events.map((event) => {
      const eventDate = new Date(event.range.start);

      if (eventDate.toDateString() === date.toDateString()) {
        const info = event;
        return (
          <Box mb="15px">
            <EventDetails event={{ info }} />
          </Box>
        );
      }
    });
    displayEvents.unshift(formattedDate);
    return displayEvents.filter((item, index, array) => {
      return array.indexOf(item) === index;
    });
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

function CustomView(props) {
  let segs = sliceEvents(props, true); // allDay=true

  const {
    eventStore: { defs },
    dateProfile,
  } = props;
  const events = defs;
  const {
    activeRange: { start, end },
  } = dateProfile;

  console.log(segs);

  return (
    <>
      <DateRange startDate={start} endDate={end} events={segs} />
    </>
  );
}

export default createPlugin({
  views: {
    custom: CustomView,
  },
});
