const blockquote = document.getElementById('quotee');
const authorofQuote = document.getElementById('autho');
const newButton = document.getElementById("new");
const quoteCatagory = document.getElementById("quoteSelected");
const labels = document.querySelectorAll("#quoteSelected label");
const quoteBox = document.querySelector(".qote-box");
const addQuote = document.getElementById("add");
const deletQuotevar = document.getElementById("delet");

let allQuoteObject = JSON.parse(localStorage.getItem("allQuote"));



let selectedQuotes = [];
let selectedCatagory = {} ;

//  default display
const defaultCategory = "success";
selectedCatagory = allQuoteObject.find(catagory => catagory.id === defaultCategory);
selectedQuotes = selectedCatagory.quotes;
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


quoteCatagory.addEventListener('change', (event) => {
 const selectedCatagoryID = event.target.value;
  const selectedRadio = event.target;
  resetLabels();
  applySelectedStyle(selectedRadio);
  if (selectedCatagoryID === 'All') {
   selectedQuotes = allQuoteObject.flatMap(catagory => catagory.quotes);
  }

  else {
    selectedCatagory = allQuoteObject.find(catagory => catagory.id === selectedCatagoryID);
    selectedQuotes = selectedCatagory ? selectedCatagory.quotes : [];
  }

  displayQuote();
});

function displayQuote() {
  const selectedQuoteIndex = Math.floor(Math.random() * selectedQuotes.length);
  blockquote.innerHTML = selectedQuotes[selectedQuoteIndex].quote;
  authorofQuote.innerHTML = selectedQuotes[selectedQuoteIndex].author;

  deletQuotevar.addEventListener("click", () => {
    deletQuote(selectedQuoteIndex);

  })
}

newButton.addEventListener('click', displayQuote);
quoteBox.addEventListener('click', displayQuote);

// add logic 

addQuote.addEventListener("click", () => {
  const addquoteForm = document.getElementById("userNewQuote");
  addquoteForm.classList.remove('hidden');
});

document.getElementById("submit").addEventListener(('click'), () => {
  event.preventDefault();
  const addquoteForm =document.getElementById("userNewQuote");

  if (selectedCatagory.id === "All") {
    alert("Please select a specific category to add the quote.");
    return;
  }

  else {
    let useraddQuote = {
      id: (selectedQuotes.length + 1).toString(),
      quote: document.getElementById("added_quote").value,
      author: document.getElementById("added_quote_author").value
    }
    selectedQuotes.push(useraddQuote);
    console.log(selectedQuotes);
  
    
  }
  updatedCatagory();
  document.getElementById("added_quote").value = "",
  document.getElementById("added_quote_author").value =" ",
  addquoteForm.classList.add('hidden');

});

// delet 

function deletQuote(selectedQuoteIndex) {
  selectedQuotes.splice(selectedQuoteIndex, 1);
  updatedCatagory()
}
  

function updatedCatagory() {
   let catagoryToUpdate = allQuoteObject.find(catagory => catagory.id === selectedCatagory.id);
  
  
 
   if(catagoryToUpdate) {
    catagoryToUpdate.quotes = selectedQuotes;
    allQuoteString = JSON.stringify(allQuoteObject);
    localStorage.setItem("allQuote", allQuoteString);
   }

  
}











