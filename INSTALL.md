# Installing dependencies

You must have npm installed on your system. 

Run the following commands to install Angular and Electron.js- 

```sh
npm install -g @angular/cli
```
```sh
npm install --save-dev electron@latest
```

Clone the repository and cd into the root directory. Then run the following commands - 
```sh
npm install
```
```sh
npm start
```
The desktop application should open in a new window.

## Generating executables for different OS

We need to install a [packaging software]("https://github.com/electron/electron-packager") first.
```sh
npm install electron-packager
```

For Windows executable:
```sh
npx electron-packager . Trackaday --platform=win32 --arch=x64
```

For MacOS executable:
```sh
npx electron-packager . Trackaday --platform=darwin --arch=arm64
```