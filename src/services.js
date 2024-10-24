import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationEmail = async (to, token) => {
  const verificationUrl = `http://localhost:3000/verifyemail?token=${token}`;

  const msg = {
    to: to,
    from: "moiz77131@gmail.com",
    subject: "Verify your Email",
    text: "Please verify your email address by clicking on the following link.",
    html: `
      <p>Please verify your email address by clicking on the link below:</p>
      <a href="${verificationUrl}" target="_blank">Verify Email</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendResetPasswordEmail = async (to, newPassword) => {
  const msg = {
    to: to,
    from: "moiz77131@gmail.com",
    subject: "Your Password has been Reset",
    text: "Your password has been successfully reset.",
    html: `
      <p>Your password has been successfully reset. Please find your new password below:</p>
      <p><strong>Password:</strong> ${newPassword}</p>
      <p>For security reasons, please change your password once you log in.</p>
      <p>If you did not request this, please contact our support immediately.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log("Reset password email sent successfully");
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};
