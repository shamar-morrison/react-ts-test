import { useState } from "react";

import { FilterType } from "src/components/MoviesWrapper/MoviesWrapper";
import styles from "./Filter.module.scss";

interface Props {
  setFilter: (type: FilterType) => void;
  applyFilters: () => void;
}

const Filter = ({ setFilter, applyFilters }: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div className={styles.container}>
      <p>Filter By:</p>
      <select
        name="sort"
        id="sort"
        onChange={(e) => {
          setFilter(e.currentTarget.value as FilterType);
          setIsDisabled(false);
        }}
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="popularity.asc">Least Popular</option>
      </select>{" "}
      <button
        className={styles.filterBtn}
        onClick={() => {
          window.scrollTo(0, 0);
          applyFilters();
          setIsDisabled(true);
        }}
        disabled={isDisabled}
      >
        Apply
      </button>
    </div>
  );
};

export default Filter;
