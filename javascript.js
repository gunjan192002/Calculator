"use strict"

var input = document.getElementById('input');
var number = document.querySelectorAll('.numbers div');
var operator = document.querySelectorAll('.operators div');
var clear = document.getElementById('clear');
var result = document.getElementById('result');
var resultDisplayed = false;

for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function (e) {

        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        }
        else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        }
        else {
            resultDisplayed = false;
            input.innerHTML = " ";
            input.innerHTML += e.target.innerHTML;
        }
    });
}

for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function (e) {
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
            console.log(newString);
        }
        else if (currentString.length === 0) {
            alert('Enter a number first');
        }
        else {
            input.innerHTML += e.target.innerHTML;
        }
    });
}

result.addEventListener('click', function () {
    var inputString = input.innerHTML;

    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    var operators = inputString.replace(/[0-9]|\./g, "").split("");
    console.log(inputString);
    console.log(numbers);
    console.log(operators);
    console.log("----------------------------");

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷")
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var substract = operators.indexOf("-");
    while (substract != -1) {
        numbers.splice(substract, 2, numbers[substract] - numbers[substract + 1]);
        operators.splice(substract, 1);
        substract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        numbers.splice(add, 2, numbers[add] + numbers[add + 1]);
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0];

    resultDisplayed = true;
});


clear.addEventListener("click", function () {
    input.innerHTML = "";
})