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

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  duration: Math.random() * 6 + 7,
  delay: Math.random() * 4,
}));

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
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
      whileHover={{ scale: 1.05 }}
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
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Hero() {
  const [destIndex, setDestIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, (v) => v - 200);
  const glowY = useTransform(mouseY, (v) => v - 200);

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
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #2563eb, #7c3aed, #db2777, #2563eb)',
          backgroundSize: '300% 300%',
          animation: 'gradientShift 12s ease infinite',
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.35)_100%)]" />

      {/* Mouse-follow glow */}
      <motion.div
        className="absolute pointer-events-none hidden md:block"
        style={{
          left: glowX,
          top: glowY,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/40"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -35, 0], opacity: [0.3, 0.8, 0.3] }}
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
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-sm font-medium px-5 py-2 rounded-full mb-8 border border-white/25 shadow-lg">
            <Sparkles className="h-4 w-4 text-yellow-300" /> Powered by Groq AI
          </span>
        </motion.div>

        {/* Headline with cycling destination */}
        <motion.h1
          variants={itemVariants}
          className="font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-4"
        >
          Plan Your Dream Trip
          <br />
          <span className="text-white/80">to </span>
          <span className="inline-block relative" style={{ minWidth: '220px' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={destIndex}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.5)]"
              >
                {destinations[destIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Tell us your destination, budget, and travel style —{' '}
          <span className="text-white font-medium">our AI builds a personalized day-by-day itinerary</span> just for you.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mb-12">
          <Link to="/create-trip">
            <Button
              size="lg"
              className="relative overflow-hidden bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-10 py-6 text-lg rounded-2xl shadow-2xl shadow-yellow-500/30 transition-all hover:scale-105 hover:shadow-yellow-400/50"
            >
              <span className="relative z-10">Start Planning — It&apos;s Free</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
              />
            </Button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-16"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <span className="text-yellow-300">{s.icon}</span>
              {s.label}
              {i < stats.length - 1 && <span className="ml-4 text-white/25 hidden sm:inline">|</span>}
            </div>
          ))}
        </motion.div>

        {/* Feature cards with 3D tilt */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {features.map((f, i) => (
            <TiltCard
              key={i}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white text-left cursor-default shadow-lg"
            >
              <div className="mb-3 text-yellow-300">{f.icon}</div>
              <h3 className="font-bold text-sm">{f.title}</h3>
              <p className="text-white/65 text-xs mt-1 leading-relaxed">{f.desc}</p>
            </TiltCard>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/30 to-transparent" />

      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default Hero;
