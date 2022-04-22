import styles from "./MoviesWrapper.module.scss";
import MovieItem from "./../MovieItem/MovieItem";

const MoviesWrapper = () => {
  return (
    <div className={styles.container}>
      <MovieItem />
    </div>
  );
};

export default MoviesWrapper;
