'use strict'

class Hangman {
    constructor(word, numGuesses) {
        this.word = word.toLowerCase().split('')
        this.numGuesses = numGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    statusChange() {
        if (this.numGuesses <= 0) {
            this.status = 'failed'
        } else if (!this.getPuzzle.includes('*')) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    get getPuzzle() {
        const wordLength = this.word.length
        let puzzle = Array(wordLength).fill('*')
        for(let i = 0; i < wordLength; i++) {
            if (this.word[i] === ' ') {
                puzzle[i] = this.word[i]
            }
            else if(this.guessedLetters.includes(this.word[i])) {
                puzzle[i] = this.word[i]
            }
        }
        return puzzle.join('')
    }
    get statusMessage() {
        if (this.status == 'playing') {
            return `Guesses left: ${this.numGuesses}.`
        } else if (this.status == 'failed') {
            return `Nice try! The word was "${this.word.join('')}".`
        } else if (this.status == 'finished') {
            return `Great work! You guessed the word.`
        }
    }
    makeGuess(newLetter) {
        if (typeof newLetter !== 'string' || newLetter.length !== 1) {
            throw Error('Input must be a single character!!')
        } else if (!this.guessedLetters.includes(newLetter)) {
            this.guessedLetters.push(newLetter)
            if (this.word.includes(newLetter)) {
                this.statusChange()
            } else {
                this.numGuesses -= 1
                this.statusChange()
            }
        }
    }
}

export { Hangman as default }