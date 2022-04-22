import styles from "./MovieItem.module.scss";
import { MovieResult } from "src/types";
import { BASE_IMG_URL } from "./../../paths";
import defaultImage from "src/img/noImgFound.png";
import { useState } from "react";

interface Props {
  movie: MovieResult;
}

const MovieItem = ({ movie }: Props) => {
  const [movieTitle] = useState(
    movie.title || movie.original_title || "Unknown Movie Title"
  );

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
    <a
      href={`https://www.themoviedb.org/movie/${movie.id}-${slug}`}
      target="_blank"
    >
      <div className={styles.container}>
        <div className={styles.movieImage}>
          <img src={buildPosterPath()} alt={movieTitle + " poster"} />
        </div>
        <p className={styles.title}>{movieTitle}</p>
      </div>
    </a>
  );
};

export default MovieItem;
