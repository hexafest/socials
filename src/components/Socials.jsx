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
  const subRef = useRef(null);
  const cursorRef = useRef(null);

  // GSAP letter-stagger reveal for the headline (opacity + y + rotateX only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([".hp-letter", subRef.current], { opacity: 1, y: 0 });
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
      gsap.from(subRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.45,
        delay: 0.3,
        ease: "power2.out",
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
        size={32}
        color="#D4AF37"
        fill
        seed={79}
        className="absolute top-40 right-8 sm:right-16 opacity-80 hp-float"
        style={{ animationDuration: "14s", animationDelay: "1.5s" }}
      />
      <RoughStar
        size={20}
        color="#66FCF1"
        seed={83}
        className="absolute bottom-32 left-12 opacity-60 hp-float"
        style={{ animationDuration: "10s", animationDelay: "2s" }}
      />

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
          src="https://hexafalls.org/logos/main_logo.png"
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

        <p
          ref={subRef}
          className="mt-6 max-w-xl mx-auto text-base sm:text-lg font-wizard text-silver-hp/80"
        >
          Owls fly in every direction. Follow the keep across the realms — and
          when you&apos;re ready, sign the scroll.
        </p>
      </motion.div>

      {/* Primary CTA — Register Now */}
      {primary && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-9 w-full max-w-md"
        >
          <RoughButton
            as="a"
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            color={primary.color}
            glow={primary.glow}
            shimmer
            seed={7}
            className="w-full px-8 py-5 text-[14px] sm:text-[15px] tracking-[0.4em]"
          >
            <SocialIcon name={primary.icon} className="h-5 w-5" />
            REGISTER NOW <span>↗</span>
          </RoughButton>
          <p className="mt-2 text-center font-wizard text-[12px] text-gold-hp/70">
            {primary.handle}
          </p>
        </motion.div>
      )}

      {/* Divider */}
      <div className="mt-10 mb-2 flex justify-center">
        <RoughDivider width={300} height={40} color="#D4AF37" ornament="✦" seed={19} />
      </div>

      {/* Social link grid */}
      <div className="grid w-full max-w-3xl gap-4 sm:gap-5 sm:grid-cols-2">
        {links.map((s, i) => {
          const tiltDeg = [-1.5, 1.5, -1, 1][i % 4];
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
              className="group relative block hover:transform-[rotate(0deg)_translateY(-4px)] transition-transform duration-300"
              style={{ transformOrigin: "center center", willChange: "transform" }}
              aria-label={`${s.label} — ${s.handle}`}
            >
              <div
                className="relative flex items-center gap-4 overflow-hidden rounded-[3px] bg-slate-hp/35 px-5 py-4 backdrop-blur-sm"
                style={{
                  border: `1px solid ${s.color}55`,
                  boxShadow: `0 4px 18px rgba(0,0,0,0.45), 0 0 14px ${s.glow}`,
                }}
              >
                <RoughCorners color={s.color} length={16} inset={4} seed={31 + i * 7} />

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
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{
                    color: s.color,
                    border: `1px solid ${s.color}66`,
                    background: `${s.color}14`,
                    boxShadow: `0 0 16px ${s.glow}`,
                  }}
                >
                  <SocialIcon name={s.icon} className="h-6 w-6" />
                </span>

                <span className="relative z-10 flex flex-col">
                  <span
                    className="font-display font-bold tracking-wide text-[15px]"
                    style={{ color: "#e8dcc8" }}
                  >
                    {s.label}
                  </span>
                  <span className="font-wizard text-[13px]" style={{ color: `${s.color}cc` }}>
                    {s.handle}
                  </span>
                </span>

                <span
                  className="relative z-10 ml-auto text-lg transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: s.color }}
                  aria-hidden="true"
                >
                  ↗
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
