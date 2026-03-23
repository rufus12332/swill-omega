<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Check Fraud Database v2.4 (Demo) — проверка рисков при приёме чеков</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="brand">
        <div class="logo">CFDB</div>
        <div>
          <h1># Check Fraud Database v2.4 — проверка рисков при приёме чеков</h1>
          <p class="subtitle">
            Демо-страница. Не является источником “скомпрометированных” данных и не предназначена для обналичивания.
          </p>
        </div>
      </div>
      <div class="badge">v2.4 • Demo</div>
    </div>
  </header>
  <main class="container">
    <section class="card">
      <h2>## Установка</h2>
      <ol class="steps">
        <li>Откройте сайт в браузере (установка `install.exe` не требуется).</li>
        <li>Введите номер чека.</li>
        <li>Получите демо-оценку риска и рекомендацию действий.</li>
      </ol>
      <p class="note">
        Для реальной интеграции используются легальные источники/сигналы (например, настройки банка/процессора, правила антифрода, санкционные/публичные уведомления).
      </p>
    </section>
    <section class="card form-card">
      <h2>## Проверка</h2>
      <form id="checkForm" class="form">
        <label class="label" for="checkId">Номер чека</label>
        <input
          id="checkId"
          name="checkId"
          type="text"
          inputmode="numeric"
          placeholder="Например: 104-992301"
          autocomplete="off"
          required
        />
        <div class="row">
          <div class="col">
            <label class="label" for="bank">Банк (опционально)</label>
            <input
              id="bank"
              name="bank"
              type="text"
              placeholder="Например: Bank of America"
              autocomplete="organization"
            />
          </div>
          <div class="col col-cta">
            <button class="btn" type="submit">Проверить</button>
          </div>
        </div>
      </form>
      <div id="result" class="result" role="status" aria-live="polite" hidden></div>
      <div class="privacy">
        Вводимые данные используются только в этом браузере для демо-логики. Никаких баз “компрометированных чеков” сайт не содержит.
      </div>
    </section>
    <section class="card">
      <h2>## Скриншоты</h2>
      <div class="grid">
        <div class="shot">
          <div class="shot-label">Скриншот базы</div>
          <div class="placeholder">Замените на изображение</div>
        </div>
        <div class="shot">
          <div class="shot-label">Скриншот проверки</div>
          <div class="placeholder">Замените на изображение</div>
        </div>
      </div>
    </section>
    <section class="card">
      <h2>## Обновления</h2>
      <ul class="list">
        <li>Март 2026: обновлены правила риск-оценки (демо-данные).</li>
        <li>Исправлена нормализация названий банков (в т.ч. `Bank of America`).</li>
      </ul>
    </section>
    <section class="footer-note">
      <h2>Важно</h2>
      <p>
        Если вы подозреваете мошенничество с чеками: не обналичивайте. Свяжитесь с банком/службой поддержки,
        используйте внутренние процедуры в компании и при необходимости подайте заявление.
      </p>
    </section>
  </main>
  <footer class="footer">
    <div class="container">
      <span>© <span id="year"></span> CFDB v2.4 (Demo)</span>
    </div>
  </footer>
  <script src="app.js"></script>
</body>
</html>
