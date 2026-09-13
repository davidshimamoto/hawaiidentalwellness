"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/meet-the-ohana", label: "Meet Our Ohana" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="navbar"
      style={{
        padding: scrolled ? "10px 0" : "20px 0",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0, 0, 0, 0.1)"
          : "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <Link href="/">
              <Image
                src="/images/Hawaii-Dental-Wellness-Logo-Retina.png"
                alt="Hawaii Dental Wellness"
                className="logo-img"
                width={220}
                height={50}
                style={{ height: 50, width: "auto" }}
                priority
              />
            </Link>
          </div>
          <ul className={`nav-menu${menuOpen ? " active" : ""}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link${pathname === link.href ? " active" : ""}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="btn-book" onClick={closeMenu}>
                Book Appointment
              </Link>
            </li>
          </ul>
          <button
            className={`mobile-menu-toggle${menuOpen ? " active" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
