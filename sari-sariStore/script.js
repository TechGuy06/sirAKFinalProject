// Scroll functions for different sections
function displayJeans() {
  var targetElement = document.getElementById('jeans');
  targetElement.scrollIntoView();
}

function displayTshirt() {
  var targetElement = document.getElementById('tshirt');
  targetElement.scrollIntoView();
}

function displayPerfume() {
  var targetElement = document.getElementById('perfume');
  targetElement.scrollIntoView();
}

function displaySando() {
  var targetElement = document.getElementById('sando');
  targetElement.scrollIntoView();
}

function displayToy() {
  var targetElement = document.getElementById('toy');
  targetElement.scrollIntoView();
}

function displayTop() {
  var targetElement = document.getElementById('header');
  targetElement.scrollIntoView();
}

// Items data
let items = {
  jeans1: { name: "Jeans 1", price: 30, stock: 10 },
  jeans2: { name: "Jeans 2", price: 20, stock: 10 },
  jeans3: { name: "Jeans 3", price: 10, stock: 10 },
  jeans4: { name: "Jeans 4", price: 15, stock: 10 },
  tshirt1: { name: "T-shirt 1", price: 20, stock: 10 },
  tshirt2: { name: "T-shirt 2", price: 15, stock: 10 },
  tshirt3: { name: "T-shirt 3", price: 10, stock: 10 },
  tshirt4: { name: "T-shirt 4", price: 10, stock: 10 },
  perfume1: { name: "Perfume 1", price: 5, stock: 10 },
  perfume2: { name: "Perfume 2", price: 8, stock: 10 },
  perfume3: { name: "Perfume 3", price: 9, stock: 10 },
  perfume4: { name: "Perfume 4", price: 7, stock: 10 },
  sando1: { name: "Sando 1", price: 8, stock: 10 },
  sando2: { name: "Sando 2", price: 10, stock: 10 },
  sando3: { name: "Sando 3", price: 11, stock: 10 },
  sando4: { name: "Sando 4", price: 10, stock: 10 },
  toy1: { name: "Toy 1", price: 5, stock: 10 },
  toy2: { name: "Toy 2", price: 6, stock: 10 },
  toy3: { name: "Toy 3", price: 8, stock: 10 },
  toy4: { name: "Toy 4", price: 5, stock: 10 },
  // Add more items here
};

function increaseStock(itemKey) {
  items[itemKey].stock++;
  document.getElementById(itemKey + "-stock").textContent = items[itemKey].stock;
}

function calculateTotal() {
  let total = 0;
  for (let itemKey in items) {
    total += items[itemKey].price * (10 - items[itemKey].stock);
  }
  return total;
}

function addToCart(itemName, itemKey) {
  if (items[itemKey].stock > 0) {
    items[itemKey].stock--;
    updateStockDisplay(itemKey);
    updateCartSummary(itemName, items[itemKey].price);
  } else {
    alert(`Sorry, ${itemName} is out of stock.`);
  }
}

function updateStockDisplay(itemKey) {
  document.getElementById(itemKey + "-stock").textContent = items[itemKey].stock;
}

function updateCartSummary(itemName, itemPrice) {
  let cartItemsElement = document.getElementById('cart-items');
  let cartTotalElement = document.getElementById('cart-total');
  let cartButton = document.getElementById('cart-button');

  let existingCartItem = cartItemsElement.querySelector(`li[data-name="${itemName}"]`);
  if (existingCartItem) {
    let quantityElement = existingCartItem.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent) + 1;
    quantityElement.textContent = quantity;
  } else {
    let cartItem = document.createElement('li');
    cartItem.dataset.name = itemName;
    cartItem.innerHTML = `
      ${itemName} - $${itemPrice.toFixed(2)}
      <button class="button-81" onclick="increaseQuantity(this)">+</button>
      <span class="quantity">1</span>
      <button class="button-81" onclick="decreaseQuantity(this)">-</button>
    `;
    cartItemsElement.appendChild(cartItem);
  }

  let currentTotal = parseFloat(cartTotalElement.textContent);
  cartTotalElement.textContent = (currentTotal + itemPrice).toFixed(2);

  // Update cart button count
  let itemCount = cartItemsElement.querySelectorAll('li').length;
  cartButton.textContent = `Cart (${itemCount})`;
}

function increaseQuantity(button) {
  let cartItem = button.parentElement;
  let itemName = cartItem.dataset.name;
  let quantityElement = cartItem.querySelector('.quantity');
  let quantity = parseInt(quantityElement.textContent) + 1;
  quantityElement.textContent = quantity;
  let itemKey = Object.keys(items).find(key => items[key].name === itemName);
  items[itemKey].stock--;
  updateStockDisplay(itemKey);
  updateTotal(itemKey, 1);
}

function decreaseQuantity(button) {
  let cartItem = button.parentElement;
  let itemName = cartItem.dataset.name;
  let quantityElement = cartItem.querySelector('.quantity');
  let quantity = parseInt(quantityElement.textContent) - 1;
  
  if (quantity > 0) {
    quantityElement.textContent = quantity;
    let itemKey = Object.keys(items).find(key => items[key].name === itemName);
    items[itemKey].stock++;
    updateStockDisplay(itemKey);
    updateTotal(itemKey, -1); // Update total when quantity decreases
  } else {
    // If quantity becomes zero, remove the item from the cart
    cartItem.remove();
    let itemKey = Object.keys(items).find(key => items[key].name === itemName);
    updateTotal(itemKey, -1 * parseInt(quantityElement.textContent)); // Update total for removed item
  }
}


function updateTotal(itemKey, change) {
  let cartTotalElement = document.getElementById('cart-total');
  let currentTotal = parseFloat(cartTotalElement.textContent);
  let itemPrice = items[itemKey].price * change;
  let newTotal = currentTotal + itemPrice;
  cartTotalElement.textContent = newTotal.toFixed(2);
}

function toggleCart() {
  let cartContent = document.getElementById('cart-content');
  cartContent.classList.toggle('hidden');
}

function checkout() {
  let cartTotalElement = document.getElementById('cart-total');
  let discountRadios = document.getElementsByName('discount');
  let discount = 0;

  for (let radio of discountRadios) {
    if (radio.checked) {
      discount = parseFloat(radio.value);
      break;
    }
  }

  let totalAmount = parseFloat(cartTotalElement.textContent);
  let discountedAmount = totalAmount * (1 - discount);

  alert(`Thank you for your purchase!\nTotal amount paid: $${discountedAmount.toFixed(2)}`);

  // Reset cart
  let cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';
  cartTotalElement.textContent = '0.00';

  // Reset cart button count
  let cartButton = document.getElementById('cart-button');
  cartButton.textContent = `Cart (0)`;
}

function resetCart() {
  let cartItemsElement = document.getElementById('cart-items');
  let cartTotalElement = document.getElementById('cart-total');
  let cartCountElement = document.getElementById('cart-count-summary');

  cartItemsElement.innerHTML = "";
  cartTotalElement.textContent = "0.00";
  cartCountElement.textContent = "0";
}

document.addEventListener("DOMContentLoaded", function() {
  var scrollBtn = document.getElementById("scrollBtn");

  scrollBtn.addEventListener("click", function() {
      scrollToTop(1000); // 1000 milliseconds (1 second) for smooth scrolling
  });

  function scrollToTop(duration) {
      var start = window.pageYOffset;
      var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      function scroll() {
          var now = 'now' in window.performance ? performance.now() : new Date().getTime();
          var time = Math.min(1, ((now - startTime) / duration));
          window.scrollTo(0, Math.ceil((1 - time) * start));
          if (window.pageYOffset === 0) return;
          requestAnimationFrame(scroll);
      }

      scroll();
  }
});
document.getElementById("backButton").onclick = function () {
  window.history.back();
};
