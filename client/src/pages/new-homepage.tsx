import { useState, type CSSProperties } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  Check,
  ClipboardCheck,
  Compass,
  HeartHandshake,
  Layers3,
  LaptopMinimal,
  Menu,
  Play,
  Rocket,
  Sparkles,
  Sprout,
  Target,
  UsersRound,
  X,
} from "lucide-react";
import logo from "@assets/tbrefinedLogotransbkgrd_1788469856734.png";
import purposeImage from "@assets/tbfpimage_1795294611936.png";
import studentsImage from "@assets/Students-Planning-Future-Together_1795303364596.png";
import journeyImage from "@assets/journeypath2_1771081561926.jpg";

const checkoutUrl = "https://buy.stripe.com/dRm4gz6BR2uzg4cdMD8bS05";
const welcomeVideoUrl = "https://youtu.be/8odfNAAeo48";

const journeySteps = [
  {
    number: "1",
    icon: Compass,
    title: "Discover Purpose",
    description:
      "Gain clarity about who you are, what matters most, and the future you desire.",
  },
  {
    number: "2",
    icon: ChartNoAxesColumnIncreasing,
    title: "Analyze Change",
    description:
      "Uncover patterns, identify strengths, set meaningful goals, and turn insights into action.",
  },
  {
    number: "3",
    icon: ClipboardCheck,
    title: "Implement Your Plan",
    description:
      "Build your personal transformation blueprint, track progress, and stay accountable with expert support.",
  },
];

const valueProps = [
  { icon: LaptopMinimal, title: "Guided Tools & Workbooks", text: "Step-by-step exercises and guided resources" },
  { icon: UsersRound, title: "Live Sessions & Coaching", text: "Personal support to help you keep moving" },
  { icon: Layers3, title: "Supportive Community (LTN)", text: "Connection and encouragement from others" },
  { icon: ChartNoAxesColumnIncreasing, title: "A Personalized Transformation Plan", text: "A practical plan built around your goals" },
];

const benefitItems = [
  { icon: Target, title: "Clarity", description: "on Your Direction" },
  { icon: Rocket, title: "Confidence", description: "in Your Next Steps" },
  { icon: UsersRound, title: "Community", description: "That Keeps You Accountable" },
  { icon: Sprout, title: "Lasting Transformation", description: "in Your Life, Work, and Calling" },
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
          position: relative; z-index: 20; background: #211436;
          border-bottom: 1px solid rgba(255, 255, 255, .12);
        }
        .tb-home .nav-wrap {
          width: min(1240px, calc(100% - 56px)); min-height: 82px; margin: auto;
          display: flex; align-items: center; justify-content: space-between; gap: 28px;
        }
        .tb-home .brand { display: flex; align-items: center; flex: 0 0 auto; }
        .tb-home .brand img { width: 222px; height: 64px; object-fit: contain; filter: brightness(0) invert(1); }
        .tb-home .nav-links { display: flex; align-items: center; gap: clamp(18px, 2.4vw, 36px); }
        .tb-home .nav-links a {
          font-size: 13px; font-weight: 700; color: rgba(255,255,255,.88); transition: color .2s ease;
        }
        .tb-home .nav-links a:hover { color: #ffdc83; }
        .tb-home .nav-actions { display: flex; align-items: center; gap: 12px; }
        .tb-home .nav-login { color: white; font-size: 13px; font-weight: 750; padding: 10px 14px; }
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
        .tb-home .menu-toggle { display: none; border: 0; background: transparent; color: white; padding: 8px; }
        .tb-home .hero {
          min-height: 610px; position: relative; isolation: isolate; color: #fff;
          background:
            radial-gradient(ellipse at 59% 25%, rgba(241, 166, 96, .34), transparent 34%),
            linear-gradient(112deg, #261641 0%, #43266c 48%, #7e467d 100%);
        }
        .tb-home .hero:before {
          content: ""; position: absolute; inset: 0 auto 0 50%; z-index: -2; opacity: 1;
          width: min(1240px, calc(100% - 56px)); transform: translateX(-50%);
          background-image: var(--hero-background);
          background-position: right center; background-size: auto 100%;
          background-repeat: no-repeat; mix-blend-mode: normal;
        }
        .tb-home .hero:after {
          content: ""; position: absolute; inset: 0; z-index: -1;
          background:
            linear-gradient(90deg, rgba(35, 20, 58, .96) 0%, rgba(42, 24, 68, .86) 38%, rgba(47, 25, 64, .48) 62%, rgba(47, 25, 64, .12) 100%),
            linear-gradient(0deg, rgba(35, 20, 58, .22), transparent 60%);
        }
        .tb-home .hero-inner {
          width: min(1240px, calc(100% - 56px)); min-height: 610px; margin: auto;
          display: grid; grid-template-columns: minmax(0, 1fr);
          align-items: center; position: relative; padding: 56px 0 70px;
        }
        .tb-home .hero-copy { max-width: 650px; position: relative; z-index: 2; padding: 8px 0 0; }
        .tb-home .eyebrow {
          display: flex; align-items: center; gap: 11px; text-transform: uppercase;
          letter-spacing: .2em; font-size: 11px; font-weight: 800; color: #f6d78d;
        }
        .tb-home .eyebrow span { opacity: .48; }
        .tb-home h1 {
          font-size: clamp(46px, 5.2vw, 70px); line-height: .99; letter-spacing: -.045em;
          margin: 19px 0 22px; max-width: 720px; font-weight: 750;
        }
        .tb-home .hero-title-lead { opacity: 1; font-size: .92em; }
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
          margin-top: 20px; color: rgba(255,255,255,.86); font-size: 25px; line-height: 1.2;
          display: flex; align-items: center; gap: 10px;
        }
        .tb-home .offer-line svg { color: var(--gold); }
        .tb-home .offer-line strong { color: #ffe19a; }
        .tb-home .hero-bottom {
          position: absolute; left: 0; right: 0; bottom: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent);
        }
        .tb-home .section-shell { width: min(1240px, calc(100% - 56px)); margin: 0 auto; }
        .tb-home .about-section {
          position: relative; z-index: 2; margin-top: -56px; padding: 8px 0 5px;
          background: #2d194b;
        }
        .tb-home .info-card {
          display: grid; grid-template-columns: 1.05fr 1.55fr 2.45fr; align-items: center;
          gap: 24px; padding: 20px 24px; background: #fff; border: 1px solid #eee3d2;
          border-radius: 16px; box-shadow: 0 17px 48px rgba(54, 33, 69, .07);
        }
        .tb-home .info-heading { border-right: 1px solid #e9c75e; padding: 5px 20px 5px 0; }
        .tb-home .info-heading h2 {
          color: var(--plum); font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif;
          font-size: 25px; font-weight: 850; line-height: 1.08; letter-spacing: -.035em; margin: 0;
        }
        .tb-home .info-heading h2 span { color: #b47a1c; }
        .tb-home .info-copy { margin: 0; color: #44394f; font-size: 13px; line-height: 1.45; }
        .tb-home .value-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
        .tb-home .value-item {
          min-width: 0; min-height: 100px; padding: 12px 8px; border-radius: 12px;
          background: #f6f1f8; color: #291844; text-align: center; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 7px;
        }
        .tb-home .value-item svg { color: #531f83; width: 27px; height: 27px; stroke-width: 1.8; }
        .tb-home .value-item strong { font-size: 11.5px; line-height: 1.2; font-weight: 800; }
        .tb-home .journey-section { padding: 66px 0 78px; background: #2d194b; position: relative; }
        .tb-home .journey-section:before {
          content: ""; position: absolute; inset: 0; opacity: .46;
          background-image: var(--journey-background);
          background-position: center; background-size: cover;
        }
        .tb-home .journey-section:after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, rgba(38,20,64,.76), rgba(52,28,79,.62)); }
        .tb-home .journey-content { position: relative; z-index: 1; }
        .tb-home .section-kicker { color: #8a5c13; text-transform: uppercase; letter-spacing: .18em; font-weight: 850; font-size: 11px; }
        .tb-home .journey-section .section-kicker { color: #ffdc83; }
        .tb-home .journey-section .section-title { color: #fffaf2; }
        .tb-home .journey-section .section-intro,
        .tb-home .journey-section .journey-aside { color: rgba(255,255,255,.82); }
        .tb-home .section-title { color: var(--plum); font-size: clamp(34px, 4vw, 48px); line-height: 1.08; margin: 11px 0 14px; letter-spacing: -.035em; }
        .tb-home .section-intro { color: #62586e; max-width: 650px; font-size: 16px; line-height: 1.7; margin: 0; }
        .tb-home .journey-head { display: flex; justify-content: space-between; align-items: end; gap: 30px; margin-bottom: 39px; }
        .tb-home .journey-head .journey-aside { color: #6a5b74; font-family: Georgia, serif; font-style: italic; font-size: 17px; max-width: 240px; }
        .tb-home .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .tb-home .step-card {
          min-height: 178px; background: #fff; border: 1px solid rgba(74,45,94,.12);
          border-radius: 14px; padding: 15px 20px 17px; box-shadow: 0 10px 26px rgba(35,18,56,.12);
          position: relative; overflow: visible; text-align: center;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .tb-home .step-card:not(:last-child)::after {
          content: "»"; position: absolute; z-index: 2; top: 50%; right: -22px;
          transform: translateY(-50%); color: #d77df8; font-size: 25px; line-height: 1; font-weight: 900;
        }
        .tb-home .step-card:hover { transform: translateY(-3px); box-shadow: 0 16px 32px rgba(35,18,56,.18); }
        .tb-home .step-top { min-height: 30px; display: flex; align-items: center; justify-content: center; margin-bottom: 4px; }
        .tb-home .step-number {
          position: absolute; top: 10px; left: 12px; color: white;
          background: linear-gradient(145deg, #d9a324, #b7780a); border-radius: 50%;
          width: 28px; height: 28px; display: grid; place-items: center; font-weight: 850; font-size: 13px;
          box-shadow: 0 2px 5px rgba(117,72,4,.2);
        }
        .tb-home .step-icon { color: #572486; width: 25px; height: 25px; stroke-width: 2.1; }
        .tb-home .step-card h3 { color: #4b197e; font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif; font-size: 17px; font-weight: 850; letter-spacing: -.02em; margin: 0 0 7px; }
        .tb-home .step-card p { color: #262033; line-height: 1.35; font-size: 12px; margin: 0 auto; max-width: 330px; }
        .tb-home .benefit-band {
          margin-top: 28px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: stretch; padding: 13px 16px; border: 1px solid rgba(255,255,255,.18);
          border-radius: 17px; color: white;
          background: linear-gradient(110deg, rgba(29,16,51,.96), rgba(55,29,86,.95) 52%, rgba(34,19,58,.97));
          box-shadow: 0 14px 34px rgba(20,10,37,.18);
        }
        .tb-home .benefit-item {
          min-width: 0; min-height: 66px; display: flex; align-items: center; justify-content: center;
          gap: 12px; padding: 8px 15px; position: relative;
        }
        .tb-home .benefit-item:not(:last-child)::after {
          content: ""; position: absolute; right: 0; top: 10px; bottom: 10px; width: 1px;
          background: linear-gradient(transparent, rgba(255,211,91,.9), transparent);
        }
        .tb-home .benefit-item svg { width: 28px; height: 28px; flex: 0 0 auto; color: #ffd451; stroke-width: 1.9; }
        .tb-home .benefit-copy { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .tb-home .benefit-copy strong { color: #fff; font-size: 13px; line-height: 1.15; font-weight: 850; }
        .tb-home .benefit-copy span { color: rgba(255,255,255,.82); font-size: 10px; line-height: 1.25; }
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
          .tb-home .hero:before { width: min(calc(100% - 40px), 760px); }
          .tb-home .nav-links { gap: 16px; }
          .tb-home .nav-links a { font-size: 12px; }
          .tb-home .brand img { width: 186px; }
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
            position: absolute; top: calc(100% - 1px); left: 0; right: 0; background: #211436; color: white;
            padding: 14px 22px 22px; display: grid; gap: 4px; border-bottom: 1px solid rgba(255,255,255,.16);
            box-shadow: 0 18px 25px rgba(39,24,57,.12);
          }
          .tb-home .mobile-menu a { padding: 13px 8px; font-size: 14px; font-weight: 750; border-bottom: 1px solid rgba(255,255,255,.12); }
          .tb-home .mobile-menu .button { margin-top: 9px; min-height: 48px; }
          .tb-home .hero { min-height: auto; }
          .tb-home .hero-inner { width: 100%; display: flex; flex-direction: column; align-items: stretch; padding: 52px 22px 78px; min-height: 0; }
          .tb-home .hero-copy { padding: 0; }
          .tb-home h1 { font-size: clamp(40px, 10.3vw, 60px); margin: 18px 0; max-width: 540px; }
          .tb-home .hero-lede { font-size: 15px; }
          .tb-home .promise-row { margin: 22px 0 25px; }
          .tb-home .promise { font-size: 11px; padding: 0 9px; gap: 7px; }
          .tb-home .promise svg { width: 21px; height: 21px; }
          .tb-home .hero-actions { gap: 8px; }
          .tb-home .button-lg { min-height: 51px; padding: 0 19px; font-size: 13px; }
          .tb-home .video-link { font-size: 12px; }
          .tb-home .offer-line { align-items: flex-start; font-size: 25px; line-height: 1.2; }
          .tb-home .section-shell { width: calc(100% - 36px); }
          .tb-home .about-section { margin-top: -46px; padding: 8px 0 5px; }
          .tb-home .journey-section, .tb-home .values-section { padding: 58px 0; }
          .tb-home .hero:before {
            width: calc(100% - 36px); background-position: center bottom; background-size: 100% auto; opacity: .82;
          }
          .tb-home .hero:after {
            background: linear-gradient(180deg, rgba(35,20,58,.97) 0%, rgba(42,24,68,.88) 50%, rgba(47,25,64,.47) 100%);
          }
          .tb-home .info-card { display: flex; flex-direction: column; align-items: stretch; gap: 21px; padding: 25px 22px; }
          .tb-home .info-heading { border: 0; border-bottom: 1px solid #e9c75e; padding: 0 0 18px; }
          .tb-home .info-heading h2 { font-size: 25px; }
          .tb-home .info-copy { font-size: 14px; }
          .tb-home .value-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
          .tb-home .value-item { min-height: 98px; padding: 12px 8px; }
          .tb-home .journey-head { display: block; margin-bottom: 28px; }
          .tb-home .journey-head .journey-aside { margin-top: 15px; font-size: 15px; }
          .tb-home .section-title { font-size: 35px; }
          .tb-home .section-intro { font-size: 14px; }
          .tb-home .steps-grid { grid-template-columns: 1fr; gap: 12px; }
          .tb-home .step-card { min-height: 155px; padding: 18px 20px; }
          .tb-home .step-card:not(:last-child)::after { display: none; }
          .tb-home .step-top { margin-bottom: 4px; }
          .tb-home .step-card h3 { font-size: 17px; }
          .tb-home .benefit-band { grid-template-columns: repeat(2, minmax(0, 1fr)); padding: 8px; }
          .tb-home .benefit-item { justify-content: flex-start; gap: 9px; padding: 12px 10px; }
          .tb-home .benefit-item:not(:last-child)::after { display: none; }
          .tb-home .benefit-item:nth-child(odd) { border-right: 1px solid rgba(255,211,91,.45); }
          .tb-home .benefit-item:nth-child(-n+2) { border-bottom: 1px solid rgba(255,211,91,.45); }
          .tb-home .benefit-item svg { width: 24px; height: 24px; }
          .tb-home .benefit-copy strong { font-size: 12px; }
          .tb-home .benefit-copy span { font-size: 9px; }
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
            <a href="https://www.skool.com/life-transformation-network-2320/classroom" target="_blank" rel="noreferrer">Community</a>
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
            <a href="https://www.skool.com/life-transformation-network-2320/classroom" target="_blank" rel="noreferrer" onClick={closeMenu}>Community</a>
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
          style={{ "--hero-background": `url("${purposeImage}")` } as CSSProperties}
        >
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">Discover <span>•</span> Analyze <span>•</span> Focus <span>•</span> Implement</div>
              <h1 id="hero-title"><span className="hero-title-lead">Turn Life’s Change Into</span>{" "}<em>Your Next Level.</em></h1>
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
          </div>
          <div className="hero-bottom" />
        </section>

        <section id="about" className="about-section">
          <div className="section-shell">
            <div className="info-card">
              <div className="info-heading">
                <h2>What Is<br />Transformation<br /><span>Builder?</span></h2>
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
              {journeySteps.map(({ number, icon: Icon, title, description }) => (
                <article className="step-card" key={number}>
                  <div className="step-top">
                    <span className="step-number">{number}</span>
                    <Icon className="step-icon" aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className="benefit-band" aria-label="Transformation Builder benefits">
              {benefitItems.map(({ icon: Icon, title, description }) => (
                <div className="benefit-item" key={title}>
                  <Icon aria-hidden="true" />
                  <div className="benefit-copy">
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="values-section">
          <div className="section-shell values-layout">
            <div className="values-image-wrap">
              <img className="values-image" src={studentsImage} alt="A group of students planning their future together" />
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
              <a href="https://www.skool.com/life-transformation-network-2320/classroom" target="_blank" rel="noreferrer" className="button button-soft button-sm">Explore the community</a>
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
            <a href="https://www.skool.com/life-transformation-network-2320/classroom" target="_blank" rel="noreferrer">Community</a>
            <Link href="/login">Log in</Link>
          </nav>
          <div className="copyright">© {new Date().getFullYear()} Transformation Builder</div>
        </div>
      </footer>
    </div>
  );
}
