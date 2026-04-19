import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }
  :root {
    --ink:     #080B14;
    --ink2:    #0D1224;
    --emerald: #00C27A;
    --emerald2:#00E896;
    --emerald3:#D0FFF0;
    --amber:   #F59E0B;
    --amber2:  #FCD34D;
    --amber3:  #FEF3C7;
    --crimson: #E11D48;
    --crimson2:#FB7185;
    --crimson3:#FFE4E6;
    --sapphire:#2563EB;
    --sapphire2:#60A5FA;
    --sapphire3:#EFF6FF;
    --orchid:  #9333EA;
    --orchid2: #C084FC;
    --orchid3: #F5F3FF;
    --pearl:   #FAF3DD;
    --white:   #FFFFFF;
    --g50:#F9FAFB; --g100:#F1F5F9; --g200:#E2E8F0; --g300:#CBD5E1;
    --g400:#94A3B8; --g500:#64748B; --g600:#475569; --g700:#334155; --g800:#1E293B;
    --nav-from:#1A0533;
    --nav-to:  #0A1A4F;
    --sh-sm:0 2px 12px rgba(0,0,0,0.08);
    --sh-md:0 12px 40px rgba(0,0,0,0.12);
    --sh-lg:0 28px 70px rgba(0,0,0,0.18);
    --sh-xl:0 48px 96px rgba(0,0,0,0.24);
    --sh-glow:0 0 60px rgba(0,194,122,0.28);
    --ease-spring:cubic-bezier(0.34,1.56,0.64,1);
    --ease-smooth:cubic-bezier(0.4,0,0.2,1);
  }
  body { font-family:'Outfit',sans-serif; background:var(--pearl); color:var(--g800); -webkit-font-smoothing:antialiased; overflow-x:hidden; }
  ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:var(--g100)} ::-webkit-scrollbar-thumb{background:linear-gradient(var(--emerald),var(--orchid));border-radius:10px}

  @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.86)}to{opacity:1;transform:scale(1)}}
  @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(1.5deg)}}
  @keyframes floatR{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(-1deg)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(0,194,122,0.5)}70%{box-shadow:0 0 0 20px rgba(0,194,122,0)}}
  @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.7);opacity:0.5}}
  @keyframes borderGlow{0%,100%{border-color:rgba(0,194,122,0.2)}50%{border-color:rgba(0,232,150,0.8)}}
  @keyframes modalIn{from{opacity:0;transform:scale(0.90) translateY(28px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes overlayIn{from{opacity:0}to{opacity:1}}
  @keyframes textShimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}
  @keyframes orbMove{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-25px) scale(1.05)}66%{transform:translate(-25px,18px) scale(0.96)}}
  @keyframes ripple{0%{transform:scale(0);opacity:0.5}100%{transform:scale(4.5);opacity:0}}
  @keyframes scanLine{0%{transform:translateY(-100%)}100%{transform:translateY(500px)}}
  @keyframes iconBounce{0%,100%{transform:translateY(0) scale(1)}30%{transform:translateY(-8px) scale(1.08)}60%{transform:translateY(-3px) scale(1.02)}}
  @keyframes magneticFloat{0%,100%{transform:translateY(0) rotate(0deg) scale(1)}25%{transform:translateY(-10px) rotate(1.2deg) scale(1.02)}75%{transform:translateY(5px) rotate(-0.7deg) scale(0.98)}}
  @keyframes glowBorder{0%,100%{opacity:0.4}50%{opacity:1}}
  @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
  @keyframes navItemIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes particleFly{0%{transform:translateY(0) translateX(0);opacity:1}100%{transform:translateY(-200px) translateX(60px);opacity:0}}
  @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes numberCount{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes cardReveal{from{opacity:0;transform:translateY(50px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes underlineGrow{from{transform:scaleX(0);transform-origin:left}to{transform:scaleX(1);transform-origin:left}}
  @keyframes glowPulse{0%,100%{filter:blur(60px);opacity:0.5}50%{filter:blur(80px);opacity:1}}
  @keyframes shimmerSweep{0%{background-position:-800px 0}100%{background-position:800px 0}}
  @keyframes navGlow{0%,100%{box-shadow:0 4px 30px rgba(0,194,122,0)}50%{box-shadow:0 4px 30px rgba(0,194,122,0.35)}}

  .anim-fadeup{animation:fadeUp 0.7s var(--ease-spring) both}
  .anim-scalein{animation:scaleIn 0.55s var(--ease-spring) both}
  .anim-fadein{animation:fadeIn 0.5s ease both}
  .d1{animation-delay:.06s}.d2{animation-delay:.15s}.d3{animation-delay:.24s}
  .d4{animation-delay:.33s}.d5{animation-delay:.42s}.d6{animation-delay:.51s}

  *{cursor:default}
  a,button,[role="button"],.nav-link,.footer-lnk,.dept-card,.doc-card,.why-card,
  .pkg-card,.srv-card,.ins-card,.info-tile,.mob-link,.filter-pill,.btn-ghost,
  .btn-primary,.btn-hp,.btn-ho,.nav-book,.portal-btn,.portal-register,
  .portal-close-btn,.dept-close,.detail-back,.pkg-btn,.soc-btn,.doc-soc-btn,
  .faq-item,.faq-q,.hero-eyebrow{cursor:pointer !important}

  .navbar{
    position:fixed;top:0;left:0;right:0;z-index:1000;height:76px;
    padding:0 3rem;display:flex;align-items:center;justify-content:space-between;
    background:linear-gradient(105deg, var(--nav-from) 0%, #0F1535 45%, var(--nav-to) 100%);
    border-bottom:1px solid rgba(0,194,122,0.18);
    transition:all 0.4s var(--ease-smooth);
    animation:navGlow 5s ease-in-out infinite;
  }
  .navbar::before{
    content:'';position:absolute;inset:0;
    background:linear-gradient(90deg,rgba(0,194,122,0.03) 0%,rgba(147,51,234,0.04) 50%,rgba(37,99,235,0.03) 100%);
    pointer-events:none;
  }
  .navbar.scrolled{
    box-shadow:0 8px 48px rgba(0,0,0,0.5),0 1px 0 rgba(0,194,122,0.2);
    background:linear-gradient(105deg, #1A0533 0%, #0D1535 45%, #0A1A4F 100%);
  }

  .nav-logo{display:flex;align-items:center;gap:14px;cursor:pointer;text-decoration:none;position:relative;z-index:1}
  .nav-logo-mark{
    width:48px;height:48px;border-radius:14px;
    background:linear-gradient(135deg,var(--emerald),#00A86B);
    display:flex;align-items:center;justify-content:center;font-size:1.35rem;
    box-shadow:0 0 0 1px rgba(0,194,122,0.3),0 8px 24px rgba(0,194,122,0.45);
    transition:transform 0.4s var(--ease-spring),box-shadow 0.3s;
    position:relative;overflow:hidden;
  }
  .nav-logo-mark::after{
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,0.2),transparent);
    border-radius:14px;
  }
  .nav-logo:hover .nav-logo-mark{
    transform:rotate(-12deg) scale(1.12);
    box-shadow:0 0 0 2px rgba(0,194,122,0.5),0 12px 32px rgba(0,194,122,0.6);
  }
  .nav-logo-text{
    font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:700;
    color:white;line-height:1;letter-spacing:-0.01em;
  }
  .nav-logo-sub{
    font-family:'JetBrains Mono',monospace;font-size:0.48rem;color:var(--emerald2);
    letter-spacing:0.28em;text-transform:uppercase;margin-top:3px;opacity:0.8;
  }

  .nav-center{display:flex;align-items:center;gap:4px;position:relative;z-index:1}
  .nav-link{
    font-size:0.84rem;font-weight:500;color:rgba(255,255,255,0.6);
    padding:0.44rem 1rem;border-radius:10px;border:none;background:none;
    transition:all 0.25s;white-space:nowrap;position:relative;overflow:hidden;
    letter-spacing:0.01em;
    animation:navItemIn 0.6s var(--ease-spring) both;
  }
  .nav-link::after{
    content:'';position:absolute;bottom:5px;left:50%;right:50%;
    height:1.5px;background:linear-gradient(90deg,var(--emerald),var(--emerald2));
    border-radius:2px;transition:all 0.35s var(--ease-spring);
  }
  .nav-link:hover{color:white;background:rgba(255,255,255,0.07)}
  .nav-link:hover::after{left:12px;right:12px}
  .nav-link.active{
    color:var(--ink);
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));
    font-weight:700;
    box-shadow:0 4px 18px rgba(0,194,122,0.45),0 0 0 1px rgba(0,232,150,0.3);
  }
  .nav-link.active::after{display:none}

  .nav-right{display:flex;align-items:center;gap:0.75rem;position:relative;z-index:1}
  .nav-book{
    padding:0.56rem 1.6rem;
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));
    color:var(--ink);border-radius:12px;font-size:0.85rem;font-weight:800;
    border:none;transition:all 0.3s;white-space:nowrap;
    box-shadow:0 6px 20px rgba(0,194,122,0.5),0 0 0 1px rgba(0,232,150,0.2);
    position:relative;overflow:hidden;letter-spacing:0.01em;
  }
  .nav-book::before{
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,white,rgba(255,255,255,0.2));
    opacity:0;transition:opacity 0.3s;
  }
  .nav-book:hover::before{opacity:0.15}
  .nav-book:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 12px 30px rgba(0,194,122,0.6)}
  .nav-book span{position:relative;z-index:1}

  .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:6px;position:relative;z-index:1}
  .hamburger span{display:block;width:22px;height:2px;background:white;border-radius:2px;transition:all 0.3s}
  .mob-menu{
    display:none;position:fixed;top:76px;left:0;right:0;z-index:999;
    background:linear-gradient(160deg,#1A0533,#0D1535,#0A1A4F);
    padding:1.2rem 1.5rem 2rem;border-top:1px solid rgba(0,194,122,0.2);
    box-shadow:0 32px 80px rgba(0,0,0,0.5);flex-direction:column;
    animation:fadeIn 0.22s ease;
  }
  .mob-menu.open{display:flex}
  .mob-link{
    padding:0.9rem 0.5rem;font-size:1rem;font-weight:500;
    color:rgba(255,255,255,0.6);border-bottom:1px solid rgba(255,255,255,0.06);
    background:none;border-left:none;border-right:none;border-top:none;
    text-align:left;width:100%;transition:color 0.18s;
  }
  .mob-link:hover{color:var(--emerald2)}
  .mob-cta{
    margin-top:1rem;padding:0.9rem;
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));
    color:var(--ink);border-radius:12px;font-size:1rem;font-weight:800;border:none;
  }

  /* ── HERO ── */
  .hero{
    min-height:100vh;position:relative;overflow:hidden;
    display:flex;align-items:center;padding-top:76px;
    background:linear-gradient(145deg,#06020F 0%,#080B14 40%,#030920 70%,#050714 100%);
    width:100%;max-width:100vw;
  }
  .hero-bg{
    position:absolute;inset:0;z-index:0;
    background-image:url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1800&q=80');
    background-size:cover;background-position:center 30%;opacity:0.07;
  }
  .hero-mesh{
    position:absolute;inset:0;z-index:1;
    background:
      radial-gradient(ellipse 60% 60% at 15% 70%,rgba(0,194,122,0.15) 0%,transparent 65%),
      radial-gradient(ellipse 50% 50% at 85% 20%,rgba(147,51,234,0.14) 0%,transparent 60%),
      radial-gradient(ellipse 40% 40% at 55% 90%,rgba(37,99,235,0.10) 0%,transparent 60%);
    animation:glowPulse 8s ease-in-out infinite;
  }
  .hero-grid{
    position:absolute;inset:0;z-index:1;opacity:0.035;
    background-image:linear-gradient(rgba(0,194,122,0.5) 1px,transparent 1px),
                     linear-gradient(90deg,rgba(0,194,122,0.5) 1px,transparent 1px);
    background-size:72px 72px;
  }

  .hero-orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:1;animation:orbMove 10s ease-in-out infinite}
  .hero-orb-1{width:600px;height:600px;background:radial-gradient(circle,rgba(0,194,122,0.22),transparent 70%);top:-150px;right:-50px;animation-delay:0s}
  .hero-orb-2{width:400px;height:400px;background:radial-gradient(circle,rgba(147,51,234,0.18),transparent 70%);bottom:-80px;left:-80px;animation-delay:4s}
  .hero-orb-3{width:280px;height:280px;background:radial-gradient(circle,rgba(245,158,11,0.12),transparent 70%);top:30%;right:30%;animation-delay:7s}

  .hero-content{
    position:relative;z-index:2;max-width:1280px;margin:0 auto;width:100%;
    padding:5rem 3rem;display:grid;grid-template-columns:1.2fr 0.8fr;
    gap:5rem;align-items:center;
  }
  .hero-eyebrow{
    display:inline-flex;align-items:center;gap:12px;
    background:rgba(0,194,122,0.08);
    border:1px solid rgba(0,194,122,0.3);
    border-radius:100px;padding:8px 22px 8px 10px;margin-bottom:2.2rem;
    animation:borderGlow 3s ease-in-out infinite;transition:transform 0.3s;
    backdrop-filter:blur(12px);
  }
  .hero-eyebrow:hover{transform:translateY(-2px)}
  .hero-dot{width:10px;height:10px;background:var(--emerald2);border-radius:50%;animation:pulseDot 2s ease-in-out infinite;box-shadow:0 0 10px var(--emerald2)}
  .hero-eyebrow span{font-family:'JetBrains Mono',monospace;font-size:0.66rem;color:var(--emerald2);font-weight:500;letter-spacing:0.14em;text-transform:uppercase}

  .hero-h1{
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(3.8rem,5.5vw,6.4rem);font-weight:700;
    color:white;line-height:1.02;margin-bottom:1.7rem;letter-spacing:-0.03em;
  }
  .hero-h1 em{
    background:linear-gradient(120deg,var(--emerald2) 0%,#7FFFD4 30%,var(--amber2) 60%,var(--emerald2) 100%);
    background-size:300% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    font-style:italic;animation:textShimmer 5s linear infinite;
  }
  .hero-p{
    font-size:1.05rem;color:rgba(255,255,255,0.45);line-height:1.95;
    max-width:470px;margin-bottom:2.8rem;font-weight:300;letter-spacing:0.01em;
  }
  .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3.8rem}

  .btn-hp{
    padding:1rem 2.6rem;
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));
    color:var(--ink);border-radius:14px;font-size:0.94rem;font-weight:800;
    border:none;transition:all 0.3s;display:inline-flex;align-items:center;gap:10px;
    box-shadow:0 14px 36px rgba(0,194,122,0.55),0 0 0 1px rgba(0,232,150,0.2);
    position:relative;overflow:hidden;letter-spacing:0.01em;
  }
  .btn-hp::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.25),transparent);opacity:0;transition:opacity 0.3s}
  .btn-hp:hover::before{opacity:1}
  .btn-hp:hover{transform:translateY(-4px) scale(1.03);box-shadow:0 22px 50px rgba(0,194,122,0.65)}
  .btn-hp span{position:relative;z-index:1}

  .btn-ho{
    padding:1rem 2.4rem;background:rgba(255,255,255,0.06);
    color:rgba(255,255,255,0.8);border-radius:14px;font-size:0.94rem;font-weight:500;
    border:1px solid rgba(255,255,255,0.14);transition:all 0.3s;
    display:inline-flex;align-items:center;gap:10px;backdrop-filter:blur(12px);
  }
  .btn-ho:hover{border-color:var(--emerald);color:var(--emerald2);background:rgba(0,194,122,0.1);transform:translateY(-3px)}

  .hero-stats{
    display:flex;gap:3rem;padding-top:2.8rem;
    border-top:1px solid rgba(255,255,255,0.07);
  }
  .hstat-n{
    font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:700;
    color:white;line-height:1;animation:numberCount 0.7s ease both;
  }
  .hstat-n span{
    background:linear-gradient(135deg,var(--emerald2),var(--amber2));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  }
  .hstat-l{font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:rgba(255,255,255,0.28);text-transform:uppercase;letter-spacing:0.16em;margin-top:7px}

  .hero-img-card{
    border-radius:28px;overflow:hidden;position:relative;
    box-shadow:0 60px 110px rgba(0,0,0,0.7),0 0 0 1px rgba(0,194,122,0.12),var(--sh-glow);
    animation:magneticFloat 8s ease-in-out infinite;
  }
  .hero-img-card img{width:100%;height:520px;object-fit:cover;display:block;transition:transform 0.8s}
  .hero-img-card:hover img{transform:scale(1.05)}
  .hero-img-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,11,20,0.85) 0%,rgba(8,11,20,0.2) 45%,transparent 100%)}
  .hero-scan{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:0.04}
  .hero-scan::after{content:'';position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--emerald2),transparent);animation:scanLine 3.5s linear infinite}

  .hero-img-badge{
    position:absolute;bottom:1.8rem;left:1.5rem;right:1.5rem;
    background:rgba(8,11,20,0.85);backdrop-filter:blur(24px);
    border:1px solid rgba(0,194,122,0.2);border-radius:18px;
    padding:1.1rem 1.3rem;display:flex;align-items:center;gap:1rem;
    transition:transform 0.3s;
  }
  .hero-img-badge:hover{transform:translateY(-2px)}
  .hero-badge-icon{
    width:48px;height:48px;
    background:linear-gradient(135deg,var(--emerald),#00A86B);
    border-radius:13px;display:flex;align-items:center;justify-content:center;
    font-size:1.5rem;flex-shrink:0;
    box-shadow:0 8px 24px rgba(0,194,122,0.5);
  }
  .hero-badge-title{font-size:0.9rem;font-weight:700;color:white}
  .hero-badge-sub{font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:rgba(255,255,255,0.45);margin-top:3px}

  .hero-float{
    position:absolute;top:-24px;right:-24px;
    background:linear-gradient(135deg,#1A0533,#0A1A4F);
    border-radius:20px;padding:1.3rem 1.7rem;
    box-shadow:0 32px 70px rgba(0,0,0,0.4),0 0 0 1px rgba(0,194,122,0.2),var(--sh-glow);
    min-width:180px;animation:float 5s 1.5s ease-in-out infinite;
    border:1px solid rgba(0,194,122,0.15);
  }
  .hero-float-lbl{font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.16em;margin-bottom:5px}
  .hero-float-val{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:white;line-height:1}
  .hero-float-sub{font-size:0.73rem;color:var(--emerald2);font-weight:600;margin-top:5px}
  .hero-card-wrap{position:relative}

  .trust-bar{
    background:linear-gradient(90deg,#0D1224,#080B14,#0D1224);
    padding:1.4rem 3rem;border-top:1px solid rgba(0,194,122,0.12);
    border-bottom:1px solid rgba(0,194,122,0.06);
  }
  .trust-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap}
  .trust-item{
    display:flex;align-items:center;gap:11px;color:rgba(255,255,255,0.5);
    font-size:0.82rem;font-weight:500;transition:all 0.25s;
  }
  .trust-item:hover{color:var(--emerald2);transform:translateY(-1px)}
  .trust-div{width:1px;height:28px;background:rgba(255,255,255,0.06)}

  .section{padding:7rem 3rem}
  .s-inner{max-width:1280px;margin:0 auto}
  .s-ey{
    font-family:'JetBrains Mono',monospace;font-size:0.64rem;
    text-transform:uppercase;letter-spacing:0.25em;color:var(--emerald);font-weight:500;margin-bottom:0.75rem;
  }
  .s-title{
    font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,3.8vw,3.8rem);
    font-weight:700;color:var(--ink);line-height:1.05;letter-spacing:-0.03em;
  }
  .s-desc{font-size:0.97rem;color:var(--g500);line-height:1.92;max-width:520px;font-weight:300}
  .s-hdr{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3.8rem;gap:2rem;flex-wrap:wrap}

  .btn-ghost{
    padding:0.64rem 1.6rem;background:transparent;color:var(--emerald);
    border:1.5px solid var(--emerald);border-radius:12px;font-size:0.85rem;font-weight:600;
    transition:all 0.3s;white-space:nowrap;
  }
  .btn-ghost:hover{
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));
    color:var(--ink);border-color:transparent;
    transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,194,122,0.42);
  }
  .btn-primary{
    padding:0.9rem 2.2rem;
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));
    color:var(--ink);border-radius:14px;font-size:0.92rem;font-weight:800;border:none;
    transition:all 0.3s;display:inline-flex;align-items:center;gap:9px;
    box-shadow:0 10px 24px rgba(0,194,122,0.42);position:relative;overflow:hidden;
  }
  .btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.25),transparent);opacity:0;transition:opacity 0.3s}
  .btn-primary:hover::before{opacity:1}
  .btn-primary:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(0,194,122,0.55)}
  .btn-primary span{position:relative;z-index:1}

  .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem}
  .why-card{
    border-radius:24px;padding:2.5rem;border:1.5px solid var(--g200);
    transition:all 0.4s var(--ease-spring);position:relative;overflow:hidden;
    background:white;
  }
  .why-card::before{
    content:'';position:absolute;top:0;left:0;right:0;height:4px;
    background:var(--card-accent,linear-gradient(90deg,var(--emerald),var(--emerald2)));
    transform:scaleX(0);transition:transform 0.44s var(--ease-spring);transform-origin:left;
  }
  .why-card::after{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse 80% 60% at 80% 120%,var(--card-glow,rgba(0,194,122,0.06)) 0%,transparent 70%);
    pointer-events:none;transition:opacity 0.5s;opacity:0;
  }
  .why-card:hover{box-shadow:var(--sh-lg);transform:translateY(-10px);border-color:rgba(0,194,122,0.2)}
  .why-card:hover::before{transform:scaleX(1)}
  .why-card:hover::after{opacity:1}
  .why-card:hover .why-icon{animation:iconBounce 0.6s ease}
  .why-icon{font-size:2.5rem;margin-bottom:1.3rem;display:block;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.15))}
  .why-title{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:var(--ink);margin-bottom:0.65rem}
  .why-desc{font-size:0.84rem;color:var(--g500);line-height:1.85}

  .dept-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.3rem}
  .dept-card{
    background:white;border-radius:24px;padding:2rem;border:1.5px solid var(--g200);
    transition:all 0.4s var(--ease-spring);position:relative;overflow:hidden;
  }
  .dept-card::after{
    content:'';position:absolute;bottom:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--emerald),var(--orchid));
    transform:scaleX(0);transition:transform 0.4s;transform-origin:left;
  }
  .dept-card:hover{transform:translateY(-9px);box-shadow:var(--sh-lg);border-color:rgba(0,194,122,0.25)}
  .dept-card:hover::after{transform:scaleX(1)}
  .dept-card.active-dept{
    border-color:var(--emerald);
    box-shadow:0 0 0 3px rgba(0,194,122,0.2),var(--sh-md);transform:translateY(-5px);
  }
  .dept-card.active-dept::after{transform:scaleX(1)}
  .dept-icon{
    width:60px;height:60px;border-radius:18px;display:flex;align-items:center;
    justify-content:center;font-size:1.7rem;margin-bottom:1.2rem;
    transition:transform 0.4s var(--ease-spring);
  }
  .dept-card:hover .dept-icon{transform:scale(1.18) rotate(-10deg)}
  .dept-name{font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:700;color:var(--ink);margin-bottom:0.3rem}
  .dept-cnt{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--g400);text-transform:uppercase;letter-spacing:0.1em}
  .dept-arr{position:absolute;top:1.4rem;right:1.4rem;color:var(--g200);font-size:1rem;transition:all 0.3s}
  .dept-card:hover .dept-arr,.dept-card.active-dept .dept-arr{color:var(--emerald);transform:translate(3px,-3px)}

  .dept-doc-panel{
    background:white;border-radius:28px;padding:2.8rem;
    border:1px solid rgba(0,194,122,0.16);box-shadow:var(--sh-md);
    margin-top:2rem;animation:fadeUp 0.44s var(--ease-spring);
  }
  .dept-doc-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;padding-bottom:1.3rem;border-bottom:2px solid var(--emerald3)}
  .dept-doc-title{font-family:'Cormorant Garamond',serif;font-size:1.75rem;font-weight:700;color:var(--ink)}
  .dept-close{
    background:var(--g100);border:none;border-radius:50%;width:40px;height:40px;
    display:flex;align-items:center;justify-content:center;font-size:1.1rem;
    transition:all 0.24s;color:var(--g600);
  }
  .dept-close:hover{background:var(--crimson3);color:var(--crimson);transform:rotate(90deg)}

  .doc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.8rem}
  .doc-card{
    background:white;border-radius:26px;overflow:hidden;border:1.5px solid var(--g200);
    transition:all 0.44s var(--ease-spring);
  }
  .doc-card:hover{
    transform:translateY(-12px);
    box-shadow:0 48px 100px rgba(0,0,0,0.16),0 0 0 1px rgba(0,194,122,0.16);
    border-color:rgba(0,194,122,0.26);
  }
  .doc-img-wrap{position:relative;height:270px;overflow:hidden;background:linear-gradient(135deg,var(--sapphire3),var(--emerald3))}
  .doc-img-wrap img{width:100%;height:100%;object-fit:cover;object-position:top center;transition:transform 0.65s ease;display:block}
  .doc-card:hover .doc-img-wrap img{transform:scale(1.1)}
  .doc-avail{
    position:absolute;top:1rem;left:1rem;padding:5px 15px;border-radius:100px;
    font-family:'JetBrains Mono',monospace;font-size:0.61rem;font-weight:500;
    text-transform:uppercase;letter-spacing:0.1em;backdrop-filter:blur(16px);
  }
  .av-yes{background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);color:#059669}
  .av-no{background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);color:#B45309}
  .doc-hover-soc{
    position:absolute;bottom:1rem;right:1rem;display:flex;gap:7px;
    opacity:0;transform:translateY(12px);transition:all 0.36s;
  }
  .doc-card:hover .doc-hover-soc{opacity:1;transform:translateY(0)}
  .doc-soc-btn{
    width:36px;height:36px;background:rgba(255,255,255,0.92);backdrop-filter:blur(14px);
    border-radius:10px;display:flex;align-items:center;justify-content:center;
    font-size:0.8rem;border:none;transition:all 0.26s;text-decoration:none;color:var(--g700);
  }
  .doc-soc-btn:hover{background:var(--emerald);color:white;transform:scale(1.18)}
  .doc-body{padding:1.6rem}
  .doc-name{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;color:var(--ink);margin-bottom:0.22rem;letter-spacing:-0.01em}
  .doc-spec{font-family:'JetBrains Mono',monospace;font-size:0.63rem;color:var(--emerald);font-weight:500;text-transform:uppercase;letter-spacing:0.14em;margin-bottom:0.8rem}
  .doc-exp{font-size:0.82rem;color:var(--g500)}
  .doc-rating-row{display:flex;align-items:center;gap:10px;margin-top:0.8rem;padding-top:0.8rem;border-top:1px solid var(--g100)}
  .doc-stars{color:var(--amber);font-size:0.8rem;letter-spacing:1px}
  .doc-rnum{font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:var(--g400)}

  .filter-bar{display:flex;gap:0.65rem;flex-wrap:wrap;margin-bottom:2.5rem}
  .filter-pill{
    padding:0.48rem 1.25rem;border-radius:100px;font-size:0.82rem;font-weight:500;
    border:1.5px solid var(--g200);background:white;color:var(--g600);transition:all 0.25s;
  }
  .filter-pill:hover{border-color:var(--emerald);color:var(--emerald);transform:translateY(-1px)}
  .filter-pill.active{
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));
    color:var(--ink);border-color:transparent;font-weight:700;
    box-shadow:0 6px 18px rgba(0,194,122,0.38);
  }

  .detail-back{
    display:inline-flex;align-items:center;gap:9px;color:var(--emerald);
    font-size:0.875rem;font-weight:600;margin-bottom:2rem;
    background:none;border:none;padding:0.5rem 1rem 0.5rem 0;transition:all 0.24s;
  }
  .detail-back:hover{gap:14px;color:var(--emerald2)}
  .det-hero{
    background:white;border-radius:32px;overflow:hidden;box-shadow:var(--sh-lg);
    margin-bottom:2rem;display:grid;grid-template-columns:310px 1fr;
    animation:fadeUp 0.5s var(--ease-spring);
  }
  .det-img{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--sapphire3),var(--emerald3))}
  .det-img img{width:100%;height:100%;min-height:400px;object-fit:cover;object-position:top;transition:transform 0.6s}
  .det-hero:hover .det-img img{transform:scale(1.06)}
  .det-info{padding:3.2rem}
  .det-name{font-family:'Cormorant Garamond',serif;font-size:2.7rem;font-weight:700;color:var(--ink);letter-spacing:-0.03em;margin-bottom:0.45rem}
  .det-spec-pill{
    display:inline-flex;align-items:center;gap:7px;
    background:linear-gradient(135deg,var(--emerald3),rgba(0,194,122,0.06));
    color:var(--emerald);padding:6px 18px;border-radius:100px;
    font-family:'JetBrains Mono',monospace;font-size:0.65rem;font-weight:500;
    text-transform:uppercase;letter-spacing:0.14em;margin-bottom:1.4rem;
    border:1px solid rgba(0,194,122,0.22);
  }
  .det-tags{display:flex;gap:0.58rem;flex-wrap:wrap;margin-bottom:1.7rem}
  .det-tag{
    padding:5px 16px;background:var(--g100);border-radius:100px;
    font-size:0.78rem;color:var(--g600);font-weight:500;transition:all 0.22s;
  }
  .det-tag:hover{background:var(--emerald3);color:var(--emerald)}
  .det-meta{
    display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;
    padding:1.6rem;background:linear-gradient(135deg,var(--g50),rgba(0,194,122,0.03));
    border-radius:18px;margin-top:1.6rem;border:1px solid var(--g200);
  }
  .det-meta-val{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:var(--ink);text-align:center}
  .det-meta-key{font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:var(--g400);text-transform:uppercase;letter-spacing:0.13em;margin-top:4px;text-align:center}
  .det-cols{display:grid;grid-template-columns:2fr 1fr;gap:1.7rem}
  .d-card{
    background:white;border-radius:22px;padding:2.2rem;border:1.5px solid var(--g200);
    margin-bottom:1.7rem;transition:all 0.32s;
  }
  .d-card:hover{box-shadow:var(--sh-sm);border-color:rgba(0,194,122,0.22)}
  .d-card-title{
    font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:700;
    color:var(--ink);margin-bottom:1.4rem;padding-bottom:0.8rem;
    border-bottom:2px solid var(--emerald3);
  }
  .qual-row{display:flex;gap:1rem;margin-bottom:1rem;align-items:flex-start}
  .qual-icon{
    width:42px;height:42px;
    background:linear-gradient(135deg,var(--emerald3),rgba(0,194,122,0.07));
    border-radius:12px;display:flex;align-items:center;justify-content:center;
    font-size:1.05rem;flex-shrink:0;
  }
  .qual-strong{font-size:0.88rem;font-weight:600;color:var(--ink);display:block}
  .qual-muted{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--g400)}
  .hr-row{display:flex;justify-content:space-between;align-items:center;padding:0.65rem 0;border-bottom:1px solid var(--g100)}
  .hr-day{font-size:0.85rem;font-weight:600;color:var(--ink)}
  .hr-time{font-family:'JetBrains Mono',monospace;font-size:0.74rem;color:var(--emerald)}
  .rev-item{padding:1.3rem 0;border-bottom:1px solid var(--g100)}
  .rev-top{display:flex;justify-content:space-between;margin-bottom:0.48rem}
  .rev-name{font-weight:700;font-size:0.88rem;color:var(--ink)}
  .rev-date{font-family:'JetBrains Mono',monospace;font-size:0.63rem;color:var(--g400)}
  .rev-stars{color:var(--amber);font-size:0.8rem;margin-bottom:0.48rem}
  .rev-txt{font-size:0.86rem;color:var(--g500);line-height:1.8}

  .pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;align-items:stretch}
  .pkg-card{
    border-radius:32px;padding:2.8rem;position:relative;overflow:hidden;
    transition:all 0.4s var(--ease-spring);border:2px solid var(--g200);
    background:white;display:flex;flex-direction:column;
  }
  .pkg-card:hover{transform:translateY(-12px);box-shadow:0 52px 110px rgba(0,0,0,0.16)}
  .pkg-card.featured{
    background:linear-gradient(148deg,#060217 0%,#0C0A24 40%,#040E1F 100%);
    border-color:rgba(0,194,122,0.4);
    box-shadow:0 0 0 1px rgba(0,194,122,0.15),var(--sh-lg);
  }
  .pkg-card.featured::before{
    content:'';position:absolute;inset:0;
    background:
      radial-gradient(ellipse 70% 50% at 20% 20%,rgba(0,194,122,0.08) 0%,transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 80%,rgba(147,51,234,0.08) 0%,transparent 60%);
    pointer-events:none;
  }
  .pkg-badge{
    position:absolute;top:1.8rem;right:1.8rem;
    background:linear-gradient(135deg,var(--amber),var(--amber2));
    color:var(--ink);padding:5px 16px;border-radius:100px;
    font-family:'JetBrains Mono',monospace;font-size:0.61rem;font-weight:700;
    text-transform:uppercase;letter-spacing:0.1em;
    animation:float 3.5s ease-in-out infinite;
    box-shadow:0 6px 18px rgba(245,158,11,0.45);
  }
  .pkg-icon{
    width:68px;height:68px;border-radius:22px;display:flex;align-items:center;
    justify-content:center;font-size:2rem;margin-bottom:1.7rem;
    transition:transform 0.4s var(--ease-spring);
  }
  .pkg-card:hover .pkg-icon{animation:iconBounce 0.6s ease}
  .pkg-icon.l{background:linear-gradient(135deg,var(--emerald3),rgba(0,194,122,0.08));border:1px solid rgba(0,194,122,0.18)}
  .pkg-icon.d{background:rgba(0,194,122,0.15);border:1px solid rgba(0,194,122,0.25)}
  .pkg-name{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:700;margin-bottom:0.5rem}
  .pkg-name.l{color:var(--ink)} .pkg-name.d{color:white}
  .pkg-desc{font-size:0.86rem;line-height:1.76;margin-bottom:2rem}
  .pkg-desc.l{color:var(--g500)} .pkg-desc.d{color:rgba(255,255,255,0.42)}
  .pkg-price-wrap{margin-bottom:2rem;padding-bottom:1.8rem;border-bottom:1px solid}
  .pkg-price-wrap.l{border-color:var(--g200)} .pkg-price-wrap.d{border-color:rgba(255,255,255,0.08)}
  .pkg-cur{font-size:1.1rem;font-weight:700;vertical-align:super}
  .pkg-cur.l{color:var(--emerald)} .pkg-cur.d{color:var(--emerald2)}
  .pkg-amt{font-family:'Cormorant Garamond',serif;font-size:3.6rem;font-weight:700;line-height:1}
  .pkg-amt.l{color:var(--ink)} .pkg-amt.d{color:white}
  .pkg-per{font-size:0.78rem;margin-top:6px}
  .pkg-per.l{color:var(--g400)} .pkg-per.d{color:rgba(255,255,255,0.3)}
  .pkg-features{list-style:none;margin-bottom:2.5rem;flex:1}
  .pkg-feat{display:flex;align-items:center;gap:11px;padding:0.48rem 0;font-size:0.86rem}
  .pkg-feat.l{color:var(--g600)} .pkg-feat.d{color:rgba(255,255,255,0.68)}
  .pkg-chk{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:800;flex-shrink:0}
  .pkg-chk.l{background:linear-gradient(135deg,var(--emerald3),rgba(0,194,122,0.12));color:var(--emerald);border:1px solid rgba(0,194,122,0.22)}
  .pkg-chk.d{background:linear-gradient(135deg,rgba(0,194,122,0.3),rgba(0,232,150,0.2));color:var(--emerald2)}

  .pkg-btn{
    width:100%;padding:1.05rem 1.5rem;
    background:linear-gradient(135deg,var(--emerald) 0%,var(--emerald2) 100%);
    color:var(--ink);border-radius:15px;font-weight:800;font-size:0.92rem;border:none;
    transition:all 0.3s var(--ease-spring);
    box-shadow:0 10px 28px rgba(0,194,122,0.45);
    position:relative;overflow:hidden;display:flex;align-items:center;
    justify-content:center;gap:9px;letter-spacing:0.01em;margin-top:auto;
  }
  .pkg-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.25),transparent);opacity:0;transition:opacity 0.3s}
  .pkg-btn:hover::before{opacity:1}
  .pkg-btn:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 20px 48px rgba(0,194,122,0.6)}
  .pkg-btn span{position:relative;z-index:1}

  .srv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.8rem}
  .srv-card{
    background:white;border-radius:28px;padding:2.3rem;border:1.5px solid var(--g200);
    transition:all 0.4s var(--ease-spring);position:relative;overflow:hidden;
  }
  .srv-card:hover{transform:translateY(-9px);box-shadow:var(--sh-lg);border-color:transparent}
  .srv-card-accent{position:absolute;top:0;left:0;right:0;height:4px;border-radius:28px 28px 0 0}
  .srv-icon-wrap{
    width:70px;height:70px;border-radius:22px;display:flex;align-items:center;
    justify-content:center;font-size:2rem;margin-bottom:1.5rem;
    transition:transform 0.44s var(--ease-spring);
  }
  .srv-card:hover .srv-icon-wrap{transform:scale(1.14) rotate(-10deg)}
  .srv-name{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:var(--ink);margin-bottom:0.6rem}
  .srv-desc{font-size:0.86rem;color:var(--g500);line-height:1.82;margin-bottom:1.5rem}
  .srv-features{list-style:none;display:flex;flex-direction:column;gap:8px}
  .srv-feat{display:flex;align-items:center;gap:10px;font-size:0.82rem;color:var(--g600)}
  .srv-feat::before{
    content:'✓';width:20px;height:20px;border-radius:50%;display:flex;align-items:center;
    justify-content:center;font-size:0.6rem;font-weight:800;flex-shrink:0;
    background:var(--emerald3);color:var(--emerald);
  }

  .faq-item{border-bottom:1px solid var(--g200);transition:background 0.2s;position:relative;cursor:pointer}
  .faq-q{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 0;gap:1rem;cursor:pointer}
  .faq-qt{font-size:0.94rem;font-weight:600;color:var(--ink);transition:color 0.22s}
  .faq-item:hover .faq-qt{color:var(--emerald)}
  .faq-ico{
    width:36px;height:36px;border-radius:50%;
    background:var(--emerald3);display:flex;align-items:center;justify-content:center;
    color:var(--emerald);font-size:1.15rem;font-weight:700;flex-shrink:0;
    transition:all 0.4s var(--ease-spring);cursor:pointer;
  }
  .faq-item:hover .faq-ico{
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));color:var(--ink);
    transform:rotate(45deg) scale(1.18);box-shadow:0 8px 20px rgba(0,194,122,0.42);
  }
  .faq-ans{
    font-size:0.88rem;color:var(--g500);line-height:1.9;
    max-height:0;overflow:hidden;
    transition:max-height 0.45s var(--ease-smooth),padding 0.3s,opacity 0.34s;
    opacity:0;padding-bottom:0;
  }
  .faq-item:hover .faq-ans{max-height:260px;opacity:1;padding-bottom:1.5rem}

  .ins-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.9rem;margin-top:1.8rem}
  .ins-card{
    background:var(--g50);border-radius:15px;padding:1.2rem;text-align:center;
    border:1.5px solid var(--g200);transition:all 0.3s;
  }
  .ins-card:hover{border-color:var(--emerald);background:var(--emerald3);transform:translateY(-6px);box-shadow:var(--sh-sm)}
  .ins-logo{font-size:1.7rem;margin-bottom:0.44rem}
  .ins-name{font-size:0.68rem;font-weight:600;color:var(--ink)}

  .contact-grid{display:grid;grid-template-columns:1.2fr 0.8fr;gap:2rem}
  .form-card{
    background:white;border-radius:32px;padding:2.8rem;
    box-shadow:var(--sh-md);border:1.5px solid var(--g200);
  }
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  .form-field{margin-bottom:1.3rem}
  .form-lbl{font-family:'JetBrains Mono',monospace;font-size:0.6rem;text-transform:uppercase;letter-spacing:0.16em;color:var(--g500);margin-bottom:0.6rem;display:block;font-weight:500}
  .form-inp{
    width:100%;padding:0.88rem 1.2rem;border:1.5px solid var(--g200);border-radius:12px;
    font-family:'Outfit',sans-serif;font-size:0.88rem;color:var(--g800);outline:none;
    transition:all 0.27s;background:var(--g50);cursor:text;
  }
  .form-inp:focus{border-color:var(--emerald);background:white;box-shadow:0 0 0 5px rgba(0,194,122,0.1)}
  .form-ta{
    width:100%;padding:0.88rem 1.2rem;border:1.5px solid var(--g200);border-radius:12px;
    font-family:'Outfit',sans-serif;font-size:0.88rem;color:var(--g800);outline:none;
    transition:all 0.27s;background:var(--g50);resize:vertical;min-height:116px;cursor:text;
  }
  .form-ta:focus{border-color:var(--emerald);background:white;box-shadow:0 0 0 5px rgba(0,194,122,0.1)}
  .contact-right{display:flex;flex-direction:column;gap:1rem}
  .emer-card{
    background:linear-gradient(138deg,#7F1D1D,#991B1B);
    border-radius:24px;padding:2rem;color:white;position:relative;overflow:hidden;transition:transform 0.3s;
    border:1px solid rgba(255,100,100,0.2);
  }
  .emer-card::before{content:'🚨';position:absolute;right:-14px;bottom:-14px;font-size:6rem;opacity:0.07;pointer-events:none}
  .emer-card:hover{transform:translateY(-3px)}
  .emer-lbl{font-family:'JetBrains Mono',monospace;font-size:0.6rem;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.5);margin-bottom:0.6rem}
  .emer-num{font-family:'Cormorant Garamond',serif;font-size:3.1rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:0.28rem}
  .emer-sub{font-size:0.8rem;color:rgba(255,255,255,0.52)}
  .info-tile{
    background:white;border-radius:17px;padding:1.2rem 1.5rem;border:1.5px solid var(--g200);
    display:flex;align-items:center;gap:1rem;transition:all 0.28s;
  }
  .info-tile:hover{border-color:var(--emerald);box-shadow:var(--sh-sm);transform:translateX(5px)}
  .info-tile-ico{
    width:48px;height:48px;
    background:linear-gradient(135deg,var(--emerald3),rgba(0,194,122,0.05));
    border-radius:13px;display:flex;align-items:center;justify-content:center;
    font-size:1.3rem;flex-shrink:0;border:1px solid rgba(0,194,122,0.15);
  }
  .info-tile-lbl{font-family:'JetBrains Mono',monospace;font-size:0.58rem;text-transform:uppercase;letter-spacing:0.14em;color:var(--g400)}
  .info-tile-val{font-size:0.88rem;font-weight:600;color:var(--ink)}
  .map-wrap{border-radius:22px;overflow:hidden;min-height:244px;border:2px solid var(--g200)}
  .map-wrap iframe{width:100%;height:244px;border:0;display:block}

  .portal-overlay{
    position:fixed;inset:0;z-index:2000;
    background:rgba(6,2,15,0.82);backdrop-filter:blur(16px);
    display:flex;align-items:center;justify-content:center;
    animation:overlayIn 0.32s ease;padding:1rem;
  }
  .portal-modal{
    background:white;border-radius:32px;padding:3rem;width:100%;max-width:450px;
    box-shadow:0 60px 120px rgba(0,0,0,0.4);animation:modalIn 0.46s var(--ease-spring);
    position:relative;overflow:hidden;
  }
  .portal-modal::before{
    content:'';position:absolute;top:-80px;right:-80px;width:260px;height:260px;
    background:radial-gradient(circle,rgba(0,194,122,0.10) 0%,transparent 70%);
    border-radius:50%;pointer-events:none;
  }
  .portal-modal::after{
    content:'';position:absolute;bottom:-80px;left:-80px;width:240px;height:240px;
    background:radial-gradient(circle,rgba(147,51,234,0.08) 0%,transparent 70%);
    border-radius:50%;pointer-events:none;
  }
  .portal-close-btn{
    position:absolute;top:1.5rem;right:1.5rem;background:var(--g100);border:none;
    border-radius:50%;width:40px;height:40px;display:flex;align-items:center;
    justify-content:center;font-size:1.1rem;color:var(--g600);transition:all 0.24s;z-index:1;
  }
  .portal-close-btn:hover{background:var(--crimson3);color:var(--crimson);transform:rotate(90deg)}
  .portal-logo{
    width:60px;height:60px;
    background:linear-gradient(135deg,var(--emerald),#00A86B);
    border-radius:18px;display:flex;align-items:center;justify-content:center;
    font-size:1.7rem;margin-bottom:1.7rem;
    box-shadow:0 12px 28px rgba(0,194,122,0.5);
  }
  .portal-title{font-family:'Cormorant Garamond',serif;font-size:2.1rem;font-weight:700;color:var(--ink);margin-bottom:0.4rem;position:relative;z-index:1}
  .portal-sub{font-size:0.88rem;color:var(--g500);margin-bottom:2.2rem;line-height:1.7;position:relative;z-index:1}
  .portal-field{margin-bottom:1.2rem;position:relative;z-index:1}
  .portal-lbl{font-family:'JetBrains Mono',monospace;font-size:0.6rem;text-transform:uppercase;letter-spacing:0.16em;color:var(--g500);margin-bottom:0.54rem;display:block}
  .portal-inp{
    width:100%;padding:0.88rem 1.2rem;border:1.5px solid var(--g200);border-radius:13px;
    font-family:'Outfit',sans-serif;font-size:0.9rem;color:var(--g800);outline:none;
    transition:all 0.27s;background:var(--g50);cursor:text;
  }
  .portal-inp:focus{border-color:var(--emerald);background:white;box-shadow:0 0 0 5px rgba(0,194,122,0.1)}
  .portal-btn{
    width:100%;padding:1rem;
    background:linear-gradient(135deg,var(--emerald),var(--emerald2));
    color:var(--ink);border-radius:14px;font-weight:800;font-size:0.94rem;border:none;
    transition:all 0.3s;margin-top:0.55rem;
    box-shadow:0 12px 30px rgba(0,194,122,0.46);
    position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:9px;
  }
  .portal-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.25),transparent);opacity:0;transition:opacity 0.3s}
  .portal-btn:hover::before{opacity:1}
  .portal-btn:hover{transform:translateY(-3px);box-shadow:0 18px 44px rgba(0,194,122,0.58)}
  .portal-btn span{position:relative;z-index:1}
  .portal-forgot{text-align:center;margin-top:1.1rem;font-size:0.82rem;color:var(--g500);position:relative;z-index:1}
  .portal-forgot a{color:var(--emerald);font-weight:600;text-decoration:none}
  .portal-forgot a:hover{text-decoration:underline}
  .portal-divider{display:flex;align-items:center;gap:1rem;margin:1.4rem 0;position:relative;z-index:1}
  .portal-divider::before,.portal-divider::after{content:'';flex:1;height:1px;background:var(--g200)}
  .portal-divider span{font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--g400);text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap}
  .portal-register{
    width:100%;padding:0.9rem;background:transparent;color:var(--ink);
    border:1.5px solid var(--g200);border-radius:14px;font-weight:600;font-size:0.9rem;
    transition:all 0.27s;position:relative;z-index:1;
  }
  .portal-register:hover{border-color:var(--emerald);color:var(--emerald);background:var(--emerald3)}

  .social-bar{
    background:linear-gradient(90deg,#080B14,#0D1224,#080B14);
    padding:1.2rem 3rem;border-top:1px solid rgba(0,194,122,0.1);
  }
  .social-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
  .social-title{font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.18em}
  .social-links{display:flex;gap:0.6rem}
  .soc-btn{
    width:42px;height:42px;border-radius:12px;display:flex;align-items:center;
    justify-content:center;font-size:0.86rem;text-decoration:none;
    transition:all 0.32s var(--ease-spring);border:1px solid rgba(255,255,255,0.08);
    color:rgba(255,255,255,0.45);background:rgba(255,255,255,0.04);font-weight:600;
  }
  .soc-btn:hover{transform:translateY(-6px) scale(1.1);box-shadow:0 14px 32px rgba(0,0,0,0.4)}
  .soc-fb:hover{background:#1877F2;border-color:#1877F2;color:white}
  .soc-tw:hover{background:#000;border-color:#333;color:white}
  .soc-ig:hover{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);border-color:transparent;color:white}
  .soc-yt:hover{background:#FF0000;border-color:#FF0000;color:white}
  .soc-li:hover{background:#0A66C2;border-color:#0A66C2;color:white}
  .soc-wa:hover{background:#25D366;border-color:#25D366;color:white}

  .footer{background:linear-gradient(160deg,#060210,#080B14,#060A1E);color:rgba(255,255,255,0.38)}
  .footer-top{padding:5rem 3rem 3rem}
  .footer-grid{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem}
  .footer-brand-p{font-size:0.86rem;line-height:1.9;margin-top:1rem;max-width:285px;color:rgba(255,255,255,0.3)}
  .footer-col-h{font-family:'JetBrains Mono',monospace;font-size:0.61rem;text-transform:uppercase;letter-spacing:0.2em;color:var(--emerald2);font-weight:500;margin-bottom:1.4rem}
  .footer-lnk{display:block;font-size:0.86rem;color:rgba(255,255,255,0.32);margin-bottom:0.65rem;transition:all 0.25s;text-decoration:none}
  .footer-lnk:hover{color:var(--emerald2);padding-left:9px}
  .footer-bottom-wrap{padding:0 3rem}
  .footer-bottom{
    max-width:1280px;margin:0 auto;border-top:1px solid rgba(255,255,255,0.05);
    padding:1.7rem 0;display:flex;justify-content:space-between;align-items:center;
    font-size:0.78rem;flex-wrap:wrap;gap:1rem;
  }
  .accred-row{display:flex;align-items:center;gap:1.6rem}
  .accred-pill{display:flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:0.61rem;color:rgba(255,255,255,0.24);text-transform:uppercase;letter-spacing:0.1em}
  .accred-dot{width:5px;height:5px;background:var(--emerald);border-radius:50%;animation:pulse 2.5s ease-in-out infinite}

  .page-enter{animation:fadeUp 0.48s var(--ease-spring)}

  .sec-white{background:white}
  .sec-pearl{background:var(--pearl)}
  .sec-dark{background:linear-gradient(145deg,#06020F 0%,#080B14 50%,#030920 100%)}
  .sec-emerald{background:linear-gradient(145deg,#ECFDF5,#F0FDF9,#F8FFF7)}

  /* ── RESPONSIVE ── */
  @media(max-width:768px){
    .nav-center{display:none} .nav-book{display:none}
    .hamburger{display:flex}
    .hero{overflow-x:hidden;width:100%;max-width:100vw;}
    .hero-content{grid-template-columns:1fr;padding:3rem 1.5rem;width:100%;max-width:100%;}
    .hero-card-wrap{display:none}
    .section{padding:4rem 1.5rem}
    .trust-bar{padding:1.2rem 1.5rem} .trust-div{display:none}
    .pkg-grid{grid-template-columns:1fr}
    .det-hero{grid-template-columns:1fr} .det-cols{grid-template-columns:1fr}
    .contact-grid{grid-template-columns:1fr}
    .footer-grid{grid-template-columns:1fr 1fr}
    .why-grid{grid-template-columns:1fr 1fr}
    .social-bar{padding:1.2rem 1.5rem} .navbar{padding:0 1.5rem}
    .srv-grid{grid-template-columns:1fr}
    .dept-doc-panel{padding:1.6rem}
    .portal-modal{padding:2rem}
    .form-row{grid-template-columns:1fr}
    .hero-stats{gap:1.5rem}
    .hero-h1{font-size:clamp(2.8rem,10vw,4rem)}
    .hero-btns{flex-direction:column}
    .btn-hp,.btn-ho{width:100%;justify-content:center}
    .ins-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(min-width:769px){
    .hamburger{display:none !important} .mob-menu{display:none !important}
  }
`;

/* ─── DATA ─── */
const departments = [
  {id:"cardiology",   icon:"🫀",name:"Cardiology",       count:"2 Doctors", color:"#FFF0F0"},
  {id:"orthopedics",  icon:"🦴",name:"Orthopedics",      count:"2 Doctors", color:"#EFF8FF"},
  {id:"neurology",    icon:"🧠",name:"Neurology",        count:"2 Doctors", color:"#F3F0FF"},
  {id:"pulmonology",  icon:"🫁",name:"Pulmonology",      count:"2 Doctors", color:"#F0FFF8"},
  {id:"ophthalmology",icon:"👁️",name:"Ophthalmology",   count:"2 Doctors", color:"#FEFCE8"},
  {id:"dental",       icon:"🦷",name:"Dental",           count:"2 Doctors", color:"#FFF0FB"},
  {id:"oncology",     icon:"🧬",name:"Oncology",         count:"2 Doctors", color:"#F0FFFD"},
  {id:"general",      icon:"🩺",name:"General Medicine", count:"2 Doctors", color:"#F5F7FF"},
  {id:"dermatology",  icon:"💊",name:"Dermatology",      count:"2 Doctors", color:"#FFFBF0"},
  {id:"pediatrics",   icon:"🍼",name:"Pediatrics",       count:"2 Doctors", color:"#F0F8FF"},
  {id:"gynecology",   icon:"🤰",name:"Gynecology",       count:"2 Doctors", color:"#FFF0F8"},
  {id:"pathology",    icon:"🔬",name:"Pathology",        count:"2 Doctors", color:"#F0FFF4"},
];

const doctors = [
  {id:1, dept:"cardiology", avail:true,  rating:4.9, reviews:248, name:"Dr. Arjun Mehta",      specialty:"Cardiologist",            exp:"18 Years",
   img:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
   bio:"Renowned interventional cardiologist with expertise in complex coronary procedures and cardiac imaging. Trained at Cleveland Clinic, USA.",
   quals:[{icon:"🎓",degree:"MBBS, MD Cardiology",inst:"AIIMS New Delhi, 2006"},{icon:"🏆",degree:"Fellowship — Interventional Cardiology",inst:"Cleveland Clinic, USA"}],
   hours:[{day:"Mon, Wed, Fri",time:"9:00 AM – 1:00 PM"},{day:"Tuesday",time:"2:00 PM – 6:00 PM"},{day:"Saturday",time:"10:00 AM – 12:00 PM"}]},
  {id:2, dept:"cardiology", avail:true,  rating:4.8, reviews:176, name:"Dr. Latha Krishnan",   specialty:"Cardiac Electrophysiologist",exp:"14 Years",
   img:"https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80",
   bio:"Specialist in heart rhythm disorders, pacemaker implantation, and catheter ablation. Trained at Medtronic Institute, Singapore.",
   quals:[{icon:"🎓",degree:"MBBS, DM Cardiology",inst:"JIPMER Puducherry, 2010"},{icon:"🏆",degree:"Fellowship — Electrophysiology",inst:"Medtronic Institute, Singapore"}],
   hours:[{day:"Mon – Thu",time:"10:00 AM – 2:00 PM"},{day:"Friday",time:"3:00 PM – 6:00 PM"}]},
  {id:3, dept:"orthopedics", avail:false, rating:4.7, reviews:176, name:"Dr. Rohan Shetty",    specialty:"Orthopedic Surgeon",       exp:"15 Years",
   img:"https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80",
   bio:"Expert in joint replacement and sports medicine with over 3,000 successful surgeries.",
   quals:[{icon:"🎓",degree:"MBBS, MS Orthopaedics",inst:"KMC Manipal, 2009"},{icon:"🏆",degree:"Fellowship — Joint Replacement",inst:"Hospital for Special Surgery, NY"}],
   hours:[{day:"Tue, Thu, Sat",time:"9:00 AM – 1:00 PM"},{day:"Wednesday",time:"4:00 PM – 7:00 PM"}]},
  {id:4, dept:"orthopedics", avail:true,  rating:4.6, reviews:142, name:"Dr. Deepak Nair",     specialty:"Spine Surgeon",            exp:"12 Years",
   img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
   bio:"Minimally invasive spine surgery specialist with expertise in disc replacement and scoliosis correction.",
   quals:[{icon:"🎓",degree:"MBBS, MS Ortho",inst:"Kasturba Medical College, 2012"},{icon:"🏆",degree:"Fellowship — Spine Surgery",inst:"Seoul National University, Korea"}],
   hours:[{day:"Mon, Wed, Fri",time:"2:00 PM – 6:00 PM"}]},
  {id:5, dept:"neurology", avail:true,  rating:4.8, reviews:193, name:"Dr. Priya Nair",       specialty:"Neurologist",              exp:"12 Years",
   img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
   bio:"Specialises in stroke management, epilepsy, and movement disorders. Leads our Stroke Unit.",
   quals:[{icon:"🎓",degree:"MBBS, MD Neurology",inst:"JIPMER Puducherry, 2012"},{icon:"🏆",degree:"Fellowship — Stroke Medicine",inst:"UCL Hospitals, London"}],
   hours:[{day:"Mon – Thu",time:"10:00 AM – 2:00 PM"},{day:"Friday",time:"3:00 PM – 6:00 PM"}]},
  {id:6, dept:"neurology", avail:false, rating:4.7, reviews:128, name:"Dr. Suresh Iyer",      specialty:"Neurosurgeon",             exp:"16 Years",
   img:"https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80",
   bio:"Expert in brain tumour removal, deep brain stimulation, and vascular neurosurgery.",
   quals:[{icon:"🎓",degree:"MBBS, MCh Neurosurgery",inst:"PGIMER Chandigarh, 2008"},{icon:"🏆",degree:"Fellowship — Stereotactic Neurosurgery",inst:"Toronto Western Hospital"}],
   hours:[{day:"Mon, Tue, Thu",time:"9:00 AM – 12:00 PM"},{day:"Saturday",time:"9:00 AM – 11:00 AM"}]},
  {id:7, dept:"pulmonology", avail:true,  rating:4.6, reviews:142, name:"Dr. Vikram Bose",    specialty:"Pulmonologist",            exp:"11 Years",
   img:"https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg",
   bio:"Specialises in asthma, COPD, sleep disorders, and interventional bronchoscopy.",
   quals:[{icon:"🎓",degree:"MBBS, MD Respiratory Medicine",inst:"Grant Medical College, 2013"}],
   hours:[{day:"Mon, Wed, Fri",time:"2:00 PM – 6:00 PM"}]},
  {id:8, dept:"pulmonology", avail:true,  rating:4.5, reviews:98,  name:"Dr. Kavitha Prasad", specialty:"Sleep Medicine Specialist", exp:"8 Years",
   img:"https://static.vecteezy.com/system/resources/previews/028/287/555/non_2x/an-indian-young-female-doctor-isolated-on-green-ai-generated-photo.jpg",
   bio:"Expert in sleep-disordered breathing, OSA, and non-invasive ventilation therapies.",
   quals:[{icon:"🎓",degree:"MBBS, MD Pulmonary Medicine",inst:"BMC Bangalore, 2016"},{icon:"🏆",degree:"Fellowship — Sleep Medicine",inst:"Stanford Sleep Center, USA"}],
   hours:[{day:"Tue, Thu, Sat",time:"10:00 AM – 2:00 PM"}]},
  {id:9, dept:"ophthalmology", avail:true,  rating:4.9, reviews:310, name:"Dr. Meera Subbiah", specialty:"Ophthalmologist",         exp:"13 Years",
   img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
   bio:"Expert in phacoemulsification cataract surgery, LASIK, and medical retina management.",
   quals:[{icon:"🎓",degree:"MBBS, MS Ophthalmology",inst:"Sankara Nethralaya Chennai, 2011"},{icon:"🏆",degree:"Fellowship — Vitreoretina",inst:"Narayana Nethralaya, Bangalore"}],
   hours:[{day:"Mon – Fri",time:"9:00 AM – 1:00 PM"},{day:"Saturday",time:"9:00 AM – 12:00 PM"}]},
  {id:10,dept:"ophthalmology", avail:false, rating:4.7, reviews:188, name:"Dr. Prasad Gowda",  specialty:"Cornea & Refractive Surgeon",exp:"10 Years",
   img:"https://static.vecteezy.com/system/resources/previews/026/375/249/non_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
   bio:"Specialises in corneal transplants, keratoconus management, and refractive surgeries.",
   quals:[{icon:"🎓",degree:"MBBS, MS Ophthalmology",inst:"JNMC Belgaum, 2014"},{icon:"🏆",degree:"Fellowship — Cornea",inst:"L V Prasad Eye Institute, Hyderabad"}],
   hours:[{day:"Tue, Thu",time:"2:00 PM – 6:00 PM"},{day:"Saturday",time:"10:00 AM – 1:00 PM"}]},
  {id:11,dept:"dental", avail:true,  rating:4.8, reviews:256, name:"Dr. Namitha Bhat",     specialty:"Prosthodontist",            exp:"10 Years",
   img:"https://tse4.mm.bing.net/th/id/OIP.MrMryL0JruFt5WKHEcMxtwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
   bio:"Expert in dental implants, full-mouth rehabilitation, and smile designing with digital workflows.",
   quals:[{icon:"🎓",degree:"BDS, MDS Prosthodontics",inst:"Rajiv Gandhi University, 2014"}],
   hours:[{day:"Mon – Sat",time:"10:00 AM – 6:00 PM"}]},
  {id:12,dept:"dental", avail:true,  rating:4.6, reviews:172, name:"Dr. Kiran Rao",        specialty:"Orthodontist",              exp:"8 Years",
   img:"https://www.bing.com/th/id/OIP.J3a1PInS_7BJiZEp95MPMQHaHa?w=193&h=193&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
   bio:"Specialist in Invisalign, braces, and corrective jaw surgery with 3D imaging technology.",
   quals:[{icon:"🎓",degree:"BDS, MDS Orthodontics",inst:"KLE University, 2016"},{icon:"🏆",degree:"Invisalign Certified Provider",inst:"Align Technology"}],
   hours:[{day:"Mon, Wed, Fri",time:"11:00 AM – 5:00 PM"},{day:"Saturday",time:"10:00 AM – 2:00 PM"}]},
  {id:13,dept:"oncology", avail:true,  rating:4.9, reviews:204, name:"Dr. Shyam Venkat",    specialty:"Medical Oncologist",        exp:"17 Years",
   img:"https://www.bing.com/th/id/OIP.LtsBc52QoIPoNGLaFX3W4QHaM9?w=193&h=330&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
   bio:"Specialist in solid tumour chemotherapy, immunotherapy, and precision oncology based on genomic profiling.",
   quals:[{icon:"🎓",degree:"MBBS, MD, DM Medical Oncology",inst:"Tata Memorial, Mumbai, 2007"},{icon:"🏆",degree:"Research Fellowship",inst:"MD Anderson Cancer Center, USA"}],
   hours:[{day:"Mon – Wed",time:"9:00 AM – 1:00 PM"},{day:"Thursday",time:"2:00 PM – 6:00 PM"}]},
  {id:14,dept:"oncology", avail:false, rating:4.8, reviews:168, name:"Dr. Geetha Anand",    specialty:"Radiation Oncologist",      exp:"14 Years",
   img:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80",
   bio:"Expert in stereotactic radiosurgery, VMAT, and brachytherapy for head-neck and gynaecological cancers.",
   quals:[{icon:"🎓",degree:"MBBS, MD Radiation Oncology",inst:"AIIMS Delhi, 2010"},{icon:"🏆",degree:"Fellowship — Stereotactic Radiosurgery",inst:"Mayo Clinic, USA"}],
   hours:[{day:"Tue, Thu, Sat",time:"10:00 AM – 2:00 PM"}]},
  {id:15,dept:"general", avail:true,  rating:4.7, reviews:380, name:"Dr. Ravi Chandra",    specialty:"General Physician",         exp:"20 Years",
   img:"https://tse2.mm.bing.net/th/id/OIP.YqLbD9qVh6MiK3RyLeCAxwHaEl?rs=1&pid=ImgDetMain&o=7&rm=3",
   bio:"Experienced general physician specialising in diabetes, hypertension, and preventive medicine.",
   quals:[{icon:"🎓",degree:"MBBS, MD General Medicine",inst:"Mysore Medical College, 2004"}],
   hours:[{day:"Mon – Sat",time:"8:00 AM – 12:00 PM"},{day:"Mon – Sat",time:"4:00 PM – 7:00 PM"}]},
  {id:16,dept:"general", avail:true,  rating:4.6, reviews:292, name:"Dr. Uma Shankar",     specialty:"Internal Medicine Specialist",exp:"15 Years",
   img:"https://i.pinimg.com/originals/1b/52/fd/1b52fd81c2282b432b85dc6a8a01f13d.jpg",
   bio:"Specialist in complex multi-system disorders, critical care, and infectious diseases.",
   quals:[{icon:"🎓",degree:"MBBS, MD Internal Medicine",inst:"St. John's Medical College, 2009"},{icon:"🏆",degree:"Fellow — American College of Physicians",inst:"ACP, USA"}],
   hours:[{day:"Mon – Fri",time:"10:00 AM – 2:00 PM"},{day:"Saturday",time:"10:00 AM – 12:00 PM"}]},
  {id:17,dept:"dermatology", avail:true,  rating:4.9, reviews:302, name:"Dr. Sneha Kapoor",  specialty:"Dermatologist",            exp:"9 Years",
   img:"https://tse1.mm.bing.net/th/id/OIP.t-7j-qdBDybVK3hu_2YpLQHaLH?w=1333&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3",
   bio:"Cosmetic and clinical dermatologist specialising in skin disorders, laser therapy, and aesthetic procedures.",
   quals:[{icon:"🎓",degree:"MBBS, MD Dermatology",inst:"MAMC New Delhi, 2015"}],
   hours:[{day:"Mon – Sat",time:"11:00 AM – 3:00 PM"}]},
  {id:18,dept:"dermatology", avail:true,  rating:4.7, reviews:218, name:"Dr. Pallavi Hegde", specialty:"Trichologist",              exp:"7 Years",
   img:"https://thumbs.dreamstime.com/b/portrait-beautiful-female-doctor-28992949.jpg",
   bio:"Expert in hair loss, scalp disorders, PRP therapy, and hair transplant evaluation.",
   quals:[{icon:"🎓",degree:"MBBS, MD Dermatology",inst:"KMC Manipal, 2017"},{icon:"🏆",degree:"Advanced Certificate — Trichology",inst:"IADVL Fellowship"}],
   hours:[{day:"Mon, Wed, Fri",time:"10:00 AM – 3:00 PM"},{day:"Saturday",time:"10:00 AM – 1:00 PM"}]},
  {id:19,dept:"pediatrics", avail:false, rating:4.8, reviews:415, name:"Dr. Ananya Rao",     specialty:"Pediatrician",             exp:"14 Years",
   img:"https://tse2.mm.bing.net/th/id/OIP.lcqX70iqkSZrE-H4Pqo_lAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
   bio:"Child health specialist focused on developmental pediatrics, neonatology, and childhood immunology.",
   quals:[{icon:"🎓",degree:"MBBS, MD Pediatrics",inst:"Maulana Azad Medical College, 2010"},{icon:"🏆",degree:"Fellowship — Neonatology",inst:"Apollo Hospitals, Chennai"}],
   hours:[{day:"Mon – Fri",time:"9:00 AM – 12:00 PM"},{day:"Saturday",time:"9:00 AM – 11:00 AM"}]},
  {id:20,dept:"pediatrics", avail:true,  rating:4.7, reviews:267, name:"Dr. Harish Balasubramaniam",specialty:"Paediatric Intensivist",exp:"11 Years",
   img:"https://tse3.mm.bing.net/th/id/OIP.ev2HqBpSyFhxwQDI4gAovwHaDx?rs=1&pid=ImgDetMain&o=7&rm=3",
   bio:"Expert in paediatric critical care, PICU management, and complex neonatal procedures.",
   quals:[{icon:"🎓",degree:"MBBS, MD Paediatrics",inst:"JJMMC Davangere, 2013"},{icon:"🏆",degree:"Fellowship — Paediatric Intensive Care",inst:"Great Ormond Street, London"}],
   hours:[{day:"Mon – Thu",time:"10:00 AM – 2:00 PM"},{day:"Friday",time:"2:00 PM – 5:00 PM"}]},
  {id:21,dept:"gynecology", avail:true,  rating:4.9, reviews:360, name:"Dr. Rekha Menon",    specialty:"Gynaecologist & Obstetrician",exp:"16 Years",
   img:"https://purepng.com/public/uploads/large/purepng.com-doctordoctorsdoctors-and-nursesclinicianmedical-practitionernotepadfemale-142152685722142y8x.png",
   bio:"Specialist in high-risk obstetrics, laparoscopic gynaecological surgery, and reproductive medicine.",
   quals:[{icon:"🎓",degree:"MBBS, MS Obstetrics & Gynaecology",inst:"Amrita Institute, Kochi, 2008"},{icon:"🏆",degree:"Fellowship — Reproductive Endocrinology",inst:"AIIMS Delhi"}],
   hours:[{day:"Mon – Fri",time:"9:00 AM – 1:00 PM"},{day:"Saturday",time:"9:00 AM – 12:00 PM"}]},
  {id:22,dept:"gynecology", avail:true,  rating:4.7, reviews:248, name:"Dr. Smitha Kulkarni", specialty:"Fertility Specialist",      exp:"12 Years",
   img:"https://tse1.mm.bing.net/th/id/OIP.Widn1ZG3w0SKvKnVgq46EgHaJ2?w=602&h=801&rs=1&pid=ImgDetMain&o=7&rm=3",
   bio:"Expert in IVF, IUI, ovarian stimulation, and fertility preservation with over 1,000 successful IVF cycles.",
   quals:[{icon:"🎓",degree:"MBBS, MD OBG",inst:"SDM Medical College, 2012"},{icon:"🏆",degree:"Fellowship — Reproductive Medicine",inst:"Rotunda IVF, Mumbai"}],
   hours:[{day:"Mon, Wed, Fri",time:"11:00 AM – 3:00 PM"},{day:"Saturday",time:"10:00 AM – 1:00 PM"}]},
  {id:23,dept:"pathology", avail:true,  rating:4.6, reviews:88,  name:"Dr. Ashwin Kumar",   specialty:"Pathologist",               exp:"13 Years",
   img:"https://wallpapercave.com/wp/wp2655110.jpg",
   bio:"Specialist in histopathology, immunohistochemistry, and molecular diagnostic techniques.",
   quals:[{icon:"🎓",degree:"MBBS, MD Pathology",inst:"Bangalore Medical College, 2011"}],
   hours:[{day:"Mon – Fri",time:"9:00 AM – 5:00 PM"},{day:"Saturday",time:"9:00 AM – 1:00 PM"}]},
  {id:24,dept:"pathology", avail:true,  rating:4.5, reviews:62,  name:"Dr. Vidya Suresh",   specialty:"Clinical Biochemist",       exp:"9 Years",
   img:"https://tse1.mm.bing.net/th/id/OIP.RCxniKuBArviSSn8geeg8QHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
   bio:"Expert in clinical biochemistry, hormone analysis, and point-of-care testing systems.",
   quals:[{icon:"🎓",degree:"MBBS, MD Biochemistry",inst:"Mysore Medical College, 2015"}],
   hours:[{day:"Mon – Sat",time:"9:00 AM – 4:00 PM"}]},
];

const packages = [
  {name:"Basic Wellness",    icon:"🌿",desc:"Essential health screening for everyday well-being and peace of mind.", price:"1,499",
   features:["Complete Blood Count","Blood Sugar (Fasting)","Urine Routine","BMI Assessment","Doctor Consultation"],featured:false},
  {name:"Comprehensive Care",icon:"⭐",desc:"Our most popular package — 50+ parameters covering all vital systems.", price:"3,999",
   features:["Everything in Basic","Lipid Profile","Thyroid Panel (T3,T4,TSH)","Liver & Kidney Function","Chest X-Ray + ECG","Dietitian Consultation"],featured:true},
  {name:"Executive Health",  icon:"💎",desc:"Full-body premium check-up for executives and senior citizens.", price:"7,499",
   features:["Everything in Comprehensive","Cardiac Stress Test","Lung Function Test","Whole Abdomen Ultrasound","Tumour Markers (3)","Dental & Eye Screening"],featured:false},
];

const services = [
  {name:"Emergency Care",    icon:"🚑", accent:"#E11D48", bg:"#FFF1F2",
   desc:"Round-the-clock critical care with dedicated trauma specialists and a fully equipped emergency unit.",
   features:["24/7 Trauma bay","Advanced life support","ICU step-down care","Rapid triage protocol"]},
  {name:"Health Packages",   icon:"🧪", accent:"#00C27A", bg:"#ECFDF5",
   desc:"Comprehensive preventive health screening packages designed for every life stage and budget.",
   features:["50+ diagnostic parameters","Home sample collection","Digital reports","Dietitian counselling"]},
  {name:"Diagnostics",       icon:"🔬", accent:"#9333EA", bg:"#FAF5FF",
   desc:"State-of-the-art diagnostic laboratory and imaging centre with same-day reporting.",
   features:["3T MRI & CT Scan","Digital X-Ray & Mammography","Fully automated lab","NABL accredited"]},
  {name:"Home Collection",   icon:"🏠", accent:"#2563EB", bg:"#EFF6FF",
   desc:"Free home sample collection within 15 km — convenient, safe, and on time.",
   features:["Free within 15 km","Trained phlebotomists","6:00 AM – 9:00 AM","Same-day reports"]},
  {name:"Telemedicine",      icon:"💻", accent:"#059669", bg:"#ECFDF5",
   desc:"Consult our specialists from the comfort of your home via secure video consultation.",
   features:["Video & audio consults","e-Prescriptions","Follow-up reminders","All specialties available"]},
  {name:"Patient Portal",    icon:"📱", accent:"#F59E0B", bg:"#FFFBEB",
   desc:"Access your health records, reports, and prescriptions anytime through our secure digital portal.",
   features:["Digital health records","Lab result tracking","Appointment history","Family account linking"]},
];

const faqs = [
  {q:"How do I book an appointment?",a:"You can book online via this website, call our helpline at +91-821-400-1234, or visit us directly. Online bookings are available 24/7 for your convenience."},
  {q:"What documents should I carry for my visit?",a:"Please carry a valid photo ID, insurance card if applicable, previous medical records, prescriptions, and any recent lab or imaging reports."},
  {q:"What are the clinic's working hours?",a:"The clinic is open Monday to Saturday, 8:00 AM – 8:00 PM. Emergency services are available 24/7. Sundays: emergencies only."},
  {q:"Do you offer home sample collection?",a:"Yes — free home sample collection for all health packages within 15 km. Samples collected 6:00 AM – 9:00 AM. Book by 10 PM for next-day collection."},
  {q:"How long do test results take?",a:"Routine blood reports are ready within 6–8 hours. Specialised tests may take 24–48 hours. Reports are shared digitally via email and our patient portal."},
  {q:"Is cashless treatment available?",a:"We are empanelled with 30+ insurers for cashless hospitalisation. Please verify eligibility at our insurance desk before your visit."},
];

const insurers = [
  {name:"Star Health",logo:"⭐"},{name:"ICICI Lombard",logo:"🏦"},
  {name:"Niva Bupa",logo:"🩺"},{name:"HDFC ERGO",logo:"🏛️"},
  {name:"New India",logo:"🇮🇳"},{name:"United India",logo:"🤝"},
  {name:"Bajaj Allianz",logo:"🛡️"},{name:"Care Health",logo:"💚"},
];

const socialLinks = [
  {cls:"soc-fb",icon:"f",  label:"Facebook",  href:"https://facebook.com"},
  {cls:"soc-tw",icon:"𝕏",  label:"Twitter/X", href:"https://x.com"},
  {cls:"soc-ig",icon:"📷", label:"Instagram",  href:"https://instagram.com"},
  {cls:"soc-yt",icon:"▶",  label:"YouTube",    href:"https://youtube.com"},
  {cls:"soc-li",icon:"in", label:"LinkedIn",   href:"https://linkedin.com"},
  {cls:"soc-wa",icon:"✆",  label:"WhatsApp",   href:"https://wa.me/918214001234"},
];

const navPages = ["Home","Departments","Doctors","Packages","Patient Info","Contact"];

/* ─── PORTAL MODAL ─── */
function PatientPortalModal({onClose}){
  const [email,setEmail] = useState("");
  const [pass,setPass]   = useState("");
  return(
    <div className="portal-overlay" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="portal-modal">
        <button className="portal-close-btn" onClick={onClose}>✕</button>
        <div className="portal-logo">🏥</div>
        <div className="portal-title">Patient Portal</div>
        <div className="portal-sub">Access your health records, prescriptions, and appointment history securely.</div>
        <div className="portal-field">
          <label className="portal-lbl">Email / Patient ID</label>
          <input className="portal-inp" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div className="portal-field">
          <label className="portal-lbl">Password</label>
          <input className="portal-inp" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)}/>
        </div>
        <button className="portal-btn"><span>🔒 Sign In to Portal</span></button>
        <div className="portal-forgot">
          <a>Forgot password?</a> &nbsp;·&nbsp; <a>Need help?</a>
        </div>
        <div className="portal-divider"><span>New to MediCare Plus?</span></div>
        <button className="portal-register">Create Patient Account →</button>
      </div>
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage]         = useState("Home");
  const [selDoc, setSelDoc]     = useState(null);
  const [scrolled, setScroll]   = useState(false);
  const [menuOpen, setMenu]     = useState(false);
  const [form, setForm]         = useState({name:"",phone:"",dept:"",date:"",msg:""});
  const [showPortal, setPortal] = useState(false);

  useEffect(()=>{
    const fn=()=>setScroll(window.scrollY>10);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  useEffect(()=>{ window.scrollTo(0,0); },[page,selDoc]);

  const go = p => { setPage(p); setSelDoc(null); setMenu(false); };
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  return (
    <>
      <style>{styles}</style>

      {showPortal && <PatientPortalModal onClose={()=>setPortal(false)}/>}

      {/* NAVBAR */}
      <nav className={`navbar${scrolled?" scrolled":""}`}>
        <div className="nav-logo" onClick={()=>go("Home")}>
          <div className="nav-logo-mark">🏥</div>
          <div>
            <div className="nav-logo-text">MediCare Plus</div>
            <div className="nav-logo-sub">Advanced Healthcare · Mysuru</div>
          </div>
        </div>
        <div className="nav-center">
          {navPages.map((p,i)=>(
            <button key={p} className={`nav-link${page===p?" active":""}`}
              style={{animationDelay:`${0.05+i*0.07}s`}}
              onClick={()=>go(p)}>{p}</button>
          ))}
        </div>
        <div className="nav-right">
          <button className="nav-book" onClick={()=>go("Contact")}><span>Book Appointment</span></button>
        </div>
        <button className="hamburger" onClick={()=>setMenu(o=>!o)}>
          <span style={{transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none"}}/>
          <span style={{opacity:menuOpen?0:1}}/>
          <span style={{transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none"}}/>
        </button>
      </nav>

      <div className={`mob-menu${menuOpen?" open":""}`}>
        {navPages.map(p=><button key={p} className="mob-link" onClick={()=>go(p)}>{p}</button>)}
        <button className="mob-cta" onClick={()=>go("Contact")}>📅 Book Appointment</button>
      </div>

      {/* PAGES */}
      <div className="page-enter">
        {page==="Home"        && <HomePage navigate={go}/>}
        {page==="Departments" && <DepartmentsPage navigate={go}/>}
        {page==="Doctors"     && !selDoc && <DoctorsPage doctors={doctors} onSelect={setSelDoc}/>}
        {page==="Doctors"     && selDoc  && <DoctorDetailPage doc={selDoc} onBack={()=>setSelDoc(null)} navigate={go}/>}
        {page==="Packages"    && <PackagesPage navigate={go}/>}
        {page==="Patient Info"&& <PatientInfoPage onPortalOpen={()=>setPortal(true)}/>}
        {page==="Contact"     && <ContactPage form={form} upd={upd}/>}
        {page==="Services"    && <ServicesPage navigate={go}/>}
      </div>

      {/* SOCIAL BAR */}
      <div className="social-bar">
        <div className="social-inner">
          <span className="social-title">Follow &amp; Connect</span>
          <div className="social-links">
            {socialLinks.map(s=>(
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                 className={`soc-btn ${s.cls}`} title={s.label}>{s.icon}</a>
            ))}
          </div>
          <span className="social-title">© 2025 MediCare Plus · All Rights Reserved</span>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-grid">
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                <div className="nav-logo-mark">🏥</div>
                <div>
                  <div className="nav-logo-text" style={{color:"white",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem"}}>MediCare Plus</div>
                  <div className="nav-logo-sub">Advanced Healthcare · Mysuru</div>
                </div>
              </div>
              <p className="footer-brand-p">Delivering compassionate, world-class multispecialty healthcare with cutting-edge technology since 1998.</p>
              <div className="social-links" style={{marginTop:"1.6rem"}}>
                {socialLinks.map(s=>(
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                     className={`soc-btn ${s.cls}`} title={s.label} style={{width:"36px",height:"36px",fontSize:"0.78rem"}}>{s.icon}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-col-h">Quick Links</div>
              {navPages.map(p=><span key={p} className="footer-lnk" onClick={()=>go(p)}>{p}</span>)}
            </div>
            <div>
              <div className="footer-col-h">Services</div>
              {services.map(s=>(
                <span key={s.name} className="footer-lnk" onClick={()=>go("Services")}>{s.name}</span>
              ))}
            </div>
            <div>
              <div className="footer-col-h">Contact</div>
              <span className="footer-lnk">📍 15, Rajkumar Road, Mysuru 570001</span>
              <span className="footer-lnk">📞 +91-821-400-1234</span>
              <span className="footer-lnk">🚨 Emergency: 1800-100-911</span>
              <span className="footer-lnk">✉️ care@medicareplus.in</span>
              <span className="footer-lnk">🕐 Mon–Sat: 8 AM – 8 PM</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom-wrap">
          <div className="footer-bottom">
            <span>Privacy Policy · Terms of Service · Sitemap · Disclaimer</span>
            <div className="accred-row">
              <div className="accred-pill"><div className="accred-dot"/>NABH Accredited</div>
              <div className="accred-pill"><div className="accred-dot"/>ISO 9001:2015</div>
              <div className="accred-pill"><div className="accred-dot"/>JCI Standards</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─── HOME ─── */
function HomePage({navigate}){
  return(
    <>
      <section className="hero">
        <div className="hero-bg"/>
        <div className="hero-mesh"/>
        <div className="hero-grid"/>
        <div className="hero-orb hero-orb-1"/>
        <div className="hero-orb hero-orb-2"/>
        <div className="hero-orb hero-orb-3"/>
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow anim-fadeup">
              <div className="hero-dot"/>
              <span>Now Accepting New Patients · NABH Accredited</span>
            </div>
            <h1 className="hero-h1 anim-fadeup d1">Your Health,<br/>Our <em>Highest</em><br/>Priority</h1>
            <p className="hero-p anim-fadeup d2">World-class multispecialty care — combining the warmth of personalised medicine with the precision of advanced technology, right here in Mysuru.</p>
            <div className="hero-btns anim-fadeup d3">
              <button className="btn-hp" onClick={()=>navigate("Contact")}><span>📅 Book Appointment</span></button>
              <button className="btn-ho" onClick={()=>navigate("Departments")}>Explore Departments →</button>
            </div>
            <div className="hero-stats anim-fadeup d4">
              {[["25","+ Years of Care"],["120","+ Specialists"],["50K","+ Patients / Yr"],["98","% Satisfaction"]].map(([n,l])=>(
                <div key={l}>
                  <div className="hstat-n">{n}<span style={{fontSize:"1.6rem"}}>{l.charAt(0)}</span></div>
                  <div className="hstat-l">{l.slice(1)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-card-wrap anim-scalein d2">
            <div className="hero-img-card">
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80" alt="Medical team"/>
              <div className="hero-img-ov"/>
              <div className="hero-scan"/>
              <div className="hero-img-badge">
                <div className="hero-badge-icon">🏆</div>
                <div>
                  <div className="hero-badge-title">NABH Accredited Hospital</div>
                  <div className="hero-badge-sub">National Board Standards · Est. 1998</div>
                </div>
              </div>
            </div>
            <div className="hero-float">
              <div className="hero-float-lbl">Patient Rating</div>
              <div className="hero-float-val">4.9 ★</div>
              <div className="hero-float-sub">12,000+ reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-inner">
          {[["🏥","NABH Accredited"],["🔬","Advanced Diagnostics"],["🚑","24/7 Emergency"],["💻","Digital Records"],["🌐","Telemedicine"]].map(([ic,tx],i,arr)=>(
            <div key={tx} style={{display:"contents"}}>
              <div className="trust-item">{ic}&nbsp;{tx}</div>
              {i<arr.length-1&&<div className="trust-div"/>}
            </div>
          ))}
        </div>
      </div>

      {/* WHY US */}
      <section className="section sec-white">
        <div className="s-inner">
          <div className="s-hdr">
            <div>
              <div className="s-ey">Why Choose Us</div>
              <h2 className="s-title">Excellence in Every Aspect</h2>
            </div>
          </div>
          <div className="why-grid">
            {[
              {icon:"🏆",title:"NABH Accredited",       desc:"Nationally accredited for quality standards and patient safety across all departments.",
               accent:"linear-gradient(90deg,#00C27A,#00E896)",glow:"rgba(0,194,122,0.08)"},
              {icon:"🔬",title:"Advanced Diagnostics",    desc:"State-of-the-art lab and imaging with same-day reporting and digital delivery.",
               accent:"linear-gradient(90deg,#9333EA,#C084FC)",glow:"rgba(147,51,234,0.07)"},
              {icon:"🚑",title:"24/7 Emergency",          desc:"Round-the-clock emergency care with dedicated critical care specialists on site.",
               accent:"linear-gradient(90deg,#E11D48,#FB7185)",glow:"rgba(225,29,72,0.07)"},
              {icon:"💻",title:"Digital Health Records",   desc:"Fully digital health records, accessible securely from anywhere at any time.",
               accent:"linear-gradient(90deg,#2563EB,#60A5FA)",glow:"rgba(37,99,235,0.07)"},
            ].map((f,i)=>(
              <div key={f.title} className={`why-card anim-fadeup d${i+1}`}
                style={{"--card-accent":f.accent,"--card-glow":f.glow}}>
                <span className="why-icon">{f.icon}</span>
                <div className="why-title">{f.title}</div>
                <div className="why-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS PREVIEW */}
      <section className="section sec-emerald">
        <div className="s-inner">
          <div style={{textAlign:"center",marginBottom:"2.8rem"}}>
            <div className="s-ey">Specialities</div>
            <h2 className="s-title" style={{margin:"0 auto"}}>Our Departments</h2>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.8rem",justifyContent:"center"}}>
            {departments.slice(0,8).map((d,i)=>(
              <div key={d.name} className={`anim-fadeup d${Math.min(i+1,6)}`}
                style={{
                  display:"flex",alignItems:"center",gap:"10px",
                  padding:"0.68rem 1.4rem",background:d.color,
                  borderRadius:"100px",cursor:"pointer",fontSize:"0.87rem",fontWeight:600,
                  color:"var(--ink)",transition:"all 0.35s var(--ease-spring)",
                  boxShadow:"0 2px 14px rgba(0,0,0,0.07)",border:"1.5px solid rgba(0,194,122,0.1)",
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px) scale(1.05)";e.currentTarget.style.boxShadow="0 14px 32px rgba(0,194,122,0.22)";e.currentTarget.style.borderColor="rgba(0,194,122,0.3)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 14px rgba(0,0,0,0.07)";e.currentTarget.style.borderColor="rgba(0,194,122,0.1)"}}
                onClick={()=>navigate("Departments")}>
                <span style={{fontSize:"1.1rem"}}>{d.icon}</span>{d.name}
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <button className="btn-ghost" onClick={()=>navigate("Departments")}>View All 12 Departments →</button>
          </div>
        </div>
      </section>

      {/* DOCTORS PREVIEW */}
      <section className="section sec-white">
        <div className="s-inner">
          <div className="s-hdr">
            <div>
              <div className="s-ey">Our Specialists</div>
              <h2 className="s-title">Meet Our Doctors</h2>
              <p className="s-desc" style={{marginTop:"0.5rem"}}>Expert specialists dedicated to your health and well-being.</p>
            </div>
            <button className="btn-ghost" onClick={()=>navigate("Doctors")}>View All Doctors</button>
          </div>
          <div className="doc-grid">
            {doctors.slice(0,3).map((doc,i)=>(
              <div key={doc.id} className={`anim-fadeup d${i+1}`}>
                <DocCard doc={doc} onSelect={()=>navigate("Doctors")}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background:"linear-gradient(145deg,#06020F 0%,#080B14 50%,#030A22 100%)",
        padding:"6rem 3rem",position:"relative",overflow:"hidden",
      }}>
        <div style={{position:"absolute",top:"-100px",right:"-100px",width:"500px",height:"500px",background:"radial-gradient(circle,rgba(0,194,122,0.12) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-80px",left:"-80px",width:"380px",height:"380px",background:"radial-gradient(circle,rgba(147,51,234,0.10) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
        <div style={{maxWidth:"1280px",margin:"0 auto",textAlign:"center",position:"relative"}}>
          <div className="s-ey" style={{color:"var(--emerald2)"}}>Ready to Start?</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.6rem,4vw,4.2rem)",fontWeight:700,color:"white",margin:"0.5rem 0 1.2rem",letterSpacing:"-0.03em",lineHeight:1.05}}>
            Book Your Appointment <span style={{background:"linear-gradient(135deg,var(--emerald2),var(--amber2))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Today</span>
          </h2>
          <p style={{fontSize:"1rem",color:"rgba(255,255,255,0.42)",maxWidth:"500px",margin:"0 auto 2.5rem",lineHeight:1.9,fontWeight:300}}>Our care team confirms your appointment within 2 hours. Expert care, zero wait.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-hp" onClick={()=>navigate("Contact")}><span>📅 Book Appointment</span></button>
            <button className="btn-ho" onClick={()=>navigate("Packages")}>View Health Packages →</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── DEPARTMENTS ─── */
function DepartmentsPage({navigate}){
  const [activeDept, setActiveDept] = useState(null);
  const panelRef = useRef(null);
  const deptDoctors = activeDept ? doctors.filter(d=>d.dept===activeDept.id) : [];

  const handleDeptClick = dept => {
    if(activeDept && activeDept.id===dept.id){ setActiveDept(null); }
    else {
      setActiveDept(dept);
      setTimeout(()=>panelRef.current?.scrollIntoView({behavior:"smooth",block:"nearest"}),80);
    }
  };

  return(
    <section className="section" style={{paddingTop:"9rem"}}>
      <div className="s-inner">
        <div className="s-hdr">
          <div>
            <div className="s-ey">Specialities</div>
            <h2 className="s-title">Our Departments</h2>
            <p className="s-desc" style={{marginTop:"0.5rem"}}>Click any department to view its specialist doctors.</p>
          </div>
          <button className="btn-ghost" onClick={()=>navigate("Doctors")}>All Doctors</button>
        </div>
        <div className="dept-grid">
          {departments.map((d,i)=>(
            <div key={d.name} className={`dept-card anim-fadeup d${Math.min(i+1,6)}${activeDept&&activeDept.id===d.id?" active-dept":""}`}
              onClick={()=>handleDeptClick(d)}>
              <div className="dept-arr">{activeDept&&activeDept.id===d.id?"▼":"→"}</div>
              <div className="dept-icon" style={{background:d.color}}>{d.icon}</div>
              <div className="dept-name">{d.name}</div>
              <div className="dept-cnt">{d.count}</div>
            </div>
          ))}
        </div>
        {activeDept && (
          <div className="dept-doc-panel" ref={panelRef}>
            <div className="dept-doc-header">
              <div>
                <div className="s-ey">{activeDept.icon} {activeDept.name}</div>
                <div className="dept-doc-title">Our {activeDept.name} Specialists</div>
              </div>
              <button className="dept-close" onClick={()=>setActiveDept(null)}>✕</button>
            </div>
            <div className="doc-grid">
              {deptDoctors.map((doc,i)=>(
                <div key={doc.id} className={`anim-fadeup d${i+1}`}>
                  <DocCard doc={doc} onSelect={()=>navigate("Doctors")}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── DOC CARD ─── */
function DocCard({doc,onSelect}){
  return(
    <div className="doc-card" onClick={onSelect}>
      <div className="doc-img-wrap">
        <img src={doc.img} alt={doc.name} onError={e=>{e.target.style.display="none"}}/>
        <div className={`doc-avail ${doc.avail?"av-yes":"av-no"}`}>{doc.avail?"● Available":"● Busy"}</div>
        <div className="doc-hover-soc">
          <a className="doc-soc-btn" href="#" onClick={e=>e.stopPropagation()} title="LinkedIn">in</a>
          <a className="doc-soc-btn" href="#" onClick={e=>e.stopPropagation()} title="Email">✉</a>
        </div>
      </div>
      <div className="doc-body">
        <div className="doc-name">{doc.name}</div>
        <div className="doc-spec">{doc.specialty}</div>
        <div className="doc-exp">🏥 {doc.exp}</div>
        <div className="doc-rating-row">
          <div className="doc-stars">{"★".repeat(Math.floor(doc.rating))}</div>
          <span className="doc-rnum">{doc.rating} ({doc.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
}

/* ─── DOCTORS PAGE ─── */
function DoctorsPage({doctors,onSelect}){
  const [filter,setFilter] = useState("All");
  const deptNames = ["All",...departments.map(d=>d.name)];
  const deptIdMap = Object.fromEntries(departments.map(d=>[d.name,d.id]));
  const filtered = filter==="All" ? doctors : doctors.filter(d=>d.dept===deptIdMap[filter]);

  return(
    <section className="section" style={{paddingTop:"9rem"}}>
      <div className="s-inner">
        <div className="s-hdr">
          <div>
            <div className="s-ey">Our Team</div>
            <h2 className="s-title">Meet Our Doctors</h2>
            <p className="s-desc" style={{marginTop:"0.5rem"}}>24 expert specialists across 12 departments.</p>
          </div>
        </div>
        <div className="filter-bar">
          {deptNames.map(n=>(
            <button key={n} className={`filter-pill${filter===n?" active":""}`} onClick={()=>setFilter(n)}>{n}</button>
          ))}
        </div>
        <div className="doc-grid">
          {filtered.map((doc,i)=>(
            <div key={doc.id} className={`anim-fadeup d${Math.min(i%3+1,6)}`}>
              <DocCard doc={doc} onSelect={()=>onSelect(doc)}/>
            </div>
          ))}
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"3rem",color:"var(--g400)"}}>No doctors found.</div>}
      </div>
    </section>
  );
}

/* ─── DOCTOR DETAIL ─── */
function DoctorDetailPage({doc,onBack,navigate}){
  return(
    <section className="section" style={{paddingTop:"9rem"}}>
      <div className="s-inner">
        <button className="detail-back" onClick={onBack}>← Back to Doctors</button>
        <div className="det-hero">
          <div className="det-img">
            <img src={doc.img} alt={doc.name} onError={e=>{e.target.style.display="none"}}/>
          </div>
          <div className="det-info">
            <div className="det-name">{doc.name}</div>
            <div className="det-spec-pill">⚕ {doc.specialty}</div>
            <div className="det-tags">
              {["NABH Certified",doc.exp+" Experience",doc.avail?"Available Today":"Next: Tomorrow"].map(t=>(
                <div key={t} className="det-tag">{t}</div>
              ))}
            </div>
            <p style={{fontSize:"0.88rem",color:"var(--g500)",lineHeight:1.9,marginBottom:"1.7rem"}}>{doc.bio}</p>
            <div className="det-meta">
              <div><div className="det-meta-val" style={{color:"var(--amber)"}}>{"★".repeat(Math.floor(doc.rating))}</div><div className="det-meta-key">Rating {doc.rating}</div></div>
              <div><div className="det-meta-val">{doc.reviews}</div><div className="det-meta-key">Reviews</div></div>
              <div><div className="det-meta-val">₹800</div><div className="det-meta-key">Consult Fee</div></div>
            </div>
            <div style={{display:"flex",gap:"1rem",marginTop:"1.7rem",flexWrap:"wrap",alignItems:"center"}}>
              <button className="btn-primary" onClick={()=>navigate("Contact")}><span>📅 Book Consultation</span></button>
              <div style={{display:"flex",gap:"7px"}}>
                {socialLinks.slice(0,4).map(s=>(
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                     className={`soc-btn ${s.cls}`}
                     style={{width:"40px",height:"40px",background:"var(--g100)",border:"1.5px solid var(--g200)",color:"var(--g600)"}}
                     title={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="det-cols">
          <div>
            <div className="d-card">
              <div className="d-card-title">Qualifications</div>
              {doc.quals.map((q,i)=>(
                <div key={i} className="qual-row anim-fadeup" style={{animationDelay:`${i*0.09}s`}}>
                  <div className="qual-icon">{q.icon}</div>
                  <div><span className="qual-strong">{q.degree}</span><span className="qual-muted">{q.inst}</span></div>
                </div>
              ))}
            </div>
            <div className="d-card">
              <div className="d-card-title">Patient Reviews</div>
              {[
                {name:"Ravi Kumar",   date:"2 days ago", stars:5,text:"Exceptional diagnosis and very patient with explanations. Felt genuinely cared for throughout."},
                {name:"Meena Sharma", date:"1 week ago",  stars:5,text:"Highly professional and thorough. All concerns were addressed with great clarity and empathy."},
              ].map((r,i)=>(
                <div key={i} className="rev-item">
                  <div className="rev-top"><div className="rev-name">{r.name}</div><div className="rev-date">{r.date}</div></div>
                  <div className="rev-stars">{"★".repeat(r.stars)}</div>
                  <div className="rev-txt">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="d-card">
              <div className="d-card-title">Consultation Hours</div>
              {doc.hours.map((h,i)=>(
                <div key={i} className="hr-row">
                  <div className="hr-day">{h.day}</div>
                  <div className="hr-time">{h.time}</div>
                </div>
              ))}
              <div style={{marginTop:"1.7rem",padding:"1.5rem",background:"linear-gradient(135deg,var(--g50),rgba(0,194,122,0.03))",borderRadius:"16px",textAlign:"center",border:"1px solid var(--g200)"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.58rem",color:"var(--g400)",textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:"0.5rem"}}>Consultation Fee</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.3rem",fontWeight:700,color:"var(--ink)"}}>₹800</div>
                <div style={{fontSize:"0.76rem",color:"var(--g400)",marginBottom:"1.2rem"}}>Follow-up: ₹400</div>
                <button className="btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={()=>navigate("Contact")}><span>Book Now</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PACKAGES ─── */
function PackagesPage({navigate}){
  return(
    <section className="section" style={{paddingTop:"9rem",background:"var(--pearl)"}}>
      <div className="s-inner">
        <div style={{textAlign:"center",marginBottom:"4rem"}}>
          <div className="s-ey">Preventive Care</div>
          <h2 className="s-title" style={{margin:"0 auto 1rem"}}>Health Packages</h2>
          <p className="s-desc" style={{margin:"0 auto"}}>Transparent, all-inclusive pricing with the most comprehensive diagnostics in Mysuru.</p>
        </div>
        <div className="pkg-grid">
          {packages.map((p,i)=>{
            const d=p.featured;
            return(
              <div key={p.name} className={`pkg-card anim-fadeup d${i+1}${d?" featured":""}`}>
                {d&&<div className="pkg-badge">Most Popular</div>}
                <div className={`pkg-icon ${d?"d":"l"}`}>{p.icon}</div>
                <div className={`pkg-name ${d?"d":"l"}`}>{p.name}</div>
                <div className={`pkg-desc ${d?"d":"l"}`}>{p.desc}</div>
                <div className={`pkg-price-wrap ${d?"d":"l"}`}>
                  <span className={`pkg-cur ${d?"d":"l"}`}>₹</span>
                  <span className={`pkg-amt ${d?"d":"l"}`}>{p.price}</span>
                  <div className={`pkg-per ${d?"d":"l"}`}>per person · all tests inclusive</div>
                </div>
                <ul className="pkg-features">
                  {p.features.map(f=>(
                    <li key={f} className={`pkg-feat ${d?"d":"l"}`}>
                      <span className={`pkg-chk ${d?"d":"l"}`}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button className="pkg-btn" onClick={()=>navigate("Contact")}>
                  <span>📅 Book This Package</span>
                </button>
              </div>
            );
          })}
        </div>
        <div style={{background:"white",borderRadius:"22px",padding:"1.8rem 2.5rem",marginTop:"2.5rem",display:"flex",alignItems:"center",gap:"1.7rem",border:"1.5px solid var(--g200)",flexWrap:"wrap",boxShadow:"var(--sh-sm)"}}>
          <div style={{fontSize:"2.2rem"}}>🏠</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,color:"var(--ink)"}}>Free Home Sample Collection</div>
            <div style={{fontSize:"0.86rem",color:"var(--g500)",marginTop:"0.32rem"}}>Within 15 km · 6:00 AM – 9:00 AM · Book by 10 PM for next-day collection</div>
          </div>
          <button className="btn-primary" onClick={()=>navigate("Contact")}><span>Schedule Collection</span></button>
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function ServicesPage({navigate}){
  return(
    <section className="section" style={{paddingTop:"9rem"}}>
      <div className="s-inner">
        <div style={{textAlign:"center",marginBottom:"4rem"}}>
          <div className="s-ey">What We Offer</div>
          <h2 className="s-title" style={{margin:"0 auto 1rem"}}>Our Services</h2>
          <p className="s-desc" style={{margin:"0 auto"}}>Comprehensive healthcare services tailored to every patient need — from prevention to treatment.</p>
        </div>
        <div className="srv-grid">
          {services.map((s,i)=>(
            <div key={s.name} className={`srv-card anim-fadeup d${Math.min(i+1,6)}`}>
              <div className="srv-card-accent" style={{background:`linear-gradient(90deg,${s.accent},${s.accent}88)`}}/>
              <div className="srv-icon-wrap" style={{background:s.bg}}>{s.icon}</div>
              <div className="srv-name">{s.name}</div>
              <div className="srv-desc">{s.desc}</div>
              <ul className="srv-features">
                {s.features.map(f=><li key={f} className="srv-feat">{f}</li>)}
              </ul>
              <div style={{marginTop:"1.7rem"}}>
                <button className="btn-ghost" style={{color:s.accent,borderColor:s.accent,fontSize:"0.83rem",padding:"0.48rem 1.2rem"}}
                  onClick={()=>navigate("Contact")}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop:"3.5rem",
          background:"linear-gradient(145deg,#06020F 0%,#080B14 50%,#030A22 100%)",
          borderRadius:"28px",padding:"3.5rem",display:"flex",alignItems:"center",
          justifyContent:"space-between",gap:"2rem",flexWrap:"wrap",position:"relative",overflow:"hidden",
          border:"1px solid rgba(0,194,122,0.15)",
        }}>
          <div style={{position:"absolute",right:"-30px",bottom:"-30px",fontSize:"9rem",opacity:0.04,pointerEvents:"none"}}>🏥</div>
          <div style={{position:"absolute",top:"-60px",left:"-60px",width:"280px",height:"280px",background:"radial-gradient(circle,rgba(0,194,122,0.14) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.62rem",textTransform:"uppercase",letterSpacing:"0.24em",color:"var(--emerald2)",marginBottom:"0.88rem"}}>Ready to Get Started?</div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.3rem",fontWeight:700,color:"white",marginBottom:"0.6rem"}}>Book Your Appointment Today</h3>
            <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.42)",maxWidth:"490px"}}>Our care team is ready to guide you. Choose any service and we'll connect you with the right specialist.</p>
          </div>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",position:"relative"}}>
            <button className="btn-hp" onClick={()=>navigate("Contact")}><span>📅 Book Appointment</span></button>
            <button className="btn-ho" onClick={()=>navigate("Packages")}>View Packages →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PATIENT INFO ─── */
function PatientInfoPage({onPortalOpen}){
  return(
    <section className="section" style={{paddingTop:"9rem"}}>
      <div className="s-inner">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem"}}>
          <div>
            <div className="s-ey">FAQ</div>
            <h2 className="s-title" style={{marginBottom:"0.8rem"}}>Patient Information</h2>
            <p className="s-desc" style={{marginBottom:"2.8rem"}}>Hover over any question to reveal the answer instantly.</p>
            <div>
              {faqs.map((f,i)=>(
                <div key={i} className="faq-item">
                  <div className="faq-q">
                    <div className="faq-qt">{f.q}</div>
                    <div className="faq-ico">+</div>
                  </div>
                  <div className="faq-ans">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{background:"white",borderRadius:"26px",padding:"2.2rem",border:"1.5px solid var(--g200)",marginBottom:"1.6rem",boxShadow:"var(--sh-sm)"}}>
              <div className="s-ey">Insurance</div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.55rem",fontWeight:700,color:"var(--ink)",marginBottom:"0.6rem"}}>Accepted Providers</h3>
              <p style={{fontSize:"0.86rem",color:"var(--g500)",lineHeight:1.8,marginBottom:"0.52rem"}}>Empanelled with 30+ insurers for cashless hospitalisation.</p>
              <div className="ins-grid">
                {insurers.map(ins=>(
                  <div key={ins.name} className="ins-card">
                    <div className="ins-logo">{ins.logo}</div>
                    <div className="ins-name">{ins.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background:"linear-gradient(145deg,#06020F 0%,#080B14 50%,#030A22 100%)",
              borderRadius:"24px",padding:"2.3rem",color:"white",position:"relative",overflow:"hidden",
              border:"1px solid rgba(0,194,122,0.15)",
            }}>
              <div style={{position:"absolute",top:"-50px",right:"-50px",width:"220px",height:"220px",background:"radial-gradient(circle,rgba(0,194,122,0.14) 0%,transparent 70%)",borderRadius:"50%",pointerEvents:"none"}}/>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.24em",color:"var(--emerald2)",marginBottom:"0.88rem",position:"relative"}}>Patient Portal</div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.55rem",fontWeight:700,marginBottom:"0.6rem",position:"relative"}}>Access Your Health Records</h3>
              <p style={{fontSize:"0.86rem",color:"rgba(255,255,255,0.42)",lineHeight:1.88,marginBottom:"1.8rem",position:"relative"}}>View prescriptions, reports, and appointment history securely from anywhere.</p>
              <button
                onClick={onPortalOpen}
                style={{
                  display:"inline-flex",alignItems:"center",gap:"9px",
                  padding:"0.9rem 2rem",
                  background:"linear-gradient(135deg,var(--emerald),var(--emerald2))",
                  color:"var(--ink)",borderRadius:"13px",fontWeight:800,fontSize:".9rem",
                  border:"none",transition:"all 0.3s",
                  boxShadow:"0 10px 28px rgba(0,194,122,0.5)",position:"relative",
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,194,122,0.65)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 10px 28px rgba(0,194,122,0.5)"}}>
                🔒 Login to Portal →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function ContactPage({form,upd}){
  return(
    <section className="section" style={{paddingTop:"9rem"}}>
      <div className="s-inner">
        <div style={{textAlign:"center",marginBottom:"4rem"}}>
          <div className="s-ey">Get in Touch</div>
          <h2 className="s-title" style={{margin:"0 auto 1rem"}}>Book an Appointment</h2>
          <p className="s-desc" style={{margin:"0 auto"}}>Our team will confirm your appointment within 2 hours.</p>
        </div>
        <div className="contact-grid">
          <div className="form-card">
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"var(--ink)",marginBottom:"2rem",paddingBottom:"1.1rem",borderBottom:"2px solid var(--emerald3)"}}>Appointment Request</div>
            <div className="form-row">
              <div className="form-field">
                <label className="form-lbl">Full Name</label>
                <input className="form-inp" value={form.name} onChange={e=>upd("name",e.target.value)} placeholder="Your full name"/>
              </div>
              <div className="form-field">
                <label className="form-lbl">Phone Number</label>
                <input className="form-inp" value={form.phone} onChange={e=>upd("phone",e.target.value)} placeholder="+91 XXXXX XXXXX"/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label className="form-lbl">Department</label>
                <select className="form-inp" value={form.dept} onChange={e=>upd("dept",e.target.value)}>
                  <option value="">Select department</option>
                  {departments.map(d=><option key={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="form-lbl">Preferred Date</label>
                <input className="form-inp" type="date" value={form.date} onChange={e=>upd("date",e.target.value)}/>
              </div>
            </div>
            <div className="form-field">
              <label className="form-lbl">Message / Symptoms</label>
              <textarea className="form-ta" value={form.msg} onChange={e=>upd("msg",e.target.value)} placeholder="Briefly describe your concern..."/>
            </div>
            <button className="btn-primary" style={{width:"100%",justifyContent:"center",padding:"1.1rem"}}><span>📅 Submit Appointment Request</span></button>
            <div style={{marginTop:"1.1rem",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",color:"var(--g400)",textAlign:"center",textTransform:"uppercase",letterSpacing:"0.1em"}}>Confirmation within 2 hours · Mon–Sat 8 AM–8 PM</div>
          </div>

          <div className="contact-right">
            <div className="emer-card">
              <div className="emer-lbl">Emergency Helpline — 24/7</div>
              <div className="emer-num">1800-100-911</div>
              <div className="emer-sub">Toll-free · Round-the-clock critical care</div>
            </div>
            {[
              {icon:"📞",label:"General Enquiry",val:"+91-821-400-1234"},
              {icon:"⏰",label:"Working Hours",   val:"Mon–Sat: 8 AM – 8 PM"},
              {icon:"✉️",label:"Email Us",        val:"care@medicareplus.in"},
            ].map(it=>(
              <div key={it.label} className="info-tile">
                <div className="info-tile-ico">{it.icon}</div>
                <div><div className="info-tile-lbl">{it.label}</div><div className="info-tile-val">{it.val}</div></div>
              </div>
            ))}
            <div className="map-wrap">
              <iframe
                title="MediCare Plus — Mysuru Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.6!2d76.6394!3d12.3051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf70381d572ef9%3A0x2b89abad6ecdea0!2sRajkumar%20Road%2C%20Mysuru%2C%20Karnataka%20570001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.6rem",color:"var(--g400)",textTransform:"uppercase",letterSpacing:"0.1em",textAlign:"center"}}>
              📍 15, Rajkumar Road, Near Mysuru Palace · Karnataka 570001
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
