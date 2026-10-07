# Private source / public build migration

## Target architecture

1. Private source repository
   - editable HTML/CSS/JS
   - development data
   - development documentation
   - unpublished rider-cafe records
2. Build pipeline
   - creates `dist/`
   - removes development/docs/build sources
   - minifies executable JS
   - checks that known DEV-only café data is absent
3. Public delivery
   - only contents of `dist/`
4. Important DB
   - move rider-cafe master data to API
   - public frontend receives only records required for the request

## Security boundary

Minification/build output is not encryption. Any HTML/CSS/JS/data sent to a browser can be retrieved by the user.
Actual protection of valuable datasets or logic requires keeping them server-side and exposing only an API response.

## Current transition

The existing production site stays online while the private source repository is prepared.
Do not delete or privatize the current production repository until the replacement deployment has been verified.
