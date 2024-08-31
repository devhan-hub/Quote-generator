
const blockquote = document.getElementById('quotee');
const authorofQuote = document.getElementById('autho');
const newButton = document.getElementById("new");
const caticon = document.querySelector(".catagory");
const quoteCatagory = document.getElementById("quoteSelected");
const labels = document.querySelectorAll("#quoteSelected label");
const quoteBox = document.querySelector(".qote-box");
const addQuote = document.getElementById("add");
let deletQuotevar = document.getElementById("delet");
let deletYes = document.getElementById("Yes");
let deletNo = document.getElementById("No");
let favoriteQuoteList = document.getElementById("favoriteman");
const favoriteIcon = document.querySelector(".fav");
const clearFavority = document.querySelector(".clearFavority");
const submit = document.getElementById("submit");
const display = document.getElementById("display");
const ok = document.getElementById("Ok");

// retriving from local storage

let allQuoteObject = JSON.parse(localStorage.getItem("allQuote"));
let favoriteQuotes =allQuoteObject.find(catagory => catagory.id === "favorite");
favoriteQuotes = favoriteQuotes.quotes ;
let selectedQuotes = [];
let selectedCatagory = {};
let selectedQuoteIndex;
let quotelength;

const initialSelectedRadio = document.querySelector('input[name="catagory"]:checked');
applySelectedStyle(initialSelectedRadio);
//  for label 
function resetLabels() {
  labels.forEach(label => {
    label.classList.remove('bg-[#ff6f61]', 'text-white','md:text-[#ed9d09]');
    label.classList.add('text-black', 'bg-white' , 'md:text-white');
  });
}
function applySelectedStyle(selectedRadio) {
  const selectedLabel = document.querySelector(`label[for="${selectedRadio.id}"]`);
  selectedLabel.classList.add('bg-[#ff6f61]', 'text-white' ,'md:text-[#ed9d09]');
  selectedLabel.classList.remove('text-black', 'bg-white', 'md:text-white');
};

const defaultCategory = "success";
selectedCatagory = allQuoteObject.find(catagory => catagory.id === defaultCategory);
selectedQuotes = selectedCatagory.quotes;
quotelength= selectedQuotes.length;
displayQuote();
console.log(allQuoteObject)

// related to display function
caticon.addEventListener(("click"),() => {
   quoteCatagory.classList.toggle("right-[-100%]");
})

display.addEventListener(("click"),()=>{
  document.getElementById("displayallFavorite").classList.toggle("hidden");
  display.classList.toggle("text-[#ff6f61]")
  
})

// getting selected quote
quoteCatagory.addEventListener('change', (event) => {
  const selectedCatagoryID = event.target.value;
  const selectedRadio = event.target;
  resetLabels();
  applySelectedStyle(selectedRadio);

  setTimeout(() =>{
    quoteCatagory.classList.toggle("right-[-100%]");
  },500)

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
      favoriteIcon.classList.add('text-white' , 'bg-red-600')
     }
     else {
      favoriteIcon.classList.remove('text-white' , 'bg-red-600')

     }
     displayFavority()
     const bloch = document.querySelector(".blockc");
     bloch.classList.remove("animate-block");

     void bloch.offsetWidth;
     bloch.classList.add("animate-block");
}
  displayQuote();
newButton.addEventListener('click', displayQuote);

// add user Quote
addQuote.addEventListener("click", () => {
  closeQuoteForm();
     setforAddDelet(1);

 
});
// adding validation
submit.addEventListener(('click'), () => {
  event.preventDefault();
  const addedQuote = document.getElementById("added_quote").value.trim();
  const addedquoteauthor = document.getElementById("added_quote_author").value.trim();

 
  let valid = true;
  if (!addedQuote || !addedquoteauthor) {
    valid = false;
    succError(0 ,"Both the Quote and the Author are required")
  }

  let duplicateQuote = selectedQuotes.some(catagory => catagory.quote === addedQuote && catagory.author === addedquoteauthor);
  if (duplicateQuote) {
       valid = false; 
        succError(0 ,"The Quote already existe")
   };

  if (selectedCatagory.id === "All") {
    succError(0 ,"Selecte Specfic Catagory")
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
   succError(1, "Quote Successfully Deleted")
   submit.classList.add("hidden");
   ok.classList.remove("hidden");
  }
});

ok.addEventListener(("click"),() => {
  closeQuoteForm();
})
deletQuotevar.addEventListener("click", () => {
  closeQuoteForm();
  setforAddDelet(2)
  document.querySelector(".added-one").textContent = selectedQuotes[selectedQuoteIndex].quote;
  document.querySelector(".added-two").textContent = selectedQuotes[selectedQuoteIndex].author;

})


deletYes.addEventListener(('click'), () => {
  event.preventDefault();
   deletQuote();

});
deletNo.addEventListener(('click'), () => {
  event.preventDefault();
  closeQuoteForm();
})
// delete 
function deletQuote() {
  selectedQuotes.splice(selectedQuoteIndex, 1);
  updatedCatagory();
  succError(1,"Quote Successfully Deleted")
  displayQuote();
  document.getElementById("Yes").classList.add("hidden") ;   
  document.getElementById("No").classList.add("hidden") ;
  ok.classList.remove("hidden"); 
  document.getElementById("deletelabel") .classList.add("hidden");
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
  ok.classList.add("hidden");
  
 
 
};
//
 function succError (num , str) {
      if(num === 1) {
        document.getElementById("successBox").classList.remove("hidden");
        document.getElementById("successMessage").textContent = str;
        document.getElementById("errorBox").classList.add("hidden");
        document.getElementById("errorMessage").textContent = "";
      }

      else {
        document.getElementById("successBox").classList.add("hidden");
        document.getElementById("successMessage").textContent = "";
        document.getElementById("errorBox").classList.remove("hidden");
        document.getElementById("errorMessage").textContent = str;
      }
 }

function setforAddDelet(num) {
     if(num === 1) {

      if(document.querySelector(".input-one").classList.contains("hidden")){
        document.querySelector(".input-one").classList.remove("hidden");
        document.querySelector(".input-two").classList.remove("hidden");
        document.querySelector(".added-one").classList.add("hidden") ;  
        document.querySelector(".added-two").classList.add("hidden") ; 
      }
        
          document.getElementById("deletelabel").classList.add("hidden") ; 
          document.getElementById("Yes").classList.add("hidden") ;   
          document.getElementById("No").classList.add("hidden") ;
           document.getElementById("submit").classList.remove("hidden");
           
     }

     if(num ===2) {
      if(!document.querySelector(".input-one").classList.contains("hidden")){
        document.querySelector(".input-one").classList.add("hidden");
        document.querySelector(".input-two").classList.add("hidden");
        document.querySelector(".added-one").classList.remove("hidden") ;  
        document.querySelector(".added-two").classList.remove("hidden") ; 
      }  
        document.getElementById("submit").classList.add("hidden");
       
          document.getElementById("deletelabel").classList.remove("hidden") ; 
          document.getElementById("Yes").classList.remove("hidden") ;   
          document.getElementById("No").classList.remove("hidden") ; 
        
   }
}
function displayFavority() {
     favoriteQuoteList.innerHTML = '',
     favoriteQuotes.forEach(quot => {
      let li = document.createElement("li");
      li.textContent = `${quot.quote}, \"${quot.type}\"`;

     li.className = 'gap-5 flex px-2 py-4 shadow-3xl bg-slate-500 text-white text-lg font-quote';
      const removeBtn = document.createElement("button");
      removeBtn.className ='self-center rounded-2xl duration-300 hover:bg-red-700 ease-in-out px-3 py-2 bg-red-500 h-max w-max text-sm';
      removeBtn.textContent='Remove';
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
        favoriteIcon.classList.add( 'text-white','bg-red-600');  
        displayFavority()
   
}

function removeFavorite(quote){
    favoriteQuotes = favoriteQuotes.filter(fav =>fav !== quote)
    console.log(favoriteQuotes)
    updatedCatagory()

    favoriteIcon.classList.remove( 'text-white','bg-red-600');  
      displayFavority()
}

clearFavority.addEventListener(("click"), () => {
  favoriteQuotes =[];
  updatedCatagory();
  displayFavority();
  favoriteIcon.classList.remove( 'text-white','bg-red-600'); 
})










