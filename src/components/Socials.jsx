"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Sparkles from "./Sparkles";
import RoughButton from "./RoughButton";
import RoughStar from "./RoughStar";
import RoughDivider from "./RoughDivider";
import RoughCorners from "./RoughCorners";
import SocialIcon from "./SocialIcon";
import { SOCIALS } from "@/lib/socials";

export default function Socials() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  // GSAP letter-stagger reveal for the headline (opacity + y + rotateX only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(".hp-letter", { opacity: 1, y: 0 });
        return;
      }
      gsap.set(".hp-letter", { opacity: 0, y: 28, rotateX: -60 });
      gsap.to(".hp-letter", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: { each: 0.045, from: "start" },
        delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cursor wand glow + trailing gold/cyan particles (ported from the hero).
  useEffect(() => {
    const el = cursorRef.current;
    const canvas = document.getElementById("wand-particles");
    if (!el || !canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    let tx = -400, ty = -400, cx = -400, cy = -400;
    let lastMoveTime = 0, glowOpacity = 0;
    const idleDelay = 260, maxGlow = 0.65;
    let raf;
    const particles = [];
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      lastMoveTime = performance.now();
    };
    window.addEventListener("pointermove", onMove);
    class Particle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 12;
        this.y = y + (Math.random() - 0.5) * 12;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -Math.random() * 0.7 - 0.15;
        this.life = 1;
        this.decay = Math.random() * 0.014 + 0.011;
        this.r = Math.random() * 1.6 + 0.5;
        this.gold = Math.random() > 0.45;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.55;
        ctx.fillStyle = this.gold ? "#D4AF37" : "#66FCF1";
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.gold
          ? "rgba(212,175,55,0.55)"
          : "rgba(102,252,241,0.55)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    let frameCount = 0;
    const loop = () => {
      const now = performance.now();
      const active = now - lastMoveTime < idleDelay;
      const targetOpacity = active ? maxGlow : 0;
      glowOpacity += (targetOpacity - glowOpacity) * 0.16;
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
      el.style.opacity = `${glowOpacity}`;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;
      if (active && frameCount % 2 === 0) particles.push(new Particle(cx, cy));
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const splitLetters = (text) =>
    text.split(/(\s+)/).map((part, wi) => {
      if (/^\s+$/.test(part)) {
        return (
          <span key={`w${wi}`} style={{ whiteSpace: "pre" }}>
            {part}
          </span>
        );
      }
      return (
        <span key={`w${wi}`} className="inline-block" style={{ whiteSpace: "nowrap" }}>
          {[...part].map((ch, ci) => (
            <span key={`${wi}-${ci}`} className="hp-letter inline-block">
              {ch}
            </span>
          ))}
        </span>
      );
    });

  const primary = SOCIALS.find((s) => s.primary);
  const links = SOCIALS.filter((s) => !s.primary);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden min-h-screen flex flex-col items-center justify-start pt-24 sm:pt-28 pb-24 px-6"
    >
      {/* ── Cinematic background video (same asset as the hexafalls hero) ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/dxkje9whm/video/upload/so_0,f_jpg,q_auto,w_1920/v1779009744/hexa2_hero_background_demo_1-B9c3V5LY3VUM4T_seg1_7c8c3f56-265e-4786-ab86-51d5784526bf_lnbo8r.jpg"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
        className="fixed inset-0 -z-40 h-screen w-full object-cover"
      >
        <source src="https://res.cloudinary.com/dxkje9whm/video/upload/f_auto,q_auto,vc_auto,w_1920/v1779009744/hexa2_hero_background_demo_1-B9c3V5LY3VUM4T_seg1_7c8c3f56-265e-4786-ab86-51d5784526bf_lnbo8r.mp4" />
      </video>
      <div className="fixed inset-0 -z-39 bg-[#02050d]/72 pointer-events-none" />
      <div
        className="fixed inset-0 -z-37 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 95% 90% at 50% 40%, transparent 28%, rgba(2,5,12,0.94) 100%)",
        }}
      />

      {/* Wand particle canvas + cursor glow */}
      <canvas
        id="wand-particles"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-20"
        style={{ width: "100vw", height: "100vh" }}
      />
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-10 h-150 w-150 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(102,252,241,0.22) 0%, rgba(102,252,241,0.10) 18%, rgba(212,175,55,0.05) 38%, transparent 68%)",
          filter: "blur(28px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Atmosphere */}
      <div className="absolute inset-0 -z-30 hp-stars opacity-15" />
      <div className="absolute inset-0 -z-20 hp-scrim opacity-10" />
      <div className="absolute inset-0 -z-10 opacity-60">
        <Sparkles count={18} />
      </div>

      {/* Floating scribble stars */}
      <RoughStar
        size={26}
        color="#A78BFA"
        seed={71}
        className="absolute top-24 left-6 sm:left-12 opacity-70 hp-float"
        style={{ animationDuration: "12s" }}
      />
      <RoughStar
        size={20}
        color="#66FCF1"
        seed={83}
        className="absolute bottom-32 left-12 opacity-60 hp-float"
        style={{ animationDuration: "10s", animationDelay: "2s" }}
      />

      {/* ── Register Now — a tavern sign hanging from the sky, swinging gently ── */}
      {primary && (
        <div className="pointer-events-none absolute top-0 right-3 sm:right-[6%] z-30">
          <div className="hp-sway flex flex-col items-center" style={{ transformOrigin: "top center" }}>
            {/* ropes + peg */}
            <svg
              width="200"
              height="44"
              viewBox="0 0 200 44"
              className="overflow-visible"
              aria-hidden="true"
            >
              <circle cx="100" cy="3" r="3.4" fill="#EF4444" />
              <circle cx="100" cy="3" r="6" fill="none" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.45" />
              <line x1="100" y1="5" x2="24" y2="42" stroke="#EF4444" strokeWidth="1.6" strokeOpacity="0.85" />
              <line x1="100" y1="5" x2="176" y2="42" stroke="#EF4444" strokeWidth="1.6" strokeOpacity="0.85" />
            </svg>
            <div className="pointer-events-auto -mt-1 flex flex-col items-center">
              <div className="relative">
                <RoughButton
                  as="div"
                  color={primary.color}
                  glow={primary.glow}
                  seed={7}
                  className="w-[200px] px-5 py-4 text-[12px] tracking-[0.32em] cursor-not-allowed opacity-80"
                >
                  <SocialIcon name={primary.icon} className="h-4 w-4 text-red-100" />
                  <span className="text-red-100 drop-shadow-md">REGISTRATION</span>
                </RoughButton>
                {/* ── CLOSED badge ── */}
                <span
                  className="absolute -top-2 -right-4 z-20 rounded-sm border border-red-400/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-red-100 shadow-lg backdrop-blur-md"
                  style={{ transform: "rotate(12deg)", background: "rgba(220, 38, 38, 0.35)" }}
                >
                  Closed
                </span>
              </div>
              <span className="mt-1.5 font-wizard text-[11px] text-red-200/90 drop-shadow-sm">
                {primary.handle}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Crest / logo */}
      <motion.a
        href="https://hexafalls.org"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="group relative mb-6 h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full border border-silver-hp/25 bg-slate-hp/40 backdrop-blur flex items-center justify-center transition hover:border-cyan-hp/60 hover:shadow-[0_0_24px_rgba(102,252,241,0.30)]"
        aria-label="HexaFalls home"
      >
        <img
          src="/main_logo_transparent.png?v=3"
          alt="HexaFalls"
          className="block h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
          style={{ filter: "drop-shadow(0 0 8px rgba(102,252,241,0.25))" }}
        />
      </motion.a>

      {/* HEADLINE */}
      <motion.div className="text-center" style={{ perspective: 800 }}>
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center -z-10">
          <div
            style={{
              width: "55%",
              height: "30%",
              background:
                "radial-gradient(ellipse, rgba(212,175,55,0.10) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
        <h1
          aria-label="HexaFalls Socials"
          className="font-display font-black tracking-tight leading-[0.95] text-[13vw] sm:text-[8vw] md:text-[6.5vw]"
        >
          <span
            className="block"
            style={{ color: "#e0fffc", WebkitTextStroke: "2px rgba(102,252,241,0.9)" }}
          >
            {splitLetters("HexaFalls")}
          </span>
          <span
            className="block mt-1"
            style={{
              color: "#FFD700",
              fontSize: "clamp(0.9rem, 5vw, 3.2vw)",
              letterSpacing: "0.32em",
              WebkitTextStroke: "1.5px rgba(212,175,55,0.95)",
            }}
          >
            {splitLetters("· Socials ·")}
          </span>
        </h1>
      </motion.div>

      {/* Divider */}
      <div className="mt-10 mb-8 flex justify-center">
        <RoughDivider width={300} height={40} color="#D4AF37" ornament="✦" seed={19} />
      </div>

      {/* Social links — centered, side-by-side, wraps responsively */}
      <div className="flex w-full max-w-4xl flex-wrap items-stretch justify-center gap-3.5 sm:gap-4">
        {links.map((s, i) => {
          const tiltDeg = [-1.6, 1.5, -1, 1.2, -1.3][i % 5];
          return (
            <motion.a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, rotate: tiltDeg }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block w-[150px] hover:transform-[rotate(0deg)_translateY(-4px)] transition-transform duration-300"
              style={{ transformOrigin: "center center", willChange: "transform" }}
              aria-label={`${s.label} — ${s.handle}`}
            >
              <div
                className="relative flex h-full flex-col items-center gap-2.5 overflow-hidden rounded-[3px] bg-slate-hp/35 px-3 py-5 text-center backdrop-blur-sm"
                style={{
                  border: `1px solid ${s.color}55`,
                  boxShadow: `0 4px 18px rgba(0,0,0,0.45), 0 0 14px ${s.glow}`,
                }}
              >
                <RoughCorners color={s.color} length={15} inset={4} seed={31 + i * 7} />

                {/* shimmer sweep on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:animate-[hp-shimmer_3s_linear_infinite] transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${s.color}26, transparent)`,
                  }}
                />

                {/* icon medallion */}
                <span
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: s.color,
                    border: `1px solid ${s.color}66`,
                    background: `${s.color}14`,
                    boxShadow: `0 0 16px ${s.glow}`,
                  }}
                >
                  <SocialIcon name={s.icon} className="h-6 w-6" />
                </span>

                <span
                  className="relative z-10 font-display font-bold tracking-wide text-[14px] leading-tight"
                  style={{ color: "#e8dcc8" }}
                >
                  {s.label}
                </span>
                <span
                  className="relative z-10 font-wizard text-[12px] leading-tight"
                  style={{ color: `${s.color}cc` }}
                >
                  {s.handle}
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* footnote */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-16 flex flex-col items-center gap-2 text-center"
      >
        <span className="inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.5em] text-cyan-hp/70">
          <RoughDivider width={48} height={20} color="#66FCF1" seed={3} />
          HexaFalls Techfest
          <RoughDivider width={48} height={20} color="#66FCF1" seed={5} />
        </span>
        <span className="font-wizard text-[12px] italic text-silver-hp/45">
          a 58-hour wizarding hackathon · JIS University, Kolkata
        </span>
      </motion.div>
    </section>
  );
}
