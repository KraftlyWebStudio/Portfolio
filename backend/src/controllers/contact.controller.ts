import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";

export const sendContactEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, message } = req.body;

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const recipient = process.env.EMAIL_TO || user;

    if (!user || !pass) {
      return res.status(500).json({ error: "Server configuration error" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: recipient,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
