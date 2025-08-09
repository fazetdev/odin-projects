// src/modules/contact.js
export default function createContactPage() {
  const contact = document.createElement('div');
  contact.classList.add('contact');

  const headline = document.createElement('h1');
  headline.textContent = 'Contact Us';

  const address = document.createElement('p');
  address.textContent = 'No. 279 Kankarofi emirs place road, Kano Municipla, Nigeria';

  contact.appendChild(headline);
  contact.appendChild(address);

  return contact;
}
