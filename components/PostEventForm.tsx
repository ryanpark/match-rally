"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import EventForm from "./EventForm";
import { css } from "@shadow-panda/styled-system/css";
import { Box } from "@shadow-panda/styled-system/jsx";

export default function PostEventForm() {
  const [open, setOpen] = useState(false);
  const setModal = (state: boolean) => {
    setOpen(!state);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Box
          bg="greeny"
          color="black"
          p={2}
          rounded={8}
          cursor="pointer"
          fontWeight="bold"
        >
          Post a Match
        </Box>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h1 className={css({ padding: "10px 0 10px 0" })}>
              🎾 Share your match and let the crowd join in! 🧑👩
            </h1>
          </DialogTitle>
        </DialogHeader>
        <hr />
        <div className={css({ padding: "15px 0 10px 0" })}>
          <DialogDescription>
            <EventForm setModal={setModal} />
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
