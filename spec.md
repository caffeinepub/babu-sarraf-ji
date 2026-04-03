# Specification

## Summary
**Goal:** Add an animated SVG Focus Tree inside the Pomodoro timer circle that grows as the session progresses, and a Forest Mode that tracks daily completed focus sessions below the timer on the dashboard.

**Planned changes:**
- Create a new `FocusTree` React component that renders a minimal geometric SVG tree with a soft green neon glow, centered behind the timer digits inside the progress ring
- Implement five growth stages (seed → small plant → medium plant → branched tree → fully grown tree) based on a `progress` prop (0–100), with smooth CSS/SVG transitions between stages
- Wire `FocusTree` to the Pomodoro timer state: tree grows in real time during focus sessions, freezes when paused, resets to seed on timer reset, and does not grow during break sessions
- Integrate `FocusTree` into `ProgressRing.tsx`, layered behind countdown digits; do not render it in Streamer Mode (280px variant) or Study Mode
- Apply responsive sizing so the tree is slightly smaller on mobile and larger on desktop, always centered inside the timer circle
- Implement Forest Mode: each completed focus session (not break) adds one tree icon to a display area below the timer showing the daily count (e.g., "Today's Forest: 🌲🌲🌲 3 trees"), persisted in localStorage with a date key that auto-resets on a new calendar day
- Hide Forest Mode in Streamer Mode, Study Mode, and on any route other than the dashboard (`/`)
- Ensure all new UI elements follow the existing dark study theme: dark backgrounds, light text, soft green (#22c55e / #4ade80) glow, no displacement of existing controls or text

**User-visible outcome:** Users see a minimal animated tree growing inside the timer circle as their focus session progresses, and a Forest section below the timer that accumulates tree icons for each completed session throughout the day, motivating longer study streaks.
