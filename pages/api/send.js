// import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend("re_2eA4to9L_N3mdYEfxBoBt56qGjxboXPXt");

export default async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["ryan81.park@gmail.com"],
    subject: "Hello world",
    react: EmailTemplate({ firstName: "Ryan Park" }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
