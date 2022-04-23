import { FilterType } from "src/components/MoviesWrapper/MoviesWrapper";
import styles from "./Filter.module.scss";

interface Props {
  setFilter: (type: FilterType) => void;
  applyFilters: () => void;
}

const Filter = ({ setFilter, applyFilters }: Props) => {
  return (
    <div className={styles.container}>
      <p>Filter By:</p>
      <select
        name="sort"
        id="sort"
        onChange={(e) => {
          setFilter(e.currentTarget.value as FilterType);
        }}
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="popularity.asc">Least Popular</option>
      </select>
      <button className={styles.filterBtn} onClick={applyFilters}>
        Apply
      </button>
    </div>
  );
};

export default Filter;
