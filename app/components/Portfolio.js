'use client';
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { THUMBNAILS_DATA } from '../data/thumbnails';

// ── STATIC CONTENT (unchanged from index.html) ─────────────
const BIO =
  "Hello! I'm Sharath. I make not just a picture, but dive into your content, analyze viewer psychology, and design thumbnails that drive millions of clicks.";

const MARQUEE_FILES = [
  'Thumbnail01.png',
  'Thumbnail02.png',
  'Thumbnail35.png',
  'Thumbnail04.png',
  'Thumbnail05.png',
  'Thumbnail06.png',
  'Thumbnail20.png',
  'Thumbnail24.png',
  'Thumbnail09.png',
  'Thumbnail10.png',
];

const FEATURED = [
  {
    theme: 'project-theme-alabaster',
    num: '01',
    heading: 'Finance Thumbnails',
    altPrefix: 'Finance Thumbnail',
    files: ['Thumbnail41.png', 'Thumbnail16.png', 'Thumbnail19.png'],
  },
  {
    theme: 'project-theme-mineral',
    num: '02',
    heading: 'Tech Thumbnails',
    altPrefix: 'Tech Thumbnail',
    files: ['Thumbnail21.png', 'Thumbnail18.png', 'Thumbnail11.png'],
  },
  {
    theme: 'project-theme-cream',
    num: '03',
    heading: 'Gaming Thumbnails',
    altPrefix: 'Gaming Thumbnail',
    files: ['Thumbnail04.png', 'Thumbnail05.png', 'Thumbnail25.png'],
  },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'finance', label: 'Finance' },
  { key: 'tech', label: 'Tech' },
  { key: 'gaming', label: 'Gaming' },
  { key: 'story', label: 'Story & Viral' },
];

const DIRECTORY = [
  {  client: 'Live Trading Analysis', role: 'Finance Thumbnail', file: 'Thumbnail35.png' },
  {  client: 'Build your Brand', role: 'Tech Review', file: 'Thumbnail20.png' },
  {  client: 'Live BGMI Gameplay', role: 'Gaming & Challenge', file: 'Thumbnail05.png' },
  {  client: 'Live FreeFire Gameplay', role: 'Gaming Thumbnail', file: 'Thumbnail04.png' },
  {  client: 'Tax Loophole Strategy', role: 'Finance Thumbnail', file: 'Thumbnail13.png' },
  {  client: 'Billion Dollar Cyber Breakdown', role: 'Tech & Documentary', file: 'Thumbnail31.png' },
  {  client: 'Desert Dunes Survival', role: 'Challenge Thumbnail', file: 'Thumbnail40.png' },
  {  client: 'AI Autonomous Systems', role: 'Tech Thumbnail', file: 'Thumbnail18.png' },
];

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Research & Planning',
    desc: 'Understanding the video topic and finding the right idea.',
  },
  {
    num: '02',
    title: 'Layout & Composition',
    desc: 'Placing the subject, text, and elements in the right way.',
  },
  {
    num: '03',
    title: 'Editing & Designing',
    desc: 'Working on colors, lighting, text, and visual effects.',
  },
  {
    num: '04',
    title: 'Final Touches',
    desc: 'Checking details and making sure the thumbnail looks good on all screens.',
  },
];

const COUNTERS = [
  { target: 10, value: '10M+', label: 'Views Generated' },
  { target: 50, value: '50+', label: 'Thumbnails Shipped' },
  { target: 22, value: '22%', label: 'Average CTR Improvement' },
  { target: 30, value: '30+', label: 'Channels Worked With' },
];

const QUOTES = [
  {
    body: '"Honestly, the thumbnail turned out better than I expected. He understood exactly what I wanted and got the style right on the first try."',
    image: '/assets/creators/oana.jpg',
    name: 'Oana',
    meta: 'Oana Labes',
  },
  {
    body: '"After using his thumbnails, my CTR went from 3.2% to 8.8%. The new designs really made my videos stand out!"',
    image: '/assets/creators/bhushan.jpg',
    name: 'Bhushan',
    meta: 'Bhushan Bags',
  },
  {
    body: '"Working with him was a great experience. He turned my rough ideas into clean, eye-catching thumbnails that matched my channel perfectly."',
    image: '/assets/creators/trish.png',
    name: 'Trish',
    meta: 'Axial Studio',
  },
];

const CONTACT_LINKS = [
  { href: 'mailto:sharathsilangari@gmail.com', label: 'Email', address: 'sharathsilangari@gmail.com', external: false },
  { href: 'https://www.instagram.com/sharathdzns?cnvx=ZmlmN3V5MW04Zjk0', label: 'Instagram', address: '@sharathdzns', external: true },
  { href: 'https://discord.com/users/849164250827063357', label: 'Discord', address: '@sharath_0705_', external: true },
  { href: 'https://x.com/shaxath07', label: 'Twitter / X', address: '@shaxath07', external: true },
];

export default function Portfolio() {
  const lenisRef = useRef(null);
  const hoverCardRef = useRef(null);
  const hoverImgRef = useRef(null);
  const galleryGridRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: '' });
  // `key` changes on every gallery re-render so the cards remount and replay the stagger (same as original innerHTML rebuild)
  const [gallery, setGallery] = useState({ filter: 'all', expanded: false, key: 0 });

  // ── LENIS SMOOTH INERTIA SCROLL + HEADER SCROLL STATE ─────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      infinite: false,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenis.on('scroll', (e) => setScrolled(e.scroll > 40));

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── PAUSE SMOOTH SCROLL + LOCK BODY WHILE LIGHTBOX / MOBILE NAV OPEN ──
  useEffect(() => {
    const locked = navOpen || lightbox.open;
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
    document.body.style.overflow = locked ? 'hidden' : '';
  }, [navOpen, lightbox.open]);

  // ── SMOOTH ANCHOR SCROLLING INTEGRATION ───────────────────
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest && e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        setNavOpen(false);
        document.body.style.overflow = '';
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.start();
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.25 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // ── SCROLL-TRIGGERED PROGRESSIVE ENTRANCE OBSERVER ────────
  useEffect(() => {
    const revealTargets = document.querySelectorAll('.scroll-reveal, .stagger-group');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');

            // If it's a stagger group, also trigger children
            if (entry.target.classList.contains('stagger-group')) {
              const items = entry.target.querySelectorAll('.stagger-item');
              items.forEach((item) => item.classList.add('is-revealed'));
            }

            // Keep revealed once settled
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealTargets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── GALLERY: PROGRESSIVE STAGGER REVEAL AFTER EACH RENDER ─
  useEffect(() => {
    const grid = galleryGridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.gallery-item');
    const frames = [];
    const timers = [];

    cards.forEach((card, index) => {
      frames.push(
        requestAnimationFrame(() => {
          timers.push(
            setTimeout(() => {
              card.classList.add('is-revealed');
            }, index * 40)
          );
        })
      );
    });

    return () => {
      frames.forEach((f) => cancelAnimationFrame(f));
      timers.forEach((t) => clearTimeout(t));
    };
  }, [gallery.key]);

  // ── HOVER THUMBNAIL FLOATING PREVIEW FOR DIRECTORY ROWS ───
  useEffect(() => {
    const hoverCard = hoverCardRef.current;
    const hoverImg = hoverImgRef.current;
    const dirRows = document.querySelectorAll('.dir-row');
    if (!hoverCard || !hoverImg || window.innerWidth <= 800) return;

    const cleanups = [];
    dirRows.forEach((row) => {
      const onEnter = () => {
        const previewSrc = row.getAttribute('data-preview');
        if (previewSrc) {
          hoverImg.src = previewSrc;
          hoverCard.classList.add('active');
        }
      };
      const onMove = (e) => {
        hoverCard.style.left = `${e.clientX}px`;
        hoverCard.style.top = `${e.clientY}px`;
      };
      const onLeave = () => {
        hoverCard.classList.remove('active');
      };
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mousemove', onMove);
      row.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        row.removeEventListener('mouseenter', onEnter);
        row.removeEventListener('mousemove', onMove);
        row.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // ── STATS ANIMATED COUNTERS ───────────────────────────────
  useEffect(() => {
    const statCounters = document.querySelectorAll('.counter-big-val[data-target]');
    const timers = [];

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.innerText.replace(/[0-9]/g, '');
            let count = 0;
            const duration = 1200;
            const stepTime = 30;
            const stepCount = duration / stepTime;
            const increment = target / stepCount;

            const timer = setInterval(() => {
              count += increment;
              if (count >= target) {
                el.innerText = target + suffix;
                clearInterval(timer);
              } else {
                el.innerText = Math.floor(count) + suffix;
              }
            }, stepTime);
            timers.push(timer);

            countObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    statCounters.forEach((c) => countObserver.observe(c));
    return () => {
      countObserver.disconnect();
      timers.forEach((t) => clearInterval(t));
    };
  }, []);

  // ── ESCAPE KEY TO CLOSE LIGHTBOX & MOBILE NAV ─────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightbox((prev) => ({ ...prev, open: false }));
        setNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // ── HANDLERS ──────────────────────────────────────────────
  const openSimpleLightbox = (src) => setLightbox({ open: true, src });
  const closeSimpleLightbox = () => setLightbox((prev) => ({ ...prev, open: false }));
  const toggleMobileNav = () => setNavOpen((open) => !open);
  const closeMobileNav = () => setNavOpen(false);

  const handleFilter = (filter) => {
    setGallery((g) => ({ filter, expanded: false, key: g.key + 1 })); // Reset to 9 items on category change
  };

  const toggleViewMore = () => {
    const collapsing = gallery.expanded;
    setGallery((g) => ({ ...g, expanded: !g.expanded, key: g.key + 1 }));

    // If collapsing back to 9, smoothly scroll back to top of gallery
    if (collapsing) {
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(gallerySection, { offset: -40, duration: 1.0 });
        } else {
          gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  // ── GALLERY DATA ──────────────────────────────────────────
  const filteredItems =
    gallery.filter === 'all'
      ? THUMBNAILS_DATA
      : THUMBNAILS_DATA.filter((item) => item.category === gallery.filter);
  const itemsToDisplay = gallery.expanded ? filteredItems : filteredItems.slice(0, 9);

  return (
    <>
      {/* FLOATING THUMBNAIL PREVIEW FOR DIRECTORY ROWS (DESKTOP) */}
      <div className="hover-thumbnail-card" id="hoverPreviewCard" ref={hoverCardRef}>
        <img alt="Project Preview" id="hoverPreviewImg" ref={hoverImgRef} />
      </div>

      {/* ═══════════ HEADER / NAVIGATION ═══════════ */}
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="header-inner">
          {/* Mobile Bar: Logo + Hamburger Button */}
          <div className="mobile-nav-bar">
            <a href="#hero" className="mobile-logo">THUMBNAIL DESIGNER</a>
            <button
              className={`mobile-menu-toggle${navOpen ? ' active' : ''}`}
              id="menuToggle"
              aria-label="Toggle navigation menu"
              onClick={toggleMobileNav}
            >
              <span className="hamburger-line line-1"></span>
              <span className="hamburger-line line-2"></span>
            </button>
          </div>

          {/* Bio text (In header on desktop) */}
          <div className="header-bio desktop-bio">
            <p>{BIO}</p>
          </div>

          {/* Navigation links */}
          <nav className={`header-nav${navOpen ? ' active' : ''}`} id="headerNav">
            <div className="nav-links">
              <a href="#featured" className="nav-link" onClick={closeMobileNav}>Featured</a>
              <a href="#gallery" className="nav-link" onClick={closeMobileNav}>Work</a>
              <a href="#directory" className="nav-link" onClick={closeMobileNav}>Directory</a>
              <a href="#process" className="nav-link" onClick={closeMobileNav}>Process</a>
              <a href="#testimonials" className="nav-link" onClick={closeMobileNav}>Testimonials</a>
              <a href="#contact" className="nav-link nav-link-cta" onClick={closeMobileNav}>{"Let's Talk"}</a>
            </div>
          </nav>
        </div>
      </header>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          {/* Mobile Bio Text (Displayed directly in hero flow on mobile) */}
          <div className="mobile-hero-bio">
            <p>{BIO}</p>
          </div>

          <div className="hero-headline-wrap scroll-reveal">
            <h1 className="hero-title">Thumbnail Designer</h1>
          </div>

          <div className="hero-stats-bar scroll-reveal">
            <div className="hero-stat">
              <span className="stat-value">10M+</span>
              <span className="stat-desc">Views Generated</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-value">50+</span>
              <span className="stat-desc">Thumbnails Shipped</span>
            </div>
          </div>
        </div>

        {/* HERO CONTINUOUS THUMBNAIL MARQUEE */}
        <div className="hero-marquee-container scroll-reveal">
          <div className="marquee-track" id="heroMarqueeTrack">
            {MARQUEE_FILES.map((file, i) => (
              <div
                className="marquee-item"
                key={`a-${file}`}
                onClick={() => openSimpleLightbox(`/assets/${file}`)}
              >
                <img src={`/assets/${file}`} alt={`Thumbnail ${String(i + 1).padStart(2, '0')}`} loading="eager" />
              </div>
            ))}

            {/* Duplicate clone for seamless loop */}
            {MARQUEE_FILES.map((file, i) => (
              <div
                className="marquee-item"
                key={`b-${file}`}
                onClick={() => openSimpleLightbox(`/assets/${file}`)}
              >
                <img src={`/assets/${file}`} alt={`Thumbnail ${String(i + 1).padStart(2, '0')}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED WORK ═══════════ */}
      <section className="featured-section" id="featured">
        <div className="featured-intro-header scroll-reveal">
          <h2 className="featured-lead-title">Featured work</h2>
        </div>

        {FEATURED.map((project) => (
          <article
            className={`featured-project-block ${project.theme} scroll-reveal`}
            key={project.num}
          >
            <div className="project-content-container">
              <div className="project-header-clean scroll-reveal">
                <span className="project-num">{project.num}</span>
                <h3 className="project-heading">{project.heading}</h3>
              </div>

              <div className="project-clean-grid stagger-group">
                {project.files.map((file, i) => (
                  <div
                    className={`clean-thumb-card stagger-item stagger-delay-${i + 1}`}
                    key={file}
                    onClick={() => openSimpleLightbox(`/assets/${file}`)}
                  >
                    <img
                      src={`/assets/${file}`}
                      alt={`${project.altPrefix} ${String(i + 1).padStart(2, '0')}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ═══════════ WORK (GALLERY: 9 INITIAL + VIEW MORE) ═══════════ */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-inner">
          <div className="gallery-header-row scroll-reveal">
            <div>
              <h2 className="gallery-title">Work</h2>
            </div>

            <div className="filter-bar" id="galleryFilters">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`filter-btn${gallery.filter === f.key ? ' active' : ''}`}
                  data-filter={f.key}
                  onClick={() => handleFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Grid with Progressive Stagger */}
          <div className="gallery-grid" id="portfolioGalleryGrid" key={gallery.key} ref={galleryGridRef}>
            {itemsToDisplay.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-item stagger-item stagger-delay-${(index % 3) + 1}`}
                onClick={() => openSimpleLightbox(item.file)}
              >
                <div className="gallery-item-thumb">
                  <img src={item.file} alt="Thumbnail" loading="lazy" />
                </div>
              </div>
            ))}
          </div>

          {/* View More Button Container */}
          <div
            className="gallery-more-wrap scroll-reveal"
            id="galleryMoreWrap"
            style={{ display: filteredItems.length > 9 ? 'flex' : 'none' }}
          >
            <button className="btn-view-more" id="viewMoreBtn" onClick={toggleViewMore}>
              <span id="viewMoreText">{gallery.expanded ? 'Show less' : 'View more'}</span>
              <span className="btn-arrow-down" id="viewMoreArrow">{gallery.expanded ? '↑' : '↓'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ DIRECTORY ═══════════ */}
      <section className="directory-section" id="directory">
        <div className="directory-inner">
          <div className="section-label-row scroll-reveal">
            <span className="section-tag section-tag-light">DIRECTORY</span>
            <span className="directory-counter">SELECT PRODUCTIONS</span>
          </div>

          <div className="directory-table stagger-group">
            {DIRECTORY.map((row, i) => (
              <div
                className={`dir-row stagger-item stagger-delay-${(i % 4) + 1}`}
                key={`${row.client}`}
                data-preview={`/assets/${row.file}`}
                onClick={() => openSimpleLightbox(`/assets/${row.file}`)}
              >
                <span className="dir-year">{row.year}</span>
                <span className="dir-client">{row.client}</span>
                <span className="dir-role">{row.role}</span>
                <span className="dir-arrow">↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS SECTION (LIGHT BACKGROUND) ═══════════ */}
      <section className="process-section section-light" id="process">
        <div className="process-inner">
          <div className="process-intro scroll-reveal">
            <span className="section-tag section-tag-dark">PROCESS</span>
            <h2 className="process-headline">How I Design High-CTR Thumbnails</h2>
          </div>

          <div className="process-grid stagger-group">
            {PROCESS_STEPS.map((step, i) => (
              <div className={`process-step-card stagger-item stagger-delay-${i + 1}`} key={step.num}>
                <div className="step-num-badge">{step.num}</div>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS SECTION ═══════════ */}
      <section className="results-section" id="testimonials">
        <div className="results-inner">
          <div className="results-top-row scroll-reveal">
            <span className="section-tag section-tag-light">TESTIMONIALS</span>
            <h2 className="results-headline">Impact on Creator Channels</h2>
          </div>

          <div className="stats-counter-strip scroll-reveal">
            {COUNTERS.map((c) => (
              <div className="counter-box" key={c.label}>
                <span className="counter-big-val" data-target={c.target}>{c.value}</span>
                <span className="counter-label">{c.label}</span>
              </div>
            ))}
          </div>

          <div className="testimonials-deck stagger-group">
            {QUOTES.map((q, i) => (
              <div className={`quote-card stagger-item stagger-delay-${i + 1}`} key={q.name}>
                <p className="quote-body">{q.body}</p>
                <div className="quote-creator">
                  <div className="creator-avatar" style={{ background: '#252525' }}>
                    <img src={q.image} alt={q.name} />
                  </div>
                  <div className="creator-details">
                    <span className="creator-name">{q.name}</span>
                    <span className="creator-meta">{q.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT SECTION (LIGHT BACKGROUND) ═══════════ */}
      <section className="contact-section section-light" id="contact">
        <div className="contact-inner scroll-reveal">
          <span className="section-tag section-tag-dark">CONTACT</span>

          <h2 className="contact-huge-title scroll-reveal">
            <span className="contact-huge-line">{"LET'S WORK"}</span>
            <span className="contact-huge-line">TOGETHER.</span>
          </h2>

          <div className="contact-links-grid stagger-group">
            {CONTACT_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                className={`contact-card-link stagger-item stagger-delay-${i + 1}`}
              >
                <span className="link-label">{link.label}</span>
                <span className="link-address">{link.address}</span>
                <span className="link-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER (LIGHT BACKGROUND) ═══════════ */}
      <footer className="footer footer-light scroll-reveal">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-brand">THUMBNAIL DESIGNER</span>
            <span className="footer-motto">YouTube Thumbnail Design & Visual Strategy</span>
          </div>

          <div className="footer-links">
            <a href="#hero">Back to Top ↑</a>
            <a href="#featured">Featured</a>
            <a href="#gallery">Work</a>
            <a href="#process">Process</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            <a href="https://www.instagram.com/sharathdzns?cnvx=ZmlmN3V5MW04Zjk0" target="_blank" rel="noopener">Instagram</a>
            <a href="https://discord.com/users/849164250827063357" target="_blank" rel="noopener">Discord</a>
            <a href="https://x.com/shaxath07" target="_blank" rel="noopener">Twitter / X</a>
          </div>

          <div className="footer-bottom-line">
            <span>© 2024–2026 Thumbnail Designer. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* ═══════════ SIMPLE CLEAN IMAGE LIGHTBOX ═══════════ */}
      <div
        className={`simple-lightbox-modal${lightbox.open ? ' active' : ''}`}
        id="simpleLightbox"
        onClick={closeSimpleLightbox}
      >
        <button className="lightbox-close-btn" onClick={closeSimpleLightbox}>✕</button>
        <div className="simple-lightbox-content" onClick={(e) => e.stopPropagation()}>
          <img src={lightbox.src || undefined} alt="Thumbnail Full View" id="simpleLightboxImg" />
        </div>
      </div>
    </>
  );
}