import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { Sun, Moon, Plus, Map, Phone, Bot, HelpCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useAuthStore from '@/store/authStore';
import { toast } from 'sonner';

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user, isLoggedIn, login, logout } = useAuthStore();
  const location = useLocation();

  const isHero = location.pathname === '/';
  const heroTop = isHero && !scrolled;
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On hero at top: white text on dark bg, dark text on light bg
  const navClass = (path) => {
    const isActive = location.pathname === path;
    if (heroTop && isDark) {
      return `gap-1 text-white hover:text-white hover:bg-white/15 ${isActive ? 'bg-white/15 font-semibold' : ''}`;
    }
    if (heroTop && !isDark) {
      return `gap-1 text-gray-700 hover:text-gray-900 hover:bg-black/5 ${isActive ? 'bg-violet-100 text-violet-700 font-semibold' : ''}`;
    }
    return `gap-1 ${isActive ? 'bg-primary/10 text-primary font-semibold' : ''}`;
  };

  useEffect(() => {
    if (isLoggedIn && !user) {
      useAuthStore.getState().fetchMe();
    }
  }, [isLoggedIn, user]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenRes) => {
      try {
        await login(tokenRes.access_token);
        setOpenDialog(false);
        toast.success('Logged in successfully!');
      } catch {
        toast.error('Login failed. Please try again.');
      }
    },
    onError: () => toast.error('Google login failed.'),
  });

  const handleLogout = () => {
    googleLogout();
    logout();
    toast('Logged out.');
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 px-5 py-3 flex justify-between items-center border-b transition-all duration-300 ${
        heroTop
          ? isDark
            ? 'bg-black/30 backdrop-blur-md border-white/10'
            : 'bg-white/60 backdrop-blur-md border-gray-200/60 shadow-sm'
          : 'bg-background/95 backdrop-blur-xl border-border shadow-sm'
      }`}
      animate={{ opacity: 1 }}
    >
      <Link to="/">
        <img src="/logoipsum-339.svg" className="h-8" alt="Logo" />
      </Link>

      <nav className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <Link to="/create-trip">
              <Button variant="ghost" size="sm" className={navClass('/create-trip')}>
                <Plus className="h-4 w-4" /> Create Trip
              </Button>
            </Link>
            <Link to="/my-trips">
              <Button variant="ghost" size="sm" className={navClass('/my-trips')}>
                <Map className="h-4 w-4" /> My Trips
              </Button>
            </Link>
            <Link to="/help">
              <Button variant="ghost" size="sm" className={`hidden md:flex ${navClass('/help')}`}>
                <Phone className="h-4 w-4" /> Help
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="ghost" size="sm" className={`hidden md:flex ${navClass('/chat')}`}>
                <Bot className="h-4 w-4" /> Support
              </Button>
            </Link>
            <Link to="/faqs">
              <Button variant="ghost" size="sm" className={`hidden md:flex ${navClass('/faqs')}`}>
                <HelpCircle className="h-4 w-4" /> FAQs
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                {user?.picture ? (
                  <img src={user.picture} referrerPolicy="no-referrer" className="h-8 w-8 rounded-full ring-2 ring-primary/30 cursor-pointer" alt="Profile" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold cursor-pointer">
                    {user?.name?.[0]}
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-44 p-2">
                <p className="text-sm font-medium px-2 py-1 truncate">{user?.name}</p>
                <hr className="my-1 border-border" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm px-2 py-1 rounded hover:bg-muted text-destructive"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button
            onClick={() => setOpenDialog(true)}
            size="sm"
            className={heroTop && isDark ? 'bg-white/15 text-white hover:bg-white/25 border border-white/20' : ''}
            variant={heroTop ? 'ghost' : 'default'}
          >
            Sign In
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`ml-1 ${heroTop && isDark ? 'text-white hover:bg-white/15' : ''}`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </nav>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogDescription>
              <img src="/logoipsum-339.svg" className="h-8 mb-6" alt="Logo" />
              <h2 className="font-bold text-lg text-foreground mb-1">Welcome back</h2>
              <p className="text-muted-foreground text-sm mb-5">Sign in with Google to plan your next adventure</p>
              <Button onClick={googleLogin} className="w-full flex gap-3 items-center">
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.header>
  );
}

export default Header;
