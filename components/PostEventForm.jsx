"use client";

import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <Dialog>
      <DialogTrigger>
        <Box bg="green" color="white">
          Post your next Match 🎾
        </Box>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h1>Post your next Match</h1>
          </DialogTitle>
          <DialogDescription>
            <EventForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
