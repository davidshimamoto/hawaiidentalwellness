import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Image
                src="/images/Hawaii-Dental-Wellness-Logo-Retina-White.png"
                alt="Hawaii Dental Wellness"
                className="footer-logo-img"
                width={200}
                height={45}
                style={{ height: 45, width: "auto" }}
              />
            </div>
            <p className="footer-text">Bringing ALOHA to dental care, one smile at a time.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/meet-the-ohana">Meet Our Ohana</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li>
                <Link href="/services">General Dentistry</Link>
              </li>
              <li>
                <Link href="/services">Cosmetic Dentistry</Link>
              </li>
              <li>
                <Link href="/services">Restorative Care</Link>
              </li>
              <li>
                <Link href="/services">Preventive Care</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="https://maps.app.goo.gl/icRtzYF4RaJkVBHw7" className="social-link">
                Google Maps
              </a>
              <a href="https://www.facebook.com/hdwhonolulu" className="social-link">
                Facebook
              </a>
              <a
                href="https://www.yelp.com/biz/hawaii-dental-wellness-honolulu?uid=km2cJgn2Ba5nOnEV3HTZ6g&utm_campaign=www_business_share_popup&utm_medium=copy_link&utm_source=(direct)"
                className="social-link"
              >
                Yelp
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2025 Hawaii Dental Wellness. All rights reserved. | <span>Privacy Policy</span> |{" "}
            <span>Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
