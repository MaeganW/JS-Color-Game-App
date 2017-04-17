var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.getElementById('message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
//var easyBtn = document.querySelector('#easyBtn');
//var hardBtn = document.querySelector('#hardBtn');
var modeButtons = document.querySelectorAll('.mode');

init();

function init() {
    //mode buttons event listeners
    setupModeButtons();
    setupSquareListeners();
    reset();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;

            //The above terniary operator is essentially this logic, but cleaner/refactored:

            // if(this.textContent === "Easy"){
            //     numSquares = 3;
            // } else {
            //     numSquares = 6;
            // }       

            reset();
        });
    }
}

function setupSquareListeners() {
    for (var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener('click', function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to picked color
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                messageDisplay.textContent = "Try Again";
                this.style.backgroundColor = '#232323';
            }
        });
    }
}

function reset() {
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from the array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of the squares on the page
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
    }
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    h1.style.backgroundColor = "steelblue";
}

//easyBtn.addEventListener('click', function () {
//    easyBtn.classList.add('selected');
//    hardBtn.classList.remove('selected');
//    numSquares = 3;
//    colors = generateRandomColors(numSquares);
//    pickedColor = pickColor();
//    colorDisplay.textContent = pickedColor;
//    for (var i = 0; i < squares.length; i++) {
//        if (colors[i]) {
//            squares[i].style.background = colors[i];
//        } else {
//            squares[i].style.display = "none";
//        }
//    }
//})
//
//hardBtn.addEventListener('click', function () {
//    hardBtn.classList.add('selected');
//    easyBtn.classList.remove('selected');
//    numSqaures = 6;
//    colors = generateRandomColors(numSquares);
//    pickedColor = pickColor();
//    colorDisplay.textContent = pickedColor;
//    for (var i = 0; i < squares.length; i++) {
//        squares[i].style.background = colors[i];
//        squares[i].style.display = "block";
//    }
//});

resetButton.addEventListener('click', function () {
    reset();
})

function changeColors(color) {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //add num random colors to array
    for (var i = 0; i < num; i++) {
        //get random color and push into array
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from 0 - 255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0 - 255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")"
}
