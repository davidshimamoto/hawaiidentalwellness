"use client";

import { useEffect } from "react";

/**
 * Global site interaction effects ported from the original script.js:
 * - Smooth scroll for on-page anchor links
 * - Fade-in-on-scroll animation for cards/sections (IntersectionObserver)
 * - Parallax effect on the homepage hero content
 * - Wave animation intensity tied to scroll position
 * - Stat counter animation
 * - Console easter-egg message
 *
 * Mobile nav toggle and active-link highlighting are handled directly in
 * Navbar.tsx via React state/usePathname instead of DOM manipulation.
 */
export default function SiteInteractions() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    const navbar = document.querySelector<HTMLElement>(".navbar");

    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (target && navbar) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = (target as HTMLElement).offsetTop - navHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    };

    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

    // Intersection Observer for fade-in animations
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
      ".feature-card, .service-card, .team-card, .testimonial-card, .about-content, .about-image"
    );
    animateElements.forEach((el) => {
      const element = el as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });

    // Parallax effect on hero content
    const heroContent = document.querySelector<HTMLElement>(".hero-content");
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = String(1 - scrolled * 0.002);
      }
    };
    window.addEventListener("scroll", handleParallax);

    // Wave animation intensity based on scroll
    const waves = document.querySelectorAll<HTMLElement>(".wave");
    const handleWaveScroll = () => {
      const scrolled = window.pageYOffset;
      waves.forEach((wave, index) => {
        const speed = (index + 1) * 0.05;
        wave.style.transform = `translateX(${-scrolled * speed}px)`;
      });
    };
    window.addEventListener("scroll", handleWaveScroll);

    // Counter animation for stats
    const stats = document.querySelectorAll<HTMLElement>(".stat-number");
    const statsSection = document.querySelector(".about-stats");

    const animateCounter = (element: HTMLElement, target: string) => {
      const targetNumber = parseInt(target.replace(/\D/g, ""), 10);
      const duration = 2000;
      const increment = targetNumber / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < targetNumber) {
          element.textContent =
            Math.ceil(current) + (target.includes("+") ? "+" : "") + (target.includes("%") ? "%" : "");
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };

      updateCounter();
    };

    let statsObserver: IntersectionObserver | undefined;
    if (statsSection) {
      statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              stats.forEach((stat) => {
                const target = stat.textContent || "";
                animateCounter(stat, target);
              });
              statsObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      statsObserver.observe(statsSection);
    }

    // Entrance animation for hero
    const heroEl = document.querySelector<HTMLElement>(".hero-content");
    if (heroEl) {
      heroEl.style.animation = "fadeInUp 1s ease forwards";
    }

    // Console easter egg
    console.log(
      "%c🌺 Hawaii Dental Wellness - Made with Aloha 🌺",
      "color: #2AB3A6; font-size: 16px; font-weight: bold;"
    );

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
      observer.disconnect();
      statsObserver?.disconnect();
      window.removeEventListener("scroll", handleParallax);
      window.removeEventListener("scroll", handleWaveScroll);
    };
  }, []);

  return null;
}
