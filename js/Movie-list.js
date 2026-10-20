/**
 * @file Movie-list.js
 * @description Movie and MovieList classes with localStorage and Rating support.
 * @author Jeremy Geddes
 */

class Movie {
    constructor(id, title, year, rating) {
        this.id = id;
        this.title = title;
        this.year = Number(year);
        this.rating = Number(rating);
    }
}

class MovieList {
    constructor(rootId, defaultMovies = []) {
        this.rootId = rootId;
        this.movieList = this.loadFromStorage(defaultMovies);
        this.refresh();
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
   // Save current list to localStorage
    saveToStorage(data) {
        localStorage.setItem('movieDatabase', JSON.stringify(data));
    }

    // Render the movie list into the DOM
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return; // Safely exit if container isn't on this page

        container.innerHTML = "";
        this.movieList.forEach((movie, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm";
            li.innerHTML = `
                <span><strong>#${index + 1} (ID ${movie.id}):</strong> ${movie.title} (${movie.year})</span>
            `;
            container.appendChild(li);
        });
    }
        // Add a movie
    add(title, year) {
        const newId = this.movieList.length > 0 ? Math.max(...this.movieList.map(m => m.id)) + 1 : 1;
        const newMovie = new Movie(newId, title, year);
        this.movieList.push(newMovie);
        this.saveToStorage(this.movieList);
        this.render();
    }

    // Update a movie by index
    update(index, title, year) {
        if (this.movieList[index]) {
            this.movieList[index].title = title;
            this.movieList[index].year = year;
            this.saveToStorage(this.movieList);
            this.render();
        }
    }

    // Delete a movie by index
    delete(index) {
        if (index >= 0 && index < this.movieList.length) {
            this.movieList.splice(index, 1);
            this.saveToStorage(this.movieList);
            this.render();
        }
    }

    // Get a specific row
    getRow(index) {
        return this.movieList[index];
    }

    // Search movies by title keyword
    search(keyword) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const filtered = this.movieList.filter(m => m.title.toLowerCase().includes(keyword.toLowerCase()));
        container.innerHTML = "";
        filtered.forEach((movie, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm";
            li.innerHTML = `<span><strong>Match:</strong> ${movie.title} (${movie.year})</span>`;
            container.appendChild(li);
        });
    }

    // Sort A to Z
    sortA2Z() {
        this.movieList.sort((a, b) => a.title.localeCompare(b.title));
        this.saveToStorage(this.movieList);
        this.render();
    }

    // Sort Z to A
    sortZ2A() {
        this.movieList.sort((a, b) => b.title.localeCompare(a.title));
        this.saveToStorage(this.movieList);
        this.render();
    }
