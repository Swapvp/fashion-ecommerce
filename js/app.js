// mobile responsive navbar

const sidebar = document.querySelector(".sidebar");
const btn = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
});

// Fetching Products

let cartItems;
onLoad();

function onLoad() {
  let cartItemsStr = localStorage.getItem("cartItems");
  cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
  productsDisplay();
  displayCartCount();
}

function addToCart(itemId) {
  cartItems.push(itemId);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  displayCartCount();
}

function displayCartCount() {
  let cartCounterElement = document.querySelector(".cart-counter");
  let cartCounterMobileElement = document.querySelector(".cart-counter-mobile");

  if (cartItems.length > 0) {
    cartCounterElement.style.visibility = "visible";
    cartCounterElement.innerText = cartItems.length;
    cartCounterMobileElement.innerText = cartItems.length;
  } else {
    cartCounterElement.style.visibility = "hidden";
  }
}

function productsDisplay() {
  let itemContainer = document.querySelector(".items-container");

  if (itemContainer == null) {
    return "";
  }
  let innerHTMLVariable = "";
  products.forEach((element) => {
    innerHTMLVariable += ` <div class="col-lg-3 col-md-4 col-sm-6 my-2">
      <div class="product-card mx-1">
          <img src="${element.image}" alt="" onclick="window.location.href='/pages/single-product.html'">
          <div class="p-body">
              <h4 class="p-title" onclick="window.location.href='/pages/single-product.html'">${element.productName}</h4>
              <div class="d-flex p-group">
                  <p>Gene: <span>${element.gene}</span></p>
                  <p>Age: <span>${element.age}</span></p>
              </div>
              <h6 class="p-price">N ${element.price}</h6>
              <button class="p-shop" onclick="addToCart(${element.id})"><i class="fa-solid fa-cart-shopping"></i></button>
          </div>
      </div>
      </div>`;
  });
  itemContainer.innerHTML = innerHTMLVariable;
}
