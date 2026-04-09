import { useState, useEffect } from "react";
import {
  Users, Wifi, Coffee, Thermometer, Shield, Navigation,
  Clock, Star, ArrowRight,
  CheckCircle, Phone, MapPin, Fuel, Settings, Zap,
  Heart, X,
  Award, Sparkles
} from "lucide-react";

const G  = "#ffc107";
const D  = "#0a0a0a";
const D2 = "#111111";
const D3 = "#1a1a1a";
const W  = "#ffffff";
const BG  = "#f7f7f5";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');

  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; background: ${BG}; color: ${W}; overflow-x: hidden; }
  img  { max-width: 100%; display: block; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${D}; }
  ::-webkit-scrollbar-thumb { background: ${G}; border-radius: 2px; }
  .garamond { font-family: 'Cormorant Garamond', serif; }

  @keyframes shimmer    { 0%{background-position:-400% center} 100%{background-position:400% center} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn    { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
  @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(255,193,7,.5)} 70%{box-shadow:0 0 0 12px rgba(255,193,7,0)} 100%{box-shadow:0 0 0 0 rgba(255,193,7,0)} }
  @keyframes dotBlink   { 0%,100%{opacity:.3} 50%{opacity:1} }

  .shimmer-gold {
    background: linear-gradient(90deg,#b8860b 0%,${G} 25%,#fff8dc 50%,${G} 75%,#b8860b 100%);
    background-size: 300% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation: shimmer 5s linear infinite;
  }

  .btn {
    --color: ${G}; --color2: ${D};
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: .7em 1.6em; background: transparent; border-radius: 6px;
    border: .3px solid var(--color); transition: color .5s, filter .2s, transform .2s;
    position: relative; overflow: hidden; cursor: pointer; z-index: 1;
    font-weight: 600; font-size: .78rem; letter-spacing: .1em; text-transform: uppercase;
    font-family: 'Poppins', sans-serif; color: var(--color); white-space: nowrap;
  }
  .btn::after, .btn::before {
    content: ''; display: block; height: 100%; width: 100%;
    transform: skew(90deg) translate(-50%,-50%);
    position: absolute; inset: 50%; left: 25%; z-index: -1;
    transition: .5s ease-out; background-color: var(--color);
  }
  .btn::before { top: -50%; left: -25%; transform: skew(90deg) rotate(180deg) translate(-50%,-50%); }
  .btn:hover::before { transform: skew(45deg) rotate(180deg) translate(-50%,-50%); }
  .btn:hover::after  { transform: skew(45deg) translate(-50%,-50%); }
  .btn:hover  { color: var(--color2); }
  .btn:active { filter: brightness(.7); transform: scale(.98); }
  .btn-sm { padding: .5em 1.2em; font-size: .7rem; }
  .btn-lg { padding: .88em 2em;  font-size: .84rem; }
  .btn-white { --color: ${W}; --color2: ${D}; }

  .label-tag { display:inline-flex;align-items:center;gap:10px;font-size:.64rem;letter-spacing:.26em;text-transform:uppercase;font-weight:600;color:${G};font-family:'Poppins',sans-serif; }
  .label-tag::before { content:'';display:block;width:26px;height:1.5px;background:${G}; }

  /* HERO */
  .fleet-hero { position:relative; min-height:92vh; display:flex; align-items:center; overflow:hidden; background:${D}; }
  .hero-bg-img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.22; }
  .hero-noise { position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");pointer-events:none;opacity:.6; }
  .hero-grid-lines { position:absolute;inset:0;background-image:linear-gradient(rgba(255,193,7,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,193,7,.025) 1px,transparent 1px);background-size:60px 60px;pointer-events:none; }
  .hero-glow { position:absolute;top:-120px;right:-100px;width:680px;height:680px;border-radius:50%;background:radial-gradient(circle,rgba(255,193,7,.07) 0%,transparent 65%);pointer-events:none; }
  .hero-content { position:relative;z-index:2;padding:0 6%;padding-top:100px;max-width:1380px;margin:0 auto;width:100%; }
  .hero-tag-row { display:flex;align-items:center;gap:16px;margin-bottom:18px; }
  .hero-live-badge { display:flex;align-items:center;gap:7px;background:rgba(255,193,7,.08);border:1px solid rgba(255,193,7,.2);border-radius:100px;padding:5px 14px;font-size:.62rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${G}; }
  .hero-live-dot { width:6px;height:6px;border-radius:50%;background:${G};animation:dotBlink 1.4s ease-in-out infinite; }

  /* FILTER BAR */
  .filter-section { background:${D2};border-top:1px solid rgba(255,193,7,.06);border-bottom:1px solid rgba(255,193,7,.06);padding:0 6%;position:sticky;top:0;z-index:50;backdrop-filter:blur(20px); }
  .filter-inner { max-width:1380px;margin:0 auto;display:flex;align-items:center;gap:0;overflow-x:auto;scrollbar-width:none; }
  .filter-inner::-webkit-scrollbar { display:none; }
  .filter-tab { padding:18px 24px;font-family:'Poppins',sans-serif;font-size:.74rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);border:none;background:none;cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;transition:color .3s,border-color .3s;flex-shrink:0; }
  .filter-tab:hover  { color:rgba(255,255,255,.75); }
  .filter-tab.active { color:${G};border-bottom-color:${G}; }
  .filter-count { display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:rgba(255,193,7,.12);border-radius:50%;font-size:.58rem;color:${G};margin-left:6px; }

  /* SORT ROW */
  .sort-row { max-width:1380px;margin:0 auto;padding:32px 6% 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px; }
  .sort-label { color:rgba(255,255,255,.35);font-size:.78rem; }
  .sort-label span { color:${W};font-weight:600; }
  .sort-controls { display:flex;align-items:center;gap:10px; }
  .sort-select { background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:${G};font-family:'Poppins',sans-serif;font-size:.74rem;padding:8px 14px;border-radius:6px;outline:none;cursor:pointer; }
  .sort-select option { background:${D2}; }
  .view-toggle { display:flex;border:1px solid rgba(255,255,255,.1);border-radius:6px;overflow:hidden; }
  .view-btn { width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:none;border:none;cursor:pointer;color:rgba(255,255,255,.35);transition:background .3s,color .3s; }
  .view-btn.active { background:rgba(255,193,7,.1);color:${G}; }

  /* FLEET GRID */
  .fleet-section { padding:28px 6% 100px;max-width:1380px;margin:0 auto; }
  .fleet-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:22px; }
  .fleet-grid.list-view { grid-template-columns:1fr; }

  /* FLEET CARD */
  .fleet-card {
    background:${D2}; border-radius:14px; overflow:hidden;
    border:1px solid rgba(255,255,255,.05);
    transition:transform .5s cubic-bezier(.34,1.1,.64,1),box-shadow .5s,border-color .4s;
    cursor:pointer; position:relative; isolation:isolate;
    animation: fadeUp .6s cubic-bezier(.22,1,.36,1) both;
  }
  .fleet-card:hover {
    transform:translateY(-14px) scale(1.015);
    box-shadow:0 40px 80px rgba(0,0,0,.65),0 0 0 1px rgba(255,193,7,.18);
    border-color:rgba(255,193,7,.15);
  }
  .card-img-wrap { position:relative;height:220px;overflow:hidden;background:#0d0d0d; }
  .card-img-wrap img { width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.4,0,.2,1),filter .6s ease; }
  .fleet-card:hover .card-img-wrap img { transform:scale(1.08);filter:brightness(.75) saturate(1.1); }
  .card-img-overlay { position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.08) 0%,rgba(0,0,0,.7) 100%);transition:background .5s; }
  .fleet-card:hover .card-img-overlay { background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.82) 100%); }
  .card-accent { position:absolute;bottom:0;left:0;height:2px;width:0;background:linear-gradient(90deg,${G},rgba(255,193,7,.2));transition:width .55s cubic-bezier(.4,0,.2,1);z-index:3; }
  .fleet-card:hover .card-accent { width:100%; }
  .card-badge { position:absolute;top:13px;left:13px;background:${G};color:${D};font-family:'Poppins',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:2px;z-index:2; }
  .card-badge.badge-luxury { background:linear-gradient(90deg,#b8860b,${G}); }
  .card-badge.badge-new    { background:#10b981; }
  .card-badge.badge-hot    { background:#ef4444; }
  .card-wish { position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s;z-index:3;opacity:0;transform:scale(.8); }
  .fleet-card:hover .card-wish { opacity:1;transform:scale(1); }
  .card-wish:hover { background:rgba(255,193,7,.2);border-color:${G}; }
  .card-wish.liked { background:rgba(239,68,68,.2);border-color:#ef4444;opacity:1;transform:scale(1); }
  .card-seats { position:absolute;bottom:14px;right:14px;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);border-radius:100px;padding:4px 11px;font-family:'Poppins',sans-serif;font-size:.62rem;font-weight:600;color:${W};display:flex;align-items:center;gap:5px;z-index:2; }
  .card-body { padding:20px 22px 22px; }
  .card-type  { font-size:.6rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,193,7,.7);margin-bottom:4px; }
  .card-name  { font-family:'Cormorant Garamond',serif;font-size:1.55rem;font-weight:700;color:${W};line-height:1.05;margin-bottom:12px; }
  .card-specs { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:16px; }
  .spec-item  { display:flex;align-items:center;gap:5px;font-size:.7rem;color:rgba(255,255,255,.45); }
  .spec-item svg { color:rgba(255,193,7,.6); }
  .card-feats { display:flex;gap:7px;flex-wrap:wrap;margin-bottom:18px; }
  .feat-chip   { display:flex;align-items:center;gap:4px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:100px;padding:4px 10px;font-size:.62rem;color:rgba(255,255,255,.5);transition:border-color .3s,color .3s; }
  .fleet-card:hover .feat-chip { border-color:rgba(255,193,7,.18);color:rgba(255,255,255,.65); }
  .feat-chip svg { color:${G}; }
  .card-rating { display:flex;align-items:center;gap:6px;margin-bottom:16px; }
  .stars-row   { display:flex;gap:2px; }
  .rating-count { font-size:.68rem;color:rgba(255,255,255,.35); }
  .card-footer { display:flex;align-items:center;justify-content:space-between;gap:10px;border-top:1px solid rgba(255,255,255,.06);padding-top:16px; }
  .price-from  { font-size:.6rem;color:rgba(255,255,255,.35);letter-spacing:.08em;text-transform:uppercase; }
  .price-val   { font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;line-height:1; background:linear-gradient(90deg,#b8860b,${G},#fff8dc,${G},#b8860b);background-size:300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite; }
  .price-unit  { font-size:.66rem;color:rgba(255,255,255,.35); }

  /* LIST VIEW */
  .fleet-grid.list-view .fleet-card { border-radius:12px; }
  .fleet-grid.list-view .fleet-card:hover { transform:translateY(-6px) scale(1.005); }
  .fleet-grid.list-view .card-img-wrap { height:100%;min-height:200px; }
  .fleet-grid.list-view .card-list-inner { display:grid;grid-template-columns:320px 1fr;min-height:200px; }
  .fleet-grid.list-view .card-body { display:flex;flex-direction:column;justify-content:space-between;padding:24px 28px; }
  .fleet-grid.list-view .card-name { font-size:1.8rem;margin-bottom:8px; }

  /* COMPARE BAR */
  .compare-bar { position:fixed;bottom:0;left:0;right:0;background:rgba(10,10,10,.96);backdrop-filter:blur(20px);border-top:1px solid rgba(255,193,7,.15);padding:14px 6%;z-index:100;transform:translateY(100%);transition:transform .4s cubic-bezier(.34,1.1,.64,1); }
  .compare-bar.visible { transform:translateY(0); }
  .compare-inner { max-width:1380px;margin:0 auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap; }
  .compare-slots { display:flex;gap:10px;flex:1; }
  .compare-slot { height:52px;flex:1;max-width:180px;border-radius:8px;border:1px dashed rgba(255,193,7,.25);display:flex;align-items:center;justify-content:center;font-size:.68rem;color:rgba(255,255,255,.3); }
  .compare-slot.filled { border-style:solid;border-color:rgba(255,193,7,.4);background:rgba(255,193,7,.06);color:${G};font-weight:600;font-size:.7rem;padding:0 12px;gap:8px; }

  /* CTA */
  .fleet-cta { position:relative;overflow:hidden;padding:100px 6%;background:${D}; }
  .fleet-cta-bg { position:absolute;inset:0; }
  .fleet-cta-bg img { width:100%;height:100%;object-fit:cover;opacity:.2; }
  .fleet-cta-bg::after { content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,10,10,.96) 0%,rgba(10,10,10,.75) 60%,rgba(10,10,10,.4) 100%); }
  .fleet-cta-content { position:relative;z-index:2;max-width:1380px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center; }

  /* RESPONSIVE */
  @media(max-width:1200px){
    .fleet-grid { grid-template-columns:repeat(2,1fr); }
    .fleet-cta-content { grid-template-columns:1fr; }
  }
  @media(max-width:900px){
    .fleet-grid { grid-template-columns:1fr 1fr; }
    .fleet-grid.list-view .card-list-inner { grid-template-columns:1fr; }
    .fleet-grid.list-view .card-img-wrap { height:200px;min-height:0; }
  }
  @media(max-width:680px){
    .fleet-grid,.fleet-grid.list-view { grid-template-columns:1fr; }
    .fleet-cta-content { grid-template-columns:1fr; gap:30px; }
    .filter-tab { padding:16px 16px; }
    .hero-content { padding-top:80px; }
    .compare-slots { flex-wrap:nowrap;overflow-x:auto; }
    .compare-slot { min-width:140px; }
  }
  @media(max-width:480px){
    .card-specs { gap:10px; }
    .fleet-section { padding:20px 4% 80px; }
    .filter-section { padding:0 4%; }
    .sort-row { padding:24px 4% 0; }
    .fleet-cta { padding:60px 4%; }
  }
`;

/* ── CAR DATA (sahi naam + sahi details) ── */
const CARS = [
  {
    id: 1,
    name: "Innova Hycross",
    type: "Premium Hybrid MPV",
    badge: "Most Booked",
    badgeClass: "",
    price: "₹18",
    unit: "/hr",
    seats: 7,
    fuel: "Strong Hybrid",
    transmission: "e-CVT",
    rating: 4.9,
    reviews: 2847,
    img: "https://i.pinimg.com/736x/9f/d6/fe/9fd6febc8291520466458b54ea202328.jpg",
    feats: ["WiFi Hotspot", "Mineral Water", "Climate Control", "GPS Navigation", "USB Charging", "Child Seat"],
    specs: { mileage: "21 km/L", engine: "2.0L Hybrid", power: "183 bhp", torque: "206 Nm" },
    desc: "Toyota Innova Hycross is India's finest premium hybrid MPV. With 7-seater comfort, strong hybrid powertrain delivering 21 km/l, sunroof, captain seats and a refined cabin — ideal for families and corporate groups.",
    category: "mpv",
  },
  {
    id: 2,
    name: "Innova Crysta",
    type: "Premium MPV",
    badge: "Luxury",
    badgeClass: "badge-luxury",
    price: "₹14",
    unit: "/hr",
    seats: 7,
    fuel: "Diesel",
    transmission: "Manual / AT",
    rating: 4.8,
    reviews: 3102,
    img: "https://i.pinimg.com/736x/46/4e/08/464e08b9c387af5dbf513419727b3ea5.jpg",
    feats: ["WiFi Hotspot", "Mineral Water", "Climate Control", "GPS Navigation", "USB Charging", "Spacious Boot"],
    specs: { mileage: "14 km/L", engine: "2.4L Diesel", power: "148 bhp", torque: "343 Nm" },
    desc: "Toyota Innova Crysta — the benchmark of MPV travel in India. Known for its rock-solid diesel engine, plush seating for 7, excellent ride quality and unmatched reliability on both city and highway roads.",
    category: "mpv",
  },
  {
    id: 3,
    name: "Maruti Ertiga",
    type: "Family MPV",
    badge: "Best Value",
    badgeClass: "",
    price: "₹10",
    unit: "/hr",
    seats: 7,
    fuel: "Petrol / CNG",
    transmission: "Manual / AT",
    rating: 4.6,
    reviews: 1870,
    img: "https://i.pinimg.com/736x/2a/0c/3a/2a0c3a2d4f2fffa8840cf8f85de2da9e.jpg",
    feats: ["AC", "GPS Navigation", "USB Charging", "Music System", "Mineral Water", "Child-Friendly"],
    specs: { mileage: "20 km/L", engine: "1.5L K-Series", power: "103 bhp", torque: "138 Nm" },
    desc: "Maruti Ertiga is the go-to family MPV for comfortable and economical travel. Seating for 7 passengers, smooth automatic gearbox, excellent CNG mileage, and a spacious boot make it perfect for outstation trips.",
    category: "mpv",
  },
  {
    id: 4,
    name: "Kia Carens",
    type: "Premium Family MPV",
    badge: "Top Pick",
    badgeClass: "",
    price: "₹16",
    unit: "/hr",
    seats: 6,
    fuel: "Diesel / Petrol",
    transmission: "Automatic",
    rating: 4.8,
    reviews: 1243,
    img: "https://i.pinimg.com/736x/49/f7/04/49f704368d6a48e735f020ca3b367cfe.jpg",
    feats: ["WiFi Hotspot", "Panoramic Sunroof", "Climate Control", "GPS Navigation", "USB Charging", "Captain Seats"],
    specs: { mileage: "19 km/L", engine: "1.5L Diesel", power: "115 bhp", torque: "250 Nm" },
    desc: "Kia Carens brings premium features at an accessible price. Equipped with a panoramic sunroof, 6 captain seats, ventilated front seats and Kia's premium sound system — it offers a near-luxury MPV experience for every trip.",
    category: "mpv",
  },
  {
    id: 5,
    name: "Swift Dzire",
    type: "Compact Sedan",
    badge: "Best Value",
    badgeClass: "",
    price: "₹8",
    unit: "/hr",
    seats: 4,
    fuel: "Petrol / CNG",
    transmission: "AMT / Manual",
    rating: 4.6,
    reviews: 4201,
    img: "https://i.pinimg.com/736x/3b/c7/bc/3bc7bc6b9339e0e9ed219386e9ad189d.jpg",
    feats: ["AC", "GPS Navigation", "USB Charging", "Music System", "Mineral Water", "Spacious Boot"],
    specs: { mileage: "23 km/L", engine: "1.2L DualJet", power: "90 bhp", torque: "113 Nm" },
    desc: "Maruti Swift Dzire is India's most trusted compact sedan. With exceptional fuel efficiency, smooth ride quality, comfortable 4-seater interior and a large boot — it is the perfect choice for daily city commutes and short trips.",
    category: "sedan",
  },
  {
    id: 6,
    name: "Hyundai Aura",
    type: "Compact Sedan",
    badge: "New",
    badgeClass: "badge-new",
    price: "₹9",
    unit: "/hr",
    seats: 4,
    fuel: "Petrol / CNG",
    transmission: "AMT / Manual",
    rating: 4.5,
    reviews: 980,
    img: "https://i.pinimg.com/736x/6c/90/84/6c90844bbaed33a9b7bf3fe7a9b9d893.jpg",
    feats: ["AC", "GPS Navigation", "USB Charging", "Wireless Charger", "Mineral Water", "Air Purifier"],
    specs: { mileage: "25 km/L", engine: "1.2L Kappa", power: "88 bhp", torque: "114 Nm" },
    desc: "Hyundai Aura is a stylish and feature-loaded compact sedan. With a segment-first wireless charger, air purifier, large infotainment screen and class-leading CNG fuel efficiency — it offers great comfort for everyday rides.",
    category: "sedan",
  },
];

const FEAT_ICONS = {
  "WiFi Hotspot": Wifi, "Mineral Water": Coffee, "Climate Control": Thermometer,
  "GPS Navigation": Navigation, "USB Charging": Zap, "Child Seat": Shield,
  "Panoramic Sunroof": Sparkles, "Captain Seats": Users, "Spacious Boot": Settings,
  "AC": Thermometer, "Music System": Star, "Child-Friendly": Heart,
  "Wireless Charger": Zap, "Air Purifier": Shield,
};

const CATEGORIES = [
  { id: "all",   label: "All Vehicles", count: 6 },
  { id: "mpv",   label: "MPVs",         count: 4 },
  { id: "sedan", label: "Sedans",       count: 2 },
];

function StarsRow({ n = 5, size = 11 }) {
  return (
    <div className="stars-row">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < Math.floor(n) ? G : "transparent"} color={G} strokeWidth={1.5} />
      ))}
    </div>
  );
}

/* ── FLEET CARD ── */
function FleetCard({ car, listView, onCompare, comparing }) {
  const [liked, setLiked] = useState(false);

  if (listView) {
    return (
      <div className="fleet-card" style={{ animationDelay: `${(car.id % 4) * 0.08}s` }}>
        <div className="card-list-inner">
          <div className="card-img-wrap">
            <img src={car.img} alt={car.name} />
            <div className="card-img-overlay" />
            <div className="card-accent" />
            {car.badge && <div className={`card-badge ${car.badgeClass}`}>{car.badge}</div>}
            <button className={`card-wish ${liked ? "liked" : ""}`} onClick={e => { e.stopPropagation(); setLiked(p => !p); }}>
              <Heart size={14} fill={liked ? "#ef4444" : "transparent"} color={liked ? "#ef4444" : W} />
            </button>
            <div className="card-seats"><Users size={11} color={G} /> {car.seats} seats</div>
          </div>
          <div className="card-body">
            <div>
              <div className="card-type">{car.type}</div>
              <div className="card-name">{car.name}</div>
              <div className="card-rating">
                <StarsRow n={car.rating} />
                <span style={{ fontSize: ".72rem", fontWeight: 600, color: G }}>{car.rating}</span>
                <span className="rating-count">({car.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="card-specs">
                <div className="spec-item"><Users size={12} color={G} /><span>{car.seats} Passengers</span></div>
                <div className="spec-item"><Fuel size={12} color={G} /><span>{car.fuel}</span></div>
                <div className="spec-item"><Settings size={12} color={G} /><span>{car.transmission}</span></div>
                <div className="spec-item"><Zap size={12} color={G} /><span>{car.specs.power}</span></div>
                <div className="spec-item"><Navigation size={12} color={G} /><span>{car.specs.mileage}</span></div>
              </div>
              <div className="card-feats">
                {car.feats.slice(0, 5).map((f, i) => {
                  const Ic = FEAT_ICONS[f] || CheckCircle;
                  return <div key={i} className="feat-chip"><Ic size={10} />{f}</div>;
                })}
              </div>
              <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginBottom: 16 }}>{car.desc}</p>
            </div>
            <div className="card-footer">
              <div className="card-price">
                <div className="price-from">Starting from</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <div className="price-val">{car.price}</div>
                  <div className="price-unit">{car.unit}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
               
                <button className="btn btn-sm" style={{ "--color": G, "--color2": D }}>
                  Book Now <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-accent" />
      </div>
    );
  }

  return (
    <div className="fleet-card" style={{ animationDelay: `${(car.id % 4) * 0.08}s` }}>
      <div className="card-img-wrap">
        <img src={car.img} alt={car.name} />
        <div className="card-img-overlay" />
        <div className="card-accent" />
        {car.badge && <div className={`card-badge ${car.badgeClass}`}>{car.badge}</div>}
        <button className={`card-wish ${liked ? "liked" : ""}`} onClick={e => { e.stopPropagation(); setLiked(p => !p); }}>
          <Heart size={13} fill={liked ? "#ef4444" : "transparent"} color={liked ? "#ef4444" : W} />
        </button>
        <div className="card-seats"><Users size={10} color={G} /> {car.seats} seats</div>
      </div>
      <div className="card-body">
        <div className="card-type">{car.type}</div>
        <div className="card-name">{car.name}</div>
        <div className="card-rating">
          <StarsRow n={car.rating} />
          <span style={{ fontSize: ".7rem", fontWeight: 600, color: G }}>{car.rating}</span>
          <span className="rating-count">({car.reviews.toLocaleString()})</span>
        </div>
        <div className="card-specs">
          <div className="spec-item"><Users size={11} color={G} /><span>{car.seats} Seats</span></div>
          <div className="spec-item"><Fuel size={11} color={G} /><span>{car.fuel}</span></div>
          <div className="spec-item"><Settings size={11} color={G} /><span>{car.transmission}</span></div>
          <div className="spec-item"><Navigation size={11} color={G} /><span>{car.specs.mileage}</span></div>
        </div>
        <div className="card-feats">
          {car.feats.slice(0, 4).map((f, i) => {
            const Ic = FEAT_ICONS[f] || CheckCircle;
            return <div key={i} className="feat-chip"><Ic size={10} />{f}</div>;
          })}
        </div>
        <div className="card-footer">
          <div className="card-price">
            <div className="price-from">From</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
              <div className="price-val">{car.price}</div>
              <div className="price-unit">{car.unit}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
         
            <button className="btn btn-sm" style={{ "--color": G, "--color2": D }}>
              Book <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function FleetPage() {
  const [category, setCategory]   = useState("all");
  const [listView, setListView]   = useState(false);
  const [compareCars, setCompareCars] = useState([]);
  const [v, setV]                 = useState(false);

  useEffect(() => { setTimeout(() => setV(true), 100); }, []);

  const filtered = category === "all" ? CARS : CARS.filter(c => c.category === category);

  function toggleCompare(car) {
    setCompareCars(prev => {
      if (prev.find(c => c.id === car.id)) return prev.filter(c => c.id !== car.id);
      if (prev.length >= 3) return [...prev.slice(1), car];
      return [...prev, car];
    });
  }

  return (
    <>
      <style>{CSS}</style>

      {/* HERO */}
      <section className="fleet-hero">
        <img className="hero-bg-img" src="https://images.pexels.com/photos/19341583/pexels-photo-19341583.jpeg" alt="" />
        <div className="hero-noise" />
        <div className="hero-grid-lines" />
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-tag-row">
            <div className="label-tag" style={{ opacity: v ? 1 : 0, transition: "opacity .6s .1s" }}>Our Fleet</div>
            <div className="hero-live-badge" style={{ opacity: v ? 1 : 0, transition: "opacity .6s .3s" }}>
              <div className="hero-live-dot" />
              200+ Vehicles Live
            </div>
          </div>
          <h1 className="garamond" style={{ fontSize: "clamp(2.8rem,5.5vw,5.5rem)", fontWeight: 700, lineHeight: 1.02, color: W, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(36px)", transition: "all 1s .3s cubic-bezier(.22,1,.36,1)" }}>
            Drive in <span className="shimmer-gold">Absolute</span><br />
            <em style={{ fontWeight: 300, fontStyle: "italic" }}>Elegance</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: "clamp(.84rem,1.4vw,.95rem)", lineHeight: 1.9, maxWidth: 500, marginTop: 20, opacity: v ? 1 : 0, transition: "all .9s .5s ease" }}>
            From compact city sedans to premium hybrid MPVs — every vehicle is meticulously maintained, chauffeur-driven, and available 24/7 across India.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap", opacity: v ? 1 : 0, transition: "all .9s .7s ease" }}>
            <button className="btn btn-lg" style={{ "--color": G, "--color2": D }}>Explore Fleet</button>
            <button className="btn btn-white btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={13} /> Book a Ride
            </button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="filter-section">
        <div className="filter-inner">
          {CATEGORIES.map(cat => (
            <button key={cat.id} className={`filter-tab ${category === cat.id ? "active" : ""}`} onClick={() => setCategory(cat.id)}>
              {cat.label}
              <span className="filter-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SORT ROW */}
      <div className="sort-row">
        <div className="sort-label">
          Showing <span>{filtered.length} vehicles</span>
          {category !== "all" && <> in <span style={{ textTransform: "capitalize" }}>{category.toUpperCase()}</span></>}
        </div>
        <div className="sort-controls">
          <select className="sort-select">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
            <option>Most Booked</option>
          </select>
          <div className="view-toggle">
            <button className={`view-btn ${!listView ? "active" : ""}`} onClick={() => setListView(false)} title="Grid View">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </button>
            <button className={`view-btn ${listView ? "active" : ""}`} onClick={() => setListView(true)} title="List View">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* FLEET GRID */}
      <div className="fleet-section">
        <div className={`fleet-grid ${listView ? "list-view" : ""}`}>
          {filtered.map(car => (
            <FleetCard
              key={car.id}
              car={car}
              listView={listView}
              onCompare={toggleCompare}
              comparing={compareCars.some(c => c.id === car.id)}
            />
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="fleet-cta">
        <div className="fleet-cta-bg">
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85" alt="" />
        </div>
        <div className="fleet-cta-content">
          <div>
            <div className="label-tag">Ready to Ride?</div>
            <h2 className="garamond" style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", fontWeight: 700, color: W, marginTop: 12, lineHeight: 1.1 }}>
              Can't Find<br /><span className="shimmer-gold">What You Need?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: "clamp(.84rem,1.4vw,.92rem)", lineHeight: 1.85, marginTop: 16, maxWidth: 420 }}>
              We have a constantly expanding fleet. Call our concierge team to discuss custom vehicle requirements — from vintage cars to entire coach fleets.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <button className="btn btn-lg" style={{ "--color": G, "--color2": D }}>Book Now</button>
              <button className="btn btn-white btn-lg" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Phone size={13} /> +91 9XXXXXXXXX
              </button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { icon: Shield, title: "Fully Insured",     desc: "All vehicles carry comprehensive insurance for total peace of mind." },
              { icon: Clock,  title: "24/7 Availability", desc: "Book any time, day or night. Our fleet is always ready when you are." },
              { icon: MapPin, title: "Pan India Service", desc: "From metro cities to hill stations — we operate in 15+ cities across India." },
              { icon: Award,  title: "Certified Drivers", desc: "All chauffeurs are police-verified, trained and professionally licensed." },
            ].map((f, i) => (
              <div key={i}
                style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: "18px 20px", transition: "border-color .3s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,193,7,.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"}
              >
                <f.icon size={20} color={G} style={{ marginBottom: 10 }} />
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontWeight: 700, color: W, marginBottom: 5 }}>{f.title}</div>
                <div style={{ fontSize: ".74rem", color: "rgba(255,255,255,.38)", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARE BAR */}
      <div className={`compare-bar ${compareCars.length > 0 ? "visible" : ""}`}>
        <div className="compare-inner">
          <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.5)", letterSpacing: ".08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Compare</div>
          <div className="compare-slots">
            {[0, 1, 2].map(i => (
              <div key={i} className={`compare-slot ${compareCars[i] ? "filled" : ""}`}>
                {compareCars[i] ? (
                  <>
                    <span>{compareCars[i].name}</span>
                    <button onClick={() => toggleCompare(compareCars[i])} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,193,7,.6)", padding: 0, display: "flex" }}><X size={12} /></button>
                  </>
                ) : `Slot ${i + 1}`}
              </div>
            ))}
          </div>
          <button className="btn btn-sm" style={{ "--color": G, "--color2": D }} disabled={compareCars.length < 2}>
            Compare Now
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.3)", padding: "4px" }} onClick={() => setCompareCars([])}>
            <X size={15} />
          </button>
        </div>
      </div>
    </>
  );
}