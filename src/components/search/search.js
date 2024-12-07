import { DivComponent } from "../../common/div-component";
import "./search.css";

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  search() {
    const value = this.el.querySelector("input").value;
    this.state.searchQuery = value;
  }

  render() {
    this.el.classList.add("search");
    this.el.innerHTML = `
            <div class="search-wrapper">
                <input type="search" placeholder="Search the movie by title..." class="search__field" value="${
                  this.state.searchQuery ? this.state.searchQuery : ""
                }">
                <svg class="icon" width="24" height="24">
                <use xlink:href="#search"></use>
                </svg>
                </div>
                <button aria-label="search">
                <svg class="icon" width="24" height="24">
                <use xlink:href="#search"></use>
                </svg>
            </button>
        `;
    this.el.querySelector("button").addEventListener("click", this.search.bind(this));
    this.el.querySelector("input").addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        this.search();
      }
    });
    return this.el;
  }
}
