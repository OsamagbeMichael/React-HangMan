

type HangmanWordProps = {
    guessedLetters : string[]
    wordToGuess: string
    reveal?: boolean

}


export function HangmanWord({guessedLetters,wordToGuess,reveal=false} : HangmanWordProps){
    
    return <div style = {{
        display: "flex",
        gap: ".25em",
        fontSize:"6rem",
        fontWeight: "bold",
        textTransform:"uppercase",
        fontFamily:"monospace"

    }}>



        {/* For each letter in the array, we track the index for each letter.  */}
        {wordToGuess.split("").map((letter,index)=>(
            <span style = {{borderBottom: ".1em solid black"}} key={index}>
               <span style = {{
                // 
                // There is a ternary opertor checking if the array is included in the guessed letters. 
                visibility: guessedLetters.includes(letter)  || reveal?
                "visible":"hidden",
                color: !guessedLetters.includes(letter) && reveal ? "red":"black"

               }}>{letter}
               </span> 
                </span>
            
        ))}
    
    </div>
}