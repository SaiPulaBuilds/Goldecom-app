<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Cart</title>
  <style>
    /* Styling omitted for brevity—same as before */
  </style>
</head>
<body>
  <h1>Your Cart</h1>
  <div class="cart-container" id="cartContainer">
    <p>Loading cart items...</p>
  </div>

  <script src="config.js"></script>
  <script>
    const token = localStorage.getItem("token");

    // Redirect if not logged in
    if (!token) {
      alert("Please login to view your cart.");
      window.location.href = "login.html";
    }

    //  GET /api/cart — Fetch cart items
    fetch(`${API_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized or server error");
      return res.json();
    })
    .then(cartItems => {
      const container = document.getElementById("cartContainer");
      container.innerHTML = "";

      if (cartItems.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
      }

      cartItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <img src="${API_URL}${item.productImage}" alt="${item.productName}" />
          <div class="cart-details">
            <h3>${item.productName}</h3>
            <p>₹${item.productPrice}</p>
            <p>Quantity: 
              <button onclick="updateQuantity('${item._id}', -1)">−</button>
              <span id="qty-${item._id}">${item.quantity}</span>
              <button onclick="updateQuantity('${item._id}', 1)">+</button>
            </p>
          </div>
          <div class="cart-actions">
            <button class="remove-btn" onclick="removeFromCart('${item._id}')">Remove</button>
          </div>
        `;
        container.appendChild(div);
      });

      const checkoutBtn = document.createElement("button");
      checkoutBtn.className = "checkout-btn";
      checkoutBtn.textContent = "Proceed to Checkout";
      container.appendChild(checkoutBtn);
    })
    .catch(err => {
      console.error("Error loading cart:", err);
      document.getElementById("cartContainer").innerHTML = "<p>Failed to load cart.</p>";
    });

    //  PATCH /api/cart/:id — Update quantity
    function updateQuantity(cartItemId, change) {
      fetch(`${API_URL}/api/cart/${cartItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ change })
      })
      .then(res => res.json())
      .then(data => {
        if (data.removed) {
          document.getElementById(`qty-${cartItemId}`).closest(".cart-item").remove();
        } else {
          document.getElementById(`qty-${cartItemId}`).textContent = data.newQuantity;
        }
      })
      .catch(err => {
        console.error("Quantity update error:", err);
        alert("Failed to update quantity.");
      });
    }

    //  DELETE /api/cart/:id — Remove item
    function removeFromCart(cartItemId) {
      fetch(`${API_URL}/api/cart/${cartItemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        alert("Item removed from cart.");
        location.reload();
      })
      .catch(err => {
        console.error("Remove error:", err);
        alert("Failed to remove item.");
      });
    }
  </script>
</body>
</html>
