# Appointment Form Setup Guide
## Hawaii Dental Wellness

This guide explains how to configure the appointment form to send emails from appointments@hawaiidentalwellness.com to david@hawaiidentalwellness.com.

---

## What's Been Implemented

### 1. PHP Email Handler (`send-appointment.php`)
- Processes form submissions via AJAX
- Sends from: **appointments@hawaiidentalwellness.com**
- Sends to: **david@hawaiidentalwellness.com**
- Beautiful HTML email template
- Automatic patient confirmation email
- Spam protection (honeypot field)
- Form validation
- Error handling

### 2. Updated HTML Form (`index.html`)
- Added form ID for JavaScript targeting
- Added honeypot field for spam protection
- Added message display area for feedback
- All form fields have proper `name` attributes

### 3. Updated JavaScript (`script.js`)
- AJAX form submission (no page reload)
- Loading states ("Sending..." button text)
- Success/error message display
- Automatic form reset on success
- Prevents double submissions

---

## Server Requirements

Your hosting must support:
- **PHP 7.4 or higher**
- **PHP mail() function enabled**
- **SMTP/Email configured** (most hosting providers have this by default)

---

## Email Configuration Options

You have **3 options** to make this work:

### Option 1: Basic PHP mail() (Simplest)

**Requirements:**
- Your hosting supports PHP mail()
- No additional configuration needed

**Steps:**
1. Upload `send-appointment.php` to your web server
2. The form will work immediately

**Pros:**
- Easiest setup
- No configuration needed

**Cons:**
- Emails may go to spam
- Less reliable
- Cannot authenticate from appointments@hawaiidentalwellness.com properly

**Recommendation:** Good for testing, not recommended for production.

---

### Option 2: SMTP Configuration (Recommended)

Use a proper SMTP service to send emails. This requires using PHPMailer.

**Why SMTP?**
- More reliable email delivery
- Less likely to be marked as spam
- Can properly authenticate as appointments@hawaiidentalwellness.com
- Better error reporting

**Steps:**

1. **Install PHPMailer** (if not already installed)
   - Upload the PHPMailer library to your server
   - Or use Composer: `composer require phpmailer/phpmailer`

2. **Use the SMTP version** (see `send-appointment-smtp.php` below)

3. **Configure SMTP settings:**
   - Get SMTP credentials from your email provider
   - Update the configuration in the PHP file

**SMTP Credentials Needed:**
- SMTP Host (e.g., mail.hawaiidentalwellness.com or smtp.gmail.com)
- SMTP Port (usually 587 for TLS or 465 for SSL)
- Username: appointments@hawaiidentalwellness.com
- Password: [your email password]

---

### Option 3: Third-Party Email Service (Most Reliable)

Use a professional email service like:
- **SendGrid** (free tier: 100 emails/day)
- **Mailgun** (free tier: 5,000 emails/month)
- **Amazon SES** (very cheap, highly reliable)
- **Postmark** (paid but excellent deliverability)

**Why use a service?**
- 99%+ delivery rate
- Detailed analytics
- Better spam protection
- Scalable
- Professional

**I can create integration code for any of these services if you choose this option.**

---

## Email Server Setup

### If you're using cPanel/Plesk hosting:

1. **Create the email account:**
   - Login to cPanel/Plesk
   - Go to Email Accounts
   - Create: appointments@hawaiidentalwellness.com
   - Set a strong password

2. **Get SMTP settings:**
   - Usually found in Email Accounts → Configure Email Client
   - Common settings:
     - SMTP Host: mail.hawaiidentalwellness.com
     - SMTP Port: 587 (TLS) or 465 (SSL)
     - Username: appointments@hawaiidentalwellness.com
     - Password: [your password]

3. **Test the email account:**
   - Send a test email to yourself
   - Make sure it's working before configuring the form

---

## Installation Instructions

### Basic Installation (PHP mail):

1. **Upload files to your web server:**
   ```
   /public_html/
   ├── index.html
   ├── script.js
   ├── send-appointment.php  ← Upload this
   └── ...
   ```

2. **Set file permissions:**
   - `send-appointment.php` should be readable (644)

3. **Test the form:**
   - Visit your website
   - Fill out the appointment form
   - Submit and check if email arrives

### SMTP Installation:

1. **Download PHPMailer:**
   - Download from: https://github.com/PHPMailer/PHPMailer
   - Or use Composer: `composer require phpmailer/phpmailer`

2. **Upload files:**
   ```
   /public_html/
   ├── vendor/phpmailer/  ← PHPMailer files
   ├── send-appointment.php  ← Delete this
   ├── send-appointment-smtp.php  ← Use this instead
   └── ...
   ```

3. **Update script.js:**
   - Change `send-appointment.php` to `send-appointment-smtp.php` (line 102)

4. **Configure SMTP settings** in `send-appointment-smtp.php`

---

## Troubleshooting

### Emails not arriving:

1. **Check spam folder** - Basic PHP mail often goes to spam

2. **Check server logs:**
   - cPanel → Error Log
   - Look for PHP errors or mail errors

3. **Test PHP mail():**
   Create a test file `test-mail.php`:
   ```php
   <?php
   $result = mail('your-email@example.com', 'Test', 'This is a test');
   echo $result ? 'Mail sent!' : 'Mail failed!';
   ?>
   ```

4. **Verify email account exists:**
   - Log into appointments@hawaiidentalwellness.com
   - Make sure it's active

5. **Check hosting email limits:**
   - Some hosts limit emails per hour
   - Contact your hosting provider

### Form shows error:

1. **Check PHP version:**
   - Needs PHP 7.4 or higher
   - Check in cPanel → PHP Version

2. **Check file permissions:**
   - send-appointment.php should be 644

3. **Check browser console:**
   - Right-click → Inspect → Console
   - Look for JavaScript errors

4. **Enable error display** (temporarily):
   Add to top of send-appointment.php:
   ```php
   ini_set('display_errors', 1);
   error_reporting(E_ALL);
   ```

---

## Security Best Practices

### Current Security Features:

✓ Honeypot spam protection
✓ Input sanitization
✓ Email validation
✓ XSS protection
✓ CORS headers

### Recommended Additional Security:

1. **Add reCAPTCHA:**
   - Prevents automated spam submissions
   - Free from Google
   - I can add this if needed

2. **Rate limiting:**
   - Limit submissions per IP
   - Prevents abuse

3. **Email verification:**
   - Verify patient email is real
   - Send confirmation link

4. **HTTPS only:**
   - Make sure your site uses HTTPS
   - Protects form data in transit

**Let me know if you want me to implement any of these.**

---

## Testing Checklist

Before going live, test these scenarios:

- [ ] Submit form with all fields filled
- [ ] Check david@hawaiidentalwellness.com receives email
- [ ] Check patient receives confirmation email
- [ ] Submit form with missing required fields (should show error)
- [ ] Submit form with invalid email (should show error)
- [ ] Submit form twice quickly (should prevent double submission)
- [ ] Check email formatting looks good on mobile
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Check spam folder if emails don't arrive

---

## Email Template Features

The emails include:

**To david@hawaiidentalwellness.com:**
- Professional HTML design
- High priority flag
- Patient contact info (clickable phone/email)
- Service requested
- Timestamp
- Reply-to set to patient's email

**To patient (confirmation):**
- Thank you message
- Office location and hours
- Phone number
- Reassurance about 24-hour response

---

## Customization

### Change recipient email:

In `send-appointment.php` line 22:
```php
$to_email = 'david@hawaiidentalwellness.com'; // Change this
```

### Change sender email:

In `send-appointment.php` line 23:
```php
$from_email = 'appointments@hawaiidentalwellness.com'; // Change this
```

### Disable confirmation email to patient:

In `send-appointment.php` line 186, comment out:
```php
// send_confirmation_email($email, $name, $service, $from_email);
```

### Change email template colors:

Edit the HTML in `send-appointment.php` around lines 67-150

---

## Next Steps

1. **Choose your email method** (Basic PHP mail, SMTP, or Third-party)
2. **Set up the email account** (appointments@hawaiidentalwellness.com)
3. **Upload files to your server**
4. **Test the form thoroughly**
5. **Monitor for the first few days** to ensure emails arrive

---

## Need Help?

If you need:
- SMTP configuration file
- Third-party service integration (SendGrid, etc.)
- Additional security features
- Custom email templates
- reCAPTCHA integration

Just let me know and I'll create the specific code you need!

---

## Alternative: FormSpree / EmailJS

If you don't want to deal with server configuration, you can use:

**FormSpree** (easiest):
- No PHP needed
- Free tier available
- Just change form action
- I can set this up in 5 minutes

**EmailJS** (JavaScript-based):
- No backend needed
- Free tier: 200 emails/month
- Works with static sites

**Let me know if you want to use one of these instead!**
