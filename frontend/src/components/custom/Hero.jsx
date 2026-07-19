import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, (v) => v - 250);
  const glowY = useTransform(mouseY, (v) => v - 250);

  useEffect(() => {
    const id = setInterval(() => setDestIndex((i) => (i + 1) % destinations.length), 2200);
    return () => clearInterval(id);
  }, []);

  const baseBg = isDark ? '#030712' : '#ffffff';

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
    >
      {/* Base background */}
      <div className="absolute inset-0" style={{ background: baseBg }} />

      {isDark && (
        <>
          {/* Aurora orb — blue */}
          <motion.div
            className="absolute rounded-full"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', width: 700, height: 700, top: '-20%', left: '-10%', filter: 'blur(80px)', opacity: 0.55 }}
            animate={{ x: [0, 140, -60, 0], y: [0, 80, -100, 0], scale: [1, 1.15, 0.92, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Aurora orb — violet */}
          <motion.div
            className="absolute rounded-full"
            style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', width: 650, height: 650, top: '5%', right: '-15%', filter: 'blur(90px)', opacity: 0.50 }}
            animate={{ x: [0, -110, 70, 0], y: [0, 130, -70, 0], scale: [1, 0.9, 1.2, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          />
          {/* Aurora orb — pink */}
          <motion.div
            className="absolute rounded-full"
            style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', width: 550, height: 550, bottom: '-15%', left: '25%', filter: 'blur(100px)', opacity: 0.40 }}
            animate={{ x: [0, -90, 110, 0], y: [0, -110, 60, 0], scale: [1, 1.3, 0.85, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
          />
          {/* Cyan accent */}
          <motion.div
            className="absolute rounded-full"
            style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', width: 350, height: 350, top: '40%', left: '60%', filter: 'blur(80px)', opacity: 0.25 }}
            animate={{ x: [0, 60, -40, 0], y: [0, -80, 40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          {/* Mouse glow */}
          <motion.div
            className="absolute pointer-events-none hidden md:block"
            style={{ left: glowX, top: glowY, width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)', borderRadius: '50%' }}
          />
          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-white"
                style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.25 }}
                animate={{ y: [0, -40, 0], opacity: [0.25, 0.65, 0.25] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 py-24 max-w-5xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full mb-8 border shadow-lg ${
            isDark
              ? 'bg-white/8 text-white/90 border-white/15 shadow-black/30'
              : 'bg-violet-50 text-violet-700 border-violet-200/80 shadow-violet-100'
          }`}>
            <Sparkles className={`h-4 w-4 ${isDark ? 'text-violet-400' : 'text-violet-500'}`} />
            Powered by Groq AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className={`font-extrabold text-5xl md:text-6xl lg:text-8xl leading-[1.08] mb-5 tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Plan Your Dream
          <br />
          <span className={isDark ? 'text-white/60' : 'text-gray-500'}>Trip to </span>
          <span className="inline-block relative" style={{ minWidth: '260px' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={destIndex}
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -28, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent"
              >
                {destinations[destIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
            isDark ? 'text-white/50' : 'text-gray-500'
          }`}
        >
          Tell us your destination, budget, and travel style —{' '}
          <span className={`font-medium ${isDark ? 'text-white/80' : 'text-gray-800'}`}>
            our AI builds a personalized day-by-day itinerary
          </span>{' '}
          just for you.
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mb-14">
          <Link to="/create-trip">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-bold px-10 py-4 text-lg rounded-2xl shadow-2xl shadow-violet-500/30 transition-shadow"
            >
              <span className="relative z-10">Start Planning — It&apos;s Free</span>
              <Sparkles className="h-5 w-5 relative z-10" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
              />
            </motion.button>
          </Link>
          <p className={`mt-4 text-sm ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
            No signup required · Free forever
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-16"
        >
          {stats.map((s, i) => (
            <div key={i} className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
              <span className="text-violet-500">{s.icon}</span>
              <span className={isDark ? 'text-white/80' : 'text-gray-700'}>{s.label}</span>
              {i < stats.length - 1 && <span className={`ml-6 hidden sm:inline ${isDark ? 'text-white/15' : 'text-gray-200'}`}>|</span>}
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <TiltCard
              key={i}
              className={`rounded-2xl p-5 text-left cursor-default shadow-xl transition-colors ${
                isDark
                  ? 'bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 shadow-black/30'
                  : 'bg-white border border-gray-100 hover:border-violet-200 shadow-violet-50'
              }`}
            >
              <div className="mb-3 text-violet-500">{f.icon}</div>
              <h3 className={`font-bold text-sm ${isDark ? 'text-white/90' : 'text-gray-800'}`}>{f.title}</h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-white/45' : 'text-gray-400'}`}>{f.desc}</p>
            </TiltCard>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade (dark only) */}
      {isDark && <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />}
    </div>
  );
}

export default Hero;
