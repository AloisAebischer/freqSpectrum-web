@echo off
taskkill /IM nw.exe 2> NUL
start /B nw\nw.exe .
