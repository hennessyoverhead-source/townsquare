TownSquare Scrub Fix 22 — Character Ecosystem Deep Dive
September 22, 2026

BASE: Fix 17 (the user's currently installed comment-system base). Fixes 20 and 21 are NOT prerequisites and should NOT be installed.

INSTALL:
Upload the js folder from this ZIP to the repository root and replace js/townsquare.js. Commit the change. Then hard-refresh with Command + Shift + R.

WHAT THIS UPDATE DOES:
- Replaces the generic generated-comment filler system with hand-curated, character-specific conversations on the existing Romeo, Benvolio, Mercutio, Apothecary, and Lord Capulet posts.
- Displayed comment totals now reflect the comments actually present in each curated thread.
- Keeps preview-two / View all / Hide comments / Comment-button expansion behavior.
- Adds circular comment avatars and profile links for characters whose TownSquare profiles exist; deep-cut/minor characters use the existing placeholder avatar.
- Adds nested replies.
- Adds the 1991 Romeo ponytail/goatee throwback thread, including Juliet's heart reaction.
- Adds a Capulet Party event-page discussion.
- Adds the approved Mercutio/Tybalt/Lord C shuttle exchange and TownSquare Terms-of-Service removals.
- Uses Lady C's enthusiastic influencer voice, Nurse's warm/practical voice, Peter, Samson/Gregory, Potpan, Balthasar, Lawrence, and the established core cast voices.
- Keeps Tybalt charismatic but volatile; his moderation violations are a recurring flaw, not his entire personality.
- Keeps Lord C's affection/long-suffering relationship with Tybalt visible.

STABILITY:
- Only js/townsquare.js is changed.
- No HTML, CSS, images, profile layouts, ticket links, logos, DNS, or hosting settings are replaced.
- The existing profile tabs, lightbox, search code, business-search augmentation, and earlier fixes remain ahead of the Update 22 block unchanged.
- The critical [hidden]{display:none!important} CSS is not touched.

CREATIVE RULE:
Shakespeare's text supplies the language; the Mojave staging/rehearsal discoveries supply what that language means in this world. TownSquare hints at the adaptation rather than explaining or spoiling it.
