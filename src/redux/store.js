import { configureStore } from '@reduxjs/toolkit'
import { favoriteMoviesReducer } from './favoriteMovies';
import { moviesReducer, specificMovieReducer } from './movies';
import { userReducer } from './user';
import { usersReducer } from './users';

const store = configureStore({
  reducer: { //esto representa a la store de estados
    movies: moviesReducer,
    selectedMovie: specificMovieReducer,
    user: userReducer,
    users: usersReducer,
    favoriteMovies: favoriteMoviesReducer,
  },
});

export default store