// =========================
// Fairy Tale Agency
// members.json対応版
// =========================

// ---------- members.json 読み込み ----------
async function loadMembers() {
  try {
    const response = await fetch("assets/data/members.json");

    if (!response.ok) {
      console.error("members.json 読み込み失敗:", response.status);
      return [];
    }

    const members = await response.json();

    console.log("読み込んだメンバー:", members);

    return members;

  } catch (error) {

    console.error("members.json エラー:", error);

    return [];
  }
}

// ---------- ハンバーガーメニュー ----------
function initMenu() {
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
}

// ---------- 一覧ページ ----------
async function renderIndexMembers() {

  const narratorGrid = document.getElementById("narratorGrid");
  const gen0Grid = document.getElementById("gen0Grid");
  const gen1Grid = document.getElementById("gen1Grid");
  const gen2Grid = document.getElementById("gen2Grid");

  if (
    !narratorGrid &&
    !gen0Grid &&
    !gen1Grid &&
    !gen2Grid
  ) return;

  const members = await loadMembers();

  renderGroup("narrator", narratorGrid);
  renderGroup("gen0", gen0Grid);
  renderGroup("gen1", gen1Grid);
  renderGroup("gen2", gen2Grid);

  function renderGroup(groupName, target) {

    if (!target) return;

    const filteredMembers =
      members.filter(
        member => member.group === groupName
      );

    target.innerHTML =
      filteredMembers
        .map(createMemberCard)
        .join("");
  }
}

// ---------- カード生成 ----------
function createMemberCard(member) {

  return `
    <a class="member-card" href="./member.html?id=${encodeURIComponent(member.id)}">

      <div class="member-card__img">
        <img
          src="${member.img}"
          alt="${escapeHtml(member.name)}"
        >
      </div>

      <div class="member-card__body">

        <p class="member-card__name">
          ${escapeHtml(member.name)}
        </p>

        <p class="member-card__meta">
          ${escapeHtml(member.motif)}
          ${member.catch
            ? `<br>${escapeHtml(member.catch)}`
            : ""}
        </p>

      </div>

    </a>
  `;
}

// ---------- プロフィールページ ----------
async function renderMemberProfile() {

  const profile =
    document.getElementById("profile");

  if (!profile) return;

  const params =
    new URLSearchParams(location.search);

  const id =
    params.get("id");

  const members =
    await loadMembers();

  const member =
    members.find(
      member => member.id === id
    );

  if (!member) {

    profile.innerHTML = `
      <div class="profile__main">
        <h1>メンバーが見つかりません</h1>

        <a
          class="btn"
          href="./index.html#members"
        >
          一覧へ戻る
        </a>
      </div>
    `;

    return;
  }

  const metaHtml =
    Object.entries(member.meta || {})
      .map(
        ([key, value]) => `
          <dt>${escapeHtml(key)}</dt>
          <dd>${escapeHtml(value)}</dd>
        `
      )
      .join("");

  const subImagesHtml =
    (member.subImages || [])
      .map(
        image => `
          <div class="sub-image">
            <img
              src="${image}"
              alt="${escapeHtml(member.name)}"
            >
          </div>
        `
      )
      .join("");

  profile.innerHTML = `
    <div class="profile__img">
      <img
        src="${member.img}"
        alt="${escapeHtml(member.name)}"
      >
    </div>

    <div class="profile__main">

      <h1 class="profile__name">
        ${escapeHtml(member.name)}
      </h1>

      <p class="profile__roman">
        ${escapeHtml(member.roman)}
      </p>

      <p class="profile__bio">
        ${escapeHtml(member.bio || "")}
      </p>

      <dl class="dl">
        ${metaHtml}
      </dl>

      <div class="profile__sns">

        ${member.x ? `
        <a
          class="btn btn--ghost"
          href="${member.x}"
          target="_blank"
        >
          X
        </a>` : ""}

        ${member.iriam ? `
        <a
          class="btn btn--ghost"
          href="${member.iriam}"
          target="_blank"
        >
          IRIAM
        </a>` : ""}

        ${member.youtube ? `
        <a
          class="btn btn--ghost"
          href="${member.youtube}"
          target="_blank"
        >
          YouTube
        </a>` : ""}

      </div>

    </div>

    <div class="profile__sub-images">
      ${subImagesHtml}
    </div>
  `;
}

// ---------- HTMLエスケープ ----------
function escapeHtml(str) {

  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------- 起動 ----------
initMenu();
renderIndexMembers();
renderMemberProfile();