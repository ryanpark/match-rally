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
import { Box } from "@shadow-panda/styled-system/jsx";

export default function PostEventForm() {
  const [open, setOpen] = useState(false);
  const setModal = (state) => {
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
            <h1>Post your next Match</h1>
          </DialogTitle>
          <DialogDescription>
            <EventForm setModal={setModal} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
