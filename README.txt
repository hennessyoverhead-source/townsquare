TownSquare profile navigation corrective update

Fixes the regression in the September 15 consolidated build where profile tabs
such as About, Friends, Photos and Videos appeared not to work.

Cause:
The consolidated stylesheet omitted the global [hidden] rule. Layout rules such
as .content-grid { display:grid } therefore overrode the browser's normal hidden
behavior, leaving the Posts panel visible even after another tab was selected.

Fix:
Restores:
[hidden] { display: none !important; }

Upload the CONTENTS of this ZIP to the ROOT of the existing `townsquare` repository.
Only css/styles.css is replaced. No profile content, images, search code, or other
September 15 changes are altered.
