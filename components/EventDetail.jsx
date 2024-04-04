import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function Example(event) {
  console.log(event);
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p>{event?.event?.info?.event?.title}</p>
          </DialogTitle>
          <DialogDescription>
            <p>{event?.event?.info?.event?.extendedProps?.user}</p>
            <p>{event?.event?.info?.event?.extendedProps?.time}</p>
            <p>{event?.event?.info?.event?.extendedProps?.level}</p>
            <p>{event?.event?.info?.event?.extendedProps?.message}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
