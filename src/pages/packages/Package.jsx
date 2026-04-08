import { useState, useEffect, useRef } from "react";
import {
  Car, Plane, Building2, Heart, MapPin, Moon, Phone, Mail, MessageCircle,
  CheckCircle, X, ArrowRight, ChevronLeft, ChevronRight,
  Shield, Clock, Users, Wifi, Coffee, Star,
  Zap, Crown, Gem, Sparkles, Navigation, Thermometer,
  Calendar, CreditCard, HeadphonesIcon, Tag, Info,
  ChevronDown, ChevronUp, Play, Menu
} from "lucide-react";

/* ── DESIGN TOKENS ─────────────────────────────────── */
const G  = "#ffc107";
const D  = "#0e0e0e";
const W  = "#ffffff";
const BG = "#f7f7f5";
const G2 = "#e6ac00";

/* ── GLOBAL CSS ────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; background: ${BG}; color: ${D}; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${D}; }
  ::-webkit-scrollbar-thumb { background: ${G}; border-radius: 2px; }
  a { text-decoration: none; color: inherit; }
  .g { font-family: 'Cormorant Garamond', serif; }

  /* ── Keyframes ── */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(52px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes fadeLeft { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
  @keyframes shimmer  { 0%{background-position:-400% center;} 100%{background-position:400% center;} }
  @keyframes rotateSlow { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes pulse3   { 0%,100%{box-shadow:0 0 0 0 rgba(255,193,7,.55);} 70%{box-shadow:0 0 0 18px rgba(255,193,7,0);} }
  @keyframes float    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
  @keyframes marquee  { from{transform:translateX(0);} to{transform:translateX(-50%);} }
  @keyframes bgPan    { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
  @keyframes scaleIn  { from{opacity:0;transform:scale(.9);} to{opacity:1;transform:scale(1);} }
  @keyframes lineGrow { from{width:0;} to{width:100%;} }
  @keyframes borderAnim { 0%,100%{border-color:rgba(255,193,7,.2);} 50%{border-color:rgba(255,193,7,.8);} }
  @keyframes glowPulse { 0%,100%{opacity:.4;} 50%{opacity:1;} }

  .au  { animation: fadeUp    .85s cubic-bezier(.22,1,.36,1) both; }
  .af  { animation: fadeIn    .75s ease both; }
  .al  { animation: fadeLeft  .8s  cubic-bezier(.22,1,.36,1) both; }
  .afl { animation: float     4.5s ease-in-out infinite; }
  .ap  { animation: pulse3    2.2s infinite; }
  .ar  { animation: rotateSlow 24s linear infinite; }
  .as  { animation: scaleIn   .9s  cubic-bezier(.22,1,.36,1) both; }

  .shimmer {
    background: linear-gradient(90deg,#9a6b00 0%,${G} 20%,#fff8d6 48%,${G} 76%,#9a6b00 100%);
    background-size: 300% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 5s linear infinite;
  }

  /* ── Navbar ── */
  .nav {
    position:fixed; inset:0 0 auto 0; z-index:200;
    transition: background .4s, backdrop-filter .4s, box-shadow .4s;
  }
  .nav.s {
    background: rgba(14,14,14,.97);
    backdrop-filter: blur(24px);
    box-shadow: 0 1px 0 rgba(255,193,7,.1);
  }
  .nl {
    font-size:.77rem; letter-spacing:.1em; text-transform:uppercase;
    color:rgba(255,255,255,.68); transition:color .3s; position:relative; padding-bottom:3px;
  }
  .nl::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1.5px; background:${G}; transition:width .3s; }
  .nl:hover { color:${G}; }
  .nl:hover::after { width:100%; }
  .nl.active { color:${G}; }
  .nl.active::after { width:100%; }

  /* ── Buttons ── */
  .bg {
    background:${G}; color:${D}; border:none; cursor:pointer;
    font-family:'Poppins',sans-serif; font-weight:700;
    letter-spacing:.07em; text-transform:uppercase;
    transition:all .35s cubic-bezier(.4,0,.2,1);
    position:relative; overflow:hidden;
  }
  .bg::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent); transform:translateX(-100%); transition:transform .5s; }
  .bg:hover { box-shadow:0 12px 38px rgba(255,193,7,.48); transform:translateY(-3px); }
  .bg:hover::before { transform:translateX(100%); }

  .bo {
    background:transparent; cursor:pointer;
    font-family:'Poppins',sans-serif; font-weight:500;
    letter-spacing:.07em; text-transform:uppercase;
    transition:all .35s;
  }
  .bo-dark { color:${D}; border:1.5px solid rgba(0,0,0,.2); }
  .bo-dark:hover { border-color:${D}; background:rgba(0,0,0,.05); transform:translateY(-2px); }
  .bo-light { color:${W}; border:1.5px solid rgba(255,193,7,.3); }
  .bo-light:hover { border-color:${G}; color:${G}; background:rgba(255,193,7,.06); transform:translateY(-2px); }

  /* ── Labels ── */
  .lbl {
    display:inline-flex; align-items:center; gap:10px;
    font-size:.7rem; letter-spacing:.28em; text-transform:uppercase;
    font-weight:600; color:${G}; font-family:'Poppins',sans-serif;
  }
  .lbl::before { content:''; display:block; width:28px; height:1.5px; background:${G}; }

  /* ── Package cards ── */
  .pc {
    position:relative; overflow:hidden;
    transition:all .45s cubic-bezier(.4,0,.2,1);
    cursor:pointer;
  }
  .pc:hover { transform:translateY(-10px); box-shadow:0 32px 80px rgba(0,0,0,.22); }
  .pc.featured { box-shadow:0 24px 64px rgba(255,193,7,.18); }
  .pc.featured:hover { box-shadow:0 40px 100px rgba(255,193,7,.28); }

  /* ── Comparison table ── */
  .ct-row { transition:background .25s; }
  .ct-row:hover { background:rgba(255,193,7,.04) !important; }

  /* ── FAQ ── */
  .faq-item { border-bottom:1px solid rgba(0,0,0,.07); overflow:hidden; }
  .faq-q {
    width:100%; background:none; border:none; cursor:pointer;
    display:flex; justify-content:space-between; align-items:center;
    padding:22px 0; text-align:left;
    font-family:'Poppins',sans-serif; font-weight:600; font-size:.9rem; color:${D};
    transition:color .3s;
  }
  .faq-q:hover { color:${G}; }
  .faq-a { overflow:hidden; transition:max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s; }

  /* ── Marquee ── */
  .mq-wrap { overflow:hidden; }
  .mq-inner { display:flex; width:max-content; animation:marquee 22s linear infinite; }
  .mq-inner:hover { animation-play-state:paused; }

  /* ── Ride input ── */
  .ri {
    width:100%; background:rgba(255,255,255,.06); border:none;
    border-bottom:1.5px solid rgba(255,193,7,.3);
    color:${W}; font-family:'Poppins',sans-serif; font-size:.87rem;
    padding:12px 4px 10px; outline:none; transition:border-color .3s;
  }
  .ri::placeholder { color:rgba(255,255,255,.33); }
  .ri:focus { border-bottom-color:${G}; }
  .ri option { background:#1a1a1a; }

  /* ── Addon cards ── */
  .addon-card {
    border:1.5px solid rgba(0,0,0,.08);
    transition:all .35s ease; cursor:pointer; position:relative;
  }
  .addon-card:hover { border-color:${G}; box-shadow:0 12px 40px rgba(255,193,7,.12); transform:translateY(-4px); }
  .addon-card.selected { border-color:${G}; background:rgba(255,193,7,.04); }

  /* ── Testimonial ── */
  .tc { background:${W}; transition:all .4s; box-shadow:0 4px 28px rgba(0,0,0,.07); }
  .tc:hover { transform:translateY(-6px); box-shadow:0 20px 56px rgba(0,0,0,.13); }
  .tc::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,${G},transparent); }

  /* ── Step connector ── */
  .step-dot { width:52px; height:52px; border-radius:50%; background:rgba(255,193,7,.07); border:1.5px solid rgba(255,193,7,.25); display:flex; align-items:center; justify-content:center; }

  @media(max-width:1024px){
    .pkg-grid { grid-template-columns:1fr !important; }
    .cmp-table { font-size:.78rem !important; }
    .hero-split { grid-template-columns:1fr !important; }
  }
  @media(max-width:768px){
    .addon-grid { grid-template-columns:1fr 1fr !important; }
    .step-grid  { grid-template-columns:1fr 1fr !important; }
    .hide-sm    { display:none !important; }
    .stat-grid  { grid-template-columns:1fr 1fr !important; }
  }
`;

/* ── DATA ──────────────────────────────────────────── */
const PACKAGES = [
  {
    id:"economy",
    name:"Economy",
    tagline:"Smart Rides, Everyday Value",
    price:299,
    unit:"/trip",
    badge:null,
    icon:Car,
    color:"light",
    img:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&q=85",
    carImg:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80",
    vehicles:["Maruti Swift Dzire","Hyundai Xcent","Toyota Etios"],
    capacity:4,
    luggage:2,
    features:[
      "Air Conditioned Sedan",
      "Up to 4 Passengers",
      "City Limits Coverage",
      "Professional Driver",
      "Basic Insurance Cover",
      "In-App Tracking",
    ],
    notIncluded:["WiFi Hotspot","Complimentary Refreshments","Meet & Greet","Flight Tracking","Intercity Travel"],
    highlight:"Perfect for daily commutes, short city rides and budget-conscious travel.",
  },
  {
    id:"premium",
    name:"Premium",
    tagline:"Elevated Comfort, Every Journey",
    price:799,
    unit:"/trip",
    badge:"Most Popular",
    icon:Crown,
    color:"dark",
    img:"https://images.unsplash.com/photo-1563720223185-11003d516935?w=900&q=85",
    carImg:"https://images.unsplash.com/photo-1550355291-bbee04a92027?w=700&q=80",
    vehicles:["Toyota Innova Crysta","Kia Carnival","Maruti Ertiga"],
    capacity:6,
    luggage:4,
    features:[
      "Luxury SUV or MPV",
      "Up to 6 Passengers",
      "Intercity Transfers",
      "Complimentary Water & WiFi",
      "Flight Tracking Included",
      "Priority 24/7 Support",
      "Comprehensive Insurance",
      "In-App & SMS Tracking",
    ],
    notIncluded:["Meet & Greet Inside Terminal","Champagne on Arrival","Personal Concierge"],
    highlight:"Our bestseller — the perfect balance of luxury, space and outstanding value.",
  },
  {
    id:"elite",
    name:"Elite",
    tagline:"The Pinnacle of Premium Travel",
    price:1499,
    unit:"/trip",
    badge:"Luxury Class",
    icon:Gem,
    color:"gold",
    img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=85",
    carImg:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&q=80",
    vehicles:["Mercedes GLE","BMW 5 Series","Audi A6"],
    capacity:4,
    luggage:3,
    features:[
      "Mercedes, BMW or Audi",
      "Up to 4 Passengers",
      "Pan India Travel",
      "Meet & Greet — Terminal Door",
      "Champagne on Arrival",
      "Personal 24/7 Concierge",
      "Premium WiFi Hotspot",
      "Fully Comprehensive Insurance",
      "Executive Privacy Screen",
      "Chilled Beverages & Snacks",
    ],
    notIncluded:[],
    highlight:"For those who demand nothing less than extraordinary. Every detail perfected.",
  },
  {
    id:"corporate",
    name:"Corporate",
    tagline:"Seamless Business Travel at Scale",
    price:null,
    unit:"Custom",
    badge:"Business",
    icon:Building2,
    color:"light",
    img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85",
    carImg:"https://images.unsplash.com/photo-1590362891991-f776e747a588?w=700&q=80",
    vehicles:["Mercedes E-Class","Audi A6","Toyota Vellfire"],
    capacity:6,
    luggage:4,
    features:[
      "Dedicated Account Manager",
      "Monthly Consolidated Billing",
      "Multiple Simultaneous Bookings",
      "GST Invoices Included",
      "Employee Travel Dashboard",
      "Custom Pickup Protocols",
      "Airport Lounge Coordination",
      "Branded Driver Uniforms",
      "Real-time Fleet Tracking",
      "Priority SLA Guarantee",
    ],
    notIncluded:[],
    highlight:"Tailored enterprise solutions for companies that value time, professionalism and reliability.",
  },
];

const ADDONS = [
  { icon:Wifi,          name:"WiFi Hotspot",       desc:"High-speed 4G in-car connectivity", price:"₹49/trip" },
  { icon:Coffee,        name:"Refreshment Pack",   desc:"Water, juice & premium snacks",      price:"₹99/trip" },
  { icon:HeadphonesIcon,name:"Meet & Greet",       desc:"Driver waits inside the terminal",   price:"₹149/trip"},
  { icon:Shield,        name:"Comprehensive Cover", desc:"Full trip insurance upgrade",        price:"₹79/trip" },
  { icon:Calendar,      name:"Pre-scheduled Rides", desc:"Book up to 30 days in advance",     price:"Free"     },
  { icon:Navigation,    name:"Multi-stop Route",   desc:"Add up to 3 stops on any ride",      price:"₹129/trip"},
  { icon:Thermometer,   name:"Climate Control",    desc:"Pre-cooled / heated cabin on arrival",price:"₹59/trip"},
  { icon:CreditCard,    name:"Corporate Billing",  desc:"Monthly invoice & GST receipt",      price:"Free"     },
];

const COMPARE_ROWS = [
  { label:"Vehicle Class",     economy:"Sedan",       premium:"Luxury SUV/MPV",  elite:"Mercedes/BMW/Audi", corporate:"Executive Fleet" },
  { label:"Max Passengers",    economy:"4",           premium:"6",               elite:"4",                 corporate:"6" },
  { label:"Intercity Travel",  economy:false,         premium:true,              elite:true,                corporate:true  },
  { label:"WiFi Hotspot",      economy:false,         premium:true,              elite:true,                corporate:true  },
  { label:"Flight Tracking",   economy:false,         premium:true,              elite:true,                corporate:true  },
  { label:"Meet & Greet",      economy:false,         premium:false,             elite:true,                corporate:true  },
  { label:"24/7 Support",      economy:"Basic",       premium:"Priority",        elite:"Personal Concierge",corporate:"Dedicated Manager" },
  { label:"Complimentary Water",economy:false,        premium:true,              elite:true,                corporate:true  },
  { label:"Champagne Welcome", economy:false,         premium:false,             elite:true,                corporate:false },
  { label:"GST Invoice",       economy:true,          premium:true,              elite:true,                corporate:true  },
  { label:"Insurance",         economy:"Basic",       premium:"Comprehensive",   elite:"Full Cover",        corporate:"Full Cover" },
  { label:"Corporate Billing", economy:false,         premium:false,             elite:false,               corporate:true  },
];

const FAQS = [
  { q:"Can I cancel or modify my booking?", a:"Yes, free cancellation is available up to 2 hours before your scheduled pickup. Modifications can be made anytime through the app or by calling our support line. Premium and Elite bookings receive extended cancellation windows of 4 hours." },
  { q:"Is there a waiting charge if my flight is delayed?", a:"We track all flights in real time. Our drivers wait at no extra charge for up to 60 minutes after your updated landing time for Premium and Elite packages. Economy packages include 30 minutes of complimentary waiting." },
  { q:"How are your drivers vetted?", a:"All CarCab chauffeurs undergo a 6-step verification process — background checks, commercial driving licence validation, defensive driving training, customer service certification, vehicle inspection and a 3-month probationary period with us." },
  { q:"Can I book a package for multiple passengers across different locations?", a:"Yes. Our Corporate package supports multiple simultaneous bookings with a single account. You can manage all rides from one dashboard, receive consolidated billing and set custom pickup protocols per employee." },
  { q:"What vehicles are available for the Elite package?", a:"Elite rides are fulfilled in Mercedes GLE, BMW 5 Series or Audi A6 — depending on availability in your city. You can request a specific model when booking. All Elite vehicles are under 3 years old and kept to a showroom standard." },
  { q:"Are outstation trips available for all packages?", a:"Outstation travel is available for Premium, Elite and Corporate packages. Economy is limited to city limits only. For outstation trips, a driver allowance and toll charges are included transparently at checkout — no hidden surprises." },
  { q:"Do you offer monthly or subscription plans?", a:"Yes. We offer monthly ride bundles for individuals and subscription-based corporate accounts. Contact our team or visit the Corporate section to get a custom quote tailored to your travel frequency and destinations." },
];

const TESTIMONIALS = [
  { name:"Rohit Gupta",   role:"Managing Director, PropTech India", stars:5, pkg:"Elite",     img:"https://randomuser.me/api/portraits/men/41.jpg",   text:"The Elite package is genuinely unlike anything else in India. The Mercedes was spotless, the driver impeccably dressed, and there was actual champagne waiting. Our international clients were stunned." },
  { name:"Anya Singh",    role:"HR Head, TechNova Solutions",       stars:5, pkg:"Corporate", img:"https://randomuser.me/api/portraits/women/33.jpg",  text:"CarCab's Corporate package has completely transformed our employee travel. One dashboard, one invoice every month, zero headaches. Our team loves the professionalism." },
  { name:"Dev Malhotra",  role:"Frequent Flyer",                    stars:5, pkg:"Premium",   img:"https://randomuser.me/api/portraits/men/58.jpg",    text:"Premium is my weekly airport ride. They track my flight, the driver is always there before I land, and the Innova is always clean and cold. Genuinely five-star every single time." },
  { name:"Kavya Reddy",   role:"Wedding Planner, Celebrations Co.", stars:5, pkg:"Elite",     img:"https://randomuser.me/api/portraits/women/62.jpg",  text:"We used the Elite fleet for an entire wedding — 10 cars, 2 days. Every driver was on time, professionally dressed, and the cars were beautifully maintained. Perfect execution." },
];

/* ── HELPERS ───────────────────────────────────────── */
function Stars({n=5}) {
  return <div style={{display:"flex",gap:2}}>{Array.from({length:n}).map((_,i)=><Star key={i} size={11} fill={G} color={G}/>)}</div>;
}

function Check({ok, label, dark}) {
  if (typeof ok === "string") return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <CheckCircle size={14} color={G}/>
      <span style={{fontSize:".82rem",color:dark?"rgba(255,255,255,.65)":"#555",fontFamily:"'Poppins',sans-serif"}}>{ok}</span>
    </div>
  );
  if (ok === true) return <CheckCircle size={17} color={G}/>;
  return <X size={16} color="rgba(150,150,150,.5)"/>;
}


/* ── HERO ──────────────────────────────────────────── */
function Hero() {
  const [v,setV]=useState(false);
  useEffect(()=>{setTimeout(()=>setV(true),100);},[]);
  return (
    <section style={{position:"relative",minHeight:560,overflow:"hidden",background:D,paddingTop:76}}>
      <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=90" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.22}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(110deg,rgba(14,14,14,.97) 0%,rgba(14,14,14,.72) 55%,rgba(14,14,14,.35) 100%)"}}/>
   \
      <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(rgba(255,193,7,.028) 1px,transparent 1px)`,backgroundSize:"40px 40px",pointerEvents:"none"}}/>

      <div style={{position:"relative",zIndex:2,maxWidth:1280,margin:"0 auto",padding:"80px 6% 96px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}} className="hero-split">
        {/* Left */}
        <div>
          <div className="lbl" style={{opacity:v?1:0,transition:"opacity .7s .1s"}} >Our Packages</div>
          <h1 className="g" style={{fontSize:"clamp(3rem,5.5vw,5.2rem)",fontWeight:700,lineHeight:1.03,marginTop:18,color:W,opacity:v?1:0,transform:v?"none":"translateY(38px)",transition:"all 1s .3s cubic-bezier(.22,1,.36,1)"}}>
            Travel <span className="shimmer">Packages</span><br/>
            <em style={{fontStyle:"italic",fontWeight:300,fontSize:"90%"}}>Crafted for Every Need</em>
          </h1>
          <p style={{color:"rgba(255,255,255,.48)",fontSize:".95rem",lineHeight:1.9,maxWidth:480,marginTop:22,opacity:v?1:0,transition:"all .9s .55s ease"}}>
            From everyday city commutes to ultra-luxury cross-country journeys — choose a CarCab package that fits your lifestyle, schedule and budget.
          </p>
          <div style={{display:"flex",gap:14,marginTop:36,flexWrap:"wrap",opacity:v?1:0,transition:"all .9s .75s ease"}}>
            <button className="bg" style={{padding:"14px 36px",borderRadius:2,fontSize:".82rem"}}>Compare Packages</button>
            <button className="bo bo-light" style={{padding:"14px 36px",borderRadius:2,fontSize:".82rem",display:"flex",alignItems:"center",gap:8}}>
              <Phone size={13}/> Talk to Us
            </button>
          </div>
          {/* Breadcrumb */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:40,color:"rgba(255,255,255,.3)",fontSize:".72rem",opacity:v?1:0,transition:"all .9s .9s ease"}}>
            <a href="#" style={{color:G,fontFamily:"'Poppins',sans-serif"}}>Home</a>
            <ChevronRight size={12}/>
            <span>Packages</span>
          </div>
        </div>

      
      </div>
    </section>
  );
}

/* ── PACKAGE CARDS ─────────────────────────────────── */
function PackageCards() {
  const [sel,setSel] = useState("premium");

  const cardStyle = (pkg) => {
    const isSel = sel===pkg.id;
    const base = {
      border: pkg.color==="dark"
        ? `1px solid rgba(255,193,7,${isSel?.5:.22})`
        : pkg.color==="gold"
          ? `1px solid rgba(255,193,7,${isSel?.7:.35})`
          : `1px solid rgba(0,0,0,${isSel?.12:.07})`,
      background: pkg.color==="dark"
        ? "linear-gradient(168deg,#1a1200,#0a0800)"
        : pkg.color==="gold"
          ? `linear-gradient(168deg,#1c1300,#0d0a00)`
          : W,
      boxShadow: isSel
        ? pkg.color!=="light" ? "0 24px 72px rgba(255,193,7,.2)" : "0 24px 72px rgba(0,0,0,.14)"
        : "none",
      transform: isSel ? "translateY(-6px)" : "none",
    };
    return base;
  };

  return (
    <section style={{background:BG,padding:"100px 6%"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div className="lbl" style={{justifyContent:"center"}}>Choose Your Plan</div>
          <h2 className="g" style={{fontSize:"clamp(2.4rem,3.5vw,3.5rem)",fontWeight:700,color:D,marginTop:12,lineHeight:1.1}}>
            Our Four Package Tiers
          </h2>
          <p style={{color:"#888",fontSize:".9rem",lineHeight:1.85,maxWidth:500,margin:"14px auto 0"}}>
            Every package includes a professional licensed driver, GST invoice and real-time tracking. Select what fits your journey.
          </p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,background:"rgba(0,0,0,.06)",borderRadius:4,overflow:"hidden"}} className="pkg-grid">
          {PACKAGES.map((pkg,i)=>{
            const Icon=pkg.icon;
            const isDark=pkg.color==="dark"||pkg.color==="gold";
            const isSel=sel===pkg.id;
            return (
              <div key={pkg.id} className={`pc${pkg.id==="premium"?" featured":""}`}
                style={{...cardStyle(pkg),borderRadius:0}} onClick={()=>setSel(pkg.id)}>
                {/* Image header */}
                <div style={{position:"relative",height:220,overflow:"hidden"}}>
                  <img src={pkg.img} alt={pkg.name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:isDark?.72:.52,transform:isSel?"scale(1.05)":"scale(1)",transition:"transform .6s ease"}}/>
                  <div style={{position:"absolute",inset:0,background:isDark?"linear-gradient(to bottom,rgba(14,14,14,.2),rgba(14,14,14,.88))":"linear-gradient(to bottom,rgba(0,0,0,.05),rgba(0,0,0,.72))"}}/>
                  {pkg.badge&&(
                    <div style={{position:"absolute",top:14,right:14,background:G,color:D,padding:"4px 12px",borderRadius:20,fontSize:".63rem",fontWeight:700,fontFamily:"'Poppins',sans-serif",letterSpacing:".08em",display:"flex",alignItems:"center",gap:4}}>
                      <Sparkles size={10}/>{pkg.badge}
                    </div>
                  )}
                  {/* Icon */}
                  <div style={{position:"absolute",bottom:18,left:20,display:"flex",alignItems:"flex-end",gap:12}}>
                    <div style={{width:42,height:42,background:G,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <Icon size={19} color={D} strokeWidth={2}/>
                    </div>
                    <div>
                      <div style={{color:isDark?G:"rgba(255,255,255,.6)",fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600}}>{pkg.tagline.split(",")[0]}</div>
                      <h3 className="g" style={{fontSize:"1.75rem",fontWeight:700,color:W,lineHeight:1}}>{pkg.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div style={{padding:"24px 24px 0"}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                    {pkg.price ? (
                      <>
                        <span className="g" style={{fontSize:"2.5rem",fontWeight:700,color:isDark?G:D}}>{`₹${pkg.price}`}</span>
                        <span style={{color:isDark?"rgba(255,255,255,.35)":"#bbb",fontFamily:"'Poppins',sans-serif",fontSize:".78rem"}}>{pkg.unit}</span>
                      </>
                    ) : (
                      <span className="g" style={{fontSize:"1.5rem",fontWeight:700,color:isDark?G:D}}>Custom Pricing</span>
                    )}
                  </div>
                  <p style={{color:isDark?"rgba(255,255,255,.45)":"#888",fontSize:".8rem",lineHeight:1.7,marginTop:8,fontFamily:"'Poppins',sans-serif"}}>{pkg.highlight}</p>

                  {/* Capacity */}
                  <div style={{display:"flex",gap:16,marginTop:16,paddingTop:16,borderTop:`1px solid ${isDark?"rgba(255,193,7,.09)":"rgba(0,0,0,.07)"}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:5,color:isDark?"rgba(255,255,255,.45)":"#999",fontSize:".76rem"}}>
                      <Users size={12} color={G}/>{pkg.capacity} passengers
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:5,color:isDark?"rgba(255,255,255,.45)":"#999",fontSize:".76rem"}}>
                      <Zap size={12} color={G}/>{pkg.luggage} bags
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div style={{padding:"18px 24px",flex:1}}>
                  <div style={{display:"flex",flexDirection:"column",gap:9}}>
                    {pkg.features.slice(0,6).map((f,fi)=>(
                      <div key={fi} style={{display:"flex",alignItems:"center",gap:8}}>
                        <CheckCircle size={13} color={G}/>
                        <span style={{fontSize:".8rem",color:isDark?"rgba(255,255,255,.62)":"#555",fontFamily:"'Poppins',sans-serif"}}>{f}</span>
                      </div>
                    ))}
                    {pkg.features.length>6&&(
                      <div style={{color:G,fontSize:".76rem",fontFamily:"'Poppins',sans-serif",fontWeight:600,marginTop:4}}>+{pkg.features.length-6} more included →</div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div style={{padding:"0 24px 28px"}}>
                  <button className={isDark?"bg":"bo bo-dark"} style={{width:"100%",padding:"13px",borderRadius:2,fontSize:".78rem",color:isDark?D:D,background:isDark?G:"transparent",border:isDark?"none":"1.5px solid rgba(0,0,0,.16)"}}>
                    {pkg.price ? `Book ${pkg.name}` : "Get a Quote"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected detail expansion */}
        {(() => {
          const pkg = PACKAGES.find(p=>p.id===sel);
          const isDark = pkg.color==="dark"||pkg.color==="gold";
          return (
            <div style={{marginTop:1,background:isDark?`linear-gradient(135deg,#1a1200,#0a0800)`:W,border:isDark?"1px solid rgba(255,193,7,.15)":"1px solid rgba(0,0,0,.07)",padding:"44px 52px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:40,animation:"scaleIn .5s ease both"}} className="pkg-grid">
              {/* All features */}
              <div>
                <div style={{color:G,fontSize:".68rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600,marginBottom:18}}>All Included Features</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {pkg.features.map((f,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:9}}>
                      <CheckCircle size={14} color={G}/>
                      <span style={{fontSize:".83rem",color:isDark?"rgba(255,255,255,.65)":"#555",fontFamily:"'Poppins',sans-serif"}}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Not included */}
              <div>
                {pkg.notIncluded.length>0&&(
                  <>
                    <div style={{color:"#aaa",fontSize:".68rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600,marginBottom:18}}>Not Included</div>
                    <div style={{display:"flex",flexDirection:"column",gap:10}}>
                      {pkg.notIncluded.map((f,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:9}}>
                          <X size={14} color="rgba(150,150,150,.5)"/>
                          <span style={{fontSize:".83rem",color:isDark?"rgba(255,255,255,.3)":"#bbb",fontFamily:"'Poppins',sans-serif",textDecoration:"line-through"}}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {pkg.notIncluded.length===0&&(
                  <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,193,7,.08)",border:"1px solid rgba(255,193,7,.2)",borderRadius:4,padding:"16px 18px",marginTop:4}}>
                    <Sparkles size={18} color={G}/>
                    <span style={{color:isDark?W:D,fontSize:".82rem",fontFamily:"'Poppins',sans-serif",fontWeight:500}}>Everything is included — absolutely nothing held back.</span>
                  </div>
                )}
              </div>
              {/* Vehicles */}
              <div>
                <div style={{color:G,fontSize:".68rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600,marginBottom:18}}>Available Vehicles</div>
                <div style={{position:"relative",borderRadius:4,overflow:"hidden",height:160,marginBottom:16}}>
                  <img src={pkg.carImg} alt={pkg.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(14,14,14,.6),transparent)"}}/>
                </div>
                {pkg.vehicles.map((v,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <Car size={13} color={G}/>
                    <span style={{fontSize:".82rem",color:isDark?"rgba(255,255,255,.6)":"#555",fontFamily:"'Poppins',sans-serif"}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

/* ── COMPARISON TABLE ──────────────────────────────── */
function ComparisonTable() {
  const cols = ["economy","premium","elite","corporate"];
  const colNames = {economy:"Economy",premium:"Premium",elite:"Elite",corporate:"Corporate"};
  const colColors = {economy:"#555",premium:G,elite:G,corporate:"#aaa"};

  return (
    <section style={{background:D,padding:"100px 6%"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div className="lbl" style={{justifyContent:"center"}}>Side by Side</div>
          <h2 className="g" style={{fontSize:"clamp(2.4rem,3.5vw,3.5rem)",fontWeight:700,color:W,marginTop:12}}>
            Full <span className="shimmer">Package Comparison</span>
          </h2>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:".88rem",marginTop:14,maxWidth:440,margin:"14px auto 0"}}>Every feature, every difference — all laid out clearly so you can choose with confidence.</p>
        </div>

        <div style={{overflowX:"auto"}} className="cmp-table">
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Poppins',sans-serif"}}>
            {/* Header */}
            <thead>
              <tr style={{borderBottom:"1px solid rgba(255,193,7,.12)"}}>
                <th style={{padding:"14px 20px",textAlign:"left",color:"rgba(255,255,255,.35)",fontSize:".7rem",letterSpacing:".2em",textTransform:"uppercase",fontWeight:600,width:"28%"}}>Feature</th>
                {cols.map(c=>(
                  <th key={c} style={{padding:"14px 20px",textAlign:"center",width:"18%"}}>
                    <div style={{color:colColors[c],fontSize:".75rem",letterSpacing:".12em",textTransform:"uppercase",fontWeight:700}}>{colNames[c]}</div>
                    {c==="premium"&&<div style={{display:"inline-block",background:G,color:D,padding:"2px 8px",borderRadius:10,fontSize:".58rem",fontWeight:700,marginTop:4}}>POPULAR</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row,i)=>(
                <tr key={i} className="ct-row" style={{borderBottom:"1px solid rgba(255,255,255,.04)",background:i%2===0?"rgba(255,255,255,.015)":"transparent"}}>
                  <td style={{padding:"14px 20px",color:"rgba(255,255,255,.55)",fontSize:".83rem"}}>{row.label}</td>
                  {cols.map(c=>(
                    <td key={c} style={{padding:"14px 20px",textAlign:"center"}}>
                      {typeof row[c]==="boolean"
                        ? row[c]
                          ? <div style={{display:"flex",justifyContent:"center"}}><CheckCircle size={16} color={G}/></div>
                          : <div style={{display:"flex",justifyContent:"center"}}><X size={15} color="rgba(120,120,120,.5)"/></div>
                        : <span style={{color:c==="premium"||c==="elite"?G:"rgba(255,255,255,.5)",fontSize:".8rem",fontWeight:c==="premium"?600:400}}>{row[c]}</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── ADD-ONS ───────────────────────────────────────── */
function Addons() {
  const [picked,setPicked]=useState(new Set(["addon-0","addon-4"]));
  const toggle=(id)=>{
    setPicked(p=>{const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n;});
  };
  return (
    <section style={{background:BG,padding:"100px 6%"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:20,marginBottom:60}}>
          <div>
            <div className="lbl">Enhance Your Ride</div>
            <h2 className="g" style={{fontSize:"clamp(2.4rem,3.5vw,3.5rem)",fontWeight:700,color:D,marginTop:12}}>
              Premium <em style={{fontStyle:"italic",fontWeight:300,color:"#888"}}>Add-ons</em>
            </h2>
          </div>
          <p style={{maxWidth:380,color:"#888",fontSize:".88rem",lineHeight:1.85}}>
            Customise any package with à la carte upgrades. Add what you want — pay only for what you choose.
          </p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}} className="addon-grid">
          {ADDONS.map((a,i)=>{
            const id=`addon-${i}`;
            const Icon=a.icon;
            const on=picked.has(id);
            return (
              <div key={i} className={`addon-card${on?" selected":""}`} style={{background:W,borderRadius:4,padding:"28px 24px",position:"relative"}} onClick={()=>toggle(id)}>
                {on&&(
                  <div style={{position:"absolute",top:12,right:12,width:20,height:20,background:G,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <CheckCircle size={11} color={D}/>
                  </div>
                )}
                <div style={{width:46,height:46,background:on?"rgba(255,193,7,.12)":"rgba(0,0,0,.04)",borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,transition:"background .3s"}}>
                  <Icon size={20} color={on?G:"#aaa"}/>
                </div>
                <h4 style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:".9rem",color:D,marginBottom:6}}>{a.name}</h4>
                <p style={{color:"#999",fontSize:".78rem",lineHeight:1.65,marginBottom:14}}>{a.desc}</p>
                <div style={{color:G,fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:".88rem"}}>{a.price}</div>
              </div>
            );
          })}
        </div>
        {/* Summary bar */}
        {picked.size>0&&(
          <div style={{marginTop:28,background:D,borderRadius:4,padding:"20px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,border:"1px solid rgba(255,193,7,.18)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Sparkles size={17} color={G}/>
              <span style={{color:W,fontFamily:"'Poppins',sans-serif",fontSize:".85rem"}}>{picked.size} add-on{picked.size>1?"s":""} selected</span>
            </div>
            <button className="bg" style={{padding:"11px 28px",borderRadius:2,fontSize:".78rem"}}>Add to Booking →</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── BOOKING WIDGET ────────────────────────────────── */
function BookingWidget() {
  const [step,setStep]=useState(1);
  const [pkg,setPkg]=useState("premium");

  return (
    <section style={{background:D,padding:"100px 6%",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(rgba(255,193,7,.02) 1px,transparent 1px)`,backgroundSize:"36px 36px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:-120,left:"50%",transform:"translateX(-50%)",width:600,height:350,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(255,193,7,.05) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:860,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <div className="lbl" style={{justifyContent:"center"}}>Ready to Ride?</div>
          <h2 className="g" style={{fontSize:"clamp(2.4rem,3.5vw,3.5rem)",fontWeight:700,color:W,marginTop:12}}>
            Book Your Package <span className="shimmer">Now</span>
          </h2>
        </div>

        {/* Step indicators */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,marginBottom:44}}>
          {["Choose Package","Trip Details","Confirmation"].map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:step>i+1?G:step===i+1?"rgba(255,193,7,.15)":"rgba(255,255,255,.05)",border:`1.5px solid ${step>=i+1?G:"rgba(255,255,255,.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s"}}>
                  {step>i+1
                    ? <CheckCircle size={14} color={D}/>
                    : <span style={{color:step===i+1?G:"rgba(255,255,255,.25)",fontSize:".72rem",fontFamily:"'Poppins',sans-serif",fontWeight:700}}>{i+1}</span>
                  }
                </div>
                <span style={{color:step===i+1?G:"rgba(255,255,255,.3)",fontSize:".66rem",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600,whiteSpace:"nowrap"}}>{s}</span>
              </div>
              {i<2&&<div style={{width:80,height:"1px",background:`linear-gradient(90deg,${step>i+1?G:"rgba(255,255,255,.1)"},${step>i+2?G:"rgba(255,255,255,.1)"})`,margin:"0 8px",marginBottom:22,flexShrink:0}}/>}
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{background:"rgba(255,255,255,.04)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,193,7,.12)",borderRadius:4,padding:"44px 48px"}}>
          {step===1&&(
            <div>
              <div style={{color:W,fontFamily:"'Poppins',sans-serif",fontSize:".82rem",marginBottom:20,fontWeight:500}}>Select your package tier</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:32}}>
                {PACKAGES.map(p=>(
                  <div key={p.id} onClick={()=>setPkg(p.id)} style={{
                    padding:"16px 12px",borderRadius:4,cursor:"pointer",textAlign:"center",
                    background:pkg===p.id?"rgba(255,193,7,.1)":"rgba(255,255,255,.03)",
                    border:`1.5px solid ${pkg===p.id?G:"rgba(255,255,255,.08)"}`,
                    transition:"all .3s"
                  }}>
                    <div className="g" style={{color:pkg===p.id?G:W,fontSize:"1.1rem",fontWeight:700}}>{p.name}</div>
                    {p.price
                      ? <div style={{color:pkg===p.id?G:"rgba(255,255,255,.4)",fontFamily:"'Poppins',sans-serif",fontSize:".72rem",marginTop:4}}>₹{p.price}/trip</div>
                      : <div style={{color:pkg===p.id?G:"rgba(255,255,255,.4)",fontFamily:"'Poppins',sans-serif",fontSize:".72rem",marginTop:4}}>Custom</div>
                    }
                  </div>
                ))}
              </div>
              <button className="bg" style={{padding:"14px 38px",borderRadius:2,fontSize:".82rem"}} onClick={()=>setStep(2)}>
                Continue — {PACKAGES.find(p=>p.id===pkg)?.name} <ArrowRight size={13} style={{marginLeft:6}}/>
              </button>
            </div>
          )}
          {step===2&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,marginBottom:32}}>
                {[
                  {l:"Pickup Location",ph:"Enter full address",t:"text"},
                  {l:"Destination",ph:"Where are you going?",t:"text"},
                  {l:"Travel Date",ph:"",t:"date"},
                  {l:"Pickup Time",ph:"",t:"time"},
                  {l:"Number of Passengers",ph:"",t:"number"},
                  {l:"Special Instructions",ph:"Any notes for your driver?",t:"text"},
                ].map((f,i)=>(
                  <div key={i}>
                    <div style={{color:G,fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600,marginBottom:8}}>{f.l}</div>
                    <input className="ri" type={f.t} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:12}}>
                <button className="bo bo-light" style={{padding:"14px 28px",borderRadius:2,fontSize:".8rem"}} onClick={()=>setStep(1)}>← Back</button>
                <button className="bg" style={{padding:"14px 38px",borderRadius:2,fontSize:".82rem"}} onClick={()=>setStep(3)}>Confirm Booking <ArrowRight size={13} style={{marginLeft:6}}/></button>
              </div>
            </div>
          )}
          {step===3&&(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{width:72,height:72,background:"rgba(255,193,7,.1)",border:`1.5px solid ${G}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
                <CheckCircle size={32} color={G}/>
              </div>
              <h3 className="g" style={{fontSize:"2rem",fontWeight:700,color:W,marginBottom:10}}>Booking Confirmed!</h3>
              <p style={{color:"rgba(255,255,255,.45)",fontSize:".88rem",lineHeight:1.8,maxWidth:400,margin:"0 auto"}}>
                You'll receive a confirmation SMS and email with your driver details, vehicle number and live tracking link.
              </p>
              <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:28}}>
                <button className="bg" style={{padding:"13px 28px",borderRadius:2,fontSize:".8rem"}} onClick={()=>setStep(1)}>Book Another Ride</button>
                <button className="bo bo-light" style={{padding:"13px 28px",borderRadius:2,fontSize:".8rem"}}>Track This Ride</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ──────────────────────────────────── */
function Testimonials() {
  const [curr,setCurr]=useState(0);
  const len=TESTIMONIALS.length;
  useEffect(()=>{const t=setInterval(()=>setCurr(c=>(c+1)%len),5000);return()=>clearInterval(t);},[]);

  return (
    <section style={{background:BG,padding:"100px 6%"}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div className="lbl" style={{justifyContent:"center"}}>Client Stories</div>
          <h2 className="g" style={{fontSize:"clamp(2.4rem,3.5vw,3.5rem)",fontWeight:700,color:D,marginTop:12}}>
            Real Reviews from <em style={{fontStyle:"italic",fontWeight:300,color:"#888"}}>Real Riders</em>
          </h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"5fr 4fr",gap:20}} className="hero-split">
          {/* Featured */}
          <div className="tc" style={{padding:"48px",borderRadius:4,position:"relative"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <Stars n={TESTIMONIALS[curr].stars}/>
              <div style={{background:`rgba(255,193,7,.08)`,border:`1px solid rgba(255,193,7,.2)`,borderRadius:20,padding:"4px 12px",fontSize:".66rem",fontFamily:"'Poppins',sans-serif",fontWeight:700,color:G,letterSpacing:".1em"}}>
                {TESTIMONIALS[curr].pkg} Package
              </div>
            </div>
            <p className="g" style={{fontSize:"1.22rem",lineHeight:1.72,color:"#333",fontStyle:"italic"}}>
              "{TESTIMONIALS[curr].text}"
            </p>
            <div style={{display:"flex",alignItems:"center",gap:16,marginTop:32,paddingTop:24,borderTop:"1px solid rgba(0,0,0,.07)"}}>
              <img src={TESTIMONIALS[curr].img} alt="" style={{width:54,height:54,borderRadius:"50%",objectFit:"cover",border:`2.5px solid ${G}`}}/>
              <div>
                <div className="g" style={{fontWeight:700,fontSize:"1.1rem",color:D}}>{TESTIMONIALS[curr].name}</div>
                <div style={{color:"#aaa",fontSize:".75rem",fontFamily:"'Poppins',sans-serif",marginTop:2}}>{TESTIMONIALS[curr].role}</div>
              </div>
              <div style={{marginLeft:"auto",display:"flex",gap:8}}>
                <button onClick={()=>setCurr(p=>(p-1+len)%len)} style={{width:38,height:38,borderRadius:2,background:"none",border:"1px solid rgba(0,0,0,.12)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={15}/></button>
                <button onClick={()=>setCurr(p=>(p+1)%len)} style={{width:38,height:38,borderRadius:2,background:G,border:`1px solid ${G}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={15} color={D}/></button>
              </div>
            </div>
          </div>
          {/* Stack */}
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {TESTIMONIALS.filter((_,i)=>i!==curr).map((r,i)=>(
              <div key={i} className="tc" style={{padding:"18px 22px",borderRadius:4,display:"flex",gap:14,alignItems:"flex-start",cursor:"pointer",position:"relative"}} onClick={()=>setCurr(TESTIMONIALS.indexOf(r))}>
                <img src={r.img} alt="" style={{width:40,height:40,borderRadius:"50%",objectFit:"cover",border:`1.5px solid ${G}`,flexShrink:0}}/>
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,marginBottom:4}}>
                    <div className="g" style={{fontWeight:700,fontSize:".98rem",color:D}}>{r.name}</div>
                    <Stars n={r.stars}/>
                  </div>
                  <div style={{color:G,fontSize:".62rem",fontFamily:"'Poppins',sans-serif",fontWeight:700,marginBottom:4}}>{r.pkg} Package</div>
                  <p style={{color:"#999",fontSize:".78rem",lineHeight:1.6}}>"{r.text.substring(0,80)}..."</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:32}}>
          {TESTIMONIALS.map((_,i)=>(
            <div key={i} onClick={()=>setCurr(i)} style={{width:i===curr?28:8,height:8,borderRadius:4,background:i===curr?G:"rgba(0,0,0,.14)",cursor:"pointer",transition:"all .35s"}}/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────── */
function FAQ() {
  const [open,setOpen]=useState(0);
  return (
    <section style={{background:D,padding:"100px 6%",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,193,7,.05) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:860,margin:"0 auto",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div className="lbl" style={{justifyContent:"center"}}>FAQ</div>
          <h2 className="g" style={{fontSize:"clamp(2.4rem,3.5vw,3.5rem)",fontWeight:700,color:W,marginTop:12}}>
            Frequently Asked <span className="shimmer">Questions</span>
          </h2>
        </div>
        <div>
          {FAQS.map((faq,i)=>(
            <div key={i} className="faq-item" style={{borderBottomColor:"rgba(255,255,255,.06)"}}>
              <button className="faq-q" style={{color:open===i?G:W}} onClick={()=>setOpen(open===i?-1:i)}>
                <span>{faq.q}</span>
                <div style={{width:32,height:32,borderRadius:2,background:open===i?"rgba(255,193,7,.12)":"rgba(255,255,255,.05)",border:`1px solid ${open===i?"rgba(255,193,7,.3)":"rgba(255,255,255,.08)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s"}}>
                  {open===i?<ChevronUp size={15} color={G}/>:<ChevronDown size={15} color="rgba(255,255,255,.4)"/>}
                </div>
              </button>
              <div className="faq-a" style={{maxHeight:open===i?300:0,opacity:open===i?1:0}}>
                <p style={{color:"rgba(255,255,255,.45)",fontSize:".87rem",lineHeight:1.85,paddingBottom:22,fontFamily:"'Poppins',sans-serif"}}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ── APP ───────────────────────────────────────────── */
export default function Package() {
  return (
    <>
      <style>{CSS}</style>
    
      <Hero/>
      <PackageCards/>
      <ComparisonTable/>
      <Addons/>
      <BookingWidget/>
      <Testimonials/>
      <FAQ/>
      
    </>
  );
}