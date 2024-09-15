import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationEmail = async (to, token) => {
  const verificationUrl = `http://localhost:3000/verifyemail?token=${token}`;

  const msg = {
    to: to,
    from: 'moiz77131@gmail.com', 
    subject: 'Verify your Email',
    text: 'Please verify your email address by clicking on the following link.',
    html: `
      <p>Please verify your email address by clicking on the link below:</p>
      <a href="${verificationUrl}" target="_blank">Verify Email</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};
