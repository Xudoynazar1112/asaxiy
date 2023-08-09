const cartBody = document.querySelector(".carts");
const cart_count = document.querySelector(".cart_count");
let summarize = document.querySelector(".summarize");

function showAllCart() {
  let allCart = ``;

  if (cart.length) {
    cart?.forEach((item) => {
      allCart += `
      <div class="cart">
        <div class="cart_img">
          <img src="${item?.thumbnail}" alt="thumbnail"></img>
        </div>
        <div class="cart_content">
         <p>${item?.description}</p>
        </div>
        <div class="cart_amount">
          <button class="down" onclick="numberOfStock('down', ${item?.id})">-</button>
          <input type="text" value="${item?.numberCount}">
          <button class="up" onclick="numberOfStock('up', ${item?.id})">+</button>
        </div>
        <div class="cart_info">
          <p id="discount_price">${item?.price} $</p>
          <button onclick="deleteProduct(${item?.id})">🗑 Delete</button>
        </div>
      </div>
      `;
    });
    cartBody.innerHTML = allCart;
  } else {
    allCart = "There is no cart element";
    cartBody.innerHTML = allCart;
  }
}
cart_count.innerHTML = cart.length;
showAllCart();

function numberOfStock(action, id) {
  console.log(action, id);
  cart = cart.map((item) => {
    let numberCount = item?.numberCount;
    if (item?.id === id) {
      if (action === "up" && numberCount < item.stock) {
        numberCount++;
      }
      else if (action === "down" && numberCount > 1) {
        numberCount--;
      }
    }
    return { ...item, numberCount };
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  showTripleGoods();
  showAllCart();
  calculateCartCost();
};


function toast(text) {
  Toastify({
    text,
    duration: 1000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      borderRadius: "12px",
    },
    onClick: function () { }, // Callback after click
  }).showToast();
}

function showTripleGoods() {
  let threeGoods = ``;
  const navThreeProduct = cart.slice(0, 3);

  navThreeProduct.forEach((item) => {
    threeGoods += `
    <div class="triple_good">
      <div class="triple_good_img"><img src="${item?.thumbnail}" alt="png" /></div>
      <div class="triple_good_info">${item?.brand} (${item.numberCount})</div>
      <div class="triple_good_price">${item?.price} $</div>
      <span onclick="deleteProduct(${item?.id})">x</span> 
    </div>
    `;
  });
  triple_goods.innerHTML = threeGoods;
}
showTripleGoods();

function deleteProduct(id) {
  cart = cart.filter((item) => item?.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updata();
  showAllCart();
}

function updata() {
  showTripleGoods();
  amountOfCount();
}

updata();

function amountOfCount() {
  cart_count.innerHTML = cart.length;
}

function likeCountFunc() {
  likeCount.innerHTML = like.length;
}
likeCountFunc();

function calculateCartCost() {
  let allSum = 0;
  cart.forEach((item) => {
    allSum += item.numberCount * item.price;
  });
  document.querySelector(".all_sum").innerHTML = allSum + "$";
  summarize.innerHTML = allSum + "$";
}
calculateCartCost();

document.querySelector(".cart_length").innerHTML = cart.length;
