import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "manyumasichinga66@gmail.com",
    pass: "znsm mlcm fpot hnpf" 
  },
});

export async function sendMail(emails, topic, message, contentDetails) {
    
  const generateHTML = (content, msg) => {
    return `
      <div style="font-family: Arial; padding: 20px;">
        <h2>${topic}</h2>
        <p>Hello <strong>${content.fullname}</strong> (${content.username}),</p>
        <p>${msg}</p>
        <br/>
        <a href="http://localhost:3000/login"
           style="background:#1B62BF; color:white; padding:10px 15px; text-decoration:none; border-radius:5px;">
           Open System
        </a>
      </div>
    `;
  };

  try {
    const info = await transporter.sendMail({
      from: '"System Notification" <manyumasichinga66@gmail.com>',
      to: emails,                        
      subject: topic,
      html: generateHTML(contentDetails, message),
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
