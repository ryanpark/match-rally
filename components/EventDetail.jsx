import { useState } from "react";
import { useRouter } from "next/router";
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
  FormMessage,
} from "./ui/form";
import postComment from "../actions/postComment";
import sendEmail from "../actions/sendEmail";
import { Box, Circle, Grid } from "@shadow-panda/styled-system/jsx";
import { css } from "@shadow-panda/styled-system/css";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import Spinner from "@atlaskit/spinner";
import { CircleUserRound } from "lucide-react";

export default function EventDetails({ event }) {
  const form = useForm();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

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
  const refreshData = () => {
    router.replace(router.asPath);
  };

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
      }
      if (result.success) {
        setLoading(false);
        setSubmit(true);
        sendEmail();
        refreshData();
      }
    }
  }
  if (error) return "Something went wrong, Please try again";
  return (
    <Dialog>
      <DialogTrigger className={css({ width: "100%" })}>
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          background={"greeny"}
          borderRadius={"5px"}
        >
          <Circle size="2" bg="blue" mr="2" ml="2" /> {title || "title"}
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
        </DialogHeader>
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
              <Grid
                gap="2"
                paddingTop="10px"
                gridTemplateColumns={"1fr 2fr 8fr"}
              >
                <CircleUserRound size="20" />
                <div>{item.user}</div>
                <Box
                  background="white"
                  color="black"
                  padding="3"
                  borderRadius="5"
                  className={css({
                    position: "relative",
                    ml: "4px",
                    _after: {
                      display: "block",
                      width: "0",
                      left: "-7px",
                      position: "absolute",
                      top: "calc(50% - 7px)",
                      content: '""',
                      border: "7px solid transparent",
                      borderLeft: "0",
                      borderRightColor: "white",
                    },
                  })}
                >
                  {item.comment}
                </Box>
              </Grid>
            </div>
          ))}
        </DialogDescription>
        {!userName && (
          <div>
            Please{" "}
            <a
              className={css({
                textDecoration: "underline",
                cursor: "pointer",
              })}
              onClick={() => signIn()}
            >
              login
            </a>{" "}
            to make a comment
          </div>
        )}

        {loading && (
          <Box align="center" padding="10">
            <Spinner interactionName="load" size="large" color="white" />
          </Box>
        )}
        {!loading && submit && <p>Thank you. Your comment has been posted</p>}
        {!loading && !submit && (
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
                        autoFocus={false}
                        readOnly={!userName}
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
                <Button type="submit" disabled={!userName}>
                  Submit
                </Button>
              </Box>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
