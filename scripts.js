//Variables
const ancors = document.querySelectorAll('a');
const images = document.querySelectorAll('img');
const paragraphs = document.querySelectorAll('p');
const articles = document.querySelectorAll('article');
const sections = document.querySelectorAll('section');

/* 1. Evita el comportamiento por defecto al hacer click. Por ejemplo, si hago click sobre un enlace, este no me llevará a otra página. */
const handlerLinks = (e) => {   
  if (e.target.matches('a')) {             /*--Comprueba que el elemento sea un enlace(ancor) */
    e.preventDefault();    
    e.stopPropagation();               /*--Evita el comportamiento por defecto */
  }
}
ancors.forEach(ancor => ancor.addEventListener('click', handlerLinks, false ));  /*--El tercer argumento con valor falce */


/* 2. Al hacer click sobre un elemento van a ocurrir varias cosas. Todo depende del tipo de elemento:*/
/* 2.1 Imágenes: Cambia la imagen por uno de los gif que tienes en la carpeta assets con el nombre magic-*. */
const getRandoGif = () => {
  const gifNumber = Math.floor(Math.random() * (5-1) + 1);
  let fileName = `./assets/magic-${gifNumber}.gif`;
  return fileName
}

const handlerImgs = (e) => {
  if (e.target.nodeName === 'IMG') {
    e.target.src = getRandoGif();
  }
}
images.forEach(image => image.addEventListener('click', handlerImgs));

/* 2.2 Párrafos: Cambia el color del texto y el de fondo por uno cualquiera. */
const setRandomColor = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return `#${randomColor}`;
};

const handlerParagraph = (e) => {
  if (e.target.nodeName === 'P') {
    e.target.style.color = setRandomColor();
    e.target.style.backgroundColor = setRandomColor();
  }
}
paragraphs.forEach(paragraph => paragraph.addEventListener('click', handlerParagraph));

/* 2.3 Bloques de article o section: Cambia el color de fondo.*/
const handleArticleAndSections = (e) => {
  if (e.target.nodeName === 'ARTICLE' || e.target.nodeName === 'SECTION') {
    e.target.style.backgroundColor = setRandomColor();
  }
}
articles.forEach(article => article.addEventListener('click', handleArticleAndSections));
sections.forEach(section => section.addEventListener('click', handleArticleAndSections));

//Premium
/* 4. Crea una función de nombre getRandom que acepte un array con valores y devuelva uno de ellos de manera aleatoria.*/ 
/* Color Palette: https://coolors.co/palette/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226 */
const colors = ['red', 'blue', 'green']
const colorsFromCoolors = ['0, 18, 25', '0, 95, 115', '10, 147, 150', '148, 210, 189', '233, 216, 166', '238, 155, 0', '202, 103, 2', '187, 62, 3', '174, 32, 18', '155, 34, 38'];

const getRandom = (arr) => {
  let min = 0;
  let max = arr.length;

  let random = Math.floor(Math.random() * (max-min) + min);
  return `rgb(${ arr[random] })`;
}
console.log(getRandom(colors));
console.log(getRandom(colorsFromCoolors));

/* Cuando el cursor esté sobre alguno de los siguientes elementos, seguir las instrucciones siguientes, y devolver dicho elemento a su estado original cuando salga el cursor.*/

/* 3.1 Imágenes: Cambia la imagen por el gif abracadabra.gif.*/
/* 3.2 Párrafos: Cambia el color del texto y el de fondo por uno cualquiera.*/
let originalImg;
let pOriginalColor;
let pOriginalBgColor;
let sectionBgColor;

const handleMouseOver = (e) => {
  let nodeName = e.target.nodeName; 

  if (nodeName === 'IMG') {
      originalImg = e.target.src;

      e.target.src = './assets/abracadabra.gif';
    } 
    else if (nodeName === 'P') {
      pOriginalColor = e.target.style.color;
      pOriginalBgColor = e.target.style.backgroundColor;

      e.target.style.color = getRandom(colorsFromCoolors);
      e.target.style.backgroundColor = getRandom(colorsFromCoolors);
    }
    else if (nodeName === 'ARTICLE' || nodeName === 'SECTION') {
      sectionBgColor = e.target.style.backgroundColor;

      let pColor = e.target.style.color;
      let blockColor = e.target.style.backgroundColor = getRandom(colorsFromCoolors);
      if (pColor === blockColor) {
        blockColor ;
      }
    }
}

const handleMouseOut = (e) => {
  let nodeName = e.target.nodeName; 
  
  if (nodeName === 'IMG') {
    e.target.src = originalImg;
  } 
  else if (nodeName === 'P') {
    e.target.style.color = pOriginalColor;
    e.target.style.backgroundColor = pOriginalBgColor;
  }
  else if (nodeName === 'ARTICLE' || nodeName === 'SECTION') {
    e.target.style.backgroundColor = sectionBgColor;
  }
}

images.forEach(image => image.addEventListener('mouseover', handleMouseOver));
paragraphs.forEach(paragraph => paragraph.addEventListener('mouseover', handleMouseOver));

images.forEach(image => image.addEventListener('mouseout', handleMouseOut));
paragraphs.forEach(paragraph => paragraph.addEventListener('mouseout', handleMouseOut));