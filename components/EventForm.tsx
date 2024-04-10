// @ts-nocheck
"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { Box } from "@shadow-panda/styled-system/jsx";
import { css } from "@shadow-panda/styled-system/css";
import { icon } from "@shadow-panda/styled-system/recipes";
import Spinner from "@atlaskit/spinner";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const addEvent = async (event) => {
  try {
    let res = await fetch("https://localhost:3000/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: event.date,
        title: event.location,
        city: event.city,
        time: event.time,
        user: event.session,
        message: event.message,
        level: event.level,
      }),
    });

    res = await res.json();
    if (res.error) {
      return "error";
      // throw new Error(`Failed to add event: ${res.status} - ${res.statusText}`);
    }
    if (res.success) {
      return res;
    }
  } catch (error) {
    return "error";
  }
};

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  location: z.string().min(2, {
    location: "location must be selected",
  }),
  city: z.enum(["Sydney", "Melbourne", "Brisbane", "Perth"], {
    city: "city must be selected",
  }),
  time: z.string().min(2, {
    time: "time must be selected",
  }),
  level: z.string().min(2, {
    level: "level must be selected",
  }),
});

export default function EventForm({ setModal }) {
  // const form = useForm();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  const { data: session, status } = useSession();

  async function onSubmit(formData) {
    console.log("Form data:", formData);
    setLoading(true);

    formData.session = session?.user?.name;
    const result = await addEvent(formData);
    if (result === "error") {
      alert("shit happend");
    } else {
      setSubmit(true);
    }
    setLoading(false);
  }
  if (submit) {
    setModal(submit);
  }

  return (
    <Form {...form}>
      {loading && (
        <Box align="center" padding="10">
          <Spinner interactionName="load" size="large" />
        </Box>
      )}
      {!loading && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={css({ display: "flex", flexDir: "column", gap: "8" })}
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem display="flex" flexDir="column">
                <FormLabel>Pick a date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        w="240px"
                        pl="3"
                        textAlign="left"
                        fontWeight="normal"
                        color={!field.value ? "muted.foreground" : undefined}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon
                          className={icon({ left: "auto", dimmed: true })}
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent w="auto" p="0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Which city ?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a City" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sydney">Sydney</SelectItem>
                    <SelectItem value="Melbourne">Melbourne</SelectItem>
                    <SelectItem value="Brisbane">Brisbane</SelectItem>
                    <SelectItem value="Perth">Perth</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Where do you want to play ?</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: Chatswood" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What time do you want to play ?</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: 6: 00 pm" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What tennis level are you?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Eg: UTR Level, Beginner, intermediate or advanced ?"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any additional message ?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Eg: Prefer play single"
                    resize="none"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </form>
      )}
    </Form>
  );
}
