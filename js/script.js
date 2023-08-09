let menuBtn = document.querySelector(".menu_btn");
let closeBtn = document.querySelector(".close_btn");
let leftList = document.querySelector(".left_list");
let black_window = document.querySelector(".black_window");
const union = document.querySelector(".union");
const loader = document.querySelector(".loader");
const cartCount = document.querySelector(".cart_count");
const likeCount = document.querySelector(".like_count");
let triple_goods = document.querySelector(".triple_goods");

let allData = JSON.parse(localStorage.getItem("allData") || "[]");
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let like = JSON.parse(localStorage.getItem("like") || "[]");



// left list menu bar for phones
menuBtn.addEventListener("click", function() {
    leftList.style.display = "block"
});
closeBtn.addEventListener("click", function() {
    leftList.style.display = "none"
});


// Ma'lumotlarni yig'adigan funksiya

function showProducts(products) {
  let boxes = ``;

  products?.forEach((item) => {
    boxes += `
      <div class="karta_1">
        <div class="content">
          <span class="chegirma">Chegirma</span>
          <i class="fa-solid fa-cart-shopping" onclick="addToCart(${item?.id})"></i>
          <i class="fa-solid fa-heart" onclick="addToLike(${item?.id})"></i>
          <img
            src="${item?.thumbnail}"
            alt="some image"
          />
        </div>
        <div class="karta_body">
          <div class="box_header_top">
            <p id="matn">
              ${item?.description}
            </p>
            <div class="coment">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <div class="comentary">
                <i class="fa-regular fa-message"></i>3 ta sharx
              </div>
            </div>
            <span><del>${discount(item?.price)} $</del></span>
            <p id="discount_price">${item?.price} $</p>
            <p>${break_pay(item?.price)} $ / 12 months</p>
          </div>
          <button>Bir klikda olish</button>
        </div>
      </div>
    `;
  }); 
  union.innerHTML = boxes;
}


// ma'luotni yig'ib brouserda chiqaradigan funksiya
async function getAllData(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();

    if (response) {
      hideLoader();
    }

    localStorage.setItem("allData", JSON.stringify(data.products));
    showProducts(data.products);
    } 
    catch (err) {
      console.log(err.message, "Error");
  }
};

getAllData("https://dummyjson.com/products");


function hideLoader() {
  loader.style.display = "none";
}

function addToCart(id) {
  
  if (cart?.some((item) => item?.id === id)) {
    numberOfStock("up", id);
    toast("Added one more!");
  }
  else {
    let cartItem = allData?.find((item) => item.id === id);
    cart.push({...cartItem, numberCount: 1});
    cartCount.innerHTML = cart.length;
    toast("Added to cart successfully!")
    localStorage.setItem("cart", JSON.stringify(cart));
    showTripleGoods();
  }
  calculateCartCost();
}

function addToLike(id) {
  let liked = allData?.find((item) => item.id === id);
  
  if (like?.some((item) => item?.id === id)) {
    like = like.filter((item) => item.id !== id);
    toast("Removed from like!");
    localStorage.setItem("like", JSON.stringify(like));
  }
  else {
    like.push(liked);
    likeCount.innerHTML = like.length;
    toast("Added to like successfully!")
    localStorage.setItem("like", JSON.stringify(like));
  }
  calculateCartCost();
}

function numberOfStock(action, id) {
  cart = cart.map((item) => {
    let numberCount = item?.numberCount;
    if (item?.id === id) {
      if (action === "up" && numberCount < item.stock) {
        numberCount++;
      }
      else if (action === "down" && numberCount > 1){
        numberCount--;
      }
    }
    return {...item, numberCount};
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  showTripleGoods();
};

function updata() {
  showTripleGoods();
  amountOfCount()
};

updata();


function discount (price) {
  return Math.round(price * (10 / 9))
}
function break_pay (cost) {
  return Math.round(cost / 12)
}

function showTripleGoods() {
  const navThreeProduct = cart.slice(0, 3);
  let threeGoods = ``;

  navThreeProduct.forEach((item) => {
    threeGoods += `
    <div class="triple_good">
      <div class="triple_good_img"><img src="${item?.thumbnail}" alt="png" /></div>
      <div class="triple_good_info">${item?.brand} (${item?.numberCount})</div>
      <div class="triple_good_price">${item?.price} $</div>
      <span onclick="deleteProduct(${item?.id})">x</span>
    </div>
    `;
  });
  triple_goods.innerHTML = threeGoods;
};
showTripleGoods();

function deleteProduct(id) {
  cart = cart.filter((item) => item?.id !== id);  
  localStorage.setItem("cart", JSON.stringify(cart));
  updata()
  calculateCartCost()
}


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
    onClick: function(){} // Callback after click
  }).showToast();
}


function amountOfCount () {
  cartCount.innerHTML = cart.length;
  likeCount.innerHTML = like.length;
};


function calculateCartCost() {
  let allSum = 0;

  cart.forEach((item) => {
    allSum += item?.numberCount * item?.price;
  }); 
  document.querySelector(".all_sum").innerHTML = allSum + "$";
}
calculateCartCost();