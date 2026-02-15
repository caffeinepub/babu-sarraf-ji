import { useEffect } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { useAudio } from '../../hooks/useAudio';
import { Music } from 'lucide-react';

export default function MusicControls() {
  const [musicEnabled, setMusicEnabled] = useLocalStorageState('musicEnabled', false);
  const musicAudio = useAudio('/assets/audio/lofi.mp3', true);

  useEffect(() => {
    if (musicEnabled) {
      musicAudio.play();
    } else {
      musicAudio.pause();
    }
  }, [musicEnabled]);

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Background Music
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-muted-foreground" />
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Lo-fi Music</label>
            <p className="text-xs text-muted-foreground">Relaxing background music</p>
          </div>
        </div>
        <button
          onClick={() => setMusicEnabled(!musicEnabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            musicEnabled ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
              musicEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
