import beefImg from '../../images/beeftsire.jpeg';

export default function createMenuPage() {
  const menuDiv = document.createElement('div');
  menuDiv.classList.add('menu');

  // Headline
  const headline = document.createElement('h1');
  headline.textContent = 'Our Menu';
  menuDiv.appendChild(headline);

  // Menu List
  const menuList = document.createElement('ul');
  const items = ['Suya', 'Wainar Shinkafa', 'Danbun Nama'];
  items.forEach(itemText => {
    const item = document.createElement('li');
    item.textContent = itemText;
    menuList.appendChild(item);
  });
  menuDiv.appendChild(menuList);

  // Image Item
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('menu-item');

  const image = document.createElement('img');
  image.src = beefImg;
  image.alt = 'Beef Tsire';
  image.classList.add('menu-image');  // For styling via CSS

  const title = document.createElement('h3');
  title.textContent = 'Beef Tsiire';

  itemDiv.appendChild(image);
  itemDiv.appendChild(title);
  menuDiv.appendChild(itemDiv);

  return menuDiv;
}
