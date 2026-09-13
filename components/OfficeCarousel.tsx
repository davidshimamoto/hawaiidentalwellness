"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { label: "Reception Area", background: "linear-gradient(135deg, #2AB3A6 0%, #004F59 100%)" },
  { label: "Treatment Room", background: "linear-gradient(135deg, #004F59 0%, #2AB3A6 100%)" },
  { label: "Waiting Lounge", background: "linear-gradient(135deg, #FFD9C2 0%, #2AB3A6 100%)" },
  { label: "Modern Equipment", background: "linear-gradient(135deg, #046436 0%, #AAED8D 100%)" },
  { label: "Patient Comfort", background: "linear-gradient(135deg, #2AB3A6 0%, #FFD9C2 100%)" },
];

/**
 * Office photo carousel, ported from script.js's initCarousel(). This section
 * is currently `hidden` on the homepage (see app/page.tsx), matching the
 * original markup which had the `.office` section marked `hidden`.
 */
export default function OfficeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const resetAutoplay = () => {
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    stopAutoplay();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    startAutoplay();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoplay();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoplay();
    }
  };

  return (
    <div
      className="office-carousel"
      ref={carouselRef}
      tabIndex={0}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onKeyDown={handleKeyDown}
    >
      <div className="carousel-track-wrapper">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {SLIDES.map((slide) => (
            <div className="carousel-slide" key={slide.label}>
              <div className="slide-placeholder" style={{ background: slide.background }}>
                <span className="placeholder-label">{slide.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel-btn carousel-btn-prev"
        aria-label="Previous slide"
        onClick={() => {
          prevSlide();
          resetAutoplay();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="carousel-btn carousel-btn-next"
        aria-label="Next slide"
        onClick={() => {
          nextSlide();
          resetAutoplay();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <div className="carousel-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.label}
            className={`carousel-dot${i === currentIndex ? " active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}
