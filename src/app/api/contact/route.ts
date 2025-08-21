import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  try {
    await resend.emails.send({
      from: 'DSMSSD STUDIO <send@dsmssdstudio.com>',
      to: ['info@dsmssdstudio.com'],
      subject: 'New Contact Form Submission',
      html: `<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><br/>${message}</p>`,
      replyTo: email,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
} 