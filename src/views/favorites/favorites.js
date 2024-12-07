import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/card-list/card-list.js';

export class FavoritesView extends AbstractView  {
   
    constructor (appState){
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('My favorites');
    }

    destroy(){
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path){
        console.log(path);
        if(path === 'favorites'){
           this.render();
        }
    }

    render() {
        const main = document.createElement('div');
        
        main.innerHTML = `
        <h1>Favorites</h1>
        `;

        const cardList = new CardList(this.appState, {list: this.appState.favorites}).render();
        main.append(cardList);

        const countElement = document.createElement('div');
        // countElement.textContent = `Books count: ${this.appState.favorites.length}`;
        
        main.append(countElement);
        
        this.app.innerHTML = '';
        this.app.append(main);
        
        this.renderHeader();
    }
    

    renderHeader(){
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}