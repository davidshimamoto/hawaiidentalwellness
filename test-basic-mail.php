<?php
/**
 * Simple PHP mail() Test Script
 * Use this to test if basic email sending works on your server
 *
 * USAGE:
 * 1. Upload this file to your web server
 * 2. Visit it in your browser: https://yoursite.com/test-basic-mail.php
 * 3. Check if email arrives at david@hawaiidentalwellness.com
 * 4. DELETE THIS FILE after testing
 */

echo "<h1>PHP mail() Function Test</h1>";
echo "<style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f5f5f5; }
    .success { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 10px 0; }
    .error { background: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 10px 0; }
    .info { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 10px 0; }
</style>";

// Configuration
$to = 'david@hawaiidentalwellness.com';
$from = 'appointments@hawaiidentalwellness.com';
$from_name = 'Hawaii Dental Wellness';

// Email subject
$subject = 'Test Email - ' . date('Y-m-d H:i:s');

// HTML email body
$html_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0;'>🧪 Test Email</h1>
        </div>
        <div class='content'>
            <p><strong>This is a test email from Hawaii Dental Wellness.</strong></p>
            <p>If you receive this, PHP mail() is working correctly on your server!</p>
            <p><strong>Sent at:</strong> " . date('F j, Y g:i A') . "</p>
        </div>
    </div>
</body>
</html>
";

// Plain text alternative
$plain_body = "
TEST EMAIL
Hawaii Dental Wellness

This is a test email. If you receive this, PHP mail() is working correctly!

Sent at: " . date('F j, Y g:i A');

// Email headers
$headers = array();
$headers[] = 'From: ' . $from_name . ' <' . $from . '>';
$headers[] = 'Reply-To: ' . $from;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email
$result = mail($to, $subject, $html_body, implode("\r\n", $headers));

// Display result
echo "<div class='info'>";
echo "<h2>Test Configuration:</h2>";
echo "<strong>To:</strong> $to<br>";
echo "<strong>From:</strong> $from_name &lt;$from&gt;<br>";
echo "<strong>Subject:</strong> $subject<br>";
echo "</div>";

echo "<div class='info'>";
echo "<h2>Server Information:</h2>";
echo "<strong>PHP Version:</strong> " . phpversion() . "<br>";
echo "<strong>Server:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "<strong>Server Name:</strong> " . $_SERVER['SERVER_NAME'] . "<br>";
echo "</div>";

if ($result) {
    echo "<div class='success'>";
    echo "<h2>✓ SUCCESS!</h2>";
    echo "<p>Email was sent successfully using PHP mail() function.</p>";
    echo "<p><strong>Next steps:</strong></p>";
    echo "<ol>";
    echo "<li>Check your inbox at <strong>$to</strong></li>";
    echo "<li>Check your spam/junk folder if you don't see it</li>";
    echo "<li>If you receive the email, your appointment form should work!</li>";
    echo "<li><strong style='color: red;'>DELETE this test file (test-basic-mail.php) from your server</strong></li>";
    echo "</ol>";
    echo "</div>";

    echo "<div class='info'>";
    echo "<h3>Your Form Setup:</h3>";
    echo "<p>Since basic PHP mail() works, your appointment form is ready to use!</p>";
    echo "<p>Just make sure:</p>";
    echo "<ul>";
    echo "<li>✓ <code>send-appointment.php</code> is uploaded to your server</li>";
    echo "<li>✓ <code>script.js</code> points to <code>send-appointment.php</code> (already configured)</li>";
    echo "<li>✓ Your form HTML has the correct attributes (already done)</li>";
    echo "</ul>";
    echo "<p><strong>You're all set! No PHPMailer needed.</strong></p>";
    echo "</div>";

} else {
    echo "<div class='error'>";
    echo "<h2>✗ FAILED</h2>";
    echo "<p>PHP mail() function failed to send the email.</p>";

    echo "<h3>Possible Causes:</h3>";
    echo "<ol>";
    echo "<li><strong>Mail function disabled:</strong> Your hosting provider may have disabled the mail() function</li>";
    echo "<li><strong>Missing mail server:</strong> Server not configured for sending email</li>";
    echo "<li><strong>Permission issues:</strong> PHP doesn't have permission to send mail</li>";
    echo "</ol>";

    echo "<h3>Solutions:</h3>";
    echo "<ol>";
    echo "<li><strong>Contact your hosting provider (GoDaddy):</strong> Ask them to enable PHP mail() or provide SMTP settings</li>";
    echo "<li><strong>Use PHPMailer with SMTP:</strong> More reliable but requires installation (I can help with this)</li>";
    echo "<li><strong>Use a third-party service:</strong> FormSpree, SendGrid, or EmailJS (no PHP needed)</li>";
    echo "</ol>";
    echo "</div>";

    // Check if mail function exists
    echo "<div class='info'>";
    echo "<h3>Diagnostics:</h3>";
    echo "<strong>mail() function exists:</strong> " . (function_exists('mail') ? '✓ Yes' : '✗ No (DISABLED)') . "<br>";

    // Try to get more info
    if (function_exists('error_get_last')) {
        $last_error = error_get_last();
        if ($last_error) {
            echo "<strong>Last Error:</strong> " . $last_error['message'] . "<br>";
        }
    }
    echo "</div>";
}

echo "<div class='error' style='margin-top: 30px;'>";
echo "<h3>⚠️ IMPORTANT SECURITY NOTE</h3>";
echo "<p><strong>DELETE THIS FILE (test-basic-mail.php) AFTER TESTING!</strong></p>";
echo "<p>Do not leave test scripts on your production server.</p>";
echo "</div>";

?>
