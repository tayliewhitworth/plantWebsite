const mobileBtn = document.querySelector(".mobile-buttons");
const mobileItems = document.querySelector(".mobile-nav-list");
const mobileLinks = document.querySelectorAll(".mobile-nav-list li");
const accordionItems = document.querySelectorAll(".accordion-item");
// shopping buttons and items
const addBtn = document.querySelectorAll(".shop-item-button");
const removeBtn = document.querySelectorAll(".btn-danger");
const checkOutBtn = document.querySelector(".btn-purchase");
const quantityInputs = document.querySelectorAll(".cart-quantity-input");
const cartItemContainer = document.querySelector(".cart-items");
const cartRows = document.querySelectorAll(".cart-row");
const cartTotal = document.querySelector(".cart-total-price");

// adding theme stylesheet
document.getElementById('theme').addEventListener('click', function() {
  toggleStylesheet('css/theme.css')
})

function toggleStylesheet(href, onoff) {
  let existingNode = 0 //get existing stylesheet node if it already exists:
  for (let i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf(href) > -1) existingNode = document.styleSheets[i].ownerNode
  }
  if (onoff == undefined) onoff = !existingNode //toggle on or off if undefined
  if (onoff) { //TURN ON:
    if (existingNode) return onoff //already exists so cancel now
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  } else { //TURN OFF:
    if (existingNode) existingNode.parentNode.removeChild(existingNode)
  }
  return onoff
}

// show and hide items
let contentSections = ["home", "about", "tips", "shop"];
let navElements = document.querySelectorAll(".nav-list li");
let footerElements = document.querySelectorAll(".footer-nav li");

for (let i = 0; i < navElements.length; i++) {
  navElements[i].addEventListener("click", (e) => {
    for (let i = 0; i < navElements.length; i++) {
      navElements[i].classList.remove("selected");
    }

    let el = e.currentTarget;
    el.classList.add("selected");

    for (section of contentSections) {
      let el = document.getElementById(`${section}`);
      el.classList.remove("show");
      el.classList.add("hidden");
    }

    let name = `${el.title}`;

    let showEl = document.getElementById(name);
    showEl.classList.add("show");
  });
}

for (let i = 0; i < footerElements.length; i++) {
  footerElements[i].addEventListener("click", (e) => {
    let el = e.currentTarget;

    for (section of contentSections) {
      let el = document.getElementById(`${section}`);
      el.classList.remove("show");
      el.classList.add("hidden");
    }

    let name = `${el.title}`;

    let showEl = document.getElementById(name);
    showEl.classList.add("show");
  });
}

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
