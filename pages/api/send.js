// import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend("re_2eA4to9L_N3mdYEfxBoBt56qGjxboXPXt");

export default async (req, res) => {
  const { userName, email } = req.body;
  const { data, error } = await resend.emails.send({
    from: "Match Points 🎾 <onboarding@resend.dev>",
    to: [email],
    subject: "👋 Hey, Someone has left a comment on your Match Points post 🎾",
    react: EmailTemplate({ firstName: userName }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
