import { useState, type CSSProperties } from "react";
import { Link } from "wouter";
import {
  ArrowDown,
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  Check,
  Compass,
  HeartHandshake,
  Layers3,
  Menu,
  Play,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import logo from "@assets/tbrefinedLogotransbkgrd_1788469856734.png";
import purposeImage from "@assets/stock_images/professional_diverse_60c21c44.jpg";
import professionalImage from "@assets/stock_images/professional_diverse_78f88680.jpg";
import journeyImage from "@assets/journeypath2_1771081561926.jpg";
import sunsetImage from "@assets/backgroundhmpg_1765929083902.jpg";

const checkoutUrl = "https://buy.stripe.com/dRm4gz6BR2uzg4cdMD8bS05";
const welcomeVideoUrl = "https://youtu.be/8odfNAAeo48";

const journeySteps = [
  {
    number: "01",
    icon: Compass,
    title: "Discover Purpose",
    description:
      "Get clear on who you are, what matters most, and the kind of future that feels true to you.",
    note: "Start with what matters",
  },
  {
    number: "02",
    icon: ChartNoAxesColumnIncreasing,
    title: "Analyze Change",
    description:
      "Recognize the patterns, strengths, and possibilities shaping the next season of your life.",
    note: "See the whole picture",
  },
  {
    number: "03",
    icon: Target,
    title: "Implement Your Plan",
    description:
      "Turn insight into a practical blueprint, build momentum, and stay accountable as you grow.",
    note: "Move forward with support",
  },
];

const valueProps = [
  { icon: Layers3, title: "Guided tools", text: "Thoughtful workbooks and practical exercises" },
  { icon: HeartHandshake, title: "Real support", text: "Coaching, connection, and community" },
  { icon: Compass, title: "Your own path", text: "A personal plan built around your life" },
];

export default function NewHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="tb-home">
      <style>{`
        .tb-home {
          --ink: #25183f;
          --plum: #321b59;
          --plum-deep: #211239;
          --violet: #67449a;
          --gold: #f4bd43;
          --gold-light: #ffdc83;
          --cream: #fff9ef;
          --muted: #655d70;
          color: var(--ink);
          background: var(--cream);
          font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif;
          overflow: hidden;
          min-height: 100dvh;
        }
        .tb-home * { box-sizing: border-box; }
        .tb-home a { color: inherit; text-decoration: none; }
        .tb-home button { font: inherit; }
        .tb-home .serif { font-family: Georgia, "Times New Roman", serif; }
        .tb-home .topbar {
          position: relative; z-index: 20; background: #fffaf2;
          border-bottom: 1px solid rgba(53, 31, 81, .1);
        }
        .tb-home .nav-wrap {
          width: min(1240px, calc(100% - 56px)); min-height: 82px; margin: auto;
          display: flex; align-items: center; justify-content: space-between; gap: 28px;
        }
        .tb-home .brand { display: flex; align-items: center; flex: 0 0 auto; }
        .tb-home .brand img { width: 222px; height: 64px; object-fit: contain; }
        .tb-home .nav-links { display: flex; align-items: center; gap: clamp(18px, 2.4vw, 36px); }
        .tb-home .nav-links a {
          font-size: 13px; font-weight: 700; color: #4e4560; transition: color .2s ease;
        }
        .tb-home .nav-links a:hover { color: #8a5c13; }
        .tb-home .nav-actions { display: flex; align-items: center; gap: 12px; }
        .tb-home .nav-login { font-size: 13px; font-weight: 750; padding: 10px 14px; }
        .tb-home .button {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          border: 0; border-radius: 999px; font-weight: 800; line-height: 1.15;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
          cursor: pointer;
        }
        .tb-home .button:hover { transform: translateY(-2px); }
        .tb-home .button-gold {
          background: linear-gradient(135deg, #ffda76, #e9a928); color: #2b1b39;
          box-shadow: 0 9px 24px rgba(226, 164, 43, .24);
        }
        .tb-home .button-gold:hover { box-shadow: 0 12px 28px rgba(226, 164, 43, .35); }
        .tb-home .button-outline {
          color: white; border: 1px solid rgba(255,255,255,.58); background: rgba(47, 25, 75, .22);
        }
        .tb-home .button-sm { min-height: 42px; padding: 0 20px; font-size: 13px; }
        .tb-home .button-lg { min-height: 56px; padding: 0 26px; font-size: 15px; }
        .tb-home .menu-toggle { display: none; border: 0; background: transparent; color: var(--plum); padding: 8px; }
        .tb-home .hero {
          min-height: 610px; position: relative; isolation: isolate; color: #fff;
          background:
            radial-gradient(ellipse at 59% 25%, rgba(241, 166, 96, .34), transparent 34%),
            linear-gradient(112deg, #261641 0%, #43266c 48%, #7e467d 100%);
        }
        .tb-home .hero:before {
          content: ""; position: absolute; inset: 0; z-index: -2; opacity: .2;
          background-image: var(--hero-background);
          background-position: center 47%; background-size: cover; mix-blend-mode: screen;
        }
        .tb-home .hero:after {
          content: ""; position: absolute; inset: 0; z-index: -1;
          background: linear-gradient(90deg, rgba(35, 20, 58, .86) 0%, rgba(42, 24, 68, .73) 45%, rgba(47, 25, 64, .06) 100%);
        }
        .tb-home .hero-inner {
          width: min(1240px, calc(100% - 56px)); min-height: 610px; margin: auto;
          display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(390px, .92fr);
          align-items: center; position: relative; padding: 56px 0 70px;
        }
        .tb-home .hero-copy { max-width: 650px; position: relative; z-index: 2; padding: 8px 0 0; }
        .tb-home .eyebrow {
          display: flex; align-items: center; gap: 11px; text-transform: uppercase;
          letter-spacing: .2em; font-size: 11px; font-weight: 800; color: #f6d78d;
        }
        .tb-home .eyebrow span { opacity: .48; }
        .tb-home h1 {
          font-size: clamp(48px, 5.6vw, 76px); line-height: .99; letter-spacing: -.045em;
          margin: 19px 0 22px; max-width: 720px; font-weight: 750;
        }
        .tb-home h1 em { color: var(--gold-light); font-style: italic; font-weight: 700; }
        .tb-home .hero-lede {
          max-width: 565px; color: rgba(255,255,255,.85); font-size: 17px;
          line-height: 1.7; margin: 0;
        }
        .tb-home .promise-row {
          display: flex; align-items: center; margin: 27px 0 31px; max-width: 580px;
        }
        .tb-home .promise {
          flex: 1; min-height: 47px; display: flex; align-items: center; gap: 10px;
          padding: 0 16px; border-right: 1px solid rgba(255,255,255,.3);
          font-size: 13px; line-height: 1.25; font-weight: 750;
        }
        .tb-home .promise:first-child { padding-left: 0; }
        .tb-home .promise:last-child { border: 0; padding-right: 0; }
        .tb-home .promise svg { flex: 0 0 auto; color: var(--gold); width: 25px; height: 25px; }
        .tb-home .hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 13px; }
        .tb-home .video-link { display: inline-flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 750; padding: 12px 15px; }
        .tb-home .play-disc {
          width: 28px; height: 28px; border-radius: 50%; background: #fff; color: var(--plum);
          display: grid; place-items: center;
        }
        .tb-home .offer-line {
          margin-top: 20px; color: rgba(255,255,255,.86); font-size: 13px;
          display: flex; align-items: center; gap: 8px;
        }
        .tb-home .offer-line svg { color: var(--gold); }
        .tb-home .offer-line strong { color: #ffe19a; }
        .tb-home .hero-visual {
          height: 480px; position: relative; align-self: end; margin: 0 -24px -70px 0;
          display: flex; justify-content: flex-end; align-items: flex-end;
        }
        .tb-home .sun-orb {
          position: absolute; width: 300px; height: 300px; top: 35px; left: 21%;
          border-radius: 50%; background: radial-gradient(circle, #ffd88b 0%, #f4a359 38%, rgba(232,123,111,.2) 72%, transparent 73%);
          filter: blur(.2px); opacity: .86;
        }
        .tb-home .portrait {
          position: relative; z-index: 1; width: min(100%, 470px); height: 440px;
          object-fit: cover; object-position: 50% 34%; border-radius: 47% 47% 12px 12px;
          filter: saturate(.88); box-shadow: 0 25px 75px rgba(19, 10, 35, .3);
          mask-image: linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%);
        }
        .tb-home .visual-caption {
          position: absolute; z-index: 3; bottom: 58px; left: 3px; max-width: 220px;
          padding: 15px 18px; color: var(--ink); border-radius: 14px; background: rgba(255,249,239,.93);
          box-shadow: 0 12px 30px rgba(20, 12, 32, .17); font-size: 12px; line-height: 1.5;
        }
        .tb-home .visual-caption strong { display: block; font-family: Georgia, serif; font-size: 17px; margin-bottom: 2px; }
        .tb-home .hero-bottom {
          position: absolute; left: 0; right: 0; bottom: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent);
        }
        .tb-home .section-shell { width: min(1240px, calc(100% - 56px)); margin: 0 auto; }
        .tb-home .about-section { padding: 76px 0 84px; background: #fff9ef; }
        .tb-home .info-card {
          display: grid; grid-template-columns: 1.1fr 1.7fr 2.25fr; align-items: center;
          gap: 32px; padding: 31px 35px; background: #fff; border: 1px solid #eee3d2;
          border-radius: 22px; box-shadow: 0 17px 48px rgba(54, 33, 69, .07);
        }
        .tb-home .info-heading { border-right: 1px solid #e9c75e; padding: 7px 25px 7px 0; }
        .tb-home .info-heading .small-label {
          text-transform: uppercase; letter-spacing: .16em; font-size: 10px;
          font-weight: 850; color: #946627; margin-bottom: 10px;
        }
        .tb-home .info-heading h2 { color: var(--plum); font-size: 30px; line-height: 1.05; margin: 0; }
        .tb-home .info-heading h2 span { color: #b47a1c; }
        .tb-home .info-copy { margin: 0; color: #635c6d; font-size: 14px; line-height: 1.75; }
        .tb-home .value-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .tb-home .value-item {
          min-height: 112px; padding: 17px 13px; border-radius: 14px;
          background: #f8f3fb; text-align: center; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
        }
        .tb-home .value-item svg { color: #6d3e91; width: 25px; height: 25px; }
        .tb-home .value-item strong { font-size: 11px; line-height: 1.3; }
        .tb-home .journey-section { padding: 88px 0 90px; background: #f6eff8; position: relative; }
        .tb-home .journey-section:before {
          content: ""; position: absolute; inset: 0; opacity: .16;
          background-image: var(--journey-background);
          background-position: center; background-size: cover;
        }
        .tb-home .journey-section:after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(248,243,249,.95), rgba(247,238,248,.91)); }
        .tb-home .journey-content { position: relative; z-index: 1; }
        .tb-home .section-kicker { color: #8a5c13; text-transform: uppercase; letter-spacing: .18em; font-weight: 850; font-size: 11px; }
        .tb-home .section-title { color: var(--plum); font-size: clamp(34px, 4vw, 48px); line-height: 1.08; margin: 11px 0 14px; letter-spacing: -.035em; }
        .tb-home .section-intro { color: #62586e; max-width: 650px; font-size: 16px; line-height: 1.7; margin: 0; }
        .tb-home .journey-head { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 39px; }
        .tb-home .journey-head .journey-aside { color: #6a5b74; font-family: Georgia, serif; font-style: italic; font-size: 17px; max-width: 240px; }
        .tb-home .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .tb-home .step-card {
          min-height: 290px; background: rgba(255,255,255,.94); border: 1px solid rgba(74,45,94,.11);
          border-radius: 20px; padding: 27px 28px 25px; box-shadow: 0 13px 34px rgba(61,35,71,.06);
          position: relative; overflow: hidden; transition: transform .25s ease, box-shadow .25s ease;
        }
        .tb-home .step-card:hover { transform: translateY(-5px); box-shadow: 0 20px 42px rgba(61,35,71,.12); }
        .tb-home .step-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; }
        .tb-home .step-number { color: #b27a19; background: #fff2cd; border-radius: 50%; width: 40px; height: 40px; display: grid; place-items: center; font-weight: 850; font-size: 13px; }
        .tb-home .step-icon { color: #693c8e; width: 29px; height: 29px; }
        .tb-home .step-card h3 { color: var(--plum); font-size: 23px; letter-spacing: -.025em; margin: 0 0 12px; }
        .tb-home .step-card p { color: #61596b; line-height: 1.65; font-size: 14px; margin: 0; max-width: 330px; }
        .tb-home .step-note { display: flex; gap: 8px; align-items: center; margin-top: 22px; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #8d621c; font-weight: 850; }
        .tb-home .step-note svg { width: 15px; height: 15px; }
        .tb-home .journey-strip {
          margin-top: 28px; min-height: 210px; border-radius: 19px; overflow: hidden; position: relative;
          background: linear-gradient(90deg, rgba(34,19,58,.83), rgba(41,24,65,.45));
          display: flex; align-items: center; padding: 30px 40px; color: white;
        }
        .tb-home .strip-copy { max-width: 515px; }
        .tb-home .strip-copy span { color: #ffe092; font-size: 11px; text-transform: uppercase; font-weight: 850; letter-spacing: .18em; }
        .tb-home .strip-copy h3 { font-family: Georgia, serif; font-size: 30px; line-height: 1.1; margin: 8px 0; }
        .tb-home .strip-copy p { font-size: 13px; line-height: 1.6; color: rgba(255,255,255,.84); margin: 0; }
        .tb-home .strip-link { margin-left: auto; width: 48px; height: 48px; display: grid; place-items: center; color: var(--plum); background: var(--gold-light); border-radius: 50%; }
        .tb-home .values-section { padding: 89px 0; background: #fffaf2; }
        .tb-home .values-layout { display: grid; grid-template-columns: .9fr 1.1fr; gap: 70px; align-items: center; }
        .tb-home .values-image-wrap { position: relative; min-height: 420px; }
        .tb-home .values-image { display: block; width: 82%; height: 410px; object-fit: cover; object-position: center 25%; border-radius: 180px 180px 18px 18px; box-shadow: 0 22px 50px rgba(53,31,73,.15); }
        .tb-home .image-stamp {
          position: absolute; right: 0; bottom: 25px; width: 162px; padding: 18px;
          border-radius: 16px; background: #f4bd43; color: #36234e; box-shadow: 0 12px 28px rgba(35,20,50,.14);
        }
        .tb-home .image-stamp strong { display: block; font-family: Georgia, serif; font-size: 22px; line-height: 1; }
        .tb-home .image-stamp span { display: block; font-size: 11px; line-height: 1.45; margin-top: 7px; }
        .tb-home .values-copy .section-title { max-width: 570px; }
        .tb-home .values-copy > p { max-width: 560px; color: #625a6a; font-size: 15px; line-height: 1.8; }
        .tb-home .check-list { display: grid; gap: 13px; list-style: none; margin: 24px 0 29px; padding: 0; }
        .tb-home .check-list li { display: flex; align-items: flex-start; gap: 11px; font-size: 14px; color: #453b53; }
        .tb-home .check-icon { flex: 0 0 auto; width: 21px; height: 21px; display: grid; place-items: center; background: #f7e7b6; border-radius: 50%; color: #77501b; }
        .tb-home .check-icon svg { width: 13px; height: 13px; }
        .tb-home .pricing-section { padding: 82px 0 88px; background: #2a1947; color: white; position: relative; }
        .tb-home .pricing-section:before {
          content: ""; pointer-events: none; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 90% 20%, rgba(222,154,76,.2), transparent 38%), radial-gradient(ellipse at 7% 100%, rgba(121,75,147,.3), transparent 44%);
        }
        .tb-home .pricing-inner { position: relative; display: grid; grid-template-columns: 1fr .9fr; gap: 58px; align-items: center; }
        .tb-home .pricing-copy .section-kicker { color: #ffdc83; }
        .tb-home .pricing-copy h2 { font-size: clamp(36px, 4vw, 52px); color: white; line-height: 1.04; margin: 12px 0 17px; letter-spacing: -.035em; }
        .tb-home .pricing-copy p { color: rgba(255,255,255,.79); font-size: 15px; line-height: 1.8; max-width: 510px; }
        .tb-home .pricing-points { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-top: 24px; }
        .tb-home .pricing-points span { display: inline-flex; gap: 7px; align-items: center; font-size: 12px; color: rgba(255,255,255,.9); }
        .tb-home .pricing-points svg { width: 15px; height: 15px; color: var(--gold-light); }
        .tb-home .price-card {
          background: #fffaf2; color: var(--ink); padding: 34px 36px; border-radius: 22px;
          box-shadow: 0 25px 65px rgba(15,8,26,.25); border: 1px solid rgba(255,255,255,.45);
        }
        .tb-home .price-card .limited { color: #8c6019; text-transform: uppercase; letter-spacing: .16em; font-size: 10px; font-weight: 900; }
        .tb-home .price { display: flex; align-items: baseline; gap: 10px; margin: 14px 0 7px; }
        .tb-home .price strong { font-size: 52px; line-height: 1; letter-spacing: -.06em; color: var(--plum); }
        .tb-home .price span { color: #655c6c; font-size: 14px; }
        .tb-home .price-card p { color: #665d6c; font-size: 13px; line-height: 1.65; margin: 0 0 23px; }
        .tb-home .price-card .button { width: 100%; }
        .tb-home .price-card small { display: block; text-align: center; color: #81788a; margin-top: 13px; font-size: 10px; }
        .tb-home .closing { background: #f4ecef; padding: 54px 0; }
        .tb-home .closing-inner { display: flex; align-items: center; justify-content: space-between; gap: 28px; }
        .tb-home .closing h2 { font-family: Georgia, serif; font-size: clamp(25px, 3vw, 35px); line-height: 1.15; color: var(--plum); margin: 0 0 7px; }
        .tb-home .closing p { color: #716778; font-size: 13px; margin: 0; }
        .tb-home .closing-actions { display: flex; gap: 11px; flex-wrap: wrap; }
        .tb-home .button-plum { color: white; background: var(--plum); }
        .tb-home .button-soft { color: var(--plum); border: 1px solid #d4c5d7; background: transparent; }
        .tb-home .footer { background: #211436; color: rgba(255,255,255,.73); padding: 30px 0; }
        .tb-home .footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .tb-home .footer-brand { display: flex; align-items: center; gap: 14px; color: white; }
        .tb-home .footer-brand img { width: 158px; height: 47px; object-fit: contain; filter: brightness(0) invert(1); }
        .tb-home .footer-brand span { border-left: 1px solid rgba(255,255,255,.25); padding-left: 14px; font-size: 10px; line-height: 1.5; }
        .tb-home .footer-links { display: flex; gap: 22px; font-size: 11px; }
        .tb-home .footer-links a:hover { color: #ffdc83; }
        .tb-home .copyright { font-size: 10px; text-align: right; }
        @media (max-width: 980px) {
          .tb-home .nav-wrap, .tb-home .hero-inner, .tb-home .section-shell { width: min(100% - 40px, 760px); }
          .tb-home .nav-links { gap: 16px; }
          .tb-home .nav-links a { font-size: 12px; }
          .tb-home .brand img { width: 186px; }
          .tb-home .hero-inner { grid-template-columns: 1fr .75fr; }
          .tb-home .hero-visual { margin-right: -50px; }
          .tb-home .portrait { height: 390px; }
          .tb-home .info-card { grid-template-columns: 1fr 1.45fr; }
          .tb-home .value-grid { grid-column: 1 / -1; }
          .tb-home .values-layout { gap: 38px; }
        }
        @media (max-width: 760px) {
          .tb-home .nav-wrap { width: calc(100% - 36px); min-height: 72px; }
          .tb-home .brand img { width: 182px; height: 56px; }
          .tb-home .nav-links, .tb-home .nav-actions { display: none; }
          .tb-home .menu-toggle { display: inline-grid; place-items: center; }
          .tb-home .mobile-menu {
            position: absolute; top: calc(100% - 1px); left: 0; right: 0; background: #fffaf2;
            padding: 14px 22px 22px; display: grid; gap: 4px; border-bottom: 1px solid #e8dccb;
            box-shadow: 0 18px 25px rgba(39,24,57,.12);
          }
          .tb-home .mobile-menu a { padding: 13px 8px; font-size: 14px; font-weight: 750; border-bottom: 1px solid #eee6dc; }
          .tb-home .mobile-menu .button { margin-top: 9px; min-height: 48px; }
          .tb-home .hero { min-height: auto; }
          .tb-home .hero-inner { width: 100%; display: flex; flex-direction: column; align-items: stretch; padding: 52px 22px 0; min-height: 0; }
          .tb-home .hero-copy { padding: 0; }
          .tb-home h1 { font-size: clamp(43px, 11vw, 64px); margin: 18px 0; max-width: 540px; }
          .tb-home .hero-lede { font-size: 15px; }
          .tb-home .promise-row { margin: 22px 0 25px; }
          .tb-home .promise { font-size: 11px; padding: 0 9px; gap: 7px; }
          .tb-home .promise svg { width: 21px; height: 21px; }
          .tb-home .hero-actions { gap: 8px; }
          .tb-home .button-lg { min-height: 51px; padding: 0 19px; font-size: 13px; }
          .tb-home .video-link { font-size: 12px; }
          .tb-home .offer-line { align-items: flex-start; font-size: 11px; line-height: 1.45; }
          .tb-home .hero-visual { width: 100%; height: 320px; margin: 18px 0 -1px; align-self: auto; justify-content: center; }
          .tb-home .sun-orb { width: 240px; height: 240px; top: 20px; left: 20%; }
          .tb-home .portrait { width: 82%; height: 315px; object-position: center 28%; }
          .tb-home .visual-caption { left: 2px; bottom: 26px; width: 165px; padding: 11px 13px; font-size: 10px; }
          .tb-home .visual-caption strong { font-size: 14px; }
          .tb-home .section-shell { width: calc(100% - 36px); }
          .tb-home .about-section, .tb-home .journey-section, .tb-home .values-section { padding: 58px 0; }
          .tb-home .info-card { display: flex; flex-direction: column; align-items: stretch; gap: 21px; padding: 25px 22px; }
          .tb-home .info-heading { border: 0; border-bottom: 1px solid #e9c75e; padding: 0 0 18px; }
          .tb-home .info-heading h2 { font-size: 27px; }
          .tb-home .info-copy { font-size: 13px; }
          .tb-home .value-grid { gap: 7px; }
          .tb-home .value-item { min-height: 104px; padding: 12px 8px; }
          .tb-home .value-item strong { font-size: 10px; }
          .tb-home .journey-head { display: block; margin-bottom: 28px; }
          .tb-home .journey-head .journey-aside { margin-top: 15px; font-size: 15px; }
          .tb-home .section-title { font-size: 35px; }
          .tb-home .section-intro { font-size: 14px; }
          .tb-home .steps-grid { grid-template-columns: 1fr; gap: 12px; }
          .tb-home .step-card { min-height: 0; padding: 23px; }
          .tb-home .step-top { margin-bottom: 20px; }
          .tb-home .step-card h3 { font-size: 21px; }
          .tb-home .journey-strip { min-height: 190px; padding: 25px 22px; }
          .tb-home .strip-copy h3 { font-size: 25px; }
          .tb-home .strip-link { width: 42px; height: 42px; flex: 0 0 auto; margin-left: 12px; }
          .tb-home .values-layout { grid-template-columns: 1fr; gap: 31px; }
          .tb-home .values-image-wrap { min-height: 330px; max-width: 460px; margin: auto; width: 100%; }
          .tb-home .values-image { width: 82%; height: 330px; }
          .tb-home .image-stamp { width: 145px; right: 0; bottom: 10px; }
          .tb-home .values-copy > p { font-size: 14px; }
          .tb-home .pricing-section { padding: 60px 0; }
          .tb-home .pricing-inner { grid-template-columns: 1fr; gap: 27px; }
          .tb-home .pricing-copy h2 { font-size: 39px; }
          .tb-home .price-card { padding: 27px 24px; }
          .tb-home .price strong { font-size: 47px; }
          .tb-home .closing { padding: 42px 0; }
          .tb-home .closing-inner { align-items: flex-start; flex-direction: column; }
          .tb-home .footer-inner { flex-direction: column; align-items: flex-start; }
          .tb-home .footer-links { flex-wrap: wrap; gap: 15px; }
          .tb-home .copyright { text-align: left; }
        }
        @media (max-width: 390px) {
          .tb-home .promise { padding: 0 5px; font-size: 10px; }
          .tb-home .promise svg { width: 18px; }
          .tb-home .hero-actions { align-items: stretch; flex-direction: column; }
          .tb-home .video-link { justify-content: center; }
          .tb-home .value-item { min-height: 100px; }
          .tb-home .price-card { padding: 24px 19px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tb-home *, .tb-home *:before, .tb-home *:after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <header className="topbar">
        <div className="nav-wrap">
          <Link href="/" className="brand" aria-label="Transformation Builder home" onClick={closeMenu}>
            <img src={logo} alt="Transformation Builder" />
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#journey">How it works</a>
            <a href="#about">What you get</a>
            <Link href="/network">Community</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
          <div className="nav-actions">
            <Link href="/login" className="nav-login">Log in</Link>
            <Link href="/signup" className="button button-gold button-sm">Start your journey</Link>
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <a href="#journey" onClick={closeMenu}>How it works</a>
            <a href="#about" onClick={closeMenu}>What you get</a>
            <Link href="/network" onClick={closeMenu}>Community</Link>
            <Link href="/pricing" onClick={closeMenu}>Pricing</Link>
            <Link href="/login" onClick={closeMenu}>Log in</Link>
            <Link href="/signup" className="button button-gold" onClick={closeMenu}>Start your journey <ArrowRight size={16} /></Link>
          </nav>
        )}
      </header>

      <main>
        <section
          className="hero"
          aria-labelledby="hero-title"
          style={{ "--hero-background": `url("${sunsetImage}")` } as CSSProperties}
        >
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">Discover <span>•</span> Analyze <span>•</span> Focus <span>•</span> Implement</div>
              <h1 id="hero-title">Turn Life’s Change Into <em>Your Next Level.</em></h1>
              <p className="hero-lede">
                A guided, faith-informed transformation system for professionals ready to find clarity,
                make a focused plan, and move toward a more meaningful future.
              </p>
              <div className="promise-row" aria-label="How Transformation Builder helps">
                <div className="promise"><Target /><span>Find Your<br />Purpose</span></div>
                <div className="promise"><ChartNoAxesColumnIncreasing /><span>Create a<br />Clear Plan</span></div>
                <div className="promise"><Sparkles /><span>Take Action<br />with Support</span></div>
              </div>
              <div className="hero-actions">
                <a className="button button-gold button-lg" href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  Start your transformation <ArrowRight size={17} />
                </a>
                <a className="button button-outline video-link" href={welcomeVideoUrl} target="_blank" rel="noopener noreferrer">
                  <span className="play-disc"><Play size={13} fill="currentColor" /></span>
                  Watch the welcome video
                </a>
              </div>
              <div className="offer-line"><Sparkles size={15} /><span><strong>Limited-time offer:</strong> Begin for just $19.99/month.</span></div>
            </div>
            <div className="hero-visual" aria-label="A professional looking toward a bright future">
              <div className="sun-orb" />
              <img className="portrait" src={purposeImage} alt="A woman smiling with confidence as she considers what is next" />
              <div className="visual-caption"><strong>A future with meaning.</strong>Build it one intentional step at a time.</div>
            </div>
          </div>
          <div className="hero-bottom" />
        </section>

        <section id="about" className="about-section">
          <div className="section-shell">
            <div className="info-card">
              <div className="info-heading">
                <div className="small-label">A guided path for what’s next</div>
                <h2 className="serif">What Is<br /><span>Transformation Builder?</span></h2>
              </div>
              <p className="info-copy">
                A practical, step-by-step app and community that helps you clarify your purpose,
                navigate change, and create a life of meaning, impact, and growth. Grounded in faith
                and built for real life, it turns reflection into forward motion.
              </p>
              <div className="value-grid">
                {valueProps.map(({ icon: Icon, title, text }) => (
                  <div className="value-item" key={title} title={text}>
                    <Icon aria-hidden="true" />
                    <strong>{title}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="journey"
          className="journey-section"
          style={{ "--journey-background": `url("${journeyImage}")` } as CSSProperties}
        >
          <div className="section-shell journey-content">
            <div className="journey-head">
              <div>
                <div className="section-kicker">A path with purpose</div>
                <h2 className="section-title serif">The 3-Step Transformation Journey</h2>
                <p className="section-intro">You don’t have to figure it all out at once. Build clarity, make sense of change, and take your next steps with intention.</p>
              </div>
              <p className="journey-aside">“Small, faithful steps can lead to a life that feels wholly your own.”</p>
            </div>
            <div className="steps-grid">
              {journeySteps.map(({ number, icon: Icon, title, description, note }) => (
                <article className="step-card" key={number}>
                  <div className="step-top">
                    <span className="step-number">{number}</span>
                    <Icon className="step-icon" aria-hidden="true" />
                  </div>
                  <h3 className="serif">{title}</h3>
                  <p>{description}</p>
                  <div className="step-note"><ArrowRight />{note}</div>
                </article>
              ))}
            </div>
            <div
              className="journey-strip"
              style={{ backgroundImage: `linear-gradient(90deg, rgba(34,19,58,.83), rgba(41,24,65,.45)), url("${journeyImage}")` }}
            >
              <div className="strip-copy">
                <span>Purpose • Clarity • Community</span>
                <h3>Change can become a beginning.</h3>
                <p>Meet your next season with practical tools, grounded encouragement, and support that helps you keep going.</p>
              </div>
              <a href="#start" className="strip-link" aria-label="Explore the Transformation Builder offer"><ArrowDown size={20} /></a>
            </div>
          </div>
        </section>

        <section className="values-section">
          <div className="section-shell values-layout">
            <div className="values-image-wrap">
              <img className="values-image" src={professionalImage} alt="A professional ready to bring more intention to his work and life" />
              <div className="image-stamp"><strong>More than<br />a moment.</strong><span>A thoughtful process for lasting, purposeful change.</span></div>
            </div>
            <div className="values-copy">
              <div className="section-kicker">Built for your real life</div>
              <h2 className="section-title serif">Your next chapter deserves more than guesswork.</h2>
              <p>When something needs to change, it can be hard to know where to begin. Transformation Builder gives you a steady framework to listen, reflect, and choose what comes next.</p>
              <ul className="check-list">
                <li><span className="check-icon"><Check /></span><span>Explore the values and strengths that make your direction uniquely yours.</span></li>
                <li><span className="check-icon"><Check /></span><span>Turn big questions into practical goals and manageable next steps.</span></li>
                <li><span className="check-icon"><Check /></span><span>Stay encouraged through community, tools, and meaningful accountability.</span></li>
              </ul>
              <Link href="/signup" className="button button-plum button-sm">Find your starting point <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section id="start" className="pricing-section">
          <div className="section-shell pricing-inner">
            <div className="pricing-copy">
              <div className="section-kicker">Your future is worth investing in</div>
              <h2 className="serif">Make room for the life you’re called to build.</h2>
              <p>Start with the first steps at no cost. When you’re ready to go deeper, get the guided tools, resources, and support to keep moving forward.</p>
              <div className="pricing-points">
                <span><Check />Practical, self-paced guidance</span>
                <span><Check />Tools for purpose and planning</span>
                <span><Check />A community to keep you moving</span>
              </div>
            </div>
            <div className="price-card">
              <div className="limited">A special monthly offer</div>
              <div className="price"><strong>$19.99</strong><span>per month</span></div>
              <p>Invest in a more focused, intentional future—one clear step at a time.</p>
              <a className="button button-gold button-lg" href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                Start your transformation <ArrowRight size={17} />
              </a>
              <small>Ready when you are. Start building your next chapter today.</small>
            </div>
          </div>
        </section>

        <section className="closing">
          <div className="section-shell closing-inner">
            <div>
              <h2 className="serif">The life you envision begins with a decision.</h2>
              <p>Take one thoughtful step toward what’s next.</p>
            </div>
            <div className="closing-actions">
              <Link href="/signup" className="button button-plum button-sm">Create your account <ArrowRight size={16} /></Link>
              <Link href="/network" className="button button-soft button-sm">Explore the community</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer-inner">
          <div className="footer-brand">
            <img src={logo} alt="Transformation Builder" loading="lazy" />
            <span>A faith-informed path<br />to a more meaningful future.</span>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#about">About the platform</a>
            <a href="#journey">The journey</a>
            <Link href="/pricing">Pricing</Link>
            <Link href="/network">Community</Link>
            <Link href="/login">Log in</Link>
          </nav>
          <div className="copyright">© {new Date().getFullYear()} Transformation Builder</div>
        </div>
      </footer>
    </div>
  );
}
