const APP_STATE_STORAGE_KEY = 'ong-maos-transformam-app-state';
const VALID_APP_ROUTES = new Set(['#inicio', '#projetos', '#cadastro']);
const MAX_VISITED_ROUTES = 10;

function createDefaultAppState() {
  return {
    lastRoute: '#inicio',
    visitedRoutes: []
  };
}

function normalizeAppState(state) {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return createDefaultAppState();
  }

  const lastRoute = VALID_APP_ROUTES.has(state.lastRoute) ? state.lastRoute : '#inicio';
  const visitedRoutes = Array.isArray(state.visitedRoutes)
    ? state.visitedRoutes.filter((route, index, routes) =>
      VALID_APP_ROUTES.has(route) && routes.indexOf(route) === index)
    : [];

  if (!visitedRoutes.includes(lastRoute)) {
    visitedRoutes.push(lastRoute);
  }

  return {
    lastRoute,
    visitedRoutes: visitedRoutes.slice(-MAX_VISITED_ROUTES)
  };
}

export function saveAppState(state) {
  try {
    const safeState = normalizeAppState(state);
    const serializedState = JSON.stringify(safeState);
    window.localStorage.setItem(APP_STATE_STORAGE_KEY, serializedState);
    return true;
  } catch {
    return false;
  }
}

export function loadAppState() {
  try {
    const serializedState = window.localStorage.getItem(APP_STATE_STORAGE_KEY);

    if (!serializedState) {
      return createDefaultAppState();
    }

    return normalizeAppState(JSON.parse(serializedState));
  } catch {
    return createDefaultAppState();
  }
}