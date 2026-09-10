# 🧠 NeuroGames - Brain Teaser Quiz

A simple, interactive brain teaser quiz game built with **HTML, CSS, and JavaScript**. Perfect for testing your knowledge about neuroscience and brain puzzles!

## 📚 What is NeuroQuiz?

NeuroQuiz is an educational game that challenges players with brain teasers and neuroscience-related questions. It's designed to be:
- ✅ **Simple & Easy to Understand** - Perfect for beginners
- ✅ **Interactive & Fun** - Engaging user experience
- ✅ **Educational** - Learn about the brain and cognitive puzzles
- ✅ **Lightweight** - No complex frameworks, just HTML/CSS/JavaScript

## 🎯 Features

- Multiple choice questions about the brain and neuroscience
- Score tracking system
- Instant feedback on answers
- Progress bar to show quiz completion
- Responsive design that works on all devices
- No backend required - runs completely in your browser

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Notepad++, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devsatish05/NeuroGames.git
   cd NeuroGames
   ```

2. **Open the project**
   ```bash
   # Simply open index.html in your browser
   # Double-click: index.html
   # Or right-click → Open with → Your Browser
   ```

That's it! No installation or setup needed.

## 📁 Project Structure

```
NeuroGames/
├── index.html       # Main HTML file (UI structure)
├── style.css        # Styling (Colors, layout, animations)
├── script.js        # Game logic (Questions, scoring)
└── README.md        # This file
```

## 💻 How to Use

1. Open `index.html` in your web browser
2. Click "Start Quiz" button
3. Read each question carefully
4. Select one of the four options (A, B, C, D)
5. Click "Next" to move to the next question
6. View your final score at the end
7. Click "Restart" to play again

## 🧩 Code Explanation (For Beginners)

### HTML (index.html)
- Contains the structure of the quiz
- Buttons for navigation
- Question and answer display areas

### CSS (style.css)
- Makes the quiz look beautiful
- Responsive design for mobile and desktop
- Hover effects and animations

### JavaScript (script.js)
- Stores all quiz questions
- Keeps track of the score
- Handles button clicks
- Displays questions dynamically

## 📝 Sample Quiz Structure

```javascript
const quizQuestions = [
  {
    question: "How many neurons are in the human brain?",
    options: ["1 million", "1 billion", "86 billion", "1 trillion"],
    correct: 2
  },
  // More questions...
];
```

## 🎨 Customization Guide

### Adding New Questions

1. Open `script.js`
2. Find the `quizQuestions` array
3. Add a new question object:

```javascript
{
  question: "Your question here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 0  // 0 = First option, 1 = Second, etc.
}
```

### Changing Colors

1. Open `style.css`
2. Find color variables or color values
3. Change colors to your preference:
   - `#3498db` = Blue
   - `#e74c3c` = Red
   - `#2ecc71` = Green

### Changing Questions Count

Edit the number of questions you want in the quiz by modifying the array length.

## 📊 Expected Output

```
Question 1 of 10
━━━━━━━━━━━ 10%

How many neurons are in the human brain?

[ A ] 1 million
[ B ] 1 billion
[✓C ] 86 billion  ← Correct!
[ D ] 1 trillion

Score: 1/10
[Next →]
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| File won't open | Make sure all files (HTML, CSS, JS) are in the same folder |
| Styling looks wrong | Check if `style.css` is linked in HTML (`<link>` tag) |
| Quiz not working | Check browser console for errors (F12 → Console tab) |
| Questions not showing | Verify `quizQuestions` array is properly formatted |

## 📚 Learning Objectives

By working on this project, you'll learn:
- ✅ HTML structure and semantic elements
- ✅ CSS styling and responsive design
- ✅ JavaScript variables, arrays, and functions
- ✅ Event handling (click events)
- ✅ DOM manipulation (changing HTML content)
- ✅ Conditional statements and loops

## 🎓 For BCA Students

**This is perfect for:**
- **Semester 1**: Web Development basics
- **Lab Assignments**: Simple project requirement
- **Portfolio**: Show your foundational skills
- **Interview Practice**: Explain the code to interviewers

**Time to Complete**: 2-3 hours for beginners

## 📖 Resources for Learning

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [CSS Tricks](https://css-tricks.com/)
- [HTML5 Tutorial](https://www.w3schools.com/html/)
- [JavaScript Console Debugging](https://developer.mozilla.org/en-US/docs/Tools/Browser_Console)

## 🤝 Contributing

Want to improve NeuroGames? 
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🎉 Have Fun Learning!

Remember: Every expert was once a beginner. Don't be afraid to make mistakes and experiment with the code!

---

**Made with ❤️ for BCA Students**

