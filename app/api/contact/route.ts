import { NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

// Ensure dynamic rendering for API routes
export const dynamic = 'force-dynamic';

// Initialize Mailjet client
const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC!, 
  process.env.MJ_APIKEY_PRIVATE!
);

export async function POST(request: Request) {
  // Check if environment variables are set
  if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
    console.error('Missing Mailjet API keys');
    return NextResponse.json(
      { message: 'Server configuration error' },
      { status: 500 }
    );
  }

  if (!process.env.CONTACT_FORM_FROM_EMAIL || !process.env.CONTACT_FORM_TO_EMAIL) {
    console.error('Missing email configuration');
    return NextResponse.json(
      { message: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    // Parse request body safely
  const body = (await request.json()) as Record<string, unknown>;
  const name = typeof body['name'] === 'string' ? (body['name'] as string).trim() : '';
  const email = typeof body['email'] === 'string' ? (body['email'] as string).trim() : '';
  const message = typeof body['message'] === 'string' ? (body['message'] as string).trim() : '';

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Construct message payload with two messages
    const messageData = {
      Messages: [
        // First message: Notification to support inbox
        {
          From: { 
            Email: process.env.CONTACT_FORM_FROM_EMAIL, 
            Name: "Plusplus Contact Form" 
          },
          To: [
            { Email: process.env.CONTACT_FORM_TO_EMAIL }
          ],
          Subject: `New Contact Form: ${name}`,
          TextPart: `Hello,

You have a new form entry from: ${name} <${email}>.

${message}`,
          HTMLPart: `<h3>New Contact Form Submission</h3>
<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>`,
          Headers: { 'Reply-To': email }
        },
        // Second message: Confirmation to the user
        {
          From: { 
            Email: process.env.CONTACT_FORM_FROM_EMAIL, 
            Name: "Plusplus" 
          },
          To: [
            { Email: email, Name: name }
          ],
          Subject: `We received your message, ${name}`,
          TextPart: `Hello ${name},

Thank you for contacting us. We've received your message and will get back to you as soon as possible.

For your reference, here's a copy of your message:

${message}

Best regards,
The Plusplus Team`,
          HTMLPart: `<h3>Thank you for your message</h3>
<p>Hello ${name},</p>
<p>We've received your message and will get back to you as soon as possible.</p>
<p><strong>For your reference, here's a copy of your message:</strong></p>
<blockquote style="border-left: 2px solid #ccc; padding-left: 10px; margin-left: 10px;">
${message.replace(/\n/g, '<br>')}
</blockquote>
<p>Best regards,<br>
The Plusplus Team</p>`,
          Headers: { 'Reply-To': process.env.CONTACT_FORM_TO_EMAIL }
        }
      ]
    };
    
    // Log the full request payload for debugging
    console.log('Sending Mailjet request:', JSON.stringify(messageData, null, 2));
    
    // Send both emails in a single Mailjet API call
    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request(messageData);
    
    // Log the response body
    console.log('Mailjet response status:', result.response.status);
    console.log('Mailjet response body:', JSON.stringify(result.body, null, 2));
    
    // Return success response
    return NextResponse.json({ submitted: true });
    
  } catch (err: unknown) {
    // Enhanced error logging with safe narrowing
    console.error('Error sending email:');
    if (err instanceof Error) {
      console.error('Error message:', err.message);
    }

    // Mailjet may return structured error info; attempt to log safely without assuming types
    try {
      if (typeof err === 'object' && err !== null) {
        console.error('Error details:', JSON.stringify(err));
      }
    } catch {
      // swallow logging errors
    }

    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Keep the existing GET handler for status checking
export async function GET() {
  return NextResponse.json({
    status: "online",
    message: "Contact API is working",
    environment: {
      mjPublic: process.env.MJ_APIKEY_PUBLIC ? "Set" : "Not set",
      mjPrivate: process.env.MJ_APIKEY_PRIVATE ? "Set" : "Not set",
      fromEmail: process.env.CONTACT_FORM_FROM_EMAIL ? "Set" : "Not set",
      toEmail: process.env.CONTACT_FORM_TO_EMAIL ? "Set" : "Not set",
    }
  });
}