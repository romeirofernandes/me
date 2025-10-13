import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, MapPin } from 'lucide-react';

export default function LocationPermission({ onAllow, onDeny }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasResponded = localStorage.getItem('cursor-location-permission');
    if (!hasResponded) {
      setIsVisible(true);
    }
  }, []);

  const handleAllow = () => {
    localStorage.setItem('cursor-location-permission', 'allowed');
    setIsVisible(false);
    onAllow();
  };

  const handleDeny = () => {
    localStorage.setItem('cursor-location-permission', 'denied');
    setIsVisible(false);
    onDeny();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-xl shadow-2xl p-6 animate-scale-in">
        <button
          onClick={handleDeny}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Share Your Location</h2>
        </div>
        
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          See where other visitors are from! Your city and country will be displayed when others hover over your cursor. No precise coordinates are stored.
        </p>
        
        <div className="flex gap-3">
          <Button
            onClick={handleAllow}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Allow Location
          </Button>
          <Button
            onClick={handleDeny}
            variant="outline"
            className="flex-1"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
}