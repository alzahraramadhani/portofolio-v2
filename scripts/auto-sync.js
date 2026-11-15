/**
 * Auto-Sync Script for Zahra Portfolio V2
 * Watches workspace changes and automatically commits & pushes to GitHub.
 * Usage: npm run auto-sync
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DEBOUNCE_MS = 6000; // Wait 6 seconds after the last change before committing
const POLL_INTERVAL_MS = 5000; // Fallback check every 5 seconds

let pendingCommitTimer = null;
let isSyncing = false;

function getCurrentBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", {
      cwd: ROOT_DIR,
      encoding: "utf-8",
    }).trim() || "main";
  } catch {
    return "main";
  }
}

function hasChanges() {
  try {
    const status = execSync("git status --porcelain", {
      cwd: ROOT_DIR,
      encoding: "utf-8",
    }).trim();
    return status.length > 0;
  } catch {
    return false;
  }
}

function syncToGitHub() {
  if (isSyncing) return;
  if (!hasChanges()) return;

  isSyncing = true;
  const branch = getCurrentBranch();
  const timestamp = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Jakarta",
  });

  console.log(`\n🔄 [Auto-Sync] Perubahan terdeteksi pada ${timestamp} WIB.`);
  console.log(`📦 [Auto-Sync] Menyiapkan commit dan push ke GitHub (origin/${branch})...`);

  try {
    // 1. Stage all changes
    execSync("git add -A", { cwd: ROOT_DIR, stdio: "inherit" });

    // 2. Commit
    const commitMsg = `auto: update portfolio changes (${timestamp} WIB)`;
    execSync(`git commit -m "${commitMsg}"`, { cwd: ROOT_DIR, stdio: "inherit" });

    // 3. Push to remote
    console.log(`🚀 [Auto-Sync] Mengunggah ke GitHub...`);
    execSync(`git push origin ${branch}`, { cwd: ROOT_DIR, stdio: "inherit" });

    console.log(`✅ [Auto-Sync] Berhasil di-push ke GitHub: https://github.com/alzahraramadhani/portofolio-v2\n`);
  } catch (error) {
    console.error(`⚠️ [Auto-Sync] Terjadi kesalahan saat sinkronisasi:`, error.message);
  } finally {
    isSyncing = false;
  }
}

function scheduleSync() {
  if (pendingCommitTimer) {
    clearTimeout(pendingCommitTimer);
  }
  pendingCommitTimer = setTimeout(() => {
    syncToGitHub();
  }, DEBOUNCE_MS);
}

console.log("========================================================");
console.log("  🚀 Zahra Portfolio V2 — GitHub Auto-Sync Service");
console.log("========================================================");
console.log(`📁 Memantau direktori: ${ROOT_DIR}`);
console.log(`🎯 Remote target: https://github.com/alzahraramadhani/portofolio-v2`);
console.log(`🌿 Branch: ${getCurrentBranch()}`);
console.log("✨ Setiap kali kamu menyimpan file, perubahan akan otomatis di-commit & di-push.");
console.log("Tekan Ctrl+C untuk menghentikan auto-sync.\n");

// Initial check
if (hasChanges()) {
  scheduleSync();
}

// Watch filesystem recursively
try {
  fs.watch(
    ROOT_DIR,
    { recursive: true },
    (eventType, filename) => {
      if (!filename) return;

      // Ignore noise paths
      const normalized = filename.replace(/\\/g, "/");
      if (
        normalized.startsWith(".git") ||
        normalized.startsWith(".next") ||
        normalized.startsWith("node_modules") ||
        normalized.endsWith(".tsbuildinfo") ||
        normalized.endsWith("next-env.d.ts")
      ) {
        return;
      }

      scheduleSync();
    }
  );
} catch (err) {
  console.log("ℹ️ Recursive watch fallback ke periodic polling.");
}

// Fallback interval to ensure unstaged changes are never missed
setInterval(() => {
  if (hasChanges() && !pendingCommitTimer && !isSyncing) {
    scheduleSync();
  }
}, POLL_INTERVAL_MS);
