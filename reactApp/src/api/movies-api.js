export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=cbe31c0225ce24932ce80c1203b143c6&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };