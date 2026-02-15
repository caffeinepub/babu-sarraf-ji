# Specification

## Summary
**Goal:** Add Instagram and X social icon links to the landing page header and footer with a soft glow hover effect, and ensure social elements are hidden in Streamer Mode (especially on `/timer`).

**Planned changes:**
- Add clickable Instagram and X (Twitter) icons to the footer, linking to the provided profiles, opening in a new tab with `rel="noopener noreferrer"`, with minimal modern styling, spacing, responsive layout, and a soft glow hover effect matching the dark theme.
- Add the same Instagram and X icons to the top-right area of the landing page header (near the existing header/profile area) without disrupting the centered logo/tagline, using the same styling and responsive behavior.
- Add optional follow text under the timer when Streamer Mode is off: “Follow for daily study motivation – @babu_sarraf_ji”.
- Ensure that on the `/timer` route, any social icons are automatically hidden when Streamer Mode is enabled.

**User-visible outcome:** Users see Instagram and X icons in the header and footer that open the correct profiles in a new tab with a subtle glow on hover, and Streamer Mode removes social icons (and the follow text) from the timer view for a clean overlay.
