const challenges = window.CKA_CHALLENGES || [];
const storageKey = "cka-challenges-completed";
const completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

function renderPractice(practice) {
  if (!practice.length) return '<p class="empty-links">Practice labs are being prepared. Add links in <code>assets/challenges.js</code>.</p>';
  return practice.map((link) => `<a class="practice-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener"><span>${escapeHtml(link.label)}</span><span aria-hidden="true">↗</span></a>`).join("");
}

function renderVideo(item) {
  if (!item.videoId) return `<div class="video-placeholder"><span class="play-mark" aria-hidden="true">▶</span><p><strong>Practical video coming soon</strong><br><span>Add a YouTube ID in <code>assets/challenges.js</code></span></p></div>`;
  return `<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.videoId)}" title="${escapeHtml(item.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
}

function renderChallenges() {
  const root = document.querySelector("#challenge-list");
  if (!root) return;
  root.innerHTML = challenges.map((domain, domainIndex) => `
    <section class="domain" id="${domain.id}" data-domain>
      <header class="domain-header">
        <div class="domain-number ${domain.color}">${String(domainIndex + 1).padStart(2, "0")}</div>
        <div><p class="domain-kicker">Exam domain · ${domain.weight}%</p><h2>${escapeHtml(domain.title)}</h2></div>
        <div class="domain-count"><strong data-domain-count>0/${domain.competencies.length}</strong><span>complete</span></div>
      </header>
      <div class="competency-list">
        ${domain.competencies.map((item, itemIndex) => `
          <article class="competency" id="${item.id}" data-id="${item.id}">
            <button class="competency-toggle" type="button" aria-expanded="false" aria-controls="panel-${item.id}">
              <span class="competency-index">${String(itemIndex + 1).padStart(2, "0")}</span>
              <span class="competency-title">${escapeHtml(item.title)}</span>
              <span class="toggle-icon" aria-hidden="true">+</span>
            </button>
            <div class="competency-panel" id="panel-${item.id}" hidden>
              <div class="lesson-grid">
                <div>${renderVideo(item)}</div>
                <aside class="practice"><p class="mini-label">Hands-on practice</p><h3>Make it stick</h3><p>Recreate what you watched in a real cluster.</p><div class="practice-links">${renderPractice(item.practice)}</div></aside>
              </div>
              <label class="complete-control"><input type="checkbox" value="${item.id}" ${completed.has(item.id) ? "checked" : ""}><span class="custom-check" aria-hidden="true">✓</span><span>I watched and practiced this competency</span></label>
            </div>
          </article>`).join("")}
      </div>
    </section>`).join("");
}

function updateProgress() {
  const total = challenges.reduce((sum, domain) => sum + domain.competencies.length, 0);
  const count = completed.size;
  const percent = total ? Math.round((count / total) * 100) : 0;
  document.querySelectorAll("[data-progress-text]").forEach((el) => { el.textContent = `${count} / ${total}`; });
  document.querySelectorAll("[data-progress-percent]").forEach((el) => { el.textContent = `${percent}%`; });
  document.querySelectorAll("[data-progress-bar]").forEach((el) => { el.style.width = `${percent}%`; });
  document.querySelectorAll("[data-domain]").forEach((domainEl) => {
    const ids = [...domainEl.querySelectorAll("input[type=checkbox]")].map((input) => input.value);
    const domainCount = ids.filter((id) => completed.has(id)).length;
    domainEl.querySelector("[data-domain-count]").textContent = `${domainCount}/${ids.length}`;
  });
}

function setupInteractions() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".competency-toggle");
    if (!button) return;
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
  document.addEventListener("change", (event) => {
    if (!event.target.matches(".complete-control input")) return;
    event.target.checked ? completed.add(event.target.value) : completed.delete(event.target.value);
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
    updateProgress();
  });
}

function setupNewsletter() {
  const dialog = document.querySelector("#newsletter-dialog");
  if (!dialog || localStorage.getItem("cka-newsletter-seen")) return;
  const close = () => { dialog.close(); localStorage.setItem("cka-newsletter-seen", "true"); };
  setTimeout(() => dialog.showModal(), 900);
  dialog.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", close));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  dialog.querySelector("form").addEventListener("submit", (event) => { event.preventDefault(); dialog.querySelector(".form-note").textContent = "Thanks — the newsletter connection will be available soon."; setTimeout(close, 1800); });
}

renderChallenges();
setupInteractions();
updateProgress();
setupNewsletter();

