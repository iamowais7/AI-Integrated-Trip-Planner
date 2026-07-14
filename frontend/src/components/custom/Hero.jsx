import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Sparkles, MapPin, Clock, Wallet } from 'lucide-react';

const features = [
  { icon: <Sparkles className="h-5 w-5" />, title: 'AI-Powered', desc: 'Smart itineraries in seconds' },
  { icon: <MapPin className="h-5 w-5" />, title: 'Any Destination', desc: 'Anywhere in the world' },
  { icon: <Clock className="h-5 w-5" />, title: 'Day-by-Day Plan', desc: 'Detailed daily schedules' },
  { icon: <Wallet className="h-5 w-5" />, title: 'Budget Friendly', desc: 'Plans for every budget' },
];

function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500 dark:from-blue-900 dark:via-violet-900 dark:to-pink-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

      {/* Floating blobs */}
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-pink-400/20 blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 text-center px-6 py-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/30">
            <Sparkles className="h-4 w-4" /> Powered by Groq AI
          </span>

          <h1 className="font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Plan Your Dream Trip{' '}
            <span className="text-yellow-300 block">in Seconds</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Tell us your destination, budget, and travel style — our AI builds a personalized day-by-day itinerary just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/create-trip">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-6 text-lg rounded-xl shadow-2xl shadow-yellow-400/30 transition-all hover:scale-105">
                Start Planning — It's Free
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {features.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-white text-left hover:bg-white/20 transition-all">
              <div className="mb-3 text-yellow-300">{f.icon}</div>
              <h3 className="font-bold text-sm">{f.title}</h3>
              <p className="text-white/70 text-xs mt-1">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <img
            src="/pic.jpg"
            alt="Travel destinations"
            className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl shadow-black/40 border border-white/20"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
