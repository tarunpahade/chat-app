import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import Users from "@/dbconfig/dbconfig";

export const sendMail = async ({ email, emailtype, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log(hashedToken, "this is hashed token");

    if (emailtype === "verify") {
      const addedToken = await Users.findOneAndUpdate(
        { _id: userId }, // Specify the query to identify the document to update
        {
          $set: {
            // Use the $set operator to update specific fields
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 15 * 60 * 1000,
          },
        }
      );
      console.log(addedToken, "added token to this user");
    } else if (emailtype === "reset") {
      const addedToken = await Users.findOneAndUpdate(
        { email: email },
        {
          $set: {
            forgetPassword: hashedToken,
            forgotPasswordToken: Date.now() + 360000,
          },
        }
      );
      console.log(addedToken);
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "decc5f494ef1b3",
        pass: "e8a5ab9bbe7f28",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:
        emailtype === "verify" ? "Verify your email" : "Reset your password",
      html: `<p>${
        emailtype === "verify"
          ? `Click on the link to verify your email <a href='${process.env.URL}/verifyemail?token=${hashedToken}'>Verify Email </a> or If the link is not working visit http://localhost:3000/verifyemail?token=${hashedToken}`
          : `Click on the link to reset your password <a href="${process.env.URL}/reset?token=${hashedToken}">Reset Password</a> or If the link is not working visit http://localhost:3000/reset?token=${hashedToken}`
      }</p>`,
    };
    const mail = await transport.sendMail(mailOptions);
    console.log("this is mail", mail);
    return mail;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
