import {useEffect, useState,useCallback} from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"



function getWord(){
  return words[Math.floor(Math.random() * words.length)]
}

function App(){
  // We are creating a function in the use state to get a random word. 
  const[wordToGuess,setWordToGuess] = useState(getWord)
  // useState(()=> {
  //   return words[Math.floor(Math.random()* words.length)] // get a random number bewteen 0 and what is in the list, taking that from the list and rounding it down
  // }) //The initial value of wordToGuess is set using a callback function passed to useState, which generates a random word from an array words using Math.random() and Math.floor() functions

  const[guessedLetters, setGuessedLetters] = useState<string[]>([])
// This returns an array of string.

const incorrectLetters = guessedLetters.filter(
  letter => !wordToGuess.includes(letter)
  // In oder to get response from our actual keybaord we need to use use effect
)

const isLoser =  incorrectLetters.length >= 6
const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

const addGuessedLetter = useCallback(
  (letter: string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner)return

  setGuessedLetters(currentLetters=>[...currentLetters,letter]) 
  // This renders the letter being guessed on the screen. 
},[guessedLetters,isWinner,isLoser]) 


useEffect(()=>{

  const handler = (e:KeyboardEvent)=>{
    const key = e.key 

    if ( key !="Enter") return
    setWordToGuess(getWord())



    e.preventDefault()
    setGuessedLetters([])
    addGuessedLetter(key)


  }
document.addEventListener("keypress",handler)

return() => {
  document.removeEventListener("keypress",handler)

}

},[guessedLetters])


useEffect(()=>{ const handler = (e:KeyboardEvent)=>{
  const key = e.key 

  if (!key.match(/^[a-z]$/)) return
  e.preventDefault()
  addGuessedLetter(key)


}
document.addEventListener("keypress",handler)

return() => {
document.removeEventListener("keypress",handler)

}
},[])

  return (
    
    <div style = {{

    maxWidth: "800px",
    display: "flex",
    flexDirection: "column", //we want everything to stack on top of each other 
    gap: "2rem",
    margin: "0 auto",
    alignItems: "center"
    


  }}> 

<div style = {{fontSize: "2rem",textAlign: "center"}}>
  {isWinner && "Winner! - Refresh to try again"}
  {isLoser && "Nice Try! - Refresh to try again"}
</div>  

<HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
<HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
<div style = {{alignSelf: "stretch"}}><Keyboard disabled = {isWinner ||isLoser} activeLetters={guessedLetters.filter(lettter => wordToGuess.includes(lettter)
)}

inactiveLetters = {incorrectLetters}
addGuessedLetter = {addGuessedLetter}
/>
 </div>


</div>
  )

}

export default App