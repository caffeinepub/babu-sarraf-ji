import { useEffect, useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallAppBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // Don't show if dismissed this session
    if (isDismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isDismissed]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsVisible(false);
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.error('[PWA] Install prompt error:', err);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    setDeferredPrompt(null);
  };

  if (!isVisible || !deferredPrompt) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
      role="banner"
      aria-label="Install Focus Babu app"
    >
      <div
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a0a1a]/95 px-4 py-3 shadow-2xl backdrop-blur-md"
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        {/* App icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/20">
          <img
            src="/assets/generated/focus-babu-favicon.dim_64x64.png"
            alt="Focus Babu"
            className="h-8 w-8 rounded-lg object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.setProperty('display', 'flex');
            }}
          />
          <Smartphone className="hidden h-5 w-5 text-orange-400" />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight text-white">
            Install Focus Babu
          </p>
          <p className="mt-0.5 text-xs leading-tight text-white/50">
            Add to home screen for the best experience
          </p>
        </div>

        {/* Install button */}
        <button
          onClick={handleInstall}
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-orange-400 active:scale-95"
          aria-label="Install app"
        >
          <Download className="h-3.5 w-3.5" />
          Install
        </button>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
          aria-label="Dismiss install prompt"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
