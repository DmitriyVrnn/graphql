import { gql } from 'apollo-boost';

/*
*  genre
      rate
      director
      watched
* */

export const addMovieMutation = gql`
  mutation addMovie($name: String!, $genre: String!, $watched: Boolean!, $rate: Int, $directorId: ID) {
    addMovie(name: $name, genre: $genre, watched: $watched, rate: $rate, directorId: $directorId) {
      name
    }
  }
`;