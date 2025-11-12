import { Resend } from 'resend';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  
  // Check if Resend API key is available
  if (!process.env.RESEND_API_KEY) {
    console.log('Contact form submission (Resend not configured):', { name, email, message });
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Email service not configured' 
    }), { status: 503 });
  }
  
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
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