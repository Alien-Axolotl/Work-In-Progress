const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let scanController = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false,
    maximizeable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:5173');
}

function getFullScreenRect() {
  const display = screen.getPrimaryDisplay();
  return process.platform === 'darwin' ? display.bounds : screen.dipToScreenRect(null, display.bounds);
}

async function runScans(signal) {
  while (!signal.aborted) {
    try {
      const res = await fetch('http://localhost:8000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getFullScreenRect()),
        signal,
      });
      console.log('scan result', await res.json());
    } catch (err) {
      if (signal.aborted) return;
      console.log('scan failed', err.message);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

ipcMain.handle('module:start', () => {
  if (scanController) return;
  scanController = new AbortController();
  runScans(scanController.signal);
});

ipcMain.handle('module:stop', () => {
  scanController?.abort();
  scanController = null;
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
