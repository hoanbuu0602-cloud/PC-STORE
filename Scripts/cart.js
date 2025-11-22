let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
    let container = document.getElementById("cartItems");
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Giỏ hàng trống.</p>";
        document.getElementById("total").innerText = "0 ₫";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div style="
                display:flex;
                gap:20px;
                align-items:center;
                padding:15px;
                border:1px solid #ccc;
                border-radius:10px;">
                
                <img src="${item.img}" style="width:120px;border-radius:8px;">

                <div style="flex:1;">
                    <h3>${item.name}</h3>
                    <p style="font-size:18px;color:#555;">
                        Giá: ${item.price.toLocaleString()} ₫
                    </p>

                    <div style="display:flex;align-items:center;gap:10px;font-size:18px;">
                        <button onclick="changeQty(${index}, -1)"
                                style="padding:5px 10px;">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQty(${index}, 1)"
                                style="padding:5px 10px;">+</button>
                    </div>
                </div>

                <button onclick="removeItem(${index})"
                        style="padding:8px 12px;background:#ff3b3b;color:white;border:none;border-radius:6px;cursor:pointer;">
                    Xóa
                </button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total.toLocaleString() + " ₫";
}

function changeQty(i, amount) {
    cart[i].quantity += amount;

    // Nếu giảm xuống 0 → xoá sản phẩm
    if (cart[i].quantity <= 0) {
        cart.splice(i, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    alert("Thanh toán thành công!");
    localStorage.removeItem("cart");
    cart = [];
    loadCart();
}

loadCart();
