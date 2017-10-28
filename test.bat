@echo off
@setlocal enableextensions enabledelayedexpansion

:: The variables
set "spaces=                                           "
set "line=TEST FILE%spaces%"
:: set "line=%line:~0,26%LAST MODIFIED%spaces%"
echo %line%

:: Pre-starting some commands
start mongod

:: The scripts
call :run specs\test_api.js
call :run specs\test_jnode.js
call :run specs\test_policy.js
call :run specs\test_route.js
call :run specs\test_uuid.js

goto:eof

:: The functions
:run
for %%? in (%~1) do (
	set filedata=%%~t?
	set filesize=%%~z?
)
set "line=%~1%spaces%"
:: set "line=%line:~0,26%%filedata%%spaces%"
echo %line%
node %~1
goto:eof
endlocal
