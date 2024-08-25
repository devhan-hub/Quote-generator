const quotes = [
    "Success is focusing the full power of all you are on what you have a burning desire to achieve.",

    " Success is not final; failure is not fatal: It is the courage to continue that counts.",

    " I find that the harder I work, the more luck I seem to have.",

    " Whether you think you can or think you can’t, you’re right.",

    " The greater the difficulty, the more the glory in surmounting it.",

    "Success is how high you bounce when you hit bottom.-George .",

    " You are never too old to set another goal or to dream a new dream.",


     " Don't be distracted by criticism. Remember, the only taste of success some people get is to take a bite out of you.",

     " Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.-Samuel Beckett",
     "To succeed in life, you need two things: ignorance and confidence."

];

const authors =[
   "Wilfred Peterson","Winston S. Churchill","Thomas Jefferson","Henry Ford","Epicurus","George S. Patton","C.S. Lewis","Zig Ziglar","Samuel Beckett","Mark Twain"

];
const quote = document.getElementById("quotee");
const author= document.getElementById("autho");
const newquotegeneret = document.getElementById("new");

newquotegeneret.addEventListener("click" ,quotegeneratorfunction );

function quotegeneratorfunction() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quote.innerHTML=quotes[randomIndex];
    author.innerHTML=authors[randomIndex];
}