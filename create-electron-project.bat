echo "Creating app-name directory"
mkdir app-name
mkdir app-name\node_modules

echo "Creating all files"
type NUL > app-name\.gitignore
type NUL > app-name\main.js
type NUL > app-name\package.json
type NUL > app-name\index.html
type NUL > app-name\run.bat

echo node_modules^/^* > .gitignore

echo .^/node_modules^/electron^-prebuilt^/dist^/electron^.exe .^/ > app-name\run.bat

echo ^<html^> > app-name\index.html
echo ^<head^> >> app-name\index.html
echo ^<^/head^> >> app-name\index.html
echo ^<body^> >> app-name\index.html
echo ^<h1^>Hello App^<h1^> >> app-name\index.html
echo ^<^/body^> >> app-name\index.html
echo ^<^/html^> >> app-name\index.html

echo const ^{app^, BrowserWindow^} ^= require^(^'electron^'^)^; > app-name\main.js
echo let win^; >> app-name\main.js
echo function createWindow ^(^) ^{ >> app-name\main.js
echo 	win ^= new BrowserWindow^(^{width^: 800^, height^: 600^}^); >> app-name\main.js
echo 	win.loadURL^(^`file^:^/^/^$^{__dirname^}^/index^.html^`^); >> app-name\main.js
echo 	win.webContents.openDevTools^(^); >> app-name\main.js
echo 	win.on^('closed', ^(^) ^=^> ^{ >> app-name\main.js
echo 		win = null; >> app-name\main.js
echo 	^}^); >> app-name\main.js
echo ^}; >> app-name\main.js


echo ^{ > app-name\package.json
echo 	^"name^"    : ^"your-app^", >> app-name\package.json
echo 	^"version^" : ^"0.1.0^", >> app-name\package.json
echo 	^"main^"    : ^"main.js^" >> app-name\package.json
echo 	^"devDependencies^": ^{ >> app-name\package.json
echo 		^"electron-prebuilt^": ^"^^1.2.0^",     >> app-name\package.json
echo 	^} >> app-name\package.json
echo ^} >> app-name\package.json

echo off
cls
echo APP CREATED
echo 
echo DIRECTORY TREE AND FILES
echo 
echo 
tree app-name /F
