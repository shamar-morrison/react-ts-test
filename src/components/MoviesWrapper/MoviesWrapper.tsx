import styles from "./MoviesWrapper.module.scss";
import MovieItem from "src/components/MovieItem/MovieItem";
import { useEffect, useState } from "react";
import { MovieResult, Result } from "src/types";

const MAX_NUM_OF_PAGES = 500;

const MoviesWrapper = () => {
  const [curPage, setCurPage] = useState(1);
  const [movies, setMovies] = useState<MovieResult[]>([]);

  async function getMovieList(): Promise<Result> {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=${curPage}`
      );

      if (data.status !== 200) throw Error("Error fetching movies");

      return data.json();
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }

  function loadMore() {
    setCurPage((prev) => prev + 1);
  }

  function LoadMoreBtn() {
    if (curPage <= MAX_NUM_OF_PAGES) {
      return (
        <div className={styles.flexCenter} onClick={loadMore}>
          <button className={styles.loadMore}>LOAD MORE</button>
        </div>
      );
    } else return <></>;
  }

  useEffect(() => {
    let isMounted = true;

    getMovieList()
      .then((res: Result) => {
        isMounted && setMovies((prev) => [...prev, ...res.results]);
      })
      .catch((er) => console.error(er));

    return () => {
      isMounted = false;
    };
  }, [curPage]);

  return (
    <>
      <div className={styles.container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
      <LoadMoreBtn />
    </>
  );
};

export default MoviesWrapper;
