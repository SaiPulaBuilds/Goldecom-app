#  Gold Ecommerce App — Learning Routing & Backend Frameworks

##  Purpose
This project helps me understand how routing works in both frontend and backend, and how they communicate in a full-stack web application. I'm building this to learn how pages load, how data flows, and how servers respond to requests.

---

##  Project Structure

### Frontend
- Built with HTML, CSS, and JavaScript
- Pages: `index.html`, `register.html`, `cart.html`
- Hosted on Netlify
- Uses `fetch()` to talk to backend APIs

### Backend
- Built with Node.js and Express
- Routes:
  - `POST /register` → handles user registration
  - `POST /login` → handles login and returns JWT
  - `GET /api/products` → returns product list
  - `POST /api/cart` → adds product to cart
- Connected to MongoDB Atlas
- Hosted on Render

---

## Routing Concepts I'm Learning

###  Frontend Routing
- Static routing: clicking links like `<a href="/register.html">` loads pages
- No frontend framework yet (like React), so routing is file-based
- After deployment, I need to update links to match the live domain

###  Backend Routing
- Express handles incoming requests based on URL and method
- Example:
  ```js
  app.post('/register', (req, res) => {
    // Save user to database
  });
