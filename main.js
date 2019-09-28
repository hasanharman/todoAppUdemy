const electron = require('electron');
const url = require('url');
const path = require('path');

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

let mainWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        height: 800,
        width: 1000,
        webPreferences: {
            nodeIntegration: true
        },
    });

    mainWindow.setResizable(false);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    //Open Dev Tools
    mainWindow.webContents.openDevTools()

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

});


const mainMenuTemplate = [{
    label: "File",
    submenu: [{
            label: "add new todo",
            click() {
                createWindow();
            }
        },
        {
            label: "delete all",
        },
        {
            label: "exit",
            accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
            role: "quit"
        }
    ]
}, ]

if (process.platform == "darwin") {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "Finance"
    })
}

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [{
                label: "Open Dev Tools",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: "Reload",
                accelerator: process.platform == "darwin" ? "Command+R" : "Ctrl+R",
                role: "reload"
            }
        ]
    })
}

// Open New Page
// function createWindow() {
//     addWindow = new BrowserWindow({
//         width: 480,
//         height: 178,
//         title: "New window",
//         frame: false,
//     });

//     addWindow.setResizable(false);

//     addWindow.loadURL(url.format({
//         pathname: path.join(__dirname, 'pages/login.html'),
//         protocol: 'file',
//         slashes: true
//     }));

//     addWindow.on('close', () => {
//         addWindow = null;
//     })

// }