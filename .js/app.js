/**
 * @file app.js
 * @description This file contains JavaScript for our movie app.
 * It contains the movieList instance, the event functions and UI code.
 * cspell: ignore Jeremy Geddes tabcontent tablinks colour
 * @author Jeremy Geddes
 * @version 2.0
 
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