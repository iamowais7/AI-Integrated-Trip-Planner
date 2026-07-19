import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '../ui/button';
import { Sparkles, MapPin, Clock, Wallet, Zap, Globe, Star } from 'lucide-react';

const features = [
  { icon: <Sparkles className="h-5 w-5" />, title: 'AI-Powered', desc: 'Smart itineraries in seconds' },
  { icon: <MapPin className="h-5 w-5" />, title: 'Any Destination', desc: 'Anywhere in the world' },
  { icon: <Clock className="h-5 w-5" />, title: 'Day-by-Day Plan', desc: 'Detailed daily schedules' },
  { icon: <Wallet className="h-5 w-5" />, title: 'Budget Friendly', desc: 'Plans for every budget' },
];

const stats = [
  { icon: <Zap className="h-4 w-4" />, label: '10K+ Trips Planned' },
  { icon: <Globe className="h-4 w-4" />, label: '190+ Countries' },
  { icon: <Star className="h-4 w-4" />, label: '100% Free' },
];

const destinations = ['Paris', 'Tokyo', 'Bali', 'Dubai', 'Rome', 'Maldives', 'New York', 'Santorini'];

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.8,
  duration: Math.random() * 8 + 8,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.5 + 0.2,
}));

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 8);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.06, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Hero() {
  const [destIndex, setDestIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, (v) => v - 250);
  const glowY = useTransform(mouseY, (v) => v - 250);

  useEffect(() => {
    const id = setInterval(() => setDestIndex((i) => (i + 1) % destinations.length), 2200);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Aurora orb — blue */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          width: 700,
          height: 700,
          top: '-20%',
          left: '-10%',
          filter: 'blur(80px)',
          opacity: 0.55,
        }}
        animate={{ x: [0, 140, -60, 0], y: [0, 80, -100, 0], scale: [1, 1.15, 0.92, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora orb — violet */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          width: 650,
          height: 650,
          top: '5%',
          right: '-15%',
          filter: 'blur(90px)',
          opacity: 0.5,
        }}
        animate={{ x: [0, -110, 70, 0], y: [0, 130, -70, 0], scale: [1, 0.9, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Aurora orb — pink */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          width: 550,
          height: 550,
          bottom: '-15%',
          left: '25%',
          filter: 'blur(100px)',
          opacity: 0.4,
        }}
        animate={{ x: [0, -90, 110, 0], y: [0, -110, 60, 0], scale: [1, 1.3, 0.85, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />

      {/* Cyan accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          width: 350,
          height: 350,
          top: '40%',
          left: '60%',
          filter: 'blur(80px)',
          opacity: 0.25,
        }}
        animate={{ x: [0, 60, -40, 0], y: [0, -80, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,80,255,0.15),transparent)]" />

      {/* Mouse-follow glow */}
      <motion.div
        className="absolute pointer-events-none hidden md:block"
        style={{
          left: glowX,
          top: glowY,
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
          borderRadius: '50%',
        }}
      />

      {/* Stars / particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ y: [0, -40, 0], opacity: [p.opacity, p.opacity * 2.5, p.opacity] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 py-24 max-w-5xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-md text-white/90 text-sm font-medium px-5 py-2 rounded-full mb-8 border border-white/15 shadow-lg shadow-black/30">
            <Sparkles className="h-4 w-4 text-violet-400" /> Powered by Groq AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-extrabold text-5xl md:text-6xl lg:text-8xl text-white leading-[1.08] mb-5 tracking-tight"
        >
          Plan Your Dream
          <br />
          <span className="text-white/60">Trip to </span>
          <span className="inline-block relative" style={{ minWidth: '260px' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={destIndex}
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -28, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block bg-gradient-to-r from-violet-400 via-pink-400 to-yellow-300 bg-clip-text text-transparent"
              >
                {destinations[destIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Tell us your destination, budget, and travel style —{' '}
          <span className="text-white/80 font-medium">our AI builds a personalized day-by-day itinerary</span> just for you.
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mb-14">
          <Link to="/create-trip">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-bold px-10 py-4 text-lg rounded-2xl shadow-2xl shadow-violet-900/50 transition-shadow"
            >
              <span className="relative z-10">Start Planning — It&apos;s Free</span>
              <Sparkles className="h-5 w-5 relative z-10" />
              {/* Shimmer */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
              />
            </motion.button>
          </Link>

          <p className="mt-4 text-white/35 text-sm">No signup required · Free forever</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-16"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-white/60 text-sm font-medium">
              <span className="text-violet-400">{s.icon}</span>
              <span className="text-white/80">{s.label}</span>
              {i < stats.length - 1 && <span className="ml-6 text-white/15 hidden sm:inline">|</span>}
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <TiltCard
              key={i}
              className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 text-white text-left cursor-default shadow-xl shadow-black/30 hover:border-white/20 transition-colors"
            >
              <div className="mb-3 text-violet-400">{f.icon}</div>
              <h3 className="font-bold text-sm text-white/90">{f.title}</h3>
              <p className="text-white/45 text-xs mt-1 leading-relaxed">{f.desc}</p>
            </TiltCard>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

export default Hero;
