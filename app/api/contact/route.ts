import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Get form data from request body
    const body = await request.json();
    const { name, email, message } = body;
    
    // Log the form data (without exposing sensitive info)
    console.log('Form submission received:', { name, email: email ? 'valid' : 'missing' });
    
    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if environment variables are set
    if (!process.env.PROTON_SMTP_USER || 
        !process.env.PROTON_SMTP_TOKEN || 
        !process.env.PROTON_SMTP_HOST || 
        !process.env.PROTON_SMTP_PORT) {
      console.error('Missing environment variables for email configuration');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Configure Nodemailer transporter with Proton Mail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.PROTON_SMTP_HOST,
      port: Number(process.env.PROTON_SMTP_PORT),
      secure: false, // true for 465, false for other ports (like 587 with STARTTLS)
      auth: {
        user: process.env.PROTON_SMTP_USER,
        pass: process.env.PROTON_SMTP_TOKEN,
      },
      tls: {
        rejectUnauthorized: true, // Keep this true for security
      },
    });
    
    // Email content
    const mailOptions = {
      from: process.env.PROTON_SMTP_USER,
      to: 'hello@plusplus.swiss',
      replyTo: email,
      subject: `Contact Form: Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    // Enhanced error logging
    console.error('Error in contact API route:');
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Unknown error object:', error);
    }
    
    return NextResponse.json(
      { message: 'Failed to send email. Server error.' },
      { status: 500 }
    );
  }
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Test endpoint that doesn't actually send email but validates the request
export async function GET() {
  return NextResponse.json({
    message: 'Contact API is working. Use POST to send messages.',
    environment: {
      smtpUser: process.env.PROTON_SMTP_USER ? 'Set' : 'Not set',
      smtpToken: process.env.PROTON_SMTP_TOKEN ? 'Set' : 'Not set',
      smtpHost: process.env.PROTON_SMTP_HOST ? 'Set' : 'Not set',
      smtpPort: process.env.PROTON_SMTP_PORT ? 'Set' : 'Not set',
    }
  });
}