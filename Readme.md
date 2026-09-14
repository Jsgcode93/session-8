#  Movie App.
This app will allow the user to view and manipulate a list of movies.
The movie contain a title and a year.
# MovieList - Class
## Attributes
movieList - a list of movies
rootId - the root element where the list is to appear

## Methods
movieRow - generates one row of the movieList
genMovieList - generates all rows for the movie list for the to display
genMovieSearchList - generates a movieList based on a search term
removeElements - removes the movieList from the display
getRow - returns a single movie from the movie list, using the index
refresh - refreshes the display
add - Add a new movie to the list
update - Update a movie in the list
delete - Delete a movie in the list
sortA2Z - Sort the list in ascending order and display the movieList
sortZ2A - Sort the list in descending order and display the movieList
search - search the movieList based a search term against the title. The display the results.

# App.js
This file holds the implementation of the MovieList class, event listeners and an array of initial movies
V3 has added in some validation
It also contains JavaScript that creates some of the UI.
It also contains some feedback message to the client