# Auto-Sync PowerShell Script for Zahra Portfolio V2
# Usage: .\scripts\auto-sync.ps1

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  🚀 Zahra Portfolio V2 — GitHub Auto-Sync (PowerShell)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$currentDir = Split-Path -Parent $PSScriptRoot
Set-Location $currentDir

$branch = git rev-parse --abbrev-ref HEAD
if (-not $branch) { $branch = "main" }

Write-Host "📁 Direktori: $currentDir" -ForegroundColor Gray
Write-Host "🎯 Target: https://github.com/alzahraramadhani/portofolio-v2" -ForegroundColor Gray
Write-Host "🌿 Branch: $branch" -ForegroundColor Gray
Write-Host "✨ Memantau perubahan file... Tekan Ctrl+C untuk berhenti." -ForegroundColor Green
Write-Host ""

while ($true) {
    $status = git status --porcelain
    if ($status) {
        $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        Write-Host "🔄 [$timestamp] Perubahan terdeteksi. Melakukan auto commit & push..." -ForegroundColor Yellow
        
        git add -A
        git commit -m "auto: update portfolio changes ($timestamp WIB)"
        git push origin $branch
        
        Write-Host "✅ [$timestamp] Berhasil di-push ke GitHub!" -ForegroundColor Green
        Write-Host ""
    }
    Start-Sleep -Seconds 5
}
