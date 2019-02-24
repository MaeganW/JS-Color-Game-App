var numSquares = 6
var codeType = 'RGB'
var colors = []
var pickedColor
var container = document.getElementById('container')
var squares
var colorDisplay = document.getElementById('colorDisplay')
var colorToMatch = document.getElementById('colorToMatch')
var messageDisplay = document.getElementById('message')
var h1 = document.querySelector('h1')
var resetButton = document.querySelector('#reset')
var modeButtons = document.querySelectorAll('.mode')
var codeButtons = document.querySelectorAll('.code')

init()

function init() {
    //mode buttons event listeners
    setupModeButtons()
    //code buttons event listeners
    setupCodeButtons()
    //start le game
    reset()
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected')
            modeButtons[1].classList.remove('selected')
            modeButtons[2].classList.remove('selected')
            this.classList.add('selected')
            switch(this.textContent){ //are switch statements still in?
                case "Easy":
                    numSquares = 3
                    break
                case "Medium":
                    numSquares = 6
                    break
                default:
                    numSquares = 9
                    break
            }
            reset()
        })
    }
}

function setupCodeButtons() {
    for (var i = 0; i < codeButtons.length; i++) {
        codeButtons[i].addEventListener('click', function () {
            codeButtons[0].classList.remove('selected')
            codeButtons[1].classList.remove('selected')
            this.classList.add('selected')
            this.textContent === 'RGB' ? codeType = 'RGB' : codeType = 'Hex'
            reset()
        })
    }
}

function setupSquareListeners() {
    squares = document.querySelectorAll('.square')
    for (var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener('click', function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor
            //compare color to picked color
            if (clickedColor === colorToMatch.style.backgroundColor) {
                messageDisplay.textContent = "Correct!"
                changeColors([clickedColor])
                h1.style.backgroundColor = clickedColor
                resetButton.textContent = "Play Again?"
            } else {
                messageDisplay.textContent = "Try Again"
                this.style.backgroundColor = '#232323'
            }
        })
    }
}

function reset() {
    colors = generateRandomColors(numSquares) //generate all new colors
    pickedColor = pickColor() //pick a new random color from the array
    colorDisplay.textContent = pickedColor //change colorDisplay to match picked color
    colorToMatch.style.backgroundColor = pickedColor //when you assign a hex background color through style, it converts to rgb -_- needed this for comparison on hex option


    if(squares != undefined){ //if there are squares (not the start of a new game)
        if(numSquares >= squares.length){ //if you want MORE squares
            for (var i = 0; i < (numSquares - squares.length); i++){ //dynamically creating the squares based on the difficulty level
                var node = document.createElement("div"); //make the div
                node.classList.add('square') //give it a class of square
                container.appendChild(node); //throw it in the container
            }
        } else if (numSquares < squares.length){ //if you want LESS squares
            for (var i = 0; i < (squares.length - numSquares); i++){
                container.removeChild(container.childNodes[1]) //remove squares until you're at the desired number
            }
        }
        squares = document.querySelectorAll('.square') //since new squares have been created, reassign them all to the sqaures array
    } else { //when game is started, no squares exist, so it's undefined
        for (var i = 0; i < numSquares; i++){ //just read the more squares case above. I don't wanna retype it
            var node = document.createElement("div"); 
            node.classList.add('square') 
            container.appendChild(node); 
        }
        squares = document.querySelectorAll('.square') //since new squares have been created, reassign them all to the sqaures array
    }
    
    setupSquareListeners() //now that all squares have been created, setting up listeners on all squares
    changeColors(colors) //and now that all squares have been created, giving them some color
    
    resetButton.textContent = "New Colors"
    messageDisplay.textContent = ""
    h1.style.backgroundColor = "#4682b4"
}

resetButton.addEventListener('click', function () {
    reset();
})

function changeColors(color) {
    if(color.length === 1) { //this section is for changing the squares color when the player picks the RIGHT color
        for (var i = 0; i < squares.length; i++) { 
            squares[i].style.backgroundColor = color[0]
        }
    } else { //this section is for creating the new squares
        for (var i = 0; i < squares.length; i++) { //loop through all squares
            squares[i].style.backgroundColor = color[i] //change each color to match given color
        }
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length) //decides which random color for player to guess
    return colors[random]
}

function generateRandomColors(num) {
    var arr = [] //for storing color codes
    if(codeType === 'RGB'){
        for (var i = 0; i < num; i++) {
            arr.push(randomRGBColor()) //get random rgb color and push into array
        }
    } else if(codeType === 'Hex'){
        for (var i = 0; i < num; i++) {
            arr.push(randomHexColor()) //get random hex color and push into array
        }
    }
    return arr //return array of colors
}

function randomRGBColor() {
    var r = Math.floor(Math.random() * 256) //pick a "red" from 0 - 255
    var g = Math.floor(Math.random() * 256) //pick a "green" from 0 - 255
    var b = Math.floor(Math.random() * 256) //pick a "blue" from 0 - 255
    return "rgb(" + r + ", " + g + ", " + b + ")"
}

// Get random hex color
function randomHexColor() {
    var hex = Math.floor(Math.random()*16777215).toString(16) //get a random integer within this range and then convert it to a string (it'll spit out a hex code)
    if(hex.length < 6) hex = '0' + hex //sometimes the leading 0 got axed, if it did, add it back
    return '#' + hex
}
