const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startModule: () => ipcRenderer.invoke('module:start'),
  stopModule: () => ipcRenderer.invoke('module:stop'),
});
