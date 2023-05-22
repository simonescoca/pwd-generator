// Dai la possibilità all’utente di scegliere fra lettere, numeri, caratteri speciali
// Sostituire Math.random() con Crypto: getRandomValues() method
// Aggiungi un tasto per la copia della password
// Sostituisci i parseInt con dei Math.floor() quando non devi trasformare una stringa in numero
// aggiungere due tasti per scorrere di +-1 il value dell’input
// aggiungere un tasto per refreshare la password
// crea un input type range bello esteticamente


// inizializzo la variabile inputElement e la metto uguale all'input range del documento
const inputElement = document.getElementById ("input")

// inizializzo la variabile inputVal e le fornisco un valore iniziale
let inputVal = 1

// inizializzo la variabile password e la pongo uguale ad una stringa vuota
let password = ""

// inizializzo 4 tipi diversi di array
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const lowercaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const specialCharacters = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", "|", ";", ":", "'", '"', ",", ".", "<", ">", "/", "?", "`", "~"]



// creo la funzione che dagli array genera la password finale
function genPwd () {
        
    // dichiaro 4 variabili in cui mi chiedo se nella password sono inclusi tutti i tipi di caratteri
    let hasNumber = false
    let hasUpper = false
    let hasLower = false
    let hasSpecial = false

    // genera diverse password all'infinito, finché non generi una password con tutti i tipi di caratteri 
    while (!hasNumber || !hasUpper || !hasLower || !hasSpecial) {

        // resetto la variabile password ad ogni ciclo while
        password = ""
        
        // resetto tutte le variabili booleane di check type ad ogni ciclo while
        hasNumber = false
        hasUpper = false
        hasLower = false
        hasSpecial = false

        // faccio un ciclo for che si ripete n volte, con n = inputVal
        for (let i = 0 ; i < inputVal ; i++) {
        
            // dichiaro 4 nuove variabili che prendono un valore a caso del loro array
            const randomNumber = numbers [parseInt (Math.random() * numbers.length)]
            const randomUppercaseLetter = uppercaseLetters [parseInt (Math.random() * uppercaseLetters.length)]
            const randomLowercaseLetter = lowercaseLetters [parseInt (Math.random() * lowercaseLetters.length)]
            const randomSpecialCharacter = specialCharacters [parseInt (Math.random() * specialCharacters.length)]
            
            // creo un nuovo array typesRandom con le 4 variabili casuali dichiarate prima
            const typesRandom = [randomNumber, randomUppercaseLetter, randomLowercaseLetter, randomSpecialCharacter]

            // dichiaro un variabile che prende un valore a caso dall'array typesRandom, qundi un randomCharacter
            const randomChar = typesRandom [parseInt (Math.random() * typesRandom.length)]

            // se il randomChar è incluso in uno degli array iniziali, allora la variabile booleana di quel tipo diventa true
            if (numbers.includes(randomChar)) hasNumber = true
            if (uppercaseLetters.includes(randomChar)) hasUpper = true
            if (lowercaseLetters.includes(randomChar)) hasLower = true
            if (specialCharacters.includes(randomChar)) hasSpecial = true
            
            // riassegno il valore della variabile password aggiungendo per ogni ciclo un valore a caso dell'array typesRandom
            password += randomChar
        }
    }
}


// creo una funzione che esegua dei controlli sulla inputVal, che crei degli alert se serve e quando possibile richiami genPwd ()
function checkInput () {

    // riassegno inputVal e la pongo uguale al value dell'input
    inputVal = parseInt (inputElement.value)

    // pulisco la stringa della variabile password
    password = ""

    // inizializzo la costante mainElement e la metto uguale al main nel documento
    const mainElement = document.querySelector ("main")

    // inizializzo una costante e la metto uguale all'elemento con id = "alert" NB. elemento che nel documento ancora non c'è, perchè viene creato dopo tramite JS
    const alertElement = document.getElementById ("alert")

    // inizializzo una costante e la metto uguale all'elemento con id = "response" NB. elemento che nel documento ancora non c'è, perchè viene creato dopo tramite JS
    const responseElement = document.getElementById ("response")

    // se la costante alertElement è vera, cioè: se esiste un elemento nell'HTML con id="alert", allora rimuovilo
    if (alertElement) {
        alertElement.remove()
    }
    
    // se la costante responseElement è vera, cioè: se esiste un elemento nell'HTML con id="response", allora rimuovilo
    if (responseElement) {
        responseElement.remove()
    }


    // se a inputVal è assegnato un valore Nan, cioè che non è un numero, oppure è assegnato un valore minore di 1, cioè da 0 in giù oppure...
    if (isNaN (inputVal) || inputVal < 1 || inputVal !== Math.floor (inputVal) || Math.floor (inputVal) > 80) {
        // prendi l'emento del documento con id="range-value", leva le classi "yellow e green e aggiungi la red"
        document.getElementById ("range-value").classList.remove ("range-value-yellow")
        document.getElementById ("range-value").classList.remove ("range-value-green")
        document.getElementById ("range-value").classList.add ("range-value-red")

        // prendi l'input element, leva le classi "yellow e green e aggiungi la red"
        inputElement.classList.remove ("input-yellow")
        inputElement.classList.remove ("input-green")
        inputElement.classList.add ("input-red")

        // crea una variabile chiamata alertElement, uguale ad un elemento <p> creato nel documento, dagli un id e una classe, e popola con un testo, dopodiché aggiungilo al main
        const alertElement = document.createElement ("p")
        alertElement.id = "alert"
        alertElement.classList.add ("alert-red")
        alertElement.append ("Invalid Pwd lenght !")
        mainElement.appendChild (alertElement)

    } else if (inputVal === 1) {
        document.getElementById ("range-value").classList.remove ("range-value-yellow")
        document.getElementById ("range-value").classList.remove ("range-value-green")
        document.getElementById ("range-value").classList.add ("range-value-red")

        inputElement.classList.remove ("input-yellow")
        inputElement.classList.remove ("input-green")
        inputElement.classList.add ("input-red")

        const alertElement = document.createElement ("p")
        alertElement.id = "alert"
        alertElement.classList.add ("alert-red")
        alertElement.append ("Password must have at least 4 characters !")
        mainElement.appendChild (alertElement)

        document.getElementById ("range-value") .innerText = inputVal

    } else if (inputVal < 4) {
        document.getElementById ("range-value").classList.remove ("range-value-yellow")
        document.getElementById ("range-value").classList.remove ("range-value-green")
        document.getElementById ("range-value").classList.add ("range-value-red")

        inputElement.classList.remove ("input-yellow")
        inputElement.classList.remove ("input-green")
        inputElement.classList.add ("input-red")

        const alertElement = document.createElement ("p")
        alertElement.id = "alert"
        alertElement.classList.add ("alert-red")
        alertElement.append ("Password must have at least 4 characters !")
        mainElement.appendChild (alertElement)

        document.getElementById ("range-value") .innerText = inputVal
        
    } else if (inputVal < 12) {
        document.getElementById ("range-value").classList.remove ("range-value-red")
        document.getElementById ("range-value").classList.remove ("range-value-green")
        document.getElementById ("range-value").classList.add ("range-value-yellow")

        inputElement.classList.remove ("input-red")
        inputElement.classList.remove ("input-green")
        inputElement.classList.add ("input-yellow")

        const alertElement = document.createElement ("p")
        alertElement.id = "alert"
        alertElement.classList.add ("alert-yellow")
        alertElement.append ("Strong passwords must have at least 12 characters !")
        mainElement.appendChild (alertElement)

        // richiamo la funzione che genera la password
        genPwd ()

        // crea una variabile chiamata responseElement, uguale ad un elepento <p> creato nel documento, dagli un id e una classe, e popola con la password, dopodiché aggiungilo al main, ma dopo l'alert
        const responseElement = document.createElement ("p")
        responseElement.id = "response"
        responseElement.append (password)
        mainElement.appendChild (responseElement)

        document.getElementById ("range-value") .innerText = inputVal

    } else {
        document.getElementById ("range-value").classList.remove ("range-value-yellow")
        document.getElementById ("range-value").classList.remove ("range-value-red")
        document.getElementById ("range-value").classList.add ("range-value-green")

        inputElement.classList.remove ("input-yellow")
        inputElement.classList.remove ("input-red")
        inputElement.classList.add ("input-green")

        genPwd ()

        const responseElement = document.createElement ("p")
        responseElement.id = "response"
        responseElement.append (password)
        mainElement.appendChild (responseElement)

        document.getElementById ("range-value") .innerText = inputVal
    }
}

// richiamo la funzione di check input con il value iniziale che è 12, così al caricamento della pagina la password non risulta vuota
checkInput ()

// aggiungo un evento che si attiva al cambiamento istantaneo dell'input, che è diverso da "change"
inputElement.addEventListener ("input", function () {checkInput ()})

// aggiungo due evevnti diversi che si attivano uno con l'enter, ed esegue il refresh della pwd. L'altro cambia l'inputVal con le frecce direzionali
document.addEventListener("keydown", 
    function (event) {
        if (event.key === "Enter") {
            checkInput ()
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "ArrowLeft") {
            inputElement.focus()
            inputElement.active()
        }
    }    
)