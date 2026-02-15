import { Home, Users, BookOpen, ClipboardList } from 'lucide-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from './ui/button';
import LoginButton from './LoginButton';
import FocusBabuLogo from './FocusBabuLogo';
import { useEffect, useState } from 'react';

export default function SiteNav() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [isStreamerMode, setIsStreamerMode] = useState(false);

  // Check if we're on /timer route and streamer mode is enabled
  useEffect(() => {
    if (currentPath === '/timer') {
      const streamerMode = localStorage.getItem('streamerMode');
      setIsStreamerMode(streamerMode === 'true');
    } else {
      setIsStreamerMode(false);
    }
  }, [currentPath]);

  // Don't render navbar at all on /timer route with streamer mode
  if (currentPath === '/timer' && isStreamerMode) {
    return null;
  }

  return (
    <nav className="w-full border-b border-border bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo on the left */}
        <FocusBabuLogo variant="navbar" />

        {/* Navigation buttons */}
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start">
          <Button
            variant={currentPath === '/' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate({ to: '/' })}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          <Button
            variant={currentPath === '/ncert' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate({ to: '/ncert' })}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">NCERT</span>
          </Button>
          <Button
            variant={currentPath === '/test-series' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate({ to: '/test-series' })}
            className="gap-2"
          >
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Test Series</span>
          </Button>
          <Button
            variant={currentPath === '/community' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigate({ to: '/community' })}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Community</span>
          </Button>
        </div>

        {/* Login button on the right */}
        <LoginButton />
      </div>
    </nav>
  );
}
