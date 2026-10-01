const inputMaskInstances = new WeakMap();
let imaskPromise;

export async function initializeInputMasks() {
  if (!imaskPromise) {
    imaskPromise = import('https://cdn.jsdelivr.net/npm/imask@7.6.1/+esm')
      .then((module) => module.default)
      .catch(() => null);
  }

  const IMask = await imaskPromise;

  if (typeof IMask !== 'function') {
    return;
  }

  const masks = [
    { selector: '#cpf', mask: '000.000.000-00' },
    { selector: '#telefone', mask: '(00) 00000-0000' },
    { selector: '#cep', mask: '00000-000' }
  ];

  masks.forEach(({ selector, mask }) => {
    const field = document.querySelector(selector);

    if (!field || inputMaskInstances.has(field)) {
      return;
    }

    inputMaskInstances.set(field, IMask(field, { mask }));
  });
}