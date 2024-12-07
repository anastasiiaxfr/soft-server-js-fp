import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  #addToFavorites() {
    if (!this.appState.favorites.find((movie) => movie.id === this.cardState.id)) {
      this.appState.favorites.push(this.cardState);
    }
  }

  #deleteFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter((movie) => movie.id !== this.cardState.id);
  }

  #navigateToSingleMoviePage() {
    // This will change the hash in the URL to route to the single movie page
    location.hash = `#movie/${this.cardState.id}`;
  }

  render() {
    this.el.classList.add("card");

    const posterUrl = this.cardState.poster_path
      ? `https://image.tmdb.org/t/p/w500${this.cardState.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

    const isFavorite = this.appState.favorites.find((b) => b.id == this.cardState.id);

    this.el.innerHTML = `
      <div class="card__img">
        <img src="${posterUrl}" alt="${this.cardState.title} Poster" class="card__img--poster" />
        <button class="card__btn ${isFavorite ? "active" : ""}">
            <svg class="icon" width="24" height="24">
                <use xlink:href="#favorite"></use>
            </svg>
        </button>
      </div>
      <div class="card__info">
        <div class="card__tag">${this.cardState.genre_ids ? this.getGenres(this.cardState.genre_ids) : "N/D"}</div>
        <div class="card__name">${this.cardState.title}</div>
        <div class="card__release-date">${this.cardState.release_date || "N/D"}</div>
      </div>
    `;

    this.el.querySelector(".card__img").addEventListener("click", this.#navigateToSingleMoviePage.bind(this));
    this.el.querySelector(".card__info").addEventListener("click", this.#navigateToSingleMoviePage.bind(this));

    if (isFavorite) {
      this.el.querySelector("button").addEventListener("click", this.#deleteFromFavorites.bind(this));
    } else {
      this.el.querySelector("button").addEventListener("click", this.#addToFavorites.bind(this));
    }

    return this.el;
  }

  getGenres(genreIds) {
    const genres = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    return genreIds.map((id) => genres[id] || "Unknown").join(", ");
  }
}
