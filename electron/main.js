const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

const OVERLAY_WIDTH = 320;
const OVERLAY_HEIGHT = 130;
const API_BASE = process.env.VITE_API_BASE;

let overlayWin = null;
let overlayResult = null;

function createOverlay() {
  const { x, y, width } = screen.getPrimaryDisplay().workArea;

  const win = new BrowserWindow({
    x: x + width - OVERLAY_WIDTH,
    y,
    width: OVERLAY_WIDTH,
    height: OVERLAY_HEIGHT,
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    hasShadow: false,
    resizable: false,
    movable: false,
    focusable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setIgnoreMouseEvents(true);
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setContentProtection(true);

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('overlay:result', overlayResult);
    win.showInactive();
  });

  win.on('closed', () => {
    if (overlayWin === win) overlayWin = null;
  });

  win.loadFile(path.join(__dirname, 'overlay.html'));
  overlayWin = win;
}

function closeOverlay() {
  overlayResult = null;
  if (!overlayWin) return;

  const win = overlayWin;
  overlayWin = null;
  win.destroy();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    resizable: false,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      additionalArguments: API_BASE ? [`--api-base=${API_BASE}`] : [],
    },
  });

  win.webContents.on('did-start-loading', closeOverlay);
  win.on('closed', closeOverlay);

  win.loadURL(process.env.FRONTEND_URL || 'http://localhost:5173');
}

ipcMain.on('overlay:update', (_event, result) => {
  overlayResult = result;

  if (!overlayWin) {
    createOverlay();
    return;
  }

  if (!overlayWin.webContents.isLoading()) {
    overlayWin.webContents.send('overlay:result', result);
    overlayWin.setAlwaysOnTop(true, 'screen-saver');
    overlayWin.moveTop();
  }
});

ipcMain.on('overlay:close', closeOverlay);

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
