const mobileBtn = document.querySelector(".mobile-buttons");
const mobileItems = document.querySelector(".mobile-nav-list");
const mobileLinks = document.querySelectorAll(".mobile-nav-list a");
const accordionItems = document.querySelectorAll(".accordion-item");
// shopping buttons and items
const addBtn = document.querySelectorAll(".shop-item-button");
const removeBtn = document.querySelectorAll(".btn-danger");
const checkOutBtn = document.querySelector(".btn-purchase");
const quantityInputs = document.querySelectorAll(".cart-quantity-input");
const cartItemContainer = document.querySelector(".cart-items");
const cartRows = document.querySelectorAll(".cart-row");
const cartTotal = document.querySelector(".cart-total-price");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log(entry)
    if(entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }
  })
})

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach(el => observer.observe(el))

// const sections = document.querySelectorAll('section')
// const links = document.querySelectorAll('nav a')

// links.forEach(link => {
//   link.addEventListener('click', () => {
//     const selectedSection = document.querySelector(link.hash)
//     sections.forEach(section => {
//       if (section === selectedSection) {
//         section.style.display = 'block'
//       } else {
//         section.style.display = 'none'
//       }
//     })
//   })
// })

// mobile nav

let mobile = false;

let loader = document.getElementById("preloader");

window.setTimeout(() => {
  loader.style.display = "none";
}, 2000);

mobileBtn.addEventListener("click", () => {
  mobile = !mobile;
  mobile
    ? (mobileBtn.innerHTML = `<i class="fa-solid fa-x close"></i>`)
    : (mobileBtn.innerHTML = '<i class="fa-solid fa-bars open"></i>');
  const expanded = mobileBtn.getAttribute("aria-expanded") === "true" || false;
  mobileBtn.setAttribute("aria-expanded", !expanded);
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileBtn.setAttribute("aria-expanded", "false");
    mobile = false;
    mobileBtn.innerHTML = '<i class="fa-solid fa-bars open"></i>';
  });
});

// accordion

accordionItems.forEach((item) => {
  const accordionBtn = item.querySelector(".accordion-arrow");

  accordionBtn.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      accordionItems.forEach((otherItem) => {
        if (otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });
      item.classList.add("active");
    }
  });
});

// shopping

removeBtn.forEach((btn) => {
  btn.addEventListener("click", removeItems);
});

quantityInputs.forEach((quantity) => {
  quantity.addEventListener("change", quantityChange);
});

addBtn.forEach((add) => {
  add.addEventListener("click", (e) => {
    let btn = e.target;
    let shopItem = btn.parentElement.parentElement;
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    let imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    addItemToCart(title, price, imgSrc);
    updateCartTotal();
  });
});

checkOutBtn.addEventListener("click", purchaseClicked);

function purchaseClicked() {
  let total = document.getElementsByClassName("cart-total-price")[0].innerText;
  alert(`Thank you for your purchase of PlantLife!\nYour total is: ${total}`);
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeItems(e) {
  let btnClicked = e.target;
  btnClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChange(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Item is already added to cart!");
      return;
    }
  }
  let cartRowContents = `
    <div class="cart-item">
      <img class="cart-item-image" src=${imgSrc} width="100" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price">${price}</span>
    <div class="cart-quantity">
      <input type="number" value="1" class="cart-quantity-input">
      <button class="btn-danger learn-more">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeItems);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChange);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
