const list = document.querySelector("#achievers-list");
if (list) {
  fetch("/data/achievers.json")
    .then((response) => response.json())
    .then((people) => {
      document.querySelector("[data-achiever-count]").textContent = people.length;
      if (!people.length) return;
      list.innerHTML = people.map((person) => `<article class="achiever-card"><div class="avatar">${person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div><div><h3>${person.name}</h3><p>${person.challenge} · ${person.achieved}</p><a href="${person.credly}" target="_blank" rel="noopener">View verified credential ↗</a></div></article>`).join("");
    })
    .catch(() => {});
}

