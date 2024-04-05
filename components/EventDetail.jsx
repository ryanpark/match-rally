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
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

export default function Example(event) {
  console.log(event);
  const form = useForm();
  const { data: session, status } = useSession();
  const userId = event?.event?.info?.event?.extendedProps?._id;
  const userName = session?.user?.name;
  const comments = event?.event?.info?.event?.extendedProps?.comments;

  console.log(userName);
  const postComment = async (comment) => {
    let res = await fetch("https://localhost:3000/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        comments: comment.comment,
        userName: userName,
      }),
    });
    res = await res.json();
    console.log(res);
  };

  function onSubmit(comment) {
    if (comment && userName) {
      postComment(comment);
    } else {
      alert("no logged");
    }
  }

  console.log(userId);

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
      </DialogContent>
    </Dialog>
  );
}
