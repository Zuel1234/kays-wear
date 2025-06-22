



const cartIcon = document.querySelector('.cart_logo');
const  shopContainer = document.querySelector('.shopping_list');
const closeCart = document.querySelector('.cart_close')

cartIcon.addEventListener('click', () => {
  shopContainer.classList.add('active')
})

closeCart.addEventListener('click', () => {
  shopContainer.classList.remove('active')
})


const bigImage = document.querySelector('.big_img');

const smallImages = document.querySelectorAll('.small');


smallImages.forEach((img) => {

  img.addEventListener('click', (e) => {

bigImage.src = e.target.src
  })
  
})




const closeMenu = document.querySelector('#close_logo');

const openMenu = document.querySelector('#menu_bar svg');


const menuContainer = document.querySelector('.mobile_links');



openMenu.addEventListener("click", (e) =>{
  menuContainer.classList.add("mobile_active");
})


closeMenu.addEventListener("click", (e) =>{
  menuContainer.classList.remove("mobile_active");
 
})


// logic for slider automatic movements
const sliderWriper = document.querySelector(".slider_container");

let timer = 0;
let timeOut = 0;

slides();

function slides() {
  sliderWriper.style.transform = `translateX(${timer}vw)`;
  timer += -100;
  if (timer === -200) {
    clearTimeout(timeOut);
    timer = 0;
  }
  timeOut = setTimeout(() => {
    slides();
  }, 5000);
}
