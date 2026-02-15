# Specification

## Summary
**Goal:** Ensure the app consistently shows the authenticated user’s name and profile photo (with clear fallbacks) across Community and Test History, without any custom/edited usernames.

**Planned changes:**
- Add/extend a backend user profile model returned for a principal: display name, optional email, optional profile photo URL, and document the frontend fallback order (displayName → email → short principal).
- Remove any UI support for user-supplied/custom usernames and update all name/avatar rendering helpers to use only authenticated profile data and fallbacks.
- Trigger an automatic profile sync/load after Internet Identity login so the correct name/photo appear without manual refresh, and reuse the same resolved identity in Community (posts, comments, chat) and Test History.
- Update Community post/comment/chat headers to a clean, dark-mode compatible layout: avatar (if available), bold display name, timestamp, and content/message below the name line, without changing other Community behaviors.

**User-visible outcome:** After logging in, the user’s authenticated name (or fallback) and profile photo (or clean avatar fallback) automatically appear and remain consistent across Community posts/comments/chat and the Test History view, with updated Community header layouts and no editable username controls anywhere.
