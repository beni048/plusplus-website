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
    // Parse request body
    const { name, email, message } = await request.json();
    
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
    
    // Construct message payload according to Mailjet v3.1 API
    const messageData = {
      Messages: [
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
        }
      ]
    };
    
    // Log the full request payload for debugging
    console.log('Sending Mailjet request:', JSON.stringify(messageData, null, 2));
    
    // Send email using Mailjet - FIXED: use single result object instead of destructuring
    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request(messageData);
    
    // Log the response body - FIXED: use result.response.status and result.body
    console.log('Mailjet response status:', result.response.status);
    console.log('Mailjet response body:', JSON.stringify(result.body, null, 2));
    
    // Return success response
    return NextResponse.json({ submitted: true });
    
  } catch (error: any) {
    // Enhanced error logging
    console.error('Error sending email:');
    console.error('Status code:', error.statusCode);
    console.error('Error message:', error.message);
    
    if (error.response && error.response.data) {
      console.error('Mailjet error response:', JSON.stringify(error.response.data, null, 2));
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