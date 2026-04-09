import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight, Car } from "lucide-react";
import { FaInstagramSquare, FaTwitterSquare, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import logo from "/logo.png";

const G = "#ffc107";
const D = "#080808";
const W = "#ffffff";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Poppins:wght@300;400;500;600;700&display=swap');

@keyframes shimmer    {0%{background-position:-400% center}100%{background-position:400% center}}
@keyframes pulseGold  {0%,100%{box-shadow:0 0 0 0 rgba(255,193,7,.5)}70%{box-shadow:0 0 0 8px rgba(255,193,7,0)}}
@keyframes borderFlow {0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes waveMove   {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ── WAVE DIVIDER ── */
.ft-wave-wrap{
  position:relative;overflow:hidden;height:80px;
  background:transparent;margin-bottom:-2px;
  pointer-events:none;
}
.ft-wave-wrap svg{
  position:absolute;bottom:0;left:0;
  width:200%;height:100%;
  animation:waveMove 18s linear infinite;
}

/* ── FOOTER ROOT ── */
.ft-root{
  background:#070707;
  border-top:1px solid rgba(255,193,7,.1);
  position:relative;overflow:hidden;
  font-family:'Poppins',sans-serif;
}

/* subtle grid texture overlay */
.ft-root::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(255,193,7,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,193,7,.025) 1px, transparent 1px);
  background-size:48px 48px;
  mask-image:radial-gradient(ellipse 90% 60% at 50% 0%, black 40%, transparent 100%);
}

/* golden glow orbs */
.ft-root::after{
  content:'';position:absolute;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle, rgba(255,193,7,.04) 0%, transparent 70%);
  top:-200px;left:-150px;pointer-events:none;
}
.ft-glow-r{
  position:absolute;width:500px;height:500px;border-radius:50%;
  background:radial-gradient(circle, rgba(255,193,7,.035) 0%, transparent 70%);
  bottom:-180px;right:-120px;pointer-events:none;
}

.ft-top-bar{
  height:2px;
  background:linear-gradient(90deg,
    transparent 0%,
    rgba(255,193,7,.3) 15%,
    ${G} 35%,
    #fff8dc 50%,
    ${G} 65%,
    rgba(255,193,7,.3) 85%,
    transparent 100%
  );
  background-size:200% 100%;
  animation:borderFlow 5s ease infinite;
}

/* ── MAIN GRID ── */
.ft-main{
  max-width:1380px;margin:0 auto;
  padding:56px 5% 40px;
  display:grid;
  grid-template-columns:1.6fr 1fr 1fr 1fr;
  gap:40px 48px;
  position:relative;z-index:1;
}

/* ── BRAND COL ── */
.ft-brand{}
.ft-logo-wrap{
  display:inline-flex;align-items:center;
  text-decoration:none;margin-bottom:20px;
}
.ft-logo-img{
  /* same "big logo" size as navbar request — tall but contained */
  height: 220px;
  width: auto;
  object-fit:contain;
  display:block;
  padding:12px 0;
  transition:opacity .3s;
}
.ft-logo-wrap:hover .ft-logo-img{opacity:.82}

.ft-brand-desc{
  font-size:.73rem;font-weight:300;line-height:1.75;
  color:rgba(255,255,255,.38);max-width:280px;margin-bottom:24px;
  letter-spacing:.02em;
}

/* contact mini */
.ft-contact-mini{display:flex;flex-direction:column;gap:10px;margin-bottom:26px}
.ft-contact-item{
  display:flex;align-items:flex-start;gap:10px;
  font-size:.7rem;color:rgba(255,255,255,.38);line-height:1.5;
}
.ft-contact-item a{color:rgba(255,255,255,.38);text-decoration:none;transition:color .22s}
.ft-contact-item a:hover{color:${G}}
.ft-contact-icon{
  width:24px;height:24px;border-radius:50%;flex-shrink:0;
  background:rgba(255,193,7,.08);border:1px solid rgba(255,193,7,.15);
  display:flex;align-items:center;justify-content:center;
  color:${G};margin-top:1px;
}

/* socials */
.ft-socs{display:flex;gap:8px}
.ft-soc{
  width:34px;height:34px;border-radius:6px;
  border:1px solid rgba(255,193,7,.14);background:rgba(255,193,7,.03);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .28s;color:rgba(255,255,255,.35);
  text-decoration:none;
}
.ft-soc:hover{background:${G};color:${D};border-color:${G};transform:translateY(-2px)}

/* ── LINK COLS ── */
.ft-col-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.1rem;font-weight:700;color:${W};
  margin-bottom:18px;position:relative;padding-bottom:12px;
  letter-spacing:.02em;
}
.ft-col-title::after{
  content:'';position:absolute;left:0;bottom:0;
  width:28px;height:1.5px;border-radius:2px;
  background:linear-gradient(90deg,${G},transparent);
}

.ft-link-list{display:flex;flex-direction:column;gap:0}
.ft-link-item{
  display:flex;align-items:center;gap:7px;
  padding:7px 0;
  font-size:.71rem;font-weight:400;letter-spacing:.03em;
  color:rgba(255,255,255,.38);text-decoration:none;
  border-bottom:1px solid rgba(255,255,255,.04);
  transition:color .22s,padding-left .22s;
  position:relative;
}
.ft-link-item svg{
  opacity:0;color:${G};transition:opacity .22s,transform .22s;
  transform:translateX(-4px);flex-shrink:0;
}
.ft-link-item:hover{color:${G};padding-left:6px}
.ft-link-item:hover svg{opacity:1;transform:translateX(0)}
.ft-link-item:last-child{border-bottom:none}

/* service badge pills */
.ft-badge{
  display:inline-block;
  font-size:.52rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  padding:2px 7px;border-radius:2px;
  background:rgba(255,193,7,.1);color:${G};
  margin-left:6px;vertical-align:middle;border:1px solid rgba(255,193,7,.2);
}

/* ── BOTTOM BAR ── */
.ft-bottom{
  border-top:1px solid rgba(255,255,255,.05);
  position:relative;z-index:1;
}
.ft-bottom-inner{
  max-width:1380px;margin:0 auto;padding:18px 5%;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:12px;
}
.ft-copy{
  font-size:.62rem;color:rgba(255,255,255,.22);letter-spacing:.04em;
}
.ft-copy em{color:rgba(255,193,7,.5);font-style:normal}
.ft-legal-links{display:flex;gap:20px}
.ft-legal-link{
  font-size:.6rem;color:rgba(255,255,255,.22);text-decoration:none;
  letter-spacing:.04em;transition:color .2s;
}
.ft-legal-link:hover{color:${G}}

/* ── NEWSLETTER STRIP ── */
.ft-newsletter{
  background:linear-gradient(135deg,rgba(255,193,7,.06) 0%,rgba(255,193,7,.02) 100%);
  border-top:1px solid rgba(255,193,7,.08);
  border-bottom:1px solid rgba(255,193,7,.08);
  position:relative;z-index:1;
}
.ft-nl-inner{
  max-width:1380px;margin:0 auto;padding:26px 5%;
  display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;
}
.ft-nl-text{}
.ft-nl-title{
  font-family:'Cormorant Garamond',serif;
  font-size:1.25rem;font-weight:700;color:${W};
  margin-bottom:3px;
}
.ft-nl-title em{
  background:linear-gradient(90deg,#b8860b,${G},#fff8dc,${G},#b8860b);
  background-size:300% auto;-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text;
  animation:shimmer 5s linear infinite;font-style:normal;
}
.ft-nl-sub{font-size:.64rem;color:rgba(255,255,255,.3);letter-spacing:.03em}
.ft-nl-form{display:flex;gap:8px;flex:1;max-width:400px}
.ft-nl-input{
  flex:1;background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.1);border-radius:3px;
  padding:10px 14px;font-size:.72rem;font-family:'Poppins',sans-serif;
  color:${W};outline:none;transition:border-color .22s,background .22s;
}
.ft-nl-input::placeholder{color:rgba(255,255,255,.2)}
.ft-nl-input:focus{border-color:rgba(255,193,7,.45);background:rgba(255,193,7,.03)}
.ft-nl-btn{
  background:${G};color:${D};border:none;border-radius:3px;
  padding:10px 18px;font-family:'Poppins',sans-serif;
  font-weight:700;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;
  cursor:pointer;white-space:nowrap;transition:all .3s;
  display:flex;align-items:center;gap:6px;
}
.ft-nl-btn:hover{background:#ffcb2f;box-shadow:0 6px 22px rgba(255,193,7,.4);transform:translateY(-1px)}

/* ── RESPONSIVE ── */
@media(max-width:1100px){
  .ft-main{grid-template-columns:1.4fr 1fr 1fr;gap:36px 36px}
  .ft-col-quick{display:none}
}
@media(max-width:760px){
  .ft-main{grid-template-columns:1fr 1fr;gap:32px 24px;padding:40px 5% 32px}
  .ft-brand{grid-column:1/-1}
  .ft-logo-img{height:160px}
  .ft-nl-form{max-width:100%;width:100%}
  .ft-nl-inner{flex-direction:column;align-items:flex-start}
}
@media(max-width:480px){
  .ft-main{grid-template-columns:1fr;padding:32px 5% 28px}
  .ft-logo-img{height:130px}
  .ft-bottom-inner{flex-direction:column;align-items:flex-start;gap:8px}
  .ft-legal-links{flex-wrap:wrap;gap:12px}
  .ft-wave-wrap{height:50px}
}
`;

const NAV_ITEMS = [
  { label: "Home",     path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/service" },
  { label: "Fleet",    path: "/fleet" },
  { label: "Contact",  path: "/contact" },
];

const SERVICES = [
  { label: "City Transfer",    path: "/service" },
  { label: "Airport Pickup",   path: "/service", badge: "Popular" },
  { label: "Outstation",       path: "/service" },
  { label: "Corporate",        path: "/service" },
  { label: "Wedding",          path: "/service", badge: "Premium" },
  { label: "Night Package",    path: "/service" },
];

const FLEET = [
  { label: "Toyota Innova Crysta",  path: "/fleet" },
  { label: "Honda City Sedan",      path: "/fleet" },
  { label: "Mercedes GLE",          path: "/fleet", badge: "Luxury" },
  { label: "Toyota Fortuner",       path: "/fleet" },
];

export default function Footer() {
  return (
    <>
      <style>{CSS}</style>

      {/* ── Wavy top edge ── */}
      <div className="ft-wave-wrap" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="#070707"
          />
          <path
            d="M1440,40 C1260,80 1080,0 900,40 C720,80 540,0 360,40 C180,80 60,20 0,40 L0,80 L1440,80 Z"
            fill="#070707"
          />
        </svg>
      </div>

      <footer className="ft-root">
        <div className="ft-top-bar" />
        <div className="ft-glow-r" aria-hidden="true" />

        {/* ── Newsletter strip ── */}
        <div className="ft-newsletter">
          <div className="ft-nl-inner">
            <div className="ft-nl-text">
              <div className="ft-nl-title">Stay <em>Updated</em></div>
              <div className="ft-nl-sub">Exclusive offers & luxury travel tips, straight to you</div>
            </div>
            <div className="ft-nl-form">
              <input className="ft-nl-input" type="email" placeholder="Your email address" />
              <button className="ft-nl-btn">
                <Car size={13} /> Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="ft-main">

          {/* Brand col */}
          <div className="ft-brand">
            <Link to="/" className="ft-logo-wrap">
              <img src={logo} alt="CarCab Logo" className="ft-logo-img" />
            </Link>
            <p className="ft-brand-desc">
              Premium chauffeur services crafted for those who demand elegance,
              punctuality, and absolute comfort — every single journey.
            </p>

            <div className="ft-contact-mini">
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><MapPin size={11} /></div>
                <span>Admin Company Street 30,<br/>Zip 1234 44, City New York City</span>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><Phone size={11} /></div>
                <a href="tel:+919XXXXXXXXX">+91 9XXXXXXXXX</a>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><Mail size={11} /></div>
                <a href="mailto:info@carcab.com">info@carcab.com</a>
              </div>
            </div>

            <div className="ft-socs">
              {[
                { Icon: FaInstagramSquare, href: "#", label: "Instagram" },
                { Icon: FaFacebookSquare,  href: "#", label: "Facebook"  },
                { Icon: FaTwitterSquare,   href: "#", label: "Twitter"   },
                { Icon: FaYoutube,         href: "#", label: "YouTube"   },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} className="ft-soc" aria-label={label}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="ft-col-quick">
            <div className="ft-col-title">Quick Links</div>
            <div className="ft-link-list">
              {NAV_ITEMS.map(({ label, path }) => (
                <Link key={label} to={path} className="ft-link-item">
                  <ArrowRight size={11} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="ft-col-title">Services</div>
            <div className="ft-link-list">
              {SERVICES.map(({ label, path, badge }) => (
                <Link key={label} to={path} className="ft-link-item">
                  <ArrowRight size={11} />
                  {label}
                  {badge && <span className="ft-badge">{badge}</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Fleet */}
          <div>
            <div className="ft-col-title">Our Fleet</div>
            <div className="ft-link-list">
              {FLEET.map(({ label, path, badge }) => (
                <Link key={label} to={path} className="ft-link-item">
                  <ArrowRight size={11} />
                  {label}
                  {badge && <span className="ft-badge">{badge}</span>}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">
            <p className="ft-copy">
              © {new Date().getFullYear()} <em>CarCab Luxury</em>. All rights reserved.
            </p>
            <div className="ft-legal-links">
              {["Privacy Policy","Terms of Service","Refund Policy","Sitemap"].map(t => (
                <Link key={t} to="/" className="ft-legal-link">{t}</Link>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}