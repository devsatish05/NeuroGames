const STORAGE_KEY = 'neuroGamesPlatformV1';

const IQ_QUESTIONS = {
    Easy: [
        { type: 'Riddle', question: 'I have keys but no locks. What am I?', options: ['Piano', 'Map', 'Clock', 'Book'], correct: 0, hint: 'It makes music.' },
        { type: 'Math Logic', question: '2, 4, 8, 16, ?', options: ['18', '24', '32', '30'], correct: 2, hint: 'It doubles each time.' },
        { type: 'Word Logic', question: 'Puppy is to Dog as Kitten is to ?', options: ['Cat', 'Lion', 'Rabbit', 'Goat'], correct: 0, hint: 'Baby animal relationship.' }
    ],
    Medium: [
        { type: 'Riddle', question: 'The more you take, the more you leave behind.', options: ['Footsteps', 'Money', 'Books', 'Shadows'], correct: 0, hint: 'Think walking.' },
        { type: 'Math Logic', question: '3, 6, 12, 24, ?', options: ['26', '36', '48', '30'], correct: 2, hint: 'Multiply by 2.' },
        { type: 'Word Logic', question: 'Bird : Fly :: Fish : ?', options: ['Jump', 'Swim', 'Climb', 'Walk'], correct: 1, hint: 'Natural movement.' }
    ],
    Hard: [
        { type: 'Riddle', question: 'I speak without a mouth and hear without ears.', options: ['Echo', 'Wind', 'Whistle', 'Shadow'], correct: 0, hint: 'Often heard in a cave.' },
        { type: 'Math Logic', question: '1, 1, 2, 3, 5, 8, ?', options: ['11', '12', '13', '14'], correct: 2, hint: 'Add previous two.' },
        { type: 'Word Logic', question: 'Clock : Time :: Thermometer : ?', options: ['Heat', 'Weather', 'Temperature', 'Rain'], correct: 2, hint: 'What it measures.' }
    ]
};

const PATTERN_QUESTIONS = {
    Easy: [
        { type: 'Visual Pattern', question: '🔺 🔵 🔺 🔵 ?', options: ['🔺', '🔵', '🟢', '🟨'], correct: 0, hint: 'Alternating pattern.' },
        { type: 'Shape Rotation', question: 'If ▶ rotates 90° clockwise, what is it?', options: ['▲', '▼', '◀', '◆'], correct: 1, hint: 'Right arrow turns down.' },
        { type: 'Grid Pattern', question: '1 2 3 / 2 3 4 / 3 4 ?', options: ['4', '5', '6', '7'], correct: 1, hint: 'Increase each row/column by 1.' }
    ],
    Medium: [
        { type: 'Visual Pattern', question: '⭐ ⭐🌙 ⭐⭐🌙🌙 ?', options: ['⭐⭐⭐🌙🌙🌙', '⭐⭐🌙', '🌙🌙⭐', '⭐⭐⭐⭐'], correct: 0, hint: 'Add one star and one moon.' },
        { type: 'Shape Rotation', question: 'A square turned 45° looks like?', options: ['Circle', 'Diamond', 'Triangle', 'Oval'], correct: 1, hint: 'Same shape, new orientation.' },
        { type: 'Spatial Reasoning', question: 'Cube net has 6 faces. Opposite of top is?', options: ['Bottom', 'Left', 'Front', 'Right'], correct: 0, hint: 'Direct opposite face.' }
    ],
    Hard: [
        { type: 'Visual Pattern', question: '2, 6, 12, 20, ?', options: ['28', '30', '32', '34'], correct: 1, hint: 'Differences: +4,+6,+8,+10.' },
        { type: 'Grid Pattern', question: 'Row sums: 6, 9, 12, next?', options: ['13', '14', '15', '16'], correct: 2, hint: 'Increase by 3.' },
        { type: 'Spatial Reasoning', question: 'Mirror image of b is?', options: ['d', 'p', 'q', 'h'], correct: 0, hint: 'Horizontal mirror across vertical axis.' }
    ]
};

const MEMORY_SYMBOLS = ['🍎', '🚀', '🧠', '🎯', '🐶', '⚽', '🌈', '🎵', '🧩'];
const PATTERN_TOKENS = ['🔴', '🟢', '🔵', '🟨'];
const FITNESS_CHALLENGES = [
    { id: 'pushups', title: '5 Push-ups', guide: 'Keep your body straight and engage your core.', xp: 10 },
    { id: 'run100', title: '100m Run', guide: 'Pump your arms, lift your knees, breathe steadily.', xp: 10 },
    { id: 'jumping', title: '20 Jumping Jacks', guide: 'Jump with rhythm and controlled movement.', xp: 10 },
    { id: 'plank', title: '30-second Plank', guide: 'Back straight, core tight from head to ankles.', xp: 10 }
];
const HABIT_TIPS = [
    '😴 Sleep 8-10 hours every night to help your brain grow.',
    '💧 Drink water regularly to stay hydrated and focused.',
    '🥗 Eat colorful fruits and vegetables for brain fuel.',
    '⏱️ Balance screen time with outdoor play and movement.'
];

const ACHIEVEMENTS = [
    { id: 'daily_achiever', icon: '📅', name: 'Daily Achiever', description: 'Play on 3 consecutive days', check: (p) => p.streak >= 3 },
    { id: 'top_strategist', icon: '🧠', name: 'Top Strategist', description: 'Score 80%+ in IQ sessions', check: (p) => bestCategoryAvg(p, 'IQ') >= 80 },
    { id: 'focus_champion', icon: '🎯', name: 'Focus Champion', description: 'Memory growth above 20%', check: (p) => categoryGrowth(p, 'Memory') >= 20 },
    { id: 'pattern_master', icon: '🧩', name: 'Pattern Master', description: 'Pattern score average 80%+', check: (p) => bestCategoryAvg(p, 'Pattern') >= 80 },
    { id: 'memory_wizard', icon: '🪄', name: 'Memory Wizard', description: 'Complete 5 memory sessions', check: (p) => countCategorySessions(p, 'Memory') >= 5 },
    { id: 'fitness_warrior', icon: '🏃', name: 'Fitness Warrior', description: 'Complete all 4 daily fitness challenges', check: (p) => todayMentorComplete(p) >= 4 },
    { id: 'iq_rookie', icon: '🥉', name: 'IQ Rookie', description: 'Complete first IQ session', check: (p) => countCategorySessions(p, 'IQ') >= 1 },
    { id: 'iq_pro', icon: '🥇', name: 'IQ Pro', description: 'Complete 10 IQ sessions', check: (p) => countCategorySessions(p, 'IQ') >= 10 },
    { id: 'memory_rookie', icon: '🧠', name: 'Memory Rookie', description: 'Complete first memory session', check: (p) => countCategorySessions(p, 'Memory') >= 1 },
    { id: 'pattern_rookie', icon: '🔍', name: 'Pattern Rookie', description: 'Complete first pattern session', check: (p) => countCategorySessions(p, 'Pattern') >= 1 },
    { id: 'mentor_rookie', icon: '💪', name: 'Mentor Rookie', description: 'Complete first behavior mentor session', check: (p) => countCategorySessions(p, 'Behavior') >= 1 },
    { id: 'level_2', icon: '⭐', name: 'Level 2 Unlock', description: 'Reach level 2', check: (p) => p.level >= 2 },
    { id: 'level_3', icon: '🌟', name: 'Level 3 Unlock', description: 'Reach level 3', check: (p) => p.level >= 3 },
    { id: 'level_4', icon: '✨', name: 'Level 4 Unlock', description: 'Reach level 4', check: (p) => p.level >= 4 },
    { id: 'level_5', icon: '👑', name: 'Level 5 Master', description: 'Reach level 5', check: (p) => p.level >= 5 },
    { id: 'week_streak', icon: '🔥', name: 'Streak Hero', description: '7-day streak', check: (p) => p.streak >= 7 },
    { id: 'session_10', icon: '🔟', name: 'Session Star', description: 'Complete 10 sessions', check: (p) => p.completedSessions >= 10 },
    { id: 'session_25', icon: '🏅', name: 'Session Legend', description: 'Complete 25 sessions', check: (p) => p.completedSessions >= 25 },
    { id: 'all_rounder', icon: '🌈', name: 'All-Rounder', description: 'Play all 4 game categories', check: (p) => ['IQ', 'Memory', 'Pattern', 'Behavior'].every((c) => countCategorySessions(p, c) > 0) },
    { id: 'consistency', icon: '⏰', name: 'Consistency Champ', description: 'Session completion above 90%', check: (p) => sessionCompletion(p) >= 90 },
    { id: 'skill_unlocker', icon: '🔓', name: 'Skill Unlocker', description: 'Skill mastery above 75%', check: (p) => skillMastery(p) >= 75 },
    { id: 'brainy_friend', icon: '🤖', name: 'Brainy Friend', description: 'Use Brainy hints 5 times', check: (p) => (p.brainyHintsUsed || 0) >= 5 }
];

const GAME_CATALOG = [
    { id: 'IQ', title: 'IQ Challenges', desc: 'Riddles, math logic and word analogies', unlockLevel: 1, modes: ['Mixed IQ'] },
    { id: 'Memory', title: 'Memory Games', desc: 'Card matching, number recall, pattern memory', unlockLevel: 1, modes: ['Card Matching', 'Number Recall', 'Pattern Memory'] },
    { id: 'Pattern', title: 'Pattern Recognition', desc: 'Visual and spatial pattern puzzles', unlockLevel: 2, modes: ['Mixed Pattern'] },
    { id: 'Behavior', title: 'Behavior Mentor', desc: 'Daily fitness, healthy habits, motivation', unlockLevel: 1, modes: ['Daily Mentor'] }
];

const AVATAR_OPTIONS = ['🦊', '🐼', '🦁', '🐯', '🐻', '🐸', '🐶', '🐱', '🐵', '🐨', '🦄', '🐰'];
const THEME_BY_SCREEN = {
    loginProfile: 'home',
    homeDashboard: 'home',
    gameSelection: 'home',
    gamePlay: 'IQ',
    resultsScreen: 'Pattern',
    parentDashboard: 'Memory',
    behaviorMentor: 'Behavior',
    achievementGallery: 'Pattern',
    settingsScreen: 'home'
};
const GAME_ICONS = { IQ: '🧠', Memory: '🎴', Pattern: '🧩', Behavior: '💪' };
const LOADING_HINTS = [
    'Preparing a bright new challenge...',
    'Loading colorful brain boosts...',
    'Setting up Brainy and the dashboard...',
    'Polishing achievements and rewards...'
];

let state = loadState();
let currentSession = null;
let sessionTimerId = null;
let selectedAvatar = AVATAR_OPTIONS[0];
let audioContext = null;
let loadingTimeoutIds = [];
let overlayHideTimeoutId = null;
let audioResumePromise = null;
let backgroundMusicNodes = null;
let transitionAnnouncementId = null;

function defaultState() {
    return {
        profiles: [],
        activeProfileId: null,
        settings: {
            notifications: true,
            chatbotEnabled: true,
            parentalControls: false,
            soundEnabled: true,
            musicEnabled: false
        }
    };
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    try {
        const parsed = JSON.parse(raw);
        const merged = { ...defaultState(), ...parsed, settings: { ...defaultState().settings, ...(parsed.settings || {}) } };
        merged.profiles = (merged.profiles || []).map((profile) => ({
            ...profile,
            id: profile.id || generateId(),
            avatar: profile.avatar || AVATAR_OPTIONS[0],
            avatarColor: profile.avatarColor || 'sky',
            avatarAccessory: profile.avatarAccessory || '✨'
        }));
        if (!merged.activeProfileId && merged.profiles.length) merged.activeProfileId = merged.profiles[0].id;
        if (merged.activeProfileId && !merged.profiles.some((p) => p.id === merged.activeProfileId) && merged.profiles.length) {
            merged.activeProfileId = merged.profiles[0].id;
        }
        return merged;
    } catch {
        return defaultState();
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
    return localDateKey(new Date());
}

function localDateKey(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function createProfile(name, age) {
    return {
        id: generateId(),
        name,
        age,
        avatar: selectedAvatar,
        avatarColor: document.getElementById('avatarColorSelect')?.value || 'sky',
        avatarAccessory: document.getElementById('avatarAccessorySelect')?.value || '✨',
        createdAt: Date.now(),
        sessions: [],
        startedSessions: 0,
        completedSessions: 0,
        totalXp: 0,
        level: 1,
        badges: [],
        timeSpent: { IQ: 0, Memory: 0, Pattern: 0, Behavior: 0 },
        mentorLog: {},
        dailyBonusLog: {},
        streak: 0,
        lastPlayedDate: null,
        brainyHintsUsed: 0
    };
}

function getActiveProfile() {
    if (!state.profiles.length) return null;
    return state.profiles.find((p) => p.id === state.activeProfileId) || state.profiles[0];
}

function setActiveProfile(id) {
    state.activeProfileId = id;
    saveState();
    renderAll();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach((screen) => {
        screen.classList.toggle('active', screen.id === screenId);
    });
    document.querySelectorAll('.nav-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.screen === screenId);
    });
    const activeScreen = document.getElementById(screenId);
    const focusTarget = activeScreen?.querySelector('h2') || activeScreen;
    setAppTheme(currentSession?.category && ['gamePlay', 'resultsScreen'].includes(screenId) ? currentSession.category : THEME_BY_SCREEN[screenId] || 'home');
    announceScreenChange(screenId);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    if (focusTarget) {
        focusTarget.setAttribute('tabindex', '-1');
        focusTarget.focus();
    }
    playSound('transition');
}

function init() {
    renderAvatarOptions();
    updateAvatarPreview();
    bindEvents();
    renderAll();
    postBrainyMessage('brainy', 'Hi! I am Brainy. I can give hints, celebrate your growth, and motivate you!');
    animateLoadingSequence();
}

function bindEvents() {
    document.getElementById('createProfileBtn').addEventListener('click', () => {
        const name = document.getElementById('childNameInput').value.trim();
        const age = Number(document.getElementById('childAgeInput').value);
        if (!name || age < 7 || age > 12) {
            alert('Enter a valid child name and age between 7 and 12.');
            return;
        }
        const profile = createProfile(name, age);
        state.profiles.push(profile);
        state.activeProfileId = profile.id;
        saveState();
        renderAll();
        showScreen('homeDashboard');
        showToast(`Welcome, ${profile.name}! ${profile.avatar} profile ready.`, 'success');
        playSound('achievement');
    });

    document.querySelectorAll('.nav-btn').forEach((btn) => {
        btn.addEventListener('click', () => showScreen(btn.dataset.screen));
    });

    document.getElementById('playAgainBtn').addEventListener('click', () => showScreen('gameSelection'));
    document.getElementById('difficultySelect').addEventListener('change', renderGameCards);

    document.getElementById('chatToggleBtn').addEventListener('click', () => toggleBrainy());
    document.getElementById('closeBrainyBtn').addEventListener('click', () => toggleBrainy(false));
    document.getElementById('brainySendBtn').addEventListener('click', sendBrainy);
    document.getElementById('brainyInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendBrainy();
    });
    document.getElementById('avatarColorSelect').addEventListener('change', updateAvatarPreview);
    document.getElementById('avatarAccessorySelect').addEventListener('change', updateAvatarPreview);
    document.addEventListener('visibilitychange', syncMusic);

    document.getElementById('saveSettingsBtn').addEventListener('click', () => {
        state.settings.notifications = document.getElementById('notifyToggle').checked;
        state.settings.chatbotEnabled = document.getElementById('chatbotToggle').checked;
        state.settings.parentalControls = document.getElementById('parentControlToggle').checked;
        state.settings.soundEnabled = document.getElementById('soundToggle').checked;
        state.settings.musicEnabled = document.getElementById('musicToggle').checked;
        saveState();
        syncMusic();
        renderAll();
        playSound('success');
        showToast('Settings saved!', 'success');
    });

    document.addEventListener('click', (event) => {
        const target = event.target.closest('button, .pill, .avatar-option');
        if (!target
            || target.classList.contains('avatar-option')
            || target.classList.contains('option-btn')
            || target.classList.contains('card-btn')
            || target.classList.contains('memory-seq-btn')) return;
        activateAudioContext();
        addRipple(target, event);
        playSound('click');
    });
}

function renderAll() {
    const profile = getActiveProfile();
    document.getElementById('mainNav').classList.toggle('hidden', !profile);
    document.getElementById('activeProfileBadge').classList.toggle('hidden', !profile);
    document.getElementById('activeProfileLabel').textContent = profile ? `${profile.name} • Level ${profile.level}` : 'No profile selected';
    document.getElementById('activeProfileAvatar').textContent = profile?.avatar || selectedAvatar;

    renderProfiles();
    renderDashboard();
    renderGameCards();
    renderBehaviorMentor();
    renderAchievements();
    renderParentDashboard();
    renderSettings();
    syncMusic();

    if (!profile) {
        showScreen('loginProfile');
    }
}

function renderProfiles() {
    const wrap = document.getElementById('profileList');
    wrap.innerHTML = '';
    state.profiles.forEach((profile) => {
        const btn = document.createElement('button');
        btn.className = `pill ${profile.id === state.activeProfileId ? 'active' : ''}`;
        btn.textContent = `${profile.avatar} ${profile.name} (${profile.age}) - L${profile.level}`;
        btn.addEventListener('click', () => {
            setActiveProfile(profile.id);
            showScreen('homeDashboard');
        });
        wrap.appendChild(btn);
    });
}

function renderDashboard() {
    const profile = getActiveProfile();
    const metricsGrid = document.getElementById('metricsGrid');
    const perfList = document.getElementById('performanceList');
    const interest = document.getElementById('interestMapping');
    const recentAchievements = document.getElementById('recentAchievements');
    const hero = document.getElementById('dashboardHero');

    if (!profile) {
        metricsGrid.innerHTML = '';
        perfList.innerHTML = '';
        interest.innerHTML = '';
        recentAchievements.innerHTML = '';
        hero.innerHTML = '';
        return;
    }

    const iqGrowth = categoryGrowth(profile, 'IQ');
    const memoryGrowth = categoryGrowth(profile, 'Memory');
    const patternGrowth = categoryGrowth(profile, 'Pattern');
    const syncText = profile.sessions.length ? new Date(profile.sessions[profile.sessions.length - 1].date).toLocaleString() : 'Waiting for first session';

    const metricItems = [
        formatGrowthMetric('IQ Growth', iqGrowth, 'iq', '🧠'),
        formatGrowthMetric('Memory Growth', memoryGrowth, 'memory', '🎴'),
        formatGrowthMetric('Pattern Growth', patternGrowth, 'pattern', '🧩'),
        { label: 'Live Sync', detail: syncText, ringValue: profile.sessions.length ? 100 : 15, themeClass: 'behavior', icon: '📡', textValue: profile.sessions.length ? 'LIVE' : 'WAIT', ringLabel: profile.sessions.length ? 'ON' : '...' },
        { label: 'XP', detail: `${profile.totalXp} XP`, ringValue: clampNumber(profile.totalXp / 10, 0, 100), themeClass: 'general', icon: '✨', count: profile.totalXp, suffix: ' XP', prefix: '', ringLabel: `${clampNumber(profile.totalXp / 10, 0, 100)}%` },
        { label: 'Level', detail: `Level ${profile.level}/5`, ringValue: profile.level * 20, themeClass: 'general', icon: '🏅', count: profile.level, suffix: '/5', prefix: '', ringLabel: `${profile.level}/5` }
    ];

    metricsGrid.innerHTML = metricItems.map(({ label, detail, ringValue, themeClass, icon, count, suffix = '', prefix = '', textValue, ringLabel }) => `
        <div class="metric ${themeClass}">
            <div class="metric-top">
                <div>
                    <div>${icon} ${label}</div>
                    ${Number.isFinite(count)
                        ? `<strong class="count-up" data-counter="${count}" data-suffix="${suffix}" data-sign="${prefix}">0${suffix}</strong>`
                        : `<strong>${textValue || detail}</strong>`}
                </div>
                <div class="metric-circle" style="--ring-value:${ringValue}">
                    <span>${ringLabel || `${ringValue}%`}</span>
                </div>
            </div>
            <small>${detail}</small>
        </div>
    `).join('');

    const completion = sessionCompletion(profile);
    const streak = profile.streak;
    const mastery = skillMastery(profile);
    perfList.innerHTML = `
        <li>Session Completion: <strong>${completion}%</strong></li>
        <li>Streak Progress: <strong>${Math.min(100, streak * 12)}%</strong> (${streak} days)</li>
        <li>Skill Mastery: <strong>${mastery}%</strong></li>
        <li>Achievements Unlocked: <strong>${profile.badges.length}/${ACHIEVEMENTS.length}</strong></li>
    `;

    const best = bestCategory(profile);
    const weak = weakestCategory(profile);
    hero.innerHTML = `
        <div class="avatar-preview avatar-color-${profile.avatarColor || 'sky'}">
            <span class="avatar-base">${profile.avatar || '🦊'}</span>
            <span class="avatar-accessory">${profile.avatarAccessory || '✨'}</span>
        </div>
        <div>
            <div class="section-kicker">Player spotlight</div>
            <h3>${profile.name}'s Growth Journey</h3>
            <p class="section-copy">A colorful snapshot of cognitive growth, streaks, and motivation designed for both kids and parents.</p>
            <div class="hero-stats">
                <span class="hero-chip">⭐ ${profile.totalXp} XP</span>
                <span class="hero-chip">🔥 ${profile.streak}-day streak</span>
                <span class="hero-chip">🏆 ${profile.badges.length} badges</span>
            </div>
        </div>
        <div class="theme-chip">Best Focus: ${GAME_ICONS[best] || '🌟'} ${best || 'Starting out'}</div>
    `;
    interest.innerHTML = '';
    const strengthP = document.createElement('p');
    strengthP.textContent = `Strength: ${best || 'Not enough data'}`;
    const weakP = document.createElement('p');
    weakP.textContent = `Needs focus: ${weak || 'Keep playing all categories'}`;
    const recP = document.createElement('p');
    recP.textContent = `Recommendation: ${recommendation(profile)}`;
    interest.append(strengthP, weakP, recP);
    interest.appendChild(renderLeaderboard(profile.id));

    const unlocked = profile.badges.slice(-6).map((id) => ACHIEVEMENTS.find((a) => a.id === id)).filter(Boolean);
    recentAchievements.innerHTML = unlocked.length
        ? unlocked.map((a) => `<div class="badge unlocked"><div>${a.icon} <strong>${a.name}</strong></div><small>${a.description}</small></div>`).join('')
        : '<p>Play sessions to unlock badges!</p>';
    animateCounters(metricsGrid);
}

function renderLeaderboard(activeId) {
    const list = [...state.profiles].sort((a, b) => b.totalXp - a.totalXp).slice(0, 5);
    const container = document.createElement('div');
    if (!list.length) return container;
    const title = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = 'Local Leaderboard:';
    title.appendChild(strong);
    container.appendChild(title);
    list.forEach((p, idx) => {
        const row = document.createElement('p');
        row.textContent = `${idx + 1}. ${p.id === activeId ? '👉 ' : ''}${p.name} - ${p.totalXp} XP`;
        container.appendChild(row);
    });
    return container;
}

function renderGameCards() {
    const profile = getActiveProfile();
    const wrap = document.getElementById('gameCards');
    wrap.innerHTML = '';
    if (!profile) return;

    const difficulty = document.getElementById('difficultySelect').value;

    GAME_CATALOG.forEach((game) => {
        const locked = profile.level < game.unlockLevel;
        const div = document.createElement('div');
        div.className = `game-card ${locked ? 'locked' : ''}`;
        div.dataset.theme = game.id;
        const title = document.createElement('h3');
        title.textContent = game.title;
        const desc = document.createElement('p');
        desc.textContent = game.desc;
        const unlock = document.createElement('p');
        const unlockSmall = document.createElement('small');
        unlockSmall.textContent = `Unlock level: ${game.unlockLevel}`;
        unlock.appendChild(unlockSmall);
        const chips = document.createElement('div');
        chips.className = 'form-row';
        const difficultyChip = document.createElement('span');
        difficultyChip.className = 'theme-chip';
        difficultyChip.textContent = difficulty;
        const statusChip = document.createElement('span');
        statusChip.className = 'difficulty-chip';
        statusChip.textContent = locked ? '🔒 Locked' : '✨ Ready to play';
        chips.append(difficultyChip, statusChip);
        const head = document.createElement('div');
        head.className = 'game-card-head';
        const icon = document.createElement('span');
        icon.textContent = GAME_ICONS[game.id] || '🎮';
        head.appendChild(icon);
        head.appendChild(title);
        div.append(head, desc, chips, unlock);

        if (game.modes.length > 1) {
            const modeLabel = document.createElement('label');
            modeLabel.textContent = 'Mode ';
            const modeSelect = document.createElement('select');
            modeSelect.className = 'mode-select';
            game.modes.forEach((modeValue) => {
                const option = document.createElement('option');
                option.value = modeValue;
                option.textContent = modeValue;
                modeSelect.appendChild(option);
            });
            modeLabel.appendChild(modeSelect);
            div.appendChild(modeLabel);
        }

        const startButton = document.createElement('button');
        startButton.className = 'btn btn-primary start-game-btn';
        startButton.disabled = locked;
        startButton.textContent = `${locked ? 'Locked' : 'Start'} (${difficulty})`;
        div.appendChild(startButton);

        startButton.addEventListener('click', () => {
            const mode = div.querySelector('.mode-select')?.value || game.modes[0];
            startGame(game.id, difficulty, mode);
        });
        wrap.appendChild(div);
    });
}

function startGame(category, difficulty, mode) {
    const profile = getActiveProfile();
    if (!profile) return;

    clearSessionTimer();
    profile.startedSessions += 1;
    saveState();

    currentSession = {
        category,
        difficulty,
        mode,
        startedAt: Date.now(),
        score: 0,
        total: 0,
        hintsUsed: 0,
        events: []
    };

    document.getElementById('playTitle').textContent = `${category} • ${mode}`;
    document.getElementById('playMeta').textContent = `${difficulty} Difficulty`;
    setAppTheme(category);

    if (category === 'IQ') runQuizMode(IQ_QUESTIONS[difficulty], `${difficulty} IQ Challenges`);
    if (category === 'Pattern') runQuizMode(PATTERN_QUESTIONS[difficulty], `${difficulty} Pattern Puzzles`);
    if (category === 'Memory') runMemoryMode(difficulty, mode);
    if (category === 'Behavior') {
        showScreen('behaviorMentor');
        currentSession.total = FITNESS_CHALLENGES.length;
        currentSession.score = todayMentorComplete(profile);
        postBrainyMessage('brainy', 'Behavior Mentor activated! Complete all fitness challenges for bonus XP.');
        showToast('Behavior Mentor is live — complete each challenge to unlock bonus XP!', 'info');
        return;
    }

    showScreen('gamePlay');
    postBrainyMessage('brainy', `Starting ${category}. Ask me for a hint anytime!`);
}

function runQuizMode(questionPool, title) {
    const questions = shuffle([...questionPool]).slice(0, Math.min(3, questionPool.length));
    currentSession.total = questions.length;
    let idx = 0;

    const render = () => {
        const gameArea = document.getElementById('gameArea');
        const q = questions[idx];
        gameArea.innerHTML = `
            <div class="question-progress">
                <p><strong>Question ${idx + 1}/${questions.length}</strong> • ${q.type}</p>
                <div class="bar"><span style="width:${Math.round((idx / questions.length) * 100)}%"></span></div>
            </div>
            <p><strong>Q${idx + 1}/${questions.length}</strong> • ${q.type}</p>
            <h3>${q.question}</h3>
            <div>${q.options.map((opt, i) => `<button class="option-btn" data-i="${i}">${opt}</button>`).join('')}</div>
            <p><button id="hintBtn" class="btn btn-secondary">Need Hint</button></p>
            <div id="quizFeedback"></div>
        `;

        gameArea.querySelectorAll('.option-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const chosen = Number(btn.dataset.i);
                const correct = chosen === q.correct;
                currentSession.events.push({ question: q.question, chosen, correct });
                if (correct) currentSession.score += 1;
                gameArea.querySelectorAll('.option-btn').forEach((b, i) => {
                    if (i === q.correct) b.classList.add('correct');
                    if (i === chosen && i !== q.correct) b.classList.add('wrong');
                    if (i === chosen) b.classList.add('selected');
                    b.disabled = true;
                });
                if (correct) {
                    playSound('correct');
                    burstParticles(btn);
                } else {
                    playSound('wrong');
                    gameArea.classList.add('shake');
                    setTimeout(() => gameArea.classList.remove('shake'), 380);
                }
                document.getElementById('quizFeedback').textContent = correct ? '✅ Correct!' : `❌ Not quite. Correct answer: ${q.options[q.correct]}`;

                setTimeout(() => {
                    idx += 1;
                    if (idx >= questions.length) finishSession();
                    else render();
                }, 700);
            });
        });

        document.getElementById('hintBtn').addEventListener('click', () => {
            currentSession.hintsUsed += 1;
            const profile = getActiveProfile();
            if (profile) {
                profile.brainyHintsUsed += 1;
                saveState();
            }
            postBrainyMessage('brainy', `Hint: ${q.hint}`);
            playSound('brainy');
            document.getElementById('quizFeedback').innerHTML = `<div class="hint-bubble">💡 ${q.hint}</div>`;
        });
    };

    document.getElementById('playTitle').textContent = title;
    render();
}

function runMemoryMode(difficulty, mode) {
    if (mode === 'Card Matching') runCardMatching(difficulty);
    if (mode === 'Number Recall') runNumberRecall(difficulty);
    if (mode === 'Pattern Memory') runPatternMemory(difficulty);
}

function runCardMatching(difficulty) {
    const pairs = difficulty === 'Easy' ? 3 : difficulty === 'Medium' ? 6 : 9;
    const symbols = shuffle(MEMORY_SYMBOLS.slice(0, pairs).flatMap((s) => [s, s]));
    const matched = new Set();
    let flipped = [];

    currentSession.total = pairs;
    currentSession.score = 0;

    const render = () => {
        const gameArea = document.getElementById('gameArea');
        gameArea.innerHTML = `
            <p>Match all pairs • ${currentSession.score}/${pairs} found</p>
            <div class="memory-board">
                ${symbols.map((s, i) => `<button class="card-btn ${matched.has(i) ? 'matched' : ''} ${flipped.includes(i) ? 'revealed' : ''}" data-i="${i}">${matched.has(i) || flipped.includes(i) ? s : '❓'}</button>`).join('')}
            </div>
        `;

        gameArea.querySelectorAll('.card-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const i = Number(btn.dataset.i);
                if (matched.has(i) || flipped.includes(i) || flipped.length === 2) return;
                flipped.push(i);
                render();

                if (flipped.length === 2) {
                    const [a, b] = flipped;
                    if (symbols[a] === symbols[b]) {
                        matched.add(a);
                        matched.add(b);
                        currentSession.score += 1;
                        playSound('correct');
                        flipped = [];
                        render();
                        if (currentSession.score === pairs) setTimeout(finishSession, 400);
                    } else {
                        playSound('wrong');
                        setTimeout(() => {
                            flipped = [];
                            render();
                        }, 700);
                    }
                }
            });
        });
    };

    render();
    showScreen('gamePlay');
}

function runNumberRecall(difficulty) {
    const base = difficulty === 'Easy' ? 4 : difficulty === 'Medium' ? 6 : 8;
    const rounds = 3;
    let round = 0;
    currentSession.total = rounds;
    currentSession.score = 0;

    const playRound = () => {
        const sessionRef = currentSession;
        const len = base + round;
        const sequence = Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('');
        const gameArea = document.getElementById('gameArea');
        gameArea.innerHTML = `<p>Round ${round + 1}/${rounds}</p><h3>Remember: <span id="seqView">${sequence}</span></h3><p>Memorize quickly...</p>`;

        sessionTimerId = setTimeout(() => {
            if (!currentSession || currentSession !== sessionRef) return;
            gameArea.innerHTML = `
                <p>Round ${round + 1}/${rounds}</p>
                <input id="seqInput" type="text" placeholder="Type the full sequence">
                <button id="checkSeqBtn" class="btn btn-primary">Submit</button>
            `;
            document.getElementById('checkSeqBtn').addEventListener('click', () => {
                if (!currentSession || currentSession !== sessionRef) return;
                const value = document.getElementById('seqInput').value.trim();
                if (value === sequence) {
                    currentSession.score += 1;
                    playSound('correct');
                } else {
                    playSound('wrong');
                }
                round += 1;
                if (round >= rounds) finishSession();
                else playRound();
            });
        }, 1800);
    };

    playRound();
    showScreen('gamePlay');
}

function runPatternMemory(difficulty) {
    const base = difficulty === 'Easy' ? 3 : difficulty === 'Medium' ? 4 : 5;
    const rounds = 3;
    let round = 0;
    currentSession.total = rounds;
    currentSession.score = 0;

    const playRound = () => {
        const sessionRef = currentSession;
        const len = base + round;
        const sequence = Array.from({ length: len }, () => PATTERN_TOKENS[Math.floor(Math.random() * PATTERN_TOKENS.length)]);
        let answer = [];

        const gameArea = document.getElementById('gameArea');
        gameArea.innerHTML = `<p>Round ${round + 1}/${rounds}</p><h3>Remember: ${sequence.join(' ')}</h3>`;

        sessionTimerId = setTimeout(() => {
            if (!currentSession || currentSession !== sessionRef) return;
            gameArea.innerHTML = `
                <p>Round ${round + 1}/${rounds}</p>
                <p>Select sequence in order:</p>
                <div>${PATTERN_TOKENS.map((t) => `<button class="memory-seq-btn" data-token="${t}">${t}</button>`).join('')}</div>
                <p id="answerPreview"></p>
                <button id="submitPatternBtn" class="btn btn-primary">Submit Sequence</button>
            `;

            gameArea.querySelectorAll('.memory-seq-btn').forEach((btn) => {
                btn.addEventListener('click', () => {
                    if (!currentSession || currentSession !== sessionRef) return;
                    answer.push(btn.dataset.token);
                    document.getElementById('answerPreview').textContent = answer.join(' ');
                    playSound('click');
                });
            });

            document.getElementById('submitPatternBtn').addEventListener('click', () => {
                if (!currentSession || currentSession !== sessionRef) return;
                if (answer.join('|') === sequence.join('|')) {
                    currentSession.score += 1;
                    playSound('correct');
                } else {
                    playSound('wrong');
                }
                round += 1;
                if (round >= rounds) finishSession();
                else playRound();
            });
        }, 1700);
    };

    playRound();
    showScreen('gamePlay');
}

function finishSession() {
    const profile = getActiveProfile();
    if (!profile || !currentSession) return;
    clearSessionTimer();

    const duration = Math.max(5, Math.round((Date.now() - currentSession.startedAt) / 1000));
    const percent = currentSession.total ? Math.round((currentSession.score / currentSession.total) * 100) : 0;

    const sessionCategory = currentSession.category;
    const isBehaviorSession = sessionCategory === 'Behavior';
    const difficultyBonus = isBehaviorSession ? 0 : currentSession.difficulty === 'Hard' ? 30 : currentSession.difficulty === 'Medium' ? 15 : 5;
    const baseXp = isBehaviorSession ? 0 : currentSession.score * 20 + difficultyBonus;
    const today = todayKey();
    const dailyBonus = profile.dailyBonusLog[today] ? 0 : 20;
    profile.dailyBonusLog[today] = true;

    const session = {
        date: Date.now(),
        category: sessionCategory,
        mode: currentSession.mode,
        difficulty: currentSession.difficulty,
        score: currentSession.score,
        total: currentSession.total,
        percent,
        duration
    };

    profile.sessions.push(session);
    profile.completedSessions += 1;
    profile.timeSpent[sessionCategory] = (profile.timeSpent[sessionCategory] || 0) + duration;
    profile.totalXp += baseXp + dailyBonus;
    profile.level = xpToLevel(profile.totalXp);

    updateStreak(profile);
    unlockAchievements(profile);
    saveState();

    const growthText = ['IQ', 'Memory', 'Pattern'].map((c) => `${c}: ${formatPercent(categoryGrowth(profile, c))}`).join(' | ');
    document.getElementById('sessionSummary').innerHTML = `
        <h3>${sessionCategory} Session Complete!</h3>
        <p><strong>Score:</strong> ${currentSession.score}/${currentSession.total} (${percent}%)</p>
        <p><strong>XP Earned:</strong> ${baseXp + dailyBonus} (includes ${dailyBonus} daily bonus)</p>
        <p><strong>Level:</strong> ${profile.level}/5</p>
        <p><strong>Growth Snapshot:</strong> ${growthText}</p>
        <p><strong>New badges:</strong> ${profile.badges.slice(-3).map((id) => ACHIEVEMENTS.find((a) => a.id === id)?.icon || '').join(' ') || 'None'}</p>
    `;

    showScreen('resultsScreen');
    renderAll();

    if (percent >= 80) {
        postBrainyMessage('brainy', `Amazing work! ${percent}% in ${sessionCategory}. You're growing fast! 🎉`);
        showToast(`Awesome! ${sessionCategory} streak power unlocked!`, 'success');
    } else {
        postBrainyMessage('brainy', `Nice effort! Keep practicing ${sessionCategory} to boost your mastery. 💪`);
    }
    playSound(percent >= 80 ? 'achievement' : 'success');

    currentSession = null;
}

function renderBehaviorMentor() {
    const profile = getActiveProfile();
    const fitness = document.getElementById('fitnessChallenges');
    const tips = document.getElementById('habitTips');
    fitness.innerHTML = '';
    tips.innerHTML = HABIT_TIPS.map((tip) => `<li>${tip}</li>`).join('');
    if (!profile) return;

    const today = todayKey();
    if (!profile.mentorLog[today]) profile.mentorLog[today] = {};

    FITNESS_CHALLENGES.forEach((challenge) => {
        const done = Boolean(profile.mentorLog[today][challenge.id]);
        const card = document.createElement('div');
        card.className = `badge ${done ? 'unlocked' : ''}`;
        card.innerHTML = `
            <h4>${challenge.title}</h4>
            <p>${challenge.guide}</p>
            <p>Reward: ${challenge.xp} XP</p>
            <p class="${done ? 'completed-check' : ''}">${done ? '✅ Completed with confidence!' : 'Tap when finished to celebrate progress'}</p>
            <button class="btn ${done ? 'btn-secondary' : 'btn-primary'}">${done ? 'Completed ✅' : 'Mark Done'}</button>
        `;

        card.querySelector('button').addEventListener('click', () => {
            if (done) return;
            profile.mentorLog[today][challenge.id] = true;
            const behaviorSessionActive = currentSession && currentSession.category === 'Behavior';
            profile.totalXp += challenge.xp;
            profile.level = xpToLevel(profile.totalXp);
            if (behaviorSessionActive) {
                currentSession.score = todayMentorComplete(profile);
                if (currentSession.score >= FITNESS_CHALLENGES.length) {
                    currentSession.total = FITNESS_CHALLENGES.length;
                    finishSession();
                }
            }
            unlockAchievements(profile);
            saveState();
            renderAll();
            postBrainyMessage('brainy', `Great job completing ${challenge.title}!`);
            showToast(`${challenge.title} completed!`, 'success');
            playSound('achievement');
        });

        fitness.appendChild(card);
    });
}

function renderAchievements() {
    const profile = getActiveProfile();
    const wrap = document.getElementById('achievementGrid');
    if (!profile) {
        wrap.innerHTML = '';
        return;
    }
    wrap.innerHTML = ACHIEVEMENTS.map((a) => {
        const unlocked = profile.badges.includes(a.id);
        return `<div class="badge ${unlocked ? 'unlocked' : 'locked'}"><h4>${a.icon} ${a.name}</h4><p>${a.description}</p><p>${unlocked ? 'Unlocked ✅' : 'Locked 🔒'}</p></div>`;
    }).join('');
}

function renderParentDashboard() {
    const profile = getActiveProfile();
    const weekly = document.getElementById('weeklyGrowth');
    const monthly = document.getElementById('monthlyGrowth');
    const breakdown = document.getElementById('gameBreakdown');
    const timeInsights = document.getElementById('timeInsights');

    if (!profile) {
        weekly.innerHTML = monthly.innerHTML = breakdown.innerHTML = timeInsights.innerHTML = '';
        return;
    }

    weekly.innerHTML = renderGrowthBars(profile, 7);
    monthly.innerHTML = renderGrowthBars(profile, 30);

    breakdown.innerHTML = ['IQ', 'Memory', 'Pattern', 'Behavior'].map((c) => {
        const avg = bestCategoryAvg(profile, c);
        const sessions = countCategorySessions(profile, c);
        return `<p><strong>${c}</strong>: ${avg}% avg across ${sessions} sessions</p>`;
    }).join('');

    const mentor = todayMentorComplete(profile);
    timeInsights.innerHTML = `
        <p>Total play time: <strong class="count-up" data-counter="${Object.values(profile.timeSpent).reduce((a, b) => a + b, 0)}" data-suffix=" sec">0 sec</strong></p>
        ${Object.entries(profile.timeSpent).map(([k, v]) => `<p>${k}: <strong class="count-up" data-counter="${v}" data-suffix=" sec">0 sec</strong></p>`).join('')}
        <p>Behavior mentor completion today: <strong>${mentor}/${FITNESS_CHALLENGES.length}</strong></p>
        <p>Recommendations: ${recommendation(profile)}</p>
    `;
    animateCounters(document.getElementById('parentDashboard'));
}

function renderGrowthBars(profile, days) {
    const since = Date.now() - days * 24 * 60 * 60 * 1000;
    return ['IQ', 'Memory', 'Pattern'].map((c) => {
        const sessions = profile.sessions.filter((s) => s.category === c && s.date >= since);
        const avg = sessions.length ? Math.round(sessions.reduce((sum, s) => sum + s.percent, 0) / sessions.length) : 0;
        return `<p>${GAME_ICONS[c] || '📈'} ${c}: <strong class="count-up" data-counter="${avg}" data-suffix="%">0%</strong></p><div class="bar"><span style="width:${avg}%"></span></div>`;
    }).join('');
}

function renderSettings() {
    document.getElementById('notifyToggle').checked = state.settings.notifications;
    document.getElementById('chatbotToggle').checked = state.settings.chatbotEnabled;
    document.getElementById('parentControlToggle').checked = state.settings.parentalControls;
    document.getElementById('soundToggle').checked = state.settings.soundEnabled;
    document.getElementById('musicToggle').checked = state.settings.musicEnabled;
}

function toggleBrainy(force) {
    if (!state.settings.chatbotEnabled) {
        alert('Brainy is disabled in settings.');
        return;
    }
    const panel = document.getElementById('brainyPanel');
    const shouldShow = typeof force === 'boolean' ? force : panel.classList.contains('hidden');
    panel.classList.toggle('hidden', !shouldShow);
    if (shouldShow) playSound('brainy');
}

function sendBrainy() {
    const input = document.getElementById('brainyInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    postBrainyMessage('user', text);

    const profile = getActiveProfile();
    const lower = text.toLowerCase();
    let reply = 'Keep going! You are building a stronger brain every day. 🚀';

    if (lower.includes('hint')) {
        if (currentSession) {
            currentSession.hintsUsed += 1;
            if (profile) {
                profile.brainyHintsUsed += 1;
                saveState();
            }
            if (currentSession.category === 'IQ') reply = 'IQ Tip: break the problem into small clues and eliminate wrong options.';
            if (currentSession.category === 'Pattern') reply = 'Pattern Tip: look for repeat cycles, rotations, or +2/+3 changes.';
            if (currentSession.category === 'Memory') reply = 'Memory Tip: chunk information into smaller groups and repeat aloud.';
            if (currentSession.category === 'Behavior') reply = 'Mentor Tip: complete plank last after warm-up for better form.';
        } else {
            reply = 'Start a game first, then I can give context-aware hints.';
        }
    } else if (lower.includes('progress') || lower.includes('growth')) {
        if (profile) {
            reply = `Current growth → IQ ${formatPercent(categoryGrowth(profile, 'IQ'))}, Memory ${formatPercent(categoryGrowth(profile, 'Memory'))}, Pattern ${formatPercent(categoryGrowth(profile, 'Pattern'))}.`;
        }
    } else if (lower.includes('recommend')) {
        reply = recommendation(profile);
    }

    postBrainyMessage('brainy', reply);
    playSound('brainy');
    if (profile) {
        unlockAchievements(profile);
        saveState();
        renderAll();
    }
}

function postBrainyMessage(role, text) {
    const wrap = document.getElementById('brainyMessages');
    const msg = document.createElement('div');
    msg.className = `msg ${role}`;
    const profile = getActiveProfile();
    msg.textContent = role === 'user' && profile ? `${profile.avatar} ${profile.name}: ${text}` : role === 'brainy' ? `🤖 Brainy: ${text}` : text;
    wrap.appendChild(msg);
    wrap.scrollTop = wrap.scrollHeight;
}

function renderAvatarOptions() {
    const wrap = document.getElementById('avatarOptions');
    if (!wrap) return;
    wrap.innerHTML = '';
    AVATAR_OPTIONS.forEach((avatar, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `avatar-option ${index === 0 ? 'selected' : ''}`;
        btn.textContent = avatar;
        btn.setAttribute('aria-label', `Choose avatar ${avatar}`);
        btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
        btn.addEventListener('click', () => {
            selectedAvatar = avatar;
            wrap.querySelectorAll('.avatar-option').forEach((option) => {
                const isSelected = option === btn;
                option.classList.toggle('selected', isSelected);
                option.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            });
            updateAvatarPreview();
            playSound('click');
        });
        wrap.appendChild(btn);
    });
}

function updateAvatarPreview() {
    const preview = document.getElementById('avatarPreview');
    if (!preview) return;
    const color = document.getElementById('avatarColorSelect')?.value || 'sky';
    const accessory = document.getElementById('avatarAccessorySelect')?.value || '✨';
    preview.className = `avatar-preview avatar-color-${color}`;
    document.getElementById('avatarPreviewBase').textContent = selectedAvatar;
    document.getElementById('avatarPreviewAccessory').textContent = accessory;
}

function animateLoadingSequence() {
    const overlay = document.getElementById('loadingOverlay');
    const progress = document.getElementById('loadingProgress');
    const percent = document.getElementById('loadingPercent');
    const hint = document.getElementById('loadingHint');
    if (!overlay || !progress || !percent || !hint) return;
    if (prefersReducedMotion()) {
        setLoadingOverlayVisible(false);
        return;
    }
    clearLoadingTimers();
    setLoadingOverlayVisible(true);
    [18, 44, 71, 100].forEach((value, index) => {
        const timerId = setTimeout(() => {
            progress.style.width = `${value}%`;
            percent.textContent = `${value}%`;
            hint.textContent = LOADING_HINTS[index] || LOADING_HINTS[0];
        }, index * 220);
        loadingTimeoutIds.push(timerId);
    });
    overlayHideTimeoutId = setTimeout(() => setLoadingOverlayVisible(false), 1100);
}

function announceScreenChange(screenId) {
    const status = document.getElementById('transitionStatus');
    if (!status) return;
    status.textContent = '';
    if (transitionAnnouncementId) clearTimeout(transitionAnnouncementId);
    transitionAnnouncementId = setTimeout(() => {
        status.textContent = `Opened ${screenLabel(screenId)}.`;
    }, 20);
}

function screenLabel(screenId) {
    const map = {
        loginProfile: 'profile setup',
        homeDashboard: 'the smart dashboard',
        gameSelection: 'game selection',
        gamePlay: 'game time',
        resultsScreen: 'results',
        parentDashboard: 'parent dashboard',
        behaviorMentor: 'behavior mentor',
        achievementGallery: 'achievements',
        settingsScreen: 'settings'
    };
    return map[screenId] || 'your screen';
}

function setAppTheme(theme) {
    document.body.dataset.theme = theme || 'home';
}

function animateCounters(scope = document) {
    scope.querySelectorAll('.count-up').forEach((node) => {
        const target = Number(node.dataset.counter);
        if (!Number.isFinite(target)) return;
        const suffix = node.dataset.suffix || '';
        const sign = node.dataset.sign || '';
        const start = Number(node.dataset.start || 0);
        const duration = prefersReducedMotion() ? 0 : 800;
        if (duration === 0) {
            node.textContent = `${sign}${target}${suffix}`;
            return;
        }
        const startedAt = performance.now();
        const tick = (now) => {
            const progress = Math.min(1, (now - startedAt) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(start + ((target - start) * eased));
            node.textContent = `${sign}${value}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

function addRipple(target, event) {
    if (prefersReducedMotion()) return;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 520);
}

function burstParticles(source) {
    if (prefersReducedMotion()) return;
    const layer = document.getElementById('fxLayer');
    if (!layer || !source) return;
    const rect = source.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#49c6ff', '#ff4f9f', '#ffd166', '#5ef0b4', '#ffffff'];
    for (let i = 0; i < 12; i += 1) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.left = `${cx}px`;
        particle.style.top = `${cy}px`;
        particle.style.color = colors[i % colors.length];
        particle.style.setProperty('--tx', `${Math.cos((Math.PI * 2 * i) / 12) * (30 + Math.random() * 34)}px`);
        particle.style.setProperty('--ty', `${Math.sin((Math.PI * 2 * i) / 12) * (30 + Math.random() * 34)}px`);
        layer.appendChild(particle);
        setTimeout(() => particle.remove(), 720);
    }
}

function showToast(message, type = 'info') {
    if (!state.settings.notifications) return;
    const stack = document.getElementById('toastStack');
    if (!stack) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    stack.appendChild(toast);
    setTimeout(() => toast.remove(), 3400);
}

function clearLoadingTimers() {
    loadingTimeoutIds.forEach((timerId) => clearTimeout(timerId));
    loadingTimeoutIds = [];
    if (overlayHideTimeoutId) {
        clearTimeout(overlayHideTimeoutId);
        overlayHideTimeoutId = null;
    }
}

function setLoadingOverlayVisible(isVisible) {
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;
    overlay.classList.toggle('hidden', !isVisible);
    overlay.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
}

function activateAudioContext() {
    if (audioContext || typeof window.AudioContext === 'undefined' && typeof window.webkitAudioContext === 'undefined') return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioContext = new Ctx();
}

function playTone(freq, duration, type = 'sine', volume = 0.03, when = 0) {
    if (!state.settings.soundEnabled || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioContext.currentTime + when);
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime + when);
    gain.gain.exponentialRampToValueAtTime(volume, audioContext.currentTime + when + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + when + duration);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(audioContext.currentTime + when);
    osc.stop(audioContext.currentTime + when + duration + 0.02);
}

function playSound(kind) {
    activateAudioContext();
    if (!state.settings.soundEnabled || !audioContext) return;
    if (audioContext.state === 'suspended') {
        if (!audioResumePromise) {
            audioResumePromise = audioContext.resume().catch(() => {}).finally(() => {
                audioResumePromise = null;
            });
        }
        return;
    }
    if (kind === 'click') playTone(520, 0.05, 'triangle', 0.018);
    if (kind === 'transition') playTone(420, 0.05, 'sine', 0.015, 0), playTone(620, 0.08, 'sine', 0.012, 0.04);
    if (kind === 'correct') playTone(660, 0.08, 'triangle', 0.028, 0), playTone(880, 0.12, 'triangle', 0.026, 0.08);
    if (kind === 'wrong') playTone(210, 0.12, 'sawtooth', 0.018, 0), playTone(165, 0.14, 'sawtooth', 0.014, 0.06);
    if (kind === 'achievement') playTone(660, 0.08, 'triangle', 0.024, 0), playTone(880, 0.1, 'triangle', 0.022, 0.08), playTone(1046, 0.14, 'triangle', 0.02, 0.16);
    if (kind === 'brainy') playTone(740, 0.06, 'sine', 0.018, 0), playTone(988, 0.08, 'sine', 0.016, 0.06);
    if (kind === 'success') playTone(560, 0.08, 'triangle', 0.02, 0), playTone(760, 0.1, 'triangle', 0.018, 0.06);
}

function syncMusic() {
    if (!state.settings.musicEnabled || !state.settings.soundEnabled || document.hidden) {
        stopBackgroundMusic();
        return;
    }
    activateAudioContext();
    if (!audioContext) return;
    if (audioContext.state === 'suspended') {
        if (!audioResumePromise) {
            audioResumePromise = audioContext.resume().catch(() => {}).finally(() => {
                audioResumePromise = null;
            });
        }
        audioResumePromise.then(() => syncMusic());
        return;
    }
    startBackgroundMusic();
}

function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function formatGrowthMetric(label, rawValue, themeClass, icon) {
    const ringValue = clampNumber(Math.abs(rawValue), 0, 100);
    return {
        label,
        detail: `${formatPercent(rawValue)} up from session 1`,
        ringValue,
        themeClass,
        icon,
        count: rawValue,
        suffix: '%',
        prefix: rawValue > 0 ? '+' : '',
        ringLabel: `${ringValue}%`
    };
}

function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, Math.round(value)));
}

function startBackgroundMusic() {
    if (backgroundMusicNodes || !audioContext) return;
    const musicOsc = audioContext.createOscillator();
    const musicGain = audioContext.createGain();
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();

    musicOsc.type = 'triangle';
    musicOsc.frequency.setValueAtTime(261.63, audioContext.currentTime);
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, audioContext.currentTime);
    lfoGain.gain.setValueAtTime(36, audioContext.currentTime);
    musicGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    musicGain.gain.exponentialRampToValueAtTime(0.006, audioContext.currentTime + 0.25);

    lfo.connect(lfoGain);
    lfoGain.connect(musicOsc.frequency);
    musicOsc.connect(musicGain);
    musicGain.connect(audioContext.destination);

    musicOsc.start();
    lfo.start();
    backgroundMusicNodes = { musicOsc, musicGain, lfo, lfoGain };
}

function stopBackgroundMusic() {
    if (!backgroundMusicNodes || !audioContext) return;
    const { musicOsc, musicGain, lfo } = backgroundMusicNodes;
    const now = audioContext.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(Math.max(musicGain.gain.value, 0.0001), now);
    musicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    musicOsc.stop(now + 0.14);
    lfo.stop(now + 0.14);
    backgroundMusicNodes = null;
}

function updateStreak(profile) {
    const today = todayKey();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = localDateKey(yesterdayDate);
    if (profile.lastPlayedDate === today) return;
    if (profile.lastPlayedDate === yesterday) profile.streak += 1;
    else profile.streak = 1;
    profile.lastPlayedDate = today;
}

function unlockAchievements(profile) {
    ACHIEVEMENTS.forEach((a) => {
        if (!profile.badges.includes(a.id) && a.check(profile)) {
            profile.badges.push(a.id);
            postBrainyMessage('brainy', `Badge unlocked: ${a.icon} ${a.name}!`);
            showToast(`${a.icon} ${a.name} unlocked!`, 'achievement');
            playSound('achievement');
        }
    });
}

function xpToLevel(xp) {
    if (xp >= 1000) return 5;
    if (xp >= 700) return 4;
    if (xp >= 450) return 3;
    if (xp >= 250) return 2;
    return 1;
}

function categorySessions(profile, category) {
    return profile.sessions.filter((s) => s.category === category);
}

function countCategorySessions(profile, category) {
    return categorySessions(profile, category).length;
}

function bestCategoryAvg(profile, category) {
    const sessions = categorySessions(profile, category);
    if (!sessions.length) return 0;
    return Math.round(sessions.reduce((sum, s) => sum + s.percent, 0) / sessions.length);
}

function categoryGrowth(profile, category) {
    const sessions = categorySessions(profile, category);
    if (sessions.length < 2) return 0;
    const first = sessions[0].percent || 1;
    const latest = sessions[sessions.length - 1].percent;
    return Math.round(((latest - first) / Math.max(first, 1)) * 100);
}

function sessionCompletion(profile) {
    if (!profile.startedSessions) return 0;
    return Math.round((profile.completedSessions / profile.startedSessions) * 100);
}

function skillMastery(profile) {
    const avgs = ['IQ', 'Memory', 'Pattern'].map((c) => bestCategoryAvg(profile, c)).filter((v) => v > 0);
    if (!avgs.length) return 0;
    return Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length);
}

function bestCategory(profile) {
    const scores = ['IQ', 'Memory', 'Pattern', 'Behavior'].map((c) => ({ c, v: bestCategoryAvg(profile, c) }));
    scores.sort((a, b) => b.v - a.v);
    return scores[0].v ? scores[0].c : null;
}

function weakestCategory(profile) {
    const scores = ['IQ', 'Memory', 'Pattern'].map((c) => ({ c, v: bestCategoryAvg(profile, c) })).filter((x) => x.v > 0);
    if (!scores.length) return null;
    scores.sort((a, b) => a.v - b.v);
    return scores[0].c;
}

function recommendation(profile) {
    if (!profile) return 'Create a profile to get personalized recommendations.';
    const weak = weakestCategory(profile);
    if (!weak) return 'Start with Easy IQ and Memory sessions, then add Pattern Recognition.';
    if (weak === 'IQ') return 'Try Medium IQ logic and word analogy rounds to strengthen reasoning.';
    if (weak === 'Memory') return 'Play Number Recall daily and Card Matching at progressive pair levels (3→6→9).';
    if (weak === 'Pattern') return 'Add Hard pattern grids and shape rotation challenges 2x per week.';
    return 'Maintain your streak and complete behavior mentor challenges daily.';
}

function todayMentorComplete(profile) {
    const today = todayKey();
    if (!profile.mentorLog[today]) return 0;
    return Object.values(profile.mentorLog[today]).filter(Boolean).length;
}

function formatPercent(value) {
    return `${value >= 0 ? '+' : ''}${value}%`;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    return `profile-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function clearSessionTimer() {
    if (sessionTimerId) {
        clearTimeout(sessionTimerId);
        sessionTimerId = null;
    }
}

document.addEventListener('DOMContentLoaded', init);
