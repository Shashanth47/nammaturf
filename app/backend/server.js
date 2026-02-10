const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Transporter for NodeMailer (Using a placeholder/test configuration)
// In production, use real SMTP credentials in .env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Routes
app.post('/api/demo-request', async (req, res) => {
    const { name, email, company, phone, turfs_count, message } = req.body;

    try {
        const mailOptions = {
            from: `"Namma Turf Website" <${process.env.SMTP_USER || 'no-reply@nammaturf.com'}>`,
            to: 'kushashanth@gmail.com',
            subject: 'New Demo Request - Namma Turf',
            html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Number of Turfs:</strong> ${turfs_count || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
        };

        console.log('Sending demo request email to kushashanth@gmail.com...');

        // If SMTP credentials are provided, send the email
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } else {
            console.log('SMTP credentials not provided. Email content logged above.');
        }

        res.status(200).json({ success: true, message: 'Request received successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const mailOptions = {
            from: `"Namma Turf Contact Form" <${process.env.SMTP_USER || 'no-reply@nammaturf.com'}>`,
            to: 'kushashanth@gmail.com',
            subject: `Contact Form Submission: ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        console.log('Sending contact form email to kushashanth@gmail.com...');

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } else {
            console.log('SMTP credentials not provided. Email content logged above.');
        }

        res.status(200).json({ success: true, message: 'Message received successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Basic login logic (placeholder)
    if (email && password) {
        // For now, accept any credentials
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: { email, name: 'User' }
        });
    } else {
        res.status(400).json({ success: false, message: 'Email and password are required' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
