const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const fs = require("fs");

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 520,
    minHeight: 520,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.resolve("./src/preload.js"),
      devTools: false
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/trackaday/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("saveText", (event, txtVal) => {
  fs.writeFile("../abc.json", txtVal.toString(), (err) => {
    if (err) {
      console.error(error);
    } else {
      console.log("File Written");
    }
  })
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})