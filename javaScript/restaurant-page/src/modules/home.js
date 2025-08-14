import danbunImg from '../images/danbun-nama.jpeg';
import tsire1Img from '../images/tsire1.jpeg';
import tsire2Img from '../images/tsire2.jpeg';
import wainaImg from '../images/waina.jpeg';

export default function createHomePage() {
  const homeContainer = document.createElement('div');
  homeContainer.classList.add('home-container');

  const headline = document.createElement('h1');
  headline.textContent = 'Welcome to Hausa Kitchen';
  homeContainer.appendChild(headline);

  const description = document.createElement('p');
  description.textContent = 'Experience the authentic taste of Northern Nigeria. Our dishes are made with fresh ingredients, traditional spices, and a whole lot of love.';
  homeContainer.appendChild(description);

  // Create a container for images
  const imagesContainer = document.createElement('div');
  imagesContainer.classList.add('home-images');

  // Array of image objects with src and alt text
  const images = [
    { src: danbunImg, alt: 'Danbun Nama' },
    { src: tsire1Img, alt: 'Tsire 1' },
    { src: tsire2Img, alt: 'Tsire 2' },
    { src: wainaImg, alt: 'Waina' },
  ];

  images.forEach(imageObj => {
    const img = document.createElement('img');
    img.src = imageObj.src;
    img.alt = imageObj.alt;
    img.classList.add('home-image'); // for styling
    imagesContainer.appendChild(img);
  });

  homeContainer.appendChild(imagesContainer);

  return homeContainer;
}
