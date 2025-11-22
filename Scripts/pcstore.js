

const buttons = document.querySelectorAll(".add-cart");


const products = [
    { id: 1, name: "PC i5 / RTX 4060", price: 17500000, img: "img/pc1.jpg" },
    { id: 2, name: "PC i7 / RTX 4070", price: 29900000, img: "img/pc2.jpg" },
    { id: 3, name: "PC Ryzen 5 / RTX 3060", price: 13900000, img: "img/pc3.jpg" },
    { id: 4, name: "PC i5 / RTX 4060 Ti", price: 21500000, img: "img/pc4.jpg" },
    { id: 5, name: "PC Ryzen 7 / RTX 4080", price: 45000000, img: "img/pc5.jpg" },
    { id: 6, name: "PC i3 / GTX 1650", price: 9500000, img: "img/pc6.jpg" },
];


buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let id = btn.getAttribute("data-id");
        addToCart(id);
   
    });
});

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id == id);

    let exist = cart.find(item => item.id == id);
    if (exist) {
        exist.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));


    showToast("✅ Đã thêm vào giỏ hàng");


    setTimeout(() => {
        window.location.href = "cart.html";
    }, 600);


}


function searchProduct() {
    let input = document.getElementById("search")?.value.toLowerCase() || "";
    let cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        let name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(input) ? "block" : "none";
    });
}


if (document.getElementById("cartItems")) {
    renderCart();
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");
    let totalEl = document.getElementById("total");
    let total = 0;

    container.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.qty;
        container.innerHTML += `
      <div class="cart-row">
        <img src="${item.img}" />
        <div>
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString()} ₫</p>
        </div>
        <span>x${item.qty}</span>
      </div>
    `;
    });

    totalEl.innerText = total.toLocaleString() + " ₫";
}
const buttons = document.querySelectorAll(".add-cart");


buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let id = btn.getAttribute("data-id");
        addToCart(id);
    });
});
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((sum, item) => sum + item.qty, 0);

    const cartEl = document.getElementById("cart-count");
    if (cartEl) cartEl.textContent = count;
}
updateCartCount();

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}





