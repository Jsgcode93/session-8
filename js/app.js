/**
 * @file app.js
 * @description This file contains JavaScript for our movie app.
 * It contains the movieList instance, the event functions and UI code.
 * cspell: ignore Jeremy Geddes colour tabcontent tablinks 
 * @author Jeremy Geddes
 * @version 2.1
 */

/**
 * @global
 * @description The initial list of movies for our app.
 */
let initialMovies = [
  {title: "The Redemption", year: 1994, rating: 9.3 },
  {title: "The Matrix" , year: 1999, rating: 8.7 },
  {title: "SAW 1 ", year: 2002, rating: 7.6 },
  {title: "Face Off", year: 1997, rating: 7.3 },
  {title: "The Terminator", year: 2000, rating: 8.1 },
  {title: "Drag me to hell", year: 2011, rating: 6.6 },
  {title: "Bad boys 2", year: 2008, rating: 6.8 },
  {title: "Get rich or die trying", year: 2005, rating: 5.4 }
];

/**
 * @memberof MovieList
 * @instance movieList
 * @param {string} rootId - The id of the element we want to have our movieList appear in
 * @param {Array} initialMovies - The array of movies in our movieList
 * @global
 * @description The movieList instance to keep track of our list of movies in the app
 */
let movieList = new MovieList('list', initialMovies);

// Getting all the buttons from our application
const searchBtn = document.getElementById('searchBtn');
const sortA2ZBtn = document.getElementById('sortA2ZBtn');
const sortZ2ABtn = document.getElementById('sortZ2ABtn');
const addSubmit = document.getElementById('addSubmit');
const updateSubmit = document.getElementById('updateSubmit');
const deleteSubmit = document.getElementById('deleteSubmit');

// Add event handlers (with safety checks)
if (searchBtn) searchBtn.addEventListener('click', searchClick);
if (sortA2ZBtn) sortA2ZBtn.addEventListener('click', a2zClick);
if (sortZ2ABtn) sortZ2ABtn.addEventListener('click', z2aClick);
if (addSubmit) addSubmit.addEventListener('click', addClick);
if (updateSubmit) updateSubmit.addEventListener('click', updateClick);
if (deleteSubmit) deleteSubmit.addEventListener('click', deleteClick);

/** 
 * Search for a movie by partial title
 * @event Click#searchBtn
 * @function searchClick
 */
function searchClick(){
  let formElements = document.getElementById("form-list-control").elements;
  let text = formElements["search-string"].value;
  movieList.search(text);
}

/**
 * Sort the movieList in ascending order
 * @event Click#a2zButton
 * @function a2zClick
 */
function a2zClick(){
  movieList.sortA2Z();
}

/**
 * Sort the movieList in descending order
 * @event Click#z2aButton
 * @function z2aClick
 */
function z2aClick(){
  movieList.sortZ2A();
}

/**
 * @event Click#addSubmit
 * @function addClick
 * @description add a new movie to the list
 */
function addClick() {
    let formElements = document.getElementById("form-add").elements;
    let title = formElements["title"].value;
    let year = Number(formElements["year"].value);
    let rating = Number(formElements["rating"].value);
    
    const pattern = /^[a-z0-9\s]*$/i;
    const test = pattern.test(title);
    const yearIsInt = Number.isInteger(year);
    const ratingIsValid = !isNaN(rating) && rating >= 0 && rating <= 10;

    if (test && yearIsInt && ratingIsValid) {
        movieList.add(title, year, rating); 

        formElements.title.value = "";
        formElements.year.value = "";
        formElements.rating.value = "";
        
        showMessage("Movie Added Successfully", "chartreuse", "black");
    } else if (!test) {
        showMessage("Invalid title, must be alphanumeric with spaces only", "red", "white");
    } else if (!yearIsInt) {
        showMessage("Invalid year, must be an integer", "red", "white");
    } else {
        showMessage("Invalid rating, must be between 0 and 10", "red", "white");
    }
}


/**
 * Get movie data from the movie list to update when typing an index in the index input in the update form
 * @function getData
 */
function getData(){
  console.log("getData");
  // Get form elements
  const idValue = document.getElementById('upIndex').value;
  const upIndex = Number(idValue);
  console.log(upIndex);
  const upperBound = movieList.movieList.length;
  console.log(upperBound);
  if(upIndex > 0  && upIndex <= upperBound ){
    const title = document.getElementById('upTitle');
    const year = document.getElementById('upYear');
    // search the movieList for the row
    const row = movieList.getRow(upIndex -1 );
    console.log(row);
    title.value = row.title;
    year.value = row.year;
  } else {
    showMessage("No such index exists", "DarkOrange", "white");
  }
}

const upIndex = document.getElementById('upIndex');
upIndex.addEventListener('change', getData);

/**
 * @event Click#updateSubmit
 * @function updateClick
 * @description Update a movie in the list
 */
function updateClick(){
    let index = Number(document.getElementById("upIndex").value) - 1;
    let title = document.getElementById("upTitle").value;
    let year = Number(document.getElementById("upYear").value);
    
    // Use the same validation as addClick
    const pattern = /^[a-z0-9\s]*$/i;
    const test = pattern.test(title);
    const yearIsInt = Number.isInteger(year);

    if (test && yearIsInt){
        movieList.update(index, title, year);
        document.getElementById("upIndex").value = "";
        document.getElementById("upTitle").value = "";
        document.getElementById("upYear").value = "";
        showMessage("Movie Updated Successfully", "chartreuse", "black");
    } else if(!test){
        showMessage("Invalid title, must be alphanumeric with spaces only", "red", "white");
    } else {
        showMessage("Invalid year, must be an integer", "red", "white");
    }  
}

/**
 * @event Click#deleteClick
 * @function deleteClick
 * @description Delete a movie from the movieList
 */
function deleteClick(){
  // get the element from the dom
  let indexElement = document.getElementById("delIndex");
  let index = Number(indexElement.value);
  index = index - 1;
  console.log(index);
  // instance.property.length
  const upperBound = movieList.movieList.length;
  console.log(upperBound);
  if ( index > 0 && index <= upperBound){
    // get the current movie
    const movie = movieList.getRow(index);
    // confirm the delete
    const confirm = window.confirm(`Do you want to delete movie "${movie.title}"?`);
    if(confirm){
      console.log("Deleting movie....", movie.title);
      // Delete movie from movieList
      movieList.delete(Number(index));
      showMessage("Movie Deleted", "chartreuse", "black");
    } else {
      console.log("Delete cancelled");
      showMessage("Delete cancelled", "DarkOrange", "white");
    }
  } else {
    showMessage("No such index exists", "DarkOrange", "white");
  }
}
// UI Javascript
/**
 * JavaScript function for opening the forms
 * @function openForm
 * @param {object} evt - the event object.
 * @param {string} action - The name of the action being used.
 */
function openForm(evt, action){
  // declare variables
  let i, tabContent, tabLinks;
  // Get All elements that have the classname of tabcontent
  tabContent = document.getElementsByClassName('tabcontent');
  for( i =0; i < tabContent.length; i++){
    // set the display to none for all elements with this class name
    tabContent[i].style.display = 'none';
  }
  // get all elements that have the classname of tablinks
  tabLinks = document.getElementsByClassName('tablinks');
  for(i = 0; i < tabLinks.length; i++){
    // change the classlist to remove the active class
    tabLinks[i].className = tabLinks[i].className.replace("active", "");
  }
  // Show the current tab and add the active class to the button that opened the tab
  document.getElementById(action).style.display = "block";
  evt.currentTarget.className += " active"
}
// End of openForm()

// Open a tab by default(
document.getElementById('defaultOpen').click();

/**
 * Get the current data and inject it into the footer
 */
const dateSpan = document.getElementById("date");
// get the date
const theDate = new Date();
// Add the date into the DOM
dateSpan.textContent = theDate.getFullYear();

/**
 * @function showMessage
 * @param {string} message - the message to display
 * @param {string} colour - the colour of the message box background
 * @param {string} text - the colour of the text in the message box
 */
function showMessage(message, colour, text){
  const msg = document.getElementById('msg');
  msg.style.display = "block";
  msg.textContent = message;
  msg.style.backgroundColor = colour;
  msg.style.color = text;
}

document.addEventListener("DOMContentLoaded", () => {
    const manager = new MovieManager();
    const listContainer = document.getElementById("list");

    function renderList() {
        listContainer.innerHTML = "";
        manager.movies.forEach(movie => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm";
            li.innerHTML = `
                <span><strong>ID ${movie.id}:</strong> ${movie.title} (${movie.year}) - Rating: ${movie.rating}</span>
            `;
            listContainer.appendChild(li);
        });
    }

    renderList();
});