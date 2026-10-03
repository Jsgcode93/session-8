 /**
 * @file movie-list.js
 * @description This file holds the class definition of our MovieList class
 * cSpell: ignoreJeremy geddes
 * @author Jeremy Geddes
 * @version 2.0.0
 */

/**
 * MovieList Class
 * This class has 2 properties and multiple methods
 * Look at the Readme.md file for a full list of methods
 * @class MovieList
 * @property {string} rootId - This is the id of the HTML element where the list is to be displayed
 * @property {Array} movieList - The array of movies to be displayed (and stored)
 * @property {function} refresh - The method to remove all current movies from the HTML document and display the current movieList.
 */

class MovieList{
  constructor(rootId, movies){
    this.rootId = rootId; // The HTML id where the list is going
    this.movieList = movies  // The array of movies to be displayed
    this.refresh();
  }
  
    /**
   * Generate one row of the movieList for display
   * It will create the necessary HTML elements fro displaying a single movie to the UI
   * @function movieRow
   * @param {string} title - The title of the movie
   * @param {number} year - The year the movie was released
   */
  movieRow(title, year){
    // Get the parent element
    const rootElement = document.getElementById(this.rootId);
    // Create a new li
    const row = document.createElement('li');
    // Add the class of row to the li we just created
    row.classList.add('row');
    row.textContent = `${title} (${year})`;
    // Add the li to the list
    rootElement.appendChild(row);
  }

  