const path = require('path');
const { app, BrowserWindow, screen } = require('electron');
const reload = require('electron-reload');

async function createWindow() {
  const window = new BrowserWindow({
    width: screen.getPrimaryDisplay().workArea.width,
    height: screen.getPrimaryDisplay().workArea.height,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
    },
  }); 

  await window.loadFile('./index.html');

  window.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', app.quit);

reload(path.join(__dirname, './bin'), {
  electron: require('electron'),
});
