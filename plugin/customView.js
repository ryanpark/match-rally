import { sliceEvents, createPlugin } from "@fullcalendar/core";

function CustomView(props) {
  let segs = sliceEvents(props, true); // allDay=true

  const {
    eventStore: { defs },
  } = props;
  const events = defs;

  return (
    <>
      <div className="view-title">
        {props.dateProfile.currentRange.start.toUTCString()}
      </div>

      <ul>
        {segs.map((seg) => (
          <li>{seg.def.title}</li>
        ))}
      </ul>

      <div className="view-events">{segs.length} events</div>
    </>
  );
}

export default createPlugin({
  views: {
    custom: CustomView,
  },
});
