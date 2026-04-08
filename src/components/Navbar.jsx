import { useState, useEffect, useRef } from "react";
import {
  Car, Phone, ChevronDown, Menu, X, MapPin, Clock,
  Plane, Building2, Heart, Moon, Star, ArrowRight,
  Shield, Wifi, Navigation, Zap, ChevronRight,
  MessageCircle
} from "lucide-react";

import { FaInstagramSquare,FaTwitterSquare ,FaYoutubeSquare  } from "react-icons/fa";

const G = "#ffc107";
const D = "#080808";
const W = "#ffffff";

const SERVICES_MEGA = [
  { icon: Car,       label: "City Transfers",    desc: "Daily commutes & point-to-point rides",  badge: null },
  { icon: Plane,     label: "Airport Pickup",    desc: "Flight tracking & terminal meet-greet",  badge: "Popular" },
  { icon: Building2, label: "Corporate Travel",  desc: "Executive accounts & dedicated fleets",  badge: null },
  { icon: Heart,     label: "Weddings & Events", desc: "Decorated cars, suited chauffeurs",      badge: "Trending" },
  { icon: MapPin,    label: "Outstation Trips",  desc: "Long-distance, experienced drivers",     badge: null },
  { icon: Moon,      label: "Night Packages",    desc: "Safe after-hours, 365 days available",   badge: null },
];

const FLEET_MEGA = [
  { name: "Toyota Innova Crysta", type: "Premium MPV",   tag: "Most Booked", img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&q=75" },
  { name: "Honda City Sedan",     type: "Comfort Sedan", tag: "Best Value",  img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300&q=75" },
  { name: "Mercedes GLE",         type: "Luxury SUV",    tag: "Elite Class", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&q=75" },
  { name: "Toyota Fortuner",      type: "Executive SUV", tag: "Top Pick",    img: "https://images.unsplash.com/photo-1506015391300-4802dc74de3a?w=300&q=75" },
];

const NAV_ITEMS = [
  { label: "Home",     href: "#", type: "link" },
  { label: "Services", href: "#", type: "mega-services" },
  { label: "Fleet",    href: "#", type: "mega-fleet" },
  { label: "Packages", href: "#", type: "link" },
  { label: "Tours",    href: "#", type: "link" },
  { label: "About",    href: "#", type: "link" },
  { label: "Contact",  href: "#", type: "link" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');
*, *::before, *::after { box-sizing: border-box; }

@keyframes shimmer     { 0%{background-position:-400% center;} 100%{background-position:400% center;} }
@keyframes pulseGold   { 0%,100%{box-shadow:0 0 0 0 rgba(255,193,7,.6);} 70%{box-shadow:0 0 0 10px rgba(255,193,7,0);} }
@keyframes megaDrop    { from{opacity:0;transform:translateY(-12px) scaleY(.97);} to{opacity:1;transform:translateY(0) scaleY(1);} }
@keyframes drawerSlide { from{transform:translateX(100%);} to{transform:translateX(0);} }
@keyframes tickerMove  { from{transform:translateX(0);} to{transform:translateX(-50%);} }
@keyframes rotateSlow  { to{transform:rotate(360deg);} }
@keyframes borderFlow  { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
@keyframes linkIn      { from{opacity:0;transform:translateY(-7px);} to{opacity:1;transform:translateY(0);} }
@keyframes logoIn      { from{opacity:0;transform:translateX(-14px);} to{opacity:1;transform:translateX(0);} }


}

.nb-ticker { flex: 1; overflow: hidden; mask-image: linear-gradient(90deg,transparent,black 6%,black 94%,transparent); }
.nb-ticker-inner {
  display: flex; align-items: center; gap: 52px; white-space: nowrap;
  animation: tickerMove 30s linear infinite;
}
.nb-ticker-inner:hover { animation-play-state: paused; }
.nb-ticker-item {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: 'Poppins', sans-serif; font-size: .585rem; font-weight: 500;
  letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.38);
  flex-shrink: 0;
}

.nb-t-soc:hover { background: ${G}; color: ${D}; border-color: ${G}; }

/* ── Nav Root ── */
.nb-root {
  position: fixed; left: 0; right: 0; z-index: 301; top: 36px;
  transition: top .4s cubic-bezier(.4,0,.2,1),
              background .45s, backdrop-filter .45s,
              box-shadow .45s, border-color .45s;
}
.nb-root.no-topbar { top: 0; }
.nb-root::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,193,7,.5) 15%, ${G} 35%, #fff8dc 50%, ${G} 65%, rgba(255,193,7,.5) 85%, transparent);
  background-size: 200% 100%; opacity: 0; transition: opacity .5s;
  animation: borderFlow 5s ease infinite;
}
.nb-root.scrolled::before { opacity: 1; }
.nb-root.scrolled {
  background: rgba(5,5,5,.97);
  backdrop-filter: blur(40px) saturate(1.7);
  border-bottom: 1px solid rgba(255,193,7,.07);
  box-shadow: 0 8px 56px rgba(0,0,0,.55), 0 1px 0 rgba(255,193,7,.04);
}

/* ── Progress bar ── */
.nb-progress {
  position: fixed; top: 0; left: 0; z-index: 303; height: 2px;
  background: linear-gradient(90deg, #8B6914, ${G}, #fff8dc, ${G});
  transform-origin: left; pointer-events: none;
}

/* ── Inner ── */
.nb-inner {
  max-width: 1380px; margin: 0 auto; padding: 0 5%;
  height: 78px; display: flex; align-items: center;
}

/* ── Logo ── */
.nb-logo {
  display: flex; align-items: center; gap: 13px;
  text-decoration: none; flex-shrink: 0; margin-right: 32px;
  animation: logoIn .75s cubic-bezier(.22,1,.36,1) both;
}
.nb-logo-emblem { position: relative; width: 48px; height: 48px; flex-shrink: 0; }
.nb-emblem-ring {
  position: absolute; inset: 0; border-radius: 50%;
  background: conic-gradient(from 0deg, #8B6914 0%, ${G} 25%, #fff8dc 50%, ${G} 75%, #8B6914 100%);
  animation: rotateSlow 8s linear infinite;
}
.nb-emblem-face {
  position: absolute; inset: 2.5px; border-radius: 50%;
  background: linear-gradient(145deg, #1c1400, #060400);
  display: flex; align-items: center; justify-content: center;
}
.nb-logo-glow {
  position: absolute; inset: -4px; border-radius: 50%;
  animation: pulseGold 3.2s infinite; pointer-events: none;
}
.nb-logo-text { display: flex; flex-direction: column; line-height: 1; }
.nb-wordmark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem; font-weight: 700; line-height: 1; letter-spacing: .03em;
  display: flex; align-items: baseline;
}
.nb-wordmark-white { color: ${W}; }
.nb-wordmark-gold {
  background: linear-gradient(90deg,#b8860b,${G},#fff8dc,${G},#b8860b);
  background-size: 300% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer 5s linear infinite;
}
.nb-tagline {
  font-family: 'Poppins', sans-serif; font-size: .46rem;
  letter-spacing: .38em; text-transform: uppercase; font-weight: 700;
  color: rgba(255,193,7,.4); margin-top: 3px;
  display: flex; align-items: center; gap: 5px;
}
.nb-tagline::before, .nb-tagline::after {
  content: ''; display: inline-block; width: 12px; height: 1px; background: rgba(255,193,7,.25);
}

/* ── Nav links ── */
.nb-links { display: flex; align-items: center; flex: 1; justify-content: center; }
.nb-item { position: relative; }
.nb-link {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: 'Poppins', sans-serif; font-size: .69rem; font-weight: 500;
  letter-spacing: .09em; text-transform: uppercase; text-decoration: none;
  color: rgba(255,255,255,.48); padding: 11px 15px; border-radius: 3px;
  cursor: pointer; background: transparent; border: none; white-space: nowrap;
  position: relative; transition: color .3s;
  animation: linkIn .65s cubic-bezier(.22,1,.36,1) both;
}
.nb-link::after {
  content: ''; position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);
  width: 0; height: 1.5px; border-radius: 2px;
  background: linear-gradient(90deg, transparent, ${G} 40%, ${G} 60%, transparent);
  transition: width .35s cubic-bezier(.4,0,.2,1);
}
.nb-link:hover { color: ${W}; }
.nb-link.active { color: ${G}; }
.nb-link:hover::after, .nb-link.active::after { width: calc(100% - 24px); }
.nb-link.active::before {
  content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
  width: 3px; height: 3px; border-radius: 50%; background: ${G};
}
.nb-link svg { transition: transform .3s; opacity: .55; }
.nb-item:hover > .nb-link svg, .nb-link.active svg { transform: rotate(180deg); opacity: 1; }
.nb-item:nth-child(1) .nb-link{animation-delay:.04s;}
.nb-item:nth-child(2) .nb-link{animation-delay:.09s;}
.nb-item:nth-child(3) .nb-link{animation-delay:.14s;}
.nb-item:nth-child(4) .nb-link{animation-delay:.19s;}
.nb-item:nth-child(5) .nb-link{animation-delay:.24s;}
.nb-item:nth-child(6) .nb-link{animation-delay:.29s;}
.nb-item:nth-child(7) .nb-link{animation-delay:.34s;}

/* ── Simple dropdown ── */
.nb-simple-dd {
  position: absolute; top: calc(100% + 10px); left: 50%;
  transform: translateX(-50%) translateY(-6px);
  background: rgba(6,6,6,.98); border: 1px solid rgba(255,193,7,.1);
  border-top: 2px solid ${G}; border-radius: 0 0 6px 6px; min-width: 210px;
  padding: 8px 0; z-index: 400; opacity: 0; pointer-events: none;
  transition: opacity .24s, transform .24s;
  backdrop-filter: blur(32px);
  box-shadow: 0 28px 64px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.02);
}
.nb-item:hover .nb-simple-dd {
  opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0);
  animation: megaDrop .24s ease;
}
.nb-dd-item {
  display: flex; align-items: center; gap: 8px; width: 100%; text-align: left;
  padding: 9px 18px; font-family: 'Poppins', sans-serif; font-size: .73rem;
  color: rgba(255,255,255,.45); text-decoration: none; letter-spacing: .04em;
  background: transparent; border: none; border-left: 2px solid transparent; cursor: pointer;
  transition: color .22s, background .22s, padding-left .22s, border-color .22s;
}
.nb-dd-item:hover {
  color: ${W}; padding-left: 24px; border-left-color: ${G};
  background: rgba(255,193,7,.04);
}
.nb-dd-sep { height: 1px; background: rgba(255,255,255,.05); margin: 5px 0; }

/* ── MEGA MENUS ── */
.nb-mega {
  position: fixed; left: 0; right: 0; z-index: 400;
  background: rgba(5,5,5,.98); border-top: 1px solid rgba(255,193,7,.1);
  border-bottom: 1px solid rgba(255,255,255,.04);
  backdrop-filter: blur(44px) saturate(1.6);
  box-shadow: 0 32px 80px rgba(0,0,0,.7);
  opacity: 0; pointer-events: none;
  transition: opacity .3s cubic-bezier(.4,0,.2,1), transform .3s cubic-bezier(.4,0,.2,1);
  transform: translateY(-12px);
}
.nb-mega.open {
  opacity: 1; pointer-events: auto; transform: translateY(0);
  animation: megaDrop .3s ease;
}
.nb-mega-inner { max-width: 1380px; margin: 0 auto; padding: 44px 5% 50px; }
.nb-mega-hd {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px; padding-bottom: 18px;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.nb-mega-hd-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.65rem; font-weight: 700; color: ${W};
}
.nb-mega-hd-title em {
  background: linear-gradient(90deg,#b8860b,${G},#fff8dc,${G},#b8860b);
  background-size:300% auto; -webkit-background-clip:text;
  -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 5s linear infinite;
  font-style: normal;
}
.nb-mega-viewall {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Poppins', sans-serif; font-size: .68rem; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; color: ${G};
  background: rgba(255,193,7,.05); border: 1px solid rgba(255,193,7,.22);
  border-radius: 3px; padding: 8px 18px; cursor: pointer; transition: all .3s;
}
.nb-mega-viewall:hover { background: ${G}; color: ${D}; }

/* Services grid */
.nb-svc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
.nb-svc-card {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 15px 17px; border-radius: 4px; text-decoration: none;
  border: 1px solid rgba(255,255,255,.05); background: rgba(255,255,255,.02);
  transition: all .3s; cursor: pointer;
}
.nb-svc-card:hover {
  background: rgba(255,193,7,.05); border-color: rgba(255,193,7,.22);
  transform: translateX(5px);
}
.nb-svc-ico {
  width: 40px; height: 40px; flex-shrink: 0; border-radius: 4px;
  background: rgba(255,193,7,.07); border: 1px solid rgba(255,193,7,.14);
  display: flex; align-items: center; justify-content: center;
  transition: all .3s;
}
.nb-svc-card:hover .nb-svc-ico { background: ${G}; border-color: ${G}; }
.nb-svc-card:hover .nb-svc-ico svg { color: ${D} !important; }
.nb-svc-name {
  font-family: 'Poppins', sans-serif; font-size: .77rem; font-weight: 600;
  color: rgba(255,255,255,.78); margin-bottom: 3px;
  display: flex; align-items: center; gap: 7px;
}
.nb-svc-badge {
  font-size: .54rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  background: ${G}; color: ${D}; padding: 1px 7px; border-radius: 10px;
}
.nb-svc-desc {
  font-family: 'Poppins', sans-serif; font-size: .68rem;
  color: rgba(255,255,255,.3); line-height: 1.5;
}

/* Fleet grid */
.nb-fleet-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
.nb-fleet-card {
  border-radius: 5px; overflow: hidden; cursor: pointer;
  border: 1px solid rgba(255,255,255,.06); text-decoration: none;
  transition: all .38s; position: relative;
}
.nb-fleet-card:hover {
  border-color: rgba(255,193,7,.3); transform: translateY(-5px);
  box-shadow: 0 18px 48px rgba(0,0,0,.45);
}
.nb-fleet-img-wrap { overflow: hidden; position: relative; height: 115px; }
.nb-fleet-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  filter: brightness(.7); transition: transform .55s, filter .55s;
}
.nb-fleet-card:hover .nb-fleet-img { transform: scale(1.08); filter: brightness(.88); }
.nb-fleet-tag {
  position: absolute; top: 8px; left: 8px;
  background: ${G}; color: ${D}; font-family: 'Poppins', sans-serif;
  font-size: .54rem; font-weight: 700; letter-spacing: .08em;
  padding: 2px 8px; border-radius: 2px;
}
.nb-fleet-body { padding: 12px 14px; background: rgba(255,255,255,.025); }
.nb-fleet-type {
  font-family: 'Poppins', sans-serif; font-size: .57rem; font-weight: 600;
  letter-spacing: .16em; text-transform: uppercase; color: rgba(255,193,7,.55); margin-bottom: 3px;
}
.nb-fleet-name {
  font-family: 'Cormorant Garamond', serif; font-size: 1rem;
  font-weight: 700; color: ${W}; line-height: 1.2;
}

/* ── Right side ── */
.nb-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; margin-left: 20px; }
.nb-phone-pill {
  display: flex; align-items: center; gap: 9px; padding: 8px 14px;
  border-radius: 3px; border: 1px solid rgba(255,193,7,.12);
  background: rgba(255,193,7,.04); text-decoration: none; transition: all .3s;
}
.nb-phone-pill:hover { border-color: rgba(255,193,7,.35); background: rgba(255,193,7,.09); }
.nb-phone-orb {
  width: 27px; height: 27px; border-radius: 50%;
  background: ${G}; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; animation: pulseGold 3s infinite;
}
.nb-phone-lines { display: flex; flex-direction: column; gap: 1px; }
.nb-phone-micro {
  font-family: 'Poppins', sans-serif; font-size: .49rem; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase; color: rgba(255,193,7,.5);
}
.nb-phone-number {
  font-family: 'Poppins', sans-serif; font-size: .73rem; font-weight: 600;
  color: ${W}; letter-spacing: .03em;
}
.nb-sep { width: 1px; height: 26px; background: rgba(255,255,255,.07); }
.nb-cta {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #ffcb2f, ${G} 50%, #e6ac00);
  background-size: 200% 200%; color: ${D};
  border: none; cursor: pointer; font-family: 'Poppins', sans-serif;
  font-weight: 700; font-size: .7rem; letter-spacing: .12em; text-transform: uppercase;
  padding: 12px 26px; border-radius: 3px;
  transition: all .35s cubic-bezier(.4,0,.2,1);
  display: flex; align-items: center; gap: 8px;
  animation: borderFlow 4s ease infinite;
}
.nb-cta::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent);
  transform: translateX(-110%); transition: transform .55s;
}
.nb-cta:hover { box-shadow: 0 10px 32px rgba(255,193,7,.5); transform: translateY(-2px); }
.nb-cta:hover::before { transform: translateX(110%); }
.nb-cta-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: ${D}; animation: pulseGold 2s infinite;
}

/* ── Hamburger ── */
.nb-burger {
  display: none; flex-direction: column; justify-content: center; align-items: center;
  gap: 5px; width: 44px; height: 44px; border-radius: 4px;
  background: rgba(255,193,7,.05); border: 1px solid rgba(255,193,7,.18);
  cursor: pointer; transition: all .3s; padding: 0; flex-shrink: 0;
}
.nb-burger:hover { background: rgba(255,193,7,.12); border-color: rgba(255,193,7,.42); }
.nb-bar {
  width: 20px; height: 1.5px; border-radius: 2px; background: ${G};
  transition: all .4s cubic-bezier(.4,0,.2,1); transform-origin: center;
}
.nb-burger.open .nb-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nb-burger.open .nb-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nb-burger.open .nb-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── Mobile Drawer ── */
.nb-drawer {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(3,3,3,.99); backdrop-filter: blur(44px);
  transform: translateX(105%); transition: transform .46s cubic-bezier(.4,0,.2,1);
  display: flex; flex-direction: column; overflow: hidden;
}
.nb-drawer.open { transform: translateX(0); }
.nb-dw-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 6%; border-bottom: 1px solid rgba(255,193,7,.07); flex-shrink: 0;
}
.nb-dw-logo { display: flex; align-items: center; gap: 11px; }
.nb-dw-logo-icon {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg,${G},#e6ac00);
  display: flex; align-items: center; justify-content: center;
}
.nb-dw-logo-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; font-weight: 700; color: ${W};
}
.nb-dw-close {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid rgba(255,193,7,.18); background: rgba(255,193,7,.04);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .28s; color: ${G};
}
.nb-dw-close:hover { background: ${G}; color: ${D}; border-color: ${G}; }
.nb-dw-body { flex: 1; overflow-y: auto; padding: 6px 0; }
.nb-dw-body::-webkit-scrollbar { width: 0; }
.nb-dw-section {
  font-family: 'Poppins', sans-serif; font-size: .56rem; font-weight: 700;
  letter-spacing: .26em; text-transform: uppercase;
  color: rgba(255,193,7,.35); padding: 16px 6% 7px;
}
.nb-dw-link {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 15px 6%; text-align: left;
  font-family: 'Poppins', sans-serif; font-size: .86rem; font-weight: 500;
  color: rgba(255,255,255,.55); text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,.04); background: transparent;
  border-left: none; border-right: none; border-top: none;
  cursor: pointer; letter-spacing: .04em; transition: color .22s, background .22s;
}
.nb-dw-link:hover, .nb-dw-link.active { color: ${G}; background: rgba(255,193,7,.04); }
.nb-dw-link svg { opacity: .4; transition: opacity .25s, transform .3s; flex-shrink: 0; }
.nb-dw-link:hover svg, .nb-dw-link.active svg { opacity: 1; }
.nb-dw-sub { overflow: hidden; transition: max-height .42s cubic-bezier(.4,0,.2,1); max-height: 0; }
.nb-dw-sub.open { max-height: 700px; }
.nb-dw-sublink {
  display: flex; align-items: center; gap: 10px; padding: 11px 6% 11px 11%;
  font-family: 'Poppins', sans-serif; font-size: .77rem;
  color: rgba(255,255,255,.35); text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,.03);
  transition: color .22s, padding-left .22s;
}
.nb-dw-sublink:hover { color: ${G}; padding-left: 13%; }
.nb-dw-sublink-dot { width: 4px; height: 4px; border-radius: 50%; background: ${G}; flex-shrink: 0; opacity: .5; }
.nb-dw-foot {
  padding: 22px 6% 32px; border-top: 1px solid rgba(255,193,7,.07);
  flex-shrink: 0; display: flex; flex-direction: column; gap: 12px;
}
.nb-dw-bookbtn {
  width: 100%; padding: 16px; border-radius: 3px; border: none;
  background: ${G}; color: ${D}; font-family: 'Poppins', sans-serif;
  font-weight: 700; font-size: .8rem; letter-spacing: .1em; text-transform: uppercase;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all .3s;
}
.nb-dw-bookbtn:hover { box-shadow: 0 8px 28px rgba(255,193,7,.4); transform: translateY(-2px); }
.nb-dw-phonerow {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-family: 'Poppins', sans-serif; font-size: .78rem; color: rgba(255,255,255,.35);
}
.nb-dw-phonerow svg { color: ${G}; }
.nb-dw-socs { display: flex; justify-content: center; gap: 9px; }
.nb-dw-soc {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid rgba(255,193,7,.14); background: rgba(255,193,7,.03);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .28s; color: rgba(255,255,255,.38);
}
.nb-dw-soc:hover { background: ${G}; color: ${D}; border-color: ${G}; }

/* ── Responsive ── */
@media(max-width:1120px){
  .nb-logo { margin-right: 18px; }
  .nb-link { padding: 11px 11px; font-size: .65rem; }
  .nb-phone-lines { display: none; }
  .nb-phone-pill { padding: 8px; border-radius: 50%; }
}
@media(max-width:900px){
  .nb-links  { display: none !important; }
  .nb-phone-pill { display: none !important; }
  .nb-sep    { display: none !important; }
  .nb-cta    { display: none !important; }
  .nb-burger { display: flex !important; }
  .nb-topbar-right { display: none !important; }
}
@media(max-width:600px){
  .nb-topbar { height: 30px; }
  .nb-root   { top: 30px; }
  .nb-root.no-topbar { top: 0; }
  .nb-inner  { height: 66px; padding: 0 4%; }
  .nb-tagline { display: none; }
  .nb-wordmark { font-size: 1.28rem; }
}
`;

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [scrollPct, setScrollPct]   = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [megaOpen, setMegaOpen]     = useState(null);
  const [drawerSub, setDrawerSub]   = useState(null);
  const [topbarOn, setTopbarOn]     = useState(true);
  const leaveTimer = useRef(null);
  const navRef     = useRef(null);
  const megaRef    = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setTopbarOn(y < 70);
      setScrollPct(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (
        navRef.current && !navRef.current.contains(e.target) &&
        megaRef.current && !megaRef.current.contains(e.target)
      ) setMegaOpen(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const openMega = (type) => {
    clearTimeout(leaveTimer.current);
    if      (type === "mega-services") setMegaOpen("services");
    else if (type === "mega-fleet")    setMegaOpen("fleet");
    else                               setMegaOpen(null);
  };
  const closeMega = () => { leaveTimer.current = setTimeout(() => setMegaOpen(null), 120); };
  const keepMega  = () => clearTimeout(leaveTimer.current);

  const navTopPx   = topbarOn ? 36 : 0;
  const megaTopPx  = navTopPx + 78;

  return (
    <>
      <style>{CSS}</style>

      {/* ── Scroll progress ── */}
      <div className="nb-progress" style={{ width: `${scrollPct}%` }} />


      {/* ── Navbar ── */}
      <nav
        ref={navRef}
        className={`nb-root ${scrolled ? "scrolled" : ""} ${!topbarOn ? "no-topbar" : ""}`}
        style={{ top: `${navTopPx}px` }}
      >
        <div className="nb-inner">

          {/* Logo */}
          <a className="nb-logo" href="#" onClick={() => setActiveItem("Home")}>
            <div className="nb-logo-emblem">
              
             
            </div>
            <div className="nb-logo-text">
              <div className="nb-wordmark">
                <span className="nb-wordmark-white">Car</span>
                <span className="nb-wordmark-gold">Cab</span>
              </div>
              <div className="nb-tagline">Premium · Service</div>
            </div>
          </a>

          {/* Links */}
          <div className="nb-links">
            {NAV_ITEMS.map((item) => {
              const hasMega = item.type === "mega-services" || item.type === "mega-fleet";
              return (
                <div
                  key={item.label}
                  className="nb-item"
                  onMouseEnter={() => openMega(item.type)}
                  onMouseLeave={closeMega}
                >
                  <button
                    className={`nb-link ${activeItem === item.label ? "active" : ""}`}
                    onClick={() => { setActiveItem(item.label); setMegaOpen(null); }}
                  >
                    {item.label}
                    {hasMega && <ChevronDown size={10} />}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right */}
          <div className="nb-right">
           
            <div className="nb-sep" />
            <button className="nb-cta">
              <div className="nb-cta-dot" />
              Book a Ride
            </button>

            {/* Burger */}
            <button
              className={`nb-burger ${drawerOpen ? "open" : ""}`}
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle menu"
            >
              <div className="nb-bar" />
              <div className="nb-bar" />
              <div className="nb-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mega Menu ── */}
      <div
        ref={megaRef}
        className={`nb-mega ${megaOpen ? "open" : ""}`}
        style={{ top: `${megaTopPx}px` }}
        onMouseEnter={keepMega}
        onMouseLeave={closeMega}
      >
        <div className="nb-mega-inner">
          {megaOpen === "services" && (
            <>
              <div className="nb-mega-hd">
                <div className="nb-mega-hd-title">Our <em>Premium Services</em></div>
                <button className="nb-mega-viewall">View All Services <ArrowRight size={13} /></button>
              </div>
              <div className="nb-svc-grid">
                {SERVICES_MEGA.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a key={i} href="#" className="nb-svc-card">
                      <div className="nb-svc-ico">
                        <Icon size={17} color={G} strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className="nb-svc-name">
                          {s.label}
                          {s.badge && <span className="nb-svc-badge">{s.badge}</span>}
                        </div>
                        <div className="nb-svc-desc">{s.desc}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </>
          )}

          {megaOpen === "fleet" && (
            <>
              <div className="nb-mega-hd">
                <div className="nb-mega-hd-title">Explore Our <em>Fleet</em></div>
                <button className="nb-mega-viewall">View Full Fleet <ArrowRight size={13} /></button>
              </div>
              <div className="nb-fleet-grid">
                {FLEET_MEGA.map((car, i) => (
                  <a key={i} href="#" className="nb-fleet-card">
                    <div className="nb-fleet-img-wrap">
                      <img className="nb-fleet-img" src={car.img} alt={car.name} />
                      <div className="nb-fleet-tag">{car.tag}</div>
                    </div>
                    <div className="nb-fleet-body">
                      <div className="nb-fleet-type">{car.type}</div>
                      <div className="nb-fleet-name">{car.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`nb-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="nb-dw-head">
          <div className="nb-dw-logo">
            <div className="nb-dw-logo-icon">
              <Car size={18} color={D} strokeWidth={2.5} />
            </div>
            <span className="nb-dw-logo-name">CarCab</span>
          </div>
          <button className="nb-dw-close" onClick={() => setDrawerOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="nb-dw-body">
          <div className="nb-dw-section">Navigation</div>

          {NAV_ITEMS.map((item) => {
            const hasSub  = item.type === "mega-services" || item.type === "mega-fleet";
            const subList = item.type === "mega-services"
              ? SERVICES_MEGA.map(s => s.label)
              : item.type === "mega-fleet"
              ? FLEET_MEGA.map(f => f.name)
              : [];
            const isOpen  = drawerSub === item.label;

            return (
              <div key={item.label}>
                <button
                  className={`nb-dw-link ${activeItem === item.label ? "active" : ""}`}
                  onClick={() => {
                    if (hasSub) {
                      setDrawerSub(isOpen ? null : item.label);
                    } else {
                      setActiveItem(item.label);
                      setDrawerOpen(false);
                    }
                  }}
                >
                  {item.label}
                  {hasSub
                    ? <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .3s" }} />
                    : <ChevronRight size={14} />
                  }
                </button>
                {hasSub && (
                  <div className={`nb-dw-sub ${isOpen ? "open" : ""}`}>
                    {subList.map((s) => (
                      <a key={s} href="#" className="nb-dw-sublink" onClick={() => setDrawerOpen(false)}>
                        <div className="nb-dw-sublink-dot" />
                        {s}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="nb-dw-section" style={{ marginTop: 8 }}>Quick Contact</div>
          <a href="tel:+919876543210" className="nb-dw-link">
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Phone size={14} color={G} /> +91 98765 43210
            </span>
            <ChevronRight size={14} />
          </a>
        </div>

        <div className="nb-dw-foot">
          <button className="nb-dw-bookbtn" onClick={() => setDrawerOpen(false)}>
            <Car size={15} /> Book a Ride Now
          </button>
          <div className="nb-dw-phonerow">
            <Phone size={12} /><span>24/7 Support: +91 98765 43210</span>
          </div>
          <div className="nb-dw-socs">
            {[FaInstagramSquare, FaTwitterSquare, MessageCircle].map((Icon, i) => (
              <button key={i} className="nb-dw-soc"><Icon size={14} /></button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}