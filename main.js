let cart = [];
let total = 0;

document.addEventListener("DOMContentLoaded", () => {
    const addButtons = document.querySelectorAll(".add-btn");
    const orderButton = document.getElementById("order-btn");

    addButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const product = btn.dataset.product;
            const price = parseInt(btn.dataset.price);
            addToCart(product, price);
        });
    });

    orderButton.addEventListener("click", orderNow);
});

// ➕ إضافة منتج
function addToCart(product, price){
    const existingItem = cart.find(item => item.product === product);

    if(existingItem){
        existingItem.quantity++;
        total += price;
    } else {
        cart.push({ product, price, quantity: 1 });
        total += price;
    }
    renderCart();
}

// ➕ زيادة الكمية
function increaseQuantity(index){
    cart[index].quantity++;
    total += cart[index].price;
    renderCart();
}

// ➖ تقليل الكمية
function decreaseQuantity(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
        total -= cart[index].price;
    }
    renderCart();
}

// ❌ مسح المنتج كله
function removeItem(index){
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    renderCart();
}

// 🛒 عرض الكارت
function renderCart(){
    const list = document.getElementById("cart-list");
    list.innerHTML = "";

    cart.forEach((item, i) => {
        const li = document.createElement("li");

        const title = document.createElement("span");
        title.textContent = `${item.product} - $${item.price * item.quantity}`;

        const controls = document.createElement("div");

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.addEventListener("click", () => decreaseQuantity(i));

        const qty = document.createElement("span");
        qty.textContent = item.quantity;
        qty.style.margin = "0 8px";

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.addEventListener("click", () => increaseQuantity(i));

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.style.background = "#ef4444";
        removeBtn.addEventListener("click", () => removeItem(i));

        controls.appendChild(minusBtn);
        controls.appendChild(qty);
        controls.appendChild(plusBtn);
        controls.appendChild(removeBtn);

        li.appendChild(title);
        li.appendChild(controls);
        list.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

// ✅ تأكيد الطلب
function orderNow() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("✅ Your order is confirmed!");
        cart = [];
        total = 0;
        renderCart();
    }
}