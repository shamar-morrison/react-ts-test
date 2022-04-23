import styles from "./App.module.scss";
import MoviesWrapper from "./components/MoviesWrapper/MoviesWrapper";
import { useState } from "react";
import Filter from "src/components/Filter/Filter";

const App = () => {
  return (
    <div className={styles.container}>
      <h2>Top 500 TMDB Movies List</h2>
      <MoviesWrapper />
    </div>
  );
};

export default App;
