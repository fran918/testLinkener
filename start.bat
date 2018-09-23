@echo off
color 74
echo ===============================
echo =                             =
echo =     INICIANDO SERVIDOR      = 
echo =                             =
echo ===============================
echo .
echo .

cd .\solution 
start cmd /k ng serve
cd ..
java -jar backend/server.jar
pause>nul
exit