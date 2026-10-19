 /**
 * @file movie-list.js
 * @description This file holds the class definition of our MovieList class
 * cSpell: ignore Jeremy Geddes
 * @author Jeremy Geddes
 * @version 3.0.0
 */


  class Movie {
    constructor(id, title, year) {
        this.id = id;
        this.title = title;
        this.year = year;
    }
}
class MovieList {
    /**
     * @param {string} containerId - The ID of the HTML element where the list renders
     * @param {Array} defaultMovies - Fallback data if storage is empty
     */
    constructor(containerId, defaultMovies = []) {
        this.containerId = containerId;
        this.movieList = this.loadFromStorage(defaultMovies);
        this.render();
    }


// --- Storage Methods ---
    loadFromStorage(defaultMovies) {
        const stored = localStorage.getItem('movieDatabase');
        if (stored) {
            return JSON.parse(stored);
        }
        localStorage.setItem('movieDatabase', JSON.stringify(defaultMovies));
        return defaultMovies;
    }
    saveToStorage() {
        localStorage.setItem('movieDatabase', JSON.stringify(this.movieList));
    }
  }