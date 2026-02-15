# Specification

## Summary
**Goal:** Let signed-in users customize and persist a per-account background image for the Home/Dashboard page ("/") with upload and reset, without affecting other routes (especially "/timer").

**Planned changes:**
- Add a clean, minimal control section on the Dashboard ("/") with two buttons labeled exactly “Change Background” and “Reset to Default”, responsive for mobile.
- Implement image selection via native file picker from “Change Background”, validating that the chosen file is an image and showing clear English errors on invalid files or save failures.
- Apply the selected image only on "/" as a full-viewport background (cover + centered) with a slight dark overlay to preserve readability of existing content.
- Ensure "/timer" remains unchanged in all modes (including Streamer Mode and transparent background behavior) and receives no new UI from this feature.
- Persist background per Internet Identity user: signed-in users save/restore their background; signed-out users see the default background and are prompted in English to sign in when attempting change/reset.
- Add backend (single Motoko actor) methods to get/set/clear the caller’s background image (stored per principal) using existing blob storage patterns used for community post images.
- Wire UI to backend using existing React Query patterns (actor availability checks, cache invalidation) so background state loads on Dashboard visit and updates immediately after upload/reset.

**User-visible outcome:** On the Dashboard ("/"), signed-in users can upload a background image and later reset it to default; their choice is restored automatically on return. Signed-out users keep the default background and are prompted to sign in if they try to change or reset it. The Timer page ("/timer") is unaffected.
