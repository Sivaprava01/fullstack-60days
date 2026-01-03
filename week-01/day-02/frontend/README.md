# ⌨️ Advanced Typing Speed Test

A fully functional **typing speed test web application** inspired by platforms like **typingtest.com** and **Monkeytype**.  
Built as part of my **daily 1-hour frontend project challenge** to practice real-world React development.

This project focuses on **accuracy-first typing**, correct **WPM calculation**, and a clean, responsive UX using **React + Bootstrap**.

---

## 🚀 Features

### 🧠 Core Typing Logic
- Auto-start typing test (no submit button)
- Auto-finish when:
  - Time ends **OR**
  - Paragraph is fully typed
- Correct **WPM calculation based on actual time spent**
- Accuracy percentage based on **character-level correctness**

### 🎯 Difficulty Modes
- **Easy** – No punctuation (beginner friendly)
- **Medium** – Normal punctuation
- **Hard** – Advanced punctuation & symbols

### 🎨 Visual Feedback
- Character-by-character comparison
- Reference paragraph coloring:
  - 🟢 Green → correct character
  - 🔴 Red → incorrect character
  - ⚪ Grey → not yet typed
- Backspace correction with real-time re-evaluation

### ⏱️ Timer Controls
- 60-second test duration
- Pause / Resume
- Reset test anytime

### 🖥️ Layout & UI
- Full-screen responsive layout
- Dark theme for reduced eye strain
- Bootstrap-based clean UI
- Optimized for laptop & desktop screens

---
## WPM Calculation (Industry Standard)

The application uses the standard typing speed formula:

WPM = (Correct Characters / 5) / Time in Minutes

### Breakdown
- Correct Characters: number of characters typed correctly
- 5 characters = 1 word (industry standard)
- Time in minutes: actual time spent typing

### Why this approach is correct
- Handles early test completion correctly
- Prevents inflated WPM values
- Matches real typing platforms

### Example

If a user types 115 correct characters in 23 seconds:

- Words = 115 / 5 = 23  
- Time = 23 / 60 ≈ 0.38 minutes  
- WPM = 23 / 0.38 ≈ 60

---

## Tech Stack

- React (Hooks)
- Bootstrap 5
- JavaScript (ES6+)
- Vite

---

## Project Structure

frontend  
├── src  
│   ├── App.jsx  
│   ├── main.jsx  
│   └── index.css  
├── package.json  
└── README.md  

---

## Getting Started

### Install dependencies
npm install

### Start development server
npm run dev

### Open in browser
http://localhost:5173

---

## Learning Outcomes

- Built logic-heavy React applications
- Managed real-time input and state
- Implemented correct WPM and accuracy calculations
- Designed responsive layouts with Bootstrap

---

## Future Improvements

- Smooth paragraph scrolling
- Caret cursor indicator
- Per-word highlighting
- Results history and analytics
- Backend integration

---

## Author

Siva Prava  
Aspiring Software Engineer  
Frontend • Full-Stack • Problem Solving

If you like this project, feel free to star the repository ⭐
