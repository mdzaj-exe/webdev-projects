//1. Deposit some money
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4. Spin slot machine
//5. Check if user won
//6. give user their winnings OR take if they lose
//7 play again (or no money left)

const prompt = require("prompt-sync")();

//Global Variables- make them all caps
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8,
} 

const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 6,
    "D" : 2
}


//es6 style, type 2
const deposit = () => {
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount); //converts to float number, non number leads to NaN

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid deposit amount, try again.");
        }else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines); //converts to float number, non number leads to NaN

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        }else{
            return numberOfLines;
        }
    }
}

const getBet = (balance, numberOfLines) => {
    while (true){
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet); //converts to float number, non number leads to NaN

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / numberOfLines) {
            console.log("Invalid bet, try again.");
        }else{
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i= 0; i < COLS; i++){ //iterates inside of reels array
        reels.push([]);
        const reelSymbols = [...symbols]; //generates AVAILABLE symbols per reel, thats why its seperate from other symbols array
        for (let j=0; j < ROWS; j++){ //iterates inside of NESTED array
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); //math.floor rounds down bc length of array is always array-1
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

const printRows = (rows) =>{
    for(const row of rows){ //this makes an array
        let rowString = " ";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i !=rows.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

//right now we have reels (columns) but we get the score by counting across rows, so we have to transpose them from EX: [A,B,C] [C,B,A] TO [A,C] [B,B] [C,A]
const transpose = (reels) =>{
    const rows= [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows;
}

const getWinnings = (rows, bet, numberOfLines) =>{
    let winnings = 0;

    for (let row = 0; row<numberOfLines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
}

const game = () =>{
    let balance = deposit();

    while(true){
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -=bet*numberOfLines; //places bet
        const reels = spin(); 
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <= 0){
            console.log("You ran out of money!")
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?");
        if(playAgain != "y") break;
    } 
}

game();

