// Turns the contact form into a pre-filled email. No data is sent to a server.
const EMAIL = 'hello@mycsmajor.com';

const form = document.querySelector('[data-contact-form]');
const error = document.querySelector('[data-form-error]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = String(data.get('message')).trim();
  const name = String(data.get('name')).trim();

  if (!message) {
    error.textContent = 'Please write a message first.';
    form.elements.message.focus();
    return;
  }
  error.textContent = '';

  const subject = `[mycsmajor] ${data.get('topic')}`;
  const body = name ? `${message}\n\n${name}` : message;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
