import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Hi, {firstName}! 👋</h1>

    <p>
      Someone has commented on your post on{" "}
      <a href="https://match-rally.vercel.app/home">matchpoints.com.au</a>
    </p>
    <p> Let's check it out!</p>
    <p></p>
    <div>
      <a href="https://match-rally.vercel.app/home">
        <img width="200px" src="/logo.svg" alt="Match Points" />
      </a>
    </div>
  </div>
);
