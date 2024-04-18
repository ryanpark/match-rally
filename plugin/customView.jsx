import { sliceEvents, createPlugin } from "@fullcalendar/core";
import { Box, Grid } from "@shadow-panda/styled-system/jsx";
import EventDetails from "../components/EventDetail";

const DateRange = ({ startDate, endDate, events }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  // Iterate over each day between start and end dates
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  // Format each date as "Day Month/Date" and check for events
  const formattedDates = dates.map((date) => {
    const formatter = new Intl.DateTimeFormat("en-AU", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });
    const formattedDate = formatter.format(date);

    // Check if any event matches the current day
    const event = events.find((event) => {
      const eventDate = new Date(event.range.start);
      return eventDate.toDateString() === date.toDateString();
    });

    // Display event title if available
    if (event) {
      const title = event.def.title;
      const info = event;
      return (
        <>
          <p>{formattedDate}</p>

          <EventDetails event={{ info }} />
        </>
      );
    } else {
      return formattedDate;
    }
  });

  return (
    <Box height={"100%"}>
      <Grid columns={3} height={"100%"} gap={0}>
        {formattedDates.map((formattedDate, index) => (
          <Box
            key={index}
            border={1}
            borderColor={"white"}
            borderStyle="solid"
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
      {/* <ul>
        {segs.map((seg) => (
          <li>{seg.def.title}</li>
        ))}
      </ul> */}
    </>
  );
}

export default createPlugin({
  views: {
    custom: CustomView,
  },
});
