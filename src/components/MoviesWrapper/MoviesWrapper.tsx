import styles from "./MoviesWrapper.module.scss";
import MovieItem from "src/components/MovieItem/MovieItem";
import { useEffect, useState } from "react";
import { MovieResult, Result } from "src/utils/types";
import Filter from "src/components/Filter/Filter";

const MAX_NUM_OF_PAGES = 500;
const LOCAL_STORAGE_KEY = "BGColor";

export type FilterType = "popularity.desc" | "popularity.asc";

const MoviesWrapper = () => {
  const [curPage, setCurPage] = useState(1);
  const [filterType, setFilterType] = useState<FilterType>("popularity.desc");
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [BGColor, setBGColor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingMovies, setFetchingMovies] = useState(true);

  async function getMovieList(): Promise<Result> {
    setIsLoading(true);
    setFetchingMovies(true);
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&sort_by=${filterType}&page=${curPage}`
      );

      if (data.status !== 200) throw Error("Error fetching movies");

      return data.json();
    } catch (error: any) {
      console.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
      setFetchingMovies(false);
    }
  }

  function loadMore(): void {
    setCurPage((prev) => prev + 1);
  }

  function setFilter(type: FilterType): void {
    setFilterType(type);
  }

  function LoadMoreBtn(): JSX.Element {
    if (curPage <= MAX_NUM_OF_PAGES && movies.length) {
      return (
        <div className={styles.flexCenter} onClick={loadMore}>
          <button className={styles.loadMore} disabled={isLoading}>
            {isLoading ? "LOADING..." : "LOAD MORE"}
          </button>
        </div>
      );
    }

    return <></>;
  }

  function highlightRow(): void {
    const BGColor = { backgroundColor: "#3a1616" };

    setBGColor((state) => {
      if (Object.keys(state).includes("backgroundColor")) {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({}));
        } catch (error: any) {
          console.error(error.message);
        }
        return {};
      } else {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(BGColor));
        } catch (error: any) {
          console.error(error.message);
        }
        return BGColor;
      }
    });
  }

  function fetchFromLocalStorage(): void {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!value) return;
    setBGColor(JSON.parse(value));
  }

  function applySearchFilters(): void {
    setMovies([]);
    setFetchingMovies(true);
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&sort_by=${filterType}&page=1`
    )
      .then((data) => {
        try {
          if (data.status !== 200) throw Error("Error applying filters");
          return data.json();
        } catch (error: any) {
          console.error(error.message);
        }
      })
      .then((res: Result) => setMovies([...res.results]))
      .catch((er) => console.error(er.message))
      .finally(() => {
        setIsLoading(false);
        setFetchingMovies(false);
      });
  }

  useEffect(() => fetchFromLocalStorage(), []);

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
      <div className={styles.container} style={BGColor}>
        <Filter setFilter={setFilter} applyFilters={applySearchFilters} />
        <div className={styles.flexRow}>
          {fetchingMovies && (
            <p className={styles.fetchingMovies}>Fetching Movies...</p>
          )}
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              highlightRow={highlightRow}
            />
          ))}
        </div>
      </div>
      <LoadMoreBtn />
    </>
  );
};;

export default MoviesWrapper;
