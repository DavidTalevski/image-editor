# Image Editor App

## Overview

Web app for editing and enhancing images.

Demo: https://davidtalevski.github.io/image-editor/

Note: The upscaling functionalities do not work in the demo.

## Installation

```
npm install
npm run start
```

## Functionalities

- [x] Load Image
- [X] Save Image
- [X] Image Compression
- [X] Crop
- [X] Resize
- [X] Filters
- [X] Brightness
- [X] Contrast
- [X] Action History (Undo Step)
- [X] Flip Image
- [X] Rotate Image

### Image Conversion

- [X] Convert Images (PNG, JPG, WebP)

### Upscaling

- [X] Upscale (Real-ESRGAN Model)
- [X] Add upscale options

### Advanced Features

- [X] Server Image Caching
- [X] Saving and loading a project

### To do

- [X] Loading screen when processing actions
- [X] Add options to remove all actions
- [X] Optimization to skip loading images when running history actions
- [X] Update upscale hash when loading is finished
- [X] Fix cancel button in crop and resize
- [X] Fix issues when canvas is empty and no image is loaded
- [X] Add an animation when a new history card is created
- [X] Entering resize mode causes [Violation] 'click' handler took 239ms
- [X] Add logic for selected tab
- [X] Crop or resize are selected even after canceling
- [X] Add css for upscale panel
- [X] Responsiveness
- [ ] Updating filter action while action is inactive is bugged
- [X] Clicking filter slider instead of scrolling it causes issues
- [X] Validate project files when loading