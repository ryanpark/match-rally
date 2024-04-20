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
import postComment from "../actions/postComment";
import { Box, Circle } from "@shadow-panda/styled-system/jsx";
import { css } from "@shadow-panda/styled-system/css";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Spinner from "@atlaskit/spinner";
import { CircleUserRound } from "lucide-react";

export default function EventDetails({ event }) {
  const form = useForm();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { data: session, status } = useSession();
  const {
    _id: userId,
    comments,
    user,
    time,
    level,
    message,
  } = event?.info?.event?.extendedProps ||
  event?.info?.def?.extendedProps ||
  {};
  const userName = session?.user.name;
  const title = event?.info?.event?.title || event?.info?.def.title || "title";

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

  console.log(comments);

  return (
    <Dialog>
      <DialogTrigger>
        <Box display="flex" alignItems="center">
          <Circle size="2" bg="yellow" mr="2" ml="2" /> {title || "title"}
        </Box>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className={css({ padding: "10px 0 10px 0" })}>
              {" "}
              👋 Hey, Wanna play ? 🎾
            </p>
          </DialogTitle>
          <hr />
          <DialogDescription>
            <p className={css({ padding: "10px 0 10px 0" })}>
              Where{" "}
              <span className={css({ fontWeight: "bold" })}>
                {event?.info?.event?.title}
              </span>
            </p>
            <p className={css({ padding: "10px 0 10px 0" })}>
              Who <span className={css({ fontWeight: "bold" })}>{user}</span>
            </p>
            <p className={css({ padding: "10px 0 10px 0" })}>
              When <span className={css({ fontWeight: "bold" })}>{time}</span>
            </p>
            <p className={css({ padding: "10px 0 10px 0" })}>
              Level <span className={css({ fontWeight: "bold" })}>{level}</span>
            </p>
            <p className={css({ padding: "10px 0 10px 0" })}>{message}</p>

            {comments?.map((item, index) => (
              <div key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="2"
                  paddingTop="10px"
                >
                  <CircleUserRound /> {item.user}
                  <Box
                    background="white"
                    color="black"
                    padding="3"
                    borderRadius="5"
                  >
                    {item.comment}
                  </Box>
                </Box>
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
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit">Submit</Button>
              </Box>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
