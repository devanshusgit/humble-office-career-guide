import { transporter } from './transporter';
import { env } from '@/lib/env';

export async function sendCareerGuideEmail(
  toEmail: string,
  fullName: string,
  preferredName: string,
  pdfBuffer: Buffer,
  submissionId: string
) {
  const nameToUse = preferredName || fullName;
  
  const textBody = `Hello ${nameToUse},

Thank you for completing the Humble Office career assessment.

Your personalized AI-assisted Career Guide is attached to this email.

The guide includes:
• Career paths matched to your interests and strengths
• Skills you can begin developing
• A 90-day action plan
• A one-year exploration roadmap
• Answers to the questions you submitted

Please remember that this report is guidance, not a guarantee. Verify current course eligibility, admissions, fees, deadlines and professional requirements through official sources before making a final decision.

Submission Reference: ${submissionId}

Regards,
Humble Office`;

  const htmlBody = `
    <p>Hello ${nameToUse},</p>
    <p>Thank you for completing the Humble Office career assessment.</p>
    <p>Your personalized AI-assisted Career Guide is attached to this email.</p>
    <p>The guide includes:</p>
    <ul>
      <li>Career paths matched to your interests and strengths</li>
      <li>Skills you can begin developing</li>
      <li>A 90-day action plan</li>
      <li>A one-year exploration roadmap</li>
      <li>Answers to the questions you submitted</li>
    </ul>
    <p><em>Please remember that this report is guidance, not a guarantee. Verify current course eligibility, admissions, fees, deadlines and professional requirements through official sources before making a final decision.</em></p>
    <p><small>Submission Reference: ${submissionId}</small></p>
    <br/>
    <p>Regards,<br/>Humble Office</p>
  `;

  await transporter.sendMail({
    from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM_ADDRESS}>`,
    replyTo: env.EMAIL_REPLY_TO,
    to: toEmail,
    subject: `Career Guide – ${fullName}`,
    text: textBody,
    html: htmlBody,
    attachments: [
      {
        filename: `Career-Guide-${fullName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
}

export async function sendAdminNotification(
  studentName: string,
  submissionId: string
) {
  if (!env.SEND_ADMIN_NOTIFICATION || !env.ADMIN_EMAIL) return;

  await transporter.sendMail({
    from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM_ADDRESS}>`,
    to: env.ADMIN_EMAIL,
    subject: `New Career Guide Submission – ${studentName}`,
    text: `A new career guide was successfully generated.\n\nStudent: ${studentName}\nReference: ${submissionId}`,
  });
}
