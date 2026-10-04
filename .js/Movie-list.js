 /**
 * @file movie-list.js
 * @description This file holds the class definition of our MovieList class
 * cSpell: ignore Jeremy Geddes
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
  // Methods

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

  /**
   * Generate all rows in our movieList (Read)
   * This method will call movieRow for each element in our movieList.
   * This will create all movies for our UI to display
   * @function genMovieList
   */ 
  genMovieList(){
    // Loop through the movieList
    for(let i = 0; i < this.movieList.length; i++){
      let movie = this.movieList[i];
      console.log(movie);
      // call the movieRow method.
      this.movieRow(movie.title, movie.year);
    }
  }

  /**
   * @function genMovieSearchList
   * @description Generate a movie based on our search term
   * @param {Array} list - The list of movies to display based on the search term
   */
  genMovieSearchList(list){
    // Remove all elements
    this.removeElements();
    // Generate a new list
    for(let i = 0; i < list.length; i++){
      let movie = list[i];
      // Call the movieRow function
      this.movieRow(movie.title, movie.year);
    }
  }

   /**
    * Remove all list elements for the DOM
    * This allows a new list to be displayed
   * @function removeElements
   */
  removeElements() {
  const rootElement = document.getElementById(this.rootId);
  if (!rootElement) return;
  const childNodes = rootElement.getElementsByClassName('row');
  while (childNodes.length > 0) {
    rootElement.removeChild(childNodes[0]);
  }

   /**
    * A function that will return a row / movie from the movie list
   * @function getRow
   * @param {number} id - The index of the movie we wish to find.
   * @returns {object} - a movie object from the movieList based on the index.
   */
  getRow(id){
    console.log("getRow id: ", id);
    const row = this.movieList.find((movie, index) => index === id);
    console.log(row);
    return row;
  }
   /**
    * Call the removeElements() method and 
    * Call genMovieList() to add in the new list
   * @function refresh
   */
  refresh(){
    this.removeElements();
    this.genMovieList();
  }
  // CRUD - CREATE / READ / UPDATE / DELETE
  /**
   * Adding a new movie to the movieList - CREATE
   * @function add
   * @param {string} title - The movie title
   * @param {number} year - The year the movie was released
   */
  add(title, year ){
    // Add a new movie to the end of the list.
    this.movieList.push({ title: title, year: year });
    // Write use ES6 syntax 
    // this.movieList.push({title, year });
    this.refresh();
  }
  
  /**
   * Update a movie in the movieList
   * @function update
   * @param {number} index - The index of the movie to update
   * @param {string} title - The new movie title
   * @param {number} year - The new year for the movie
   */
  update(index, title, year){
    // update the title
    this.movieList[index].title = title;
    // update the year
    this.movieList[index].year = year;
    // Refresh
    this.refresh();
  }

  /**
   * Delete a movie from the movieList - DELETE
   * @function delete
   * @param {number} index - The index of the movie to delete
   */
  delete(index){
    // Remove one move form the movieList
    this.movieList.splice(index, 1);
    // refresh
    this.refresh();
  }

  /**
   * @function sortA2Z
   * @description sort the movieList from A to Z, in ascending order
   */
  sortA2Z(){
    this.movieList.sort(function(a, b){
      return a.title.localeCompare(b.title);
    });
    this.refresh();
  }

  /**
   * @function sortZ2A
   * @description sort the movieList from Z to A, in descending order
   */
  sortZ2A(){
    this.movieList.sort(function(a, b){
      return b.title.localeCompare(a.title);
    });
    this.refresh();
  }

   /**
   * @function search
   * @description Search the movieList titles for a partial match based on a search string. Will call the genMoveSearchList method when done to show the results in the UI.
   * @param {string} nameString - The partial title to search for.
   */
  search(nameString){
    // Create a new list to hold search results
    let shortList = [];
    // Loop through the titles to see if the nameString is in a movieTitle
    for (let movie of this.movieList){
      // Check to see if nameString is in movie.title
      if(movie.title.includes(nameString)){
        // add this movie to our shortList
        shortList.push(movie);
      }
    }
    // call the genMovieSearchList
    this.genMovieSearchList(shortList);
  }
}