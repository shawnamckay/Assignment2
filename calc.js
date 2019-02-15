
var lastResult ="";
var equalPressed =false;
var result;
var input ="";

//Displays last result on the calculator
function displayLastResult(input, result){
    console.log(input);
    console.log(result);
    if(Number.isNaN(result) || result==undefined){
        document.getElementById('lastResult').innerText = "Error";
    }else if(result===input){
        lastResult =result;
        document.getElementById('lastResult').innerText = lastResult;
    }
    else{
        lastResult =input+"="+result;
        document.getElementById('lastResult').innerText = lastResult;
    }
}

//Displays the current result in the calculation box
function displayCurrentResult(result){
    if(Number.isNaN(result) || result ==undefined){
        document.getElementById('calcBox').innerText = "Error";
    }else{
        document.getElementById('calcBox').innerText = result;
    }
}

//Does the calculation when the enter button gets pressed
function calculateResult() {
    equalPressed=true;
    try{
        result = eval(input);
        displayLastResult(input, result);
        input =result;
    }catch(SyntaxError){
        result="";
        if(input==undefined){
            input="Error";
            lastResult ="Error";
        }else{
            lastResult =input+"="+"Error";
        }
        displayLastResult(input, result);
        input = "";
    }
    displayCurrentResult(result);
    updateClearButton();
}

//Adds input to the evaluation string
function buildInput(next){
    updateClearButton();
    if(input==undefined){
        input=next;
    }else {
        input = input + next;
    }
    document.getElementById('calcBox').innerText=input;
}

//Handles the AC/CE button interaction
function clearButton(){
    if(equalPressed){
        clearResult();
        equalPressed=false;
    } else if(input!=undefined){
        input = input.slice(0, -1);
    }else{
        input="";
    }
    document.getElementById('calcBox').innerText=input;
}

//Clears the input box and result variable
function clearResult(){
    result=" ";
    input=" ";
    document.getElementById('calcBox').innerText =result;
}

//Displays as either a AC or CE based on the context
function updateClearButton(){
    if(equalPressed){
        document.getElementById('clearButton').innerText = "AC";
    }else{
        document.getElementById('clearButton').innerText = "CE";
    }
}


//Included for easier debugging
function keyPressed(event){
    let num= parseInt(event.key);
    if(Number.isInteger(num)){
        buildInput(num);
    } else if(event.key=='Backspace'){
        clearButton();
    } else if(event.key=='=' || event.key =='Enter'){
        calculateResult();
    }else if(event.key=='-' || event.key=='+'|| event.key=='/'|| event.key=='*'|| event.key=='.' ||event.key=='('|| event.key==')'){
        buildInput(event.key.toString());
    }
}



