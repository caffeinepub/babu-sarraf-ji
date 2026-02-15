import { useEffect, useState } from 'react';

interface ColorControlsProps {
  color: string;
  onColorChange: (color: string) => void;
}

const PRESET_COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Neon', value: '#00ff88' },
  { name: 'White', value: '#ffffff' },
];

export default function ColorControls({ color, onColorChange }: ColorControlsProps) {
  const [customColor, setCustomColor] = useState(color);

  // Sync custom color input when parent color changes (e.g., from localStorage restore)
  useEffect(() => {
    setCustomColor(color);
  }, [color]);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Timer Color
      </h3>

      {/* Preset Colors */}
      <div className="grid grid-cols-4 gap-2">
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => {
              onColorChange(preset.value);
              setCustomColor(preset.value);
            }}
            className={`aspect-square rounded-md border-2 transition-all hover:scale-110 ${
              color === preset.value ? 'border-foreground ring-2 ring-foreground/20' : 'border-border'
            }`}
            style={{ backgroundColor: preset.value }}
            title={preset.name}
            aria-label={`Select ${preset.name} color`}
          />
        ))}
      </div>

      {/* Custom Color Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Custom Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="h-10 w-20 rounded-md border border-input cursor-pointer"
            aria-label="Custom color picker"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => {
              const value = e.target.value;
              setCustomColor(value);
              if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                onColorChange(value);
              }
            }}
            className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm font-mono"
            placeholder="#000000"
            aria-label="Custom color hex code"
          />
        </div>
      </div>
    </div>
  );
}
