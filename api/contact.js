// Contact form handler — sends via Google Workspace SMTP (no third-party form service).
// Env vars (set in Vercel): SMTP_USER, SMTP_PASS (Google app password), CONTACT_TO
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const b = req.body || {};
  if (b._gotcha) return res.status(200).json({ ok: true }); // honeypot: silently accept bots

  const name = (b.name || '').toString().trim();
  const email = (b.email || '').toString().trim();
  const message = (b.message || '').toString().trim();
  const company = (b.company || '').toString().trim();
  const service = (b.service || '').toString().trim();
  const budget = (b.budget || '').toString().trim();

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP env vars not configured');
    return res.status(500).json({ ok: false, error: 'Email is not configured' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `PresenceNet Website <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || 'hello@presencenet.io',
      replyTo: `${name} <${email}>`,
      subject: `New enquiry — ${name}${company ? ' · ' + company : ''}`,
      text:
        `Name:    ${name}\n` +
        `Email:   ${email}\n` +
        `Company: ${company || '—'}\n` +
        `Service: ${service || '—'}\n` +
        `Budget:  ${budget || '—'}\n\n` +
        `Message:\n${message}\n`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact send failed:', err && err.message);
    return res.status(500).json({ ok: false, error: 'Send failed' });
  }
};
