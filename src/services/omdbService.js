const OMDB_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const searchMovies = async (searchTerm) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`
    );
    const data = await response.json();
    if (response.ok) {
      return data.Search;
    } else {
      throw new Error("Failed to fetch movies");
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

const getMoviePoster = (imdbID) => {
  return `http://img.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`;
};

export { searchMovies, getMoviePoster };
