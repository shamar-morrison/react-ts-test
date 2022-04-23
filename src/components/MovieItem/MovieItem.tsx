import styles from "./MovieItem.module.scss";
import { MovieResult } from "src/utils/types";
import { BASE_IMG_URL } from "src/utils/paths";
import defaultImage from "src/img/noImgFound.png";
import { useState } from "react";

interface Props {
  movie: MovieResult;
  highlightRow: () => void;
}

const MovieItem = ({ movie, highlightRow }: Props) => {
  const [movieTitle] = useState(
    movie.title || movie.original_title || "Unknown Movie Title"
  );

  const [releaseDate] = useState(
    new Date(movie.release_date).getFullYear() || "N/A"
  );

  const [rating] = useState(movie.vote_average.toFixed(1));

  function convertRating() {
    if (!rating || Number(rating) == 0) return "N/A";
    return rating;
  }

  function buildPosterPath() {
    return movie.poster_path
      ? `${BASE_IMG_URL}${movie.poster_path}`
      : defaultImage;
  }

  function makeSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  const slug = makeSlug(movieTitle);

  return (
    <div className={styles.container}>
      <a
        href={`https://www.themoviedb.org/movie/${movie.id}-${slug}`}
        target="_blank"
      >
        <div className={styles.movieImage}>
          <img src={buildPosterPath()} alt={movieTitle + " poster"} />
        </div>
      </a>
      <p className={styles.title}>{movieTitle}</p>
      <div className={styles.bottom}>
        <div className={styles.row}>
          <p>{releaseDate}</p> •
          <p className={styles.rating}>R: {convertRating()}</p>
        </div>
        <span className={styles.star} onClick={highlightRow} />
      </div>
    </div>
  );
};

export default MovieItem;
