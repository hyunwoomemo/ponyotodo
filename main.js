const { app, BrowserWindow, Menu} = require("electron");

const createWindow = () => {
    const window = new BrowserWindow({
        width: 900,
        height: 600,
        icon: "icon.ico"
    });
    window.loadFile("index.html");

    const template = [
        {
            label : "Ponyo's To Do",
            submenu : [
                { 
                label: "Add To Do",
                click: () => {
                    window.webContents.executeJavaScript(`
                    onToDoForm();
                    `);
                }
                },
                {
                    type : "separator",
                },
                { 
                    label: "Reset",
                    click: () => {
                        window.webContents.executeJavaScript(`
                        localStorage.clear();
                        window.location.reload();
                        `);
                    }
                    },
            ]
        },
        {
            label : "🐯",
            submenu : [],
        }
    ];

/*     const customMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(customMenu); */
};

app.whenReady().then(() => {
    createWindow();
});