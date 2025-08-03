document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    "wepon-ar.json",
    "wepon-sg.json",
    "wepon-smg.json",
    "wepon-sr.json",
    "wepon-dmr.json",
    "wepon-p.json",
    "wepon-hg.json",
    "other.json"
  ];

  const container = document.getElementById("weapon-list");

  async function loadWeapons() {
    container.innerHTML = ""; // 初期化
    for (const file of categories) {
      try {
        const res = await fetch(`weapons/${file}`);
        const weapons = await res.json();
        const group = document.createElement("div");
        group.className = "weapon-group";
        group.dataset.group = file.replace(".json", "");

        weapons.forEach(weapon => {
          const section = document.createElement("section");
          section.className = "weapon";
          section.innerHTML = `
            <h2>${weapon.name}</h2>
            <div class="images">
              <img src="${weapon.gameImage}" alt="${weapon.name} (ゲーム)">
              <img src="${weapon.realImage}" alt="${weapon.name} (実銃)">
            </div>
            <p>${weapon.description}</p>
            <ul>
              <li>登場シーズン：${weapon.season}</li>
              <li>種類：${weapon.type}</li>
              <li>元ネタ：<a href="${weapon.source}" target="_blank">リンク</a></li>
            </ul>
          `;
          group.appendChild(section);
        });

        container.appendChild(group);
      } catch (e) {
        console.error(`"${file}" の読み込みに失敗`, e);
        container.innerHTML += `<p style="color:red">"${file}" の読み込みに失敗しました。</p>`;
      }
    }
  }

  function setupFilter() {
    document.querySelectorAll("nav button").forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll(".weapon-group").forEach(group => {
          group.style.display = (filter === "all" || group.dataset.group === filter) ? "block" : "none";
        });
      });
    });
  }

  loadWeapons();
  setupFilter();
});
