# ChiptuneMaker
`ChiptuneMaker` is a single-page application built with Vite, React, and TypeScript. It lets you upload any audio file in the browser, apply a retro “chiptune” style bit-crush and sample-rate conversion, preview the result in real time, and download the processed track as a WAV file.
This service is mainly realized using the following technologies:

<img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat">
<img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-HTML5-333.svg?logo=html5&style=flat">



## Features
- `Audio Upload`: Drag & drop or select WAV/MP3 files directly in the browser.
- `Bit Depth Control`: Choose bit depths between 1 and 16 bits for classic quantization noise.
- `Sample Rate Adjustment`: Set target rates from 1,000 to 44,100 Hz to introduce aliasing artifacts.
- `Real‑Time Preview`: Hear changes instantly as you tweak parameters.
- `Progress Indicator`: A progress bar shows conversion status for larger file.
- `Custom Filename`: Specify a custom filename before downloading your chiptune.

## set up
### Clone the repository
```bash:
git clone https://github.com/shoki0705/ChiptuneMaker.git
cd ChiptuneMaker
```
### Install dependancies
```bash:
npm install
```
## Development

Start the local development server with hot reload:

```bash
npm run dev
# Open http://localhost:3000 in your browser

To run on a specific port (e.g. 4000):
```bash
npm run dev -- --port 4000

## Production Build & Preview
```bash
npm run build
npm run preview
# Preview at http://localhost:4173

## Project Structure
```csharp
ChiptuneMaker/
├── public/              # Static assets (logo, sample audio)
│   └── assets/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── FileUploader.tsx
│   │   ├── ParameterSlider.tsx
│   │   ├── ProgressBar.tsx
│   │   └── AudioPlayer.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useAudioProcessor.ts
│   ├── utils/           # Helper functions (WAV encoder, download)
│   ├── App.tsx          # Main app component
│   └── main.tsx         # App entry point
├── package.json
├── tsconfig.json
└── vite.config.ts

## License
This project is released under the MIT License.

© 2025 Shoki Mitsui


