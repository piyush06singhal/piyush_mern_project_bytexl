var foods = [
  {
    id: 1,
    name: "Classic Cheese Burger",
    restaurant: "Burger House",
    category: "burger",
    price: 149,
    rating: "4.5",
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Veggie Burger",
    restaurant: "Green Grill",
    category: "burger",
    price: 129,
    rating: "4.2",
    time: "20 min",
    image:
      "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    restaurant: "Pizza Corner",
    category: "pizza",
    price: 229,
    rating: "4.6",
    time: "30 min",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Paneer Tikka Pizza",
    restaurant: "Hot Slice",
    category: "pizza",
    price: 269,
    rating: "4.7",
    time: "35 min",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Butter Paneer Meal",
    restaurant: "Spice Kitchen",
    category: "indian",
    price: 199,
    rating: "4.4",
    time: "28 min",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Masala Dosa",
    restaurant: "South Cafe",
    category: "indian",
    price: 119,
    rating: "4.3",
    time: "18 min",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Chocolate Brownie",
    restaurant: "Sweet Box",
    category: "dessert",
    price: 99,
    rating: "4.8",
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Strawberry Ice Cream",
    restaurant: "Creamy Treat",
    category: "dessert",
    price: 89,
    rating: "4.1",
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
  },
];

var foodGrid = document.getElementById("foodGrid");
var searchInput = document.getElementById("searchInput");
var filterButtons = document.querySelectorAll(".filter-btn");
var cartItems = document.getElementById("cartItems");
var totalPrice = document.getElementById("totalPrice");
var checkoutForm = document.getElementById("checkoutForm");
var orderMessage = document.getElementById("orderMessage");
var menuBtn = document.getElementById("menuBtn");
var navLinks = document.getElementById("navLinks");
var resultText = document.getElementById("resultText");
var cartCount = document.getElementById("cartCount");

var selectedCategory = "all";
var cart = JSON.parse(localStorage.getItem("freshbiteCart")) || [];

function saveCart() {
  localStorage.setItem("freshbiteCart", JSON.stringify(cart));
}

function showFoods() {
  var searchText = searchInput.value.toLowerCase();
  var foundCount = 0;
  foodGrid.innerHTML = "";

  foods.forEach(function (food) {
    var correctCategory =
      selectedCategory === "all" || food.category === selectedCategory;
    var correctSearch =
      food.name.toLowerCase().includes(searchText) ||
      food.restaurant.toLowerCase().includes(searchText);

    if (correctCategory && correctSearch) {
      foundCount++;
      var card = document.createElement("div");
      card.className = "food-card";
      card.innerHTML = `
                <img src="${food.image}" alt="${food.name}">
                <div class="food-info">
                    <h3>${food.name}</h3>
                    <p class="restaurant">${food.restaurant}</p>
                    <div class="food-meta">
                        <span>Rating ${food.rating}</span>
                        <span>${food.time}</span>
                    </div>
                    <div class="price-row">
                        <span class="price">Rs. ${food.price}</span>
                        <button class="add-btn" data-id="${food.id}">Add to Cart</button>
                    </div>
                </div>`;
      foodGrid.appendChild(card);
    }
  });

  resultText.textContent = foundCount + " food items found";

  if (foundCount === 0) {
    foodGrid.innerHTML =
      "<p class='empty-cart'>No food found. Try another search.</p>";
  }

  addFoodButtonEvents();
}

function addFoodButtonEvents() {
  var addButtons = document.querySelectorAll(".add-btn");

  addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var id = Number(button.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

function addToCart(id) {
  var food = foods.find(function (item) {
    return item.id === id;
  });
  var cartFood = cart.find(function (item) {
    return item.id === id;
  });

  if (cartFood) {
    cartFood.quantity++;
  } else {
    cart.push({ id: food.id, name: food.name, price: food.price, quantity: 1 });
  }

  saveCart();
  showCart();
}

function changeQuantity(id, change) {
  var item = cart.find(function (cartItem) {
    return cartItem.id === id;
  });

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    removeItem(id);
  } else {
    saveCart();
    showCart();
  }
}

function removeItem(id) {
  cart = cart.filter(function (item) {
    return item.id !== id;
  });
  saveCart();
  showCart();
}

function showCart() {
  var total = 0;
  var itemsCount = 0;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
  }

  cart.forEach(function (item) {
    total += item.price * item.quantity;
    itemsCount += item.quantity;

    var row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>Rs. ${item.price} each</p>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" data-id="${item.id}" data-change="-1">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-id="${item.id}" data-change="1">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>`;

    cartItems.appendChild(row);
  });

  totalPrice.textContent = "Rs. " + total;
  cartCount.textContent = itemsCount;
  addCartButtonEvents();
}

function addCartButtonEvents() {
  var quantityButtons = document.querySelectorAll(".qty-btn");
  var removeButtons = document.querySelectorAll(".remove-btn");

  quantityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var id = Number(button.getAttribute("data-id"));
      var change = Number(button.getAttribute("data-change"));
      changeQuantity(id, change);
    });
  });

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var id = Number(button.getAttribute("data-id"));
      removeItem(id);
    });
  });
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    selectedCategory = button.getAttribute("data-category");
    showFoods();
  });
});

searchInput.addEventListener("input", showFoods);

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (cart.length === 0) {
    orderMessage.style.color = "crimson";
    orderMessage.textContent = "Please add at least one item to the cart.";
    return;
  }

  checkoutForm.reset();
  cart = [];
  saveCart();
  showCart();

  orderMessage.style.color = "seagreen";
  orderMessage.textContent = alert(
    "Order placed successfully! This is a demo checkout.",
  );
});

showFoods();
showCart();
