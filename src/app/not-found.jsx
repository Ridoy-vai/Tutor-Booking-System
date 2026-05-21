'use client';
import { useEffect, useRef } from "react";

const S = {
  body: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Hind Siliguri', sans-serif",
    background: "#0D1B2A",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  nav: {
    padding: "0 2rem",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    position: "relative",
    zIndex: 10,
  },
  navLogo: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.3rem",
    color: "#E8A020",
    fontWeight: 700,
  },
  navLinks: { display: "flex", gap: "1.5rem" },
  navLink: { color: "#8fa8c2", fontSize: "0.9rem", textDecoration: "none" },
  orb1: {
    position: "absolute",
    width: 400, height: 400,
    background: "#1a4a7a",
    borderRadius: "50%",
    top: -100, right: -80,
    filter: "blur(80px)",
    opacity: 0.15,
    pointerEvents: "none",
  },
  orb2: {
    position: "absolute",
    width: 300, height: 300,
    background: "#7a5000",
    borderRadius: "50%",
    bottom: -80, left: -60,
    filter: "blur(80px)",
    opacity: 0.15,
    pointerEvents: "none",
  },
  starsCanvas: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4rem 2rem",
    position: "relative",
    zIndex: 1,
  },
  content: {
    textAlign: "center",
    maxWidth: 560,
    animation: "floatIn 0.7s ease both",
  },
  bigNum: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(6rem, 18vw, 10rem)",
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "-6px",
    WebkitTextStroke: "2px #E8A020",
    color: "transparent",
    userSelect: "none",
  },
  telescope: {
    fontSize: "3.5rem",
    display: "block",
    margin: "0.25rem 0 1.25rem",
    animation: "sway 3s ease-in-out infinite",
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "0.85rem",
  },
  desc: {
    color: "#8fa8c2",
    fontSize: "0.95rem",
    lineHeight: 1.8,
    marginBottom: "2.5rem",
  },
  actions: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "3rem",
  },
  btnGold: {
    background: "#E8A020",
    color: "#0D1B2A",
    padding: "0.85rem 2rem",
    borderRadius: 10,
    fontFamily: "'Hind Siliguri', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    transition: "background 0.2s, transform 0.15s",
  },
  btnGhost: {
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    padding: "0.85rem 2rem",
    borderRadius: 10,
    fontFamily: "'Hind Siliguri', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    border: "1.5px solid rgba(255,255,255,0.15)",
    transition: "background 0.2s, transform 0.15s",
  },
  pillLabel: {
    fontSize: "0.78rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "rgba(255,255,255,0.3)",
    marginBottom: "1rem",
    fontWeight: 600,
  },
  pills: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" },
  pill: {
    background: "rgba(232,160,32,0.1)",
    color: "#FBD87F",
    padding: "7px 16px",
    borderRadius: 20,
    fontSize: "0.83rem",
    fontWeight: 500,
    border: "1px solid rgba(232,160,32,0.22)",
    cursor: "pointer",
  },
  footer: {
    position: "relative",
    zIndex: 1,
    borderTop: "1px solid rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    fontSize: "0.8rem",
    padding: "1rem",
  },
};

const keyframes = `
@keyframes floatIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
@keyframes sway { 0%,100% { transform:rotate(-8deg); } 50% { transform:rotate(8deg); } }
`;

const quickLinks = ["📖 সকল কোর্স", "👩‍🏫 টিউটর খুঁজুন", "📝 ভর্তি হোন", "💬 সাপোর্ট", "❓ FAQ"];

export default function NotFoundPage() {
  const starsRef = useRef(null);

  useEffect(() => {
    // Load fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap";
    document.head.appendChild(link);

    // Inject keyframes
    const style = document.createElement("style");
    style.textContent = keyframes;
    document.head.appendChild(style);

    // Generate stars
    const container = starsRef.current;
    if (!container) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement("div");
      const size = Math.random() * 2.5 + 0.8;
      s.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        background:#fff; border-radius:50%;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        animation: twinkle ${2 + Math.random() * 3}s ${Math.random() * 4}s infinite alternate;
        opacity:0.1;
      `;
      container.appendChild(s);
    }

    const twinkle = document.createElement("style");
    twinkle.textContent = `@keyframes twinkle { from { opacity:0.1; } to { opacity:0.85; } }`;
    document.head.appendChild(twinkle);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(twinkle);
    };
  }, []);

  return (
    <div style={S.body}>
      {/* Glow orbs */}
      <div style={S.orb1} />
      <div style={S.orb2} />

      {/* Stars */}
      <div ref={starsRef} style={S.starsCanvas} />

      {/* MAIN */}
      <main style={S.main}>
        <div style={S.content}>
          <div style={S.bigNum}>404</div>
          <span style={S.telescope}>🔭</span>
          <div style={S.title}>পেজটি খুঁজে পাওয়া যায়নি</div>
          <p style={S.desc}>
            আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন হয়েছে,
            অথবা এটি কখনো ছিলই না।{" "}
            <strong style={{ color: "#FBD87F" }}>ঠিকানাটি আরেকবার দেখুন</strong>{" "}
            অথবা নিচের লিংকগুলো ব্যবহার করুন।
          </p>

          <div style={S.actions}>
            <button style={S.btnGold} onClick={() => (window.location.href = "/")}>
              🏠 হোমে ফিরুন
            </button>
            <button style={S.btnGhost} onClick={() => history.back()}>
              ← আগের পেজে যান
            </button>
          </div>

          <p style={S.pillLabel}>দ্রুত নেভিগেশন</p>
          <div style={S.pills}>
            {quickLinks.map((l) => (
              <span key={l} style={S.pill}>{l}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}