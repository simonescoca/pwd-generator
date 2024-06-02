// * inizializzo una serie di variabili che si riferiscono agli input nel dom
const inputRangeElement = document.getElementById("input-range");
const inputCheckNumbers = document.getElementById("input-check-numbers");
const inputCheckUpLetters = document.getElementById("input-check-up-letters");
const inputCheckLowLetters = document.getElementById("input-check-low-letters");
const inputCheckSpecChars = document.getElementById("input-check-spec-chars");

const leftArrow = document.getElementById("value--");
const copyButton = document.getElementById("copy");
const refreshButton = document.getElementById("refresh");
const rightArrow = document.getElementById("value++");

// * inizializzo delle variabili che controllino il value degli input
const rangeValue = parseInt(inputRangeElement.value);
const areNumbersOk = inputCheckNumbers.checked;
const areUpLettersOk = inputCheckUpLetters.checked;
const areLowLettersOk = inputCheckLowLetters.checked;
const areSpecCharsOk = inputCheckSpecChars.checked;

// * richiamo la funzione di check con il value iniziale del range = 12, così al caricamento della pagina la password non risulta vuota
checkInputs(rangeValue, areNumbersOk, areUpLettersOk, areLowLettersOk, areSpecCharsOk);


// ! EVENT LISTENERS > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
inputRangeElement.addEventListener ("input", updatePW);

inputCheckNumbers.addEventListener ("click", updatePW);

inputCheckUpLetters.addEventListener ("click", updatePW);

inputCheckLowLetters.addEventListener ("click", updatePW);

inputCheckSpecChars.addEventListener ("click", updatePW);

document.addEventListener ("keydown", (event) => {
    if (event.key === "Enter") updatePW();
    else if (
        event.key === "ArrowUp"
        || event.key === "ArrowDown"
        || event.key === "ArrowRight"
        || event.key === "ArrowLeft"
    ) inputRangeElement.focus();  
});

leftArrow.addEventListener ("click", () => {
    let rangeValue = parseInt(inputRangeElement.value) - 1;
    inputRangeElement.value = rangeValue;

    const areNumbersOk = inputCheckNumbers.checked;
    const areUpLettersOk = inputCheckUpLetters.checked;
    const areLowLettersOk = inputCheckLowLetters.checked;
    const areSpecCharsOk = inputCheckSpecChars.checked;
    
    checkInputs(rangeValue, areNumbersOk, areUpLettersOk, areLowLettersOk, areSpecCharsOk);
});

copyButton.addEventListener ("click", () => {
    const responseElement = document.getElementById("response");
    const textToCopy = responseElement.innerText;
    navigator.clipboard.writeText(textToCopy);
});

refreshButton.addEventListener ("click", updatePW);

rightArrow.addEventListener ("click", () => {
    let rangeValue = parseInt(inputRangeElement.value) + 1;
    inputRangeElement.value = rangeValue;

    const areNumbersOk = inputCheckNumbers.checked;
    const areUpLettersOk = inputCheckUpLetters.checked;
    const areLowLettersOk = inputCheckLowLetters.checked;
    const areSpecCharsOk = inputCheckSpecChars.checked;
    
    checkInputs(rangeValue, areNumbersOk, areUpLettersOk, areLowLettersOk, areSpecCharsOk);
});

// ! FUNZIONI > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >
/**
 * Generates a cryptographically secure random index
 * @param {number} arrayLength 
 * @returns a random (0 <= index < array.length) 
 */
function genRandomIndex (arrayLength) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomIndex = array[0] % (arrayLength);
    return randomIndex;
}

/**
 * Generates a pwdLength characters long password with several combinations of types of characters within at least one char per type selected
 * @param {number} pwdLength password's length
 * @param {boolean} areNumbersIncluded includes or not numbers
 * @param {boolean} areUpLettersIncluded includes or not uppercase letters
 * @param {boolean} areLowLettersIncluded includes or not lowercase letters
 * @param {boolean} areSpecCharsIncluded includes or not special characters
 * @returns {string} the password
 */
function genPwd (pwdLength, areNumbersIncluded, areUpLettersIncluded, areLowLettersIncluded, areSpecCharsIncluded) {

    // * se nessun input di typeChar è selezionato, comunque viene selezionato "numbers"
    if (!areNumbersIncluded && !areUpLettersIncluded && !areLowLettersIncluded && !areSpecCharsIncluded) {
        const a = Math.floor(Math.random() * 4);
        switch(a) {
            case 0:
                areNumbersIncluded = true;
                inputCheckNumbers.checked = true;
                inputCheckUpLetters.checked = false;
                inputCheckLowLetters.checked = false;
                inputCheckSpecChars.checked = false;
                break;
            case 1:
                areUpLettersIncluded = true;
                inputCheckNumbers.checked = false;
                inputCheckUpLetters.checked = true;
                inputCheckLowLetters.checked = false;
                inputCheckSpecChars.checked = false;
                break;
            case 2:
                areLowLettersIncluded = true;
                inputCheckNumbers.checked = false;
                inputCheckUpLetters.checked = false;
                inputCheckLowLetters.checked = true;
                inputCheckSpecChars.checked = false;
                break;
            case 3:
                areSpecCharsIncluded = true;
                inputCheckNumbers.checked = false;
                inputCheckUpLetters.checked = false;
                inputCheckLowLetters.checked = false;
                inputCheckSpecChars.checked = true;
                break;
        }
    }

    let password = "";

    // * inizializzo 4 tipi diversi di array
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const upLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const lowLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const specChars = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "-", "_", "=", "+", ".", "?", "€"];
        
    // * dichiaro 4 variabili in cui mi chiedo se nella password sono inclusi tutti i tipi di caratteri
    let hasNumber = false;  if (!areNumbersIncluded)     hasNumber = true;
    let hasUp = false;      if (!areUpLettersIncluded)   hasUp = true;
    let hasLow = false;     if (!areLowLettersIncluded)  hasLow = true;
    let hasSpec = false;    if (!areSpecCharsIncluded)   hasSpec = true;

    // * genera diverse password all'infinito, finché non generi una password con tutti i tipi di caratteri 
    while (!hasNumber || !hasUp || !hasLow || !hasSpec) {

        // * resetto la variabile password ad ogni ciclo while
        password = "";
        
        // * resetto tutte le variabili booleane di check type ad ogni ciclo while
        hasNumber = false;  if (!areNumbersIncluded)     hasNumber = true;
        hasUp = false;      if (!areUpLettersIncluded)   hasUp = true;
        hasLow = false;     if (!areLowLettersIncluded)  hasLow = true;
        hasSpec = false;    if (!areSpecCharsIncluded)   hasSpec = true;


        // * finche non esce una password che abbia tutti i tipi di caratteri selezionati dall'utente, continua a generare password
        while (password.length < pwdLength) {
        
            // * dichiaro 4 nuove variabili che prendono un valore a caso del loro array
            let randomNumber = numbers[genRandomIndex(numbers.length)];     if(!areNumbersIncluded)     randomNumber = "";
            let randomUp = upLetters[genRandomIndex(upLetters.length)];     if(!areUpLettersIncluded)   randomUp = "";
            let randomLow = lowLetters[genRandomIndex(lowLetters.length)];  if(!areLowLettersIncluded)  randomLow = "";
            let randomSpec = specChars[genRandomIndex(specChars.length)];   if(!areSpecCharsIncluded)   randomSpec = "";
            
            // * creo un nuovo array typesRandom con le 4 variabili casuali dichiarate prima
            const typesRandom = [randomNumber, randomUp, randomLow, randomSpec];

            // * dichiaro una variabile che prende un valore a caso dall'array typesRandom, qundi un randomCharacter
            const randomChar = typesRandom[genRandomIndex(typesRandom.length)];

            // * se il randomChar è incluso in uno degli array iniziali, allora la variabile booleana di quel tipo diventa true
            if(numbers.includes(randomChar))     hasNumber = true;
            if(upLetters.includes(randomChar))   hasUp = true;
            if(lowLetters.includes(randomChar))  hasLow = true;
            if(specChars.includes(randomChar))   hasSpec = true;
            
            // * riassegno il valore della variabile password aggiungendo per ogni ciclo un valore a caso dell'array typesRandom
            password += randomChar;
        }
    }
    // * ritorno il valore della password
    return password;
}


// * creo una funzione che esegua dei controlli sugli input, che crei degli alert se serve e quando possibile richiami genPwd ()
function checkInputs(pwdLength, areNumbersIncluded, areUpLettersIncluded, areLowLettersIncluded, areSpecCharsIncluded) {

    // inizializzo la costante mainElement e la metto uguale al main nel documento
    const mainElement = document.querySelector ("main");

    // inizializzo una costante e la metto uguale all'elemento con id = "alert" NB. elemento che nel documento ancora non c'è, perchè viene creato dopo tramite JS
    const alertElement = document.getElementById ("alert");

    // inizializzo una costante e la metto uguale all'elemento con id = "response" NB. elemento che nel documento ancora non c'è, perchè viene creato dopo tramite JS
    const responseElement = document.getElementById ("response");

    const inputRangeValue = document.getElementById("input-range-value");
    const main  = document.getElementById("main");

    // se la costante alertElement è vera, cioè: se esiste un elemento nell'HTML con id="alert", allora rimuovilo
    if (alertElement) alertElement.remove();
    
    // se la costante responseElement è vera, cioè: se esiste un elemento nell'HTML con id="response", allora rimuovilo
    if (responseElement) responseElement.remove();

    if (!areNumbersIncluded && !areUpLettersIncluded && !areLowLettersIncluded && !areSpecCharsIncluded) document.getElementById ("input-check-numbers").checked = true;

    // * se a pwdLength è assegnato un valore Nan, cioè che non è un numero, oppure è assegnato un valore minore di 1, cioè da 0 in giù oppure...
    if (isNaN (pwdLength) || pwdLength < 1 || pwdLength !== Math.floor (pwdLength) || Math.floor (pwdLength) > 60) {
        // prendi l'emento del documento con id="range-value", leva le classi "yellow e green e aggiungi la red"
        inputRangeValue.classList.remove("my_value-yellow", "my_value-green");
        inputRangeValue.classList.add("my_value-red");

        main.classList.remove("main-border-yellow", "main-border-green");
        main.classList.add("main-border-red");

        // prendi l'input element, leva le classi "yellow e green e aggiungi la red"
        inputRangeElement.classList.remove("my_range-yellow", "my_range-green");
        inputRangeElement.classList.add("my_range-red");

        // crea una variabile chiamata alertElement, uguale ad un elemento <p> creato nel documento, dagli un id e una classe, e popola con un testo, dopodiché aggiungilo al main
        const alertElement = document.createElement("p");
        alertElement.id = "alert";
        alertElement.classList.add("my_alert-red");
        alertElement.append("INVALID INPUTS!");
        mainElement.appendChild(alertElement);

    } else if (pwdLength < 4) {
        inputRangeValue.classList.remove ("my_value-yellow", "my_value-green");
        inputRangeValue.classList.add ("my_value-red");

        main.classList.remove("main-border-yellow", "main-border-green");
        main.classList.add("main-border-red");

        inputRangeElement.classList.remove("my_range-yellow", "my_range-green");
        inputRangeElement.classList.add("my_range-red");

        const alertElement = document.createElement("p");
        alertElement.id = "alert";
        alertElement.classList.add("my_alert-red");
        alertElement.append("Password must have at least 4 characters !");
        mainElement.appendChild(alertElement);

        document.getElementById("input-range-value").innerText = pwdLength;
        
    } else if (pwdLength < 12) {
        inputRangeValue.classList.remove("my_value-red", "my_value-green");
        inputRangeValue.classList.add("my_value-yellow");

        main.classList.remove("main-border-red", "main-border-green");
        main.classList.add("main-border-yellow");

        inputRangeElement.classList.remove("my_range-red", "my_range-green");
        inputRangeElement.classList.add("my_range-yellow");

        // * richiamo la funzione che genera la password
        const password = genPwd(pwdLength, areNumbersIncluded, areUpLettersIncluded, areLowLettersIncluded, areSpecCharsIncluded);

        // crea una variabile chiamata responseElement, uguale ad un elepento <p> creato nel documento, dagli un id e una classe, e popola con la password, dopodiché aggiungilo al main, ma dopo l'alert
        const responseElement = document.createElement("p");
        responseElement.id = "response";
        responseElement.append(password);
        mainElement.appendChild(responseElement);

        responseElement.classList.remove("my_response-green");
        responseElement.classList.add("my_response-yellow");

        inputRangeValue.innerText = pwdLength

    } else {
        inputRangeValue.classList.remove("my_value-yellow", "my_value-red");
        inputRangeValue.classList.add("my_value-green");

        main.classList.remove ("main-border-yellow", "main-border-red");
        main.classList.add("main-border-green");

        inputRangeElement.classList.remove ("my_range-yellow", "my_range-red");
        inputRangeElement.classList.add("my_range-green");

        const password = genPwd(pwdLength, areNumbersIncluded, areUpLettersIncluded, areLowLettersIncluded, areSpecCharsIncluded);

        const responseElement = document.createElement("p");
        responseElement.id = "response";
        responseElement.append(password);
        mainElement.appendChild(responseElement);

        responseElement.classList.remove("my_response-yellow");
        responseElement.classList.add("my_response-green");

        inputRangeValue.innerText = pwdLength;
    }
}


// ! Newwwwwwwwwwwwww
function updatePW() {
    const rangeValue = parseInt(inputRangeElement.value);
    const areNumbersOk = inputCheckNumbers.checked;
    const areUpLettersOk = inputCheckUpLetters.checked;
    const areLowLettersOk = inputCheckLowLetters.checked;
    const areSpecCharsOk = inputCheckSpecChars.checked;

    checkInputs(rangeValue, areNumbersOk, areUpLettersOk, areLowLettersOk, areSpecCharsOk);
}