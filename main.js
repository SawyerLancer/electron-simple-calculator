const { app, BrowserWindow,globalShortcut } = require('electron')
const path = require('path')

let win

/** создание окна */
const createWindow = () => {

    // настройки экрана
     win = new BrowserWindow({
      width: 245,
      height: 342,
      titleBarStyle: process.platform == 'win32' ? 'default' : 'hidden',
      maximizable: false,
      resizable: false,
      show: false,
      autoHideMenuBar: true,
      icon: path.join(__dirname, './build/logo.png'),
      webPreferences: {
        preload: path.join(__dirname+'/src', 'dist.min.js')
      }
    })

    // загрузка шаблона
    win.loadFile('./src/index.html')
    
    // win.webContents.openDevTools({mode : 'detach'});

    // ожидание когда окно полностью прогрузится
    win.once('ready-to-show', () => {
      win.show()
    })

  }

/** запуск приложения */
app.whenReady().then(() => {

    // создание окна
    createWindow()
})


app.on('ready', () => {
  
  globalShortcut.register('1', () => {
    win.webContents.send('value',1)
  })

  globalShortcut.register('2', () => {
    win.webContents.send('value',2)
  })

  globalShortcut.register('3', () => {
    win.webContents.send('value',3)
  })

  globalShortcut.register('4', () => {
    win.webContents.send('value',4)
  })

  globalShortcut.register('5', () => {
    win.webContents.send('value',5)
  })

  globalShortcut.register('6', () => {
    win.webContents.send('value',6)
  })

  globalShortcut.register('7', () => {
    win.webContents.send('value',7)
  })

  globalShortcut.register('8', () => {
    win.webContents.send('value',8)
  })

  globalShortcut.register('9', () => {
    win.webContents.send('value',9)
  })

  globalShortcut.register('0', () => {
    win.webContents.send('value',0)
  })

  globalShortcut.register('num0', () => {
    win.webContents.send('value',0)
  })

  globalShortcut.register('num1', () => {
    win.webContents.send('value',1)
  })

  globalShortcut.register('num2', () => {
    win.webContents.send('value',2)
  })

  globalShortcut.register('num3', () => {
    win.webContents.send('value',3)
  })

  globalShortcut.register('num4', () => {
    win.webContents.send('value',4)
  })

  globalShortcut.register('num5', () => {
    win.webContents.send('value',5)
  })

  globalShortcut.register('num6', () => {
    win.webContents.send('value',6)
  })

  globalShortcut.register('num7', () => {
    win.webContents.send('value',7)
  })

  globalShortcut.register('num8', () => {
    win.webContents.send('value',8)
  })

  globalShortcut.register('num9', () => {
    win.webContents.send('value',9)
  })

  globalShortcut.register('numdiv', () => {
    win.webContents.send('action','division')
  })

  globalShortcut.register('nummult', () => {
    win.webContents.send('action','multiplication')
  })

  globalShortcut.register('numsub', () => {
    win.webContents.send('action','subtraction')
  })

  globalShortcut.register('numadd', () => {
    win.webContents.send('action','addition')
  })

  globalShortcut.register('-', () => {
    win.webContents.send('action','subtraction')
  })

  globalShortcut.register('=', () => {
    win.webContents.send('action','result')
  })

  globalShortcut.register('Plus', () => {
    win.webContents.send('action','addition')
  })

  globalShortcut.register('/', () => {
    win.webContents.send('action','division')
  })

  globalShortcut.register('*', () => {
    win.webContents.send('action','multiplication')
  })

})