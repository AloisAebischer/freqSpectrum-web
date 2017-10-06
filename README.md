Procédure d'installation
- Installer Visual Studio 2015 Community avec le module C++ uniquement
- Installer Python 2.7
- npm config set msvs_version 2015
- npm install -g gulp dans une console administrateur
- npm install -g nw-gyp
- npm install (dans le répertoire freqSpectrum-web) = installation des modules présents dans package.json
- nw-gyp configure --target=0.15.1 (dans le répertoire node_modules/serialport) 
- nw-gyp build --target=0.15.1 (dans le répertoire node_modules/serialport) 
- run



 