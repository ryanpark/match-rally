import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}! G'day mate</h1>
    <p>Someone made a comment on your post</p>
    <p>Check it out</p>
  </div>
);
