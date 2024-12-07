import { AbstractView } from "../../common/view.js";
import { Header } from "../../components/header/header.js";
import "./single.css";

export class SingleMovieView extends AbstractView {
  constructor(appState, params) {
    super();
    this.appState = appState;
    this.params = params;
    this.setTitle("Movie Details");
  }

  async fetchMovieDetails(id) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`
    );
    return res.json();
  }

  async render() {
    const movieData = await this.fetchMovieDetails(this.params.id);
    console.log("movieData", movieData);

    const main = document.createElement("div");
    main.classList.add("page_single");

    const movieTitle = document.createElement("h1");
    movieTitle.textContent = movieData.title;
    main.appendChild(movieTitle);

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    moviePoster.alt = `${movieData.title} Poster`;
    main.appendChild(moviePoster);

    const movieDescription = document.createElement("p");
    movieDescription.textContent = movieData.overview;
    main.appendChild(movieDescription);

    const movieBudget = document.createElement("p");
    movieBudget.textContent = `Budget: $${movieData.budget.toLocaleString()}`;
    main.appendChild(movieBudget);

    const movieReleaseDate = document.createElement("p");
    movieReleaseDate.textContent = `Release Date: ${movieData.release_date}`;
    main.appendChild(movieReleaseDate);

    const movieRuntime = document.createElement("p");
    movieRuntime.textContent = `Runtime: ${movieData.runtime} minutes`;
    main.appendChild(movieRuntime);

    const movieGenres = document.createElement("p");
    const genres = movieData.genres.map((genre) => genre.name).join(", ");
    movieGenres.textContent = `Genres: ${genres}`;
    main.appendChild(movieGenres);

    const movieVoteAverage = document.createElement("p");
    movieVoteAverage.textContent = `Vote Average: ${movieData.vote_average}`;
    main.appendChild(movieVoteAverage);

    const movieVoteCount = document.createElement("p");
    movieVoteCount.textContent = `Vote Count: ${movieData.vote_count}`;
    main.appendChild(movieVoteCount);

    this.app.innerHTML = "";
    this.app.append(main);

    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
