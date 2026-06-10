import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ArrowRight,
  Code2,
  Database,
  Cpu,
  Globe,
  Rocket,
  Trophy,
  Award,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Send,
  MapPin,
  X,
  Sparkles,
  Brain,
  Server,
  GitBranch,
  FileCode2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nikhil Sunda — Full-Stack & MERN Developer" },
      {
        name: "description",
        content:
          "Premium portfolio of Nikhil Sunda — Full-Stack & MERN developer, AI enthusiast, B.Tech IIIT Bhubaneswar.",
      },
      { property: "og:title", content: "Nikhil Sunda — Portfolio" },
      {
        property: "og:description",
        content: "Full-stack, MERN & AI projects.",
      },
    ],
  }),
  component: Portfolio,
});

/* ============ DATA ============ */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "achievements", label: "Achievements" },
  { id: "profiles", label: "Profiles" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  { name: "React.js", level: 90, icon: Code2 },
  { name: "JavaScript", level: 88, icon: FileCode2 },
  { name: "Node.js", level: 82, icon: Server },
  { name: "Express.js", level: 80, icon: Server },
  { name: "MongoDB", level: 78, icon: Database },
  { name: "HTML5", level: 95, icon: Globe },
  { name: "CSS3", level: 90, icon: Globe },
  { name: "Python", level: 80, icon: Brain },
  { name: "Git & GitHub", level: 85, icon: GitBranch },
  { name: "C / C++", level: 82, icon: Cpu },
];

const PROJECTS = [
  {
    title: "Algorithmic Smart Shop",
    desc: "Full-stack e-commerce processing 10,000+ products with a content-based recommendation engine using cosine similarity.",
    stack: ["React", "Python", "FastAPI", "Pandas"],
    github: "https://github.com/nikhil-chdry",
    live: "https://smart-shop-platform-aaph.vercel.app/",
    gradient: "from-[#7FC6E8] to-[#C7E6F7]",
    emoji: "🛒",
  },
  {
    title: "Water AMC Management System",
    desc: "Business platform for a water treatment company managing RO plants, coolers and AMC services. Secure JWT auth.",
    stack: ["React", "Node", "Express", "MongoDB", "JWT"],
    github: "https://github.com/nikhil-chdry",
    live: "https://water-amc-green.vercel.app/",
    gradient: "from-[#A9DCF1] to-[#E6F4FC]",
    emoji: "💧",
  },
  {
    title: "Portfolio Website",
    desc: "This very site — premium animated sky environment, glassmorphism cards, Framer Motion interactions.",
    stack: ["React", "Framer Motion", "Tailwind"],
    github: "https://github.com/nikhil-chdry",
    live: "#",
    gradient: "from-[#C7E6F7] to-[#7FC6E8]",
    emoji: "✨",
  },
  {
    title: "Smart IoT EV Battery Analytics",
    desc: "Published research on IoT-enabled predictive analytics for EV battery performance and thermal management.",
    stack: ["IoT", "Python", "ML", "Research"],
    github: "https://github.com/nikhil-chdry",
    live: "#",
    gradient: "from-[#7FC6E8] to-[#A9DCF1]",
    emoji: "🔋",
  },
  {
    title: "Razor Pay Site Clone",
    desc: "Frontend clone of the Razor Pay website with responsive design and interactive elements using Tailwind CSS.",
    stack: [ "HTML", "Tailwind CSS"],
    github: "https://github.com/nikhil-chdry",
    live: "#",
    gradient: "from-[#A9DCF1] to-[#C7E6F7]",
    emoji: "💳",
  },
];

const CERTIFICATES = [
  {
    title: "Machine Learning & Deep Learning Bootcamp in Python",
    org: "UDEMY",
    date: "2026",
    emoji: "🎓",
  },
  {
    title: "Problem Solving (Intermediate)",
    org: "Leetcode",
    date: "2023",
    emoji: "💻",
  },
  {
    title: "Research Publication — IoT EV",
    org: "IEEE",
    date: "2024",
    emoji: "📄",
  },
];

const ACHIEVEMENTS = [
  { value: 6, label: "Projects Built", icon: Rocket },
  { value: 200, label: "DSA Problems Solved", icon: Code2 },
  { value: 2, label: "Certifications", icon: Award },
  { value: 12, label: "Technologies", icon: Sparkles },
];

const PROFILES = [
  {
    name: "GitHub",
    handle: "@nikhil-chdry",
    url: "https://github.com/nikhil-chdry",
    icon: Github,
    stat: "30+ repos",
  },
  {
    name: "LinkedIn",
    handle: "/in/nikhil-chdry",
    url: "https://linkedin.com/in/nikhil-chdry",
    icon: Linkedin,
    stat: "Networking",
  },
  {
    name: "LeetCode",
    handle: "@nikhilsunda",
    url: "https://leetcode.com/",
    icon: Trophy,
    stat: "350+ solved",
  },
  {
    name: "GeeksforGeeks",
    handle: "@nikhilsunda",
    url: "https://geeksforgeeks.org/",
    icon: Brain,
    stat: "Active contributor",
  },
];

/* ============ PAGE ============ */
function Portfolio() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Achievements />
        <Profiles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ============ NAV ============ */
function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-nav">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-3.5">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 font-bold tracking-tight"
        >
          <span className="w-8 h-8 rounded-lg bg-white/60 backdrop-blur grid place-items-center text-sm text-[#1e3a5f] shadow-sm">
            NS
          </span>
          <span className="hidden sm:inline text-[#1e3a5f]">Nikhil Sunda</span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all ${
                active === n.id
                  ? "text-[#1e3a5f]"
                  : "text-[#1e3a5f]/65 hover:text-[#1e3a5f]"
              }`}
            >
              {active === n.id && (
                <motion.span
                  layoutId="navpill"
                  className="absolute inset-0 bg-white/70 rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{n.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => go("contact")}
          className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1e3a5f] text-white text-sm font-medium hover:bg-[#2c6fa3] transition-colors"
        >
          Let's talk <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          className="lg:hidden p-2 rounded-lg text-[#1e3a5f]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-5 h-0.5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass-strong mx-4 mb-3 rounded-2xl"
          >
            <div className="p-3 flex flex-col">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium ${
                    active === n.id
                      ? "bg-white/60 text-[#1e3a5f]"
                      : "text-[#1e3a5f]/80"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============ HERO ============ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center pt-28 pb-20 px-5 md:px-8"
    >
      <motion.div
        style={{ y }}
        className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs font-medium text-[#1e3a5f] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </motion.div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] archivo-black-regular"
          >
            <span className="block text-[#1e3a5f]">Hi, I'm</span>
            <span className="block text-gradient">Nikhil Sunda</span>
          </h1>

          <p className="mt-5 text-lg md:text-xl text-[#1e3a5f]/80 font-medium">
            Full-Stack Developer · MERN Stack · AI Enthusiast
          </p>
          <p className="mt-4 max-w-xl text-[#1e3a5f]/70 leading-relaxed">
           Final-year B.Tech student at IIIT Bhubaneswar, passionate about transforming ideas into production-grade software through full-stack development,
            AI/ML engineering, and modern backend architectures, with experience in building recommendation systems, business platforms, and intelligent applications.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/nikhil_sunda_resume.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1e3a5f] text-white font-medium shadow-lg shadow-[#1e3a5f]/20 hover:bg-[#2c6fa3] transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong text-[#1e3a5f] font-medium hover:-translate-y-0.5 transition-all"
            >
              <Mail className="w-4 h-4" /> Contact me
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5 text-[#1e3a5f]/70">
            <a
              href="https://github.com/nikhil-chdry"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#1e3a5f] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/nikhil-chdry"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#1e3a5f] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:nikhilsunda42@gmail.com"
              className="hover:text-[#1e3a5f] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Right: profile portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="relative float">
            {/* halo */}
            <div className="absolute -inset-8 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-white/70 via-[#C7E6F7]/60 to-[#7FC6E8]/40 blur-xl" />

            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow-ring bg-gradient-to-br from-[#C7E6F7] to-[#7FC6E8]">
              {/* Replace /profile.jpg with your photo */}
              <img
                src="/profile.jpg"
                alt="Nikhil Sunda"
                className="w-full h-full object-cover"
              />
            </div>

            {/* floating chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -left-4 glass px-3 py-2 rounded-2xl text-xs font-semibold text-[#1e3a5f] flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5" /> MERN
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-2 -right-4 glass px-3 py-2 rounded-2xl text-xs font-semibold text-[#1e3a5f] flex items-center gap-1.5"
            >
              <Brain className="w-3.5 h-3.5" /> AI / ML
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute top-1/2 -right-10 glass px-3 py-2 rounded-2xl text-xs font-semibold text-[#1e3a5f] flex items-center gap-1.5"
            >
              <Rocket className="w-3.5 h-3.5" /> Builder
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============ SECTION WRAPPERS ============ */
function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#2c6fa3] mb-3">
        {kicker}
      </p>
      <h2
        className="text-3xl md:text-5xl font-extrabold text-[#1e3a5f] tracking-tight archivo-black-regular"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[#1e3a5f]/70 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}

/* ============ ABOUT ============ */
function About() {
  const cards = [
    {
      icon: Code2,
      title: "Full-Stack Engineer",
      desc: "Building MERN apps end-to-end — from intuitive UI to robust APIs and data layers.",
    },
    {
      icon: Brain,
      title: "AI Curious",
      desc: "Recommendation engines, NLP and ML systems shipped into real-world products.",
    },
    {
      icon: Rocket,
      title: "Shipping Mindset",
      desc: "I value clean architecture, performance, and a relentless focus on user experience.",
    },
  ];
  return (
    <section id="about" className="relative py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="01 · About"
          title="A builder, learner, and tinkerer"
          subtitle="Final-year B.Tech (EEE) at IIIT Bhubaneswar — passionate about software, MERN, and AI."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="glass p-7"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/70 grid place-items-center text-[#2c6fa3] mb-4 shadow-sm">
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#1e3a5f]">{c.title}</h3>
              <p className="mt-2 text-sm text-[#1e3a5f]/75 leading-relaxed">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SKILLS ============ */
function Skills() {
  return (
    <section id="skills" className="relative py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="02 · Skills"
          title="My technical toolkit"
          subtitle="Languages, frameworks and tools I use to ship production-ready software."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass p-5 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/70 grid place-items-center text-[#2c6fa3] group-hover:scale-110 transition-transform">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#1e3a5f] text-sm">
                    {s.name}
                  </p>
                  <p className="text-xs text-[#1e3a5f]/60">{s.level}%</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.1,
                    delay: 0.2 + i * 0.05,
                    ease: "easeOut",
                  }}
                  className="h-full bg-gradient-to-r from-[#2c6fa3] to-[#7FC6E8] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ HORIZONTAL SCROLLER (shared) ============ */
function HScroller({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({
      left: dir * (ref.current.clientWidth * 0.8),
      behavior: "smooth",
    });
  };

  // mouse drag
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false,
      startX = 0,
      startScroll = 0;
    const onDown = (e: MouseEvent) => {
      down = true;
      startX = e.pageX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent) => {
      if (!down) return;
      e.preventDefault();
      el.scrollLeft = startScroll - (e.pageX - startX);
    };
    const onUp = () => {
      down = false;
      el.style.cursor = "grab";
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="hidden md:grid absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 place-items-center glass-strong rounded-full hover:scale-110 transition-transform text-[#1e3a5f]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="hidden md:grid absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 place-items-center glass-strong rounded-full hover:scale-110 transition-transform text-[#1e3a5f]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div
        ref={ref}
        aria-label={ariaLabel}
        className="hide-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 cursor-grab"
        style={{ scrollPaddingInline: "1rem" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ============ PROJECTS ============ */
function Projects() {
  return (
    <section id="projects" className="relative py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="03 · Projects"
          title="Things I've built"
          subtitle="Drag, swipe or use the arrows — a Netflix-style showcase of recent work."
        />
        <HScroller ariaLabel="Projects">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="snap-start shrink-0 w-[85%] sm:w-[420px] glass-strong overflow-hidden flex flex-col"
            >
              <div
                className={`relative h-44 bg-gradient-to-br ${p.gradient} grid place-items-center text-6xl`}
              >
                <span className="drop-shadow-lg">{p.emoji}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-[#1e3a5f]">{p.title}</h3>
                <p className="mt-2 text-sm text-[#1e3a5f]/75 leading-relaxed flex-1">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/60 text-[#2c6fa3]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full bg-[#1e3a5f] text-white hover:bg-[#2c6fa3] transition"
                  >
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full bg-white/70 text-[#1e3a5f] hover:bg-white transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </HScroller>
      </div>
    </section>
  );
}

/* ============ CERTIFICATES ============ */
function Certificates() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="certificates" className="relative py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          kicker="04 · Certificates"
          title="Continuous learning"
          subtitle="Tap a certificate to preview. Easily add more by editing the CERTIFICATES list."
        />
        <HScroller ariaLabel="Certificates">
          {CERTIFICATES.map((c, i) => (
            <motion.button
              key={c.title}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="snap-start shrink-0 w-[80%] sm:w-[340px] glass-strong overflow-hidden text-left"
            >
              <div className="h-40 bg-gradient-to-br from-[#C7E6F7] via-[#A9DCF1] to-[#7FC6E8] grid place-items-center text-6xl">
                {c.emoji}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#1e3a5f]">{c.title}</h3>
                <p className="text-sm text-[#1e3a5f]/70 mt-1">{c.org}</p>
                <p className="text-xs text-[#1e3a5f]/55 mt-1 font-mono">
                  {c.date}
                </p>
              </div>
            </motion.button>
          ))}
        </HScroller>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1e3a5f]/60 backdrop-blur-md grid place-items-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative w-full max-w-2xl glass-strong p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 grid place-items-center text-[#1e3a5f] hover:bg-white"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="h-60 bg-gradient-to-br from-[#C7E6F7] via-[#A9DCF1] to-[#7FC6E8] rounded-2xl grid place-items-center text-8xl mb-5">
                {CERTIFICATES[active].emoji}
              </div>
              <h3 className="text-2xl font-bold text-[#1e3a5f]">
                {CERTIFICATES[active].title}
              </h3>
              <p className="text-[#1e3a5f]/75 mt-1">
                {CERTIFICATES[active].org} · {CERTIFICATES[active].date}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============ ACHIEVEMENTS ============ */
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}+</span>;
}

function Achievements() {
  return (
    <section id="achievements" className="relative py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader kicker="05 · Achievements" title="A few numbers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/70 grid place-items-center text-[#2c6fa3] mb-3">
                <a.icon className="w-5 h-5" />
              </div>
              <p
                className="text-4xl font-extrabold text-gradient archivo-black-regular"
              >
                <Counter to={a.value} />
              </p>
              <p className="text-sm text-[#1e3a5f]/70 mt-1">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PROFILES ============ */
function Profiles() {
  return (
    <section id="profiles" className="relative py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader kicker="06 · Profiles" title="Find me online" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROFILES.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass p-6 group block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/70 grid place-items-center text-[#1e3a5f] group-hover:scale-110 transition-transform">
                  <p.icon className="w-5 h-5" />
                </div>
                <ExternalLink className="w-4 h-4 text-[#1e3a5f]/40 group-hover:text-[#1e3a5f] transition" />
              </div>
              <h3 className="font-semibold text-[#1e3a5f]">{p.name}</h3>
              <p className="text-xs text-[#1e3a5f]/65 mt-0.5">{p.handle}</p>
              <p className="text-xs text-[#2c6fa3] font-medium mt-3">
                {p.stat}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT ============ */
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setState("loading");
    // Simulate backend round-trip. Wire this to your Node/Express + MongoDB endpoint when ready.
    await new Promise((r) => setTimeout(r, 900));
    setState("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setState("idle"), 4000);
  };

  return (
    <section id="contact" className="relative py-24 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          kicker="07 · Contact"
          title="Let's build something"
          subtitle="Have a role, a project, or just want to say hi? My inbox is always open."
        />
        <div className="grid md:grid-cols-5 gap-5">
          <div className="md:col-span-2 glass p-7 space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/70 grid place-items-center text-[#2c6fa3]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#1e3a5f]/60 font-mono">
                  Email
                </p>
                <a
                  href="mailto:nikhilsunda42@gmail.com"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#2c6fa3]"
                >
                  nikhilsunda42@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/70 grid place-items-center text-[#2c6fa3]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#1e3a5f]/60 font-mono">
                  Phone
                </p>
                <a
                  href="tel:+919799963897"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#2c6fa3]"
                >
                  +91 97999 63897
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/70 grid place-items-center text-[#2c6fa3]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#1e3a5f]/60 font-mono">
                  Location
                </p>
                <p className="text-sm font-medium text-[#1e3a5f]">
                  IIIT Bhubaneswar, India
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={submit}
            className="md:col-span-3 glass-strong p-7 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                maxLength={80}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                maxLength={120}
              />
            </div>
            <Field
              label="Subject"
              value={form.subject}
              onChange={(v) => setForm({ ...form, subject: v })}
              maxLength={120}
            />
            <Field
              label="Message"
              textarea
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              maxLength={1000}
            />

            {error && (
              <p className="text-xs text-red-600 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1e3a5f] text-white font-medium hover:bg-[#2c6fa3] transition disabled:opacity-60"
            >
              {state === "loading" ? (
                "Sending…"
              ) : (
                <>
                  Send message <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <AnimatePresence>
              {state === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-emerald-700 font-medium"
                >
                  ✨ Message sent — I'll get back to you soon!
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  maxLength?: number;
}) {
  const common =
    "w-full px-4 py-3 rounded-xl bg-white/60 border border-white/70 text-[#1e3a5f] placeholder-[#1e3a5f]/40 outline-none focus:bg-white/85 focus:border-[#2c6fa3]/40 transition text-sm";
  return (
    <label className="block">
      <span className="text-xs font-medium text-[#1e3a5f]/70 uppercase tracking-wider font-mono">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={5}
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${common} mt-1.5 resize-none`}
        />
      ) : (
        <input
          type={type}
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${common} mt-1.5`}
        />
      )}
    </label>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="relative px-5 md:px-8 pb-10">
      <div className="max-w-7xl mx-auto glass px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#1e3a5f]/70">
        <p>
          © {new Date().getFullYear()} Nikhil Sunda · Designed & built with
          care.
        </p>
        <p className="font-mono">
          Crafted with React · Framer Motion · Tailwind
        </p>
      </div>
    </footer>
  );
}
