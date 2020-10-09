'use strict'
import uuidv4 from 'uuid/v4'
import Hangman from './hangman'
import getPuzzle from './requests'

console.log(uuidv4())

let hangman
const puzzleElement = document.querySelector('#hangman-puzzle')

const renderPuzzle = function() {

    puzzleElement.innerHTML = ''

    let resetButton = document.createElement('button')
    resetButton.setAttribute("id", "reset")
    resetButton.classList.add("button")
    resetButton.textContent = 'Reset'
    resetButton.addEventListener('click', startGame)
    

    let currentPuzzle = document.createElement('div')
    currentPuzzle.setAttribute("id", "puzzle")
    currentPuzzle.setAttribute("class", "puzzle")
    hangman.getPuzzle.split('').forEach(letter => {
        let letterEl = document.createElement('span')
        letterEl.textContent = letter
        currentPuzzle.appendChild(letterEl)
    })
    // currentPuzzle.textContent = `${hangman.getPuzzle}`

    let statusMessage = document.createElement('p')    
    statusMessage.textContent = hangman.statusMessage

    puzzleElement.appendChild(currentPuzzle)
    puzzleElement.appendChild(statusMessage)
    puzzleElement.appendChild(resetButton)
    
}




window.addEventListener('keypress', (e)  => {
    if (hangman.status === 'playing') {
        const guess = String.fromCharCode(e.charCode)
        hangman.makeGuess(guess)
        renderPuzzle()
    }
})

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    hangman = new Hangman(puzzle , 5)
    renderPuzzle()
}

startGame()