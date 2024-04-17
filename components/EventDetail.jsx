import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Box } from "@shadow-panda/styled-system/jsx";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Spinner from "@atlaskit/spinner";

const postComment = async (userData) => {
  const {
    userName,
    userId,
    comment: { comment },
  } = userData;
  try {
    let res = await fetch("https://localhost:3000/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        comments: comment,
        userName: userName,
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

export default function EventDetails(event) {
  const form = useForm();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { data: session, status } = useSession();
  const userId = event?.event?.info?.event?.extendedProps?._id;
  const userName = session?.user?.name;
  const comments = event?.event?.info?.event?.extendedProps?.comments;

  async function onSubmit(comment) {
    if (comment && userName) {
      setLoading(true);
      const result = await postComment({
        comment,
        userId,
        userName,
      });

      if (result.error) {
        setError(true);
        alert("shit happend");
      }
      if (result.success) {
        setLoading(false);
        setSubmit(true);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        {event?.event?.info?.event?.title || "title"}
      </DialogTrigger>
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
            <p>{event?.event?.info?.event?.extendedProps?.comment}</p>
            {comments?.map((item, index) => (
              <div key={index}>
                <p>User: {item.user}</p>
                <p>Comment: {item.comment}</p>
                <hr />
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
        {!userName && <div>Please login to make a comment</div>}

        {loading && (
          <Box align="center" padding="10">
            <Spinner interactionName="load" size="large" />
          </Box>
        )}
        {!loading && submit && <p>Thank you. Your comment has been posted</p>}
        {userName && !loading && !submit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Leave your comment here"
                        resize="none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <p></p>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" alignSelf="flex-start">
                Submit
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
