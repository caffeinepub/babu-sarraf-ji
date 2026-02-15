interface SoundControlsProps {
  tickingEnabled: boolean;
  onTickingChange: (enabled: boolean) => void;
}

export default function SoundControls({ tickingEnabled, onTickingChange }: SoundControlsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Sound Settings
      </h3>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Ticking Sound</label>
          <p className="text-xs text-muted-foreground">Play soft ticking while timer runs</p>
        </div>
        <button
          onClick={() => onTickingChange(!tickingEnabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            tickingEnabled ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
              tickingEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          🔔 Bell sound plays automatically when sessions complete
        </p>
      </div>
    </div>
  );
}
