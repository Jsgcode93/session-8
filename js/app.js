/**
 * @file app.js
 * @description Main application controller linking HTML elements to MovieList and Movie classes.
 */

let movieList;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial fallback data if localStorage is empty
    const defaultMovies = [
        { title: "The Shawshank Redemption", year: 1994, rating: 9.3, description: "Two imprisoned men bond over years.", movieImage: "" },
        { title: "The Matrix", year: 1999, rating: 8.7, description: "A hacker learns the truth about reality.", movieImage: "" },
        { title: "Inception", year: 2010, rating: 8.8, description: "A thief who steals corporate secrets through dream-sharing.", movieImage: "" }
    ];

    // 2. Initialize the MovieList instance targeting <ol id="list">
    movieList = new MovieList('list', defaultMovies);

    // 3. Attach event listeners to buttons
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", searchClick);
    }

    const sortA2ZBtn = document.getElementById("sortA2ZBtn");
    if (sortA2ZBtn) {
        sortA2ZBtn.addEventListener("click", () => movieList.sortA2Z());
    }

    const sortZ2ABtn = document.getElementById("sortZ2ABtn");
    if (sortZ2ABtn) {
        sortZ2ABtn.addEventListener("click", () => movieList.sortZ2A());
    }
});

// 2. Initialize the MovieList 
    movieList = new MovieList('list', defaultMovies);

    // 3. Event Listeners
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) searchBtn.addEventListener("click", searchClick);

    // Sort Dropdown Event Listener
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", function() {
            switch (this.value) {
                case 'a2z': movieList.sortA2Z(); break;
                case 'z2a': movieList.sortZ2A(); break;
                case 'yearNew': movieList.sortByYear(false); break; // false = descending (newest first)
                case 'yearOld': movieList.sortByYear(true); break;  // true = ascending (oldest first)
                case 'ratingHigh': movieList.sortByRating(false); break; // false = descending (highest first)
                case 'ratingLow': movieList.sortByRating(true); break;  // true = ascending (lowest first)
                default: break;
            }
        });
    }
/** 
 * Search for a movie by partial title
 * @event Click#searchBtn
 * @function searchClick
 */

function searchClick(){
    // FIXED: Directly target the input by ID to avoid form collection bugs
    let text = document.getElementById("search-string").value;
    // run the search method
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
function addClick(){
    // Get form from the DOM
    let formElements = document.getElementById("form-add").elements;
    // get the title and the year
    let title = formElements["title"].value;
    let year = Number(formElements["year"].value);
    
    const pattern = /^[a-z0-9\s]*$/i;
    const test = pattern.test(title);
    const yearIsInt = Number.isInteger(year);

    if (test && yearIsInt){
        movieList.add(title, Number(year));
        formElements.title.value = "";
        formElements.year.value = "";
        showMessage("Movie Added Successfully", "chartreuse", "black");
    } else if(!test){
        showMessage("Invalid title, must be alphanumeric with spaces only", "red", "white");
    } else {
        showMessage("Invalid year, must be an integer", "red", "white");
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

// Expand this application
// Finish validation for updating
// use a class for each Movie
// Add in more properties for the movie
// id, rating, description, movieImage (movie poster).
// Upgrade the UI
// Make it multiple pages 
// Search by ID or year or rating
// Sort by year or rating
// Timeout or cancel for showMessage
