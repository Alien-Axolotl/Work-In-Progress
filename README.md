## Ptilopsis-Recruit-Module

# Disclaimer

This is an unofficial, fan-made project. It is **not affiliated with, endorsed by, sponsored by, or in any way officially connected to** Hypergryph, Yostar, or any of their subsidiaries or affiliates. This project has no ties to the official *Arknights* game or its developers and publishers.

*Arknights* and all related names, characters, artwork, and trademarks are the property of their respective owners. Any game assets or references used here are for non-commercial, informational, or fan purposes only.

If you are a rights holder and have concerns about any content in this repository, please open an issue or contact the maintainer, and it will be addressed promptly.

# What is this?
-  A recruitment tag planner that runs 100% locally on your computer. It reads the available tags straight from your screen, so you don't have to enter them one by one on a website, no logins no data being pulled from anywhere, just your computer screen.

# Usage
- Click "Start Recruitment", open the recruitment screen, and read the stars and tags in the top-right overlay.

# How does it work? 
- Grabs the screen, finds the "Job Tags" label, reads the tag boxes, and shows the best combination in the overlay.

# Requirements
- Windows
- English Game Client
- NVIDIA GPU recommended **(runs without one, but very slowly)**

# Privacy
- Screenshots are processed in memory on your machine and never saved or sent anywhere. On first launch it downloads the OCR models once, after that it works fully offline.

# Technical 
- FastAPI , React , Electron , EasyOCR (GPU VER.), RapidOCR(CPU VER. **RECOMMENDED**)

# How to run the GPU ver? (Not Recommended)
- Have Python and Node installed
- Create the venv at the repo root (start.js looks for ..\venv)
- pip install -r backend/requirements.txt
- npm install in both frontend and electron.
- Open the terminal, go to electron directory and type "npm start"
































