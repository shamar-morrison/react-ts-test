import styles from "./Filter.module.scss";

const Filter = () => {
  return (
    <div className={styles.container}>
      <p>Filter By:</p>
      <select name="sort" id="sort">
        <option value="popularity.desc">Most Popular</option>
        <option value="popularity.asc">Least Popular</option>
      </select>
      <button className={styles.filterBtn}>Apply</button>
    </div>
  );
};

export default Filter;
