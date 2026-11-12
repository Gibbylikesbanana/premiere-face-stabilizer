# Premiere Face Stabilizer

A Premiere Pro UXP panel that will let an editor select a face in the first
frame, track it through a clip, and apply smoothed transform keyframes.

## Status

This repository contains the UI and tracking pipeline skeleton. The adapter
already validates the active project, sequence, and single selected video
clip. Premiere-specific frame access and transform-keyframe application are
isolated in `src/premiere-adapter.js`.

## Local setup on macOS

1. Install Premiere Pro 26 and the UXP Developer Tool from Creative Cloud.
2. In Premiere Pro, enable **Settings > Plugins > Enable developer mode**, then
   restart Premiere Pro.
3. Install Node.js 18 or newer.
4. Open **Terminal** and run these commands from the project folder:

   ```sh
   cd /path/to/premiere-face-stabilizer
   npm install
   npm run dev
   ```

   Keep this Terminal window open. The `npm run dev` command continuously
   rebuilds the plugin.

5. Open UXP Developer Tool, choose **Add plugin**, select:

   ```
   /path/to/premiere-face-stabilizer/dist/manifest.json
   ```

   Click **Load**, then open the panel from Premiere's **Window > UXP
   Plugins > Face Stabilizer** menu.

`npm run dev` rebuilds `dist/` when source files change. UXP Developer Tool
loads `dist/manifest.json`, not `public/manifest.json`.

### Troubleshooting

- **`npm: command not found`**: install Node.js LTS, close Terminal, open a
  new Terminal window, and run `node -v` and `npm -v`.
- **`dist/manifest.json` does not exist**: run `npm install`, then
  `npm run build` once. Use the `dist/manifest.json` file, not the repository
  folder.
- **The panel is not visible**: confirm developer mode is enabled, restart
  Premiere Pro, and load the manifest again in UXP Developer Tool.
- **The panel opens but buttons show errors**: installation succeeded. Face
  detection and transform-keyframe writing are not implemented yet; the
  current build only verifies the selected Premiere clip and displays the
  panel workflow.

## MVP workflow

1. Select one video clip in the active sequence.
2. Open the panel and choose **Select face**.
3. Drag a rectangle around the face in the first frame.
4. Run tracking.
5. Apply smoothed position, scale, and optional rotation keyframes.

The tracker consumes normalized face centers and sizes, so the tracking
implementation can later be backed by a native macOS helper, a UXP hybrid
module, or another approved frame-analysis service without changing the UI or
smoothing code.

## Project layout

- `public/manifest.json` - source UXP panel manifest.
- `dist/manifest.json` - generated manifest loaded by UXP Developer Tool.
- `index.html`, `src/panel.js`, `src/styles.css` - panel UI.
- `src/smoothing.js` - deterministic transform smoothing utilities.
- `src/tracker.js` - tracker interface and selection validation.
- `src/premiere-adapter.js` - Premiere integration boundary.
