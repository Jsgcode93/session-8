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

loadFromStorage(defaultMovies) {
        const stored = localStorage.getItem('movieDatabase');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Re-map plain JSON objects back into true Movie class instances
            return parsed.map(m => new Movie(m.id, m.title, m.year, m.rating));
        }
        // Convert raw default objects into Movie instances with IDs and ratings
        const initial = defaultMovies.map((m, index) => new Movie(index + 1, m.title, m.year, m.rating || 5.0));
        this.saveToStorage(initial);
        return initial;
    }

    saveToStorage() {
        localStorage.setItem('movieDatabase', JSON.stringify(this.movieList));
    }

movieRow(movie, index) {
        const rootElement = document.getElementById(this.rootId);
        if (!rootElement) return;
        
        const row = document.createElement('li');
        row.classList.add('row', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'shadow-sm');
        
        // Simple, clean text display for title, year, and rating
        row.innerHTML = `
            <span><strong>#${index + 1}:</strong> ${movie.title} (${movie.year}) - Rating: ${movie.rating}</span>
        `;
        
        rootElement.appendChild(row);
    }

    genMovieList() {
        for (let i = 0; i < this.movieList.length; i++) {
            this.movieRow(this.movieList[i], i);
        }
    }

    removeElements() {
        const rootElement = document.getElementById(this.rootId);
        if (!rootElement) return;
        const childNodes = rootElement.getElementsByClassName('row');
        while (childNodes.length > 0) {
            rootElement.removeChild(childNodes[0]);
        }
    }

    refresh() {
        this.removeElements();
        this.genMovieList();
    }

    add(title, year, rating) {
        const newId = this.movieList.length > 0 ? Math.max(...this.movieList.map(m => m.id)) + 1 : 1;
        const newMovie = new Movie(newId, title, year, rating);
        this.movieList.push(newMovie);
        this.saveToStorage();
        this.refresh();
    }

    update(index, title, year, rating) {
        if (this.movieList[index]) {
            this.movieList[index].title = title;
            this.movieList[index].year = Number(year);
            this.movieList[index].rating = Number(rating);
            this.saveToStorage();
            this.refresh();
        }
    }

    delete(index) {
        this.movieList.splice(index, 1);
        this.saveToStorage();
        this.refresh();
    }

    getRow(index) {
        return this.movieList[index];
    }

    sortA2Z() {
        this.movieList.sort((a, b) => a.title.localeCompare(b.title));
        this.saveToStorage();
        this.refresh();
    }

    sortZ2A() {
        this.movieList.sort((a, b) => b.title.localeCompare(a.title));
        this.saveToStorage();
        this.refresh();
    }

    search(nameString) {
        let shortList = this.movieList.filter(movie => movie.title.toLowerCase().includes(nameString.toLowerCase()));
        this.removeElements();
        shortList.forEach((movie, index) => this.movieRow(movie, index));
    }
}