import { useSession, signIn, signOut } from "next-auth/react";
import { CircleUserRound } from "lucide-react";

export default function FacebookLogin() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <CircleUserRound color="white" /> {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
