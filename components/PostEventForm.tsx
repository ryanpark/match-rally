"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import EventForm from "./EventForm";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Box } from "@shadow-panda/styled-system/jsx";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function PostEventForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
