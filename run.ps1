Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  Portfolio Development Server    " -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Green
npm run dev
