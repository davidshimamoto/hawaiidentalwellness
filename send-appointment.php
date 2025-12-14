<?php
/**
 * Hawaii Dental Wellness - Appointment Form Handler
 *
 * This script processes appointment form submissions and sends emails.
 * Sends from: appointments@hawaiidentalwellness.com
 * Sends to: info@hawaiidentalwellness.com
 */

// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die('Method Not Allowed');
}

// CORS headers for AJAX requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$to_email = 'info@hawaiidentalwellness.com';
$from_email = 'appointments@hawaiidentalwellness.com';
$from_name = 'Hawaii Dental Wellness Appointments';

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-errors.log');

// Honeypot field for spam protection
if (!empty($_POST['website'])) {
    // Honeypot field was filled (likely spam)
    http_response_code(200);
    echo json_encode(['success' => false, 'message' => 'Spam detected']);
    exit;
}

// Get and sanitize form data
$name = sanitize_input($_POST['name'] ?? '');
$email = sanitize_input($_POST['email'] ?? '');
$phone = sanitize_input($_POST['phone'] ?? '');
$service = sanitize_input($_POST['service'] ?? '');
$message = sanitize_input($_POST['message'] ?? 'No additional message provided');

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (empty($phone)) {
    $errors[] = 'Phone number is required';
}

if (empty($service)) {
    $errors[] = 'Service selection is required';
}

// If validation fails, return errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Prepare email content
$subject = "New Appointment Request from $name";

// HTML Email Template
$html_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: bold; color: #0ea5e9; margin-bottom: 5px; }
        .field-value { background: white; padding: 10px 15px; border-left: 3px solid #0ea5e9; border-radius: 5px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 14px; }
        .priority { background: #fef3c7; padding: 15px; border-left: 4px solid #fb923c; margin: 20px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0; font-size: 24px;'>🦷 New Appointment Request</h1>
            <p style='margin: 10px 0 0 0; opacity: 0.9;'>Hawaii Dental Wellness</p>
        </div>
        <div class='content'>
            <div class='priority'>
                <strong>⚠️ Action Required:</strong> New appointment request received. Please respond within 24 hours.
            </div>

            <div class='field'>
                <div class='field-label'>👤 Patient Name</div>
                <div class='field-value'>" . htmlspecialchars($name) . "</div>
            </div>

            <div class='field'>
                <div class='field-label'>📧 Email Address</div>
                <div class='field-value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
            </div>

            <div class='field'>
                <div class='field-label'>📞 Phone Number</div>
                <div class='field-value'><a href='tel:" . htmlspecialchars($phone) . "'>" . htmlspecialchars($phone) . "</a></div>
            </div>

            <div class='field'>
                <div class='field-label'>🏥 Service Requested</div>
                <div class='field-value'>" . htmlspecialchars($service) . "</div>
            </div>

            <div class='field'>
                <div class='field-label'>💬 Additional Message</div>
                <div class='field-value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>

            <div class='footer'>
                <p><strong>Submitted:</strong> " . date('F j, Y g:i A') . " HST</p>
                <p style='margin-top: 10px;'>This appointment request was submitted through the Hawaii Dental Wellness website contact form.</p>
                <p style='margin-top: 5px;'>Please contact the patient within 24 hours to schedule their appointment.</p>
            </div>
        </div>
    </div>
</body>
</html>
";

// Plain text version (fallback)
$plain_body = "
NEW APPOINTMENT REQUEST
Hawaii Dental Wellness
==================================================

PATIENT INFORMATION:
Name: $name
Email: $email
Phone: $phone
Service Requested: $service

MESSAGE:
$message

==================================================
Submitted: " . date('F j, Y g:i A') . " HST

This appointment request was submitted through the
Hawaii Dental Wellness website contact form.
Please contact the patient within 24 hours.
";

// Email headers
$headers = [
    'From: ' . $from_name . ' <' . $from_email . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1', // High priority
    'Importance: High'
];

// Send email
$mail_sent = mail($to_email, $subject, $html_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your appointment request! We will contact you within 24 hours. Mahalo!'
    ]);

    // Optional: Send confirmation email to patient
    send_confirmation_email($email, $name, $service, $from_email);

} else {
    // Error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'There was an error sending your request. Please call us at (808) 533-3892.'
    ]);
}

/**
 * Send confirmation email to the patient
 */
function send_confirmation_email($patient_email, $patient_name, $service, $from_email) {
    $subject = "Appointment Request Received - Hawaii Dental Wellness";

    $html_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 14px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1 style='margin: 0; font-size: 24px;'>🌺 Mahalo, " . htmlspecialchars($patient_name) . "!</h1>
            <p style='margin: 10px 0 0 0; opacity: 0.9;'>Hawaii Dental Wellness</p>
        </div>
        <div class='content'>
            <p>Thank you for your appointment request for <strong>" . htmlspecialchars($service) . "</strong>.</p>

            <p>We have received your information and will contact you within 24 hours to schedule your appointment.</p>

            <div style='background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #0ea5e9; border-radius: 5px;'>
                <p style='margin: 0;'><strong>📍 Our Location:</strong></p>
                <p style='margin: 5px 0;'>1139 Bethel St Suite 1A<br>Honolulu, HI 96813</p>

                <p style='margin: 15px 0 0 0;'><strong>📞 Phone:</strong></p>
                <p style='margin: 5px 0;'>(808) 533-3892</p>

                <p style='margin: 15px 0 0 0;'><strong>⏰ Hours:</strong></p>
                <p style='margin: 5px 0;'>Monday - Friday: 8am - 5pm<br>Saturday: 8am - 1pm</p>
            </div>

            <p>If you have any immediate questions or need to reach us sooner, please call us at <a href='tel:8085333892'>(808) 533-3892</a>.</p>

            <div class='footer'>
                <p>Your Smile, Our Aloha 🌺</p>
                <p style='margin-top: 5px;'>Hawaii Dental Wellness</p>
            </div>
        </div>
    </div>
</body>
</html>
    ";

    $headers = [
        'From: Hawaii Dental Wellness <' . $from_email . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8'
    ];

    mail($patient_email, $subject, $html_body, implode("\r\n", $headers));
}

/**
 * Sanitize input data
 */
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
