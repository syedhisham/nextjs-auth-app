import User from "@/models/users/user.model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1f9d7b53426808",
        pass: "8406839ff821c3",
      },
    });
    const mailOptions = {
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html:
        emailType === "VERIFY"
          ? `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Email Verification</h2>
            <p>Thank you for registering! Please verify your email by clicking the button below:</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" 
               style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
               Verify Email
            </a>
            <p>If you did not request this, please ignore this email.</p>
          </div>`
          : `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Password Reset Request</h2>
            <p>It looks like you requested a password reset. Click the button below to reset your password:</p>
            <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}" 
               style="display: inline-block; padding: 10px 20px; background-color: #FF5733; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
               Reset Password
            </a>
            <p>If you didn't request this, please ignore this email.</p>
          </div>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.log("Something went wrong while sending the email", error);
    throw new Error(error.message);
  }
};
