import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
    totalPages: 0,
    loading: false,
    searchQuery: "",
    page: 1,
    itemsPerPage: 8,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Movies searching");

    this.loadRandomMovies();
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    console.log(path);
    if (path === "favorites") {
      this.render();
    }
  }

  async loadList(q, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US&page=${page}&query=${q}`
    );
    return res.json();
  }

  getRandomQuery() {
    const randomQueries = ["action", "comedy", "drama", "romance", "horror", "adventure"];
    return randomQueries[Math.floor(Math.random() * randomQueries.length)];
  }

  async loadRandomMovies() {
    const randomQuery = this.getRandomQuery();
    this.state.searchQuery = "";
    this.state.page = 1;
    await this.fetchMovies(randomQuery);
  }

  async fetchMovies(query) {
    this.state.loading = true;
    const data = await this.loadList(query, this.state.page);
    this.state.loading = false;

    this.state.numFound = data.total_results;
    this.state.totalPages = data.total_pages;
    this.state.list = data.results;
  }

  async stateHook(path) {
    if (path === "searchQuery" || path === "page") {
      if (!this.state.searchQuery) {
        await this.loadRandomMovies();
      } else {
        await this.fetchMovies(this.state.searchQuery);
      }
    }

    if (path === "list" || path === "loading") {
      this.render();
    }
  }

  render() {
    const main = document.createElement("div");

    const searchComponent = new Search(this.state).render();
    main.append(searchComponent);

    if (this.state.searchQuery) {
      const movieCount = document.createElement("h1");
      movieCount.textContent = `Movies found: ${this.state.numFound}`;
      main.append(movieCount);

      const paginationBefore = this.createPagination();
      main.append(paginationBefore);
    }

    const cardList = new CardList(this.appState, this.state).render();
    main.append(cardList);

    if (this.state.searchQuery) {
      const paginationAfter = this.createPagination();
      main.append(paginationAfter);
    }

    this.app.innerHTML = "";
    this.app.append(main);

    this.renderHeader();
  }

  createPagination() {
    const paginationContainer = document.createElement("nav");
    paginationContainer.classList.add("pagination");

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.disabled = this.state.page <= 1;
    prevButton.addEventListener("click", () => {
      if (this.state.page > 1) {
        this.state.page -= 1;
      }
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = this.state.page >= this.state.totalPages;
    nextButton.addEventListener("click", () => {
      if (this.state.page < this.state.totalPages) {
        this.state.page += 1;
      }
    });

    paginationContainer.append(prevButton, nextButton);

    return paginationContainer;
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
