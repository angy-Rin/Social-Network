import { home } from './templates/home.js';
import { signIn } from './templates/signIn.js';
import { signup } from './templates/signUp.js';
import verification from './templates/verification.js';
import { page404 } from './templates/page404.js';
import { wall } from './templates/wall.js';

const root = document.getElementById('content');
const routes = [
  { path: '/', component: home },
  { path: '/signup', component: signup },
  { path: '/verification', component: verification },
  { path: '/page404', component: page404 },
  { path: '/signin', component: signIn },
  { path: '/wall', component: wall },
];

const defaultRoute = '/';

function onNavigate(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    if (hash === '/signin' || hash === '/signup') {
      // elimina todos sus hijos. No duplica home cuando navegas entre modales;
      while (root.childNodes.length > 0) {
        root.removeChild(root.lastChild);
      }
      root.appendChild(home(onNavigate));
    } else {
      while (root.firstChild) {
        root.removeChild(root.firstChild);
      }
    }
    root.appendChild(route.component(onNavigate));
  } else {
    onNavigate('/page404');
  }
}

window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  onNavigate(path);
});

onNavigate(window.location.pathname || defaultRoute);
console.log('hola');
