/* ==========================================================================
   SCRIPT.JS
   Renders EXPERIENCE / PROJECTS / SKILLS / ACHIEVEMENTS from data.js,
   plus small UI behaviors (theme toggle, nav, scroll reveal).
   ========================================================================== */

/* ---------- THEME TOGGLE ---------- */
(function initTheme(){
  const root = document.documentElement;
  const saved = localStorage.getItem("dr-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = saved || (prefersLight ? "light" : "dark");
  if (theme === "light") root.setAttribute("data-theme", "light");

  const toggle = document.getElementById("themeToggle");
  const moon = document.getElementById("iconMoon");
  const sun = document.getElementById("iconSun");

  function syncIcons(){
    const isLight = root.getAttribute("data-theme") === "light";
    moon.style.display = isLight ? "none" : "block";
    sun.style.display = isLight ? "block" : "none";
  }
  syncIcons();

  toggle.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight){
      root.removeAttribute("data-theme");
      localStorage.setItem("dr-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("dr-theme", "light");
    }
    syncIcons();
  });
})();

/* ---------- NAV: scroll shadow + mobile burger ---------- */
(function initNav(){
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive:true });

  const burger = document.getElementById("navBurger");
  const links = document.getElementById("navLinks");
  burger.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
})();

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
(function initActiveNav(){
  const navAnchors = document.querySelectorAll("[data-nav]");
  const sections = [...navAnchors]
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = "#" + entry.target.id;
        navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach(s => obs.observe(s));
})();

/* ---------- BACK TO TOP ---------- */
document.getElementById("toTop").addEventListener("click", () => {
  window.scrollTo({ top:0, behavior:"smooth" });
});

/* ---------- RENDER: EXPERIENCE ---------- */
(function renderExperience(){
  const el = document.getElementById("timelineList");
  el.innerHTML = EXPERIENCE.map(job => `
    <div class="tl-item" data-reveal>
      <div class="tl-role">${job.role}</div>
      <div class="tl-org">${job.org}</div>
      <div class="tl-period mono">${job.period}</div>
      <ul class="tl-points">
        ${job.points.map(p => `<li>${p}</li>`).join("")}
      </ul>
    </div>
  `).join("");
})();

/* ---------- RENDER: PROJECTS ---------- */
(function renderProjects(){
  const el = document.getElementById("projectGrid");
  el.innerHTML = PROJECTS.map(p => `
    <article class="project-card" data-reveal>
      <div class="pc-head">
        <h3 class="pc-title">${p.title}</h3>
      </div>
      <p class="pc-subtitle">${p.subtitle}</p>
      <p class="pc-desc">${p.description}</p>
      ${p.highlights.length ? `
        <ul class="pc-highlights">
          ${p.highlights.map(h => `<li>${h}</li>`).join("")}
        </ul>` : ""}
      <div class="pc-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="pc-links">
        <a class="pc-link ${p.links.github ? "" : "disabled"}" href="${p.links.github || "#"}" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
          ${p.links.github ? "Code" : "Code coming soon"}
        </a>
        ${p.links.demo ? `
        <a class="pc-link" href="${p.links.demo}" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
          Live demo
        </a>` : ""}
      </div>
    </article>
  `).join("");
})();

/* ---------- RENDER: SKILLS ---------- */
(function renderSkills(){
  const el = document.getElementById("skillsGrid");
  el.innerHTML = SKILLS.map(g => `
    <div class="skill-group" data-reveal>
      <h3 class="mono">${g.group}</h3>
      <div class="skill-chips">
        ${g.items.map(i => `<span class="chip">${i}</span>`).join("")}
      </div>
    </div>
  `).join("");
})();

/* ---------- RENDER: ACHIEVEMENTS ---------- */
(function renderAchievements(){
  const el = document.getElementById("achvGrid");
  el.innerHTML = ACHIEVEMENTS.map(a => `
    <div class="achv-card" data-reveal>
      <div class="achv-title">${a.title}</div>
      <div class="achv-detail">${a.detail}</div>
    </div>
  `).join("");
})();

/* ---------- TIMELINE SCROLL PROGRESS ---------- */
(function initTimelineProgress(){
  const timeline = document.getElementById("timelineList");
  if (!timeline) return;

  let ticking = false;
  function update(){
    const rect = timeline.getBoundingClientRect();
    const viewportH = window.innerHeight;
    // 0 when the timeline top just enters the bottom of the viewport,
    // 1 when its bottom reaches the middle of the viewport.
    const start = viewportH * 0.9;
    const end = viewportH * 0.45;
    const total = rect.height + (start - end);
    const traveled = start - rect.top;
    const pct = Math.min(1, Math.max(0, traveled / total));
    timeline.style.setProperty("--tl-progress", (pct * 100) + "%");
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking){ requestAnimationFrame(update); ticking = true; }
  }, { passive:true });
  window.addEventListener("resize", update);
  update();
})();

/* ---------- SCROLL REVEAL ---------- */
(function initReveal(){
  const items = document.querySelectorAll("[data-reveal]");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:0.12 });
  items.forEach(i => obs.observe(i));
})();
