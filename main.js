const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {

    const win = new BrowserWindow({

        width: 1600,
        height: 900,

        minWidth: 1200,
        minHeight: 700,

        autoHideMenuBar: true,

        // ICONO DE METROID
        icon: path.join(__dirname, "icon.ico"),

        webPreferences: {

            preload: path.join(__dirname, "preload.js"),

            contextIsolation: true,
            nodeIntegration: false,

            plugins: true

        }

    });

    win.loadFile("index.html");

}

app.whenReady().then(createWindow);

app.on("activate", () => {

    if (BrowserWindow.getAllWindows().length === 0) {

        createWindow();

    }

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {

        app.quit();

    }

});