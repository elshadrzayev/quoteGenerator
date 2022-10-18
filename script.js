// https://type.fit/api/quotes
//https://jacintodesign.github.io/quotes-api/data/quotes.json

//https://twitter.com/intent/tweet

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const apiUrl = "https://type.fit/api/quotes";
let apiQuotes = [];

// Loading Function

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// show new quote

const newQuote = function () {
  loading();
  // Pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check for null value of author add Unknow

  !quote.author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = quote.author);

  // check quote length to determine styling
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // Set the quote and Hide the loader
  quoteText.textContent = quote.text;
  complete();
};

// get quotes from api

const getQuotes = async function () {
  loading();
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    if (!response.ok) throw new Error(`The error ${response.status}`);
    newQuote();
  } catch (err) {
    // Catch error
    alert(err);
  }
};

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Events listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
