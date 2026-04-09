import { useState, useEffect } from "react";
import {
  Car, Plane, Building2, Heart, MapPin, Moon, Phone, Navigation,
  ChevronRight, CheckCircle, Star, Users, Clock, Shield,
  Wifi, Coffee, Thermometer, ChevronLeft,
  Play, Crown, Zap, Menu, X,
  CalendarDays, HeadphonesIcon, BadgeCheck, Timer,
  Globe, Award, TrendingUp, Sparkles, ArrowRight,
} from "lucide-react";

/* ─── TOKENS ─── */
const G  = "#ffc107";
const D  = "#0a0a0a";
const D2 = "#111111";
const W  = "#ffffff";
const BG = "#f7f7f5";

/* ─── CSS ─── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');

  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; background: ${BG}; color: ${D}; overflow-x: hidden; }
  img  { display: block; max-width: 100%; }
  a    { text-decoration: none; color: inherit; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${D}; }
  ::-webkit-scrollbar-thumb { background: ${G}; border-radius: 2px; }
  .gg { font-family: 'Cormorant Garamond', serif; }

  @keyframes shimmer    { 0%{background-position:-400% center} 100%{background-position:400% center} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
  @keyframes kenBurns   { 0%{transform:scale(1)} 100%{transform:scale(1.07)} }
  @keyframes dotBlink   { 0%,100%{opacity:.3} 50%{opacity:1} }
  @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(255,193,7,.5)} 70%{box-shadow:0 0 0 14px rgba(255,193,7,0)} 100%{box-shadow:0 0 0 0 rgba(255,193,7,0)} }
  @keyframes scaleIn    { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }

  .shimmer-gold {
    background: linear-gradient(90deg,#b8860b 0%,${G} 25%,#fff8dc 50%,${G} 75%,#b8860b 100%);
    background-size: 300% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 5s linear infinite;
  }

  /* ── SKEW BUTTON (same as FleetPage) ── */
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
  .btn-sm  { padding: .48em 1.1em; font-size: .7rem; }
  .btn-md  { padding: .7em 1.8em;  font-size: .8rem; }
  .btn-lg  { padding: .9em 2.2em;  font-size: .86rem; }
  .btn-xl  { padding: 1em 2.6em;   font-size: .9rem; }
  .btn-white { --color: ${W}; --color2: ${D}; }
  .btn-dark  { --color: ${D}; --color2: ${W}; }
  

  /* ── LABEL ── */
  .lbl { display:inline-flex;align-items:center;gap:10px;font-size:.64rem;letter-spacing:.26em;text-transform:uppercase;font-weight:600;color:${G};font-family:'Poppins',sans-serif; }
  .lbl::before { content:'';display:block;width:26px;height:1.5px;background:${G}; }
  .lbl-dark { color: rgba(255,193,7,.75); }
  .lbl-dark::before { background: rgba(255,193,7,.75); }

  /* ── NAV ── */
  .nav { position:fixed;inset:0 0 auto 0;z-index:200;transition:background .4s,box-shadow .4s; }
  .nav.sc { background:rgba(10,10,10,.97);backdrop-filter:blur(24px);box-shadow:0 1px 0 rgba(255,193,7,.1); }
  .nl { font-size:.74rem;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,.65);transition:color .3s;position:relative;padding-bottom:3px;cursor:pointer; }
  .nl::after { content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:${G};transition:width .3s; }
  .nl:hover,.nl.act { color:${G}; }
  .nl:hover::after,.nl.act::after { width:100%; }

  /* ── SERVICE CARD ── */
  .sv-card {
    background: ${W}; overflow: hidden; position: relative;
    transition: all .45s cubic-bezier(.4,0,.2,1);
    border: 1px solid rgba(0,0,0,.06);
    cursor: pointer;
  }
  .sv-card::after { content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:${G};transform:scaleX(0);transform-origin:left;transition:transform .4s ease; }
  .sv-card:hover { transform:translateY(-8px);box-shadow:0 28px 64px rgba(0,0,0,.14);border-color:rgba(255,193,7,.2); }
  .sv-card:hover::after { transform:scaleX(1); }
  .sv-card .card-img img { transition: transform .6s ease; }
  .sv-card:hover .card-img img { transform: scale(1.07); }

  /* ── FEATURE CARD ── */
  .feat-card { background:${W};border:1px solid rgba(0,0,0,.07);border-radius:4px;padding:22px 24px;display:flex;align-items:flex-start;gap:12px;transition:all .3s; }
  .feat-card:hover { border-color:${G};transform:translateY(-4px);box-shadow:0 12px 40px rgba(255,193,7,.1); }

  /* ── WHY CARD ── */
  .why-card { background:rgba(255,255,255,.02);padding:32px 28px;transition:all .35s;border-bottom:1px solid rgba(255,255,255,.04);border-right:1px solid rgba(255,255,255,.04); }
  .why-card:hover { background:rgba(255,193,7,.05); }

  /* ── TAB ── */
  .sd-tab { border-bottom:2px solid transparent;cursor:pointer;transition:all .3s;font-family:'Poppins',sans-serif;font-weight:600;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;padding:14px 0 12px;color:rgba(0,0,0,.35);background:none;border-top:none;border-left:none;border-right:none; }
  .sd-tab:hover { color:${D}; }
  .sd-tab.act { border-bottom-color:${G};color:${D}; }

  /* ── INPUT ── */
  .ri { width:100%;background:rgba(255,255,255,.06);border:none;border-bottom:1.5px solid rgba(255,193,7,.28);color:${W};font-family:'Poppins',sans-serif;font-size:.87rem;padding:12px 4px 10px;outline:none;transition:border-color .3s; }
  .ri::placeholder { color:rgba(255,255,255,.32); }
  .ri:focus { border-bottom-color:${G}; }

  
  /* ── PROCESS STEP ── */
  .ps-num { width:56px;height:56px;border-radius:50%;border:1.5px solid rgba(255,193,7,.25);background:rgba(255,193,7,.06);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .4s; }
  .ps-wrap:hover .ps-num { background:rgba(255,193,7,.15);border-color:${G}; }

  /* ═══════════════════════════════════
     FULLY RESPONSIVE BREAKPOINTS
  ═══════════════════════════════════ */

  /* ── LARGE TABLETS (≤1100px) ── */
  @media(max-width:1100px){
    .services-row1 { grid-template-columns: 1fr 1fr !important; }
    .services-row2 { grid-template-columns: 1fr 1fr !important; }
    .services-row3 { grid-template-columns: 1fr 1fr !important; }
    .why-split    { grid-template-columns: 1fr !important; }
    .why-grid     { grid-template-columns: 1fr 1fr !important; }
    .step-grid    { grid-template-columns: repeat(3,1fr) !important; }
    .step-line    { display: none !important; }
    .detail-overview-grid { grid-template-columns: 1fr !important; }
    .detail-feat-grid { grid-template-columns: 1fr 1fr !important; }
  }

  /* ── TABLETS (≤768px) ── */
  @media(max-width:768px){
    .nav-links    { display: none !important; }
    .nav-right    { display: none !important; }
    .mob-btn      { display: flex !important; }
    .hero-h1      { font-size: clamp(2.6rem,9vw,4rem) !important; }
    .hero-btns    { flex-direction: column !important; align-items: flex-start !important; }
    .hero-btns .btn { width: 100%; max-width: 320px; justify-content: center; }
    .services-row1 { grid-template-columns: 1fr !important; }
    .services-row2 { grid-template-columns: 1fr !important; }
    .services-row3 { grid-template-columns: 1fr !important; }
    .why-grid     { grid-template-columns: 1fr !important; }
    .step-grid    { grid-template-columns: 1fr 1fr !important; }
    .testi-grid   { grid-template-columns: 1fr !important; }
    .cta-btns     { flex-direction: column !important; align-items: flex-start !important; }
    .cta-btns .btn { width: 100%; max-width: 300px; justify-content: center; }
    .section-pad  { padding: 64px 5% !important; }
    .detail-hero  { height: 56vw !important; min-height: 300px !important; }
    .detail-tab-row { gap: 16px !important; overflow-x: auto !important; }
    .detail-feat-grid { grid-template-columns: 1fr !important; }
    .detail-step-grid { grid-template-columns: 1fr 1fr !important; }
    .detail-book-grid { grid-template-columns: 1fr !important; }
    .detail-hlights { flex-wrap: wrap !important; gap: 16px !important; }
    .why-sticky   { position: static !important; }
  }

  /* ── MOBILE (≤480px) ── */
  @media(max-width:480px){
    .hero-h1       { font-size: clamp(2.2rem,11vw,3rem) !important; }
    .step-grid     { grid-template-columns: 1fr !important; }
    .testi-grid    { grid-template-columns: 1fr !important; }
    .overview-header { flex-direction: column !important; align-items: flex-start !important; }
    .detail-step-grid { grid-template-columns: 1fr !important; }
    .section-pad   { padding: 48px 4% !important; }
    .detail-body   { padding: 32px 4% !important; }
    .detail-tab-row { padding: 0 4% !important; gap: 12px !important; }
    .detail-tab-row .sd-tab { font-size: .68rem !important; }
    .detail-hlights { flex-direction: column !important; gap: 12px !important; }
    .detail-price-row { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
  }

  /* ── MOBILE MENU ── */
  .mob-menu { position:fixed;inset:0;background:rgba(10,10,10,.98);z-index:500;display:flex;flex-direction:column;padding:24px 6%;animation:fadeIn .25s ease; }
  .mob-link { font-size:1.1rem;font-weight:500;color:rgba(255,255,255,.75);padding:16px 0;border-bottom:1px solid rgba(255,255,255,.06);letter-spacing:.05em;text-transform:uppercase;font-family:'Poppins',sans-serif;cursor:pointer;transition:color .2s; }
  .mob-link:hover { color:${G}; }
`;

/* ─── DATA ─── */
const SERVICES = [
  {
    id:"city", icon:Car, title:"City Transfers", short:"Seamless city rides, 24/7",
    desc:"Whether it's a quick hop across town or a lengthy cross-city journey, our City Transfer service delivers on-time, every time. Fully tracked, professionally driven, and always comfortable.",
    img:"https://i.pinimg.com/1200x/56/c0/81/56c081f273a22b8c8bce76a79e32f625.jpg",
    heroImg:"https://images.pexels.com/photos/15039402/pexels-photo-15039402.jpeg",
    features:["Real-time GPS tracking","Professional licensed driver","Guaranteed on-time pickup","Air conditioned vehicle","In-app & SMS updates","Instant booking confirmation"],
    highlights:[{icon:Clock,val:"<3 min",label:"Avg response"},{icon:Users,val:"4–7",label:"Seats available"},{icon:Shield,val:"100%",label:"Insured rides"}],
    process:["Book in 60 seconds via app or call","Driver assigned & confirmed instantly","Track your driver live on the map","Arrive comfortably at your destination"],
    startPrice:"₹299",
  },
  {
    id:"airport", icon:Plane, title:"Airport Pickup & Drop", short:"Zero-stress terminal service",
    desc:"We track your flight in real time. Your driver is at the terminal before you land — signboard in hand. No waiting, no stress. Premium airport transfers for travellers who value their time.",
    img:"https://i.pinimg.com/736x/92/9a/d2/929ad2dbb020214642ae9611381b6b20.jpg",
    heroImg:"https://i.pinimg.com/736x/5d/fa/bf/5dfabf9795caa75712d204a4526cb961.jpg",
    features:["Live flight tracking system","Meet & greet inside terminal","30–60 min free waiting time","Name board at arrival gate","Complimentary water provided","All major airports covered"],
    highlights:[{icon:Plane,val:"60 min",label:"Free wait time"},{icon:BadgeCheck,val:"100%",label:"Flight tracked"},{icon:Globe,val:"50+",label:"Airports served"}],
    process:["Share your flight number at booking","We track and monitor your flight","Driver waits inside arrival terminal","Smooth ride to your destination"],
    startPrice:"₹599",
  },
  {
    id:"corporate", icon:Building2, title:"Corporate Travel", short:"Business-class reliability",
    desc:"Dedicated corporate accounts, monthly consolidated billing, GST invoicing, and an employee travel dashboard. We manage your entire company's ground transportation so you can focus on business.",
    img:"https://i.pinimg.com/736x/9e/e9/88/9ee988d12ce040fbbd39af9fbe32f162.jpg",
    heroImg:"https://i.pinimg.com/1200x/e4/c6/81/e4c6810f7e2b7f43ef3c6024ce255452.jpg",
    features:["Dedicated account manager","Consolidated monthly billing","GST invoice for every trip","Multi-employee booking dashboard","Custom pickup protocols","Priority fleet guarantee"],
    highlights:[{icon:Building2,val:"500+",label:"Corporate clients"},{icon:TrendingUp,val:"99.2%",label:"On-time rate"},{icon:Award,val:"#1",label:"Rated in India"}],
    process:["Contact us for a tailored corporate quote","We set up your company dashboard","Employees book instantly via app","Monthly report & single invoice"],
    startPrice:"Custom",
  },
  {
    id:"wedding", icon:Heart, title:"Weddings & Events", short:"Make every moment perfect",
    desc:"Decorated luxury fleets, suited chauffeurs, and meticulous timing for your most important day. We coordinate with your event team to ensure every arrival and departure is seamless and cinematic.",
    img:"https://i.pinimg.com/736x/a3/5f/9e/a35f9e439ce6eb6aef70595faa1b829b.jpg",
    heroImg:"https://i.pinimg.com/1200x/3d/5b/72/3d5b7221283deabea687a51631a218cf.jpg",
    features:["Flower-decorated vehicles","Suited & groomed chauffeurs","Multi-car fleet coordination","Precise event timeline management","Venue-to-venue logistics","Red carpet arrival service"],
    highlights:[{icon:Heart,val:"2000+",label:"Weddings served"},{icon:Crown,val:"5★",label:"Average rating"},{icon:CalendarDays,val:"6 mo",label:"Advance booking"}],
    process:["Discuss your event requirements","We assign a dedicated coordinator","Decorated fleet inspected & prepared","Flawless execution on your big day"],
    startPrice:"₹3,999",
  },
  {
    id:"outstation", icon:MapPin, title:"Outstation Trips", short:"Comfortable long-distance journeys",
    desc:"Plan a hill station escape, a temple pilgrimage or a business road trip. Our outstation service covers pan-India destinations with experienced highway drivers, transparent pricing and zero hidden charges.",
    img:"https://i.pinimg.com/736x/d5/29/aa/d529aabf6a541b2ca3da0be80028e7e7.jpg",
    heroImg:"https://images.pexels.com/photos/14178831/pexels-photo-14178831.jpeg",
    features:["Pan India destination coverage","Experienced highway drivers","Tolls & driver allowance included","One-way and round trips","Flexible multi-day bookings","Transparent fare breakdown"],
    highlights:[{icon:MapPin,val:"500+",label:"Destinations"},{icon:Timer,val:"24/7",label:"On the road"},{icon:Shield,val:"Insured",label:"All trips"}],
    process:["Enter origin, destination & dates","Get instant transparent fare quote","Driver confirmed 24 hrs in advance","Enjoy a smooth, scenic long drive"],
    startPrice:"₹1,299",
  },
  {
    id:"night", icon:Moon, title:"Night Packages", short:"Safe after-hours transportation",
    desc:"Night rides deserve extra care. Our vetted night-package drivers are specifically trained for after-hours city and outstation travel. Safe, discreet, and absolutely reliable — whenever you need us.",
    img:"https://images.pexels.com/photos/36893554/pexels-photo-36893554.jpeg",
    heroImg:"https://images.pexels.com/photos/27814175/pexels-photo-27814175.jpeg",
    features:["Night-certified vetted drivers","Enhanced safety protocols","Women safety features in-app","SOS button & live family sharing","Discreet & professional service","Available 10 PM – 6 AM daily"],
    highlights:[{icon:Shield,val:"SOS",label:"In-app safety"},{icon:BadgeCheck,val:"Vetted",label:"Night drivers"},{icon:Clock,val:"10PM–6AM",label:"Service hours"}],
    process:["Book via app or call from 8 PM","Verified night driver confirmed","Share live location with loved ones","Safe, discreet door-to-door service"],
    startPrice:"₹449",
  },
  {
    id:"selfdrive", icon:Navigation, title:"Self Drive Rental", short:"Drive on your own terms",
    desc:"Freedom to explore at your own pace. Rent from our premium fleet of clean, well-maintained vehicles with no driver. Choose hourly, daily or weekly packages and hit the road your way.",
    img:"https://images.pexels.com/photos/13633258/pexels-photo-13633258.jpeg",
    heroImg:"https://images.pexels.com/photos/16563133/pexels-photo-16563133.jpeg",
    features:["Clean, sanitised vehicles daily","Flexible hourly / daily / weekly plans","Zero deposit on select plans","Fuel-efficient modern fleet","24/7 roadside assistance","GPS enabled for all rentals"],
    highlights:[{icon:Navigation,val:"50+",label:"Car models"},{icon:CalendarDays,val:"Hourly",label:"Min rental"},{icon:HeadphonesIcon,val:"24/7",label:"Road support"}],
    process:["Choose vehicle & rental duration","Upload licence — verified in minutes","Pick up the car or get it delivered","Return hassle-free, no hidden costs"],
    startPrice:"₹799",
  },
  {
    id:"chauffeur", icon:Crown, title:"Chauffeur Services", short:"Personal chauffeur on demand",
    desc:"Hire a dedicated chauffeur for a half-day, full day or longer engagements. Perfect for VIP guests, high-profile meetings, roadshows and occasions where only the best will do.",
    img:"https://images.pexels.com/photos/36377058/pexels-photo-36377058.jpeg",
    heroImg:"https://images.pexels.com/photos/36377053/pexels-photo-36377053.jpeg",
    features:["Suited, groomed chauffeurs","Half-day & full-day hire available","Multiple stops & flexible routing","Luxury vehicle of your choice","Absolute discretion guaranteed","Concierge-level assistance"],
    highlights:[{icon:Crown,val:"Elite",label:"Vehicle class"},{icon:Users,val:"VIP",label:"Level service"},{icon:Award,val:"Top 1%",label:"Chauffeurs"}],
    process:["Select vehicle and hire duration","Chauffeur briefed on your itinerary","Immaculate pickup at your location","Entire day at your disposal"],
    startPrice:"₹2,499",
  },
];

const TESTIMONIALS = [
  { name:"Ankit Saxena",  role:"Startup Founder, Delhi",    stars:5, svc:"Airport Pickup",    img:"https://randomuser.me/api/portraits/men/32.jpg",   text:"My 4AM international flight — the driver was at Terminal 3 before I landed. Spotted the signboard the second I walked out. Impeccable service every single week." },
  { name:"Meera Joshi",   role:"Event Manager, Mumbai",     stars:5, svc:"Weddings & Events",  img:"https://randomuser.me/api/portraits/women/44.jpg",  text:"CarCab handled our 8-car wedding convoy seamlessly. Every driver was punctual, suited, and the cars were gorgeous. Our client cried happy tears pulling up in that fleet." },
  { name:"Vikram Nair",   role:"Corporate Travel Head",     stars:5, svc:"Corporate Travel",   img:"https://randomuser.me/api/portraits/men/58.jpg",    text:"We moved our entire executive travel to CarCab. The dashboard is brilliant, the billing is clean, and the reliability is something we haven't seen from any other provider." },
  { name:"Priya Kumari",  role:"Solo Traveller, Bangalore", stars:5, svc:"Night Package",      img:"https://randomuser.me/api/portraits/women/65.jpg",  text:"As a woman who travels late for work, the Night Package genuinely gives me peace of mind. Live sharing, in-app SOS, polite driver — I wouldn't use anything else." },
];

function Stars({ n = 5, size = 12 }) {
  return (
    <div style={{ display:"flex", gap:2 }}>
      {Array.from({ length:n }).map((_,i) => <Star key={i} size={size} fill={G} color={G}/>)}
    </div>
  );
}

/* ─── NAV ─── */
function Nav({ onBack }) {
  const [sc, setSc]   = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Services","Fleet","About","Contact"];
  return (
    <>

      {mob && (
        <div className="mob-menu">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
            <div className="gg" style={{ fontSize:"1.6rem", fontWeight:700, color:W }}>Car<span style={{ color:G }}>Cab</span></div>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:W }} onClick={() => setMob(false)}><X size={22}/></button>
          </div>
          {links.map(l => <div key={l} className="mob-link" onClick={() => setMob(false)}>{l}</div>)}
          <div style={{ marginTop:32, display:"flex", flexDirection:"column", gap:10 }}>
            <button className="btn btn-md btn-white" style={{ justifyContent:"center" }}><Phone size={13}/> Call Us</button>
            <button className="btn btn-md btn-pulse" style={{ justifyContent:"center" }}>Book Now</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── HERO BANNER ─── */
function HeroBanner() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 120); }, []);
  return (
    <section style={{ position:"relative", height:"100vh", minHeight:600, overflow:"hidden", background:D }}>
      <img
        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1800&q=90"
        alt=""
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.32, animation:"kenBurns 14s ease-in-out infinite alternate", transformOrigin:"center" }}
      />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(115deg,rgba(10,10,10,.96) 0%,rgba(10,10,10,.7) 55%,rgba(10,10,10,.35) 100%)" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,10,10,.8) 0%,transparent 50%)" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(rgba(255,193,7,.025) 1px,transparent 1px)`, backgroundSize:"48px 48px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:"6%", top:"18%", bottom:"18%", width:"2px", background:`linear-gradient(to bottom,transparent,${G},transparent)`, opacity:.25 }}/>

      <div style={{ position:"relative", zIndex:2, height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 7%", paddingTop:76 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:22, opacity:vis?1:0, transition:"opacity .7s .1s" }}>
          <span style={{ color:G, fontFamily:"'Poppins',sans-serif", fontSize:".72rem", cursor:"pointer" }}>Home</span>
          <ChevronRight size={12} color="rgba(255,255,255,.3)"/>
          <span style={{ color:"rgba(255,255,255,.4)", fontFamily:"'Poppins',sans-serif", fontSize:".72rem" }}>Services</span>
        </div>
        <div className="lbl" style={{ opacity:vis?1:0, transition:"opacity .7s .18s" }}>What We Offer</div>
        <h1 className={`gg hero-h1`} style={{ fontSize:"clamp(3.2rem,6.5vw,6rem)", fontWeight:700, lineHeight:1.03, marginTop:16, color:W, opacity:vis?1:0, transform:vis?"none":"translateY(42px)", transition:"all 1s .3s cubic-bezier(.22,1,.36,1)" }}>
          Our <span className="shimmer-gold">Services</span><br/>
          <em style={{ fontStyle:"italic", fontWeight:300, fontSize:"88%" }}>Built Around Your Journey</em>
        </h1>
        <p style={{ color:"rgba(255,255,255,.48)", fontSize:"clamp(.84rem,1.4vw,.97rem)", lineHeight:1.9, maxWidth:520, marginTop:20, opacity:vis?1:0, transform:vis?"none":"translateY(20px)", transition:"all .9s .55s ease" }}>
          Eight premium services covering every aspect of your travel — city rides, airports, corporate trips, weddings, outstation and more.
        </p>
        <div className="hero-btns" style={{ display:"flex", gap:14, marginTop:36, flexWrap:"wrap", opacity:vis?1:0, transition:"opacity .9s .7s" }}>
          <button className="btn btn-xl btn-pulse">Explore Services <ArrowRight size={14}/></button>
          <button className="btn btn-xl btn-white" style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:"rgba(0,0,0,.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Play size={9} fill={D} color={D}/>
            </div>
            Watch Our Story
          </button>
        </div>
      </div>

      <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:2, opacity:.45 }}>
        <span style={{ color:W, fontSize:".6rem", letterSpacing:".2em", textTransform:"uppercase", fontFamily:"'Poppins',sans-serif" }}>Scroll</span>
        <div style={{ width:1, height:38, background:`linear-gradient(${G},transparent)` }}/>
      </div>
    </section>
  );
}

/* ─── SERVICES OVERVIEW ─── */
function ServicesOverview({ onSelect }) {
  const [hov, setHov] = useState(null);

  function Card({ s, imgH }) {
    const h = hov === s.id;
    const Icon = s.icon;
    return (
      <div className="sv-card" onMouseEnter={() => setHov(s.id)} onMouseLeave={() => setHov(null)} onClick={() => onSelect(s)}>
        <div className="card-img" style={{ position:"relative", height:imgH, overflow:"hidden" }}>
          <img src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:h?"rgba(10,10,10,.48)":"rgba(10,10,10,.26)", transition:"background .4s" }}/>
          <div style={{ position:"absolute", top:14, left:14, width:40, height:40, background:G, borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Icon size={18} color={D} strokeWidth={2}/>
          </div>
          <div style={{ position:"absolute", bottom:14, left:14 }}>
            <div style={{ color:G, fontSize:".62rem", letterSpacing:".18em", textTransform:"uppercase", fontFamily:"'Poppins',sans-serif", fontWeight:600 }}>{s.short}</div>
          </div>
        </div>
        <div style={{ padding:"22px 24px 26px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
            <h3 className="gg" style={{ fontSize:"1.4rem", fontWeight:700, color:D, marginBottom:8 }}>{s.title}</h3>
            <div style={{ color:G, fontSize:".72rem", fontFamily:"'Poppins',sans-serif", fontWeight:700, flexShrink:0 }}>from {s.startPrice}</div>
          </div>
          <p style={{ color:"#888", fontSize:".84rem", lineHeight:1.75, marginBottom:14 }}>{s.desc.substring(0,110)}…</p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {s.features.slice(0,3).map((f,fi) => (
              <div key={fi} style={{ display:"flex", alignItems:"center", gap:5, color:"#777", fontSize:".74rem" }}>
                <CheckCircle size={10} color={G}/><span>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:16 }}>
            <button className="btn btn-sm" style={{ fontSize:".68rem" }} onClick={e => { e.stopPropagation(); onSelect(s); }}>
              View Details <ArrowRight size={10}/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section-pad" style={{ background:BG, padding:"100px 6%" }}>
      <div style={{ maxWidth:1440, margin:"0 auto" }}>
        <div className="overview-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20, marginBottom:60 }}>
          <div>
            <div className="lbl">All Services</div>
            <h2 className="gg" style={{ fontSize:"clamp(2.4rem,3.5vw,3.4rem)", fontWeight:700, color:D, marginTop:12, lineHeight:1.1 }}>
              Premium Services<br/>
              <em style={{ fontWeight:300, fontStyle:"italic", color:"#999" }}>Tailored for Every Journey</em>
            </h2>
          </div>
          <p style={{ maxWidth:380, color:"#888", fontSize:".88rem", lineHeight:1.85 }}>
            Each service is designed with precision — from booking to drop-off, every detail is managed so you never have to worry.
          </p>
        </div>

        {/* Row 1: 2 large */}
        <div className="services-row1" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"rgba(0,0,0,.07)", marginBottom:1 }}>
          {SERVICES.slice(0,2).map(s => <Card key={s.id} s={s} imgH={280}/>)}
        </div>
        {/* Row 2: 3 medium */}
        <div className="services-row2" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"rgba(0,0,0,.07)", marginBottom:1 }}>
          {SERVICES.slice(2,5).map(s => <Card key={s.id} s={s} imgH={220}/>)}
        </div>
        {/* Row 3: 3 */}
        <div className="services-row3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"rgba(0,0,0,.07)" }}>
          {SERVICES.slice(5,8).map(s => <Card key={s.id} s={s} imgH={200}/>)}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICE DETAIL ─── */
function ServiceDetail({ service, onClose }) {
  const [tab, setTab] = useState(0);
  const tabs = ["Overview","Features","How It Works","Book Now"];
  if (!service) return null;
  const Icon = service.icon;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, overflowY:"auto", background:BG }}>
      {/* Hero */}
      <div className="detail-hero" style={{ position:"relative", height:"52vh", minHeight:320, overflow:"hidden", background:D }}>
        <img src={service.heroImg} alt={service.title} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:.32 }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(10,10,10,.65) 0%,rgba(10,10,10,.92) 100%)" }}/>
        <button onClick={onClose} style={{ position:"absolute", top:80, left:"6%", background:"rgba(255,255,255,.08)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,193,7,.2)", borderRadius:4, padding:"9px 18px", color:W, fontFamily:"'Poppins',sans-serif", fontSize:".74rem", cursor:"pointer", display:"flex", alignItems:"center", gap:6, zIndex:5 }}>
          <ChevronLeft size={13}/> Back
        </button>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", padding:"0 7%", paddingTop:80 }}>
          <div style={{ width:"100%" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
              <div style={{ width:50, height:50, background:G, borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon size={22} color={D} strokeWidth={2}/>
              </div>
              <div className="lbl lbl-dark">CarCab Service</div>
            </div>
            <h1 className="gg" style={{ fontSize:"clamp(2rem,4.5vw,4rem)", fontWeight:700, color:W, lineHeight:1.05, marginBottom:12 }}>{service.title}</h1>
            <p style={{ color:"rgba(255,255,255,.48)", fontSize:"clamp(.82rem,1.3vw,.92rem)", maxWidth:500, lineHeight:1.85, marginBottom:20 }}>{service.desc.substring(0,160)}…</p>
        
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background:W, borderBottom:"1px solid rgba(0,0,0,.08)", padding:"0 7%" }}>
        <div className="detail-tab-row" style={{ maxWidth:1280, margin:"0 auto", display:"flex", gap:32 }}>
          {tabs.map((t,i) => (
            <button key={i} className={`sd-tab${tab===i?" act":""}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="detail-body" style={{ maxWidth:1280, margin:"0 auto", padding:"56px 7%" }}>
        {tab === 0 && (
          <div className="detail-overview-grid" style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:56 }}>
            <div>
              <div className="lbl" style={{ marginBottom:14 }}>About This Service</div>
              <h2 className="gg" style={{ fontSize:"2rem", fontWeight:700, color:D, marginBottom:18 }}>{service.title}</h2>
              <p style={{ color:"#666", fontSize:".9rem", lineHeight:1.9, marginBottom:24 }}>{service.desc}</p>
              <p style={{ color:"#777", fontSize:".87rem", lineHeight:1.85 }}>
                Every {service.title.toLowerCase()} booking includes a professional licensed driver, real-time GPS tracking, digital receipt, and our signature CarCab quality guarantee.
              </p>
              <div style={{ marginTop:28, display:"flex", gap:10, flexWrap:"wrap" }}>
                <button className="btn btn-md" onClick={() => setTab(3)}>Book This Service <ArrowRight size={13}/></button>
                <button className="btn btn-md btn-white"><Phone size={13}/> Call Us</button>
              </div>
            </div>
            <div>
              <div style={{ borderRadius:4, overflow:"hidden", marginBottom:14 }}>
                <img src={service.img} alt={service.title} style={{ width:"100%", height:240, objectFit:"cover" }}/>
              </div>
              <div style={{ background:D, borderRadius:4, padding:"22px 24px" }}>
                <div className="lbl lbl-dark" style={{ marginBottom:14, fontSize:".6rem" }}>Quick Facts</div>
                {service.highlights.map((h,i) => {
                  const HIcon = h.icon;
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                      <div style={{ width:34, height:34, background:"rgba(255,193,7,.08)", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <HIcon size={15} color={G}/>
                      </div>
                      <div>
                        <div className="gg" style={{ color:G, fontSize:"1.1rem", fontWeight:700, lineHeight:1 }}>{h.val}</div>
                        <div style={{ color:"rgba(255,255,255,.4)", fontSize:".68rem", fontFamily:"'Poppins',sans-serif" }}>{h.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div>
            <div className="lbl" style={{ marginBottom:14 }}>What's Included</div>
            <h2 className="gg" style={{ fontSize:"2rem", fontWeight:700, color:D, marginBottom:32 }}>All Features</h2>
            <div className="detail-feat-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {service.features.map((f,i) => (
                <div key={i} className="feat-card">
                  <CheckCircle size={17} color={G} style={{ flexShrink:0, marginTop:1 }}/>
                  <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:".86rem", color:"#555", lineHeight:1.65 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 2 && (
          <div>
            <div className="lbl" style={{ marginBottom:14 }}>The Process</div>
            <h2 className="gg" style={{ fontSize:"2rem", fontWeight:700, color:D, marginBottom:44 }}>How It Works</h2>
            <div className="detail-step-grid step-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:28, position:"relative" }}>
              <div className="step-line" style={{ position:"absolute", top:26, left:"12%", right:"12%", height:1, background:`linear-gradient(90deg,${G},rgba(255,193,7,.15),${G})`, pointerEvents:"none" }}/>
              {service.process.map((p,i) => (
                <div key={i} className="ps-wrap" style={{ textAlign:"center" }}>
                  <div className="ps-num" style={{ margin:"0 auto 20px" }}>
                    <span className="gg shimmer-gold" style={{ fontSize:"1.2rem", fontWeight:700 }}>0{i+1}</span>
                  </div>
                  <p style={{ color:"#555", fontSize:".86rem", lineHeight:1.75, fontFamily:"'Poppins',sans-serif" }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 3 && (
          <div style={{ maxWidth:660 }}>
            <div className="lbl" style={{ marginBottom:14 }}>Quick Booking</div>
            <h2 className="gg" style={{ fontSize:"2rem", fontWeight:700, color:D, marginBottom:28 }}>Book {service.title}</h2>
            <div style={{ background:D, borderRadius:6, padding:"36px 40px", border:"1px solid rgba(255,193,7,.12)" }}>
              <div className="detail-book-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22, marginBottom:22 }}>
                {[{l:"Pickup Location",ph:"Your pickup address",t:"text"},{l:"Destination",ph:"Where to?",t:"text"},{l:"Date",ph:"",t:"date"},{l:"Time",ph:"",t:"time"}].map((f,i) => (
                  <div key={i}>
                    <div className="lbl lbl-dark" style={{ marginBottom:8, fontSize:".58rem" }}>{f.l}</div>
                    <input className="ri" type={f.t} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:24 }}>
                <div className="lbl lbl-dark" style={{ marginBottom:8, fontSize:".58rem" }}>Special Instructions</div>
                <input className="ri" type="text" placeholder="Any notes for your driver?"/>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", background:"rgba(255,193,7,.06)", borderRadius:4, border:"1px solid rgba(255,193,7,.14)", marginBottom:22 }}>
                <span style={{ color:"rgba(255,255,255,.55)", fontFamily:"'Poppins',sans-serif", fontSize:".8rem" }}>Starting from</span>
                <span className="gg shimmer-gold" style={{ fontSize:"1.6rem", fontWeight:700 }}>{service.startPrice}</span>
              </div>
              <button className="btn btn-md" style={{ width:"100%", justifyContent:"center", borderRadius:4 }}>
                Confirm Booking <ArrowRight size={13}/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── WHY US ─── */
function WhyUs() {
  const pts = [
    { icon:BadgeCheck,      title:"Verified Professionals",  desc:"Every driver undergoes a 6-step vetting process — background checks, driving tests, safety certification, and periodic reviews." },
    { icon:Clock,           title:"Punctuality Guaranteed",  desc:"We track traffic, weather and your flight in real time. If we're ever late, your next ride is on us." },
    { icon:Shield,          title:"Fully Insured Rides",     desc:"Comprehensive travel insurance on every booking. You and your belongings are covered from pickup to drop-off." },
    { icon:HeadphonesIcon,  title:"24/7 Human Support",      desc:"Real people, not bots. Our support team picks up within 90 seconds — day or night, weekday or holiday." },
  ];
  return (
    <section className="section-pad" style={{ background:D, padding:"100px 6%", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(rgba(255,193,7,.02) 1px,transparent 1px)`, backgroundSize:"40px 40px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", top:-100, right:-100, width:460, height:460, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,193,7,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ maxWidth:1440, margin:"0 auto", position:"relative" }}>
        <div className="why-split" style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:72, alignItems:"start" }}>
          <div className="why-sticky" style={{ position:"sticky", top:100 }}>
            <div className="lbl">Why CarCab</div>
            <h2 className="gg" style={{ fontSize:"clamp(2.4rem,3.5vw,3.4rem)", fontWeight:700, color:W, marginTop:14, lineHeight:1.1 }}>
              The Standard<br/>
              <span className="shimmer-gold">Others Aspire</span><br/>
              <em style={{ fontWeight:300, fontStyle:"italic", fontSize:"84%", color:"rgba(255,255,255,.42)" }}>To Reach</em>
            </h2>
            <p style={{ color:"rgba(255,255,255,.4)", fontSize:".87rem", lineHeight:1.85, marginTop:18, marginBottom:28 }}>
              Six reasons why 50,000+ riders chose CarCab — and keep coming back.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <button className="btn btn-md ">Book a Ride Today</button>
              <button className="btn btn-md btn-white" style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Phone size={13}/> Call Us Anytime
              </button>
            </div>
          </div>
          <div className="why-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"rgba(255,255,255,.04)" }}>
            {pts.map((p,i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="why-card">
                  <div style={{ width:44, height:44, background:"rgba(255,193,7,.08)", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                    <Icon size={19} color={G}/>
                  </div>
                  <h4 className="gg" style={{ fontSize:"1.18rem", fontWeight:700, color:W, marginBottom:9 }}>{p.title}</h4>
                  <p style={{ color:"rgba(255,255,255,.38)", fontSize:".82rem", lineHeight:1.75 }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
function HowItWorks() {
  const steps = [
    { n:"01", title:"Choose Your Service",     desc:"Browse all 8 premium services and pick exactly what your journey needs.",            icon:Sparkles },
    { n:"02", title:"Enter Trip Details",       desc:"Add pickup, destination, date and time. Transparent pricing shown instantly.",        icon:MapPin    },
    { n:"03", title:"Confirm & Pay Securely",   desc:"Pay via UPI, card or cash. GST invoice generated automatically for every booking.",   icon:Shield    },
    { n:"04", title:"Track Your Driver",        desc:"Watch your chauffeur arrive live on the map. ETA updated in real time.",              icon:Navigation},
    { n:"05", title:"Arrive in Comfort",        desc:"Sit back and experience the CarCab standard — from door to destination.",            icon:Crown     },
  ];
  return (
    <section className="section-pad" style={{ background:BG, padding:"100px 6%" }}>
      <div style={{ maxWidth:1440, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div className="lbl" style={{ justifyContent:"center" }}>The Process</div>
          <h2 className="gg" style={{ fontSize:"clamp(2.4rem,3.5vw,3.4rem)", fontWeight:700, color:D, marginTop:12 }}>
            Booking Made <em style={{ fontStyle:"italic", fontWeight:300, color:"#999" }}>Effortless</em>
          </h2>
        </div>
        <div className="step-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:22, position:"relative" }}>
          <div className="step-line" style={{ position:"absolute", top:27, left:"10%", right:"10%", height:1, background:`linear-gradient(90deg,${G},rgba(255,193,7,.15),${G},rgba(255,193,7,.12),${G})`, pointerEvents:"none" }}/>
          {steps.map((s,i) => (
            <div key={i} className="ps-wrap" style={{ textAlign:"center", cursor:"default" }}>
              <div className="ps-num" style={{ margin:"0 auto 20px" }}>
                <span className="gg shimmer-gold" style={{ fontSize:"1.2rem", fontWeight:700 }}>{s.n}</span>
              </div>
              <h4 className="gg" style={{ fontSize:"1.1rem", fontWeight:700, color:D, marginBottom:8 }}>{s.title}</h4>
              <p style={{ color:"#888", fontSize:".81rem", lineHeight:1.78 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  return (
    <section className="section-pad" style={{ background:BG, padding:"80px 6%", borderTop:"1px solid rgba(0,0,0,.07)" }}>
      <div style={{ maxWidth:1440, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div className="lbl" style={{ justifyContent:"center" }}>What Clients Say</div>
          <h2 className="gg" style={{ fontSize:"clamp(2.2rem,3.5vw,3.2rem)", fontWeight:700, color:D, marginTop:12 }}>
            Stories of <em style={{ fontStyle:"italic", fontWeight:300, color:"#999" }}>Delight</em>
          </h2>
        </div>
        <div className="testi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} className="tc" style={{ padding:"28px 32px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <img src={t.img} alt={t.name} style={{ width:46, height:46, borderRadius:"50%", objectFit:"cover", border:`2px solid ${G}` }}/>
                  <div>
                    <div style={{ fontWeight:600, fontSize:".9rem", color:D }}>{t.name}</div>
                    <div style={{ fontSize:".72rem", color:"#999" }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                  <Stars n={t.stars} size={11}/>
                  <div style={{ background:"rgba(255,193,7,.1)", border:"1px solid rgba(255,193,7,.2)", borderRadius:100, padding:"2px 10px", fontSize:".6rem", color:G, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase" }}>{t.svc}</div>
                </div>
              </div>
              <p style={{ color:"#666", fontSize:".86rem", lineHeight:1.8, fontStyle:"italic" }}>"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER ─── */
function CTABanner() {
  return (
    <div style={{ position:"relative", overflow:"hidden" }}>
      <img src="https://images.pexels.com/photos/8425047/pexels-photo-8425047.jpeg" alt="" style={{ width:"100%", height:420, objectFit:"cover", display:"block" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(10,10,10,.94) 0%,rgba(10,10,10,.62) 55%,rgba(10,10,10,.28) 100%)" }}/>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", padding:"0 7%" }}>
        <div style={{ maxWidth:580 }}>
          <div className="lbl">Ready for a Premium Ride?</div>
          <h2 className="gg" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:700, color:W, marginTop:14, lineHeight:1.1 }}>
            Book Any Service<br/><span className="shimmer-gold">In Under 60 Seconds</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,.48)", fontSize:".92rem", lineHeight:1.85, marginTop:18, maxWidth:400 }}>
            Professional drivers, immaculate vehicles, guaranteed on-time — CarCab raises the standard of every journey.
          </p>
          <div className="cta-btns" style={{ display:"flex", gap:12, marginTop:32, flexWrap:"wrap" }}>
            <button className="btn btn-lg">Book a Ride Now</button>
            <button className="btn btn-lg btn-white" style={{ display:"flex", alignItems:"center", gap:8 }}>
              <Phone size={13}/> Call Us Anytime
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ─── */
export default function Service() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <style>{CSS}</style>
      <Nav/>
      {selected ? (
        <ServiceDetail service={selected} onClose={() => setSelected(null)}/>
      ) : (
        <>
          <HeroBanner/>
          <ServicesOverview onSelect={setSelected}/>
          <WhyUs/>
          <HowItWorks/>
        
          <CTABanner/>
        </>
      )}
    </>
  );
}