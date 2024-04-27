import { useSession, signIn, signOut } from "next-auth/react";
import { CircleUserRound } from "lucide-react";
import { css } from "@shadow-panda/styled-system/css";

export default function FacebookLogin() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <CircleUserRound color="white" />
        <a className={css({ color: "white", paddingLeft: "5px" })} href="#">
          {session?.user?.email}
        </a>

        <button onClick={() => signOut()}>Sign Out</button>
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
