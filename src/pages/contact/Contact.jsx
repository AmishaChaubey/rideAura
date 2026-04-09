import { useState, useEffect, useRef } from "react";
import {
  Car, Phone, Mail, MapPin, Clock, Send, ChevronDown,
  ChevronRight, ArrowRight, MessageSquare, CheckCircle,  Shield, Star,
  Navigation, Headphones, Building2
} from "lucide-react";

import { FaFacebookSquare,FaInstagramSquare,FaTwitterSquare ,FaYoutubeSquare  } from "react-icons/fa";

/* ── Brand tokens (same as main site) ─────────────────────── */
const G   = "#ffc107";
const D   = "#0e0e0e";
const W   = "#ffffff";
const BG  = "#f7f7f5";
const MID = "#111111";

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0; padding: 0;
  font-family: 'Poppins', sans-serif;
  background: ${BG}; color: ${D}; overflow-x: hidden;
}
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: ${D}; }
::-webkit-scrollbar-thumb { background: ${G}; }
a { text-decoration: none; color: inherit; }
.garamond { font-family: 'Cormorant Garamond', serif; }

/* ── Animations ───────────────────────────────────────────── */
@keyframes fadeUp   { from{opacity:0;transform:translateY(40px);}  to{opacity:1;transform:translateY(0);} }
@keyframes fadeIn   { from{opacity:0;}                              to{opacity:1;} }
@keyframes shimmer  { 0%{background-position:-400% center;}        100%{background-position:400% center;} }
@keyframes rotateSlow { from{transform:rotate(0);}                 to{transform:rotate(360deg);} }
@keyframes pulseRing  { 0%,100%{box-shadow:0 0 0 0 rgba(255,193,7,.55);} 70%{box-shadow:0 0 0 14px rgba(255,193,7,0);} }
@keyframes marquee    { from{transform:translateX(0);}             to{transform:translateX(-50%);} }
@keyframes borderGlow { 0%,100%{border-color:rgba(255,193,7,.25);} 50%{border-color:rgba(255,193,7,.7);} }
@keyframes slideRight { from{transform:scaleX(0);}                 to{transform:scaleX(1);} }
@keyframes float      { 0%,100%{transform:translateY(0);}          50%{transform:translateY(-10px);} }

.anim-fadeup  { animation: fadeUp    .9s cubic-bezier(.22,1,.36,1) both; }
.anim-fadein  { animation: fadeIn    .7s ease both; }
.anim-rotate  { animation: rotateSlow 24s linear infinite; }
.anim-float   { animation: float 5s ease-in-out infinite; }

.shimmer-gold {
  background: linear-gradient(90deg,#b8860b 0%,${G} 25%,#fff8dc 50%,${G} 75%,#b8860b 100%);
  background-size:300% auto;
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  animation: shimmer 5s linear infinite;
}

.label-tag {
  display:inline-flex; align-items:center; gap:10px;
  font-size:.72rem; letter-spacing:.25em; text-transform:uppercase;
  font-weight:600; color:${G}; font-family:'Poppins',sans-serif;
}
.label-tag::before { content:''; display:block; width:30px; height:1.5px; background:${G}; }

/* ── Navbar ──────────────────────────────────────────────── */
.nav-root {
  position:fixed; inset:0 0 auto 0; z-index:300;
  transition:all .5s cubic-bezier(.4,0,.2,1);
}
.nav-root.scrolled {
  background:rgba(7,7,7,.96);
  backdrop-filter:blur(32px) saturate(1.4);
  border-bottom:1px solid rgba(255,193,7,.08);
  box-shadow:0 4px 40px rgba(0,0,0,.4);
}
.nav-root::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,transparent,${G} 30%,#fff8dc 50%,${G} 70%,transparent);
  opacity:0; transition:opacity .5s;
}
.nav-root.scrolled::before { opacity:1; }
.nav-inner {
  max-width:1340px; margin:0 auto; padding:0 5%;
  height:80px; display:flex; align-items:center; justify-content:space-between;
}
.nav-logo { display:flex; align-items:center; gap:13px; cursor:pointer; }
.nav-logo-icon {
  width:46px; height:46px; border-radius:50%;
  background:linear-gradient(135deg,${G},#e6ac00);
  display:flex; align-items:center; justify-content:center;
  animation:pulseRing 2.8s infinite; flex-shrink:0;
}
.nav-logo-name { font-family:'Cormorant Garamond',serif; color:${W}; font-size:1.3rem; font-weight:700; display:block; }
.nav-logo-sub  {
  font-size:.52rem; letter-spacing:.28em; text-transform:uppercase; font-weight:700; display:block;
  background:linear-gradient(90deg,#b8860b,${G},#fff8dc,${G},#b8860b);
  background-size:300% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  animation:shimmer 5s linear infinite;
}
.nav-links { display:flex; align-items:center; gap:4px; }
.nav-link {
  font-family:'Poppins',sans-serif; font-size:.72rem; font-weight:500;
  letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.6);
  padding:10px 14px; background:transparent; border:none; cursor:pointer;
  transition:color .3s; text-decoration:none; white-space:nowrap;
}
.nav-link:hover, .nav-link.active { color:${G}; }
.nav-btn {
  background:${G}; color:${D}; border:none; cursor:pointer;
  font-family:'Poppins',sans-serif; font-weight:700; font-size:.72rem;
  letter-spacing:.1em; text-transform:uppercase;
  padding:11px 24px; border-radius:2px; position:relative; overflow:hidden;
  transition:all .35s;
}
.nav-btn:hover { box-shadow:0 8px 28px rgba(255,193,7,.4); transform:translateY(-2px); }

/* ── Hero Banner ─────────────────────────────────────────── */
.hero-banner {
  position:relative; width:100%; height:72vh; min-height:560px;
  overflow:hidden; background:${D};
}
.hero-img {
  position:absolute; inset:0; width:100%; height:100%;
  object-fit:cover; object-position:center 40%; opacity:.38;
}
.hero-overlay {
  position:absolute; inset:0;
  background:linear-gradient(160deg,rgba(7,7,7,.97) 0%,rgba(14,14,14,.75) 45%,rgba(14,14,14,.3) 100%);
}
.hero-dot-grid {
  position:absolute; inset:0;
  background-image:radial-gradient(rgba(255,193,7,.03) 1px,transparent 1px);
  background-size:40px 40px; pointer-events:none;
}
.hero-ring {
  position:absolute; border-radius:50%; pointer-events:none;
}
.hero-content {
  position:relative; z-index:2; height:100%;
  display:flex; flex-direction:column; justify-content:center;
  padding:0 7%; padding-top:80px; max-width:1340px; margin:0 auto;
}
.hero-breadcrumb {
  display:flex; align-items:center; gap:8px; margin-bottom:24px;
  font-family:'Poppins',sans-serif; font-size:.7rem;
  letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.35);
}
.hero-breadcrumb span.active { color:${G}; }
.hero-breadcrumb svg { opacity:.4; }
.hero-title {
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(3rem,6vw,5.8rem); font-weight:700; line-height:1.02;
  color:${W}; margin:0 0 20px;
}
.hero-subtitle {
  color:rgba(255,255,255,.45); font-size:.95rem; line-height:1.85;
  max-width:520px; font-family:'Poppins',sans-serif;
}
.hero-chips {
  display:flex; gap:12px; flex-wrap:wrap; margin-top:32px;
}
.hero-chip {
  display:flex; align-items:center; gap:7px;
  background:rgba(255,255,255,.05); border:1px solid rgba(255,193,7,.18);
  backdrop-filter:blur(12px); border-radius:30px;
  padding:7px 16px; font-family:'Poppins',sans-serif;
  font-size:.7rem; font-weight:500; color:rgba(255,255,255,.6);
  letter-spacing:.06em;
}
.hero-chip svg { flex-shrink:0; }

/* ── Contact Info Cards strip ────────────────────────────── */
.info-strip {
  background:${D}; padding:0 7%;
  border-bottom:1px solid rgba(255,193,7,.07);
}
.info-strip-inner {
  max-width:1280px; margin:0 auto;
  display:grid; grid-template-columns:repeat(4,1fr);
  gap:0;
}
.info-card {
  padding:36px 28px; border-right:1px solid rgba(255,193,7,.07);
  display:flex; align-items:flex-start; gap:16px;
  transition:background .3s; cursor:default;
}
.info-card:last-child { border-right:none; }
.info-card:hover { background:rgba(255,193,7,.03); }
.info-card-icon {
  width:48px; height:48px; flex-shrink:0;
  background:rgba(255,193,7,.07); border:1px solid rgba(255,193,7,.15);
  border-radius:4px; display:flex; align-items:center; justify-content:center;
  transition:all .35s;
}
.info-card:hover .info-card-icon { background:${G}; border-color:${G}; }
.info-card:hover .info-card-icon svg { color:${D} !important; }
.info-card-label {
  font-family:'Poppins',sans-serif; font-size:.62rem; font-weight:600;
  letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.3);
  margin-bottom:5px;
}
.info-card-val {
  font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:600;
  color:${W}; line-height:1.3;
}
.info-card-sub {
  font-family:'Poppins',sans-serif; font-size:.72rem;
  color:rgba(255,255,255,.3); margin-top:3px;
}

/* ── Main grid layout ────────────────────────────────────── */
.main-grid {
  max-width:1280px; margin:0 auto; padding:90px 7%;
  display:grid; grid-template-columns:1fr 1fr;
  gap:64px; align-items:start;
}

/* ── Contact Form ────────────────────────────────────────── */
.form-wrap {
  background:${W}; border-radius:6px;
  padding:52px 48px;
  box-shadow:0 8px 60px rgba(0,0,0,.08);
  position:relative; overflow:hidden;
}
.form-wrap::before {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:linear-gradient(90deg,${G},#fff8dc,${G});
}
.form-title {
  font-family:'Cormorant Garamond',serif;
  font-size:2.4rem; font-weight:700; color:${D};
  line-height:1.1; margin:0 0 6px;
}
.form-sub {
  color:#888; font-size:.83rem; line-height:1.75;
  font-family:'Poppins',sans-serif; margin-bottom:36px;
}
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.field-group { margin-bottom:22px; }
.field-label {
  display:block; font-family:'Poppins',sans-serif;
  font-size:.65rem; font-weight:600; letter-spacing:.18em;
  text-transform:uppercase; color:#999; margin-bottom:8px;
}
.field-input, .field-select, .field-textarea {
  width:100%; background:#fafafa; border:1.5px solid #ebebeb;
  border-radius:3px; color:${D}; font-family:'Poppins',sans-serif;
  font-size:.85rem; padding:13px 16px; outline:none;
  transition:border-color .3s, box-shadow .3s;
  appearance:none; -webkit-appearance:none;
}
.field-input:focus, .field-select:focus, .field-textarea:focus {
  border-color:${G}; box-shadow:0 0 0 3px rgba(255,193,7,.1);
  background:${W};
}
.field-input::placeholder, .field-textarea::placeholder { color:#bbb; }
.field-textarea { resize:vertical; min-height:130px; }
.field-select { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; background-color:#fafafa; cursor:pointer; }
.field-select option { font-family:'Poppins',sans-serif; }
.service-chips { display:flex; flex-wrap:wrap; gap:8px; }
.s-chip {
  padding:6px 14px; border-radius:20px; border:1.5px solid #e8e8e8;
  font-family:'Poppins',sans-serif; font-size:.72rem; font-weight:500;
  cursor:pointer; transition:all .25s; color:#888; background:transparent;
}
.s-chip:hover { border-color:${G}; color:${G}; }
.s-chip.active { background:${G}; border-color:${G}; color:${D}; font-weight:700; }
.submit-btn {
  width:100%; padding:16px; border-radius:3px; border:none; cursor:pointer;
  background:${G}; color:${D}; font-family:'Poppins',sans-serif;
  font-weight:700; font-size:.82rem; letter-spacing:.1em;
  text-transform:uppercase; position:relative; overflow:hidden;
  transition:all .35s; margin-top:8px; display:flex; align-items:center;
  justify-content:center; gap:10px;
}
.submit-btn::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);
  transform:translateX(-110%); transition:transform .5s;
}
.submit-btn:hover { box-shadow:0 10px 36px rgba(255,193,7,.45); transform:translateY(-2px); }
.submit-btn:hover::before { transform:translateX(110%); }
.submit-success {
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:16px; padding:40px 0; text-align:center;
}

/* ── Right column ────────────────────────────────────────── */
.right-col { display:flex; flex-direction:column; gap:32px; }

/* Map */
.map-wrap {
  border-radius:6px; overflow:hidden;
  box-shadow:0 8px 40px rgba(0,0,0,.12);
  position:relative;
}
.map-frame {
  width:100%; height:320px; border:none; display:block;
  filter:contrast(1.05) saturate(.9);
}
.map-overlay-badge {
  position:absolute; bottom:16px; left:16px;
  background:rgba(7,7,7,.92); backdrop-filter:blur(12px);
  border:1px solid rgba(255,193,7,.2); border-radius:4px;
  padding:10px 16px; display:flex; align-items:center; gap:10px;
}
.map-badge-label {
  font-family:'Poppins',sans-serif; font-size:.7rem;
  font-weight:600; color:${W}; letter-spacing:.05em;
}
.map-badge-sub {
  font-family:'Poppins',sans-serif; font-size:.63rem; color:rgba(255,255,255,.4);
  margin-top:1px;
}

/* Social */
.social-row {
  display:flex; gap:10px;
}
.social-btn {
  flex:1; display:flex; align-items:center; justify-content:center; gap:7px;
  padding:11px 10px; border-radius:3px; border:1.5px solid #e8e8e8;
  font-family:'Poppins',sans-serif; font-size:.7rem; font-weight:600;
  cursor:pointer; transition:all .3s; background:${W}; color:#888;
  letter-spacing:.04em;
}
.social-btn:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.1); }
.social-btn.ig:hover { border-color:#e1306c; color:#e1306c; }
.social-btn.tw:hover { border-color:#1da1f2; color:#1da1f2; }
.social-btn.fb:hover { border-color:#1877f2; color:#1877f2; }
.social-btn.yt:hover { border-color:#ff0000; color:#ff0000; }

/* Hours */
.hours-card {
  background:linear-gradient(170deg,#0f0c00,${D});
  border:1px solid rgba(255,193,7,.12); border-radius:6px;
  padding:30px 32px; overflow:hidden; position:relative;
}
.hours-card::after {
  content:''; position:absolute; top:-60px; right:-60px;
  width:180px; height:180px; border-radius:50%;
  background:radial-gradient(circle,rgba(255,193,7,.07),transparent 70%);
  pointer-events:none;
}
.hours-title {
  font-family:'Cormorant Garamond',serif;
  font-size:1.5rem; font-weight:700; color:${W}; margin-bottom:20px;
}
.hours-row {
  display:flex; justify-content:space-between; align-items:center;
  padding:10px 0; border-bottom:1px solid rgba(255,255,255,.05);
  font-family:'Poppins',sans-serif; font-size:.8rem;
}
.hours-row:last-child { border-bottom:none; }
.hours-day { color:rgba(255,255,255,.5); }
.hours-time { color:${G}; font-weight:600; }
.hours-badge {
  display:inline-flex; align-items:center; gap:5px;
  background:rgba(255,193,7,.1); border:1px solid rgba(255,193,7,.25);
  color:${G}; font-size:.6rem; font-weight:700; letter-spacing:.14em;
  text-transform:uppercase; padding:3px 10px; border-radius:20px;
  margin-top:16px;
}
.hours-badge::before {
  content:''; width:6px; height:6px; border-radius:50%;
  background:${G}; animation:pulseRing 2s infinite;
}

/* ── FAQ ─────────────────────────────────────────────────── */
.faq-section {
  background:${D}; padding:100px 7%; position:relative; overflow:hidden;
}
.faq-bg-glow {
  position:absolute; top:-200px; right:-200px; width:600px; height:600px;
  border-radius:50%; background:radial-gradient(circle,rgba(255,193,7,.05),transparent 65%);
  pointer-events:none;
}
.faq-bg-dots {
  position:absolute; inset:0;
  background-image:radial-gradient(rgba(255,193,7,.02) 1px,transparent 1px);
  background-size:38px 38px; pointer-events:none;
}
.faq-inner { max-width:1280px; margin:0 auto; position:relative; }
.faq-header {
  display:grid; grid-template-columns:1fr 1fr;
  gap:40px; align-items:end; margin-bottom:64px;
}
.faq-header-right {
  display:flex; flex-direction:column; justify-content:flex-end; gap:20px;
}
.faq-search {
  display:flex; align-items:center; gap:12px;
  background:rgba(255,255,255,.04); border:1.5px solid rgba(255,193,7,.2);
  border-radius:3px; padding:12px 18px;
  transition:border-color .3s;
}
.faq-search:focus-within { border-color:${G}; }
.faq-search input {
  flex:1; background:transparent; border:none; outline:none;
  color:${W}; font-family:'Poppins',sans-serif; font-size:.83rem;
}
.faq-search input::placeholder { color:rgba(255,255,255,.3); }
.faq-cats { display:flex; gap:8px; flex-wrap:wrap; }
.faq-cat {
  padding:6px 16px; border-radius:20px;
  border:1px solid rgba(255,193,7,.2); background:transparent;
  font-family:'Poppins',sans-serif; font-size:.68rem; font-weight:600;
  letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.4);
  cursor:pointer; transition:all .25s;
}
.faq-cat:hover, .faq-cat.active {
  background:${G}; border-color:${G}; color:${D};
}
.faq-grid {
  display:grid; grid-template-columns:1fr 1fr; gap:12px;
}
.faq-item {
  background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06);
  border-radius:4px; overflow:hidden;
  transition:border-color .3s, background .3s;
}
.faq-item.open {
  border-color:rgba(255,193,7,.25); background:rgba(255,193,7,.03);
}
.faq-q {
  width:100%; display:flex; align-items:center; justify-content:space-between;
  gap:14px; padding:20px 24px; background:transparent; border:none;
  cursor:pointer; text-align:left;
}
.faq-q-text {
  font-family:'Poppins',sans-serif; font-size:.84rem; font-weight:500;
  color:rgba(255,255,255,.75); line-height:1.5; flex:1;
  transition:color .3s;
}
.faq-item.open .faq-q-text { color:${W}; }
.faq-icon {
  width:28px; height:28px; flex-shrink:0; border-radius:50%;
  border:1px solid rgba(255,193,7,.2);
  display:flex; align-items:center; justify-content:center;
  transition:all .35s; background:transparent;
}
.faq-item.open .faq-icon {
  background:${G}; border-color:${G}; transform:rotate(180deg);
}
.faq-item.open .faq-icon svg { color:${D} !important; }
.faq-a {
  max-height:0; overflow:hidden;
  transition:max-height .4s cubic-bezier(.4,0,.2,1), padding .4s;
  padding:0 24px;
}
.faq-a-inner {
  padding-bottom:20px; font-family:'Poppins',sans-serif;
  font-size:.82rem; line-height:1.8; color:rgba(255,255,255,.45);
  border-top:1px solid rgba(255,255,255,.05); padding-top:16px;
}
.faq-item.open .faq-a { max-height:300px; }
.faq-cta {
  margin-top:52px; text-align:center;
  padding:40px; background:rgba(255,193,7,.04);
  border:1px solid rgba(255,193,7,.1); border-radius:6px;
}
.faq-cta-title {
  font-family:'Cormorant Garamond',serif;
  font-size:1.9rem; font-weight:700; color:${W}; margin-bottom:8px;
}
.faq-cta-sub {
  color:rgba(255,255,255,.4); font-size:.83rem; margin-bottom:24px;
  font-family:'Poppins',sans-serif;
}

/* ── Buttons ─────────────────────────────────────────────── */
.btn-gold {
  background:${G}; color:${D}; border:none; cursor:pointer;
  font-family:'Poppins',sans-serif; font-weight:700; letter-spacing:.08em;
  text-transform:uppercase; transition:all .35s; position:relative; overflow:hidden;
  display:inline-flex; align-items:center; gap:8px;
}
.btn-gold::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);
  transform:translateX(-110%); transition:transform .5s;
}
.btn-gold:hover { box-shadow:0 10px 36px rgba(255,193,7,.45); transform:translateY(-3px); }
.btn-gold:hover::before { transform:translateX(110%); }
.btn-outline {
  background:transparent; color:${W}; cursor:pointer;
  border:1.5px solid rgba(255,193,7,.35); font-family:'Poppins',sans-serif;
  font-weight:500; letter-spacing:.08em; text-transform:uppercase;
  transition:all .35s; display:inline-flex; align-items:center; gap:8px;
}
.btn-outline:hover { border-color:${G}; color:${G}; background:rgba(255,193,7,.06); transform:translateY(-2px); }

/* ── Responsive ──────────────────────────────────────────── */
@media(max-width:1024px){
  .main-grid { grid-template-columns:1fr; gap:40px; }
  .faq-header { grid-template-columns:1fr; gap:24px; }
  .faq-grid { grid-template-columns:1fr; }
  .info-strip-inner { grid-template-columns:1fr 1fr; }
  .info-card:nth-child(2) { border-right:none; }
  .info-card { border-bottom:1px solid rgba(255,193,7,.07); }
}
@media(max-width:700px){
  .hero-banner { height:85vh; min-height:500px; }
  .hero-title { font-size:2.8rem; }
  .main-grid { padding:60px 5%; }
  .form-wrap { padding:36px 28px; }
  .form-row { grid-template-columns:1fr; }
  .info-strip-inner { grid-template-columns:1fr; }
  .info-card { border-right:none; }
  .faq-section { padding:70px 5%; }
  .nav-links, .nav-phone { display:none !important; }
  .hero-chips { gap:8px; }
  .hero-chip span { display:none; }
  .social-row { flex-wrap:wrap; }
  .social-btn { min-width:calc(50% - 5px); }
}
`;

/* ── DATA ──────────────────────────────────────────────────── */
const INFO_CARDS = [
  { icon: Phone,       label: "Call Us",        val: "+91 9XXXXXXXXX",    sub: "Mon–Sun, 24 / 7",           color: "#22c55e" },
  { icon: Mail,        label: "Email Us",        val: "hello@carcab.in",   sub: "Reply within 2 hours",      color: "#3b82f6" },
  { icon: MapPin,      label: "Head Office",     val: "Connaught Place",   sub: "New Delhi, India – 110001",  color: G },
  { icon: Headphones,  label: "Support Center",  val: "Live Chat 24/7",    sub: "Avg response: 3 minutes",   color: "#a855f7" },
];

const SERVICES_OPTS = ["City Transfer","Airport Pickup","Corporate","Wedding","Outstation","Night Package","Tour Package","Other"];

const FAQS = [
  {
    cat:"Booking",
    q:"How do I book a ride with CarCab?",
    a:"You can book instantly via our website, mobile app, or by calling +91 9XXXXXXXXX. Fill in your pickup & drop details, choose a car class, and confirm — the entire process takes under 60 seconds."
  },
  {
    cat:"Booking",
    q:"Can I schedule a ride in advance?",
    a:"Absolutely. CarCab supports advance bookings up to 30 days ahead. Simply choose your travel date and time during booking. Your chauffeur will be assigned and confirmed 24 hours before your ride."
  },
  {
    cat:"Payment",
    q:"What payment methods are accepted?",
    a:"We accept all major credit/debit cards, UPI (GPay, PhonePe, Paytm), net banking, and cash. All digital payments go through a fully secured, PCI-DSS compliant gateway."
  },
  {
    cat:"Payment",
    q:"Are there any hidden charges or surge pricing?",
    a:"Never. CarCab operates on fully transparent pricing — the price you see at booking is the price you pay. We do not apply surge multipliers, fuel surcharges, or any hidden fees."
  },
  {
    cat:"Fleet",
    q:"What types of vehicles are available?",
    a:"Our fleet ranges from Economy Sedans and Premium MPVs (Toyota Innova) to Luxury SUVs (Mercedes GLE, BMW 5-series). All vehicles are less than 4 years old and maintained to hotel-grade cleanliness standards."
  },
  {
    cat:"Fleet",
    q:"Are your vehicles air-conditioned and sanitised?",
    a:"Yes — 100%. Every vehicle is fully air-conditioned and deep-cleaned before each trip. Premium and Elite class rides include complimentary chilled water, tissue packs, and in-car WiFi as standard."
  },
  {
    cat:"Safety",
    q:"How does CarCab ensure passenger safety?",
    a:"All chauffeurs undergo thorough background verification, defensive driving training, and periodic health checks. Every ride is GPS-tracked live. Our 24/7 safety helpline is just one tap away throughout your journey."
  },
  {
    cat:"Safety",
    q:"Can I share my live location with someone?",
    a:"Yes. From your booking confirmation page or app, tap 'Share Trip' to send a live-tracking link to any contact. They can monitor your entire journey in real time without needing a CarCab account."
  },
  {
    cat:"Tours",
    q:"Do you offer customised tour packages?",
    a:"Certainly! Our travel specialists design fully bespoke itineraries based on your duration, budget, and interests. Contact us via this page or call us to discuss. Custom packages are available for 1-day to 21-day journeys across India."
  },
  {
    cat:"Tours",
    q:"Are outstation and tour drivers experienced in long routes?",
    a:"Every outstation and tour chauffeur has a minimum of 5 years of intercity driving experience, deep knowledge of the assigned routes, and mandatory rest protocols to ensure safe, comfortable long-distance travel."
  },
];

const FAQ_CATS = ["All","Booking","Payment","Fleet","Safety","Tours"];

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════ */


/* Hero Banner */
function HeroBanner() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);
  return (
    <div className="hero-banner">
      <img
        className="hero-img"
        src="https://images.pexels.com/photos/11187484/pexels-photo-11187484.jpeg"
        alt="Contact CarCab"
      />
      <div className="hero-overlay" />
      <div className="hero-dot-grid" />

   
    

      <div style={{ maxWidth: 1340, margin: "0 auto", width: "100%" }}>
        <div className="hero-content" style={{ maxWidth: "none", padding: "0 7%", paddingTop: 80 }}>
          <div
            className="hero-breadcrumb"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(12px)", transition: "all .7s .1s" }}
          >
            <a href="#">Home</a>
            <ChevronRight size={11} />
            <span className="active">Contact Us</span>
          </div>

          <h1
            className="hero-title garamond"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(36px)", transition: "all 1s .25s cubic-bezier(.22,1,.36,1)" }}
          >
            Let's Get You<br />
            <span className="shimmer-gold">Moving</span>
          </h1>

          <p
            className="hero-subtitle"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all .9s .5s ease" }}
          >
            Our team is available 24 hours a day, 7 days a week. Whether you need a booking, have a question, or want a custom tour — we're here.
          </p>

          <div
            className="hero-chips"
            style={{ opacity: vis ? 1 : 0, transition: "all .9s .75s ease" }}
          >
            {[
              { icon: <Clock size={12} color={G} />, text: "24 / 7 Support" },
              { icon: <Shield size={12} color={G} />, text: "Verified Drivers" },
              { icon: <Star size={12} color={G} />, text: "5★ Rated Service" },
              { icon: <Navigation size={12} color={G} />, text: "15+ Cities" },
            ].map((c, i) => (
              <div key={i} className="hero-chip">
                {c.icon}
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Info Strip */
function InfoStrip() {
  return (
    <div className="info-strip">
      <div className="info-strip-inner">
        {INFO_CARDS.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="info-card">
              <div className="info-card-icon">
                <Icon size={20} color={G} />
              </div>
              <div>
                <div className="info-card-label">{c.label}</div>
                <div className="info-card-val">{c.val}</div>
                <div className="info-card-sub">{c.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Contact Form */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", service: "", message: "" });
  const [activeService, setActiveService] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1800);
  };

  if (submitted) {
    return (
      <div className="form-wrap">
        <div className="submit-success">
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(255,193,7,.1)", border: `2px solid ${G}`,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <CheckCircle size={36} color={G} />
          </div>
          <div>
            <div className="garamond" style={{ fontSize: "2rem", fontWeight: 700, color: D, marginBottom: 8 }}>
              Message Sent!
            </div>
            <div style={{ color: "#888", fontSize: ".85rem", lineHeight: 1.75, fontFamily: "'Poppins',sans-serif", maxWidth: 320, margin: "0 auto" }}>
              Thank you for reaching out. Our team will get back to you within 2 hours.
            </div>
          </div>
          <button className="btn-gold" style={{ padding: "12px 28px", borderRadius: 3, fontSize: ".76rem" }}
            onClick={() => setSubmitted(false)}>
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrap">
      <div className="label-tag" style={{ marginBottom: 14 }}>Send a Message</div>
      <div className="form-title garamond">Get in Touch</div>
      <div className="form-sub">Fill in the form below and we'll respond faster than you expect.</div>

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="form-row">
          <div className="field-group">
            <label className="field-label">Full Name *</label>
            <input className="field-input" type="text" placeholder="Arjun Mehta" required
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field-group">
            <label className="field-label">Email Address *</label>
            <input className="field-input" type="email" placeholder="you@example.com" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="field-group">
            <label className="field-label">Phone Number</label>
            <input className="field-input" type="tel" placeholder="+91 9XXXXXXXXX"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="field-group">
            <label className="field-label">Subject *</label>
            <select className="field-select" required
              value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
              <option value="">Select subject…</option>
              <option>New Booking</option>
              <option>Tour Package Enquiry</option>
              <option>Existing Booking Help</option>
              <option>Feedback / Complaint</option>
              <option>Corporate Account</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Service chips */}
        <div className="field-group">
          <label className="field-label">Service Interested In</label>
          <div className="service-chips">
            {SERVICES_OPTS.map(s => (
              <button key={s} type="button"
                className={`s-chip ${activeService === s ? "active" : ""}`}
                onClick={() => setActiveService(activeService === s ? null : s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="field-group">
          <label className="field-label">Your Message *</label>
          <textarea className="field-textarea" placeholder="Tell us about your travel requirements, dates, number of passengers…" required
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        </div>

        <button className="submit-btn" type="submit" disabled={sending}>
          {sending
            ? (<><span style={{ display: "inline-block", width: 16, height: 16, border: `2px solid ${D}`, borderTopColor: "transparent", borderRadius: "50%", animation: "rotateSlow .7s linear infinite" }} /> Sending…</>)
            : (<><Send size={15} /> Send Message</>)
          }
        </button>
      </form>
    </div>
  );
}

/* Map + Extras */
function RightColumn() {
  return (
    <div className="right-col">

      {/* Map */}
      <div>
        <div className="label-tag" style={{ marginBottom: 16 }}>Find Us</div>
        <div className="map-wrap">
          <iframe
            className="map-frame"
            title="CarCab Head Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9037835745!2d77.2177299!3d28.6326133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-overlay-badge">
            <div style={{ width: 32, height: 32, background: G, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MapPin size={15} color={D} />
            </div>
            <div>
              <div className="map-badge-label">CarCab Head Office</div>
              <div className="map-badge-sub">Connaught Place, New Delhi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="hours-card">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Clock size={16} color={G} />
          <div className="label-tag" style={{ color: G }}>Office Hours</div>
        </div>
        <div className="hours-title garamond">We're Always Open</div>
        {[
          { day: "Monday – Friday", time: "8:00 AM – 10:00 PM" },
          { day: "Saturday", time: "9:00 AM – 8:00 PM" },
          { day: "Sunday", time: "10:00 AM – 6:00 PM" },
          { day: "Ride Booking / Support", time: "24 Hours / 7 Days" },
        ].map((h, i) => (
          <div key={i} className="hours-row">
            <span className="hours-day">{h.day}</span>
            <span className="hours-time">{h.time}</span>
          </div>
        ))}
        <div className="hours-badge">
          Live Support Active
        </div>
      </div>

      {/* Social */}
      <div>
        <div className="label-tag" style={{ marginBottom: 16 }}>Follow Us</div>
        <div className="social-row">
          {[
            { Icon: FaInstagramSquare, label: "Instagram", cls: "ig" },
            { Icon: FaTwitterSquare ,   label: "Twitter",   cls: "tw" },
            { Icon: FaFacebookSquare,  label: "Facebook",  cls: "fb" },
            { Icon: FaYoutubeSquare ,   label: "YouTube",   cls: "yt" },
          ].map(({ Icon, label, cls }) => (
            <button key={label} className={`social-btn ${cls}`}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

/* FAQ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = FAQS.filter(f => {
    const matchCat = activeCat === "All" || f.cat === activeCat;
    const matchQ   = f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <section className="faq-section">
      <div className="faq-bg-glow" />
      <div className="faq-bg-dots" />

      <div className="faq-inner">
        <div className="faq-header">
          <div>
            <div className="label-tag">FAQ</div>
            <h2 className="garamond shimmer-gold" style={{ fontSize: "clamp(2.4rem,3.5vw,3.4rem)", fontWeight: 700, margin: "10px 0 0", lineHeight: 1.1 }}>
              Frequently Asked<br />Questions
            </h2>
          </div>
          <div className="faq-header-right">
            <div className="faq-search">
              <MessageSquare size={15} color="rgba(255,193,7,.5)" />
              <input
                placeholder="Search a question…"
                value={query}
                onChange={e => { setQuery(e.target.value); setOpenIdx(null); }}
              />
            </div>
            <div className="faq-cats">
              {FAQ_CATS.map(c => (
                <button key={c} className={`faq-cat ${activeCat === c ? "active" : ""}`}
                  onClick={() => { setActiveCat(c); setOpenIdx(null); }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="faq-grid">
          {filtered.map((f, i) => (
            <div key={i} className={`faq-item ${openIdx === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span className="faq-q-text">{f.q}</span>
                <div className="faq-icon">
                  <ChevronDown size={13} color={openIdx === i ? D : G} />
                </div>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "span 2", textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,.3)", fontFamily: "'Poppins',sans-serif", fontSize: ".85rem" }}>
              No questions match your search. Try a different keyword.
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="faq-cta">
          <div className="faq-cta-title garamond">Still have a question?</div>
          <div className="faq-cta-sub">Our support team is online 24/7 and happy to help you personally.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-gold" style={{ padding: "12px 28px", borderRadius: 3, fontSize: ".76rem" }}>
              <MessageSquare size={14} /> Live Chat Now
            </button>
            <button className="btn-outline" style={{ padding: "12px 28px", borderRadius: 3, fontSize: ".76rem" }}>
              <Phone size={14} /> Call Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page root ─────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <style>{CSS}</style>
     
      <HeroBanner />
      <InfoStrip />

      {/* Main grid */}
      <div style={{ background: BG }}>
        <div className="main-grid">
          <ContactForm />
          <RightColumn />
        </div>
      </div>

      <FAQ />
    </>
  );
}