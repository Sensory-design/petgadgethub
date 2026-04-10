# Fixes *local* DNS cache so your PC stops using an old IP for petgadgethub.co.uk.
# Does not change the internet - run on your Windows machine (double-click or PowerShell).
#
# Usage (from repo folder):
#   powershell -ExecutionPolicy Bypass -File .\scripts\windows-petgadgethub-dns-fix.ps1

$ErrorActionPreference = "Continue"

Write-Host "=== PetGadgetHub: flush local DNS cache ===" -ForegroundColor Cyan
ipconfig /flushdns | Out-Null
Write-Host "OK: Windows DNS cache flushed.`n" -ForegroundColor Green

Write-Host "What public DNS (Google 8.8.8.8) returns - should be 216.198.79.1:" -ForegroundColor Cyan
try {
  Resolve-DnsName petgadgethub.co.uk -Type A -Server 8.8.8.8 | Where-Object { $_.Type -eq "A" } | Format-Table -AutoSize
} catch {
  Write-Host $_.Exception.Message
}

Write-Host "What THIS PC uses next (if still 35.214.x.x, resolver cache - wait or change DNS):" -ForegroundColor Cyan
try {
  Resolve-DnsName petgadgethub.co.uk -Type A | Where-Object { $_.Type -eq "A" } | Format-Table -AutoSize
} catch {
  Write-Host $_.Exception.Message
}

Write-Host "`nOptional: set Wi-Fi/Ethernet DNS to 8.8.8.8 and 8.8.4.4, then run this script again." -ForegroundColor Yellow
Write-Host "See docs/DOMAIN.md (Still see the old WordPress site on your PC).`n" -ForegroundColor Yellow
