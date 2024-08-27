
const allQuote = [
  {
    id: "programming",
    quotes: [
      {
        id: "1",
        quote: "when you don't create things, you become defined by your tastes rather than ability. your tastes only narrow & exclude people. so create",
        author: " Why The Lucky Stiff"
      },
      {
        id: "2",
        quote: " Programs must be written for people to read, and only incidentally for machines to execute.",
        author: "Harold Abelso"
      },
      {
        id: "3",
        quote: "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live",
        author: " John Woods"
      },
      {
        id: "4",
        quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler"
      },
      {
        id: "5",
        quote: "I'm not a great programmer; I'm just a good programmer with great habits",
        author: " Kent Beck"
      },
      {
        id: "6",
        quote: "Truth can only be found in one place: the code.",
        author: "Robert C. Martin"
      },
      {
        id: "7",
        quote: " Give a man a program, frustrate him for a day.Teach a man to program, frustrate him for a lifetime. ",
        author: "Muhammad Waseem"
      },
      {
        id: "8",
        quote: "A language that doesn't affect the way you think about programming is not worth knowing",
        author: "Alan J. Perlis"
      },

    ],
    favorites: []
  },

  {
    id: "motivational",
    quotes: [
      {
        id: "1",
        quote: "We cannot solve problems with the kind of thinking we employed when we came up with them",
        author: "Albert Einstein"
      },

      {
        id: "2",
        quote: "Learn as if you will live forever, live like you will die tomorrow.",
        author: "Mahatma Gandhi"
      },

      {
        id: "3",
        quote: "When you change your thoughts, remember to also change your world",
        author: "Norman Vincent Peale"
      },

      {
        id: "4",
        quote: "Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.",
        author: "Diane McLaren"

      },

      {
        id: "5",
        quote: "It is only when we take chances that our lives improve. The initial and the most difficult risk we need to take is to become honest",
        author: "Walter Anderson"
      },

    ],
    favorites: []
  },
  {
    id: "success",
    quotes: [
      {
        id: "1",
        quote: "Success is not final; failure is not fatal: It is the courage to continue that counts",
        author: "Winston Churchill"
      },

      {
        id: "2",
        quote: "It is better to fail in originality than to succeed in imitation.",
        author: "Herman Melville"
      },
      {
        id: "3",
        quote: "The road to success and the road to failure are almost exactly the same",
        author: "Colin R. Davis"
      },

      {
        id: "4",
        quote: "Success usually comes to those who are too busy to be looking for it",
        author: "Henry David Thoreau"
      },
      {
        id: "5",
        quote: "Success is getting what you want; happiness is wanting what you get.",
        author: "W. P. Kinsella"
      },
    ],
    favorites: []
  },
];


const blockquote = document.getElementById('quotee');
const authorofQuote = document.getElementById('autho');
const newButton = document.getElementById("new");
const quoteCatagory = document.getElementById("quoteSelected");
const labels = document.querySelectorAll("#quoteSelected label");
const quoteBox = document.querySelector(".qote-box");

let selectedQuotes =[];
  
//  default display
const defaultCategory = "success";
selectedQuotes = allQuote.find(category => category.id === defaultCategory).quotes;
displayQuote();


//  for label style
function resetLabels() {
  labels.forEach(label => {
      label.classList.remove('bg-[#ed9d09]', 'text-white');
      label.classList.add('text-[#ed9d09]', 'bg-transparent');
  });
}

const initialSelectedRadio = document.querySelector('input[name="catagory"]:checked');
    applySelectedStyle(initialSelectedRadio);

function applySelectedStyle(selectedRadio) {
  const selectedLabel = document.querySelector(`label[for="${selectedRadio.id}"]`);
  selectedLabel.classList.add('bg-[#ed9d09]', 'text-white');
  selectedLabel.classList.remove('text-[#ed9d09]', 'bg-transparent');
};


quoteCatagory.addEventListener('change' , (event) => {
    const  selectedCatagory= event.target.value;
    const selectedRadio = event.target;
    resetLabels();
    applySelectedStyle(selectedRadio);
     if(selectedCatagory === 'All') {
          selectedQuotes=allQuote.flatMap( catagory => catagory.quotes);
     }

     else {
          const selectcatagory= allQuote.find(catagory => catagory.id === selectedCatagory);
           selectedQuotes =selectcatagory ? selectcatagory.quotes: [];
     }

     displayQuote();
});
function displayQuote() {
  const selectedQuoteIndex = Math.floor(Math.random() * selectedQuotes.length);
  blockquote.innerHTML = selectedQuotes[selectedQuoteIndex].quote;
  authorofQuote.innerHTML = selectedQuotes[selectedQuoteIndex].author;
}

newButton.addEventListener('click' ,displayQuote);
quoteBox.addEventListener('click' ,displayQuote);

// 
let allQuoteString = JSON.stringify(allQuote);
localStorage.setItem("allQuote" ,allQuoteString);
console.log(allQuoteString);


// retrived
let allQuoteObject = JSON.parse(localStorage.getItem("allQuote"));
console.log(allQuoteObject)








