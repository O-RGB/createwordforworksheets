export const config = {
  api: {
    bodyParser: {
      sizeLimit: "84mb",
    },
  },
};

export default async function handler(req: any, res: any) {
  try {
    let nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "learningworksheets@gmail.com",
        pass: "mzjn kexn pgkw rzkt",
      },
      secure: true,
    });
    const mailData = {
      from: "learningworksheets@gmail.com",
      to: req.body.email,
      subject: `${req.body.name}`,
      attachments: req.body.attachments,
      text: req.body.message + " | Sent from: " + req.body.email,
      html: `<html>
      <head>
      <title>Page Title</title>
      </head>
      <body>
      
      <h1>This is a Heading</h1>
      <p>This is a paragraph.</p>
      
      </body>
      </html>`,
    };

    // ส่งอีเมล
    const info = await transporter.sendMail(mailData);

    // ส่งข้อมูลตอบกลับ
    res.status(200).json({ success: true, info });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
