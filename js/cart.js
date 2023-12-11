let cartItemsObj;
onLoad();

function onLoad() {
  loadCartItemsObj();
  displayCartItems();
  cartSummury();
}

function loadCartItemsObj() {
  // console.log(cartItems);
  cartItemsObj = cartItems.map((itemId) => {
    for (let i = 0; i < products.length; i++) {
      if (itemId == products[i].id) {
        return products[i];
      }
    }
  });
  // console.log(cartItemsObj);
}

function cartSummury() {
  let cartSummuryElement = document.querySelector(".cart-summury");

  let totalItemsInCart = cartItemsObj.length;
  let totalPrice = 0;
  let totalDiscount = 0;
  const convenienceFees = 0;
  cartItemsObj.forEach((element) => {
    totalPrice += element.price;
    totalDiscount = (totalPrice * 10) / 100;
  });
  let finalAmountToPay = totalPrice - totalDiscount + convenienceFees;

  cartSummuryElement.innerHTML = `<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItemsInCart}) </div>
  <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹ ${totalPrice}</span>
  </div>
  <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
  </div>
  <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹  ${convenienceFees}</span>
  </div>
  <hr>
  <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹ ${finalAmountToPay}</span>
  </div>
</div>
<button class="btn-place-order" onclick="window.location.href='/pages/order-places.html'">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;
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
  if (cartItems.length == 0) {
    cartEmpty.style.display = "block";
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartItemsObj();
  displayCartItems();
  displayCartCount();
  cartSummury();
}

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")} ${
    months[monthIndex]
  } ${year}`;
  return formattedDate;
}

function generateItemHtml(item) {
  let currentDate = new Date();

  // Add 7 days to the current date
  currentDate.setDate(currentDate.getDate() + 7);

  // Format the date
  let formattedDate = formatDate(currentDate);

  return `
  <div class="cart-bg-color">
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
                              <span class="delivery-details-days">${formattedDate}</span>
                          </div>
                      </div>
                      <div class="remove-from-cart" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash-can"
                              style="color: #ffffff;"></i>
                      </div>
        </div>
   </div>`;
}
