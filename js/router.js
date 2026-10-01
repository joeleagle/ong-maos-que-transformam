import { loadAppState, saveAppState } from './storage.js';
import { appTemplates } from './templates.js';

const ROUTES = {
  '#inicio': appTemplates['#inicio'],
  '#projetos': appTemplates['#projetos'],
  '#cadastro': appTemplates['#cadastro']
};

function getRouteFromHash() {
  const hash = window.location.hash;

  if (!hash) {
    const savedRoute = loadAppState().lastRoute;

    if (ROUTES[savedRoute]) {
      return savedRoute;
    }
  }

  const normalized = hash.trim().toLowerCase();
  const route = normalized.startsWith('#') ? normalized : `#${normalized}`;

  return ROUTES[route] ? route : '#inicio';
}

export function renderRoute() {
  const route = getRouteFromHash();
  const app = document.getElementById('app');

  if (!app) {
    return;
  }

  if (route !== window.location.hash) {
    window.location.hash = route;
    return;
  }

  app.innerHTML = ROUTES[route]();
  app.classList.toggle('projetos-grid', route === '#projetos');
  app.dataset.route = route;

  const state = loadAppState();
  const visitedRoutes = state.visitedRoutes.filter((visitedRoute) => visitedRoute !== route);
  visitedRoutes.push(route);

  saveAppState({
    lastRoute: route,
    visitedRoutes
  });

  window.dispatchEvent(new CustomEvent('route:rendered', { detail: { route } }));
}
