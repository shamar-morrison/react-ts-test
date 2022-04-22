import styles from "./MoviesWrapper.module.scss";
import MovieItem from "src/components/MovieItem/MovieItem";
import { useEffect, useState } from "react";
import { MovieResult, Result } from "src/types";

const MoviesWrapper = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieResult[]>([]);

  async function getMovieList() {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=${page}`
      );

      if (data.status !== 200) throw Error("Error fetching movies");
      const res: Result = await data.json();

      setMovies((prev) => [...prev, ...res.results]);
      console.log(res.results);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getMovieList();
  }, [page]);

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesWrapper;
