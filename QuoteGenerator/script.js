console.log("testing.");

const quoteContainer = document.getElementById("quotation-containers");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuote = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];


//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function newQuotes(){
    loading();
    const Quote = Math.floor(Math.random() * apiQuotes.length);
    console.log(apiQuotes[Quote]);

    if(!apiQuotes[Quote]['author'])
    {
        author.textContent = "UNKNOWN"
    }else {
        author.textContent = apiQuotes[Quote]['author']
    }
    if(apiQuotes[Quote].text.length > 120){
        quote.classList.add("long-quote");
    }else {
        quote.classList.remove("long-quote");
    }
    quote.textContent = apiQuotes[Quote]['text']
    complete();
}


async function getQuotes(){
    const apiURL = 'https://type.fit/api/quotes'
    loading();
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json(); 
        newQuotes();
    }catch(error){
        //catch error here
    }
    
}

newQuote.addEventListener('click', newQuotes)


//onload
getQuotes();