# Premiere Face Stabilizer

A Premiere Pro UXP panel that will let an editor select a face in the first
frame, track it through a clip, and apply smoothed transform keyframes.

## Status

This repository contains the UI and tracking pipeline skeleton. The
Premiere-specific frame access and transform-keyframe adapter are intentionally
isolated in `src/premiere-adapter.js`; that is the next integration point for
the installed Premiere Pro 26 SDK/API.

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

- `manifest.json` - UXP panel manifest.
- `index.html`, `src/panel.js`, `src/styles.css` - panel UI.
- `src/smoothing.js` - deterministic transform smoothing utilities.
- `src/tracker.js` - tracker interface and selection validation.
- `src/premiere-adapter.js` - Premiere integration boundary.
