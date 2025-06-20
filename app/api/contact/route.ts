import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Get form data from request body
    const body = await request.json();
    const { name, email, message } = body;
    
    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
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
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}