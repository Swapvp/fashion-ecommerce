let cartItemsObj;
onLoad();

function onLoad() {
  loadCartItemsObj();
  displayCartItems();
}

function loadCartItemsObj() {
  console.log(cartItems);
  cartItemsObj = cartItems.map((itemId) => {
    for (let i = 0; i < products.length; i++) {
      if (itemId == products[i].id) {
        return products[i];
      }
    }
  });
  console.log(cartItemsObj);
}

function displayCartItems() {
  let cartRightcontainer = document.querySelector(".cart-items-container");
  let cartEmpty = document.getElementById("cartEmpty");
  let innerHTML = "";
  cartItemsObj.forEach((element) => {
    cartEmpty.style.display = "none";
    innerHTML += generateItemHtml(element);
  });
  cartRightcontainer.innerHTML = innerHTML;
}

function removeFromCart(itemId) {
  cartItems = cartItems.filter((cartItemId) => cartItemId != itemId);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartItemsObj();
  displayCartItems();
  displayCartCount();
  cartEmpty.style.display = "block  ";
}

function generateItemHtml(item) {
  return `<div class="col-lg-8 col-md-12 col-sm-12 cart-bg-color">
            <div class="d-flex cart-info-container">
                <div class="cart-left-part">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="">
                    </div>
                </div>
                <div class="cart-right-part">
                    <div class="cart-item-name">
                        <b>
                            <p>${item.productName}</p>
                        </b>
                    </div>
                    <div class="cart-price">${item.price}</div>
                    <div class="return-period">
                        <span class="return-period-days">14 days</span> return available
                    </div>
                    <div class="delivery-details">
                        Delivery by
                        <span class="delivery-details-days">10 Oct 2023</span>
                    </div>
                </div>
                <div class="remove-from-cart" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash-can"
                        style="color: #ffffff;"></i>
                </div>
            </div>
        </div>`;
}
