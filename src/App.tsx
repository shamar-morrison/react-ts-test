import styles from "./App.module.scss";
import MoviesWrapper from "./components/MoviesWrapper/MoviesWrapper";

const App = () => {
  return (
    <div className={styles.container}>
      <h2>Top 500 TMDB Movies List</h2>
      <MoviesWrapper />
    </div>
  );
};

export default App;
