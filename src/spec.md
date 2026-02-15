# Specification

## Summary
**Goal:** Expand timer color customization with additional preset themes, apply the chosen color consistently across all timer visuals, and persist the selection across reloads and Streamer Mode.

**Planned changes:**
- Add new timer color preset themes: Orange, Neon, and White, alongside existing presets (Red, Green, Blue, Purple), while keeping the custom color picker.
- Apply the selected timer color to all timer visuals: progress ring/circle, countdown (MM:SS) text, progress animation styling, and glow/drop-shadow effects (including visibility in dark mode).
- Persist the selected timer color in localStorage and restore it on reload, ensuring it remains active in Streamer Mode (including the /timer route).

**User-visible outcome:** Users can choose from more color presets (or a custom color), see the selected color reflected consistently across the timer’s ring, text, animation, and glow, and have that selection saved and automatically restored—including in Streamer Mode.
