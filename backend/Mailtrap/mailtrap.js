import { MailtrapClient } from "mailtrap";

export const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Harsh",
};
