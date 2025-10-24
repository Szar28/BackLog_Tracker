const {app, BrowserWindow} = require('electron')
const path = require('node:path')

const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600

const createWindow = () => {
    const win = new BrowserWindow({
        height: WINDOW_HEIGHT,
        width: WINDOW_WIDTH,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})