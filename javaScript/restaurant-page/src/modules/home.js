// src/modules/home.js
export default function createHomePage() {
  const homeContainer = document.createElement('div');
  homeContainer.classList.add('home-container');

  const headline = document.createElement('h1');
  headline.textContent = 'Welcome to Hausa Kitchen';
  homeContainer.appendChild(headline);

  const image = document.createElement('img');
  image.src = 'https://upload.wikimedia.org/wikipedia/commons/6/68/Suya.jpg';
  image.alt = 'Delicious Hausa suya';
  image.classList.add('home-image');
  homeContainer.appendChild(image);

  const description = document.createElement('p');
  description.textContent = 'Experience the authentic taste of Northern Nigeria. Our dishes are made with fresh ingredients, traditional spices, and a whole lot of love.';
  homeContainer.appendChild(description);

  return homeContainer;
}
