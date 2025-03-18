const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "kidakwashe14@gmail.com",
        pass: "mely vtgy lnaa wlbu",
    },
  });

app.post("/email", async (req, res) => {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || !text || !html) {
        console.log("missing content")
        return res.status(400).json({ error: "Missing required fields" });
    }

    const mailOptions = {
        from: "kidakwashe14@gmail.com",
        to,
        subject,
        text,
        html
      };
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});