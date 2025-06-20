import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;
    
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
    
    // Check environment variables
    if (!process.env.PROTON_SMTP_USER || 
        !process.env.PROTON_SMTP_TOKEN || 
        !process.env.PROTON_SMTP_HOST || 
        !process.env.PROTON_SMTP_PORT) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Configure Nodemailer transporter with Proton Mail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.PROTON_SMTP_HOST,
      port: Number(process.env.PROTON_SMTP_PORT),
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.PROTON_SMTP_USER,
        pass: process.env.PROTON_SMTP_TOKEN,
      },
    });
    
    // Set up email content
    const mailOptions = {
      from: process.env.PROTON_SMTP_USER,
      to: 'hello@plusplus.swiss',
      replyTo: email,
      subject: `Website Contact: ${name}`,
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
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Testing endpoint
export async function GET() {
  return NextResponse.json({
    status: "online",
    message: "Contact API is working",
    environment: {
      smtpUser: process.env.PROTON_SMTP_USER ? "Set" : "Not set",
      smtpToken: process.env.PROTON_SMTP_TOKEN ? "Set" : "Not set", 
      smtpHost: process.env.PROTON_SMTP_HOST ? "Set" : "Not set",
      smtpPort: process.env.PROTON_SMTP_PORT ? "Set" : "Not set",
    }
  });
}