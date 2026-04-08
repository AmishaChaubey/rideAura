import { useState, useEffect } from "react";
import {
  Car, Plane, Building2, Heart, MapPin, Moon, Phone,
  Star, ChevronLeft, ChevronRight, ArrowRight,
  Shield, Clock, Users, CheckCircle, Wifi, Coffee,
  Thermometer, Navigation, Quote, Play, Camera,
  Compass, Sunset, TreePine, Mountain, Waves, Menu, X
} from "lucide-react";

const G = "#ffc107";
const D = "#0e0e0e";
const W = "#ffffff";
const BG = "#f7f7f5";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');


  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; background: ${BG}; color: ${D}; overflow-x: hidden; }
  img { max-width: 100%; display: block; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${D}; }
  ::-webkit-scrollbar-thumb { background: ${G}; border-radius: 2px; }
  a { text-decoration: none; color: inherit; }
  .garamond { font-family: 'Cormorant Garamond', serif; }

  /* ── KEYFRAMES ── */
  @keyframes fadeUp    { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer   { 0%{background-position:-400% center} 100%{background-position:400% center} }
  @keyframes rotateSlow{ from{transform:rotate(0)} to{transform:rotate(360deg)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
  @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes cardReveal{ from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes progress-bar { from{width:0} to{width:var(--bar-w,60%)} }
  @keyframes floating-particles { 0%,100%{transform:translate(0,0);opacity:.25} 50%{transform:translate(5px,-8px);opacity:.7} }
  @keyframes badge-pop { 0%{transform:scale(.7);opacity:0} 60%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
  @keyframes glow-pulse{ 0%,100%{box-shadow:0 4px 16px rgba(255,193,7,.3)} 50%{box-shadow:0 4px 28px rgba(255,193,7,.65)} }
  @keyframes spin { to{transform:rotate(360deg)} }

  .anim-rotate { animation: rotateSlow 22s linear infinite; }
  .anim-scalein { animation: scaleIn .9s cubic-bezier(.22,1,.36,1) both; }

  .shimmer-gold {
    background: linear-gradient(90deg,#b8860b 0%,${G} 25%,#fff8dc 50%,${G} 75%,#b8860b 100%);
    background-size: 300% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: shimmer 5s linear infinite;
  }

  /* ═══════════════════════════════════════
     CUSTOM BUTTON — skew fill effect
  ═══════════════════════════════════════ */
  .btn {
    --color: ${G};
    --color2: ${D};
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: .72em 1.6em;
    background-color: transparent;
    border-radius: 6px;
    border: .3px solid var(--color);
    transition: color .5s, filter .2s, transform .2s;
    position: relative; overflow: hidden; cursor: pointer; z-index: 1;
    font-weight: 600; font-size: .8rem; letter-spacing: .1em;
    font-family: 'Poppins', 'Segoe UI', sans-serif;
    text-transform: uppercase; color: var(--color);
    white-space: nowrap; text-decoration: none;
  }
  .btn::after, .btn::before {
    content: ''; display: block; height: 100%; width: 100%;
    transform: skew(90deg) translate(-50%,-50%);
    position: absolute; inset: 50%; left: 25%; z-index: -1;
    transition: .5s ease-out; background-color: var(--color);
  }
  .btn::before {
    top: -50%; left: -25%;
    transform: skew(90deg) rotate(180deg) translate(-50%,-50%);
  }
  .btn:hover::before { transform: skew(45deg) rotate(180deg) translate(-50%,-50%); }
  .btn:hover::after  { transform: skew(45deg) translate(-50%,-50%); }
  .btn:hover  { color: var(--color2); }
  .btn:active { filter: brightness(.7); transform: scale(.98); }

  /* variant: white outline (dark bg) */
  .btn-white { --color: ${W}; --color2: ${D}; }

  /* variant: solid gold (filled by default) */
  .btn-solid {
    --color: ${G}; --color2: ${D};
    background: ${G}; color: ${D};
  }
  .btn-solid::after, .btn-solid::before { background: #fff; }
  .btn-solid:hover { color: ${D}; }

  /* sizes */
  .btn-sm { padding: .55em 1.2em; font-size: .72rem; }
  .btn-lg { padding: .9em 2em;    font-size: .88rem; }

  /* ── Ghost (for fleet nav) ── */
  .btn-ghost-nav {
    width: 44px; height: 44px; padding: 0; border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    background: none; border: 1px solid rgba(255,255,255,.15); cursor: pointer;
    color: ${W}; transition: border-color .3s, background .3s;
  }
  .btn-ghost-nav:hover { border-color: ${G}; background: rgba(255,193,7,.08); }
  .btn-ghost-nav.active { background: ${G}; border-color: ${G}; color: ${D}; }

  /* ── Icon round (testi nav) ── */
  .btn-round {
    width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(0,0,0,.14);
    background: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: border-color .3s, background .3s;
  }
  .btn-round:hover   { border-color: ${G}; }
  .btn-round.active  { background: ${G}; border-color: ${G}; color: ${D}; }

  /* ═══════════════════════════════════════
     LABEL TAG
  ═══════════════════════════════════════ */
  .label-tag {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: .68rem; letter-spacing: .25em; text-transform: uppercase;
    font-weight: 600; color: ${G}; font-family: 'Poppins', sans-serif;
  }
  .label-tag::before { content: ''; display: block; width: 28px; height: 1.5px; background: ${G}; }

  /* ═══════════════════════════════════════
     RIDE INPUT (hero bar)
  ═══════════════════════════════════════ */
  .ride-input {
    width: 100%; background: rgba(255,255,255,.06); border: none;
    border-bottom: 1.5px solid rgba(255,193,7,.3); color: ${W};
    font-family: 'Poppins', sans-serif; font-size: .85rem;
    padding: 10px 4px 8px; outline: none; transition: border-color .3s;
  }
  .ride-input::placeholder { color: rgba(255,255,255,.32); }
  .ride-input:focus        { border-bottom-color: ${G}; }
  .ride-input option       { background: #1a1a1a; }

  /* ═══════════════════════════════════════
     MARQUEE
  ═══════════════════════════════════════ */
  .marquee-inner { display: flex; width: max-content; animation: marquee 20s linear infinite; }
  .marquee-inner:hover { animation-play-state: paused; }

  /* ═══════════════════════════════════════
     SERVICE CARDS
  ═══════════════════════════════════════ */
  .svc-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 22px;
  }
  .svc-card {
    background: ${W}; border-radius: 8px; overflow: hidden;
    position: relative; cursor: pointer;
    transition: transform .45s cubic-bezier(.4,0,.2,1), box-shadow .45s;
    box-shadow: 0 2px 18px rgba(0,0,0,.06);
  }
  .svc-card:hover { transform: translateY(-10px); box-shadow: 0 28px 64px rgba(0,0,0,.13); }
  .svc-img-wrap  { position: relative; height: 260px; overflow: hidden; }
  .svc-img-wrap img { width:100%; height:100%; object-fit:cover; transition: transform .65s cubic-bezier(.4,0,.2,1); }
  .svc-card:hover .svc-img-wrap img { transform: scale(1.08); }
  .svc-overlay   { position:absolute;inset:0; background:linear-gradient(180deg,rgba(14,14,14,.1),rgba(14,14,14,.5)); transition:background .4s; }
  .svc-card:hover .svc-overlay { background:linear-gradient(180deg,rgba(14,14,14,.2),rgba(14,14,14,.65)); }
  .svc-icon-badge {
    position:absolute;top:14px;left:14px; width:42px;height:42px;
    background:${G}; border-radius:50%; display:flex;align-items:center;justify-content:center;
    box-shadow:0 4px 16px rgba(255,193,7,.4); transition:transform .35s;
  }
  .svc-card:hover .svc-icon-badge { transform:scale(1.12) rotate(-8deg); }
  .svc-num { position:absolute;top:14px;right:18px; font-family:'Cormorant Garamond',serif; font-size:3rem;font-weight:700;line-height:1; color:rgba(255,255,255,.12); }
  .svc-body { padding:22px 24px 26px; position:relative; }
  .svc-body::before { content:'';position:absolute;top:0;left:0;right:0;height:2px; background:linear-gradient(90deg,${G},transparent); transform:scaleX(0);transform-origin:left;transition:transform .4s ease; }
  .svc-card:hover .svc-body::before { transform:scaleX(1); }
  .svc-title { font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:${D};margin-bottom:7px; }
  .svc-desc  { color:#888;font-size:.82rem;line-height:1.78; }
  .svc-cta   { display:flex;align-items:center;gap:6px;margin-top:14px;font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(0,0,0,.2);transition:color .3s,gap .3s; }
  .svc-card:hover .svc-cta { color:${G};gap:10px; }

  /* ═══════════════════════════════════════
     HOW IT WORKS
  ═══════════════════════════════════════ */
  .how-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:28px;position:relative; }
  .how-line { position:absolute;top:26px;left:12.5%;right:12.5%;height:1px;background:linear-gradient(90deg,${G},rgba(255,193,7,.1),${G},rgba(255,193,7,.05));pointer-events:none; }
  .step-dot { width:52px;height:52px;border-radius:50%;background:rgba(255,193,7,.07);border:1.5px solid rgba(255,193,7,.25);display:flex;align-items:center;justify-content:center;margin:0 auto 20px; }

  /* ═══════════════════════════════════════
     STATS
  ═══════════════════════════════════════ */
  .stats-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:0; }
  .stat-block { text-align:center;padding:32px 16px; }
  .stat-block+.stat-block { border-left:1px solid rgba(255,193,7,.08); }
  .stat-icon-wrap { display:inline-flex;margin-bottom:14px;width:48px;height:48px;background:rgba(255,193,7,.07);border-radius:4px;align-items:center;justify-content:center; }
  .stat-val { font-family:'Cormorant Garamond',serif;background:linear-gradient(90deg,#b8860b,${G},#fff8dc,${G},#b8860b);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite;font-size:2.7rem;font-weight:700;line-height:1; }
  .stat-label { color:rgba(255,255,255,.38);font-size:.68rem;letter-spacing:.07em;font-family:'Poppins',sans-serif;margin-top:4px; }

  /* ═══════════════════════════════════════
     FLEET
  ═══════════════════════════════════════ */
  .fleet-grid { display:grid;grid-template-columns:1fr 1fr;background:${D};border-radius:6px;overflow:hidden;min-height:420px; }
  .fleet-thumbs { display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-top:5px; }

  /* ═══════════════════════════════════════
     PACKAGES
  ═══════════════════════════════════════ */
  .pkg-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:0;max-width:980px;margin:0 auto;align-items:stretch; }
  .pkg-card { overflow:hidden;transition:all .4s cubic-bezier(.4,0,.2,1);position:relative; }
  .pkg-card:hover { transform:translateY(-8px);box-shadow:0 24px 60px rgba(0,0,0,.22); }

  /* ═══════════════════════════════════════
     TOURS (PREMIUM)
  ═══════════════════════════════════════ */
  .tours-section { background:${D};padding:90px 5%;position:relative;overflow:hidden; }
  .tours-section::before { content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,193,7,.02) 1px,transparent 1px);background-size:40px 40px;pointer-events:none; }
  .tours-glow  { position:absolute;top:-200px;right:-200px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(255,193,7,.055) 0%,transparent 65%);pointer-events:none; }
  .tours-glow2 { position:absolute;bottom:-200px;left:-160px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(255,193,7,.035) 0%,transparent 65%);pointer-events:none; }

  .tours-row1 { display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:14px; }
  .tours-row2 { display:grid;grid-template-columns:repeat(3,1fr);gap:14px; }

  /* card base */
  .tour-card {
    position:relative;border-radius:12px;overflow:hidden;cursor:pointer;background:#111;
    isolation:isolate;animation:cardReveal .7s cubic-bezier(.22,1,.36,1) both;
    transition:transform .55s cubic-bezier(.34,1.1,.64,1),box-shadow .55s cubic-bezier(.4,0,.2,1);
  }
  .tour-card:hover {
    transform:translateY(-16px) scale(1.02);
    box-shadow:0 48px 90px rgba(0,0,0,.7),0 0 0 1px rgba(255,193,7,.22),0 0 28px rgba(255,193,7,.07);
    z-index:10;
  }
  .tour-img { width:100%;height:100%;object-fit:cover;display:block;transition:transform .75s cubic-bezier(.4,0,.2,1),filter .6s ease;will-change:transform; }
  .tour-card:hover .tour-img { transform:scale(1.1);filter:brightness(.7) saturate(1.15); }

  .tour-overlay { position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.04) 0%,rgba(0,0,0,.18) 35%,rgba(0,0,0,.62) 65%,rgba(0,0,0,.92) 100%);transition:background .5s ease; }
  .tour-card:hover .tour-overlay { background:linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.3) 35%,rgba(0,0,0,.75) 65%,rgba(0,0,0,.97) 100%); }

  /* gold sweep */
  .tour-accent { position:absolute;bottom:0;left:0;height:2.5px;width:0;background:linear-gradient(90deg,${G},rgba(255,193,7,.25));transition:width .55s cubic-bezier(.4,0,.2,1);z-index:5; }
  .tour-card:hover .tour-accent { width:100%; }

  /* badge */
  .tour-badge { position:absolute;top:13px;left:13px;background:rgba(10,10,10,.55);border:1px solid rgba(255,193,7,.4);backdrop-filter:blur(12px);color:${G};font-family:'Poppins',sans-serif;font-size:.56rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:5px 10px;border-radius:100px;animation:badge-pop .4s cubic-bezier(.34,1.56,.64,1) .3s both;transition:background .3s,border-color .3s;z-index:4; }
  .tour-card:hover .tour-badge { background:rgba(255,193,7,.15);border-color:rgba(255,193,7,.7); }

  /* arrow */
  .tour-arrow { position:absolute;top:13px;right:13px;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;opacity:0;transform:translate(6px,-6px) rotate(-45deg);transition:opacity .35s ease,transform .4s cubic-bezier(.34,1.56,.64,1),background .3s,border-color .3s;color:${W};z-index:4; }
  .tour-card:hover .tour-arrow { opacity:1;transform:translate(0,0) rotate(0deg); }

  /* particles */
  .tour-particle { position:absolute;width:4px;height:4px;border-radius:50%;background:${G};opacity:0;pointer-events:none;transition:opacity .3s;z-index:3; }
  .tour-card:hover .tour-particle { opacity:1; }
  .tp1 { top:30%;left:15%;animation:floating-particles 3s ease-in-out infinite; }
  .tp2 { top:22%;right:20%;animation:floating-particles 3.5s ease-in-out .5s infinite; }
  .tp3 { bottom:38%;left:24%;animation:floating-particles 2.8s ease-in-out 1s infinite; }

  /* content */
  .tour-content { position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:18px;pointer-events:none;z-index:4; }
  .tour-category { font-family:'Poppins',sans-serif;font-size:.57rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:${G};margin-bottom:4px;opacity:.9;transform:translateY(4px);transition:transform .4s ease; }
  .tour-card:hover .tour-category { transform:translateY(0); }
  .tour-name { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:${W};line-height:1.1;margin-bottom:5px;transition:transform .4s ease; }
  .tour-card:hover .tour-name { transform:translateY(-2px); }
  .tour-card.featured .tour-name { font-size:2rem; }
  .tour-card.wide .tour-name { font-size:1.2rem; }
  .tour-meta { display:flex;align-items:center;gap:8px;font-family:'Poppins',sans-serif;font-size:.66rem;color:rgba(255,255,255,.5);margin-bottom:9px;transition:color .3s; }
  .tour-card:hover .tour-meta { color:rgba(255,255,255,.7); }
  .tour-meta-dot { width:3px;height:3px;border-radius:50%;background:rgba(255,193,7,.5); }
  .tour-rating { display:flex;align-items:center;gap:3px;color:${G};font-weight:600; }

  /* progress */
  .tour-progress { height:2px;background:rgba(255,255,255,.1);border-radius:2px;margin-bottom:9px;overflow:hidden;opacity:0;transition:opacity .3s .1s; }
  .tour-card:hover .tour-progress { opacity:1; }
  .tour-progress-fill { height:100%;background:linear-gradient(90deg,${G},rgba(255,193,7,.4));border-radius:2px;width:0; }
  .tour-card:hover .tour-progress-fill { animation:progress-bar .7s ease .2s both; }

  /* price */
  .tour-price { display:inline-flex;align-items:baseline;gap:3px;align-self:flex-start;background:${G};color:${D};font-family:'Poppins',sans-serif;font-weight:700;font-size:.7rem;padding:5px 12px;border-radius:4px;letter-spacing:.04em;opacity:0;transform:translateY(10px);transition:opacity .4s ease .05s,transform .4s cubic-bezier(.34,1.2,.64,1) .05s;animation:glow-pulse 2.5s ease-in-out infinite;pointer-events:none; }
  .tour-card:hover .tour-price { opacity:1;transform:translateY(0); }

  /* sizing */
  .tour-card.featured { min-height:460px;grid-column:span 2; }
  .tour-card.tall { aspect-ratio:3/4; }
  .tour-card.wide { aspect-ratio:16/9; }

  /* ═══════════════════════════════════════
     TESTIMONIALS
  ═══════════════════════════════════════ */
  .testi-card { background:${W};border-radius:6px;position:relative;overflow:hidden;transition:all .4s ease;box-shadow:0 4px 28px rgba(0,0,0,.06); }
  .testi-card:hover { transform:translateY(-5px);box-shadow:0 18px 56px rgba(0,0,0,.12); }
  .testi-card::after { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${G},transparent); }
  .testi-grid { display:grid;grid-template-columns:5fr 4fr;gap:18px; }

  /* ═══════════════════════════════════════
     SPLIT BANNER
  ═══════════════════════════════════════ */
  .split-banner { display:grid;grid-template-columns:1fr 1fr; }

  /* ═══════════════════════════════════════
     RESPONSIVE — single source of truth
  ═══════════════════════════════════════ */

  /* ── 1200px ── */
  @media(max-width:1200px){
    .tours-row1 { grid-template-columns:repeat(3,1fr); }
    .tour-card.featured { grid-column:span 2; }
    .tours-row2 { grid-template-columns:repeat(2,1fr); }
    .stats-grid { grid-template-columns:repeat(2,1fr); }
    .stat-block+.stat-block:nth-child(3) { border-left:none; }
    .stat-block:nth-child(3),.stat-block:nth-child(4) { border-top:1px solid rgba(255,193,7,.08); }
  }

  /* ── 1024px ── */
  @media(max-width:1024px){
    .svc-grid { grid-template-columns:repeat(2,1fr); }
    .how-grid { grid-template-columns:repeat(2,1fr); gap:36px; }
    .how-line { display:none; }
    .fleet-grid { grid-template-columns:1fr; }
    .fleet-img { height:320px; }
    .fleet-thumbs { grid-template-columns:repeat(4,1fr); }
    .pkg-grid { grid-template-columns:1fr; max-width:440px; }
    .pkg-card.pkg-featured { transform:none !important; }
    .testi-grid { grid-template-columns:1fr; }
    .split-banner { grid-template-columns:1fr; }
    .tours-row1 { grid-template-columns:repeat(2,1fr); }
    .tour-card.featured { grid-column:span 2;min-height:360px; }
    .tour-card.tall { aspect-ratio:4/3; }
    .tours-row2 { grid-template-columns:repeat(2,1fr); }
    .hero-booking { flex-direction:column; }
    .hero-booking-field { min-width:100% !important; flex:none !important; }
  }

  /* ── 768px ── */
  @media(max-width:768px){
    .svc-grid { grid-template-columns:1fr; }
    .svc-img-wrap { height:180px; }
    .how-grid { grid-template-columns:1fr 1fr; gap:28px; }
    .stats-grid { grid-template-columns:repeat(2,1fr); }
    .stat-block+.stat-block:nth-child(2) { border-left:1px solid rgba(255,193,7,.08); }
    .stat-block:nth-child(odd) { border-left:none !important; }
    .stat-block:nth-child(3),.stat-block:nth-child(4) { border-top:1px solid rgba(255,193,7,.08); }
    .fleet-thumbs { grid-template-columns:repeat(2,1fr); }
    .tours-row1 { grid-template-columns:1fr; }
    .tour-card.featured { grid-column:span 1;min-height:300px; }
    .tour-card.featured .tour-name { font-size:1.6rem; }
    .tours-row2 { grid-template-columns:1fr; }
    .tour-stat-card { display:none; }
    .split-banner { grid-template-columns:1fr; }
    .split-item { height:300px !important; }
    .testi-grid { grid-template-columns:1fr; }
    .hero-bottom-bar { padding:16px 4% !important; }
    section, .tours-section { padding:70px 4% !important; }
  }

  /* ── 480px ── */
  @media(max-width:480px){
    .how-grid { grid-template-columns:1fr; }
    .stats-grid { grid-template-columns:1fr 1fr; }
    .fleet-thumbs { grid-template-columns:repeat(2,1fr); }
    .hero-stats-row { gap:20px !important; }
    .hero-buttons { flex-direction:column; gap:10px !important; align-items:flex-start; }
    .pkg-grid { max-width:100%; }
    .hero-title { font-size:clamp(2.6rem,10vw,4rem) !important; }
    .cta-title { font-size:clamp(2rem,8vw,3.2rem) !important; }
  }
`;

/* DATA */
const SERVICES = [
  { icon: Car,       title: "City Transfers",    desc: "Smooth on-time rides across the city — day or night. Comfort guaranteed every trip.",         img: "https://i.pinimg.com/736x/1d/1c/95/1d1c9548a787dbf89974fc4e957d5a13.jpg" },
  { icon: Plane,     title: "Airport Pickup",    desc: "Flight tracking & meet-and-greet inside the terminal. Zero stress, premium arrival.",          img: "https://i.pinimg.com/736x/91/bc/78/91bc7822550019ea278387aebfe4b1ff.jpg" },
  { icon: Building2, title: "Corporate Travel",  desc: "Dedicated accounts for executives. Punctual, professional, and discreet every time.",          img: "https://i.pinimg.com/1200x/44/0a/c7/440ac7dd5649bb1fc0ed21782cc379d7.jpg" },
  { icon: Heart,     title: "Weddings & Events", desc: "Decorated fleets, suited chauffeurs — make every moment of your special day extraordinary.",   img: "https://i.pinimg.com/1200x/6c/e2/1b/6ce21be23ec02425738895164b48ddb6.jpg" },
  { icon: MapPin,    title: "Outstation Trips",  desc: "Comfortable long-distance journeys with experienced drivers who know every route.",            img: "https://i.pinimg.com/1200x/fb/c2/7b/fbc27b6aba54905b42c2222b858ca885.jpg" },
  { icon: Moon,      title: "Night Packages",    desc: "Safe, discreet after-hours transportation. Available around the clock, 365 days a year.",      img: "https://i.pinimg.com/736x/a0/85/24/a08524717bfae9834cc828bddcbaa021.jpg" },
];

const TOURS = [
  { name:"Rajasthan Royal Trail", category:"Heritage & Culture", badge:"Most Popular", days:"7 Days", cities:"5 Cities", price:"From ₹18,999", img:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&q=85", barW:"70%", rating:"4.9" },
  { name:"Kerala Backwaters",     category:"Nature & Wellness",  badge:"Scenic",       days:"5 Days", cities:"3 Cities", price:"From ₹14,499", img:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=700&q=85", barW:"55%", rating:"4.8" },
  { name:"Himalayan Escape",      category:"Adventure",          badge:"Adventure",    days:"6 Days", cities:"4 Cities", price:"From ₹16,999", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=85", barW:"65%", rating:"4.9" },
  { name:"Golden Triangle",       category:"Heritage",           badge:"Classic",      days:"4 Days", cities:"3 Cities", price:"From ₹11,999", img:"https://images.unsplash.com/photo-1564507592333-c60657eea523?w=700&q=85", barW:"48%", rating:"4.7" },
  { name:"Goa Coastal Drive",     category:"Beach & Leisure",    badge:"Trending",     days:"4 Days", cities:"2 Cities", price:"From ₹9,999",  img:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=85", barW:"80%", rating:"4.8" },
  { name:" Rishikesh",   category:"Nature & Serene",    badge:"Hidden Gem",   days:"3 Days", cities:"2 Cities", price:"From ₹8,499",  img:"https://images.pexels.com/photos/36123978/pexels-photo-36123978.jpeg", barW:"42%", rating:"4.7" },
];

const FLEET = [
  { name:"Toyota Innova Crysta", type:"Premium MPV",   seats:7, tag:"Most Booked", img:"https://i.pinimg.com/736x/46/4e/08/464e08b9c387af5dbf513419727b3ea5.jpg", feats:[Wifi,Coffee,Thermometer,Shield] },
  { name:"Honda City Sedan",     type:"Comfort Sedan", seats:4, tag:"Best Value",  img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=85", feats:[Wifi,Shield,Navigation,Clock] },
  { name:"Mercedes GLE",         type:"Luxury SUV",    seats:5, tag:"Elite Class", img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=85", feats:[Wifi,Coffee,Thermometer,Shield] },
  { name:"Toyota Fortuner",      type:"Executive SUV", seats:6, tag:"Top Pick",    img:"https://i.pinimg.com/1200x/31/3e/d8/313ed8d63ee2ce94919a506e120fd024.jpg", feats:[Wifi,Coffee,Navigation,Shield] },
];

const PACKAGES = [
  { name:"Economy", price:"₹299",   unit:"/trip", desc:"Perfect for everyday city commutes",   img:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=700&q=80", dark:false, badge:null,         features:["Sedan / Hatchback","Up to 4 Passengers","City Limits Only","Air Conditioning","Professional Driver","Basic Support"] },
  { name:"Premium", price:"₹799",   unit:"/trip", desc:"Comfort, speed & priority service",    img:"https://images.unsplash.com/photo-1563720223185-11003d516935?w=700&q=80", dark:true,  badge:"Most Popular", features:["Luxury SUV / MPV","Up to 6 Passengers","Intercity Transfers","Complimentary Water & WiFi","Flight Tracking","24/7 Priority Support"] },
  { name:"Elite",   price:"₹1,499", unit:"/trip", desc:"Unrivalled luxury for the discerning", img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=700&q=80", dark:false, badge:null,         features:["Mercedes / BMW","Up to 4 Passengers","Pan India Travel","Meet & Greet Service","Personal Concierge 24/7","Champagne on Arrival"] },
];

const REVIEWS = [
  { name:"Arjun Mehta",  role:"CEO, FinEdge India",    stars:5, img:"https://i.pinimg.com/736x/50/a0/5d/50a05deaf757c7cb56864650aeb9a91b.jpg",   text:"Absolutely flawless from booking to drop-off. The chauffeur was early, the car immaculate. CarCab has permanently replaced every other service for our executive travel." },
  { name:"Priya Sharma", role:"Frequent Flyer, Delhi", stars:5, img:"https://i.pinimg.com/736x/32/a7/99/32a7993dcecb6362112b938b84519a30.jpg", text:"3 AM airport pickup at Terminal 2 and they were waiting 15 minutes before I landed! The driver tracked my flight. Phenomenal reliability, five stars isn't enough." },
  { name:"Rahul Verma",  role:"Wedding Client",        stars:5, img:"https://i.pinimg.com/736x/4a/c5/53/4ac5530d5f927c5cbfd35f74cfbf2dab.jpg",   text:"They arranged our entire wedding fleet — five decorated cars, all suited chauffeurs, perfectly timed. Our guests were blown away. Truly unforgettable service." },
  { name:"Sanya Kapoor", role:"Travel Blogger",        stars:5, img:"https://i.pinimg.com/736x/65/aa/54/65aa543e2e2f82c6279ae610fb7cfff1.jpg", text:"I've used luxury cabs across 20 cities. CarCab is genuinely a cut above. The in-car experience — chilled water, clean interiors — consistently five-star every time." },
];

const STATS = [
  { val:"50K+", label:"Happy Riders",      icon:Users  },
  { val:"200+", label:"Expert Chauffeurs", icon:Shield },
  { val:"15+",  label:"Cities Covered",    icon:MapPin },
  { val:"99%",  label:"On-Time Rate",      icon:Clock  },
];

const HOW = [
  { n:"01", title:"Choose Your Ride",  desc:"Pick car type, enter pickup & destination — takes under 60 seconds." },
  { n:"02", title:"Confirm & Pay",     desc:"Transparent pricing, zero surge. Pay via card, UPI or cash. Fully secure." },
  { n:"03", title:"Track Live",        desc:"Watch your chauffeur on a real-time map. ETA always accurate." },
  { n:"04", title:"Arrive in Comfort", desc:"Sit back and experience premium comfort all the way to your destination." },
];

const BRANDS = ["Mercedes-Benz","Toyota","Honda","Audi","BMW","Hyundai","Skoda","Kia","Volvo","Lexus"];

function Stars({ n = 5 }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {Array.from({ length:n }).map((_,i) => <Star key={i} size={11} fill={G} color={G}/>)}
    </div>
  );
}

/* ═══════════════════════════════════════
   TOUR CARD (reusable)
═══════════════════════════════════════ */
function TourCard({ t, className="", style={} }) {
  return (
    <div className={`tour-card ${className}`} style={style}>
      <img className="tour-img" src={t.img} alt={t.name}/>
      <div className="tour-overlay"/>
      <div className="tour-particle tp1"/>
      <div className="tour-particle tp2"/>
      <div className="tour-particle tp3"/>
      {t.badge && <div className="tour-badge">{t.badge}</div>}
      <div className="tour-arrow"><ArrowRight size={12}/></div>
      <div className="tour-accent"/>
      <div className="tour-content">
        <div className="tour-category">{t.category}</div>
        <div className="tour-name">{t.name}</div>
        <div className="tour-meta">
          <span>{t.days}</span>
          <div className="tour-meta-dot"/>
          <span>{t.cities}</span>
          {t.rating && (
            <>
              <div className="tour-meta-dot"/>
              <div className="tour-rating">
                <Star size={8} fill={G} color={G}/> {t.rating}
              </div>
            </>
          )}
        </div>
        <div className="tour-progress">
          <div className="tour-progress-fill" style={{"--bar-w": t.barW}}/>
        </div>
        <div className="tour-price">{t.price}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function Hero() {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 120); }, []);
  return (
    <section style={{ position:"relative", height:"100vh", minHeight:640, overflow:"hidden", background:D }}>
      <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=90" alt="hero"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.8 }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(110deg,rgba(14,14,14,.96) 0%,rgba(14,14,14,.65) 55%,rgba(14,14,14,.2) 100%)" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(rgba(255,193,7,.03) 1px,transparent 1px)`, backgroundSize:"44px 44px", pointerEvents:"none" }}/>

      <div style={{ position:"relative", zIndex:2, height:"100%", display:"flex", alignItems:"center", padding:"0 5%", paddingTop:80 }}>
        <div style={{ maxWidth:700, width:"100%" }}>
          <div className="label-tag" style={{ opacity:v?1:0, transition:"opacity .7s .1s" }}>Premium Chauffeur Service</div>
          <h1 className="garamond hero-title"
            style={{ fontSize:"clamp(2.8rem,6vw,6rem)", fontWeight:700, lineHeight:1.02, marginTop:16, color:W,
              opacity:v?1:0, transform:v?"none":"translateY(40px)", transition:"all 1s .3s cubic-bezier(.22,1,.36,1)" }}>
            Arrive in <span className="shimmer-gold">Absolute</span><br/>
            <em style={{ fontStyle:"italic", fontWeight:300 }}>Luxury &amp; Style</em>
          </h1>
          <p style={{ color:"rgba(255,255,255,.5)", fontSize:"clamp(.84rem,1.5vw,.97rem)", lineHeight:1.9, maxWidth:440, marginTop:20,
            opacity:v?1:0, transform:v?"none":"translateY(20px)", transition:"all .9s .55s ease" }}>
            CarCab redefines premium travel across India. Immaculate vehicles, professional chauffeurs, and punctuality you can bank on — every single ride.
          </p>
          <div className="hero-buttons" style={{ display:"flex", gap:14, marginTop:34, flexWrap:"wrap", opacity:v?1:0, transition:"all .9s .75s ease" }}>
            <button className="btn btn-lg" style={{"--color":G,"--color2":D}}>Book Your Ride</button>
            <button className="btn btn-white btn-lg" style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Play size={11} fill={W} color={W}/> Watch Story
            </button>
          </div>
          <div className="hero-stats-row" style={{ display:"flex", gap:36, marginTop:48, flexWrap:"wrap", opacity:v?1:0, transition:"all .9s 1s ease" }}>
            {STATS.slice(0,3).map((s,i) => (
              <div key={i}>
                <div className="garamond shimmer-gold" style={{ fontSize:"2rem", fontWeight:700 }}>{s.val}</div>
                <div style={{ color:"rgba(255,255,255,.38)", fontSize:".66rem", letterSpacing:".05em", fontFamily:"'Poppins',sans-serif", marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking bar */}
      <div className="hero-bottom-bar" style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:5, background:"rgba(10,10,10,.92)", backdropFilter:"blur(24px)", borderTop:"1px solid rgba(255,193,7,.1)", padding:"18px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="hero-booking" style={{ display:"flex", gap:16, alignItems:"flex-end", flexWrap:"wrap" }}>
            {[{l:"Pickup Location",ph:"Enter pickup address",t:"text"},{l:"Destination",ph:"Where are you headed?",t:"text"},{l:"Date",ph:"",t:"date"}].map((f,i) => (
              <div key={i} className="hero-booking-field" style={{ flex:1, minWidth:150 }}>
                <div style={{ color:G, fontSize:".58rem", letterSpacing:".2em", textTransform:"uppercase", fontFamily:"'Poppins',sans-serif", fontWeight:600, marginBottom:5 }}>{f.l}</div>
                <input className="ride-input" type={f.t} placeholder={f.ph}/>
              </div>
            ))}
            <div className="hero-booking-field" style={{ flex:1, minWidth:130 }}>
              <div style={{ color:G, fontSize:".58rem", letterSpacing:".2em", textTransform:"uppercase", fontFamily:"'Poppins',sans-serif", fontWeight:600, marginBottom:5 }}>Car Class</div>
              <select className="ride-input"><option>Economy</option><option>Premium</option><option>Elite</option></select>
            </div>
            <button className="btn" style={{"--color":G,"--color2":D, flexShrink:0, display:"flex", alignItems:"center", gap:7}}>
              Search <ArrowRight size={13}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MARQUEE
═══════════════════════════════════════ */
function Marquee() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <div style={{ background:G, padding:"12px 0", overflow:"hidden" }}>
      <div className="marquee-inner">
        {items.map((b,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:20, padding:"0 24px", flexShrink:0 }}>
            <Car size={13} color={D}/>
            <span style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:".74rem", letterSpacing:".14em", textTransform:"uppercase", color:D, whiteSpace:"nowrap" }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SERVICES
═══════════════════════════════════════ */
function Services() {
  return (
    <section style={{ background:BG, padding:"90px 5%" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16, marginBottom:48 }}>
          <div>
            <div className="label-tag">What We Offer</div>
            <h2 className="garamond" style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, color:D, lineHeight:1.1, marginTop:10 }}>
              Premium Services<br/><em style={{ fontWeight:300, fontStyle:"italic", color:"#888" }}>Tailored for You</em>
            </h2>
          </div>
          <div style={{ maxWidth:360 }}>
            <p style={{ color:"#888", fontSize:".86rem", lineHeight:1.85, margin:0 }}>
              From daily commutes to weddings and corporate journeys — we cover every trip with the same uncompromising standard of excellence.
            </p>
            <button className="btn btn-sm" style={{"--color":D,"--color2":W, marginTop:14, display:"inline-flex", alignItems:"center", gap:6}}>
              View All <ArrowRight size={12}/>
            </button>
          </div>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s,i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="svc-card">
                <div className="svc-img-wrap">
                  <img src={s.img} alt={s.title}/>
                  <div className="svc-overlay"/>
                  <div className="svc-num">{String(i+1).padStart(2,"0")}</div>
                </div>
                <div className="svc-body">
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-desc">{s.desc}</div>
                  <div className="svc-cta">Explore Service <ArrowRight size={11}/></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════ */
function HowItWorks() {
  return (
    <section style={{ background:D, padding:"90px 5%", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-120, right:-120, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,193,7,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(rgba(255,193,7,.025) 1px,transparent 1px)`, backgroundSize:"40px 40px", pointerEvents:"none" }}/>
      <div style={{ maxWidth:1280, margin:"0 auto", position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div className="label-tag" style={{ justifyContent:"center" }}>How It Works</div>
          <h2 className="garamond" style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, color:W, marginTop:10 }}>
            Your Ride in <span className="shimmer-gold">4 Simple Steps</span>
          </h2>
        </div>
        <div className="how-grid">
          <div className="how-line"/>
          {HOW.map((h,i) => (
            <div key={i} style={{ textAlign:"center", animation:`fadeUp .8s ease ${i*.15}s both`, position:"relative" }}>
              <div className="step-dot">
                <span className="garamond shimmer-gold" style={{ fontSize:"1.2rem", fontWeight:700 }}>{h.n}</span>
              </div>
              <h3 className="garamond" style={{ fontSize:"1.15rem", fontWeight:700, color:W, marginBottom:9 }}>{h.title}</h3>
              <p style={{ color:"rgba(255,255,255,.4)", fontSize:".82rem", lineHeight:1.8 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   STATS
═══════════════════════════════════════ */
function Stats() {
  return (
    <section style={{ background:"linear-gradient(135deg,#120e00 0%,#0e0e0e 100%)", padding:"64px 5%", borderTop:"1px solid rgba(255,193,7,.07)", borderBottom:"1px solid rgba(255,193,7,.07)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div className="stats-grid">
          {STATS.map((s,i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="stat-block">
                <div style={{ display:"flex", justifyContent:"center" }}>
                  <div className="stat-icon-wrap"><Icon size={19} color={G}/></div>
                </div>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FLEET
═══════════════════════════════════════ */
function Fleet() {
  const [idx, setIdx] = useState(0);
  const len = FLEET.length;
  const car = FLEET[idx];
  return (
    <section style={{ background:BG, padding:"90px 5%" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:44, flexWrap:"wrap", gap:16 }}>
          <div>
            <div className="label-tag">Our Fleet</div>
            <h2 className="garamond" style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, color:D, marginTop:10 }}>
              Premium Vehicles<br/><em style={{ fontWeight:300, fontStyle:"italic", color:"#888" }}>Await Your Journey</em>
            </h2>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn-ghost-nav" onClick={() => setIdx(p => (p-1+len)%len)}><ChevronLeft size={17}/></button>
            <button className="btn-ghost-nav active" onClick={() => setIdx(p => (p+1)%len)}><ChevronRight size={17}/></button>
          </div>
        </div>
        <div className="fleet-grid">
          <div className="fleet-img" style={{ position:"relative", overflow:"hidden", minHeight:300 }}>
            <img key={idx} src={car.img} alt={car.name} style={{ width:"100%", height:"100%", objectFit:"cover", animation:"scaleIn .65s ease both", minHeight:300 }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(14,14,14,.2),transparent)" }}/>
            <div style={{ position:"absolute", top:16, left:16, background:G, padding:"4px 12px", borderRadius:2, fontFamily:"'Poppins',sans-serif", fontSize:".66rem", fontWeight:700, letterSpacing:".08em", color:D }}>{car.tag}</div>
          </div>
          <div style={{ padding:"clamp(28px,4%,52px)", display:"flex", flexDirection:"column", justifyContent:"center", background:D }}>
            <div style={{ color:"rgba(255,193,7,.5)", fontSize:".65rem", letterSpacing:".22em", textTransform:"uppercase", fontFamily:"'Poppins',sans-serif" }}>{car.type}</div>
            <h3 className="garamond" style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:W, marginTop:8, lineHeight:1.1 }}>{car.name}</h3>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:12, color:"rgba(255,255,255,.45)", fontSize:".82rem" }}>
              <Users size={13} color={G}/><span>{car.seats} Passengers</span>
            </div>
            <div style={{ display:"flex", gap:9, marginTop:24, flexWrap:"wrap" }}>
              {car.feats.map((Ic,fi) => (
                <div key={fi} style={{ width:42, height:42, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,193,7,.14)", borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ic size={16} color={G}/>
                </div>
              ))}
            </div>
            <div style={{ margin:"28px 0", height:"1px", background:"rgba(255,255,255,.07)" }}/>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <button className="btn btn-sm" style={{"--color":G,"--color2":D}}>Book This Car</button>
              <button className="btn-ghost-nav" style={{ padding:"0 18px", width:"auto", borderRadius:3 }}>View Details</button>
            </div>
          </div>
        </div>
        <div className="fleet-thumbs" style={{ marginTop:6 }}>
          {FLEET.map((f,i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ position:"relative", height:200, overflow:"hidden", cursor:"pointer", borderRadius:3, border:`2px solid ${i===idx?G:"transparent"}`, transition:"border-color .3s" }}>
              <img src={f.img} alt={f.name} style={{ width:"100%", height:"100%", objectFit:"cover", filter:i===idx?"none":"brightness(.5)", transition:"filter .3s" }}/>
              <div style={{ position:"absolute", bottom:5, left:7, fontFamily:"'Poppins',sans-serif", fontSize:".58rem", fontWeight:600, color:i===idx?G:W, textShadow:"0 1px 4px rgba(0,0,0,.8)" }}>{f.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SPLIT BANNER
═══════════════════════════════════════ */
function SplitBanner() {
  return (
    <div className="split-banner">
      {[
        { img:"https://images.pexels.com/photos/5320413/pexels-photo-5320413.jpeg",    label:"Self Drive",       title:"Drive Yourself,\nYour Way",   cta:"Explore Self Drive" },
        { img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80", label:"Chauffeur Driven", title:"Sit Back &\nEnjoy the Ride", cta:"Book a Chauffeur" },
      ].map((b,i) => (
        <div key={i} className="split-item" style={{ position:"relative", height:380, overflow:"hidden" }}>
          <img src={b.img} alt={b.label} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .6s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.06)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}/>
          <div style={{ position:"absolute", inset:0, background:i===0?"rgba(14,14,14,.52)":"linear-gradient(135deg,rgba(14,14,14,.62),rgba(255,193,7,.07))" }}/>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"clamp(28px,4%,44px)" }}>
            <div className="label-tag" style={{ color:G }}>{b.label}</div>
            <h3 className="garamond" style={{ fontSize:"clamp(1.6rem,3vw,2rem)", fontWeight:700, color:W, marginTop:10, lineHeight:1.15 }}>
              {b.title.split("\n").map((l,li) => <span key={li}>{l}{li===0&&<br/>}</span>)}
            </h3>
            <button className="btn btn-sm" style={{"--color":G,"--color2":D, marginTop:18, alignSelf:"flex-start"}}>
              {b.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   PACKAGES
═══════════════════════════════════════ */
function Packages() {
  return (
    <section style={{ background:D, padding:"90px 5%", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(rgba(255,193,7,.018) 1px,transparent 1px)`, backgroundSize:"36px 36px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:-160, left:"50%", transform:"translateX(-50%)", width:"min(700px,90vw)", height:340, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(255,193,7,.04) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ maxWidth:1280, margin:"0 auto", position:"relative" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div className="label-tag" style={{ justifyContent:"center" }}>Pricing Plans</div>
          <h2 className="garamond" style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, color:W, marginTop:10 }}>
            Choose Your <span className="shimmer-gold">Package</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,.38)", marginTop:12, fontSize:".86rem", maxWidth:420, margin:"12px auto 0" }}>Transparent pricing. Zero surge charges. Premium experience — always.</p>
        </div>
        <div className="pkg-grid">
          {PACKAGES.map((pkg,i) => (
            <div key={i} className={`pkg-card ${pkg.dark?"pkg-featured":""}`} style={{
              background:pkg.dark?"linear-gradient(170deg,#1c1400,#080600)":BG,
              border:pkg.dark?`1px solid rgba(255,193,7,.3)`:"1px solid rgba(0,0,0,.06)",
              transform:pkg.dark?"scaleY(1.025)":"none", zIndex:pkg.dark?2:1,
            }}>
              <div style={{ position:"relative", height:190, overflow:"hidden" }}>
                <img src={pkg.img} alt={pkg.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:pkg.dark?.75:.55 }}/>
                <div style={{ position:"absolute", inset:0, background:pkg.dark?"linear-gradient(to bottom,rgba(14,14,14,.25),rgba(14,14,14,.82))":"linear-gradient(to bottom,rgba(0,0,0,.08),rgba(0,0,0,.65))" }}/>
                {pkg.badge && (
                  <div style={{ position:"absolute", top:12, right:12, background:G, color:D, padding:"3px 11px", borderRadius:20, fontSize:".62rem", fontWeight:700, fontFamily:"'Poppins',sans-serif", letterSpacing:".08em" }}>★ {pkg.badge}</div>
                )}
                <div style={{ position:"absolute", bottom:16, left:20 }}>
                  <div style={{ color:pkg.dark?G:"rgba(255,255,255,.6)", fontSize:".6rem", letterSpacing:".18em", textTransform:"uppercase", fontFamily:"'Poppins',sans-serif" }}>{pkg.desc}</div>
                  <h3 className="garamond" style={{ fontSize:"1.8rem", fontWeight:700, color:W, lineHeight:1 }}>{pkg.name}</h3>
                </div>
              </div>
              <div style={{ padding:"24px 26px 30px" }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:3, marginBottom:20 }}>
                  <span className="garamond" style={{ fontSize:"2.5rem", fontWeight:700, color:pkg.dark?G:D }}>{pkg.price}</span>
                  <span style={{ color:pkg.dark?"rgba(255,255,255,.35)":"#bbb", fontFamily:"'Poppins',sans-serif", fontSize:".78rem" }}>{pkg.unit}</span>
                </div>
                <div style={{ borderTop:`1px solid ${pkg.dark?"rgba(255,193,7,.1)":"rgba(0,0,0,.08)"}`, paddingTop:16 }}>
                  {pkg.features.map((f,fi) => (
                    <div key={fi} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:9 }}>
                      <CheckCircle size={13} color={G}/>
                      <span style={{ fontSize:".8rem", color:pkg.dark?"rgba(255,255,255,.65)":"#666", fontFamily:"'Poppins',sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="btn btn-sm"
                  style={{
                    "--color": pkg.dark ? G : D,
                    "--color2": D,
                    width:"100%", marginTop:20, justifyContent:"center"
                  }}
                >
                  {pkg.name==="Premium"?"Book Premium Now":pkg.name==="Elite"?"Go Elite →":"Book Economy →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   TOURS
═══════════════════════════════════════ */
function Tours() {
  return (
    <section className="tours-section">
      <div className="tours-glow"/>
      <div className="tours-glow2"/>
      <div style={{ maxWidth:1280, margin:"0 auto", position:"relative", zIndex:1 }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:44, flexWrap:"wrap", gap:16 }}>
          <div>
            <div className="label-tag">Explore India</div>
            <h2 className="garamond" style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, color:W, marginTop:10, lineHeight:1.1 }}>
              Curated Tour <span className="shimmer-gold">Packages</span><br/>
              <em style={{ fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,.35)" }}>Across Incredible India</em>
            </h2>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ color:"rgba(255,255,255,.35)", fontSize:".83rem", lineHeight:1.8, maxWidth:300, margin:"0 0 12px auto" }}>
              Handpicked routes, expert local drivers, zero hassle.
            </p>
            <button className="btn btn-sm" style={{"--color":G,"--color2":D}}>View All Tours</button>
          </div>
        </div>

        {/* Row 1 */}
        <div className="tours-row1">
          <TourCard t={TOURS[0]} className="featured" style={{ gridColumn:"span 2" }}/>
          <TourCard t={TOURS[1]} className="tall"/>
          <TourCard t={TOURS[2]} className="tall"/>


        </div>

        {/* Row 2 */}
        <div className="tours-row2">
          <TourCard t={TOURS[3]} className="wide"/>
          <TourCard t={TOURS[4]} className="wide"/>
          <TourCard t={TOURS[5]} className="wide"/>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════ */
function Testimonials() {
  const [curr, setCurr] = useState(0);
  const len = REVIEWS.length;
  useEffect(() => { const t = setInterval(() => setCurr(c => (c+1)%len), 5000); return () => clearInterval(t); }, []);
  const featured = REVIEWS[curr];
  const rest = REVIEWS.filter((_,i) => i !== curr).slice(0,3);
  return (
    <section style={{ background:BG, padding:"90px 5%" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
          <div>
            <div className="label-tag">Testimonials</div>
            <h2 className="garamond" style={{ fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:700, color:D, marginTop:10 }}>
              What Our Clients<br/><em style={{ fontWeight:300, fontStyle:"italic", color:"#888" }}>Say About Us</em>
            </h2>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn-round" onClick={() => setCurr(p => (p-1+len)%len)} onMouseEnter={e => e.currentTarget.style.borderColor=G} onMouseLeave={e => e.currentTarget.style.borderColor="rgba(0,0,0,.14)"}><ChevronLeft size={16}/></button>
            <button className="btn-round active" onClick={() => setCurr(p => (p+1)%len)}><ChevronRight size={16}/></button>
          </div>
        </div>
        <div className="testi-grid">
          <div className="testi-card" style={{ padding:"clamp(28px,4%,48px)" }}>
            <Quote size={36} fill="rgba(255,193,7,.1)" color={G} style={{ marginBottom:18 }}/>
            <Stars n={featured.stars}/>
            <p className="garamond" style={{ fontSize:"clamp(1rem,2vw,1.2rem)", lineHeight:1.72, color:"#333", marginTop:16, fontStyle:"italic" }}>
              "{featured.text}"
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:30, paddingTop:24, borderTop:"1px solid rgba(0,0,0,.07)" }}>
              <img src={featured.img} alt={featured.name} style={{ width:50, height:50, borderRadius:"50%", objectFit:"cover", border:`2.5px solid ${G}`, flexShrink:0 }}/>
              <div>
                <div className="garamond" style={{ fontWeight:700, fontSize:"1.1rem", color:D }}>{featured.name}</div>
                <div style={{ color:"#999", fontSize:".73rem", fontFamily:"'Poppins',sans-serif", marginTop:2 }}>{featured.role}</div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {rest.map((r,i) => (
              <div key={i} className="testi-card" style={{ padding:"18px 20px", display:"flex", gap:12, alignItems:"flex-start", cursor:"pointer" }} onClick={() => setCurr(REVIEWS.indexOf(r))}>
                <img src={r.img} alt={r.name} style={{ width:40, height:40, borderRadius:"50%", objectFit:"cover", border:`1.5px solid ${G}`, flexShrink:0 }}/>
                <div style={{ minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4, flexWrap:"wrap", gap:4 }}>
                    <div className="garamond" style={{ fontWeight:700, fontSize:".96rem", color:D }}>{r.name}</div>
                    <Stars n={r.stars}/>
                  </div>
                  <p style={{ color:"#888", fontSize:".78rem", lineHeight:1.65 }}>"{r.text.substring(0,90)}..."</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Indicator bars (no dots) */}
        <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:28 }}>
          {REVIEWS.map((_,i) => (
            <div key={i} onClick={() => setCurr(i)} style={{ width:i===curr?28:8, height:4, borderRadius:2, background:i===curr?G:"rgba(0,0,0,.14)", cursor:"pointer", transition:"all .35s ease" }}/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA
═══════════════════════════════════════ */
function CTABanner() {
  return (
    <div style={{ position:"relative", overflow:"hidden" }}>
      <img src="https://images.pexels.com/photos/5834912/pexels-photo-5834912.jpeg" alt="cta"
        style={{ width:"100%", height:"clamp(360px,55vw,480px)", objectFit:"cover", display:"block" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(14,14,14,.93) 0%,rgba(14,14,14,.62) 55%,rgba(14,14,14,.22) 100%)" }}/>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", padding:"0 5%" }}>
        <div style={{ maxWidth:600 }}>
          <div className="label-tag">Ready to Ride?</div>
          <h2 className="garamond cta-title" style={{ fontSize:"clamp(2.2rem,4vw,3.6rem)", fontWeight:700, color:W, marginTop:12, lineHeight:1.1 }}>
            Your Premium Journey<br/><span className="shimmer-gold">Starts Right Now</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,.5)", fontSize:"clamp(.84rem,1.5vw,.94rem)", lineHeight:1.85, marginTop:18, maxWidth:400 }}>
            Book in seconds. Arrive in comfort. Experience the CarCab difference today.
          </p>
          <div style={{ display:"flex", gap:12, marginTop:32, flexWrap:"wrap" }}>
            <button className="btn btn-lg" style={{"--color":G,"--color2":D}}>Book a Ride Now</button>
            <button className="btn btn-white btn-lg" style={{ display:"flex", alignItems:"center", gap:8 }}>
              <Phone size={13}/> Call Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ROOT
═══════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <style>{CSS}</style>
      <Hero/>
      <Marquee/>
      <Services/>
      <HowItWorks/>
      <Stats/>
      <Fleet/>
      <SplitBanner/>
      <Packages/>
      <Tours/>
      <Testimonials/>
      <CTABanner/>
    </>
  );
}