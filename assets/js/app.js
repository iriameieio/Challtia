// Fairy Tale Agency - minimal JS
const MEMBERS = [
  {
    id: "rim",
    name: "天色りむ",
    roman: "Takashiro Rim",
    motif: "小悪魔 / 童話",
    catch: "とろけるような夜を、いっしょに。",
    img: "./assets/img/placeholder-rim.png",
    bio: "むかしむかし――あなたの心に、そっと寄り添う物語を届けたい。",
    meta: { "モチーフ": "小悪魔", "誕生日": "—", "身長": "—", "夢": "—" },
    x: "https://x.com/",
    iriam: "https://iriam.com/"
  },
  {
    id: "suu",
    name: "霜乃すう",
    roman: "Shimono Suu",
    motif: "水の精 / 童話",
    catch: "透明な声で、ページをめくる。",
    img: "./assets/img/placeholder-suu.png",
    bio: "静かな水面みたいに、落ち着ける時間をつくれたらうれしいです。",
    meta: { "モチーフ": "水の精", "誕生日": "—", "身長": "—", "夢": "—" },
    x: "https://x.com/",
    iriam: "https://iriam.com/"
  },
  {
    id: "uren",
    name: "愛染兎恋",
    roman: "Aizome Uren",
    motif: "うさぎ / ショーガール",
    catch: "歌と動物が大好きな、愛されがり。",
    img: "./assets/img/placeholder-uren.png",
    bio: "あなたの愛を、兎恋にちょうだい？",
    meta: { "モチーフ": "うさぎ", "誕生日": "—", "身長": "—", "夢": "—" },
    x: "https://x.com/",
    iriam: "https://iriam.com/"
  }
];

// ---------- menu ----------
(function initMenu(){
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
})();

// ---------- index: render member cards ----------
(function renderGrid(){
  const grid = document.getElementById("memberGrid");
  if (!grid) return;

  grid.innerHTML = MEMBERS.map(m => `
    <a class="member-card" href="./member.html?id=${encodeURIComponent(m.id)}" aria-label="${escapeHtml(m.name)}のプロフィールへ">
      <div class="member-card__img">
        <img src="${m.img}" alt="${escapeHtml(m.name)}">
      </div>
      <div class="member-card__body">
        <p class="member-card__name">${escapeHtml(m.name)}</p>
        <p class="member-card__meta">${escapeHtml(m.motif)}<br>${escapeHtml(m.catch)}</p>
        <div class="member-card__sns" aria-label="リンク">
          <span class="icon-btn" title="X">X</span>
          <span class="icon-btn" title="IRIAM">i</span>
        </div>
      </div>
    </a>
  `).join("");
})();

// ---------- member: render profile ----------
(function renderProfile(){
  const root = document.getElementById("profile");
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const m = MEMBERS.find(x => x.id === id) || MEMBERS[0];

  const metaRows = Object.entries(m.meta)
    .map(([k,v]) => `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`)
    .join("");

  root.innerHTML = `
    <div class="profile__img">
      <img src="${m.img}" alt="${escapeHtml(m.name)}">
    </div>

    <div class="profile__main">
      <h1 class="profile__name">${escapeHtml(m.name)}</h1>
      <p class="profile__roman">${escapeHtml(m.roman)}</p>
      <p class="profile__bio">${escapeHtml(m.bio)}</p>

      <dl class="dl">${metaRows}</dl>

      <div class="profile__sns">
        <a class="btn btn--ghost" href="${m.x}" target="_blank" rel="noopener">X</a>
        <a class="btn btn--ghost" href="${m.iriam}" target="_blank" rel="noopener">IRIAM</a>
      </div>
    </div>
  `;
})();

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
