import { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/chat') {
      setNotification(true);
      const timer = setTimeout(() => setNotification(false), 3500);
      return () => clearTimeout(timer);
    } else {
      setOpen(false);
    }
  }, [location.pathname]);

  if (location.pathname !== '/chat') return null;

  const handleOpen = () => {
    setOpen(true);
    setNotification(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Popup */}
        {open && (
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 w-64 mb-2">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://github.com/iamowais7.png"
                alt="Owais Khan"
                referrerPolicy="no-referrer"
                className="h-12 w-12 rounded-full ring-2 ring-primary/40 object-cover"
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=Owais+Khan&background=3b82f6&color=fff&size=48';
                }}
              />
              <div>
                <p className="font-bold text-sm text-foreground">Owais Khan</p>
                <p className="text-xs text-primary font-medium">Full Stack Developer</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Built this AI Trip Planner. Check out my other projects and work!
            </p>

            <a
              href="https://owaisfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-xl hover:opacity-90 transition"
            >
              View Portfolio <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {/* Floating ball */}
        <div className="relative">
          {/* Notification badge */}
          {notification && !open && (
            <div className="absolute -top-9 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-bounce">
              Support 👋
              <div className="absolute bottom-0 right-4 translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
            </div>
          )}

          <button
            onClick={handleOpen}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-primary shadow-lg hover:scale-110 transition-all duration-300"
            title="About Developer"
          >
            <img
              src="https://github.com/iamowais7.png"
              alt="Owais Khan"
              referrerPolicy="no-referrer"
              className={`h-full w-full object-cover transition-all duration-300 ${hovered ? 'blur-0 scale-110' : 'blur-sm'}`}
              onError={(e) => {
                e.target.src = 'https://ui-avatars.com/api/?name=Owais+Khan&background=3b82f6&color=fff&size=56';
              }}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default FloatingContact;
