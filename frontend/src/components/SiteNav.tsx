import { Home, Users, BookOpen, ClipboardList, Target, Video, BellOff } from 'lucide-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from './ui/button';
import LoginButton from './LoginButton';
import FocusBabuLogo from './FocusBabuLogo';
import StudyRoomConfirmDialog from './studyRoom/StudyRoomConfirmDialog';
import StudyModeActivationOverlay from './studyMode/StudyModeActivationOverlay';
import { useEffect, useState } from 'react';

interface SiteNavProps {
  onEnterStudyMode?: () => void;
}

export default function SiteNav({ onEnterStudyMode }: SiteNavProps) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [isStreamerMode, setIsStreamerMode] = useState(false);
  const [showStudyRoomDialog, setShowStudyRoomDialog] = useState(false);
  const [showStudyModeOverlay, setShowStudyModeOverlay] = useState(false);

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

  const handleNavigation = (path: string) => {
    try {
      navigate({ to: path });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleStartDeepFocus = () => {
    if (onEnterStudyMode) {
      onEnterStudyMode();
    }
  };

  return (
    <>
      <nav className="w-full border-b border-border bg-card/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo on the left */}
          <FocusBabuLogo variant="navbar" />

          {/* Navigation buttons */}
          <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start flex-wrap">
            <Button
              variant={currentPath === '/' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation('/')}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            <Button
              variant={currentPath.startsWith('/ncert') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation('/ncert')}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">NCERT</span>
            </Button>
            <Button
              variant={currentPath === '/test-series' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation('/test-series')}
              className="gap-2"
            >
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Test Series</span>
            </Button>
            <Button
              variant={currentPath === '/daily-target' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation('/daily-target')}
              className="gap-2"
            >
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Daily Target</span>
            </Button>
            <Button
              variant={currentPath === '/community' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation('/community')}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Community</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStudyRoomDialog(true)}
              className="gap-2"
            >
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Study Room</span>
            </Button>
            {/* Study Mode button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStudyModeOverlay(true)}
              className="gap-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
            >
              <BellOff className="h-4 w-4" />
              <span className="hidden sm:inline">Study Mode</span>
            </Button>
          </div>

          {/* Login button on the right */}
          <LoginButton />
        </div>
      </nav>

      <StudyRoomConfirmDialog open={showStudyRoomDialog} onOpenChange={setShowStudyRoomDialog} />

      {showStudyModeOverlay && (
        <StudyModeActivationOverlay
          onClose={() => setShowStudyModeOverlay(false)}
          onStartDeepFocus={handleStartDeepFocus}
        />
      )}
    </>
  );
}
