const contactForm = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const phone = document.getElementById('phone');
const errorElem = document.getElementById('error');

const processForm = (form) => {
  const data = new FormData(form);
  data.append('form-name', 'contact');
  fetch('/', {
    method: 'POST',
    body: data,
  })
    .then(() => {
      errorElem.innerText = 'Thank you. Your letter has been sent.';

      setTimeout(function () {
        errorElem.innerText = '';
      }, 2000);
    })
    .catch((error) => {
      errorElem.innerText = `Error: ${error}`;

      setTimeout(function () {
        errorElem.innerText = '';
      }, 2000);
    });
};

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    let messages = [];
    const nameVal = name.value.trim();
    if (nameVal === '' || nameVal === null || nameVal.length < 2) {
      messages.push('Name must be at least 2 characters');
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email.value.trim())) {
      messages.push('Please enter a valid email');
    }

    if (message.value === '' || message.value === null) {
      messages.push('Please write your message');
    }

    if (messages.length > 0) {
      e.preventDefault();
      errorElem.innerText = messages.join('; ');
    }

    if (messages.length === 0) {
      e.preventDefault();
      processForm(contactForm);

      name.value = '';
      email.value = '';
      message.value = '';
      if (phone.value !== '' || phone.value !== null) {
        phone.value = '';
      }
    }
  });
}
