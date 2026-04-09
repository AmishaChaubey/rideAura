import { useState, useEffect, useRef } from "react";
import {
  Car, Plane, Building2, Heart, MapPin, Moon, Phone, Mail, MessageCircle, ArrowRight,
  ChevronRight, CheckCircle, Star, Users, Clock, Shield,
  Wifi, Coffee, Thermometer, Navigation, ChevronLeft,
  Play, Quote, Sparkles, Crown, Zap, Menu, X,
  CalendarDays, HeadphonesIcon, BadgeCheck, Timer,CreditCard,
  ChevronDown, Globe, Award, TrendingUp
} from "lucide-react";

/* ─── TOKENS ─────────────────────────────────────── */
const G   = "#ffc107";
const G2  = "#e6ac00";
const D   = "#0e0e0e";
const W   = "#ffffff";
const BG  = "#f7f7f5";
const MID = "#1a1a1a";

/* ─── CSS ────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { font-family:'Poppins',sans-serif; background:${BG}; color:${D}; overflow-x:hidden; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:${D}; }
  ::-webkit-scrollbar-thumb { background:${G}; border-radius:2px; }
  a { text-decoration:none; color:inherit; }
  img { display:block; }
  .gg { font-family:'Cormorant Garamond',serif; }

  /* Keyframes */
  @keyframes fadeUp    { from{opacity:0;transform:translateY(52px);} to{opacity:1;transform:translateY(0);} }
  @keyframes fadeIn    { from{opacity:0;} to{opacity:1;} }
  @keyframes fadeLeft  { from{opacity:0;transform:translateX(50px);} to{opacity:1;transform:translateX(0);} }
  @keyframes fadeRight { from{opacity:0;transform:translateX(-50px);} to{opacity:1;transform:translateX(0);} }
  @keyframes shimmer   { 0%{background-position:-400% center;} 100%{background-position:400% center;} }
  @keyframes rotateSlow{ from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes pulse4    { 0%,100%{box-shadow:0 0 0 0 rgba(255,193,7,.55);} 70%{box-shadow:0 0 0 18px rgba(255,193,7,0);} }
  @keyframes float     { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(.92);} to{opacity:1;transform:scale(1);} }
  @keyframes lineGrow  { from{width:0;} to{width:56px;} }
  @keyframes kenBurns  { 0%{transform:scale(1);} 100%{transform:scale(1.08);} }
  @keyframes slideBar  { from{width:0;} to{width:var(--w);} }

  .au { animation:fadeUp    .85s cubic-bezier(.22,1,.36,1) both; }
  .af { animation:fadeIn    .75s ease both; }
  .afl{ animation:fadeLeft  .85s cubic-bezier(.22,1,.36,1) both; }
  .afr{ animation:fadeRight .85s cubic-bezier(.22,1,.36,1) both; }
  .afloat { animation:float 4.5s ease-in-out infinite; }
  .ap { animation:pulse4 2.2s infinite; }
  .ar { animation:rotateSlow 24s linear infinite; }
  .as { animation:scaleIn .9s cubic-bezier(.22,1,.36,1) both; }
  .kb { animation:kenBurns 12s ease-in-out infinite alternate; }

  .shimmer {
    background:linear-gradient(90deg,#8a6000 0%,${G} 22%,#fff8d0 48%,${G} 74%,#8a6000 100%);
    background-size:300% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 5s linear infinite;
  }

  /* NAV */
  .nav {
    position:fixed; inset:0 0 auto 0; z-index:200;
    transition:background .4s, backdrop-filter .4s, box-shadow .4s;
  }
  .nav.sc {
    background:rgba(14,14,14,.97);
    backdrop-filter:blur(24px);
    box-shadow:0 1px 0 rgba(255,193,7,.1);
  }
  .nl { font-size:.77rem; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.68); transition:color .3s; position:relative; padding-bottom:3px; }
  .nl::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1.5px; background:${G}; transition:width .3s; }
  .nl:hover, .nl.act { color:${G}; }
  .nl:hover::after, .nl.act::after { width:100%; }

  /* BUTTONS */
  .bg {
    background:${G}; color:${D}; border:none; cursor:pointer;
    font-family:'Poppins',sans-serif; font-weight:700; letter-spacing:.07em; text-transform:uppercase;
    transition:all .35s cubic-bezier(.4,0,.2,1); position:relative; overflow:hidden;
  }
  .bg::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent); transform:translateX(-100%); transition:transform .5s; }
  .bg:hover { box-shadow:0 12px 38px rgba(255,193,7,.48); transform:translateY(-3px); }
  .bg:hover::before { transform:translateX(100%); }
  .bo-l { background:transparent; cursor:pointer; color:${W}; border:1.5px solid rgba(255,193,7,.32); font-family:'Poppins',sans-serif; font-weight:500; letter-spacing:.07em; text-transform:uppercase; transition:all .35s; }
  .bo-l:hover { border-color:${G}; color:${G}; background:rgba(255,193,7,.06); transform:translateY(-2px); }
  .bo-d { background:transparent; cursor:pointer; color:${D}; border:1.5px solid rgba(0,0,0,.18); font-family:'Poppins',sans-serif; font-weight:500; letter-spacing:.07em; text-transform:uppercase; transition:all .35s; }
  .bo-d:hover { border-color:${D}; background:rgba(0,0,0,.05); transform:translateY(-2px); }

  /* LABEL */
  .lbl { display:inline-flex; align-items:center; gap:10px; font-size:.7rem; letter-spacing:.28em; text-transform:uppercase; font-weight:600; color:${G}; font-family:'Poppins',sans-serif; }
  .lbl::before { content:''; display:block; width:28px; height:1.5px; background:${G}; }

  /* SERVICE CARDS */
  .sv-card {
    background:${W}; overflow:hidden; position:relative;
    transition:all .45s cubic-bezier(.4,0,.2,1);
    border:1px solid rgba(0,0,0,.06);
  }
  .sv-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:${G}; transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
  .sv-card:hover { transform:translateY(-10px); box-shadow:0 30px 72px rgba(0,0,0,.14); border-color:rgba(255,193,7,.2); }
  .sv-card:hover::after { transform:scaleX(1); }

  /* PROCESS STEP */
  .ps-num { width:60px; height:60px; border-radius:50%; border:1.5px solid rgba(255,193,7,.25); background:rgba(255,193,7,.06); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .4s; }
  .ps-wrap:hover .ps-num { background:rgba(255,193,7,.15); border-color:${G}; }

  /* STAT CARD */
  .st-card { transition:all .35s; }
  .st-card:hover { transform:translateY(-5px); }



  /* TESTI */
  .tc { background:${W}; transition:all .4s; box-shadow:0 4px 28px rgba(0,0,0,.07); position:relative; }
  .tc:hover { transform:translateY(-6px); box-shadow:0 20px 56px rgba(0,0,0,.13); }
  .tc::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,${G},transparent); }

  /* SERVICE DETAIL */
  .sd-tab { border-bottom:2px solid transparent; cursor:pointer; transition:all .3s; font-family:'Poppins',sans-serif; font-weight:600; font-size:.82rem; letter-spacing:.06em; text-transform:uppercase; padding-bottom:12px; color:rgba(0,0,0,.35); }
  .sd-tab:hover { color:${D}; }
  .sd-tab.act { border-bottom-color:${G}; color:${D}; }

  /* MOBILE NAV */
  .mob-nav { background:rgba(14,14,14,.98); border-top:1px solid rgba(255,193,7,.1); }

  /* INPUT */
  .ri { width:100%; background:rgba(255,255,255,.06); border:none; border-bottom:1.5px solid rgba(255,193,7,.28); color:${W}; font-family:'Poppins',sans-serif; font-size:.87rem; padding:12px 4px 10px; outline:none; transition:border-color .3s; }
  .ri::placeholder { color:rgba(255,255,255,.32); }
  .ri:focus { border-bottom-color:${G}; }
  .ri option { background:#1a1a1a; }

  /* ── RESPONSIVE ── */
  @media(max-width:1024px){
    .grid-4 { grid-template-columns:repeat(2,1fr) !important; }
    .grid-3 { grid-template-columns:repeat(2,1fr) !important; }
    .split-2 { grid-template-columns:1fr !important; }
    .split-5-4 { grid-template-columns:1fr !important; }
  }
  @media(max-width:768px){
    .grid-4 { grid-template-columns:repeat(2,1fr) !important; }
    .grid-3 { grid-template-columns:1fr !important; }
    .nav-links { display:none !important; }
    .nav-right { display:none !important; }
    .mob-btn { display:flex !important; }
    .hero-content { padding:0 5% !important; }
    .hero-h1 { font-size:clamp(2.4rem,9vw,3.6rem) !important; }
    .section-pad { padding:70px 5% !important; }
    .step-grid { grid-template-columns:1fr 1fr !important; }
    .step-line-h { display:none !important; }
    .bk-grid { grid-template-columns:1fr !important; }
    .testi-grid { grid-template-columns:1fr !important; }
 
  }
  @media(max-width:480px){
    .grid-4 { grid-template-columns:1fr !important; }
    .step-grid { grid-template-columns:1fr !important; }
 
    .hero-btns { flex-direction:column !important; }
    .book-form-grid { grid-template-columns:1fr !important; }
    .hero-btns {}

    .
  }
`;

/* ─── DATA ───────────────────────────────────────── */
const SERVICES = [
  {
    id:"city",
    icon:Car,
    title:"City Transfers",
    short:"Seamless city rides, 24/7",
    desc:"Whether it's a quick hop across town or a lengthy cross-city journey, our City Transfer service delivers on-time, every time. Fully tracked, professionally driven, and always comfortable.",
    img:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85",
    heroImg:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1400&q=90",
    color:"#0e0e0e",
    features:["Real-time GPS tracking","Professional licensed driver","Guaranteed on-time pickup","Air conditioned vehicle","In-app & SMS updates","Instant booking confirmation"],
    highlights:[{icon:Clock,val:"<3 min",label:"Avg response"},{icon:Users,val:"4–7",label:"Seats available"},{icon:Shield,val:"100%",label:"Insured rides"}],
    process:["Book in 60 seconds via app or call","Driver assigned & confirmed instantly","Track your driver live on the map","Arrive comfortably at your destination"],
    startPrice:"₹299",
  },
  {
    id:"airport",
    icon:Plane,
    title:"Airport Pickup & Drop",
    short:"Zero-stress terminal service",
    desc:"We track your flight in real time. Your driver is at the terminal before you land — signboard in hand. No waiting, no stress. Premium airport transfers for travellers who value their time.",
    img:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85",
    heroImg:"https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1400&q=90",
    color:"#0a0800",
    features:["Live flight tracking system","Meet & greet inside terminal","30–60 min free waiting time","Name board at arrival gate","Complimentary water provided","All major airports covered"],
    highlights:[{icon:Plane,val:"60 min",label:"Free wait time"},{icon:BadgeCheck,val:"100%",label:"Flight tracked"},{icon:Globe,val:"50+",label:"Airports served"}],
    process:["Share your flight number at booking","We track and monitor your flight","Driver waits inside arrival terminal","Smooth ride to your destination"],
    startPrice:"₹599",
  },
  {
    id:"corporate",
    icon:Building2,
    title:"Corporate Travel",
    short:"Business-class reliability",
    desc:"Dedicated corporate accounts, monthly consolidated billing, GST invoicing, and an employee travel dashboard. We manage your entire company's ground transportation so you can focus on business.",
    img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85",
    heroImg:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=90",
    color:"#060606",
    features:["Dedicated account manager","Consolidated monthly billing","GST invoice for every trip","Multi-employee booking dashboard","Custom pickup protocols","Priority fleet guarantee"],
    highlights:[{icon:Building2,val:"500+",label:"Corporate clients"},{icon:TrendingUp,val:"99.2%",label:"On-time rate"},{icon:Award,val:"#1",label:"Rated in India"}],
    process:["Contact us for a tailored corporate quote","We set up your company dashboard","Employees book instantly via app","Monthly report & single invoice"],
    startPrice:"Custom",
  },
  {
    id:"wedding",
    icon:Heart,
    title:"Weddings & Events",
    short:"Make every moment perfect",
    desc:"Decorated luxury fleets, suited chauffeurs, and meticulous timing for your most important day. We coordinate with your event team to ensure every arrival and departure is seamless and cinematic.",
    img:"https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85",
    heroImg:"https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1400&q=90",
    color:"#0d0a00",
    features:["Flower-decorated vehicles","Suited & groomed chauffeurs","Multi-car fleet coordination","Precise event timeline management","Venue-to-venue logistics","Red carpet arrival service"],
    highlights:[{icon:Heart,val:"2000+",label:"Weddings served"},{icon:Crown,val:"5★",label:"Average rating"},{icon:CalendarDays,val:"6 mo",label:"Advance booking"}],
    process:["Discuss your event requirements","We assign a dedicated coordinator","Decorated fleet inspected & prepared","Flawless execution on your big day"],
    startPrice:"₹3,999",
  },
  {
    id:"outstation",
    icon:MapPin,
    title:"Outstation Trips",
    short:"Comfortable long-distance journeys",
    desc:"Plan a hill station escape, a temple pilgrimage or a business road trip. Our outstation service covers pan-India destinations with experienced highway drivers, transparent pricing and zero hidden charges.",
    img:"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=85",
    heroImg:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=90",
    color:"#080e06",
    features:["Pan India destination coverage","Experienced highway drivers","Tolls & driver allowance included","One-way and round trips","Flexible multi-day bookings","Transparent fare breakdown"],
    highlights:[{icon:MapPin,val:"500+",label:"Destinations"},{icon:Timer,val:"24/7",label:"On the road"},{icon:Shield,val:"Insured",label:"All trips"}],
    process:["Enter origin, destination & dates","Get instant transparent fare quote","Driver confirmed 24 hrs in advance","Enjoy a smooth, scenic long drive"],
    startPrice:"₹1,299",
  },
  {
    id:"night",
    icon:Moon,
    title:"Night Packages",
    short:"Safe after-hours transportation",
    desc:"Night rides deserve extra care. Our vetted night-package drivers are specifically trained for after-hours city and outstation travel. Safe, discreet, and absolutely reliable — whenever you need us.",
    img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=85",
    heroImg:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=90",
    color:"#06060e",
    features:["Night-certified vetted drivers","Enhanced safety protocols","Women safety features in-app","SOS button & live family sharing","Discreet & professional service","Available 10 PM – 6 AM daily"],
    highlights:[{icon:Moon,val:"10PM–6AM",label:"Service hours"},{icon:Shield,val:"SOS",label:"In-app safety"},{icon:BadgeCheck,val:"Vetted",label:"Night drivers"}],
    process:["Book via app or call from 8 PM","Verified night driver confirmed","Share live location with loved ones","Safe, discreet door-to-door service"],
    startPrice:"₹449",
  },
  {
    id:"selfdrive",
    icon:Navigation,
    title:"Self Drive Rental",
    short:"Drive on your own terms",
    desc:"Freedom to explore at your own pace. Rent from our premium fleet of clean, well-maintained vehicles with no driver. Choose hourly, daily or weekly packages and hit the road your way.",
    img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85",
    heroImg:"https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=90",
    color:"#0a0a08",
    features:["Clean, sanitised vehicles daily","Flexible hourly / daily / weekly plans","Zero deposit on select plans","Fuel-efficient modern fleet","24/7 roadside assistance","GPS enabled for all rentals"],
    highlights:[{icon:Navigation,val:"50+",label:"Car models"},{icon:CalendarDays,val:"Hourly",label:"Min rental"},{icon:HeadphonesIcon,val:"24/7",label:"Road support"}],
    process:["Choose vehicle & rental duration","Upload licence — verified in minutes","Pick up the car or get it delivered","Return hassle-free, no hidden costs"],
    startPrice:"₹799",
  },
  {
    id:"chauffeur",
    icon:Crown,
    title:"Chauffeur Services",
    short:"Personal chauffeur on demand",
    desc:"Hire a dedicated chauffeur for a half-day, full day or longer engagements. Perfect for VIP guests, high-profile meetings, roadshows and occasions where only the best will do.",
    img:"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=85",
    heroImg:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&q=90",
    color:"#0e0a00",
    features:["Suited, groomed chauffeurs","Half-day & full-day hire available","Multiple stops & flexible routing","Luxury vehicle of your choice","Absolute discretion guaranteed","Concierge-level assistance"],
    highlights:[{icon:Crown,val:"Elite",label:"Vehicle class"},{icon:Users,val:"VIP",label:"Level service"},{icon:Award,val:"Top 1%",label:"Chauffeurs"}],
    process:["Select vehicle and hire duration","Chauffeur briefed on your itinerary","Immaculate pickup at your location","Entire day at your disposal"],
    startPrice:"₹2,499",
  },
];



const TESTIMONIALS = [
  { name:"Ankit Saxena",  role:"Startup Founder, Delhi",        stars:5, svc:"Airport Pickup",   img:"https://randomuser.me/api/portraits/men/32.jpg",   text:"My 4AM international flight — the driver was at Terminal 3 before I landed. Spotted the signboard the second I walked out. Impeccable service every single week." },
  { name:"Meera Joshi",   role:"Event Manager, Mumbai",         stars:5, svc:"Weddings & Events", img:"https://randomuser.me/api/portraits/women/44.jpg",  text:"CarCab handled our 8-car wedding convoy seamlessly. Every driver was punctual, suited, and the cars were gorgeous. Our client cried happy tears pulling up in that fleet." },
  { name:"Vikram Nair",   role:"Corporate Travel Head",         stars:5, svc:"Corporate Travel",  img:"https://randomuser.me/api/portraits/men/58.jpg",    text:"We moved our entire executive travel to CarCab. The dashboard is brilliant, the billing is clean, and the reliability is something we haven't seen from any other provider." },
  { name:"Priya Kumari",  role:"Solo Traveller, Bangalore",     stars:5, svc:"Night Package",     img:"https://randomuser.me/api/portraits/women/65.jpg",  text:"As a woman who travels late for work, the Night Package genuinely gives me peace of mind. Live sharing, in-app SOS, polite driver — I wouldn't use anything else." },
];

const BRANDS = ["Mercedes-Benz","Toyota","Honda","Audi","BMW","Hyundai","Skoda","Kia","Volvo","Lexus","Maruti","Tata"];

/* ─── HELPERS ────────────────────────────────────── */
function Stars({n=5, size=12}) {
  return <div style={{display:"flex",gap:2}}>{Array.from({length:n}).map((_,i)=><Star key={i} size={size} fill={G} color={G}/>)}</div>;
}


/* ─── HERO BANNER (full-width image) ─────────────── */
function HeroBanner() {
  const [vis,setVis]=useState(false);
  useEffect(()=>{setTimeout(()=>setVis(true),120);},[]);
  return (
    <section style={{position:"relative",height:"100vh",minHeight:640,overflow:"hidden",background:D}}>
      {/* Full-width background image with Ken Burns */}
      <img
        className="kb"
        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1800&q=90"
        alt="CarCab Services"
        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.35,transformOrigin:"center"}}
      />
      {/* Multi-layer gradient overlay */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(115deg,rgba(14,14,14,.97) 0%,rgba(14,14,14,.72) 52%,rgba(14,14,14,.38) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(14,14,14,.8) 0%,transparent 50%)"}}/>
      {/* Decorative rings */}
      <div className="ar" style={{position:"absolute",top:"10%",right:"5%",width:380,height:380,borderRadius:"50%",border:"1px dashed rgba(255,193,7,.1)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"17%",right:"8.5%",width:240,height:240,borderRadius:"50%",border:"1px solid rgba(255,193,7,.07)",pointerEvents:"none"}}/>
      {/* Dot grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(rgba(255,193,7,.028) 1px,transparent 1px)`,backgroundSize:"44px 44px",pointerEvents:"none"}}/>
      {/* Gold vertical accent line */}
      <div style={{position:"absolute",left:"6%",top:"20%",bottom:"20%",width:"2px",background:`linear-gradient(to bottom,transparent,${G},transparent)`,opacity:.3}}/>

      {/* Content */}
      <div className="hero-content" style={{position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 7%",paddingTop:76}}>
        {/* Breadcrumb */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24,opacity:vis?1:0,transition:"opacity .7s .1s"}}>
          <a href="#" style={{color:G,fontFamily:"'Poppins',sans-serif",fontSize:".72rem"}}>Home</a>
          <ChevronRight size={12} color="rgba(255,255,255,.3)"/>
          <span style={{color:"rgba(255,255,255,.4)",fontFamily:"'Poppins',sans-serif",fontSize:".72rem"}}>Services</span>
        </div>

        <div className="lbl" style={{opacity:vis?1:0,transition:"opacity .7s .15s"}}>
          What We Offer
        </div>

        <h1 className={`gg hero-h1`} style={{
          fontSize:"clamp(3.2rem,6.5vw,6rem)",fontWeight:700,lineHeight:1.03,
          marginTop:18,color:W,
          opacity:vis?1:0,transform:vis?"none":"translateY(42px)",
          transition:"all 1s .3s cubic-bezier(.22,1,.36,1)"
        }}>
          Our <span className="shimmer">Services</span><br/>
          <em style={{fontStyle:"italic",fontWeight:300,fontSize:"90%"}}>Built Around Your Journey</em>
        </h1>

        <p style={{
          color:"rgba(255,255,255,.5)",fontSize:".97rem",lineHeight:1.9,maxWidth:520,marginTop:24,
          opacity:vis?1:0,transform:vis?"none":"translateY(22px)",
          transition:"all .9s .55s ease"
        }}>
          Eight premium services covering every aspect of your travel — city rides, airports, corporate trips, weddings, outstation and more. All delivered with the same uncompromising CarCab standard.
        </p>

        <div className="hero-btns" style={{display:"flex",gap:14,marginTop:38,flexWrap:"wrap",opacity:vis?1:0,}}>
          <button className="bg ap" style={{padding:"15px 38px",borderRadius:2,fontSize:".84rem"}}>
            Explore Services
          </button>
          <button className="bo-l" style={{padding:"15px 38px",borderRadius:2,fontSize:".84rem",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,193,7,.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Play size={10} fill={G} color={G}/>
            </div>
            Watch Our Story
          </button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,zIndex:2,opacity:.5}}>
        <span style={{color:W,fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif"}}>Scroll</span>
        <div style={{width:1,height:40,background:`linear-gradient(${G},transparent)`}}/>
      </div>
    </section>
  );
}



/* ─── SERVICES OVERVIEW GRID ──────────────────────── */
function ServicesOverview({onSelect}) {
  const [hov,setHov]=useState(null);
  return (
    <section className="section-pad" style={{background:BG,padding:"100px 6%"}}>
      <div style={{maxWidth:1440,margin:"0 auto"}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:20,marginBottom:64}}>
          <div>
            <div className="lbl">All Services</div>
            <h2 className="gg" style={{fontSize:"clamp(2.4rem,3.5vw,3.4rem)",fontWeight:700,color:D,marginTop:12,lineHeight:1.1}}>
              Premium Services<br/>
              <em style={{fontWeight:300,fontStyle:"italic",color:"#888"}}>Tailored for Every Journey</em>
            </h2>
          </div>
          <p style={{maxWidth:400,color:"#888",fontSize:".88rem",lineHeight:1.85}}>
            Each service is designed with precision — from booking to drop-off, every detail is managed so you never have to worry.
          </p>
        </div>

        {/* 4-column grid — first 4 large, then 4 smaller */}
        {/* Row 1: 2 large cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(0,0,0,.07)",marginBottom:1}} className="grid-3">
          {SERVICES.slice(0,2).map((s,i)=>{
            const Icon=s.icon; const h=hov===s.id;
            return (
              <div key={s.id} className="sv-card" style={{cursor:"pointer"}}
                onMouseEnter={()=>setHov(s.id)} onMouseLeave={()=>setHov(null)}
                onClick={()=>onSelect(s)}>
                <div style={{position:"relative",height:280,overflow:"hidden"}}>
                  <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",transform:h?"scale(1.07)":"scale(1)",transition:"transform .6s ease"}}/>
                  <div style={{position:"absolute",inset:0,background:h?"rgba(14,14,14,.48)":"rgba(14,14,14,.28)",transition:"background .4s"}}/>
                  <div style={{position:"absolute",top:20,left:20,width:46,height:46,background:G,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Icon size={21} color={D} strokeWidth={2}/>
                  </div>
                  <div style={{position:"absolute",bottom:20,left:20}}>
                    <div style={{color:G,fontSize:".65rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600}}>{s.short}</div>
                  </div>
                </div>
                <div style={{padding:"30px 32px 34px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <h3 className="gg" style={{fontSize:"1.5rem",fontWeight:700,color:D,marginBottom:10}}>{s.title}</h3>
                      <p style={{color:"#888",fontSize:".87rem",lineHeight:1.78,maxWidth:420}}>{s.desc.substring(0,120)}...</p>
                    </div>
                    <div style={{color:G,fontSize:".75rem",fontFamily:"'Poppins',sans-serif",fontWeight:700,marginLeft:20,flexShrink:0}}>from {s.startPrice}</div>
                  </div>
                  <div style={{display:"flex",gap:14,marginTop:20,flexWrap:"wrap"}}>
                    {s.features.slice(0,3).map((f,fi)=>(
                      <div key={fi} style={{display:"flex",alignItems:"center",gap:5,color:"#777",fontSize:".76rem"}}>
                        <CheckCircle size={11} color={G}/><span>{f}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: 3 medium cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(0,0,0,.07)",marginBottom:1}} className="grid-3">
          {SERVICES.slice(2,5).map((s,i)=>{
            const Icon=s.icon; const h=hov===s.id;
            return (
              <div key={s.id} className="sv-card" style={{cursor:"pointer"}}
                onMouseEnter={()=>setHov(s.id)} onMouseLeave={()=>setHov(null)}
                onClick={()=>onSelect(s)}>
                <div style={{position:"relative",height:220,overflow:"hidden"}}>
                  <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",transform:h?"scale(1.07)":"scale(1)",transition:"transform .6s ease"}}/>
                  <div style={{position:"absolute",inset:0,background:h?"rgba(14,14,14,.46)":"rgba(14,14,14,.26)",transition:"background .4s"}}/>
                  <div style={{position:"absolute",top:16,left:16,width:42,height:42,background:G,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Icon size={19} color={D} strokeWidth={2}/>
                  </div>
                </div>
                <div style={{padding:"24px 26px 28px"}}>
                  <h3 className="gg" style={{fontSize:"1.3rem",fontWeight:700,color:D,marginBottom:8}}>{s.title}</h3>
                  <p style={{color:"#888",fontSize:".84rem",lineHeight:1.75}}>{s.desc.substring(0,100)}...</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16}}>
                    <div style={{color:G,fontSize:".72rem",fontFamily:"'Poppins',sans-serif",fontWeight:700}}>from {s.startPrice}</div>
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 3: 3 cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"rgba(0,0,0,.07)"}} className="grid-3">
          {SERVICES.slice(5,8).map((s,i)=>{
            const Icon=s.icon; const h=hov===s.id;
            return (
              <div key={s.id} className="sv-card" style={{cursor:"pointer"}}
                onMouseEnter={()=>setHov(s.id)} onMouseLeave={()=>setHov(null)}
                onClick={()=>onSelect(s)}>
                <div style={{position:"relative",height:200,overflow:"hidden"}}>
                  <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",transform:h?"scale(1.07)":"scale(1)",transition:"transform .6s ease"}}/>
                  <div style={{position:"absolute",inset:0,background:h?"rgba(14,14,14,.46)":"rgba(14,14,14,.24)",transition:"background .4s"}}/>
                  <div style={{position:"absolute",top:14,left:14,width:40,height:40,background:G,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Icon size={18} color={D} strokeWidth={2}/>
                  </div>
                </div>
                <div style={{padding:"22px 24px 26px"}}>
                  <h3 className="gg" style={{fontSize:"1.25rem",fontWeight:700,color:D,marginBottom:7}}>{s.title}</h3>
                  <p style={{color:"#888",fontSize:".83rem",lineHeight:1.7}}>{s.desc.substring(0,90)}...</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:14}}>
                    <div style={{color:G,fontSize:".7rem",fontFamily:"'Poppins',sans-serif",fontWeight:700}}>from {s.startPrice}</div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICE DETAIL PANEL ────────────────────────── */
function ServiceDetail({service,onClose}) {
  const [tab,setTab]=useState(0);
  const tabs=["Overview","Features","How It Works","Book Now"];
  if(!service) return null;
  const Icon=service.icon;
  return (
    <div style={{position:"fixed",inset:0,zIndex:300,overflowY:"auto",background:BG}}>
      {/* Full bleed hero */}
      <div style={{position:"relative",height:"55vh",minHeight:380,overflow:"hidden",background:D}}>
        <img src={service.heroImg} alt={service.title} style={{width:"100%",height:"100%",objectFit:"cover",opacity:.35}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(14,14,14,.7) 0%,rgba(14,14,14,.92) 100%)"}}/>
        {/* Back button */}
        <button onClick={onClose} style={{position:"absolute",top:24,left:"6%",background:"rgba(255,255,255,.08)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,193,7,.2)",borderRadius:2,padding:"9px 18px",color:W,fontFamily:"'Poppins',sans-serif",fontSize:".75rem",cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all .3s"}}
          onMouseEnter={e=>e.currentTarget.style.borderColor=G} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,193,7,.2)"}>
          <ChevronLeft size={14}/> Back to Services
        </button>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 7%",paddingTop:80}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
              <div style={{width:52,height:52,background:G,borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon size={24} color={D} strokeWidth={2}/>
              </div>
              <div>
                <div className="lbl" style={{color:"rgba(255,193,7,.7)"}}>CarCab Service</div>
              </div>
            </div>
            <h1 className="gg" style={{fontSize:"clamp(2.4rem,5vw,4.5rem)",fontWeight:700,color:W,lineHeight:1.05}}>
              {service.title}
            </h1>
            <p style={{color:"rgba(255,255,255,.5)",fontSize:".95rem",maxWidth:520,lineHeight:1.85,marginTop:16}}>{service.desc}</p>
            <div style={{display:"flex",gap:28,marginTop:24}}>
              {service.highlights.map((h,i)=>{
                const HIcon=h.icon;
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                    <HIcon size={14} color={G}/>
                    <div>
                      <div className="gg" style={{color:G,fontSize:"1.3rem",fontWeight:700,lineHeight:1}}>{h.val}</div>
                      <div style={{color:"rgba(255,255,255,.38)",fontSize:".65rem",fontFamily:"'Poppins',sans-serif"}}>{h.label}</div>
                    </div>
                  </div>
                );
              })}
              <div style={{marginLeft:"auto",display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"flex-end"}}>
                <div style={{color:"rgba(255,255,255,.35)",fontSize:".68rem",fontFamily:"'Poppins',sans-serif"}}>Starting from</div>
                <div className="gg shimmer" style={{fontSize:"2rem",fontWeight:700}}>{service.startPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{background:W,borderBottom:"1px solid rgba(0,0,0,.08)",padding:"0 7%"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",gap:36}}>
          {tabs.map((t,i)=>(
            <button key={i} className={`sd-tab${tab===i?" act":""}`} onClick={()=>setTab(i)}>{t}</button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"60px 7%"}}>
        {tab===0&&(
          <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:60}} className="split-2">
            <div>
              <div className="lbl" style={{marginBottom:16}}>About This Service</div>
              <h2 className="gg" style={{fontSize:"2rem",fontWeight:700,color:D,marginBottom:20}}>{service.title}</h2>
              <p style={{color:"#666",fontSize:".9rem",lineHeight:1.9,marginBottom:28}}>{service.desc}</p>
              <p style={{color:"#777",fontSize:".88rem",lineHeight:1.85}}>
                Every {service.title.toLowerCase()} booking includes a professional licensed driver, real-time GPS tracking, digital receipt, and our signature CarCab quality guarantee. We monitor every trip from pickup to drop-off so you can relax completely.
              </p>
              <button className="bg" style={{marginTop:32,padding:"14px 36px",borderRadius:2,fontSize:".82rem",display:"inline-flex",alignItems:"center",gap:8}} onClick={()=>setTab(3)}>
                Book This Service <ArrowRight size={13}/>
              </button>
            </div>
            <div>
              <div style={{borderRadius:4,overflow:"hidden",marginBottom:16}}>
                <img src={service.img} alt={service.title} style={{width:"100%",height:260,objectFit:"cover"}}/>
              </div>
              <div style={{background:D,borderRadius:4,padding:"24px 28px"}}>
                <div style={{color:G,fontSize:".65rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600,marginBottom:14}}>Quick Facts</div>
                {service.highlights.map((h,i)=>{
                  const HIcon=h.icon;
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                      <div style={{width:36,height:36,background:"rgba(255,193,7,.08)",borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <HIcon size={16} color={G}/>
                      </div>
                      <div>
                        <div className="gg" style={{color:G,fontSize:"1.15rem",fontWeight:700,lineHeight:1}}>{h.val}</div>
                        <div style={{color:"rgba(255,255,255,.4)",fontSize:".72rem",fontFamily:"'Poppins',sans-serif"}}>{h.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {tab===1&&(
          <div>
            <div className="lbl" style={{marginBottom:16}}>What's Included</div>
            <h2 className="gg" style={{fontSize:"2rem",fontWeight:700,color:D,marginBottom:36}}>All Features</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}} className="grid-3">
              {service.features.map((f,i)=>(
                <div key={i} style={{background:W,border:"1px solid rgba(0,0,0,.07)",borderRadius:4,padding:"22px 24px",display:"flex",alignItems:"flex-start",gap:12,transition:"all .3s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=G;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 12px 40px rgba(255,193,7,.1)`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,.07)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  <CheckCircle size={18} color={G} style={{flexShrink:0,marginTop:1}}/>
                  <span style={{fontFamily:"'Poppins',sans-serif",fontSize:".87rem",color:"#555",lineHeight:1.6}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab===2&&(
          <div>
            <div className="lbl" style={{marginBottom:16}}>The Process</div>
            <h2 className="gg" style={{fontSize:"2rem",fontWeight:700,color:D,marginBottom:48}}>How It Works</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:32,position:"relative"}} className="step-grid">
              <div className="step-line-h" style={{position:"absolute",top:26,left:"12%",right:"12%",height:"1px",background:`linear-gradient(90deg,${G},rgba(255,193,7,.1),${G})`,pointerEvents:"none"}}/>
              {service.process.map((p,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(255,193,7,.07)",border:"1.5px solid rgba(255,193,7,.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
                    <span className="gg shimmer" style={{fontSize:"1.3rem",fontWeight:700}}>0{i+1}</span>
                  </div>
                  <p style={{color:"#555",fontSize:".87rem",lineHeight:1.75,fontFamily:"'Poppins',sans-serif"}}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab===3&&(
          <div style={{maxWidth:680}}>
            <div className="lbl" style={{marginBottom:16}}>Quick Booking</div>
            <h2 className="gg" style={{fontSize:"2rem",fontWeight:700,color:D,marginBottom:32}}>Book {service.title}</h2>
            <div style={{background:D,borderRadius:4,padding:"40px 44px",border:"1px solid rgba(255,193,7,.12)"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}} className="book-form-grid">
                {[
                  {l:"Pickup Location",ph:"Your pickup address",t:"text"},
                  {l:"Destination",ph:"Where to?",t:"text"},
                  {l:"Date",ph:"",t:"date"},
                  {l:"Time",ph:"",t:"time"},
                ].map((f,i)=>(
                  <div key={i}>
                    <div style={{color:G,fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600,marginBottom:8}}>{f.l}</div>
                    <input className="ri" type={f.t} placeholder={f.ph}/>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:28}}>
                <div style={{color:G,fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Poppins',sans-serif",fontWeight:600,marginBottom:8}}>Special Instructions</div>
                <input className="ri" type="text" placeholder="Any notes for your driver?"/>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:"rgba(255,193,7,.06)",borderRadius:2,border:"1px solid rgba(255,193,7,.15)",marginBottom:24}}>
                <span style={{color:"rgba(255,255,255,.6)",fontFamily:"'Poppins',sans-serif",fontSize:".82rem"}}>Starting from</span>
                <span className="gg shimmer" style={{fontSize:"1.6rem",fontWeight:700}}>{service.startPrice}</span>
              </div>
              <button className="bg" style={{width:"100%",padding:"15px",borderRadius:2,fontSize:".85rem"}}>
                Confirm Booking →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ─── WHY CHOOSE US ───────────────────────────────── */
function WhyUs() {
  const pts = [
    {icon:BadgeCheck, title:"Verified Professionals",  desc:"Every driver undergoes a 6-step vetting process — background checks, driving tests, safety certification, and periodic reviews."},
    {icon:Clock,      title:"Punctuality Guaranteed",  desc:"We track traffic, weather and your flight in real time. If we're ever late, your next ride is on us."},
    {icon:Shield,     title:"Fully Insured Rides",     desc:"Comprehensive travel insurance on every booking. You and your belongings are covered from pickup to drop-off."},
    {icon:HeadphonesIcon,title:"24/7 Human Support",   desc:"Real people, not bots. Our support team picks up within 90 seconds — day or night, weekday or holiday."},
  ];
  return (
    <section className="section-pad" style={{background:D,padding:"100px 6%",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(rgba(255,193,7,.02) 1px,transparent 1px)`,backgroundSize:"40px 40px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:-120,right:-120,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,193,7,.05) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1440,margin:"0 auto",position:"relative"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:80,alignItems:"start"}} className="split-2">
          <div style={{position:"sticky",top:100}}>
            <div className="lbl">Why CarCab</div>
            <h2 className="gg" style={{fontSize:"clamp(2.4rem,3.5vw,3.4rem)",fontWeight:700,color:W,marginTop:14,lineHeight:1.1}}>
              The Standard<br/>
              <span className="shimmer">Others Aspire</span><br/>
              <em style={{fontWeight:300,fontStyle:"italic",fontSize:"85%",color:"rgba(255,255,255,.45)"}}>To Reach</em>
            </h2>
            <p style={{color:"rgba(255,255,255,.42)",fontSize:".88rem",lineHeight:1.85,marginTop:20}}>
              Six reasons why 50,000+ riders chose CarCab — and keep coming back.
            </p>
            <button className="bg" style={{marginTop:32,padding:"14px 36px",borderRadius:2,fontSize:".82rem"}}>Book a Ride Today</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"rgba(255,255,255,.04)"}} className="grid-3">
            {pts.map((p,i)=>{
              const Icon=p.icon;
              return (
                <div key={i} style={{background:"rgba(255,255,255,.02)",padding:"32px 28px",transition:"all .35s",borderBottom:"1px solid rgba(255,255,255,.04)",borderRight:"1px solid rgba(255,255,255,.04)"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,193,7,.05)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.02)";}}>
                  <div style={{width:46,height:46,background:"rgba(255,193,7,.08)",borderRadius:2,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18}}>
                    <Icon size={20} color={G}/>
                  </div>
                  <h4 className="gg" style={{fontSize:"1.2rem",fontWeight:700,color:W,marginBottom:10}}>{p.title}</h4>
                  <p style={{color:"rgba(255,255,255,.4)",fontSize:".83rem",lineHeight:1.75}}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS SECTION ─────────────────────────────── */
function HowItWorks() {
  const steps=[
    {n:"01",title:"Choose Your Service",    desc:"Browse all 8 premium services and pick exactly what your journey needs.",           icon:Sparkles},
    {n:"02",title:"Enter Trip Details",     desc:"Add pickup, destination, date and time. Transparent pricing shown instantly.",       icon:MapPin   },
    {n:"03",title:"Confirm & Pay Securely", desc:"Pay via UPI, card or cash. GST invoice generated automatically for every booking.", icon:CreditCard? Navigation:Navigation},
    {n:"04",title:"Track Your Driver",      desc:"Watch your chauffeur arrive live on the map. ETA updated in real time.",             icon:Navigation},
    {n:"05",title:"Arrive in Comfort",      desc:"Sit back and experience the CarCab standard — from door to destination.",           icon:Crown     },
  ];
  return (
    <section className="section-pad" style={{background:BG,padding:"100px 6%"}}>
      <div style={{maxWidth:1440,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:68}}>
          <div className="lbl" style={{justifyContent:"center"}}>The Process</div>
          <h2 className="gg" style={{fontSize:"clamp(2.4rem,3.5vw,3.4rem)",fontWeight:700,color:D,marginTop:12}}>
            Booking Made <em style={{fontStyle:"italic",fontWeight:300,color:"#888"}}>Effortless</em>
          </h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:24,position:"relative"}} className="step-grid">
          {/* connector */}
          <div className="step-line-h" style={{position:"absolute",top:29,left:"10%",right:"10%",height:"1px",background:`linear-gradient(90deg,${G},rgba(255,193,7,.15),${G},rgba(255,193,7,.1),${G})`,pointerEvents:"none"}}/>
          {steps.map((s,i)=>{
            const Icon=s.icon;
            return (
              <div key={i} className="ps-wrap" style={{textAlign:"center",cursor:"default"}}>
                <div className="ps-num" style={{margin:"0 auto 22px"}}>
                  <span className="gg shimmer" style={{fontSize:"1.25rem",fontWeight:700}}>{s.n}</span>
                </div>
                <h4 className="gg" style={{fontSize:"1.15rem",fontWeight:700,color:D,marginBottom:8}}>{s.title}</h4>
                <p style={{color:"#888",fontSize:".82rem",lineHeight:1.78}}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



/* ─── CTA BANNER ──────────────────────────────────── */
function CTABanner() {
  return (
    <div style={{position:"relative",overflow:"hidden"}}>
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85" alt="" style={{width:"100%",height:460,objectFit:"cover",display:"block"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(14,14,14,.94) 0%,rgba(14,14,14,.65) 55%,rgba(14,14,14,.3) 100%)"}}/>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 7%"}}>
        <div style={{maxWidth:620}}>
          <div className="lbl">Ready for a Premium Ride?</div>
          <h2 className="gg" style={{fontSize:"clamp(2.4rem,4vw,3.8rem)",fontWeight:700,color:W,marginTop:14,lineHeight:1.1}}>
            Book Any Service<br/><span className="shimmer">In Under 60 Seconds</span>
          </h2>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:".94rem",lineHeight:1.85,marginTop:20,maxWidth:420}}>
            Professional drivers, immaculate vehicles, guaranteed on-time — CarCab raises the standard of every journey.
          </p>
          <div style={{display:"flex",gap:14,marginTop:36,flexWrap:"wrap"}}>
            <button className="bg ap" style={{padding:"16px 42px",borderRadius:2,fontSize:".86rem"}}>Book a Ride Now</button>
            <button className="bo-l" style={{padding:"16px 42px",borderRadius:2,fontSize:".86rem",display:"flex",alignItems:"center",gap:8}}>
              <Phone size={14}/> Call Us Anytime
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─── APP ─────────────────────────────────────────── */
export default function Service() {
  const [selected,setSelected]=useState(null);
  return (
    <>
      <style>{CSS}</style>
      {selected ? (
        <ServiceDetail service={selected} onClose={()=>setSelected(null)}/>
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