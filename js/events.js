import { handleModalClick } from './modal.js';

function showToast(message, title = 'Notificação') {
  const existingToast = document.querySelector('.toast');

  if (existingToast) {
    const titleNode = existingToast.querySelector('.toast__title');
    const messageNode = existingToast.querySelector('span:last-child');

    if (titleNode) {
      titleNode.textContent = title;
    }

    if (messageNode) {
      messageNode.textContent = message;
    }

    existingToast.setAttribute('aria-live', 'polite');
    return;
  }

  const toast = document.createElement('aside');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.setAttribute('aria-atomic', 'true');

  const titleElement = document.createElement('span');
  titleElement.className = 'toast__title';
  titleElement.textContent = title;

  const messageElement = document.createElement('span');
  messageElement.textContent = message;

  toast.appendChild(titleElement);
  toast.appendChild(messageElement);
  document.body.appendChild(toast);
}

function handleHashNavigation(event) {
  const link = event.target.closest('a[href^="#"]');

  if (!link) {
    return;
  }

  const href = link.getAttribute('href');

  if (!href || href === '#') {
    return;
  }

  const targetRoute = href.startsWith('#') ? href : `#${href.split('#')[1] || ''}`;

  if (!targetRoute || !targetRoute.startsWith('#')) {
    return;
  }

  event.preventDefault();

  if (link.dataset.section) {
    window.location.hash = '#projetos';
    requestAnimationFrame(() => {
      const section = document.getElementById(link.dataset.section);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    return;
  }

  window.location.hash = targetRoute;
}

const CPF_PATTERN = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const TELEFONE_PATTERN = /^\(\d{2}\) \d{5}-\d{4}$/;
const CEP_PATTERN = /^\d{5}-\d{3}$/;

function getFieldErrorMessage(field) {
  if (field.validity.valueMissing) {
    return 'Este campo é obrigatório.';
  }

  if (field.type === 'email' && field.value && field.validity.typeMismatch) {
    return 'Informe um e-mail válido.';
  }

  if (field.name === 'cpf' && field.value && !CPF_PATTERN.test(field.value)) {
    return 'CPF inválido. Use o formato 000.000.000-00.';
  }

  if (field.name === 'telefone' && field.value && !TELEFONE_PATTERN.test(field.value)) {
    return 'Telefone inválido. Use o formato (00) 00000-0000.';
  }

  if (field.name === 'cep' && field.value && !CEP_PATTERN.test(field.value)) {
    return 'CEP inválido. Use o formato 00000-000.';
  }

  if (field.type === 'date' && field.value && field.validity.rangeOverflow) {
    return 'Selecione uma data válida.';
  }

  if (field.validity.patternMismatch && !['cpf', 'telefone', 'cep'].includes(field.name)) {
    return field.title || 'Formato inválido.';
  }

  return '';
}

function updateFieldFeedback(field) {
  const message = getFieldErrorMessage(field);
  const wrapper = field.parentElement;

  if (!wrapper) {
    return false;
  }

  const messageElement = wrapper.querySelector('.campo-feedback');

  if (message) {
    field.classList.remove('campo-sucesso');
    field.classList.add('campo-erro');
    field.setAttribute('aria-invalid', 'true');

    if (!messageElement) {
      const feedback = document.createElement('span');
      feedback.className = 'campo-feedback';
      wrapper.appendChild(feedback);
    }

    wrapper.querySelector('.campo-feedback').textContent = message;
    wrapper.querySelector('.campo-feedback').hidden = false;
    return false;
  }

  field.classList.remove('campo-erro');
  field.classList.add('campo-sucesso');
  field.setAttribute('aria-invalid', 'false');

  if (messageElement) {
    messageElement.textContent = '';
    messageElement.hidden = true;
  }

  return true;
}

function validateField(field) {
  if (!(field instanceof HTMLInputElement)) {
    return true;
  }

  return updateFieldFeedback(field);
}

function handleSubmit(event) {
  const form = event.target;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  event.preventDefault();

  const fields = Array.from(form.querySelectorAll('input'));
  let firstInvalidField = null;

  fields.forEach((field) => {
    const isValid = validateField(field);

    if (!isValid && !firstInvalidField) {
      firstInvalidField = field;
    }
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    return;
  }

  form.reset();
  showToast('Cadastro enviado com sucesso!', 'Sucesso');
}

function handleInput(event) {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  validateField(target);
}

function initializeEventDelegation() {
  document.querySelectorAll('form').forEach((form) => {
    form.noValidate = true;
  });

  document.removeEventListener('click', handleDocumentClick);
  document.removeEventListener('submit', handleSubmit);
  document.removeEventListener('input', handleInput);

  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('input', handleInput);
}

function handleDocumentClick(event) {
  if (event.target.closest('[data-modal-open]') || event.target.closest('[data-modal-close]')) {
    handleModalClick(event);
    return;
  }

  if (event.target.closest('a[href^="#"]')) {
    handleHashNavigation(event);
  }
}

export { initializeEventDelegation };
