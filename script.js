const elements = {
    btnNumber: document.querySelectorAll(".number"),
    btnSum: document.querySelector("#sum"),
    btnMinus: document.querySelector("#minus"),
    btnMultiple: document.querySelector("#multiple"),
    btnDivide: document.querySelector("#divide"),
    btnEquals: document.querySelector("#equals"),
    btnCE: document.querySelector("#clear-entry"),
    screen: document.querySelector("#result"),
    calcNumbers: document.querySelector("#calc-numbers"),
}

const calculator = {
    savedNumber: "",
    arrayOfNumber: [],
    operatorExecute: false,

    displayOnScreen(value) {
        elements.screen.textContent += value
    },

    displayOnScreenResult(result) {
        elements.screen.textContent = result
    },

    clearScreen() {
        elements.calcNumbers.textContent = ""
        elements.screen.textContent = ""
    },

    displayCalculatedNumbers(number1, number2) {
        elements.calcNumbers.textContent = `${number1}+${number2}`
    },

    getNumber(number) {
        this.arrayOfNumber.push(Number(number))
        this.displayOnScreen(number)
    },

    deleteSavedNumber() {
        this.savedNumber = ""
    },

    deleteElementOfArray(index, elements) {
        this.arrayOfNumber.splice(index, elements)
    },
    
    clearEntry() {
        this.deleteElementOfArray(0, 2)
        this.deleteSavedNumber()
        this.clearScreen()
        this.operatorExecute = false
    },

    result() {
        const sum = this.arrayOfNumber.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        this.arrayOfNumber[0] = sum
    },
    
    sum() {
        
        if(this.operatorExecute === true) {
            this.displayCalculatedNumbers(this.arrayOfNumber[0], this.arrayOfNumber[1])
            this.result()
            this.displayOnScreenResult(this.arrayOfNumber[0])
            this.deleteElementOfArray(1, 1)

        } else {
            this.operatorExecute = true
        }

        this.displayOnScreen("+")
    },
}


const App = {
    init() {
        elements.btnNumber.forEach(number => {
            number.addEventListener("click", calculator.getNumber.bind(calculator, number.value))
        })

        elements.btnSum.addEventListener("click", calculator.sum.bind(calculator))
        elements.btnCE.addEventListener("click", calculator.clearEntry.bind(calculator))

        elements.btnEquals.addEventListener("click", () => {
            calculator.result.bind(calculator)()
            calculator.operatorExecute = false
            calculator.deleteElementOfArray(1, 1)
            calculator.displayOnScreenResult(calculator.arrayOfNumber[0])
        })
    },
}

App.init()