import { DivComponent } from "../../common/div-component";
import { Card } from '../../components/card/card.js';

import "./card-list.css";

export class CardList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    render() {
        if (this.parentState.loading) {
            this.el.innerHTML = `<div class="card-list__loader">Loading...</div>`;
            return this.el;
        }
        this.el.classList.add("card-list");
       

        const section = document.createElement('section');
        section.classList.add('cards');
        this.el.append(section);

        for (const card of this.parentState.list) {
            const cardItem = new Card(this.appState, card);
            section.append(cardItem.render());
        }
        return this.el;
    }
}
