import { DivComponent } from "../../common/div-component";
import "./header.css";

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.innerHTML = "";
    this.el.classList.add("header");
    this.el.innerHTML = `
            <div>
                <a href="/" class="logo"><b>XFR</b>.movies</a>
            </div>
            <nav class="menu">
                <a class="menu__item" href="#favorites">
                 <svg class="icon" width="24" height="24">
                    <use xlink:href="#favorite"></use>
                </svg>
                 <span>Favorite</span>
                    <div class="menu__counter">
                        ${this.appState.favorites.length}
                    </div>
                </a>
            </nav>
        `;
    return this.el;
  }
}
