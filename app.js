const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url');
const path = require('path');
const Store = require('./store');
const SESSION_KEY = 'session';
const TODO_KEY = 'tasks';
const ALL_KEY = 'all';

let mainWindow
const prefStore = new Store({
  configName: 'user-preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 }
  }
})

const dataStore = new Store({
  configName: 'user-data',
  defaults: {
    session: [],
    tasks: []
  }
})

function createWindow() {
  let { width, height } = prefStore.get('windowBounds');

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: 600,
    minHeight: 520,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.resolve("./src/preload.js"),
      devTools: true
    }
  })

  mainWindow.on('resize', () => {
    let {width, height} = mainWindow.getBounds();
    prefStore.set('windowBounds', {width, height});
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/trackaday/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function saveDataSession(event, data) {
  dataStore.set(SESSION_KEY, data);
}

function saveDataTodo(event, data) {
  dataStore.set(TODO_KEY, data);
}

function readData(event, key) {
  console.log("readData called");
  if(key == ALL_KEY){
    data = dataStore.data;
  } else {
    data = dataStore.get(key);
  }
  readDataCallback(event, data)
}

function readDataCallback(event, result){
  event.sender.send('read-data-reply', result);
  console.log("readData reply sent");
}

ipcMain.on("save-data-session", saveDataSession)
ipcMain.on("save-data-todo", saveDataTodo)
ipcMain.on("read-data", readData)

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})