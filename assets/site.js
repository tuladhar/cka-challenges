const challenges = window.CKA_CHALLENGES || [];
const progressKey = "cka-challenges-completed";
const completed = new Set(JSON.parse(localStorage.getItem(progressKey) || "[]"));
const allLessons = challenges.flatMap((domain) => domain.competencies.map((lesson) => ({ ...lesson, domain })));

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

function renderCourse() {
  const tabs = document.querySelector(".domain-tabs");
  const root = document.querySelector("#challenge-list");
  if (!tabs || !root) return;

  tabs.insertAdjacentHTML("beforeend", challenges.map((domain) => `<button type="button" data-filter="${domain.id}">${escapeHtml(domain.title)}</button>`).join(""));
  root.innerHTML = challenges.map((domain, domainIndex) => `
    <section class="domain-group" data-domain="${domain.id}">
      <header class="domain-title"><div><span>${String(domainIndex + 1).padStart(2, "0")}</span><div><p>${domain.weight}% of exam</p><h3>${escapeHtml(domain.title)}</h3></div></div><strong data-domain-count>0/${domain.competencies.length}</strong></header>
      <div class="lesson-grid">
        ${domain.competencies.map((lesson, lessonIndex) => `
          <button class="lesson-card${completed.has(lesson.id) ? " completed" : ""}" type="button" data-lesson-id="${lesson.id}">
            <span class="lesson-number">Lesson ${String(lessonIndex + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(lesson.title)}</strong>
            <span class="lesson-meta"><span>${lesson.videoId ? "Video available" : "Video coming soon"}</span><i aria-hidden="true">${completed.has(lesson.id) ? "✓" : "→"}</i></span>
          </button>`).join("")}
      </div>
    </section>`).join("");
}

function videoMarkup(lesson) {
  if (!lesson.videoId) return `<div class="video-placeholder"><span aria-hidden="true">▶</span><div><strong>Practical video coming soon</strong><p>This lesson slot is ready for its YouTube video.</p></div></div>`;
  return `<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(lesson.videoId)}" title="${escapeHtml(lesson.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
}

function practiceMarkup(lesson) {
  if (!lesson.practice.length) return `<p class="practice-empty">Practice links are being prepared for this lesson.</p>`;
  return lesson.practice.map((link) => `<a class="practice-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener"><span>${escapeHtml(link.label)}</span><span>↗</span></a>`).join("");
}

function openLesson(id) {
  const lesson = allLessons.find((item) => item.id === id);
  const dialog = document.querySelector("#lesson-dialog");
  if (!lesson || !dialog) return;
  dialog.dataset.lessonId = lesson.id;
  dialog.querySelector("[data-lesson-domain]").textContent = `${lesson.domain.title} · ${lesson.domain.weight}%`;
  dialog.querySelector("[data-lesson-title]").textContent = lesson.title;
  dialog.querySelector("[data-lesson-video]").innerHTML = videoMarkup(lesson);
  dialog.querySelector("[data-lesson-practice]").innerHTML = practiceMarkup(lesson);
  dialog.querySelector("[data-lesson-complete]").checked = completed.has(lesson.id);
  history.replaceState(null, "", `#${lesson.id}`);
  dialog.showModal();
}

function closeLesson() {
  const dialog = document.querySelector("#lesson-dialog");
  dialog?.close();
  if (allLessons.some((lesson) => `#${lesson.id}` === location.hash)) history.replaceState(null, "", location.pathname);
}

function updateProgress() {
  const total = allLessons.length;
  const percent = total ? Math.round((completed.size / total) * 100) : 0;
  document.querySelectorAll("[data-progress-text]").forEach((el) => { el.textContent = `${completed.size} / ${total}`; });
  document.querySelectorAll("[data-progress-percent]").forEach((el) => { el.textContent = `${percent}% complete`; });
  document.querySelectorAll("[data-progress-bar]").forEach((el) => { el.style.width = `${percent}%`; });
  challenges.forEach((domain) => {
    const section = document.querySelector(`[data-domain="${domain.id}"]`);
    if (!section) return;
    const count = domain.competencies.filter((lesson) => completed.has(lesson.id)).length;
    section.querySelector("[data-domain-count]").textContent = `${count}/${domain.competencies.length}`;
  });
}

function setupCourseInteractions() {
  const lessonDialog = document.querySelector("#lesson-dialog");
  document.addEventListener("click", (event) => {
    const lessonCard = event.target.closest("[data-lesson-id]");
    if (lessonCard) openLesson(lessonCard.dataset.lessonId);
    if (event.target.closest("[data-close-lesson]")) closeLesson();
    const filter = event.target.closest("[data-filter]");
    if (filter) {
      document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("active", button === filter));
      document.querySelectorAll(".domain-group").forEach((section) => { section.hidden = filter.dataset.filter !== "all" && section.dataset.domain !== filter.dataset.filter; });
    }
  });
  lessonDialog?.addEventListener("click", (event) => { if (event.target === lessonDialog) closeLesson(); });
  lessonDialog?.querySelector("[data-lesson-complete]").addEventListener("change", (event) => {
    const id = lessonDialog.dataset.lessonId;
    event.target.checked ? completed.add(id) : completed.delete(id);
    localStorage.setItem(progressKey, JSON.stringify([...completed]));
    const card = document.querySelector(`[data-lesson-id="${id}"]`);
    card.classList.toggle("completed", event.target.checked);
    card.querySelector(".lesson-meta i").textContent = event.target.checked ? "✓" : "→";
    updateProgress();
  });
}

function setupNewsletter() {
  const dialog = document.querySelector("#newsletter-dialog");
  if (!dialog || localStorage.getItem("cka-newsletter-seen") || allLessons.some((lesson) => `#${lesson.id}` === location.hash)) return;
  const close = () => { dialog.close(); localStorage.setItem("cka-newsletter-seen", "true"); };
  setTimeout(() => dialog.showModal(), 1200);
  dialog.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", close));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  dialog.querySelector("form").addEventListener("submit", (event) => { event.preventDefault(); dialog.querySelector(".form-note").textContent = "Thanks — newsletter signup will be connected soon."; setTimeout(close, 1600); });
}

renderCourse();
setupCourseInteractions();
updateProgress();
const initialLesson = allLessons.find((lesson) => `#${lesson.id}` === location.hash);
if (initialLesson) openLesson(initialLesson.id);
setupNewsletter();
