let likeProducts = document.querySelector(".like_products");
// let likeCount = document.querySelector(".like_count");

// let like = JSON.parse(localStorage.getItem("like") || "[]");

console.log(like)


function showAllLike() {
  let allLike = ``;

  if (like.length) {
    like?.forEach((item) => {
      allLike += `
            <div class="like_product">
                <div class="like_img">
                    <img src="${item?.thumbnail}" alt="png">
                </div>
                <div class="like_info">
                    <p>${item?.title}</p>
                     <span>${item?.brand}</span>
                </div>
                <div class="like_cost">
                    <del>${discount(item?.price)} $</del>
                    <span>${item.price}</span>
                    <p>${break_pay(item?.price)} $ / 12 months</p>
                </div>
                <div class="like_btn">
                    <button onclick="addToCart(${item?.id})">Savatga qo'shish</button>
                    <button onclick="deleteProduct(${item?.id})">O'chirish</button>
                </div>
            </div>`;
    });
    likeProducts.innerHTML = allLike;
  }
  else {
    allLike = `
        <div class="thereisno">
            <img src="./Images/like.png" alt="no" />
        </div>`;
    likeProducts.innerHTML = allLike;
  }
}

showAllLike();


function addToLike(id) {
  let likeItem = allData?.find((item) => item.id === id);

  if (cart?.some((item) => item?.id === id)) {
    toast("There is product");
  }
  else {
    cart.push(likeItem);
    likeCount.innerHTML = like.length;
    toast("Added to favorites successfully!")
  }
  localStorage.setItem("like", JSON.stringify(like));
}

function addToCart(id) {

  if (cart?.some((item) => item?.id === id)) {
    numberOfStock("up", id);
    toast("Added one more!");
  }
  else {
    let cartItem = allData?.find((item) => item.id === id);
    cart.push({ ...cartItem, numberCount: 1 });
    cartCount.innerHTML = cart.length;
    toast("Added to cart successfully!")
    localStorage.setItem("cart", JSON.stringify(cart));
    showTripleGoods();
  }
  calculateCartCost();
}

function discount(price) {
  return Math.round(price * (10 / 9))
}
function break_pay(cost) {
  return Math.round(cost / 12)
}

function deleteProduct(id) {
  like = like.filter((item) => item?.id !== id);
  localStorage.setItem("like", JSON.stringify(like));
  updata()
  showAllLike()
}
function updata() {
  showTripleGoods();
  amountOfCount()
};

updata();
function calculateCartCost() {
  let allSum = 0;

  cart.forEach((item) => {
    allSum += item?.numberCount * item?.price;
  });
  document.querySelector(".all_sum").innerHTML = allSum + "$";
}
calculateCartCost();