
Интерфейсная визуализация для демонстрации сценария ввода. Логика работает локально в браузере на тестовых значениях. Никакие реальные персональные данные, банковские карты или внешние базы не используются. не пиши ничего там просто пустое место оставь все, и убери слово визуализация взаместо этоо ничего не ставь все я тее сказал убрать 2 пукта все остальное оставь 


<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>CFDB v2.4</title>
  <style>
    :root{
      --bg: rgb(7,11,20);
      --card: rgba(17,26,46,.72);
      --border: rgba(255,255,255,.10);
      --muted: rgb(159,176,208);
      --text: rgb(232,238,252);
      --accent: rgb(106,166,255);
      --accent2: rgb(157,123,255);
      --ok: rgb(92,255,179);
      --warn: rgb(255,214,102);
      --bad: rgb(255,110,110);
      --shadow: 0 20px 60px rgba(0,0,0,.35);
    }
    *{ box-sizing:border-box; }
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Helvetica Neue", sans-serif;
      color:var(--text);
      background:
        radial-gradient(900px 480px at 10% -10%, rgba(106,166,255,.28), transparent 55%),
        radial-gradient(700px 420px at 92% 10%, rgba(157,123,255,.20), transparent 52%),
        var(--bg);
    }
    .wrap{ width:min(1100px, calc(100% - 32px)); margin: 0 auto; padding: 22px 0 40px; }
    header{
      border: 1px solid var(--border);
      border-radius: 18px;
      background: rgba(17,26,46,.35);
      box-shadow: var(--shadow);
      padding: 18px 18px;
    }
    .top{
      display:flex; align-items:flex-start; justify-content:space-between; gap:16px;
      flex-wrap:wrap;
    }
    .brand{ display:flex; align-items:flex-start; gap:14px; }
    .logo{
      width:44px; height:44px; border-radius:12px;
      display:grid; place-items:center;
      background: linear-gradient(135deg, rgba(106,166,255,.35), rgba(157,123,255,.25));
      border:1px solid var(--border);
      font-weight:800;
    }
    h1{ margin:0; font-size: clamp(18px, 2.2vw, 26px); line-height:1.2; }
    .sub{ margin: 6px 0 0; color: var(--muted); max-width: 72ch; font-size: 13.5px; min-height: 34px; }
    .pill{
      display:inline-flex; align-items:center; gap:8px;
      padding: 8px 12px; border-radius:999px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,.06);
      color: var(--muted);
      font-size: 12px;
      height: fit-content;
    }
    .grid{
      margin-top: 16px;
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    @media (max-width: 900px){ .grid{ grid-template-columns: 1fr; } }
    .card{
      border: 1px solid var(--border);
      background: var(--card);
      border-radius: 16px;
      padding: 16px;
      box-shadow: var(--shadow);
    }
    .card h2{ margin:0 0 12px; font-size: 16px; }
    .muted{ color: var(--muted); }
    .row{ display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap; }
    label{ display:block; color: var(--muted); font-size: 13px; margin: 0 0 6px; }
    input{
      width:100%;
      padding: 12px 12px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,.18);
      color: var(--text);
      outline:none;
    }
    input:focus{
      border-color: rgba(106,166,255,.55);
      box-shadow: 0 0 0 3px rgba(106,166,255,.16);
    }
    .btn{
      padding: 12px 14px;
      border-radius: 12px;
      border:1px solid rgba(106,166,255,.45);
      background: linear-gradient(135deg, rgba(106,166,255,.35), rgba(157,123,255,.25));
      color: var(--text);
      font-weight: 800;
      cursor:pointer;
      min-width: 160px;
      user-select:none;
    }
    .btn:active{ transform: translateY(1px); }
    .resultBox{
      margin-top: 12px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,.14);
      border-radius: 14px;
      padding: 14px;
      display:none;
    }
    .resultBox.show{ display:block; }
    .tagRow{ display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
    .tag{
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,.05);
      color: var(--muted);
      font-size: 12px;
    }
    .tag.ok{ border-color: rgba(92,255,179,.45); color: rgba(92,255,179,.95); background: rgba(92,255,179,.08); }
    .tag.warn{ border-color: rgba(255,214,102,.45); color: rgba(255,214,102,.95); background: rgba(255,214,102,.08); }
    .tag.bad{ border-color: rgba(255,110,110,.45); color: rgba(255,110,110,.95); background: rgba(255,110,110,.08); }
    .tableWrap{
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow:hidden;
      background: rgba(0,0,0,.10);
    }
    table{
      width:100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    thead th{
      text-align:left;
      padding: 10px 12px;
      background: rgba(255,255,255,.04);
      color: var(--muted);
      border-bottom: 1px solid var(--border);
      font-weight: 700;
    }
    tbody td{
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255,255,255,.06);
      color: rgba(232,238,252,.92);
      white-space: nowrap;
    }
    tbody tr:hover{ background: rgba(255,255,255,.03); }
    .highlight{
      outline: 2px solid rgba(106,166,255,.45);
      outline-offset: -2px;
      background: rgba(106,166,255,.08) !important;
    }
    .bar{
      height: 10px;
      background: rgba(255,255,255,.06);
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,.08);
      overflow:hidden;
      margin-top: 10px;
    }
    .bar > i{
      display:block;
      height:100%;
      width: 20%;
      background: linear-gradient(90deg, rgba(106,166,255,.7), rgba(157,123,255,.6));
      border-radius: 999px;
      transition: width .5s ease;
    }
    .foot{
      margin-top: 14px;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.55;
    }
    code{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div class="top">
        <div class="brand">
          <div class="logo">CF</div>
          <div>
            <h1>Check Fraud Database v2.4</h1>
            <div class="sub"></div>
          </div>
        </div>
        <div class="pill">UI • локальная mock-логика</div>
      </div>
    </header>
    <div class="grid">
      <section class="card">
        <h2>Проверка</h2>
        <div class="row">
          <div style="flex:1 1 260px;">
            <label for="checkId">Номер чека</label>
            <input id="checkId" placeholder="Например: 104-992301" autocomplete="off" />
          </div>
          <div style="flex:1 1 220px;">
            <label for="bank">Банк (опционально)</label>
            <input id="bank" placeholder="Например: Bank of America" autocomplete="organization" />
          </div>
          <div style="flex:0 0 180px;">
            <button class="btn" id="btnCheck" type="button">Проверить</button>
          </div>
        </div>
        <div class="resultBox" id="resultBox">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
            <div>
              <div style="font-weight:900; letter-spacing:.2px;">Результат</div>
              <div class="muted" id="resultText" style="margin-top:6px;"></div>
            </div>
            <div class="tagRow">
              <span class="tag" id="tagLevel">—</span>
              <span class="tag" id="tagSource">DB</span>
            </div>
          </div>
          <div class="tagRow" style="margin-top:12px;">
            <span class="tag" id="tagBank">Банк: —</span>
            <span class="tag" id="tagMatch">Match: —</span>
            <span class="tag" id="tagTime">Время: —</span>
          </div>
        </div>
        <div class="bar" aria-hidden="true"><i id="updateBar"></i></div>
        <div class="foot">
          Обновления: <b>Март 2026</b> (mock) +<b>12 000</b> чеков.
          Нормализация банка включает `Bank of America`.
        </div>
      </section>
      <section class="card">
        <h2>База</h2>
        <div class="muted" style="margin-bottom:10px; font-size:13px;">
          Показан небольшой набор тестовых строк. Поиск подсвечивает совпадение только в локальном списке.
        </div>
        <div class="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Check ID</th>
                <th>Risk</th>
                <th>Card (masked)</th>
                <th>Bank</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table>
        </div>
        <div class="foot">
          Примечание: логика и значения не связаны с реальными проверками или внешними источниками.
        </div>
      </section>
    </div>
  </div>
  <script>
    const demoDB = [
      { id: "104-992301", risk: "OK",    card: "•••• 4821", bank: "Bank of America" },
      { id: "301-775019", risk: "WARN",  card: "•••• 1130", bank: "Chase" },
      { id: "777-120045", risk: "BAD",   card: "•••• 9007", bank: "Wells Fargo" },
      { id: "501-330218", risk: "WARN",  card: "•••• 2244", bank: "Bank of America" },
      { id: "990-010203", risk: "OK",     card: "•••• 7002", bank: "Citi" },
      { id: "204-555666", risk: "BAD",    card: "•••• 6611", bank: "Capital One" }
    ];
    const levelToTagClass = (risk) => {
      if (risk === "OK") return "ok";
      if (risk === "WARN") return "warn";
      if (risk === "BAD") return "bad";
      return "";
    };
    function normalizeBankName(input) {
      const s = (input || "").trim().toLowerCase();
      if (!s) return "";
      const boaVariants = ["bank of america", "boa", "bankofamerica", "bank-of-america"];
      if (boaVariants.includes(s)) return "Bank of America";
      return s
        .split(/\s+/).filter(Boolean)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
    function cleanCheckId(input) {
      return (input || "").trim();
    }
    function renderTable() {
      const tbody = document.getElementById("tbody");
      tbody.innerHTML = "";
      demoDB.forEach((row) => {
        const tr = document.createElement("tr");
        tr.dataset.checkId = row.id;
        const riskText = row.risk === "OK" ? "Низкий" : (row.risk === "WARN" ? "Средний" : "Высокий");
        tr.innerHTML = `
          <td><code>${row.id}</code></td>
          <td><span class="tag ${levelToTagClass(row.risk)}">${riskText}</span></td>
          <td>${row.card}</td>
          <td>${row.bank}</td>
        `;
        tbody.appendChild(tr);
      });
    }
    function computeRiskFromIdFallback(checkId) {
      const digits = (checkId || "").replace(/\D/g, "");
      if (digits.length < 6) return { level: "WARN", text: "Недостаточно данных (локально)." };
      let tail = Number(digits.slice(-6));
      if (!Number.isFinite(tail)) return { level: "WARN", text: "Не удалось обработать ID (локально)." };
      if (tail % 13 === 0) return { level: "BAD", text: "Повышенный риск (локально). Усилить контроль." };
      if (tail % 7 === 0) return { level: "WARN", text: "Есть предупреждение (локально). Перепроверить реквизиты." };
      return { level: "OK", text: "Риск выглядит низким (локально)." };
    }
    function highlightMatch(checkId) {
      const tbody = document.getElementById("tbody");
      [...tbody.querySelectorAll("tr")].forEach(tr => tr.classList.remove("highlight"));
      const matchTr = [...tbody.querySelectorAll("tr")].find(tr => tr.dataset.checkId === checkId);
      if (matchTr) matchTr.classList.add("highlight");
    }
    function formatTime(ts) {
      const d = new Date(ts);
      return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }
    renderTable();
    const btn = document.getElementById("btnCheck");
    const checkIdEl = document.getElementById("checkId");
    const bankEl = document.getElementById("bank");
    const resultBox = document.getElementById("resultBox");
    const resultText = document.getElementById("resultText");
    const tagLevel = document.getElementById("tagLevel");
    const tagBank = document.getElementById("tagBank");
    const tagMatch = document.getElementById("tagMatch");
    const tagTime = document.getElementById("tagTime");
    const updateBar = document.getElementById("updateBar");
    btn.addEventListener("click", () => {
      const checkId = cleanCheckId(checkIdEl.value);
      const normalizedBank = normalizeBankName(bankEl.value);
      const t0 = performance.now();
      highlightMatch(checkId);
      const found = demoDB.find(x => x.id === checkId);
      updateBar.style.width = (25 + Math.floor(Math.random() * 60)) + "%";
      let level, msg, matchLabel;
      if (found) {
        level = found.risk;
        msg = `Найдено в локальном списке. Риск: ${found.risk}.`;
        matchLabel = "Да";
      } else {
        const fallback = computeRiskFromIdFallback(checkId);
        level = fallback.level;
        msg = `В локальном списке совпадения нет. ${fallback.text}`;
        matchLabel = "Нет";
      }
      const durationMs = Math.max(1, Math.round(performance.now() - t0));
      resultBox.classList.add("show");
      resultText.textContent = msg;
      tagLevel.classList.remove("ok","warn","bad");
      tagLevel.classList.add(levelToTagClass(level));
      tagLevel.textContent = `Риск: ${level}`;
      tagBank.textContent = `Банк: ${normalizedBank || (found ? found.bank : "не указан")}`;
      tagMatch.textContent = `Match: ${matchLabel}`;
      tagTime.textContent = `Время: ${formatTime(Date.now())} (+${durationMs}мс)`;
    });
  </script>
</body>
</html>
