import { useState, useEffect, useRef} from "react";

const NAV = ["Home", "Experience", "Projects", "Skills", "Contact"];

const PROJECTS = [
  { title: "Synvora", sub: "Relationship Intelligence AI", url: "https://synvora-three.vercel.app", tech: ["React.js", "Tailwind CSS", "Arcee AI", "OpenRouter"], desc: "Live AI web app with 3 modules: relationship Q&A with emotional feedback, thought rewriting, and partner compatibility scoring.", color: "#7f77dd", grad: "linear-gradient(135deg,#7f77dd,#534ab7)" },
  { title: "NIDAR", sub: "Autonomous Drone (Garuna Eye)", url: null, tech: ["YOLOv8n", "OpenCV", "Raspberry Pi", "Pixhawk"], desc: "Real-time human detection at ~85% accuracy, 15 FPS on edge hardware. Pixhawk flight controller with telemetry for autonomous navigation.", color: "#1d9e75", grad: "linear-gradient(135deg,#1d9e75,#085041)" },
  { title: "Blockchain Agri-Food", sub: "Supply Chain dApp", url: null, tech: ["React.js", "Solidity", "Hardhat", "ESP32/DHT22"], desc: "Full-stack dApp with 100% on-chain traceability. IoT sensors for real-time monitoring with tamper-proof blockchain records.", color: "#378add", grad: "linear-gradient(135deg,#378add,#185fa5)" },
  { title: "Donation System", sub: "Management Platform", url: null, tech: ["HTML", "CSS", "JavaScript", "Razorpay API"], desc: "Analytics dashboard with Razorpay API integration handling 100+ simulated transactions with instant confirmation feedback.", color: "#d4537e", grad: "linear-gradient(135deg,#d4537e,#993556)" },
];

const SKILLS = [
  { cat: "Languages", items: ["Java", "JavaScript", "Python", "HTML5", "CSS3"], color: "#7f77dd" },
  { cat: "Frameworks & Tools", items: ["React.js", "Node.js", "Git", "GitHub", "Hardhat", "VS Code"], color: "#1d9e75" },
  { cat: "AI & Computer Vision", items: ["OpenCV", "YOLOv8", "ChatGPT", "Generative AI", "Arcee AI", "OpenRouter"], color: "#378add" },
  { cat: "Prompt Engineering", items: ["LLM Prompt Design", "Instruction Tuning", "Context Engineering", "AI Evaluation"], color: "#d4537e" },
  { cat: "Core CS", items: ["DSA", "OOP", "DBMS", "Operating Systems", "Solidity", "Blockchain"], color: "#ba7517" },
];

const CERTS = [
  { t: "AI Tools & ChatGPT", org: "be10x", color: "#7f77dd" },
  { t: "Gen AI Engineering Mastermind", org: "Outskill", color: "#1d9e75" },
  { t: "Java Basics Certification", org: "HackerRank", color: "#378add" },
  { t: "Python Basics Certification", org: "HackerRank", color: "#d4537e" },
  { t: "Blockchain Basics & Solidity 101", org: "Cyfrin Updraft", color: "#ba7517" },
  { t: "250+ DSA Problems Solved", org: "LeetCode / GFG / HackerRank", color: "#1d9e75" },
];

const SOCIAL = [
  { icon: "✉", label: "Email", val: "rajuttam2005@gmail.com", href: "mailto:rajuttam2005@gmail.com", color: "#7f77dd" },
  { icon: "in", label: "LinkedIn", val: "linkedin.com/in/raj-uttam", href: "https://www.linkedin.com/in/raj-uttam", color: "#378add" },
  { icon: "<>", label: "GitHub", val: "github.com/Raj-Uttam", href: "https://github.com/Raj-Uttam", color: "#1d9e75" },
  { icon: "☎", label: "Phone", val: "+91 73884 30942", href: "tel:+917388430942", color: "#d4537e" },
];

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      color: ["#7f77dd","#1d9e75","#378add","#d4537e"][Math.floor(Math.random()*4)]
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "99";
        ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(127,119,221,${0.15 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.5 }} />;
}

function Tilt({ children, style = {} }) {
  const ref = useRef(null);
  const handleMove = e => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
  };
  const handleLeave = e => { ref.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)"; };
  return <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ transition: "transform 0.15s ease", transformStyle: "preserve-3d", ...style }}>{children}</div>;
}

function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, vis] = useInView();
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const num = parseFloat(target);
    const step = num / 50;
    const t = setInterval(() => {
      start += step;
      if (start >= num) { setVal(num); clearInterval(t); }
      else setVal(parseFloat(start.toFixed(2)));
    }, 30);
    return () => clearInterval(t);
  }, [vis, target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>{children}</div>
  );
}

function AnimBtn({ children, onClick, href, style = {}, color = "#7f77dd", gradient }) {
  const [active, setActive] = useState(false);
  const [ripples, setRipples] = useState([]);
  const handleClick = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    setActive(true);
    setTimeout(() => setActive(false), 300);
    onClick && onClick(e);
  };
  const bg = active ? (gradient || `linear-gradient(135deg,${color},${color}bb)`) : (gradient || "rgba(255,255,255,0.07)");
  const base = { position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 600, border: `1px solid ${color}55`, color: active ? "#fff" : color, background: bg, transition: "all 0.25s", transform: active ? "scale(0.96)" : "scale(1)", boxShadow: active ? `0 0 24px ${color}66` : "none", textDecoration: "none", display: "inline-block", ...style };
  const El = href ? "a" : "button";
  return (
    <El href={href} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined} onClick={handleClick} style={base}
      onMouseEnter={e => { e.currentTarget.style.background = gradient || `linear-gradient(135deg,${color}33,${color}11)`; e.currentTarget.style.boxShadow = `0 0 20px ${color}44`; }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = base.background; e.currentTarget.style.boxShadow = "none"; } }}>
      {ripples.map(r => (
        <span key={r.id} style={{ position: "absolute", left: r.x, top: r.y, width: 0, height: 0, background: "rgba(255,255,255,0.4)", borderRadius: "50%", transform: "translate(-50%,-50%)", animation: "ripple 0.7s ease-out forwards", pointerEvents: "none" }} />
      ))}
      {children}
    </El>
  );
}

function SkillBar({ label, level, color, delay }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: "rgba(232,232,240,0.8)" }}>{label}</span>
        <span style={{ fontSize: 12, color }}>{level}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: vis ? `${level}%` : "0%", background: `linear-gradient(90deg,${color},${color}88)`, borderRadius: 10, transition: `width 1.2s ease ${delay}s`, boxShadow: vis ? `0 0 8px ${color}88` : "none" }} />
      </div>
    </div>
  );
}

function Avatar() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAngle(a => a + 0.5), 30);
    return () => clearInterval(t);
  }, []);
  const rings = [
    { r: 52, color: "#7f77dd", dash: "8 4", speed: 1 },
    { r: 64, color: "#1d9e75", dash: "4 8", speed: -1.5 },
    { r: 76, color: "#378add", dash: "12 4", speed: 0.8 },
  ];
  return (
    <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 24px" }}>
      <svg width="160" height="160" style={{ position: "absolute", top: 0, left: 0 }}>
        {rings.map((ring, i) => (
          <circle key={i} cx="80" cy="80" r={ring.r} fill="none" stroke={ring.color} strokeWidth="1.5" strokeDasharray={ring.dash} strokeOpacity="0.7"
            transform={`rotate(${angle * ring.speed} 80 80)`} />
        ))}
        <defs>
          <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7f77dd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7f77dd" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="80" cy="80" r="48" fill="url(#avatarGlow)" />
      </svg>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#7f77dd,#1d9e75)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#fff", boxShadow: "0 0 30px rgba(127,119,221,0.6), 0 0 60px rgba(127,119,221,0.2)" }}>RU</div>
    </div>
  );
}

function FloatingPhoto() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT(prev => prev + 0.02), 50);
    return () => clearInterval(id);
  }, []);
  const y = Math.sin(t) * 6;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, transform: `translateY(${y}px)`, transition: "transform 0.1s linear" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#7f77dd,#1d9e75)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", boxShadow: "0 4px 20px rgba(127,119,221,0.5), 0 0 0 2px rgba(127,119,221,0.3)", cursor: "pointer" }}
        title="Raj Uttam — Developer">
        RU
      </div>
      <div style={{ position: "absolute", bottom: -6, right: -4, width: 14, height: 14, borderRadius: "50%", background: "#1d9e75", border: "2px solid #0a0a1a", boxShadow: "0 0 6px #1d9e75" }} />
    </div>
  );
}

function Cube3D() {
  const [r, setR] = useState({ x: 15, y: 20 });
  useEffect(() => {
    const t = setInterval(() => setR(prev => ({ x: prev.x + 0.25, y: prev.y + 0.4 })), 30);
    return () => clearInterval(t);
  }, []);
  const s = 40;
  const faces = [
    { transform: `rotateY(0deg) translateZ(${s}px)`, bg: "rgba(127,119,221,0.15)", border: "1px solid rgba(127,119,221,0.4)", label: "React" },
    { transform: `rotateY(180deg) translateZ(${s}px)`, bg: "rgba(29,158,117,0.15)", border: "1px solid rgba(29,158,117,0.4)", label: "AI" },
    { transform: `rotateY(90deg) translateZ(${s}px)`, bg: "rgba(55,138,221,0.15)", border: "1px solid rgba(55,138,221,0.4)", label: "Web3" },
    { transform: `rotateY(-90deg) translateZ(${s}px)`, bg: "rgba(212,83,126,0.15)", border: "1px solid rgba(212,83,126,0.4)", label: "CV" },
    { transform: `rotateX(90deg) translateZ(${s}px)`, bg: "rgba(186,117,23,0.15)", border: "1px solid rgba(186,117,23,0.4)", label: "DSA" },
    { transform: `rotateX(-90deg) translateZ(${s}px)`, bg: "rgba(127,119,221,0.1)", border: "1px solid rgba(127,119,221,0.2)", label: "CS" },
  ];
  return (
    <div style={{ perspective: 400, width: 100, height: 100, margin: "0 auto" }}>
      <div style={{ width: 80, height: 80, position: "relative", transformStyle: "preserve-3d", transform: `rotateX(${r.x}deg) rotateY(${r.y}deg)`, margin: "10px auto" }}>
        {faces.map((f, i) => (
          <div key={i} style={{ position: "absolute", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "rgba(232,232,240,0.9)", transform: f.transform, background: f.bg, border: f.border, backdropFilter: "blur(4px)", letterSpacing: 0.5 }}>{f.label}</div>
        ))}
      </div>
    </div>
  );
}

function TypeWriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const target = texts[idx];
    if (!del && shown.length < target.length) {
      const t = setTimeout(() => setShown(target.slice(0, shown.length + 1)), 80);
      return () => clearTimeout(t);
    } else if (!del && shown.length === target.length) {
      const t = setTimeout(() => setDel(true), 1800);
      return () => clearTimeout(t);
    } else if (del && shown.length > 0) {
      const t = setTimeout(() => setShown(shown.slice(0, -1)), 45);
      return () => clearTimeout(t);
    } else if (del && shown.length === 0) {
      setDel(false);
      setIdx((idx + 1) % texts.length);
    }
  }, [shown, del, idx, texts]);
  return (
    <span style={{ color: "#a89fe8" }}>{shown}<span style={{ animation: "blink 1s step-end infinite", color: "#7f77dd" }}>|</span></span>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [formState, setFormState] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const sectionRefs = useRef({});

  const scrollTo = sec => {
    setActive(sec);
    sectionRefs.current[sec]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const h = () => {
      for (const s of NAV) {
        const el = sectionRefs.current[s];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 100 && r.bottom > 100) { setActive(s); break; }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const validate = () => {
    const e = {};
    if (!formState.name.trim()) e.name = "Name is required";
    if (!formState.email.trim() || !/\S+@\S+\.\S+/.test(formState.email)) e.email = "Valid email required";
    if (!formState.msg.trim()) e.msg = "Message is required";
    return e;
  };

  const handleSend = () => {
    const e = validate();
    if (Object.keys(e).length) { setFormErrors(e); return; }
    setFormErrors({});
    setSent(true);
  };

  const g = { background: "rgba(255,255,255,0.07)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 16 };
  const gs = { background: "rgba(255,255,255,0.09)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 20 };

  return (
    <div style={{ background: "linear-gradient(135deg,#06061a 0%,#0d0d2e 40%,#070f1e 100%)", minHeight: "100vh", color: "#e8e8f0", fontFamily: "system-ui,sans-serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes ripple { to { width:300px;height:300px;opacity:0; } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(127,119,221,0.4)} 50%{box-shadow:0 0 0 12px rgba(127,119,221,0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes glow { 0%,100%{text-shadow:0 0 10px #7f77dd88} 50%{text-shadow:0 0 30px #7f77ddcc,0 0 60px #7f77dd55} }
        .nav-btn:hover { background: rgba(127,119,221,0.12) !important; }
        .skill-tag:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
        .project-card:hover .proj-title { animation: glow 2s infinite; }
      `}</style>

      <ParticleCanvas />
      <FloatingPhoto />

      {/* Ambient */}
      <div style={{ position: "fixed", top: -200, left: -200, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(127,119,221,0.2) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,158,117,0.16) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62, background: "rgba(6,6,26,0.8)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#7f77dd,#1d9e75)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", animation: "pulse 3s infinite" }}>RU</div>
          <span style={{ fontWeight: 700, fontSize: 16, background: "linear-gradient(90deg,#a89fe8,#5dcaa5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Raj Uttam</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {NAV.map(s => (
            <button key={s} className="nav-btn" onClick={() => scrollTo(s)} style={{ background: active === s ? "rgba(127,119,221,0.2)" : "transparent", color: active === s ? "#a89fe8" : "rgba(232,232,240,0.6)", border: active === s ? "1px solid rgba(127,119,221,0.4)" : "1px solid transparent", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all 0.2s", position: "relative" }}>
              {s}
              {active === s && <span style={{ position: "absolute", bottom: -1, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: "#7f77dd", borderRadius: 2 }} />}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* HERO */}
        <section ref={el => sectionRefs.current["Home"] = el} style={{ minHeight: "95vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 5% 40px", textAlign: "center" }}>
          <div style={{ maxWidth: 800, width: "100%" }}>
            <FadeIn><Avatar /></FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(29,158,117,0.12)", border: "1px solid rgba(29,158,117,0.3)", borderRadius: 20, padding: "5px 16px", fontSize: 12, color: "#5dcaa5", marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d9e75", display: "inline-block", animation: "pulse 2s infinite" }} />
                Available for opportunities · Graduating 2026
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 style={{ fontSize: "clamp(40px,8vw,72px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.05, background: "linear-gradient(135deg,#ffffff 0%,#c8c4f0 40%,#5dcaa5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "glow 4s ease-in-out infinite" }}>
                Raj Uttam
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p style={{ fontSize: "clamp(16px,3vw,20px)", color: "rgba(232,232,240,0.6)", margin: "0 0 6px" }}>
                <TypeWriter texts={["Full-Stack Developer", "AI Engineer", "Software Developer"]} />
              </p>
              <p style={{ fontSize: 13, color: "rgba(232,232,240,0.35)", margin: "0 0 36px" }}>B.Tech CS · PSIT Kanpur · CGPA 7.87</p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
                <AnimBtn color="#7f77dd" gradient="linear-gradient(135deg,#7f77dd,#534ab7)" onClick={() => scrollTo("Projects")}>View Projects →</AnimBtn>
                <AnimBtn color="#1d9e75" href="mailto:rajuttam2005@gmail.com">Get in Touch ✉</AnimBtn>
                <AnimBtn color="#5dcaa5" onClick={() => { const a = document.createElement("a"); a.href = "https://www.linkedin.com/in/raj-uttam"; a.target = "_blank"; a.click(); }}>↓ Resume</AnimBtn>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
                {[["250+", "DSA Problems", "#7f77dd"], ["4", "Projects Built", "#1d9e75"], ["7.87", "CGPA", "#378add"], ["6+", "Certifications", "#d4537e"]].map(([n, l, c]) => (
                  <Tilt key={l} style={{ ...g, padding: "18px 22px", textAlign: "center", minWidth: 90 }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: c, lineHeight: 1 }}>
                      <CountUp target={parseFloat(n)} suffix={n.includes("+") ? "+" : ""} />
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(232,232,240,0.45)", marginTop: 4 }}>{l}</div>
                  </Tilt>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                {SOCIAL.slice(1, 3).map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none", color: s.color, fontSize: 13, background: s.color + "15", border: `1px solid ${s.color}33`, borderRadius: 8, padding: "7px 16px", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = s.color + "30"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = s.color + "15"; e.currentTarget.style.transform = ""; }}>
                    <span style={{ fontWeight: 700 }}>{s.icon}</span> {s.label}
                  </a>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.7}>
              <div style={{ marginTop: 60 }}>
                <Cube3D />
                <p style={{ fontSize: 11, color: "rgba(232,232,240,0.25)", marginTop: 8 }}>Core technologies</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section ref={el => sectionRefs.current["Experience"] = el} style={{ padding: "90px 5%" }}>
          <FadeIn>
            <h2 style={{ textAlign: "center", fontSize: 34, fontWeight: 800, marginBottom: 8, color: "#e8e8f0" }}>Experience</h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#7f77dd,#1d9e75)", borderRadius: 2, margin: "0 auto 48px" }} />
          </FadeIn>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <FadeIn delay={0.1}>
              <Tilt style={{ ...gs, padding: "32px", borderLeft: "3px solid #378add", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle,rgba(55,138,221,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(55,138,221,0.15)", border: "1px solid rgba(55,138,221,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#378add", flexShrink: 0 }}>IBM</div>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#f0f0f8" }}>Front-End Web Development Intern</h3>
                      <p style={{ fontSize: 13, color: "#378add", margin: "3px 0 0", fontWeight: 500 }}>Edunet Foundation – AICTE | IBM SkillsBuild</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ background: "rgba(55,138,221,0.15)", color: "#378add", border: "1px solid rgba(55,138,221,0.3)", borderRadius: 6, padding: "4px 12px", fontSize: 12, fontWeight: 500 }}>Aug – Oct 2025</span>
                    <span style={{ background: "rgba(255,255,255,0.05)", color: "rgba(232,232,240,0.5)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 12px", fontSize: 12 }}>Remote</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Built 5+ responsive UI modules using HTML5, CSS3, and JavaScript (ES6+), enforcing mobile-first design principles.", "Delivered all 3 project milestones on schedule within IBM SkillsBuild curriculum with full mentor sign-off.", "Improved code reusability by modularising UI components, cutting re-work time by ~30% across review cycles."].map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#378add", fontSize: 16, flexShrink: 0, marginTop: 1 }}>▸</span>
                      <span style={{ fontSize: 14, color: "rgba(232,232,240,0.72)", lineHeight: 1.6 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </Tilt>
            </FadeIn>
          </div>
        </section>

        {/* PROJECTS */}
        <section ref={el => sectionRefs.current["Projects"] = el} style={{ padding: "90px 5%" }}>
          <FadeIn>
            <h2 style={{ textAlign: "center", fontSize: 34, fontWeight: 800, marginBottom: 8, color: "#e8e8f0" }}>Projects</h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#7f77dd,#1d9e75)", borderRadius: 2, margin: "0 auto 48px" }} />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 28, maxWidth: 1140, margin: "0 auto" }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.12}>
                <Tilt style={{ height: "100%" }}>
                  <div className="project-card" style={{ ...gs, padding: "30px 26px", height: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden", transition: "box-shadow 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 20px 60px ${p.color}44`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
                    <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${p.color}18 0%,transparent 70%)`, pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: p.grad, borderRadius: "0 0 20px 20px", opacity: 0.6 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 12, background: p.color + "20", border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: p.color }}>
                        {["✦", "◈", "⬡", "❋"][i]}
                      </div>
                      {p.url && <AnimBtn href={p.url} color={p.color} style={{ padding: "5px 14px", fontSize: 12, fontWeight: 600, borderRadius: 8 }}>Live ↗</AnimBtn>}
                    </div>
                    <h3 className="proj-title" style={{ fontSize: 19, fontWeight: 700, margin: "0 0 4px", color: "#f0f0f8" }}>{p.title}</h3>
                    <p style={{ fontSize: 12, color: p.color, margin: "0 0 14px", fontWeight: 500 }}>{p.sub}</p>
                    <p style={{ fontSize: 13.5, color: "rgba(232,232,240,0.62)", lineHeight: 1.65, margin: "0 0 18px" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {p.tech.map(t => (
                        <span key={t} className="skill-tag" style={{ background: p.color + "18", color: p.color, border: `1px solid ${p.color}35`, borderRadius: 20, padding: "3px 12px", fontSize: 11.5, fontWeight: 500, transition: "all 0.2s", cursor: "default" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section ref={el => sectionRefs.current["Skills"] = el} style={{ padding: "90px 5%" }}>
          <FadeIn>
            <h2 style={{ textAlign: "center", fontSize: 34, fontWeight: 800, marginBottom: 8, color: "#e8e8f0" }}>Skills</h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#7f77dd,#1d9e75)", borderRadius: 2, margin: "0 auto 48px" }} />
          </FadeIn>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
            <div>
              <FadeIn delay={0.05}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: "rgba(232,232,240,0.4)", margin: "0 0 20px", textTransform: "uppercase", letterSpacing: 1.5 }}>Proficiency</h4>
                {[["React.js", 88, "#7f77dd"], ["JavaScript / ES6+", 85, "#378add"], ["Python", 78, "#1d9e75"], ["Java", 80, "#ba7517"], ["AI & Prompt Engineering", 85, "#d4537e"], ["Solidity / Web3", 70, "#7f77dd"]].map(([l, v, c], i) => (
                  <SkillBar key={l} label={l} level={v} color={c} delay={i * 0.1} />
                ))}
              </FadeIn>
            </div>
            <div>
              <FadeIn delay={0.1}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: "rgba(232,232,240,0.4)", margin: "0 0 20px", textTransform: "uppercase", letterSpacing: 1.5 }}>Technologies</h4>
                {SKILLS.map((s, i) => (
                  <div key={s.cat} style={{ marginBottom: 18 }}>
                    <p style={{ fontSize: 12, color: s.color, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 0.8 }}>{s.cat}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {s.items.map(item => (
                        <span key={item} className="skill-tag" style={{ background: s.color + "14", color: s.color, border: `1px solid ${s.color}30`, borderRadius: 20, padding: "3px 11px", fontSize: 12, fontWeight: 500, transition: "all 0.2s", cursor: "default" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.2}>
            <div style={{ ...gs, maxWidth: 900, margin: "48px auto 0", padding: "32px 36px" }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "#ba7517", margin: "0 0 20px", textTransform: "uppercase", letterSpacing: 1.5 }}>Certifications & Achievements</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
                {CERTS.map(c => (
                  <Tilt key={c.t} style={{ background: c.color + "0d", border: `1px solid ${c.color}25`, borderRadius: 12, padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: c.color, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(232,232,240,0.85)", margin: 0 }}>{c.t}</p>
                        <p style={{ fontSize: 11, color: c.color, margin: "2px 0 0" }}>{c.org}</p>
                      </div>
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* CONTACT */}
        <section ref={el => sectionRefs.current["Contact"] = el} style={{ padding: "90px 5% 110px" }}>
          <FadeIn>
            <h2 style={{ textAlign: "center", fontSize: 34, fontWeight: 800, marginBottom: 8, color: "#e8e8f0" }}>Contact</h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#7f77dd,#1d9e75)", borderRadius: 2, margin: "0 auto 12px" }} />
            <p style={{ textAlign: "center", color: "rgba(232,232,240,0.45)", marginBottom: 48, fontSize: 15 }}>Let's build something together</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 28, maxWidth: 880, margin: "0 auto" }}>
            <FadeIn delay={0.05}>
              <Tilt style={{ ...gs, padding: "30px 26px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 22px", color: "#c8c4f0" }}>Reach out directly</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                  {SOCIAL.map(c => (
                    <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", padding: "11px 14px", borderRadius: 11, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = c.color + "18"; e.currentTarget.style.borderColor = c.color + "44"; e.currentTarget.style.transform = "translateX(4px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = ""; }}>
                      <span style={{ width: 34, height: 34, borderRadius: 9, background: c.color + "20", color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize: 11, color: c.color, fontWeight: 600 }}>{c.label}</div>
                        <div style={{ fontSize: 13, color: "rgba(232,232,240,0.65)" }}>{c.val}</div>
                      </div>
                    </a>
                  ))}
                </div>
                <AnimBtn color="#1d9e75" style={{ width: "100%", textAlign: "center", borderRadius: 12, padding: "13px" }} onClick={() => { const a = document.createElement("a"); a.href = "https://www.linkedin.com/in/raj-uttam"; a.target = "_blank"; a.click(); }}>
                  ↓ Download Resume
                </AnimBtn>
              </Tilt>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Tilt style={{ ...gs, padding: "30px 26px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 22px", color: "#c8c4f0" }}>Send a message</h3>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "48px 0" }}>
                    <div style={{ fontSize: 52, color: "#1d9e75", marginBottom: 14, animation: "float 2s ease-in-out infinite" }}>✓</div>
                    <p style={{ color: "#5dcaa5", fontSize: 16, fontWeight: 600, margin: 0 }}>Message sent!</p>
                    <p style={{ color: "rgba(232,232,240,0.45)", fontSize: 13, marginTop: 6 }}>I'll get back to you soon.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[{ key: "name", label: "Your name", type: "text", ph: "John Doe" }, { key: "email", label: "Your email", type: "email", ph: "john@example.com" }].map(f => (
                      <div key={f.key}>
                        <label style={{ fontSize: 12, color: "rgba(232,232,240,0.5)", display: "block", marginBottom: 5 }}>{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={formState[f.key]} onChange={e => { setFormState(p => ({ ...p, [f.key]: e.target.value })); setFormErrors(p => ({ ...p, [f.key]: "" })); }}
                          style={{ width: "100%", background: formErrors[f.key] ? "rgba(212,83,126,0.06)" : "rgba(255,255,255,0.06)", border: `1px solid ${formErrors[f.key] ? "rgba(212,83,126,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 9, padding: "10px 14px", color: "#e8e8f0", fontSize: 14, boxSizing: "border-box", outline: "none", transition: "border 0.2s" }}
                          onFocus={e => e.target.style.borderColor = "#7f77dd88"}
                          onBlur={e => e.target.style.borderColor = formErrors[f.key] ? "rgba(212,83,126,0.5)" : "rgba(255,255,255,0.1)"} />
                        {formErrors[f.key] && <p style={{ color: "#d4537e", fontSize: 11, margin: "4px 0 0" }}>{formErrors[f.key]}</p>}
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 12, color: "rgba(232,232,240,0.5)", display: "block", marginBottom: 5 }}>Message</label>
                      <textarea rows={4} placeholder="Hey Raj, I'd like to discuss..." value={formState.msg} onChange={e => { setFormState(p => ({ ...p, msg: e.target.value })); setFormErrors(p => ({ ...p, msg: "" })); }}
                        style={{ width: "100%", background: formErrors.msg ? "rgba(212,83,126,0.06)" : "rgba(255,255,255,0.06)", border: `1px solid ${formErrors.msg ? "rgba(212,83,126,0.5)" : "rgba(255,255,255,0.1)"}`, borderRadius: 9, padding: "10px 14px", color: "#e8e8f0", fontSize: 14, boxSizing: "border-box", resize: "vertical", outline: "none", transition: "border 0.2s" }}
                        onFocus={e => e.target.style.borderColor = "#7f77dd88"}
                        onBlur={e => e.target.style.borderColor = formErrors.msg ? "rgba(212,83,126,0.5)" : "rgba(255,255,255,0.1)"} />
                      {formErrors.msg && <p style={{ color: "#d4537e", fontSize: 11, margin: "4px 0 0" }}>{formErrors.msg}</p>}
                    </div>
                    <AnimBtn color="#7f77dd" gradient="linear-gradient(135deg,#7f77dd,#534ab7)" onClick={handleSend} style={{ width: "100%", textAlign: "center", borderRadius: 12, padding: "13px", marginTop: 4 }}>
                      Send Message →
                    </AnimBtn>
                  </div>
                )}
              </Tilt>
            </FadeIn>
          </div>
        </section>

        <div style={{ textAlign: "center", padding: "24px 5% 48px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(232,232,240,0.25)", fontSize: 13 }}>
          Built with React · © 2026 Raj Uttam · Kanpur, Uttar Pradesh
        </div>
      </div>
    </div>
  );
}