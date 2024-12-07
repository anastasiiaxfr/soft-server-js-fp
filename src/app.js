import { MainView } from "./views/main/main";
import { SingleMovieView } from "./views/single/single";
import { FavoritesView } from "./views/favorites/favorites";

class App {
    routes = [
        { path: '', view: MainView }, 
        { path: '#movie/:id', view: SingleMovieView },
        { path: '#favorites', view: FavoritesView } 
    ];

    appState = {
        favorites: []
    };

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy(); 
        }

        const hash = location.hash;

        const route = this.routes.find(r => this.matchRoute(r.path, hash));

        if (route) {
            const params = this.extractParams(route.path, hash);
            this.currentView = new route.view(this.appState, params);
            this.currentView.render();
        }
    }

    matchRoute(routePath, hash) {
        const routeRegex = new RegExp('^' + routePath.replace(/:id/, '(\\d+)') + '$');
        return routeRegex.test(hash);
    }

    extractParams(routePath, hash) {
        const routeRegex = new RegExp('^' + routePath.replace(/:id/, '(\\d+)') + '$');
        const match = hash.match(routeRegex);
        if (match) {
            return { id: match[1] }; 
        }
        return {}; 
    }
}

new App();
