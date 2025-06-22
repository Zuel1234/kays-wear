const userLanguage = window.navigator.language;
console.log(userLanguage);
const formatter = new Intl.NumberFormat(userLanguage, {
  style : 'currency',
  currency : "GHS"
})
const shopEl = document.querySelector(".cart");
let data = [];

const priceEl = document.querySelectorAll('.pro_price');
priceEl.forEach((price) => {
  const priceContent = Number(price.textContent);
  price.textContent = formatter.format(priceContent);
 
})

const addToCartBtn = document.querySelectorAll(".add_to_cart");

addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    window.location.reload()
    const bntParentEl = e.target.parentElement.parentElement.parentElement;
   
    const pro_image = bntParentEl.querySelector("img").src;
    const pro_price = bntParentEl.querySelector(".pro_price").textContent;
    const pro_name = bntParentEl.querySelector(".pro_name").textContent;
  
    const product = {
       pro_image : `${pro_image}`,
       pro_price : `${pro_price}`,
       pro_name : `${pro_name}`
       
    }  
    
    toLocalStorage(product);

  
  });
});


function toLocalStorage(productsObject){

  cartData = JSON.parse(localStorage.getItem('myCartData'));
  if(cartData === null) {
      data.push(productsObject);
      
      localStorage.setItem('myCartData',JSON.
        stringify(data))
  
  }
  
  else {
    const cartData = JSON.parse(localStorage.getItem('myCartData'))
    cartData.forEach((item) => {
      if (productsObject.pro_name === item.pro_name) {
        alert('items is already in the cart')
        return
      }
      else {
        data.push(item)
      }
    })
    data.push(productsObject)
    localStorage.setItem("myCartData",JSON.stringify(data))
    window.location.reload();
  }
  
  quantityCountDisplay(1)
}

function addToCart() {

  const cartData = JSON.parse(localStorage.getItem('myCartData'));
  cartData.forEach((item) => {


    const newEl = document.createElement("div");
    newEl.setAttribute("class", "cart_box");

    newEl.innerHTML = `  <div class="image_box">
          <img src= ${item.pro_image} class="big_img">
         </div>
            <div class="discription">
              <h2 class="pro_name">${item.pro_name}</h2>
              <p class="pro_price">${item.pro_price}</p>
              <div class="increase_decrease_btn">
                <button class="decrease" id = "decrease">-</button>
                <span class="quantit">1</span>
                <button class="increase" id = "increase">+</button>
            </div>
            </div>
            <div class="delete">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                </svg>
          </div>`;
    shopEl.appendChild(newEl);
    const shop = shopEl.querySelectorAll('.cart_box');
    console.log(shop.length);
    const buyBtn = document.querySelector('.buy');
    console.log(buyBtn);
     

    const increaseDecreaseEl = newEl.querySelector(".increase_decrease_btn");

    let displayQuantity = newEl.querySelector(".quantit");
    let quantityNumber = Number(displayQuantity.textContent);
  
    const increaseBtn = newEl.querySelector(".increase");
  
    increaseDecreaseEl.addEventListener("click", (e) => {
      if (e.target.id === "decrease" && displayQuantity.textContent > 1) {
        quantityNumber--;
      } else if (e.target.id === "increase") {
        quantityNumber++;
      }
      displayQuantity.textContent = quantityNumber;
      updateTotalPrice();
    });

  
  updateTotalPrice();
   
   
   
  })
  

}

addToCart()

function removeCart() {
  
const removeBtn = document.querySelectorAll('.delete svg')  
  removeBtn.forEach((removeBtn) => {
    removeBtn.addEventListener('click', (e) => {

      
  let cartData = JSON.parse(localStorage.getItem("myCartData"))

     const parentName = e.target.parentElement
     .parentElement.parentElement;
     const nameInRemoveBtn = parentName.
     querySelector('.pro_name').textContent;

    
     cartData.forEach((item) =>   {

      if(item.pro_name !== nameInRemoveBtn){
        data.push(item)
        
      }

     })

     localStorage.setItem('myCartData',JSON.
      stringify(data))
      window.location.reload()
     
    })
    
    
  })
  
}

removeCart()



function updateTotalPrice() {
  let total = 0;
  const totalEl = document.querySelector(".total_box .total");

  const allCartItems = shopEl.querySelectorAll(".cart_box");
  allCartItems.forEach((cartBox) => {
    const price = cartBox.querySelector(".pro_price").textContent;
   
    const priceNumbeAlone =Number(price.replace("GHS",""))
    const quantity = cartBox.querySelector(".quantit").textContent;

    total += priceNumbeAlone * quantity
  });

  totalEl.textContent =formatter.format( total);
  
}
                                  


const countDisplay = document.querySelector('.display_quantity');
let count = 0;

function quantityCountDisplay(state) {

  const cartData = JSON.parse(localStorage.getItem('myCartData'))

  cartData.forEach((item) => {
    
  count += state
 
  if(count >= 1){
    countDisplay.style.display = 'block';
  }
else if(count === 0)  {
  countDisplay.style.display = 'none'
}
 countDisplay.textContent = count;

  })
  
}
quantityCountDisplay(1)

const totalCheckoutPrice = document.querySelector('.check_total');

const checkoutParentEl = document.querySelector('.checkout-data')

function checkoutItems() {
  const cartData =  JSON.parse(localStorage.getItem('myCartData'));
 let total = 0
 let NumberPrice = 0

cartData.forEach((item) => {
 



  const newEl = document.createElement('div');
  newEl.setAttribute('class','checkout_det');
  
  
newEl.innerHTML = `  <div class="image_box">
<img src= ${item.pro_image} alt="">
</div>
<h4 class="name">${item.pro_name}</h4>
<p class="price_checkout">${item.pro_price}</p>`
 let price = item.pro_price
  NumberPrice +=Number( price.replace('GHS',""))



checkoutParentEl.appendChild(newEl);

  
})

total = NumberPrice + total
 
console.log(total);
totalCheckoutPrice.innerHTML = formatter.format(total)

}


checkoutItems()

function whatsapp() {


  const cartData = JSON.parse(localStorage.getItem('myCartData'));

  let productName = []
  let productPrice = []
  cartData.forEach((item,ind) => {
    productName.push(item.pro_name.toUpperCase())
    let price = item.pro_price
    let NumberPrice = Number(price.replace('GHS',""))
    productPrice.push(formatter.format(NumberPrice))
  })
  
const checkoutBtn = document.querySelector('.order_btn')



  checkoutBtn.addEventListener('click', (e) => { 

const firstName = document.getElementById('first_name')

const lastName = document.getElementById('second_name')

const email = document.getElementById('email')

const city = document.getElementById('town')

const address = document.getElementById('address')

const phone = document.getElementById('phone')

const all = document.querySelectorAll('.cart_box')
console.log(all);
if(all.length === 0){
  alert("I think there is nothing in your cart now add an item to proceed to checkout")
  return
}


const url = `https://wa.me/559428086?text= %20 %20 %20 %20 %20 %20PRODUCT SUMMARY%0A %0APRODUCT NAME(s): %0A %0A${productName}%0A %0APRODUCT PRICE(s):%0A %0A${productPrice} %0A %0A
PERSONAL INFO:%0A %0A
FIRST NAME: ${firstName.value}
 %0A
LAST NAME: ${lastName.value}
 %0A
EMAIL: ${email.value}
 %0A
CITY/TOWN: ${city.value}
 %0A
STREET ADDRESS: ${address.value}
 %0A
PHONE: ${phone.value}
`
if (firstName.value === "" || lastName.value === "") { 
 alert("This form is needed to process your delivery please fill all ")
  
}

else if ( email.value === "" || city.value === "") {
alert("Please fill all inputs in the Form to process your delivery")
} 

else if (address.value === "" || phone.value === "") {
  alert("Input field must all be filled to process your delivery")
}

else {
 
 localStorage.setItem("myCartData",JSON.stringify(""));
  window.open(url,"_blank").focus()
  localStorage.removeItem("myCartData")
  window.location.reload()
}


  })
}
whatsapp()
