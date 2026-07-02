@echo off
setlocal
set "APP_DIR=%~dp0"
echo.
echo  Story Coach - Starting dev server...
echo  Directory: %APP_DIR%
echo.

start "Story Coach Dev Server" cmd /k "cd /d "%APP_DIR%" && npm run dev"

echo  Waiting for server to start...
timeout /t 6 /nobreak > nul

echo  Opening browser...
start http://localhost:3000

echo.
echo  Server is running in the other window.
echo  Press any key to close this launcher.
pause > nul
