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
    numbers: "",
    arrayOfNumber: [],
    operatorExecute: false,

    displayOnScreenValue(value) {
        elements.screen.textContent += value
    },

    displayOnScreenResult(result) {
        elements.screen.textContent = result        
    },

    displayCalculatedNumbers(number1, number2) {
        elements.calcNumbers.textContent = `${number1}+${number2}`
    },

    saveNumbersToArray() {
        const operatorNotWasExecuted = this.operatorExecute === false

        if(operatorNotWasExecuted) {
            this.arrayOfNumber[0] = Number(this.numbers)
            console.log(this.arrayOfNumber)

        } else {
            this.arrayOfNumber[1] = Number(this.numbers)
            console.log(this.arrayOfNumber)
            
        }
    },

    getNumber(number) {
        this.numbers += number
        this.saveNumbersToArray()
        this.displayOnScreenValue(number)
    },

    deleteCapturedNumbers() {
        this.numbers = ""
    },

    deleteElementOfArray(index, elements) {
        this.arrayOfNumber.splice(index, elements)
    },

    clearScreen() {
        elements.calcNumbers.textContent = ""
        elements.screen.textContent = ""
    },

    clearEntry() {
        this.deleteElementOfArray(0, 2)
        this.deleteCapturedNumbers()
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

        } else {
            this.operatorExecute = true
        }

        this.displayOnScreenValue("+")
        console.log(calculator.arrayOfNumber)

        this.deleteCapturedNumbers()
    },

    equals() {
    const correctMathExpression = /^\d+[\/\*\-\+\%]\d+$/.test(elements.screen.textContent)

        if(correctMathExpression) {
            this.displayCalculatedNumbers(this.arrayOfNumber[0], this.arrayOfNumber[1])

            this.result.bind(this)()
            this.deleteCapturedNumbers()
        }
        
        this.displayOnScreenResult(this.arrayOfNumber[0])

        this.operatorExecute = false
        if(this.operatorExecute == false) {
            this.deleteElementOfArray(1, 1)
        }
    }
}


const App = {
    init() {
        elements.btnNumber.forEach(number => {
            number.addEventListener("click", calculator.getNumber.bind(calculator, number.value))
        })

        elements.btnSum.addEventListener("click", calculator.sum.bind(calculator))
        elements.btnCE.addEventListener("click", calculator.clearEntry.bind(calculator))
        elements.btnEquals.addEventListener("click", calculator.equals.bind(calculator))
    },
}

App.init()