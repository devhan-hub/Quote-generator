
const blockquote = document.getElementById('quotee');
const authorofQuote = document.getElementById('autho');
const newButton = document.getElementById("new");
const quoteCatagory = document.getElementById("quoteSelected");
const labels = document.querySelectorAll("#quoteSelected label");
const quoteBox = document.querySelector(".qote-box");
const addQuote = document.getElementById("add");
let deletQuotevar = document.getElementById("delet");
let deletYes = document.getElementById("Yes");
let deletNo = document.getElementById("No");
let favoriteQuoteList = document.getElementById("favorite");
const favoriteIcon = document.querySelector(".fav");
const clearFavority = document.querySelector(".clearFavority");
const submit = document.getElementById("submit");

// retriving from local storage

let allQuoteObject = JSON.parse(localStorage.getItem("allQuote"));
console.log(allQuoteObject)
let favoriteQuotes =allQuoteObject.find(catagory => catagory.id === "favorite");

favoriteQuotes = favoriteQuotes.quotes;


// console.log(favoriteQuotes)
let selectedQuotes = [];
let selectedCatagory = {};
let selectedQuoteIndex;
let quotelength;
const initialSelectedRadio = document.querySelector('input[name="catagory"]:checked');
applySelectedStyle(initialSelectedRadio);
//  for label 
function resetLabels() {
  labels.forEach(label => {
    label.classList.remove('bg-[#ed9d09]', 'text-white');
    label.classList.add('text-[#ed9d09]', 'bg-transparent');
  });
}
function applySelectedStyle(selectedRadio) {
  const selectedLabel = document.querySelector(`label[for="${selectedRadio.id}"]`);
  selectedLabel.classList.add('bg-[#ed9d09]', 'text-white');
  selectedLabel.classList.remove('text-[#ed9d09]', 'bg-transparent');
};
// default Quote
// blockquote.innerHTML = selectedCatagory.id
const defaultCategory = "motivational";
selectedCatagory = allQuoteObject.find(catagory => catagory.id === defaultCategory);
selectedQuotes = selectedCatagory.quotes;
quotelength= selectedQuotes.length;
displayQuote();

// getting selected quote
quoteCatagory.addEventListener('change', (event) => {
  const selectedCatagoryID = event.target.value;
  const selectedRadio = event.target;
  resetLabels();
  applySelectedStyle(selectedRadio);

  selectedCatagory = allQuoteObject.find(catagory => catagory.id === selectedCatagoryID);
  if (selectedCatagory) {
   
      selectedQuotes = selectedCatagory.quotes;
      quotelength = selectedQuotes.length;
  }

  displayQuote();
});

function displayQuote() {
  selectedQuoteIndex = Math.floor(Math.random() * selectedQuotes.length);
  blockquote.textContent = selectedQuotes[selectedQuoteIndex].quote;
  authorofQuote.textContent = selectedQuotes[selectedQuoteIndex].author;

  if(favoriteQuotes.find(favorite => favorite.quote === blockquote.textContent && favorite.author ===  authorofQuote.textContent))
     {
      favoriteIcon.classList.add("text-red-600")
     }
     else {
      favoriteIcon.classList.remove("text-red-600")
     }
  
}

newButton.addEventListener('click', displayQuote);

// add user Quote
addQuote.addEventListener("click", () => {
  closeQuoteForm();
 

});
// adding validation
submit.addEventListener(('click'), () => {
  event.preventDefault();

  const addquoteForm = document.getElementById("userNewQuote");
  const addedQuote = document.getElementById("added_quote").value.trim();
  const addedquoteauthor = document.getElementById("added_quote_author").value.trim();
  const errorBox = document.getElementById("errorBox");
  const errorBoxContent = document.getElementById("errorMessage");
 
  let valid = true;
  if (!addedQuote || !addedquoteauthor) {
    errorBox.classList.remove("hidden");
    errorBoxContent.textContent = "Both the Quote and the Author are required";
    valid = false;
  }

  let duplicateQuote = selectedQuotes.some(catagory => catagory.quote === addedQuote && catagory.author === addedquoteauthor);
  if (duplicateQuote) { errorBox.classList.remove("hidden"); errorBoxContent.textContent = "The Quote already existe"; valid = false; };

  if (selectedCatagory.id === "All") {
    errorBox.classList.remove("hidden");
    errorBoxContent.textContent = "Selecte Specfic Catagory";
    valid = false;
  }

  if (valid) {

    let useraddQuote = {
      id: quotelength +1,
      quote: addedQuote,
      author: addedquoteauthor
    }
    quotelength =quotelength +1;
    selectedQuotes.push(useraddQuote);
     updatedCatagory();

    document.getElementById("successBox").classList.remove("hidden");
    document.getElementById("successMessage").textContent = "Quote Successfully Added";

    setTimeout(() => {
      closeQuoteForm();
    }, 2000)
  }
});

deletQuotevar.addEventListener("click", () => {

  closeQuoteForm();
  setForDelet();

  document.getElementById("added_quote").value = selectedQuotes[selectedQuoteIndex].quote;
  document.getElementById("added_quote_author").value = selectedQuotes[selectedQuoteIndex].author;
  deletQuote();

})

function setForDelet() {
  document.getElementById("deletelabel").classList.remove("hidden");
  document.getElementById("submit").classList.add("hidden");
  deletYes.classList.remove("hidden");
  deletNo.classList.remove("hidden");
}

deletYes.addEventListener(('click'), () => {
  event.preventDefault();
 
  console.log(selectedQuoteIndex);

});
deletNo.addEventListener(('click'), () => {
  event.preventDefault();
  closeQuoteForm();
})
// delete 
function deletQuote() {
   
 
  selectedQuotes.splice(selectedQuoteIndex, 1);
  updatedCatagory();
  document.getElementById("successBox").classList.remove("hidden");
  document.getElementById("successMessage").textContent = "Quote Successfully Deleted";
  displayQuote();
  setTimeout(() => {
    closeQuoteForm();
  }, 2000)


}

function updatedCatagory() {
  let catagoryToUpdate = allQuoteObject.find(catagory => catagory.id === selectedCatagory.id);
  if (catagoryToUpdate) {
    catagoryToUpdate.quotes = selectedQuotes;
    const allQuoteString = JSON.stringify(allQuoteObject);
    localStorage.setItem("allQuote", allQuoteString);
    console.log("Updated allQuoteObject:", allQuoteObject);
  }
   catagoryToUpdate = allQuoteObject.find(catagory => catagory.id === 'favorite');
   if (catagoryToUpdate) {
    catagoryToUpdate.quotes =favoriteQuotes;
    const allQuoteString = JSON.stringify(allQuoteObject);
    localStorage.setItem("allQuote", allQuoteString);
  }

}

// to close when the close button clicked
document.getElementById("formClose").addEventListener(("click"), () => {
  closeQuoteForm();
})

// to close when clicked outside the form
const userAddeFormOut = document.getElementById("userNewQuote");
userAddeFormOut.addEventListener('click', (event) => {
  if (event.target === userAddeFormOut) {
    closeQuoteForm();
  }
});

function closeQuoteForm() {
  const addquoteForm = document.getElementById("userNewQuote");
  addquoteForm.classList.toggle('hidden');
  document.querySelector(".main").classList.toggle("hidden");

  document.getElementById("errorBox").classList.add("hidden");
  document.getElementById("errorMessage").textContent = "";

  document.getElementById("successBox").classList.add("hidden");
  document.getElementById("successMessage").textContent = "";

  document.getElementById("added_quote").value = "";
  document.getElementById("added_quote_author").value = " ";

  document.getElementById("deletelabel").classList.add("hidden");
  document.getElementById("submit").classList.remove("hidden");
  deletYes.classList.add("hidden");
  deletNo.classList.add("hidden");
};
//
function displayFavority() {
     favoriteQuoteList.innerHTML = ""
     favoriteQuotes.quotes.forEach(quot => {
      const li = document.createElement("li");
      li.textContent= quot;
      const removeBtn = document.createElement("button");
      removeBtn.textContent='remove';
      removeBtn.onclick =() => removeFavorite(quot);
      li.appendChild(removeBtn);
      favoriteQuoteList.appendChild(li);
     })
}

favoriteIcon.addEventListener(("click") ,()=> {
  let AddToFavorite = favoriteQuotes.find(AddToFavorite => AddToFavorite.id === selectedQuotes[selectedQuoteIndex].id && AddToFavorite.type === selectedCatagory.id )
  if(AddToFavorite){
    removeFavorite(AddToFavorite)
  }
  else {
    savetoFavorite()
  }

})

function savetoFavorite() {
 let favQuote =  selectedQuotes[selectedQuoteIndex];
 favQuote ={
        ...selectedQuotes[selectedQuoteIndex],
          type:selectedCatagory.id
       }
        favoriteQuotes.push(favQuote);
        console.log(favQuote)
        updatedCatagory()
        favoriteIcon.classList.add("text-red-600");
   
}

function removeFavorite(quote){
    favoriteQuotes = favoriteQuotes.filter(fav =>fav !== quote)
    console.log(favoriteQuotes)
    updatedCatagory()
      favoriteIcon.classList.remove("text-red-600")  
}

clearFavority.addEventListener(("click"), () => {
  favoriteQuotes =[];
  updatedCatagory()
  favoriteIcon.classList.remove("text-red-600")
})










