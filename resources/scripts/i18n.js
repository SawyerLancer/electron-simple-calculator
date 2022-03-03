const path = require("path")
const electron = require('electron')
const fs = require('fs')

let translateFile // файл с переводами

let app = electron.app ? electron.app : electron.remote.app // объект приложения

// объект для экспорта
module.exports = t

function t() {

    console.log(app.getLocale())

    if(fs.existsSync(path.join(__dirname, app.getLocale() + '.js'))) {
        translateFile = JSON.parse(fs.readFileSync(path.join(__dirname, app.getLocale() + '.js'), 'utf8'))
    }
    else {
        translateFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.js'), 'utf8'))
    }

}

t.prototype.__ = function(phrase) {

    let translation = translateFile[phrase]

    if(translation === undefined) {
         translation = phrase
    }

    return translation
}