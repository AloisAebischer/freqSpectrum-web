@echo off
taskkill /IM nw.exe
taskkill /IM VirtualHub.exe
start /MIN virtualhub\VirtualHub.exe 
start /B nw-release\nw.exe .
timeout 5
wmic process where name="minute-repeater.exe" CALL setpriority "high priority"