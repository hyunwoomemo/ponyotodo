const { app, BrowserWindow, Menu} = require("electron");

const createWindow = () => {
    const window = new BrowserWindow({
        width: 900,
        height: 600,
        icon: "/icon.png"
    });
    window.loadFile("index.html");
};


const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

require('update-electron-app')();