import { initializeEventDelegation } from './events.js';
import { initializeInputMasks } from './masks.js';
import { renderRoute } from './router.js';
import { renderProjetosCards } from './templates.js';

function initializeApp() {
  const app = document.getElementById('app');

  if (!app) {
    return;
  }

  function renderActiveRouteFeatures(route) {
    if (route === '#projetos') {
      renderProjetosCards();
    }

    if (route === '#cadastro') {
      initializeInputMasks();
    }
  }

  window.addEventListener('route:rendered', (event) => {
    initializeEventDelegation();
    renderActiveRouteFeatures(event.detail?.route);
  });

  window.addEventListener('hashchange', renderRoute);

  initializeEventDelegation();
  renderRoute();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
} else {
  initializeApp();
}
