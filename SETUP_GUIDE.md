# 🚀 QUICK START GUIDE - Enable GitHub Pages

## ⚡ 3-Step Setup to Play Online

### Step 1: Enable GitHub Pages
1. Go to your repo: https://github.com/devsatish05/NeuroGames
2. Click **Settings** (⚙️ gear icon)
3. In the left sidebar, click **Pages**
4. Under "Source", select **Deploy from a branch**
5. Branch: **main** | Folder: **/ (root)**
6. Click **Save**

### Step 2: Wait for Deployment
GitHub will deploy in 1-2 minutes. You'll see a green checkmark when ready.

### Step 3: Share Your Game!
Your game is now live at:
```
https://devsatish05.github.io/NeuroGames/
```

---

## 🎮 Testing Locally (Without GitHub Pages)

If you want to test before enabling Pages:

### Windows:
- Double-click `index.html`
- It opens in your default browser ✅

### Mac:
- Right-click `index.html`
- Select "Open with" → Choose your browser ✅

### Linux:
```bash
python -m http.server 8000
# Then open: http://localhost:8000
```

---

## ✅ What to See

After clicking "Start Quiz":

```
Welcome Screen (1-2 seconds)
         ↓
Question 1 with 4 options
         ↓
Immediate feedback (correct/incorrect)
         ↓
Progress bar updates
         ↓
Next question...
         ↓
After 10 questions → Results screen with badge
```

---

## 🆘 If It Still Doesn't Work

### Check 1: All Files Exist
```
index.html ✓
style.css ✓
script.js ✓
```

### Check 2: Files Are in Same Folder
Don't put them in subfolders!

### Check 3: Browser Console (Debug)
Press `F12` → Click **Console** tab
Look for any red error messages

### Check 4: Try Different Browser
Sometimes Firefox/Chrome work better than Edge

---

## 💡 Pro Tips

1. **Share the link:** https://devsatish05.github.io/NeuroGames/
2. **Works offline:** Download files and open locally
3. **Mobile friendly:** Test on phone too!
4. **Add more questions:** Edit `script.js` and add to the array

---

## 📞 Still Need Help?

1. Check browser console for errors (F12)
2. Make sure all 3 files are present
3. Try clearing browser cache (Ctrl+Shift+Del)
4. Refresh the page

Good luck! 🎉
