# 🏥 Swasthya Queue (स्वास्थ्य कतार)

> **Shorter Queues, Healthier Villages, Every Single Camp.**  
> A lightweight digital token and follow-up management platform tailored for rural health camps and Primary Health Centres (PHCs) across India. Built for Smart India Hackathon (SIH) 2026.

---

## 🌟 Overview

Rural health camps frequently struggle with overcrowded waiting areas, lack of predictable wait times, and missed follow-up appointments. **Swasthya Queue** bridges this gap with an ultra-accessible, SMS-first queue management system designed specifically for ground-level healthcare workers (ASHA / ANM) and rural citizens.

### ✨ Key Features

- **🎟️ Instant Token Queue**: Real-time queue progress bar and token tracking.
- **📱 SMS & Offline-Friendly**: Works seamlessly over basic SMS — no smartphone or active mobile data needed for patients.
- **🌐 Multilingual Support**: Built-in 12+ regional Indian language switcher (Hindi, Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu).
- **📋 Smart Patient Registration**: Modal & standalone registration flows supporting verification with Aadhaar, PAN, Voter ID, Driving Licence, Kisan Yojana Card, and APAAR ID.
- **🌗 Dark / Light Mode**: High-contrast, accessible theme toggle with local persistence.
- **📊 Camp Staff Dashboard**: Glanceable metrics tracking patient flow, pending follow-ups, and common symptom distributions.
- **⚡ Zero-Dependency Performance**: Pure HTML5, modern CSS, and Vanilla JavaScript with instantaneous load times and zero build steps.

---

## 🚀 Live Deployment on Vercel

This repository is optimized for **zero-config deployment** on [Vercel](https://vercel.com).

### Option 1: One-Click Deploy via Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account.
3. Select the **`ideathon`** (or your renamed repository) repository.
4. Keep the Framework Preset as **Other** (Root Directory `./`).
5. Click **Deploy**!

### Option 2: Deploy using Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Log in and deploy
vercel
```

---

## 📁 Project Structure

```text
├── index.html            # Main landing page & interactive queue experience
├── register.html         # Dedicated patient registration page
├── vercel.json           # Vercel deployment & clean routing configuration
├── .gitignore            # Git ignore rules for clean repo hygiene
├── README.md             # Project documentation
└── idea/                 # Prototype source files & design variations
    ├── register.html
    ├── swasthya-queue-standalone.html
    └── swasthya-queue (2).html
```

---

## 💻 Local Development

No package installation or build step is required! You can run it with any of the following methods:

### Method 1: Open Directly in Browser
Double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Using VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html` and choose **"Open with Live Server"**.

### Method 3: Using Python or Node
```bash
# Using Python 3
python -m http.server 3000

# OR using npx serve
npx serve .
```
Then visit `http://localhost:3000` in your browser.

---

## 📤 Pushing to GitHub

To push this repository to your GitHub account:

1. Create a new repository on [GitHub](https://github.com/new) (e.g., `swasthya-queue`).
2. Run the following commands in your terminal:

```bash
# Add your GitHub repository as the origin remote
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# Rename default branch to main (if not already main)
git branch -M main

# Push code to GitHub
git push -u origin main
```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
