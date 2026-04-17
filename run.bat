@echo off
echo ===================================
echo   Portfolio Development Server    
echo ===================================
echo.
echo Installing dependencies...
call npm install

echo.
echo Starting development server...
call npm run dev
