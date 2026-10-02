const CLASSES = [
  "1A", "1B", "1C", "2A", "2B", "2C",
  "3A", "3B", "3C", "4A", "4B", "4C",
  "5A", "5B", "5C", "6A", "6B", "6C"
];

const SCHOOL_DAYS = [
  { key: "一", name: "星期一", short: "週一" },
  { key: "二", name: "星期二", short: "週二" },
  { key: "三", name: "星期三", short: "週三" },
  { key: "四", name: "星期四", short: "週四" },
  { key: "五", name: "星期五", short: "週五" }
];

const PERIODS = [
  { period: 1, start: "08:00", end: "08:45" },
  { period: 2, start: "08:50", end: "09:35" },
  { period: 3, start: "09:45", end: "10:30" },
  { period: 4, start: "10:35", end: "11:20" },
  { period: 5, start: "11:30", end: "12:15" },
  { period: 6, start: "13:15", end: "14:00" },
  { period: 7, start: "14:05", end: "14:50" },
  { period: 8, start: "14:55", end: "15:40" }
];

const SUBJECTS = {
  "中文": { color: "#FF3B30", teacher: "陳老師" },
  "英文": { color: "#007AFF", teacher: "李老師" },
  "數學": { color: "#5856D6", teacher: "黃老師" },
  "科學": { color: "#34C759", teacher: "周老師" },
  "歷史": { color: "#FF9500", teacher: "梁老師" },
  "地理": { color: "#30B0C7", teacher: "何老師" },
  "電腦": { color: "#5AC8FA", teacher: "郭老師" },
  "視覺藝術": { color: "#FF2D55", teacher: "鄭老師" },
  "音樂": { color: "#AF52DE", teacher: "林老師" },
  "體育": { color: "#A2845E", teacher: "吳老師" },
  "公民": { color: "#8E8E93", teacher: "張老師" },
  "普通話": { color: "#FFCC00", teacher: "羅老師" }
};

const SUBJECT_POOL = Object.keys(SUBJECTS);
const CLASS_NUMBER = Object.fromEntries(CLASSES.map((item, index) => [item, index]));

function buildTimetable() {
  const timetable = {};

  CLASSES.forEach((className, classIndex) => {
    timetable[className] = {};
    SCHOOL_DAYS.forEach((day, dayIndex) => {
      const lessonCount = dayIndex === 4 ? 6 : 7;
      timetable[className][day.key] = Array.from({ length: lessonCount }, (_, lessonIndex) => {
        const subjectIndex = (classIndex * 3 + dayIndex * 4 + lessonIndex * 5) % SUBJECT_POOL.length;
        const subject = SUBJECT_POOL[subjectIndex];
        const period = PERIODS[lessonIndex];
        return {
          period: period.period,
          start: period.start,
          end: period.end,
          subject,
          teacher: SUBJECTS[subject].teacher,
          room: className.startsWith("6") && lessonIndex % 3 === 2
            ? "特別室"
            : `${className[0]}${String(dayIndex + 1)}${String(lessonIndex + 1).padStart(2, "0")}`
        };
      });
    });
  });

  // 保留指定班的代表性数据，让首页内容更稳定、便于日后替换真实数据。
  timetable["3A"]["一"] = [
    { period: 1, start: "08:00", end: "08:45", subject: "中文", teacher: "陳老師", room: "302" },
    { period: 2, start: "08:50", end: "09:35", subject: "英文", teacher: "李老師", room: "302" },
    { period: 3, start: "09:45", end: "10:30", subject: "數學", teacher: "黃老師", room: "302" },
    { period: 4, start: "10:35", end: "11:20", subject: "科學", teacher: "周老師", room: "實驗室" },
    { period: 5, start: "11:30", end: "12:15", subject: "歷史", teacher: "梁老師", room: "302" },
    { period: 6, start: "13:15", end: "14:00", subject: "體育", teacher: "吳老師", room: "操場" },
    { period: 7, start: "14:05", end: "14:50", subject: "視覺藝術", teacher: "鄭老師", room: "視藝室" }
  ];
  timetable["3A"]["三"] = [
    { period: 1, start: "08:00", end: "08:45", subject: "數學", teacher: "黃老師", room: "302" },
    { period: 2, start: "08:50", end: "09:35", subject: "中文", teacher: "陳老師", room: "302" },
    { period: 3, start: "09:45", end: "10:30", subject: "英文", teacher: "李老師", room: "302" },
    { period: 4, start: "10:35", end: "11:20", subject: "地理", teacher: "何老師", room: "地理室" },
    { period: 5, start: "11:30", end: "12:15", subject: "電腦", teacher: "郭老師", room: "電腦室" },
    { period: 6, start: "13:15", end: "14:00", subject: "音樂", teacher: "林老師", room: "音樂室" },
    { period: 7, start: "14:05", end: "14:50", subject: "公民", teacher: "張老師", room: "302" }
  ];
  timetable["3A"]["四"] = [
    { period: 1, start: "08:00", end: "08:45", subject: "英文", teacher: "李老師", room: "302" },
    { period: 2, start: "08:50", end: "09:35", subject: "科學", teacher: "周老師", room: "實驗室" },
    { period: 3, start: "09:45", end: "10:30", subject: "中文", teacher: "陳老師", room: "302" },
    { period: 4, start: "10:35", end: "11:20", subject: "數學", teacher: "黃老師", room: "302" },
    { period: 5, start: "11:30", end: "12:15", subject: "普通話", teacher: "羅老師", room: "語言室" },
    { period: 6, start: "13:15", end: "14:00", subject: "歷史", teacher: "梁老師", room: "302" },
    { period: 7, start: "14:05", end: "14:50", subject: "視覺藝術", teacher: "鄭老師", room: "視藝室" }
  ];

  return timetable;
}

const TIMETABLE = buildTimetable();

const HOLIDAYS = [
  { name: "國慶日", start: "2026-10-01", end: "2026-10-01", emoji: "🎊" },
  { name: "重陽節", start: "2026-10-18", end: "2026-10-18", emoji: "🌼" },
  { name: "追思節", start: "2026-11-02", end: "2026-11-02", emoji: "🕯️" },
  { name: "聖母無原罪瞻禮", start: "2026-12-08", end: "2026-12-08", emoji: "🕊️" },
  { name: "聖誕節假期", start: "2026-12-24", end: "2026-12-25", emoji: "🎄" },
  { name: "元旦", start: "2027-01-01", end: "2027-01-01", emoji: "✨" },
  { name: "農曆新年假期", start: "2027-02-06", end: "2027-02-08", emoji: "🧧" },
  { name: "清明節", start: "2027-04-05", end: "2027-04-05", emoji: "🌿" }
];

const DEFAULT_TODOS = [
  { id: "todo-math", text: "完成數學工作紙第 12 至 18 題", done: false, type: "homework", meta: "明天截止" },
  { id: "todo-english", text: "背誦英文默書範圍", done: false, type: "exam", meta: "星期五測驗" },
  { id: "todo-bring", text: "攜帶科學課本及實驗袍", done: false, type: "bring", meta: "後天使用" },
  { id: "todo-read", text: "閱讀中文課外篇章", done: true, type: "homework", meta: "今日完成" },
  { id: "todo-folder", text: "整理視藝作品文件夾", done: false, type: "custom", meta: "本週內" }
];

const STORAGE_KEYS = {
  className: "my-timetable-class",
  theme: "my-timetable-theme",
  todos: "my-timetable-todos"
};

const state = {
  className: null,
  selectedClass: null,
  activeDay: getTodaySchoolDay(),
  activeTab: "week",
  weekQuery: "",
  searchQuery: "",
  scheduleDay: "today",
  todos: loadTodos(),
  authMode: "login",
  countdownTimer: null,
  toastTimer: null,
  splashFinished: false
};

const elements = {
  splash: document.querySelector("#splash"),
  splashLockup: document.querySelector("#splashLockup"),
  splashBrand: document.querySelector("#splashBrand"),
  appShell: document.querySelector("#appShell"),
  mainContent: document.querySelector("#mainContent"),
  bottomNav: document.querySelector("#bottomNav"),
  glassDock: document.querySelector("#glassDock"),
  navIndicator: document.querySelector("#navIndicator"),
  topbar: document.querySelector("#topbar"),
  brandHome: document.querySelector("#brandHome"),
  brandClass: document.querySelector("#brandClass"),
  settingsButton: document.querySelector("#settingsButton"),
  themeToggle: document.querySelector("#themeToggle"),
  loginButton: document.querySelector("#loginButton"),
  registerButton: document.querySelector("#registerButton"),
  modalLayer: document.querySelector("#modalLayer"),
  authModal: document.querySelector("#authModal"),
  settingsModal: document.querySelector("#settingsModal"),
  settingsClassLabel: document.querySelector("#settingsClassLabel"),
  settingsThemeLabel: document.querySelector("#settingsThemeLabel"),
  changeClassButton: document.querySelector("#changeClassButton"),
  settingsThemeButton: document.querySelector("#settingsThemeButton"),
  authForm: document.querySelector("#authForm"),
  authMessage: document.querySelector("#authMessage"),
  accountInput: document.querySelector("#accountInput"),
  passwordInput: document.querySelector("#passwordInput"),
  rememberMe: document.querySelector("#rememberMe"),
  toast: document.querySelector("#toast")
};

initialize();

function initialize() {
  applySavedTheme();
  registerServiceWorker();
  bindGlobalEvents();
  routeInitialView();
  runSplash();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // 本地以 file:// 打开时不注册 Service Worker。
    });
  });
}

function bindGlobalEvents() {
  window.addEventListener("scroll", () => {
    elements.topbar.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.settingsButton.addEventListener("click", openSettingsModal);
  elements.brandHome.addEventListener("click", () => switchTab("week"));
  elements.loginButton.addEventListener("click", () => openAuthModal("login"));
  elements.registerButton.addEventListener("click", () => openAuthModal("register"));
  elements.authForm.addEventListener("submit", handleAuthSubmit);

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeAuthModal);
  });

  document.querySelectorAll("[data-close-settings]").forEach((element) => {
    element.addEventListener("click", closeSettingsModal);
  });

  elements.changeClassButton.addEventListener("click", () => {
    closeSettingsModal();
    state.selectedClass = state.className;
    renderClassSelection();
  });

  elements.settingsThemeButton.addEventListener("click", () => {
    toggleTheme();
    updateSettingsLabels();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.modalLayer.classList.contains("is-open")) {
      closeAuthModal();
    }
  });

  elements.bottomNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-tab]");
    if (button) {
      switchTab(button.dataset.tab);
    }
  });
}

function runSplash() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  elements.splash.classList.add("is-ready");
  window.setTimeout(finishSplash, 3400);

  if (reduceMotion) {
    window.setTimeout(finishSplash, 250);
    return;
  }

  window.setTimeout(() => {
    elements.splash.classList.add("is-moving");
  }, 1200);

  window.setTimeout(finishSplash, 2280);
}

function finishSplash() {
  if (state.splashFinished || !elements.splash) {
    return;
  }
  state.splashFinished = true;
  elements.splash.classList.add("is-leaving");
  elements.appShell.classList.add("is-ready");
  elements.appShell.setAttribute("aria-hidden", "false");
  window.setTimeout(() => {
    elements.splash?.remove();
    initializeLiquidNavigation();
  }, 430);
}

function initializeLiquidNavigation() {
  if (!state.className || elements.bottomNav.hidden) {
    return;
  }
  window.MyTimetableGlass?.initialize(elements.glassDock);
}

function routeInitialView() {
  const savedClass = localStorage.getItem(STORAGE_KEYS.className);
  if (savedClass) {
    state.className = savedClass;
    state.selectedClass = savedClass;
    elements.brandClass.textContent = savedClass;
    elements.bottomNav.hidden = false;
    switchTab("week");
    return;
  }

  renderClassSelection();
}

function renderClassSelection() {
  clearCountdownTimer();
  elements.bottomNav.hidden = true;
  elements.mainContent.classList.add("is-selecting");
  elements.mainContent.innerHTML = `
    <section class="class-selection page">
      <div class="class-selection__intro">
        <p class="page__eyebrow">開始使用</p>
        <h1>請選擇你的班別</h1>
        <p>選擇後會記住你的班別，下次開啟即可直接查看課表。</p>
      </div>
      <label class="search-box">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m20 20-4-4"></path>
        </svg>
        <input id="classSearch" type="search" placeholder="搜尋班別，例如 3A" autocomplete="off">
      </label>
      <div class="class-grid" id="classGrid"></div>
    </section>
    <footer class="selection-footer glass-surface" id="selectionFooter">
      <div class="selection-footer__inner">
        <div class="selection-footer__copy">
          <span>已選擇班別</span>
          <strong id="selectedClassLabel">請先選擇</strong>
        </div>
        <button class="pill-button" id="confirmClass" type="button" disabled>確認</button>
      </div>
    </footer>
  `;

  const searchInput = document.querySelector("#classSearch");
  const classGrid = document.querySelector("#classGrid");
  const confirmButton = document.querySelector("#confirmClass");
  const footer = document.querySelector("#selectionFooter");
  const selectedLabel = document.querySelector("#selectedClassLabel");

  const updateSelection = () => {
    document.querySelectorAll(".class-option").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.value === state.selectedClass);
    });
    const hasSelection = Boolean(state.selectedClass);
    confirmButton.disabled = !hasSelection;
    footer.classList.toggle("is-visible", hasSelection);
    selectedLabel.textContent = state.selectedClass || "請先選擇";
  };

  const renderOptions = () => {
    const query = searchInput.value.trim();
    const normalized = query.toUpperCase();
    const filtered = CLASSES.filter((className) => className.includes(normalized));
    const exactMatch = CLASSES.some((className) => className.toUpperCase() === normalized);
    let markup = filtered.map((className) => `
      <button class="class-option" type="button" data-value="${escapeAttribute(className)}">${className}</button>
    `).join("");

    if (query && !exactMatch) {
      markup += `
        <button class="class-option class-option--custom" type="button" data-value="${escapeAttribute(query)}">
          使用「${escapeHtml(query)}」作為我的班別
        </button>
      `;
    }

    if (!markup) {
      markup = `<div class="empty-state"><span class="empty-state__icon">🔎</span><h3>找不到班別</h3><p>可直接輸入自訂班別名稱。</p></div>`;
    }

    classGrid.innerHTML = markup;
    updateSelection();
  };

  searchInput.addEventListener("input", renderOptions);
  classGrid.addEventListener("click", (event) => {
    const option = event.target.closest(".class-option");
    if (!option) {
      return;
    }
    state.selectedClass = option.dataset.value;
    updateSelection();
  });

  confirmButton.addEventListener("click", () => {
    if (!state.selectedClass) {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.className, state.selectedClass);
    state.className = state.selectedClass;
    elements.brandClass.textContent = state.className;
    elements.mainContent.classList.remove("is-selecting");
    elements.mainContent.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.985)" },
        { opacity: 1, transform: "scale(1)" }
      ],
      { duration: 420, easing: "ease-in-out" }
    );
    elements.bottomNav.hidden = false;
    initializeLiquidNavigation();
    window.setTimeout(() => {
      state.activeDay = getTodaySchoolDay();
      switchTab("week");
      showToast(`已選擇 ${state.className} 班`);
    }, 210);
  });

  renderOptions();
  window.setTimeout(() => searchInput.focus({ preventScroll: true }), 400);
}

function switchTab(tab) {
  if (!state.className) {
    return;
  }

  state.activeTab = tab;
  clearCountdownTimer();
  window.scrollTo({ top: 0, behavior: "smooth" });

  const navItems = [...document.querySelectorAll(".nav-item")];
  navItems.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tab);
  });
  const activeIndex = Math.max(0, navItems.findIndex((button) => button.dataset.tab === tab));
  elements.navIndicator?.style.setProperty("--nav-index", String(activeIndex));

  const renderers = {
    week: renderWeekPage,
    schedule: renderSchedulePage,
    countdown: renderCountdownPage,
    holiday: renderHolidayPage,
    experience: renderExperiencePage
  };

  elements.mainContent.innerHTML = renderers[tab]();
  bindCurrentPageEvents(tab);

  if (tab === "countdown") {
    startCountdownTimer();
  }
}

function bindCurrentPageEvents(tab) {
  if (tab === "week") {
    bindWeekEvents();
  } else if (tab === "schedule") {
    bindScheduleEvents();
  } else if (tab === "experience") {
    bindExperienceEvents();
  }
}

function renderWeekPage() {
  const activeDay = SCHOOL_DAYS.find((day) => day.key === state.activeDay) || SCHOOL_DAYS[0];
  const lessons = getLessons(state.className, activeDay.key);
  const todayKey = getTodaySchoolDay();
  const dateLabel = formatDate(new Date(), "long");

  return `
    <section class="page">
      <header class="page__header">
        <div>
          <p class="page__eyebrow">週覽</p>
          <h1 class="page__title">今天，從容上課</h1>
          <p class="page__subtitle">${escapeHtml(state.className)} 班 · 點按日期或左右滑動查看</p>
        </div>
        <span class="page__date">${dateLabel}</span>
      </header>

      <label class="search-box week-search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m20 20-4-4"></path>
        </svg>
        <input id="weekSearch" type="search" value="${escapeAttribute(state.weekQuery)}" placeholder="搜尋科目、老師或教室" autocomplete="off">
        <button class="search-clear ${state.weekQuery ? "is-visible" : ""}" id="clearWeekSearch" type="button" aria-label="清除搜尋">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18"></path>
          </svg>
        </button>
      </label>

      <div class="day-switcher" id="daySwitcher">
        ${SCHOOL_DAYS.map((day, index) => `
          <button class="day-button ${day.key === activeDay.key ? "is-active" : ""} ${day.key === todayKey ? "is-today" : ""}" type="button" data-day="${day.key}">
            <strong>${day.short}</strong>
            <span>${formatWeekdayDate(index)}</span>
          </button>
        `).join("")}
      </div>

      <article class="week-panel card" id="weekPanel">
        ${renderWeekPanelContent(activeDay, lessons)}
      </article>

      <p class="swipe-hint">
        <span>←</span>
        左右滑動切換日期
        <span>→</span>
      </p>
    </section>
  `;
}

function renderWeekPanelContent(day, lessons) {
  const now = new Date();
  const date = getDateForSchoolDay(day.key, now);
  const dateText = date ? formatDate(date, "medium") : "本週";
  const query = state.weekQuery.toLocaleLowerCase("zh-Hant");
  const visibleLessons = query
    ? lessons.filter((lesson) => (
      `${lesson.subject} ${lesson.teacher} ${lesson.room}`.toLocaleLowerCase("zh-Hant").includes(query)
    ))
    : lessons;

  return `
    <header class="week-panel__header">
      <div>
        <h2>${day.name}</h2>
        <p>${dateText} · ${query ? `找到 ${visibleLessons.length} 節課` : `共 ${lessons.length} 節課`}</p>
      </div>
      <span class="schedule-card__count">${visibleLessons.length} 節</span>
    </header>
    <div class="lesson-list">
      ${visibleLessons.length
        ? visibleLessons.map((lesson) => renderLessonCard(lesson, { showCurrent: true, date })).join("")
        : `<div class="lesson-card is-empty">${query ? "找不到符合的課堂" : "今日無課，好好休息"}</div>`}
    </div>
  `;
}

function bindWeekEvents() {
  const switcher = document.querySelector("#daySwitcher");
  const panel = document.querySelector("#weekPanel");
  const searchInput = document.querySelector("#weekSearch");
  const clearButton = document.querySelector("#clearWeekSearch");

  switcher?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-day]");
    if (!button) {
      return;
    }
    updateActiveDay(button.dataset.day);
  });

  let touchStartX = 0;
  let touchStartY = 0;

  panel?.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });

  panel?.addEventListener("touchend", (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const deltaY = event.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    const currentIndex = SCHOOL_DAYS.findIndex((day) => day.key === state.activeDay);
    const nextIndex = deltaX < 0
      ? Math.min(currentIndex + 1, SCHOOL_DAYS.length - 1)
      : Math.max(currentIndex - 1, 0);

    if (nextIndex !== currentIndex) {
      panel.classList.add(deltaX < 0 ? "swiping-left" : "swiping-right");
      window.setTimeout(() => updateActiveDay(SCHOOL_DAYS[nextIndex].key), 140);
    }
  }, { passive: true });

  searchInput?.addEventListener("input", () => {
    state.weekQuery = searchInput.value.trim();
    clearButton?.classList.toggle("is-visible", Boolean(state.weekQuery));
    const day = SCHOOL_DAYS.find((item) => item.key === state.activeDay) || SCHOOL_DAYS[0];
    panel.innerHTML = renderWeekPanelContent(day, getLessons(state.className, day.key));
  });

  clearButton?.addEventListener("click", () => {
    state.weekQuery = "";
    searchInput.value = "";
    clearButton.classList.remove("is-visible");
    const day = SCHOOL_DAYS.find((item) => item.key === state.activeDay) || SCHOOL_DAYS[0];
    panel.innerHTML = renderWeekPanelContent(day, getLessons(state.className, day.key));
    searchInput.focus();
  });
}

function updateActiveDay(dayKey) {
  state.activeDay = dayKey;
  document.querySelectorAll("[data-day]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.day === dayKey);
  });

  const day = SCHOOL_DAYS.find((item) => item.key === dayKey) || SCHOOL_DAYS[0];
  const panel = document.querySelector("#weekPanel");
  if (panel) {
    panel.animate(
      [
        { opacity: 0.3, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 260, easing: "ease-out" }
    );
    panel.innerHTML = renderWeekPanelContent(day, getLessons(state.className, day.key));
  }
}

function renderSchedulePage() {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const todayData = getDayScheduleData(today);
  const tomorrowData = getDayScheduleData(tomorrow);
  const searchResults = getSearchResults(state.searchQuery);
  const selectedData = state.scheduleDay === "tomorrow" ? tomorrowData : todayData;
  const selectedLabel = state.scheduleDay === "tomorrow" ? "明天" : "今天";

  return `
    <section class="page">
      <header class="page__header">
        <div>
          <p class="page__eyebrow">課表</p>
          <h1 class="page__title">是日課表</h1>
          <p class="page__subtitle">切換今天與明天，快速掌握下一節課。</p>
        </div>
      </header>

      <label class="search-box">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m20 20-4-4"></path>
        </svg>
        <input id="scheduleSearch" type="search" value="${escapeAttribute(state.searchQuery)}" placeholder="搜尋老師或科目" autocomplete="off">
        <button class="search-clear ${state.searchQuery ? "is-visible" : ""}" id="clearSearch" type="button" aria-label="清除搜尋">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18"></path>
          </svg>
        </button>
      </label>

      <div class="schedule-tabs" role="tablist" aria-label="選擇日期">
        <button class="schedule-tab ${state.scheduleDay === "today" ? "is-active" : ""}" type="button" role="tab" aria-selected="${state.scheduleDay === "today"}" data-schedule-day="today">今天</button>
        <button class="schedule-tab ${state.scheduleDay === "tomorrow" ? "is-active" : ""}" type="button" role="tab" aria-selected="${state.scheduleDay === "tomorrow"}" data-schedule-day="tomorrow">明天</button>
      </div>

      <div id="scheduleContent">
        ${state.searchQuery
          ? renderSearchResults(searchResults)
          : `
            <div class="schedule-stack section">
              ${renderDayScheduleCard(selectedLabel, selectedData)}
            </div>
          `}
      </div>
    </section>
  `;
}

function renderDayScheduleCard(label, data) {
  const holidayMessage = data.holiday?.name || "今日毋須上課";
  return `
    <article class="schedule-card card">
      <header class="schedule-card__header">
        <div>
          <h2>${label}</h2>
          <p>${data.dateText} · ${data.dayName}</p>
        </div>
        <span class="schedule-card__count">${data.isHoliday ? "放假" : `${data.lessons.length} 節`}</span>
      </header>
      ${data.isHoliday
        ? `
          <div class="empty-holiday">
            <span class="empty-holiday__emoji">${data.holiday ? "🎉" : "☁️"}</span>
            <h3>${label}放假</h3>
            <span class="holiday-badge">${escapeHtml(holidayMessage)}</span>
            <p>放慢腳步，讓今天也有一點期待的空間。</p>
          </div>
        `
        : `
          <div class="lesson-list">
            ${data.lessons.length
              ? data.lessons.map((lesson) => renderLessonCard(lesson, { showCurrent: label === "今天" })).join("")
              : `<div class="lesson-card is-empty">這天沒有課</div>`}
          </div>
        `}
    </article>
  `;
}

function bindScheduleEvents() {
  const searchInput = document.querySelector("#scheduleSearch");
  const content = document.querySelector("#scheduleContent");
  const clearButton = document.querySelector("#clearSearch");
  const tabs = document.querySelector(".schedule-tabs");

  searchInput?.addEventListener("input", () => {
    state.searchQuery = searchInput.value.trim();
    clearButton.classList.toggle("is-visible", Boolean(state.searchQuery));
    const todayData = getDayScheduleData(new Date());
    const tomorrowData = getDayScheduleData(addDays(new Date(), 1));
    const selectedData = state.scheduleDay === "tomorrow" ? tomorrowData : todayData;
    const selectedLabel = state.scheduleDay === "tomorrow" ? "明天" : "今天";
    content.innerHTML = state.searchQuery
      ? renderSearchResults(getSearchResults(state.searchQuery))
      : `
        <div class="schedule-stack section">
          ${renderDayScheduleCard(selectedLabel, selectedData)}
        </div>
      `;
  });

  tabs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-schedule-day]");
    if (!button) {
      return;
    }

    state.scheduleDay = button.dataset.scheduleDay;
    tabs.querySelectorAll("[data-schedule-day]").forEach((item) => {
      const isActive = item.dataset.scheduleDay === state.scheduleDay;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    const todayData = getDayScheduleData(new Date());
    const tomorrowData = getDayScheduleData(addDays(new Date(), 1));
    const selectedData = state.scheduleDay === "tomorrow" ? tomorrowData : todayData;
    const selectedLabel = state.scheduleDay === "tomorrow" ? "明天" : "今天";
    content.innerHTML = `
      <div class="schedule-stack section">
        ${renderDayScheduleCard(selectedLabel, selectedData)}
      </div>
    `;
  });

  clearButton?.addEventListener("click", () => {
    state.searchQuery = "";
    searchInput.value = "";
    clearButton.classList.remove("is-visible");
    searchInput.dispatchEvent(new Event("input"));
    searchInput.focus();
  });
}

function getSearchResults(query) {
  if (!query) {
    return [];
  }

  const normalized = query.toLocaleLowerCase("zh-Hant");
  const results = [];

  Object.entries(TIMETABLE).forEach(([className, days]) => {
    SCHOOL_DAYS.forEach((day) => {
      days[day.key].forEach((lesson) => {
        const haystack = `${lesson.subject} ${lesson.teacher}`.toLocaleLowerCase("zh-Hant");
        if (haystack.includes(normalized)) {
          results.push({ ...lesson, className, dayName: day.name, dayKey: day.key });
        }
      });
    });
  });

  return results.sort((a, b) => {
    const classWeight = Number(b.className === state.className) - Number(a.className === state.className);
    if (classWeight) {
      return classWeight;
    }
    const dayWeight = SCHOOL_DAYS.findIndex((day) => day.key === a.dayKey) - SCHOOL_DAYS.findIndex((day) => day.key === b.dayKey);
    return dayWeight || a.period - b.period;
  });
}

function renderSearchResults(results) {
  const query = state.searchQuery;
  if (!results.length) {
    return `
      <div class="empty-state card section">
        <span class="empty-state__icon">🔎</span>
        <h3>找不到相關課堂</h3>
        <p>請嘗試輸入其他老師姓名或科目名稱。</p>
      </div>
    `;
  }

  return `
    <section class="section">
      <div class="section-heading">
        <h2>搜尋結果</h2>
        <p>共 ${results.length} 節課</p>
      </div>
      <div class="search-results">
        ${results.map((lesson) => `
          <article class="search-result">
            <div class="search-result__top">
              <h3>${highlightText(lesson.subject, query)}</h3>
              <span class="search-result__class">${escapeHtml(lesson.className)} 班</span>
            </div>
            <p>${highlightText(lesson.teacher, query)} · ${lesson.dayName} 第 ${lesson.period} 節<br>${lesson.start} – ${lesson.end} · ${escapeHtml(lesson.room)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCountdownPage() {
  const countdown = getCountdownState(new Date());
  const todayLessons = getTodayLessonsWithContext();
  const heroClass = countdown.mode === "break" ? "is-break" : countdown.mode === "after" ? "is-after" : "";

  return `
    <section class="page">
      <header class="page__header">
        <div>
          <p class="page__eyebrow">即時倒數</p>
          <h1 class="page__title">掌握每一分鐘</h1>
          <p class="page__subtitle">倒數會每秒更新，切換到其他分頁後自動暫停。</p>
        </div>
      </header>

      <article class="countdown-hero card ${heroClass}" id="countdownHero">
        ${renderCountdownHeroContent(countdown)}
      </article>

      <section class="section">
        <div class="section-heading">
          <h2>今日剩餘課堂</h2>
          <p>${todayLessons.length ? `尚有 ${todayLessons.length} 節` : "今日已完成"}</p>
        </div>
        <div class="remaining-list" id="remainingList">
          ${renderRemainingLessons(todayLessons)}
        </div>
      </section>
    </section>
  `;
}

function renderCountdownHeroContent(countdown) {
  const ringLength = 2 * Math.PI * 48;
  const ringOffset = ringLength * (1 - countdown.progress);
  return `
    <div class="countdown-clock">
      <div class="progress-ring progress-ring--clock" aria-label="課堂進度 ${Math.round(countdown.progress * 100)}%">
        <svg viewBox="0 0 112 112" aria-hidden="true">
          <circle class="progress-ring__track" cx="56" cy="56" r="48"></circle>
          <circle class="progress-ring__value" id="progressRingValue" cx="56" cy="56" r="48" stroke-dasharray="${ringLength}" stroke-dashoffset="${ringOffset}"></circle>
        </svg>
        <div class="countdown-clock__content">
          <p class="countdown-label">即時時間</p>
          <strong class="countdown-time" id="countdownTime">${countdown.display}</strong>
          <span class="countdown-label-detail">${countdown.mode === "lesson" ? "距離下課" : countdown.mode === "break" ? "休息時間" : "下一堂課"}</span>
        </div>
      </div>
      <span class="progress-ring__label" id="progressRingLabel">${Math.round(countdown.progress * 100)}%</span>
    </div>
    <div class="countdown-copy">
      <p class="countdown-subject" id="countdownSubject">${escapeHtml(countdown.subject)}</p>
      <p class="countdown-detail" id="countdownDetail">${escapeHtml(countdown.detail)}</p>
      <p class="countdown-status" id="countdownStatus">${escapeHtml(countdown.label)}</p>
    </div>
    <div class="countdown-progress">
      <div class="countdown-progress__meta">
        <span>${countdown.progressLabel}</span>
        <span id="countdownTimeRange">${escapeHtml(countdown.timeRange)}</span>
      </div>
      <div class="progress-track">
        <div class="progress-track__value" id="countdownProgressValue" style="width:${countdown.progress * 100}%"></div>
      </div>
    </div>
  `;
}

function startCountdownTimer() {
  updateCountdownDom();
  state.countdownTimer = window.setInterval(updateCountdownDom, 1000);
}

function updateCountdownDom() {
  if (state.activeTab !== "countdown") {
    clearCountdownTimer();
    return;
  }

  const countdown = getCountdownState(new Date());
  const timeElement = document.querySelector("#countdownTime");
  const timeRange = document.querySelector("#countdownTimeRange");
  const progressBar = document.querySelector("#countdownProgressValue");
  const ring = document.querySelector("#progressRingValue");
  const ringLabel = document.querySelector("#progressRingLabel");
  const subject = document.querySelector("#countdownSubject");
  const detail = document.querySelector("#countdownDetail");
  const status = document.querySelector("#countdownStatus");
  const hero = document.querySelector("#countdownHero");

  if (!timeElement || !hero) {
    return;
  }

  timeElement.textContent = countdown.display;
  timeElement.classList.remove("is-beating");
  void timeElement.offsetWidth;
  timeElement.classList.add("is-beating");

  hero.classList.toggle("is-break", countdown.mode === "break");
  hero.classList.toggle("is-after", countdown.mode === "after");

  if (timeRange) {
    timeRange.textContent = countdown.timeRange;
  }
  if (progressBar) {
    progressBar.style.width = `${countdown.progress * 100}%`;
  }
  if (ring) {
    const ringLength = 2 * Math.PI * 48;
    ring.style.strokeDashoffset = String(ringLength * (1 - countdown.progress));
  }
  if (ringLabel) {
    ringLabel.textContent = `${Math.round(countdown.progress * 100)}%`;
  }
  if (subject) {
    subject.textContent = countdown.subject;
  }
  if (detail) {
    detail.textContent = countdown.detail;
  }
  if (status) {
    status.textContent = countdown.label;
  }

  const remainingList = document.querySelector("#remainingList");
  if (remainingList) {
    const todayLessons = getTodayLessonsWithContext();
    remainingList.innerHTML = renderRemainingLessons(todayLessons);
  }
}

function clearCountdownTimer() {
  if (state.countdownTimer) {
    window.clearInterval(state.countdownTimer);
    state.countdownTimer = null;
  }
}

function getCountdownState(now) {
  if (!state.className) {
    return getEmptyCountdownState();
  }

  const holiday = getHolidayForDate(now);
  const dayKey = getTodaySchoolDay(now);
  const isSchoolDay = Boolean(dayKey);
  const todayLessons = isSchoolDay && !holiday ? getLessons(state.className, dayKey) : [];
  const lessonWithDate = getCurrentLesson(todayLessons, now);

  if (lessonWithDate) {
    const { lesson, start, end } = lessonWithDate;
    const duration = end - start;
    const progress = clamp((now - start) / duration, 0, 1);
    return {
      mode: "lesson",
      label: "距離下課還有",
      display: formatDuration(end - now),
      subject: lesson.subject,
      detail: `${lesson.teacher} · ${lesson.room} · 第 ${lesson.period} 節`,
      timeRange: `${lesson.start} – ${lesson.end}`,
      progress,
      progressLabel: "本節進度"
    };
  }

  const nextLesson = getNextLesson(now);
  if (!nextLesson) {
    return getEmptyCountdownState();
  }

  const isToday = nextLesson.date.toDateString() === now.toDateString();
  const previousLesson = todayLessons
    .filter((lesson) => timeToDate(now, lesson.end) <= now)
    .sort((a, b) => timeToMinutes(b.end) - timeToMinutes(a.end))[0];
  const isLunch = isToday && previousLesson && now >= timeOnDate(now, "12:15") && now < timeOnDate(now, "13:15");
  const isBreak = isToday && Boolean(previousLesson) && !isLunch;
  const label = isLunch
    ? "距離午休結束還有"
    : isBreak
      ? "距離上課還有"
      : isToday
        ? "距離第一節課還有"
        : "距離下一堂課還有";
  const start = timeToDate(nextLesson.date, nextLesson.lesson.start);
  const remaining = Math.max(0, start - now);
  const isSameDay = nextLesson.date.toDateString() === now.toDateString();
  const isTomorrow = nextLesson.date.toDateString() === addDays(now, 1).toDateString();
  const dayDetail = isSameDay ? "今天" : isTomorrow ? "明天" : formatDate(nextLesson.date, "medium");

  return {
    mode: isBreak || isLunch ? "break" : "before",
    label,
    display: remaining < 86400000 ? formatDuration(remaining) : formatLongDuration(remaining),
    subject: nextLesson.lesson.subject,
    detail: `${nextLesson.lesson.teacher} · ${nextLesson.lesson.room} · ${dayDetail} ${nextLesson.lesson.start}`,
    timeRange: `${nextLesson.lesson.start} – ${nextLesson.lesson.end}`,
    progress: isBreak ? getBreakProgress(now, previousLesson, nextLesson.lesson) : 0,
    progressLabel: isBreak ? "小息進度" : "下一節課"
  };
}

function getEmptyCountdownState() {
  return {
    mode: "after",
    label: "目前沒有課堂",
    display: "00:00:00",
    subject: "今日課程已完成",
    detail: "好好休息，為下一段學習補充能量。",
    timeRange: "今日",
    progress: 1,
    progressLabel: "今日進度"
  };
}

function getCurrentLesson(lessons, now) {
  const dateKey = getDateKey(now);
  return lessons.map((lesson) => {
    const start = timeToDate(now, lesson.start);
    const end = timeToDate(now, lesson.end);
    return { lesson, start, end, dateKey };
  }).find(({ start, end }) => now >= start && now < end) || null;
}

function getNextLesson(now) {
  for (let dayOffset = 0; dayOffset < 370; dayOffset += 1) {
    const date = addDays(now, dayOffset);
    if (getHolidayForDate(date)) {
      continue;
    }

    const dayKey = getTodaySchoolDay(date);
    if (!dayKey) {
      continue;
    }

    const lessons = getLessons(state.className, dayKey);
    const nextLesson = lessons.find((lesson) => timeToDate(date, lesson.start) > now);
    if (nextLesson) {
      return { date, dayKey, lesson: nextLesson };
    }
  }
  return null;
}

function getTodayLessonsWithContext() {
  const now = new Date();
  const holiday = getHolidayForDate(now);
  const dayKey = getTodaySchoolDay(now);
  if (!dayKey || holiday) {
    return [];
  }

  return getLessons(state.className, dayKey)
    .filter((lesson) => timeToDate(now, lesson.end) > now)
    .map((lesson) => {
      const start = timeToDate(now, lesson.start);
      const end = timeToDate(now, lesson.end);
      const isCurrent = now >= start && now < end;
      const remaining = isCurrent ? end - now : start - now;
      return {
        ...lesson,
        isCurrent,
        countdownText: isCurrent
          ? `還有 ${formatCompactDuration(end - now)} 下課`
          : `還有 ${formatDurationVerbose(remaining)}`
      };
    });
}

function renderRemainingLessons(lessons) {
  if (!lessons.length) {
    return `
      <div class="empty-state card">
        <span class="empty-state__icon">🌤️</span>
        <h3>今日課堂已結束</h3>
        <p>放鬆一下，記得整理今天的筆記。</p>
      </div>
    `;
  }

  return lessons.map((lesson) => `
    <article class="remaining-item" style="--subject-color:${getSubjectColor(lesson.subject)}">
      <span class="remaining-item__dot" aria-hidden="true"></span>
      <div class="remaining-item__copy">
        <h3>${escapeHtml(lesson.subject)}</h3>
        <p>第 ${lesson.period} 節 · ${lesson.start} – ${lesson.end}</p>
      </div>
      <span class="remaining-item__time">${lesson.countdownText}</span>
    </article>
  `).join("");
}

function renderHolidayPage() {
  const upcoming = getUpcomingHolidays(new Date());
  const hero = upcoming[0];
  const rest = upcoming.slice(1);

  return `
    <section class="page">
      <header class="page__header">
        <div>
          <p class="page__eyebrow">假期倒數</p>
          <h1 class="page__title">下一個假期</h1>
          <p class="page__subtitle">假期資料為示範內容，日後可直接替換為學校正式校曆。</p>
        </div>
      </header>

      ${hero ? `
        <article class="holiday-hero card ${hero.isActive ? "is-active" : ""}">
          <span class="holiday-hero__emoji">${hero.emoji}</span>
          <p class="holiday-hero__label">${hero.isActive ? "假期進行中" : "即將到來"}</p>
          <h2>${escapeHtml(hero.name)}</h2>
          <p class="holiday-hero__range">${formatHolidayRange(hero)}</p>
          <div class="holiday-hero__count">${getHolidayCountdownText(hero)}</div>
        </article>

        <section class="section">
          <div class="section-heading">
            <h2>其後假期</h2>
            <p>依日期排序</p>
          </div>
          <div class="holiday-list">
            ${rest.map((holiday) => `
              <article class="holiday-item">
                <span class="holiday-item__emoji">${holiday.emoji}</span>
                <div class="holiday-item__copy">
                  <h3>${escapeHtml(holiday.name)}</h3>
                  <p>${formatHolidayRange(holiday)}</p>
                </div>
                <span class="holiday-item__days">${getHolidayShortCountdown(holiday)}</span>
              </article>
            `).join("")}
          </div>
        </section>
      ` : `
        <div class="empty-state card">
          <span class="empty-state__icon">🗓️</span>
          <h3>暫時沒有即將到來的假期</h3>
          <p>新假期公布後會顯示在這裡。</p>
        </div>
      `}
    </section>
  `;
}

function renderExperiencePage() {
  const completedCount = state.todos.filter((todo) => todo.done).length;
  const progress = state.todos.length ? completedCount / state.todos.length : 0;
  const sorted = [...state.todos].sort((a, b) => Number(a.done) - Number(b.done));
  const now = new Date();
  const todayHoliday = getHolidayForDate(now);
  const todaySchoolDay = getTodaySchoolDay(now);
  const todayLessons = !todayHoliday && todaySchoolDay
    ? getLessons(state.className, todaySchoolDay)
    : [];
  const monthTitle = new Intl.DateTimeFormat("zh-Hant", {
    year: "numeric",
    month: "long"
  }).format(now);

  return `
    <section class="page">
      <header class="page__header">
        <div>
          <p class="page__eyebrow">月曆</p>
          <h1 class="page__title">${monthTitle}</h1>
          <p class="page__subtitle">查看本月上課日與假期，今日待辦也集中顯示在下方。</p>
        </div>
      </header>

      ${renderMonthCalendar(now)}

      <section class="section">
        <div class="section-heading">
          <h2>${formatDate(now, "long")}的事件</h2>
          <p>${todayHoliday || todayLessons.length ? "今日行程" : "沒有安排"}</p>
        </div>
        <div class="day-events card">
          ${todayHoliday
            ? `
              <article class="day-event day-event--holiday">
                <span class="day-event__icon">${todayHoliday.emoji}</span>
                <div>
                  <h3>${escapeHtml(todayHoliday.name)}</h3>
                  <p>公眾假期 · ${todayHoliday.start === todayHoliday.end ? formatDate(todayHoliday.start, "medium") : `${formatDate(todayHoliday.start, "medium")} 至 ${formatDate(todayHoliday.end, "medium")}`}</p>
                </div>
                <span class="day-event__badge">放假</span>
              </article>
            `
            : todayLessons.length
              ? todayLessons.map((lesson) => `
                <article class="day-event" style="--subject-color:${getSubjectColor(lesson.subject)}">
                  <span class="day-event__icon day-event__icon--lesson">${lesson.period}</span>
                  <div>
                    <h3>${escapeHtml(lesson.subject)}</h3>
                    <p>${lesson.start} – ${lesson.end} · ${escapeHtml(lesson.teacher)} · ${escapeHtml(lesson.room)}</p>
                  </div>
                  <span class="day-event__badge">第 ${lesson.period} 節</span>
                </article>
              `).join("")
              : `
                <div class="empty-state">
                  <span class="empty-state__icon">☕️</span>
                  <h3>今天沒有課堂或假期安排</h3>
                  <p>可以專心完成待辦事項。</p>
                </div>
              `}
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <h2>今日待辦</h2>
          <p>${sorted.some((todo) => !todo.done) ? "按一下即可完成" : "全部完成"}</p>
        </div>
        <article class="progress-summary card">
          <div class="progress-summary__top">
            <h2>今日完成</h2>
            <span class="progress-summary__count">${completedCount} / ${state.todos.length}</span>
          </div>
          <div class="progress-track">
            <div class="progress-track__value" style="width:${progress * 100}%"></div>
          </div>
        </article>
        <div class="task-list" id="taskList">
          ${sorted.length ? sorted.map(renderTaskRow).join("") : `
            <div class="empty-state card">
              <span class="empty-state__icon">✨</span>
              <h3>今天沒有特別事項</h3>
              <p>可以新增一項提醒，或輕鬆享受空閒時間。</p>
            </div>
          `}
        </div>
        <form class="add-task-card" id="addTaskForm">
          <input id="newTaskInput" type="text" maxlength="80" placeholder="新增待辦事項" aria-label="新增待辦事項">
          <button type="submit">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            新增事項
          </button>
        </form>
      </section>
    </section>
  `;
}

function renderMonthCalendar(referenceDate) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = getDateKey(new Date());
  const weekdays = ["一", "二", "三", "四", "五", "六", "日"];
  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const dayNumber = index - mondayOffset + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) {
      cells.push(`<span class="calendar-day is-outside" aria-hidden="true"></span>`);
      continue;
    }

    const date = new Date(year, month, dayNumber, 12, 0, 0, 0);
    const dateKey = getDateKey(date);
    const holiday = getHolidayForDate(date);
    const schoolDay = getTodaySchoolDay(date);
    const lessonCount = holiday || !schoolDay ? 0 : getLessons(state.className, schoolDay).length;
    const isToday = dateKey === todayKey;
    const classes = [
      "calendar-day",
      isToday ? "is-today" : "",
      holiday ? "is-holiday" : "",
      !schoolDay ? "is-weekend" : ""
    ].filter(Boolean).join(" ");

    cells.push(`
      <span class="${classes}" title="${holiday ? escapeAttribute(holiday.name) : lessonCount ? `${lessonCount} 節課` : "不用上課"}">
        <span class="calendar-day__number">${dayNumber}</span>
        ${holiday ? `<span class="calendar-day__event"></span>` : ""}
        ${lessonCount ? `<span class="calendar-day__lessons" aria-label="${lessonCount} 節課">${Array.from({ length: Math.min(lessonCount, 3) }, () => `<i></i>`).join("")}</span>` : ""}
      </span>
    `);
  }

  return `
    <article class="month-calendar card">
      <div class="calendar-grid calendar-grid--weekdays">
        ${weekdays.map((day) => `<span>${day}</span>`).join("")}
      </div>
      <div class="calendar-grid calendar-grid--days">
        ${cells.join("")}
      </div>
    </article>
  `;
}

function renderTaskRow(todo) {
  return `
    <article class="task-row ${todo.done ? "is-done" : ""}" data-task-id="${escapeAttribute(todo.id)}">
      <button class="task-check" type="button" aria-label="${todo.done ? "標記為未完成" : "標記為完成"}">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 4 4L19 6"></path>
        </svg>
      </button>
      <div class="task-row__copy">
        <p class="task-row__title">${escapeHtml(todo.text)}</p>
        <div class="task-row__meta">
          <span class="task-type task-type--${todo.type}">${getTaskTypeLabel(todo.type)}</span>
          <span>${escapeHtml(todo.meta || "今日事項")}</span>
        </div>
      </div>
      <button class="task-row__delete" type="button" aria-label="刪除事項">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"></path>
        </svg>
      </button>
    </article>
  `;
}

function bindExperienceEvents() {
  const taskList = document.querySelector("#taskList");
  const addForm = document.querySelector("#addTaskForm");

  taskList?.addEventListener("click", (event) => {
    const row = event.target.closest("[data-task-id]");
    if (!row) {
      return;
    }

    const todo = state.todos.find((item) => item.id === row.dataset.taskId);
    if (!todo) {
      return;
    }

    if (event.target.closest(".task-row__delete")) {
      state.todos = state.todos.filter((item) => item.id !== todo.id);
      saveTodos();
      switchTab("experience");
      showToast("已刪除事項");
      return;
    }

    if (event.target.closest(".task-check")) {
      todo.done = !todo.done;
      if (todo.done && todo.type !== "exam") {
        todo.meta = "今日完成";
      }
      saveTodos();
      switchTab("experience");
    }
  });

  addForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#newTaskInput");
    const text = input.value.trim();
    if (!text) {
      input.focus();
      return;
    }

    state.todos.push({
      id: `todo-custom-${Date.now()}`,
      text,
      done: false,
      type: "custom",
      meta: "自訂事項"
    });
    saveTodos();
    switchTab("experience");
    showToast("已新增事項");
  });
}

function renderLessonCard(lesson, options = {}) {
  const color = getSubjectColor(lesson.subject);
  const date = options.date || new Date();
  const isCurrent = options.showCurrent && isLessonCurrent(lesson, date);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const current = isCurrent && isToday;

  return `
    <article class="lesson-card ${current ? "is-current" : ""}" style="--subject-color:${color}">
      <span class="period-badge">第 ${lesson.period} 節</span>
      <div class="lesson-card__body">
        <h3 class="lesson-card__title">${escapeHtml(lesson.subject)}</h3>
        <div class="lesson-card__meta">
          <span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4.5 21a7.5 7.5 0 0 1 15 0"></path></svg>
            ${escapeHtml(lesson.teacher)}
          </span>
          <span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>
            ${escapeHtml(lesson.room)}
          </span>
        </div>
        ${current ? `<span class="current-tag">現在進行中</span>` : ""}
      </div>
      <span class="lesson-card__time">${lesson.start}<br>${lesson.end}</span>
    </article>
  `;
}

function getDayScheduleData(date) {
  const holiday = getHolidayForDate(date);
  const dayKey = getTodaySchoolDay(date);
  const lessons = !holiday && dayKey ? getLessons(state.className, dayKey) : [];
  const weekday = new Intl.DateTimeFormat("zh-Hant", { weekday: "long" }).format(date);

  return {
    date,
    dateText: formatDate(date, "medium"),
    dayName: weekday,
    holiday,
    isHoliday: Boolean(holiday) || !dayKey,
    lessons
  };
}

function getLessons(className, dayKey) {
  return TIMETABLE[className]?.[dayKey] || [];
}

function isLessonCurrent(lesson, date) {
  const now = new Date();
  if (date.toDateString() !== now.toDateString()) {
    return false;
  }
  const start = timeToDate(date, lesson.start);
  const end = timeToDate(date, lesson.end);
  return now >= start && now < end;
}

function getUpcomingHolidays(now) {
  const today = startOfDay(now);
  return HOLIDAYS.map((holiday) => {
    const start = parseDate(holiday.start);
    const end = parseDate(holiday.end);
    return {
      ...holiday,
      startDate: start,
      endDate: end,
      days: Math.max(0, Math.ceil((startOfDay(start) - today) / 86400000)),
      isActive: today >= startOfDay(start) && today <= startOfDay(end)
    };
  })
    .filter((holiday) => holiday.endDate >= today)
    .sort((a, b) => a.startDate - b.startDate);
}

function getHolidayForDate(date) {
  const normalized = startOfDay(date);
  return HOLIDAYS.find((holiday) => (
    normalized >= startOfDay(parseDate(holiday.start)) &&
    normalized <= startOfDay(parseDate(holiday.end))
  )) || null;
}

function getHolidayCountdownText(holiday) {
  if (holiday.isActive) {
    const daysLeft = Math.max(0, Math.ceil((startOfDay(holiday.endDate) - startOfDay(new Date())) / 86400000) + 1);
    return `放假中！還有 ${daysLeft} 天結束`;
  }
  return `還有 ${holiday.days} 天`;
}

function getHolidayShortCountdown(holiday) {
  if (holiday.isActive) {
    return "放假中";
  }
  return `還有 ${holiday.days} 天`;
}

function formatHolidayRange(holiday) {
  if (holiday.start === holiday.end) {
    return formatDate(holiday.startDate, "long");
  }
  return `${formatDate(holiday.startDate, "medium")} 至 ${formatDate(holiday.endDate, "medium")}`;
}

function formatDate(dateInput, style = "medium") {
  const date = typeof dateInput === "string" ? parseDate(dateInput) : dateInput;
  const options = style === "long"
    ? { year: "numeric", month: "long", day: "numeric", weekday: "short" }
    : { month: "long", day: "numeric", weekday: "short" };
  return new Intl.DateTimeFormat("zh-Hant", options).format(date);
}

function formatWeekdayDate(index) {
  const now = new Date();
  const currentIndex = now.getDay() - 1;
  const offset = index - Math.max(0, Math.min(4, currentIndex));
  const date = addDays(now, offset);
  return new Intl.DateTimeFormat("zh-Hant", { month: "numeric", day: "numeric" }).format(date);
}

function getDateForSchoolDay(dayKey, referenceDate) {
  const index = SCHOOL_DAYS.findIndex((day) => day.key === dayKey);
  if (index < 0) {
    return null;
  }
  const monday = startOfWeek(referenceDate);
  return addDays(monday, index);
}

function getTodaySchoolDay(date = new Date()) {
  const day = date.getDay();
  if (day >= 1 && day <= 5) {
    return SCHOOL_DAYS[day - 1].key;
  }
  return "";
}

function getSubjectColor(subject) {
  return SUBJECTS[subject]?.color || "#007AFF";
}

function getTaskTypeLabel(type) {
  return {
    homework: "功課",
    exam: "測驗",
    bring: "攜帶",
    custom: "自訂"
  }[type] || "事項";
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

function formatCompactDuration(milliseconds) {
  const totalMinutes = Math.max(0, Math.ceil(milliseconds / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours} 小時 ${minutes} 分`;
  }
  if (hours > 0) {
    return `${hours} 小時`;
  }
  return `${minutes} 分鐘`;
}

function formatDurationVerbose(milliseconds) {
  const totalMinutes = Math.max(0, Math.ceil(milliseconds / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours} 小時 ${minutes} 分`;
  }
  if (hours > 0) {
    return `${hours} 小時`;
  }
  return `${minutes} 分鐘`;
}

function formatLongDuration(milliseconds) {
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) {
    return `${days} 天 ${hours} 小時`;
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
}

function getBreakProgress(now, previousLesson, nextLesson) {
  if (!previousLesson) {
    return 0;
  }
  const start = timeToDate(now, previousLesson.end);
  const end = timeToDate(now, nextLesson.start);
  return clamp((now - start) / (end - start), 0, 1);
}

function timeToDate(date, time) {
  const [hours, minutes] = time.split(":").map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function timeOnDate(date, time) {
  return timeToDate(date, time);
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function startOfWeek(date) {
  const result = startOfDay(date);
  const day = result.getDay() || 7;
  result.setDate(result.getDate() - day + 1);
  return result;
}

function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function highlightText(text, query) {
  const escapedText = escapeHtml(text);
  const escapedQuery = escapeHtml(query);
  if (!escapedQuery) {
    return escapedText;
  }
  const pattern = new RegExp(`(${escapeRegExp(escapedQuery)})`, "giu");
  return escapedText.replace(pattern, "<mark>$1</mark>");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.todos));
    if (Array.isArray(saved) && saved.length) {
      return saved;
    }
  } catch {
    // 忽略无效的本地资料。
  }
  return DEFAULT_TODOS.map((todo) => ({ ...todo }));
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEYS.todos, JSON.stringify(state.todos));
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.dataset.theme = savedTheme;
    updateThemeMeta(savedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
  updateThemeMeta(prefersDark ? "dark" : "light");

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!localStorage.getItem(STORAGE_KEYS.theme)) {
      document.documentElement.dataset.theme = event.matches ? "dark" : "light";
      updateThemeMeta(event.matches ? "dark" : "light");
    }
  });
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
  updateThemeMeta(nextTheme);
  window.MyTimetableGlass?.updateTheme(nextTheme);
  showToast(nextTheme === "dark" ? "已切換至深色模式" : "已切換至淺色模式");
}

function updateThemeMeta(theme) {
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "dark" ? "#000000" : "#007AFF");
  }
}

function openAuthModal(mode) {
  state.authMode = mode;
  elements.settingsModal.hidden = true;
  elements.authModal.hidden = false;
  document.querySelector("#authTitle").textContent = mode === "register" ? "註冊我的課表" : "登入我的課表";
  elements.authMessage.textContent = "";
  elements.modalLayer.classList.add("is-open");
  elements.modalLayer.setAttribute("aria-hidden", "false");
  window.setTimeout(() => elements.accountInput.focus(), 220);
}

function closeAuthModal() {
  elements.settingsModal.hidden = true;
  elements.authModal.hidden = false;
  elements.modalLayer.classList.remove("is-open");
  elements.modalLayer.setAttribute("aria-hidden", "true");
  elements.authForm.reset();
  elements.rememberMe.checked = true;
  elements.authMessage.textContent = "";
}

function openSettingsModal() {
  if (!state.className) {
    return;
  }
  elements.authModal.hidden = true;
  elements.settingsModal.hidden = false;
  updateSettingsLabels();
  elements.modalLayer.classList.add("is-open");
  elements.modalLayer.setAttribute("aria-hidden", "false");
}

function closeSettingsModal() {
  elements.modalLayer.classList.remove("is-open");
  elements.modalLayer.setAttribute("aria-hidden", "true");
  elements.settingsModal.hidden = true;
  elements.authModal.hidden = false;
}

function updateSettingsLabels() {
  elements.settingsClassLabel.textContent = state.className || "尚未選擇";
  elements.settingsThemeLabel.textContent =
    document.documentElement.dataset.theme === "dark" ? "深色模式" : "淺色模式";
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const account = elements.accountInput.value.trim();
  const password = elements.passwordInput.value;
  const prefix = state.authMode === "register" ? "註冊" : "登入";

  if (!account || !password) {
    elements.authMessage.textContent = "請輸入帳號及密碼";
    elements.authMessage.style.color = "var(--red)";
    return;
  }

  elements.authMessage.style.color = "var(--green)";
  elements.authMessage.textContent = `${prefix}成功。示範模式：資料不會被儲存`;
  window.setTimeout(() => {
    closeAuthModal();
    showToast("示範模式：資料不會被儲存");
  }, 1100);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2200);
}
