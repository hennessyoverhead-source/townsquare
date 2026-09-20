TOWNSQUARE SCRUB FIX 10 — UNIVERSAL TRUE-CIRCLE AVATARS

Purpose:
Fix flat-sided profile/avatar rendering on Mercutio and prevent the same issue
for future character photos.

Changes:
- Main profile avatar container and image are both forced to true circles.
- Image fills the circle using object-fit: cover.
- Small composer/post/comment avatars are also forced circular.
- No profile HTML, assets, or JavaScript changed.

Preserved:
- Fix 03 universal header/mobile framing.
- Fix 06 blue active-link styling.
- Critical [hidden] behavior.
