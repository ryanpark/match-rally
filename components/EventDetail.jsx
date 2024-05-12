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
    email,
    message,
  } = event?.info?.event?.extendedProps ||
  event?.info?.def?.extendedProps ||
  {};
  const userName = session?.user.name;
  const userEmail = session?.user.email;
  const title = event?.info?.event?.title || event?.info?.def?.title || "title";
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const isOrganizer = email === userEmail;

  const emailCommentsList = comments?.filter((comment) => comment.email);

  const emailLists =
    (emailCommentsList &&
      Object.values(emailCommentsList)?.filter(
        (result) => result.email !== userEmail
      )) ||
    [];

  const updatedEmailLists =
    !isOrganizer && emailLists
      ? [...emailLists, { user: user, email: email }]
      : emailLists;

  const sendingLists = updatedEmailLists.reduce((acc, item) => {
    const isUnique = !acc.some((user) => user.email === item.email);
    if (isUnique) {
      return acc.concat(item);
    }
    return acc;
  }, []);

  async function onSubmit(comment) {
    if (comment && userName) {
      setLoading(true);
      const result = await postComment({
        comment,
        userId,
        userName,
        email,
      });

      if (result.error) {
        setError(true);
      }
      if (result.success) {
        setLoading(false);
        setSubmit(true);
        if (sendingLists.length > 0) {
          // const sentEmail = await sendEmail(sendingLists);
          console.log("will send emails");
          // sendEmail(sendingLists);
        }
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
          <Circle size="2" bg="blue" mr="2" ml="2" />
          <div className={css({ whiteSpace: "normal", textAlign: "left" })}>
            {title || "title"}
          </div>
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
            Where <span className={css({ fontWeight: "bold" })}>{title}</span>
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
          {message && (
            <Grid gap="2" paddingTop="10px" gridTemplateColumns={"1fr 2fr 8fr"}>
              <CircleUserRound size="20" />
              <div>{user}</div>
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
                    position: "absolute",
                    top: "calc(50% - 7px)",
                    content: '""',
                    border: "7px solid transparent",
                    left: "-7px",
                    borderLeft: "0",
                    borderRightColor: "white",
                  },
                })}
              >
                {message}
              </Box>
            </Grid>
          )}
          <div>
            {comments?.map((item, index) => {
              const isWriter = item.user === user; // Move variable declaration here
              return (
                <div
                  key={index}
                  className={css({
                    pb: "20px",
                    pt: "20px",
                  })}
                >
                  <Grid
                    gap="2"
                    paddingTop="10px"
                    gridTemplateColumns={
                      isWriter ? "1fr 2fr 8fr" : "8fr 2fr 1fr"
                    }
                  >
                    <CircleUserRound
                      size="20"
                      className={css({ order: !isWriter && "3" })}
                    />
                    <div
                      className={css({
                        order: !isWriter && "2",
                        pl: !isWriter && "12px",
                      })}
                    >
                      {item.user}
                    </div>

                    <Box
                      background="white"
                      color="black"
                      padding="3"
                      borderRadius="5"
                      minWidth="100%"
                      {...(isWriter
                        ? { "data-user": "writer" }
                        : { "data-user": "guest" })}
                      className={css({
                        position: "relative",
                        order: !isWriter && "1",
                        ml: "4px",
                        "&[data-user=writer]": {
                          _after: {
                            left: "-7px",
                            borderLeft: "0",
                            borderRightColor: "white",
                          },
                        },
                        "&[data-user=guest]": {
                          _after: {
                            right: "-7px",
                            borderRight: "0",
                            borderLeftColor: "white",
                          },
                        },
                        _after: {
                          display: "block",
                          width: "0",
                          position: "absolute",
                          top: "calc(50% - 7px)",
                          content: '""',
                          border: "7px solid transparent",
                        },
                      })}
                    >
                      {item.comment}
                    </Box>
                  </Grid>
                </div>
              );
            })}
          </div>
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
