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
  // 