const { shell,ipcRenderer } = require('electron')
const path = require('path')

// ожидание загрузки браузера
window.addEventListener('DOMContentLoaded', () => {

    var Result = 0, // Result - текущий результат вычислений / первое число
        Number = 0 // Number - второе число 

    var CheckerNumber = false,  // CheckerNumber - проверка какое число сейчас вводится 1 или 2
        CurrentAction = false  // CurrentAction - текущее действие (сложение,умножение и тд)

/** отчистка значений (требуется после завершения операций) */
function clearAll(){

    Number = 0
    CheckerNumber = false
    CurrentAction = false

}

/** установка кнопки AC или C в зависимости от ввода чисел */
function setAcOrCButton(value){

    if(parseFloat(document.getElementById("numberSection").innerHTML) == '0')
    {
        document.getElementById("numberSection").innerHTML = value.toString();
        document.getElementById("actionClean").innerHTML = "C"
    }
    else{
        document.getElementById("numberSection").innerHTML += value.toString();
    }

}

/** установка разделителя */
function setDivide(){

    if(document.getElementById("numberSection").innerHTML.indexOf('.') !== -1)
    {
        shell.beep()
    }
    else{
        document.getElementById("numberSection").innerHTML +=  "."
    }

}

/** установка процента от числа */
function setPercent(){

    document.getElementById("numberSection").innerHTML = parseFloat(document.getElementById("numberSection").innerHTML) / 100

}

/** установка позитивного или негативного числа */
function setPositiveOrNegative(){

    if(document.getElementById("numberSection").innerHTML.indexOf('-') !== -1){
        document.getElementById("numberSection").innerHTML = document.getElementById("numberSection").innerHTML.substr(1)
    }
    else
    {
        document.getElementById("numberSection").innerHTML = '-' + document.getElementById("numberSection").innerHTML
    }

    // установка значения
    setValue()

}

/** установка значения для первого или второго числа */
function setValue(){

    // парсинг значения 
    let val = parseFloat(document.getElementById("numberSection").innerHTML)

    let fontSize = parseInt(document.getElementById("numberSection").style.fontSize.replace('px',''))

    if(document.getElementById("numberSection").innerHTML.length > 7){

        if(typeof fontSize != 'number' || isNaN(fontSize)){
            fontSize = 47
        }

        if(fontSize > 14){
            fontSize -= 2
        }

    }

    document.getElementById("numberSection").style.fontSize = fontSize+"px"

    // Если текущее действие отсутсвует записывай в первое число 
    // Если действие выбрано запиши на второе число
    if(CurrentAction === false){
        Result = val
    }
    else{
        Number = val
    }

}

/** установка значения для чисел */
function setValueDisplay(value){

    // если необходимо ввести второе число и оно равно 0 то отчисти поле ввода
    if(CheckerNumber === true & Number == 0){
        document.getElementById("numberSection").innerHTML = ""
    }

    // Смена кнопки AC/C
    setAcOrCButton(value)

    // установка значения
    setValue()
    
}

/** отчистика поля ввода */
function getClean(){

    document.getElementById("numberSection").style.fontSize = "47px"

    if(document.getElementById("actionClean").innerHTML == 'C'){
        document.getElementById("numberSection").innerHTML = "0"
        document.getElementById("actionClean").innerHTML = "AC"
    }
    else{
        CurrentAction = false
        document.getElementById("numberSection").innerHTML = "0"
        clearAll()
    }
}

/** выполнение вычислений */
function getResult(){

    // выбор необходимого действия
    switch(CurrentAction){

        // сложение
        case "addition":
            callAddition()
        break;

        // вычитание
        case "subtraction":
            callSubtraction()
        break;

        // деление
        case "division":
            callDivision()
        break;

        // деление
        case "multiplication":
            callMultiplication()
        break;

    }

    if(Result.toString().length > 7){

        let i = Result.toString().length - 7
        let size = 0

        while(i != 0){
            size += 2
            i--
        }

        if(size < 14){
            size = 14
        }

        // изменение размера шрифта
        document.getElementById("numberSection").style.fontSize = size+"px"

    }

    // вывод результата
    document.getElementById("numberSection").innerHTML = Result

    // отчистка переменных
    clearAll()

}

/** выбор действия "сложение" */
function getAddition(){
    
    CheckerNumber = true
    CurrentAction = "addition"

}

/** выполненение "сложения" */
function callAddition(){

    Result = Result + Number

}

/** выбор действия "вычитание" */
function getSubtraction(){

    CheckerNumber = true
    CurrentAction = "subtraction"

}

/** выполнение "вычитания" */
function callSubtraction(){

    Result = Result - Number

}

/** выбор действия "деления" */
function getDivision(){

    CheckerNumber = true
    CurrentAction = "division"

}

/** выполнение "деления" */
function callDivision(){

    Result = Result / Number

}

/** выбор действия "умножения" */
function getMultiplication(){

    CheckerNumber = true
    CurrentAction = "multiplication"

}

/** выполнение "умножения" */
function callMultiplication(){

    Result = Result * Number

}

document.getElementById('actionEquals').addEventListener("click", function(){
    getResult();
});

document.getElementById('actionNumberSeven').addEventListener('click', () => {
    setValueDisplay(7);
});

document.getElementById('actionNumberEight').addEventListener('click', () => {
    setValueDisplay(8);
});

document.getElementById('actionNumberNine').addEventListener('click', () => {
    setValueDisplay(9);
});

document.getElementById('actionNumberFour').addEventListener('click', () => {
    setValueDisplay(4);
});

document.getElementById('actionNumberFive').addEventListener('click', () => {
    setValueDisplay(5);
});

document.getElementById('actionNumberSix').addEventListener('click', () => {
    setValueDisplay(6);
});

document.getElementById('actionNumberOne').addEventListener('click', () => {
    setValueDisplay(1);
});

document.getElementById('actionNumberTwo').addEventListener('click', () => {
    setValueDisplay(2);
});

document.getElementById('actionNumberThree').addEventListener('click', () => {
    setValueDisplay(3);
});

document.getElementById('actionClean').addEventListener('click', () => {
    getClean();
});

document.getElementById('actionAddition').addEventListener('click', () => {
    getAddition();
});

document.getElementById('actionSubtraction').addEventListener('click', () => {
    getSubtraction();
});

document.getElementById('actionDivision').addEventListener('click', () => {
    getDivision();
});

document.getElementById('actionMultiplication').addEventListener('click', () => {
    getMultiplication();
});

document.getElementById('actionDivide').addEventListener('click', () => {
    setDivide();
});

document.getElementById('actionPercent').addEventListener('click', () => {
    setPercent();
});

document.getElementById('actionPositiveOrNegative').addEventListener('click', () => {
    setPositiveOrNegative();
});

ipcRenderer.on('value', (event,col) => {
    setValueDisplay(col);
})

ipcRenderer.on('action', (event,col) => {

    if(col != 'result'){
        CheckerNumber = true
        CurrentAction = col
        return true
    }

    getResult()

})

if(process.platform == 'win32'){
    document.getElementsByClassName("number-section")[0].classList.add('number-section-no-darwin')
}

})