import { useSession, signIn } from "next-auth/react";
import { CircleUserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { css } from "@shadow-panda/styled-system/css";

export default function FacebookLogin() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <CircleUserRound color="white" />

        <Dialog>
          <DialogTrigger>
            <a
              className={css({
                color: "white",
                paddingLeft: "5px",
                _hover: { textDecoration: "underline" },
              })}
              href="#"
            >
              {session?.user?.email}
            </a>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h1
                  className={css({
                    padding: "10px 0 10px 0",
                  })}
                >
                  Do you want to sign out ?
                </h1>
              </DialogTitle>
            </DialogHeader>
            <hr />
            <div className={css({ padding: "15px 0 10px 0" })}>
              <DialogDescription>
                <a
                  className={css({
                    color: "white",
                    paddingLeft: "5px",
                    _hover: { textDecoration: "underline" },
                  })}
                  href="#"
                >
                  Yes, I want to Sign Out
                </a>
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  return (
    <>
      <a
        href="#"
        className={css({
          color: "white",
          paddingRight: "5px",
          textDecoration: "underline",
        })}
        onClick={() => signIn()}
      >
        Sign in
      </a>
    </>
  );
}
