TOWNSQUARE SCRUB FIX 20 — UNIQUE COMMENTS + COMMENT AVATARS

GLOBAL shared-JavaScript fix.

1. Generated expanded-thread comments are now unique instead of being selected
   from the old small repeating reply pool. Current TownSquare profile/business
   pages receive separate deterministic comment ranges so the generated text
   does not repeat from post to post or page to page.

2. Comments now have Facebook-style circular profile-photo texture globally.
   Where TownSquare has a real profile photo (Benvolio, Mercutio, Lord Capulet,
   Apothecary), that image is used and links to the character profile. Other
   Shakespeare/Mojave commenters receive the standard friend placeholder until
   their real profile photo exists. Existing static comments that lack an avatar
   are upgraded too.

3. Character names with real profiles are clickable in generated comments.

Preserved: comment counts, View all / Hide comments, Comment-button expansion,
Fix 17 Shakespeare-appropriate commenter names, search augmentation, and all
other shared JavaScript. No HTML or global CSS file is changed.
