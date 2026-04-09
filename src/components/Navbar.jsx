import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Phone, X, ArrowRight, MessageCircle } from "lucide-react";
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const G = "#ffc107";
const D = "#080808";
const W = "#ffffff";

const NAV_ITEMS = [
  { label: "Home",     path: "/" },
    { label: "About",    path: "/about" },
  { label: "Services", path: "/service" },
  { label: "Fleet",    path: "/fleet" },
  { label: "Contact",  path: "/contact" },
];

const SERVICE_TYPES = ["City Transfer","Airport Pickup","Outstation","Corporate","Wedding","Night Package"];
const VEHICLES = [
  "Toyota Innova Crysta — Premium MPV",
  "Honda City Sedan — Comfort Sedan",
  "Mercedes GLE — Luxury SUV",
  "Toyota Fortuner — Executive SUV",
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;}

@keyframes shimmer    {0%{background-position:-400% center}100%{background-position:400% center}}
@keyframes pulseGold  {0%,100%{box-shadow:0 0 0 0 rgba(255,193,7,.6)}70%{box-shadow:0 0 0 10px rgba(255,193,7,0)}}
@keyframes rotateSlow {to{transform:rotate(360deg)}}
@keyframes borderFlow {0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes linkIn     {from{opacity:0;transform:translateY(-7px)}to{opacity:1;transform:translateY(0)}}
@keyframes logoIn     {from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}
@keyframes drawerSlide{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes overlayIn  {from{opacity:0}to{opacity:1}}
@keyframes modalIn    {from{opacity:0;transform:scale(.95) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}

.nb-progress{
  position:fixed;top:0;left:0;z-index:400;height:2px;
  background:linear-gradient(90deg,#8B6914,${G},#fff8dc,${G});
  transform-origin:left;pointer-events:none;transition:width .1s linear;
}

.nb-root{
  position:fixed;top:0;left:0;right:0;z-index:300;
  transition:background .45s,backdrop-filter .45s,box-shadow .45s;
}
.nb-root::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(255,193,7,.5) 15%,${G} 35%,#fff8dc 50%,${G} 65%,rgba(255,193,7,.5) 85%,transparent);
  background-size:200% 100%;opacity:0;transition:opacity .5s;
  animation:borderFlow 5s ease infinite;
}
.nb-root.scrolled::before{opacity:1}
.nb-root.scrolled{
  background:rgba(5,5,5,.97);
  backdrop-filter:blur(40px) saturate(1.7);
  border-bottom:1px solid rgba(255,193,7,.07);
  box-shadow:0 8px 56px rgba(0,0,0,.55);
}

.nb-inner{
  max-width:1380px;margin:0 auto;padding:0 5%;
  height:78px;display:flex;align-items:center;
}

/* logo */
.nb-logo{
  display:flex;align-items:center;gap:13px;
  text-decoration:none;flex-shrink:0;margin-right:32px;
  animation:logoIn .75s cubic-bezier(.22,1,.36,1) both;
}
.nb-logo-emblem{position:relative;width:48px;height:48px;flex-shrink:0}
.nb-emblem-ring{
  position:absolute;inset:0;border-radius:50%;
  background:conic-gradient(from 0deg,#8B6914 0%,${G} 25%,#fff8dc 50%,${G} 75%,#8B6914 100%);
  animation:rotateSlow 8s linear infinite;
}
.nb-emblem-face{
  position:absolute;inset:2.5px;border-radius:50%;
  background:linear-gradient(145deg,#1c1400,#060400);
  display:flex;align-items:center;justify-content:center;
}
.nb-logo-glow{position:absolute;inset:-4px;border-radius:50%;animation:pulseGold 3.2s infinite;pointer-events:none}
.nb-logo-text{display:flex;flex-direction:column;line-height:1}
.nb-wordmark{
  font-family:'Cormorant Garamond',serif;
  font-size:1.5rem;font-weight:700;line-height:1;letter-spacing:.03em;
  display:flex;align-items:baseline;
}
.nb-wordmark-white{color:${W}}
.nb-wordmark-gold{
  background:linear-gradient(90deg,#b8860b,${G},#fff8dc,${G},#b8860b);
  background-size:300% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:shimmer 5s linear infinite;
}
.nb-tagline{
  font-family:'Poppins',sans-serif;font-size:.46rem;
  letter-spacing:.38em;text-transform:uppercase;font-weight:700;
  color:rgba(255,193,7,.4);margin-top:3px;
  display:flex;align-items:center;gap:5px;
}
.nb-tagline::before,.nb-tagline::after{
  content:'';display:inline-block;width:12px;height:1px;background:rgba(255,193,7,.25);
}

/* nav links */
.nb-links{display:flex;align-items:center;flex:1;justify-content:center}
.nb-item{position:relative}
.nb-link{
  display:inline-flex;align-items:center;
  font-family:'Poppins',sans-serif;font-size:.69rem;font-weight:500;
  letter-spacing:.09em;text-transform:uppercase;text-decoration:none;
  color:rgba(255,255,255,.48);padding:11px 15px;border-radius:3px;
  white-space:nowrap;position:relative;transition:color .3s;
  animation:linkIn .65s cubic-bezier(.22,1,.36,1) both;
}
.nb-link::after{
  content:'';position:absolute;bottom:5px;left:50%;transform:translateX(-50%);
  width:0;height:1.5px;border-radius:2px;
  background:linear-gradient(90deg,transparent,${G} 40%,${G} 60%,transparent);
  transition:width .35s cubic-bezier(.4,0,.2,1);
}
.nb-link:hover{color:${W}}
.nb-link.active{color:${G}}
.nb-link:hover::after,.nb-link.active::after{width:calc(100% - 24px)}
.nb-item:nth-child(1) .nb-link{animation-delay:.04s}
.nb-item:nth-child(2) .nb-link{animation-delay:.09s}
.nb-item:nth-child(3) .nb-link{animation-delay:.14s}
.nb-item:nth-child(4) .nb-link{animation-delay:.19s}
.nb-item:nth-child(5) .nb-link{animation-delay:.24s}
.nb-item:nth-child(6) .nb-link{animation-delay:.29s}
.nb-item:nth-child(7) .nb-link{animation-delay:.34s}

/* right */
.nb-right{display:flex;align-items:center;gap:10px;flex-shrink:0;margin-left:20px}
.nb-phone-pill{
  display:flex;align-items:center;gap:9px;padding:8px 14px;
  border-radius:3px;border:1px solid rgba(255,193,7,.12);
  background:rgba(255,193,7,.04);text-decoration:none;transition:all .3s;
}
.nb-phone-pill:hover{border-color:rgba(255,193,7,.35);background:rgba(255,193,7,.09)}
.nb-phone-orb{
  width:27px;height:27px;border-radius:50%;
  background:${G};display:flex;align-items:center;justify-content:center;
  flex-shrink:0;animation:pulseGold 3s infinite;
}
.nb-phone-lines{display:flex;flex-direction:column;gap:1px}
.nb-phone-micro{
  font-family:'Poppins',sans-serif;font-size:.49rem;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;color:rgba(255,193,7,.5);
}
.nb-phone-number{font-family:'Poppins',sans-serif;font-size:.73rem;font-weight:600;color:${W};letter-spacing:.03em}
.nb-sep{width:1px;height:26px;background:rgba(255,255,255,.07)}
.nb-cta{
  position:relative;overflow:hidden;
  background:linear-gradient(135deg,#ffcb2f,${G} 50%,#e6ac00);
  background-size:200% 200%;color:${D};
  border:none;cursor:pointer;font-family:'Poppins',sans-serif;
  font-weight:700;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;
  padding:12px 26px;border-radius:3px;
  transition:all .35s cubic-bezier(.4,0,.2,1);
  display:flex;align-items:center;gap:8px;
  animation:borderFlow 4s ease infinite;
}
.nb-cta::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent);
  transform:translateX(-110%);transition:transform .55s;
}
.nb-cta:hover{box-shadow:0 10px 32px rgba(255,193,7,.5);transform:translateY(-2px)}
.nb-cta:hover::before{transform:translateX(110%)}
.nb-cta-dot{width:6px;height:6px;border-radius:50%;background:${D};animation:pulseGold 2s infinite}

/* hamburger — always the last item / far right */
.nb-burger{
  display:none;flex-direction:column;justify-content:center;align-items:center;
  gap:5px;width:44px;height:44px;border-radius:4px;
  background:rgba(255,193,7,.05);border:1px solid rgba(255,193,7,.18);
  cursor:pointer;transition:all .3s;padding:0;flex-shrink:0;
}
.nb-burger:hover{background:rgba(255,193,7,.12);border-color:rgba(255,193,7,.42)}
.nb-bar{width:20px;height:1.5px;border-radius:2px;background:${G};transition:all .4s cubic-bezier(.4,0,.2,1);transform-origin:center}
.nb-burger.open .nb-bar:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.nb-burger.open .nb-bar:nth-child(2){opacity:0;transform:scaleX(0)}
.nb-burger.open .nb-bar:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}

/* drawer */
.nb-drawer{
  position:fixed;inset:0;z-index:500;
  background:rgba(3,3,3,.99);backdrop-filter:blur(44px);
  transform:translateX(105%);transition:transform .46s cubic-bezier(.4,0,.2,1);
  display:flex;flex-direction:column;overflow:hidden;
}
.nb-drawer.open{transform:translateX(0);animation:drawerSlide .46s ease}
.nb-dw-head{
  display:flex;align-items:center;justify-content:space-between;
  padding:22px 6%;border-bottom:1px solid rgba(255,193,7,.07);flex-shrink:0;
}
.nb-dw-logo{display:flex;align-items:center;gap:11px}
.nb-dw-logo-icon{
  width:40px;height:40px;border-radius:50%;
  background:linear-gradient(135deg,${G},#e6ac00);
  display:flex;align-items:center;justify-content:center;
}
.nb-dw-logo-name{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:${W}}
.nb-dw-close{
  width:38px;height:38px;border-radius:50%;
  border:1px solid rgba(255,193,7,.18);background:rgba(255,193,7,.04);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .28s;color:${G};
}
.nb-dw-close:hover{background:${G};color:${D};border-color:${G}}
.nb-dw-body{flex:1;overflow-y:auto;padding:6px 0}
.nb-dw-body::-webkit-scrollbar{width:0}
.nb-dw-section{
  font-family:'Poppins',sans-serif;font-size:.56rem;font-weight:700;
  letter-spacing:.26em;text-transform:uppercase;
  color:rgba(255,193,7,.35);padding:16px 6% 7px;
}
.nb-dw-link{
  display:flex;align-items:center;justify-content:space-between;
  width:100%;padding:15px 6%;
  font-family:'Poppins',sans-serif;font-size:.86rem;font-weight:500;
  color:rgba(255,255,255,.55);text-decoration:none;
  border-bottom:1px solid rgba(255,255,255,.04);
  letter-spacing:.04em;transition:color .22s,background .22s;
}
.nb-dw-link:hover,.nb-dw-link.active{color:${G};background:rgba(255,193,7,.04)}
.nb-dw-link svg{opacity:.4;transition:opacity .25s;flex-shrink:0}
.nb-dw-link:hover svg,.nb-dw-link.active svg{opacity:1}
.nb-dw-foot{
  padding:22px 6% 32px;border-top:1px solid rgba(255,193,7,.07);
  flex-shrink:0;display:flex;flex-direction:column;gap:12px;
}
.nb-dw-bookbtn{
  width:100%;padding:16px;border-radius:3px;border:none;
  background:${G};color:${D};font-family:'Poppins',sans-serif;
  font-weight:700;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
  transition:all .3s;
}
.nb-dw-bookbtn:hover{box-shadow:0 8px 28px rgba(255,193,7,.4);transform:translateY(-2px)}
.nb-dw-phonerow{
  display:flex;align-items:center;justify-content:center;gap:8px;
  font-family:'Poppins',sans-serif;font-size:.78rem;color:rgba(255,255,255,.35);
}
.nb-dw-socs{display:flex;justify-content:center;gap:9px}
.nb-dw-soc{
  width:36px;height:36px;border-radius:50%;
  border:1px solid rgba(255,193,7,.14);background:rgba(255,193,7,.03);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .28s;color:rgba(255,255,255,.38);
}
.nb-dw-soc:hover{background:${G};color:${D};border-color:${G}}

/* ── BOOKING MODAL ── */
.nb-modal-overlay{
  position:fixed;inset:0;z-index:600;
  background:rgba(0,0,0,.8);backdrop-filter:blur(16px);
  display:flex;align-items:center;justify-content:center;
  padding:16px;animation:overlayIn .22s ease;
}
.nb-modal{
  background:#0d0d0d;
  border:1px solid rgba(255,193,7,.14);
  border-radius:10px;
  width:100%;max-width:500px;
  max-height:92vh;overflow-y:auto;
  animation:modalIn .3s cubic-bezier(.22,1,.36,1);
}
.nb-modal::-webkit-scrollbar{width:0}
.nb-modal::before{
  content:'';display:block;height:2px;border-radius:10px 10px 0 0;
  background:linear-gradient(90deg,transparent,${G} 30%,#fff8dc 50%,${G} 70%,transparent);
}
.nb-modal-header{
  padding:20px 22px 16px;
  border-bottom:1px solid rgba(255,255,255,.06);
  display:flex;align-items:flex-start;justify-content:space-between;
}
.nb-modal-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.6rem;font-weight:700;color:${W};line-height:1.1;
}
.nb-modal-title em{
  background:linear-gradient(90deg,#b8860b,${G},#fff8dc,${G},#b8860b);
  background-size:300% auto;-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text;
  animation:shimmer 5s linear infinite;font-style:normal;
}
.nb-modal-sub{
  font-family:'Poppins',sans-serif;font-size:.65rem;
  color:rgba(255,255,255,.28);letter-spacing:.06em;margin-top:4px;
}
.nb-modal-close{
  width:32px;height:32px;border-radius:50%;
  border:1px solid rgba(255,193,7,.2);background:rgba(255,193,7,.04);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .25s;color:${G};flex-shrink:0;margin-left:10px;
}
.nb-modal-close:hover{background:${G};color:${D};border-color:${G}}
.nb-modal-body{padding:18px 22px 22px;display:flex;flex-direction:column;gap:14px}

.nb-chips{display:flex;flex-wrap:wrap;gap:6px}
.nb-chip{
  padding:6px 12px;border-radius:3px;font-size:.6rem;font-weight:600;
  letter-spacing:.08em;text-transform:uppercase;cursor:pointer;
  border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);
  color:rgba(255,255,255,.38);transition:all .22s;
  font-family:'Poppins',sans-serif;
}
.nb-chip:hover{border-color:rgba(255,193,7,.35);color:rgba(255,193,7,.8)}
.nb-chip.selected{background:rgba(255,193,7,.12);border-color:rgba(255,193,7,.5);color:${G}}

.nb-field{display:flex;flex-direction:column;gap:6px}
.nb-field-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.nb-label{
  font-family:'Poppins',sans-serif;font-size:.58rem;font-weight:700;
  letter-spacing:.15em;text-transform:uppercase;color:rgba(255,193,7,.55);
}
.nb-input,.nb-select,.nb-textarea{
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);
  border-radius:4px;padding:10px 13px;
  font-family:'Poppins',sans-serif;font-size:.78rem;color:${W};
  transition:border-color .22s,background .22s;outline:none;width:100%;
}
.nb-input::placeholder,.nb-textarea::placeholder{color:rgba(255,255,255,.18)}
.nb-input:focus,.nb-select:focus,.nb-textarea:focus{
  border-color:rgba(255,193,7,.5);background:rgba(255,193,7,.03);
}
.nb-select{cursor:pointer;color:rgba(255,255,255,.5)}
.nb-select option{background:#111;color:${W}}
.nb-textarea{resize:none}

.nb-submit-btn{
  width:100%;padding:14px;background:${G};color:${D};border:none;border-radius:3px;
  font-family:'Poppins',sans-serif;font-weight:700;font-size:.76rem;
  letter-spacing:.12em;text-transform:uppercase;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;
  transition:all .3s;margin-top:2px;position:relative;overflow:hidden;
}
.nb-submit-btn::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.32),transparent);
  transform:translateX(-110%);transition:transform .5s;
}
.nb-submit-btn:hover{background:#ffcb2f;box-shadow:0 8px 28px rgba(255,193,7,.4);transform:translateY(-1px)}
.nb-submit-btn:hover::before{transform:translateX(110%)}
.nb-submit-btn.confirmed{background:#2d9e5f !important;color:#fff !important;cursor:default}

.nb-trust-row{
  display:flex;align-items:center;justify-content:center;gap:14px;
  padding-top:6px;border-top:1px solid rgba(255,255,255,.05);flex-wrap:wrap;
}
.nb-trust-item{
  display:flex;align-items:center;gap:5px;
  font-family:'Poppins',sans-serif;font-size:.58rem;
  color:rgba(255,255,255,.22);letter-spacing:.04em;
}
.nb-trust-icon{color:${G};font-size:10px}

/* responsive */
@media(max-width:1120px){
  .nb-logo{margin-right:18px}
  .nb-link{padding:11px 11px;font-size:.65rem}
  .nb-phone-lines{display:none}
  .nb-phone-pill{padding:8px;border-radius:50%}
}
@media(max-width:900px){
  .nb-links      {display:none !important}
  .nb-phone-pill {display:none !important}
  .nb-sep        {display:none !important}
  .nb-cta        {display:none !important}
  .nb-burger     {display:flex !important}
}
@media(max-width:600px){
  .nb-inner      {height:66px;padding:0 4%}
  .nb-tagline    {display:none}
  .nb-wordmark   {font-size:1.28rem}
  .nb-field-row  {grid-template-columns:1fr}
  .nb-modal-body    {padding:16px 16px 20px}
  .nb-modal-header  {padding:18px 16px 14px}
}
`;

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled]       = useState(false);
  const [scrollPct, setScrollPct]     = useState(0);
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [modalOpen, setModalOpen]     = useState(false);
  const [selectedSvc, setSelectedSvc] = useState("City Transfer");
  const [confirmed, setConfirmed]     = useState(false);
  const [form, setForm] = useState({
    pickup: "", drop: "", date: "", time: "",
    vehicle: "", name: "", phone: "", note: "",
  });

  // scroll listener
  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setScrollPct(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = (drawerOpen || modalOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, modalOpen]);

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (modalOpen)       setModalOpen(false);
        else if (drawerOpen) setDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen, drawerOpen]);

  const openModal = () => {
    setConfirmed(false);
    setModalOpen(true);
    setDrawerOpen(false);
  };

  const handleSubmit = () => {
    if (confirmed) return;
    setConfirmed(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmed(false);
      setForm({ pickup:"", drop:"", date:"", time:"", vehicle:"", name:"", phone:"", note:"" });
    }, 1800);
  };

  // active check using React Router location
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <style>{CSS}</style>

      {/* scroll progress bar */}
      <div className="nb-progress" style={{ width: `${scrollPct}%` }} />

      {/* ── Navbar ── */}
      <nav className={`nb-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nb-inner">

          {/* Logo → navigates to "/" */}
          <Link className="nb-logo" to="/">
            <div className="nb-logo-emblem">
            </div>
            <div className="nb-logo-text">
              <div className="nb-wordmark">
                <span className="nb-wordmark-white">Car</span>
                <span className="nb-wordmark-gold">Cab</span>
              </div>
              <div className="nb-tagline">Premium · Service</div>
            </div>
          </Link>

          {/* Nav Links — React Router <Link>, zero dropdowns */}
          <div className="nb-links">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="nb-item">
                <Link
                  to={item.path}
                  className={`nb-link ${isActive(item.path) ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Right — phone · divider · book · hamburger (far-right) */}
          <div className="nb-right">
            <a className="nb-phone-pill" href="tel:+919XXXXXXXXX">
              <div className="nb-phone-orb">
                <Phone size={12} color={D} strokeWidth={2.5} />
              </div>
              <div className="nb-phone-lines">
                <span className="nb-phone-micro">24/7 Support</span>
                <span className="nb-phone-number">+91 9XXXXXXXXX</span>
              </div>
            </a>
            <div className="nb-sep" />
            <button className="nb-cta" onClick={openModal}>
              <div className="nb-cta-dot" />
              Book a Ride
            </button>

            {/* Hamburger — always the last element = far right */}
            <button
              className={`nb-burger ${drawerOpen ? "open" : ""}`}
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <div className="nb-bar" />
              <div className="nb-bar" />
              <div className="nb-bar" />
            </button>
          </div>

        </div>
      </nav>

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
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`nb-dw-link ${isActive(item.path) ? "active" : ""}`}
            >
              {item.label}
              <ArrowRight size={14} />
            </Link>
          ))}

          <div className="nb-dw-section" style={{ marginTop: 8 }}>Quick Contact</div>
          <a href="tel:+919XXXXXXXXX" className="nb-dw-link">
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Phone size={14} color={G} /> +91 99XXXXXXXX
            </span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="nb-dw-foot">
          <button className="nb-dw-bookbtn" onClick={openModal}>
            <Car size={15} /> Book a Ride Now
          </button>
          <div className="nb-dw-phonerow">
            <Phone size={12} color={G} />
            <span>24/7 Support: +91 9XXXXXXXXX</span>
          </div>
          <div className="nb-dw-socs">
            {[FaInstagramSquare, FaTwitterSquare, MessageCircle].map((Icon, i) => (
              <button key={i} className="nb-dw-soc"><Icon size={14} /></button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Booking Modal (compact) ── */}
      {modalOpen && (
        <div
          className="nb-modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="nb-modal">

            <div className="nb-modal-header">
              <div>
                <div className="nb-modal-title">Book a <em>Ride</em></div>
                <div className="nb-modal-sub">Fill in your trip details below</div>
              </div>
              <button className="nb-modal-close" onClick={() => setModalOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <div className="nb-modal-body">

              {/* Service type chips */}
              <div className="nb-field">
                <label className="nb-label">Service Type</label>
                <div className="nb-chips">
                  {SERVICE_TYPES.map((s) => (
                    <div
                      key={s}
                      className={`nb-chip ${selectedSvc === s ? "selected" : ""}`}
                      onClick={() => setSelectedSvc(s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickup & Drop */}
              <div className="nb-field-row">
                <div className="nb-field">
                  <label className="nb-label">Pickup</label>
                  <input className="nb-input" type="text" placeholder="Pickup address"
                    value={form.pickup}
                    onChange={(e) => setForm({ ...form, pickup: e.target.value })} />
                </div>
                <div className="nb-field">
                  <label className="nb-label">Drop</label>
                  <input className="nb-input" type="text" placeholder="Drop address"
                    value={form.drop}
                    onChange={(e) => setForm({ ...form, drop: e.target.value })} />
                </div>
              </div>

              {/* Date & Time */}
              <div className="nb-field-row">
                <div className="nb-field">
                  <label className="nb-label">Date</label>
                  <input className="nb-input" type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="nb-field">
                  <label className="nb-label">Time</label>
                  <input className="nb-input" type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>

              {/* Vehicle */}
              <div className="nb-field">
                <label className="nb-label">Vehicle</label>
                <select className="nb-select"
                  value={form.vehicle}
                  onChange={(e) => setForm({ ...form, vehicle: e.target.value })}>
                  <option value="">Select vehicle class</option>
                  {VEHICLES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="nb-field-row">
                <div className="nb-field">
                  <label className="nb-label">Name</label>
                  <input className="nb-input" type="text" placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="nb-field">
                  <label className="nb-label">Phone</label>
                  <input className="nb-input" type="tel" placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              {/* Note */}
              <div className="nb-field">
                <label className="nb-label">
                  Note{" "}
                  <span style={{
                    color: "rgba(255,255,255,.18)", fontSize: ".57rem",
                    letterSpacing: 0, textTransform: "none", fontWeight: 400,
                  }}>
                    (optional)
                  </span>
                </label>
                <textarea className="nb-textarea" rows={2}
                  placeholder="Flight no., child seat, luggage..."
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })} />
              </div>

              <button
                className={`nb-submit-btn ${confirmed ? "confirmed" : ""}`}
                onClick={handleSubmit}
              >
                {confirmed
                  ? "✓ Booking Confirmed!"
                  : <><div className="nb-cta-dot" /> Confirm My Booking</>
                }
              </button>

              <div className="nb-trust-row">
                <div className="nb-trust-item"><span className="nb-trust-icon">✓</span> Free cancellation</div>
                <div className="nb-trust-item"><span className="nb-trust-icon">✓</span> Instant confirmation</div>
                <div className="nb-trust-item"><span className="nb-trust-icon">✓</span> 24/7 support</div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}