


let display = [];

let result = 0;

const operators = "+-×÷"

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate() {
    let nums = getNumbersFromDisplay();
    let ops = display.filter((n) => operators.includes(n));

    //for every operator in the ops array
    for (let op of ops) {
        /*"a" will always be equal to the first number of the nums array,
         and "b" will always be the second element*/
        let a = (nums[0]);
        let b = (nums[1]);
        switch (op) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "×":
            result = multiply(a, b);
            break;
        case "÷":
            result = divide(a, b);
            break;
       
        }
        /* adds result to the first position or the array nums, so it gets saved as a,
         if the array has b delete it so the next number can take its place */
        nums[0] = result;
        if (nums.includes(b)) {
            nums.splice(nums.indexOf(b), 1);

        }
    }
    if (isNaN(result) || result === Infinity) {
        displayContent("ERROR");
        setTimeout(() => {
            clearDisplay();
            
        }, 1000);
    } else {
        displayResult(result);
    }
    
    
}

function addElementToDisplay(element) {
    if (display.length !== 14) { 
        display.push(element);
    }
}

function displayResult(result) {
    /*if result has a decimal round it to 2 decimals, otherwise display it as it is */
    if (result % 1 !== 0) {
        display = [result.toFixed(2)];
    } else {
         display = [result];
    }
    
    ledDisplay.textContent = display.join("");

}

function clearDisplay() {
    display = [];
    ledDisplay.textContent = "0";
}

function deleteElement() {
    display.pop();
    displayContent(display.join(""))
    if (display.length === 0) {
        displayContent("0");
    }

}

function disableDecimal() {
    const dec = document.querySelector(".button.decimal")
    dec.setAttribute("class", "button decimal off");
}

function enableDecimal() {
    const dec = document.querySelector(".button.decimal")
    dec.setAttribute("class", "button decimal");
}

function displayContent(content) {
    ledDisplay.textContent = content;

}

function getNumbersFromDisplay() {
    /*joins display as a string,
     splits the string excluding the operator, therefore getting only a numbers array
     and finally maps each number to a float, returning an array of floats*/ 
    return display.join("").split(/[+\-×÷]/).map((num) => parseFloat(num));
    
}


const buttons = document.querySelectorAll(".button");

const ledDisplay = document.querySelector(".led-display");

setTimeout(() => {
    displayContent("0");
}, 1000);

//event handler

//added a ton of spaghetti to prevent the user for inputing more than one decimal per number, it partially works...
let decimalCount = 0;



buttons.forEach((div) => {
    div.addEventListener("click", (e) => {
        let text = e.target.outerText;
        switch (text) {
            case "=":
                operate();
                break;
            case "C":
                clearDisplay();
                decimalCount = 0;
                enableDecimal();
                break;
            case "DEL":
                deleteElement();
                break;
            default:
                switch(text) {
                    case "π":
                        text = "3.14";
                        break;
                    case ".":
                        decimalCount += 1;
                        if (decimalCount > 1) {
                            disableDecimal();
                        } else {
                            enableDecimal();
                        }
                        if (e.target.className === "button decimal off") {
                            return;
                        }
                   
                        break;
                }
                if (e.target.className === "button op") {
                    decimalCount = 0;
                    enableDecimal();
                }
                
                
                addElementToDisplay(text);
                displayContent(display.join(""));

                
                
                
        }  
        
    });
})




















