const menuButton = document.querySelector('.menu-hamburguer');
const navigation = document.getElementById('menu-principal');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    const shouldExpand = !isExpanded;

    menuButton.setAttribute('aria-expanded', String(shouldExpand));
    navigation.classList.toggle('is-open', shouldExpand);
  });
}

const contrastButton = document.querySelector('.contrast-toggle');

if (contrastButton) {
  contrastButton.addEventListener('click', () => {
    const isEnabled = contrastButton.getAttribute('aria-pressed') === 'true';
    const shouldEnable = !isEnabled;

    document.documentElement.classList.toggle('high-contrast', shouldEnable);
    contrastButton.setAttribute('aria-pressed', String(shouldEnable));
  });
}