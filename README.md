# Gold Ecommerce App

> Full-stack ecommerce prototype built to explore routing, authentication, and frontend/backend integration using Node.js, Express, MongoDB, and vanilla JS.

---

##  Tech Stack

| Layer       | Tech                                |
|-------------|-------------------------------------|
| Frontend    | HTML, CSS, JavaScript               |
| Backend     | Node.js, Express                    |
| Database    | MongoDB Atlas                       |
| Auth        | JWT (JSON Web Tokens)               |
| Deployment  | Vercel (frontend), Render (backend) |

---

##  Live URLs

- **Frontend**: [goldecom-app-7aev-git-main-sai-pulas-projects.vercel.app](https://goldecom-app-7aev-git-main-sai-pulas-projects.vercel.app)
- **Backend**: [https://your-backend.onrender.com](https://goldecom-app.onrender.com)

---

##  Routing Overview

### Frontend

- Static file-based routing (`index.html`, `register.html`, `cart.html`)
- Navigation via anchor tags (`<a href="register.html">`)
- Uses `fetch()` to communicate with backend APIs
- Configured with dynamic `API_URL` in `config.js` for environment switching

### Backend

- Modular Express routes:
  - `POST /register` → user registration
  - `POST /login` → JWT-based login
  - `GET /api/products` → product listing
  - `POST /api/cart` → add to cart
  - `GET /api/cart` → fetch cart items
  - `PATCH /api/cart/:id` → update quantity
  - `DELETE /api/cart/:id` → remove item
- Middleware:
  - JWT verification for protected routes
  - Error handling and response formatting

---

##  Features Implemented

-  User registration with password confirmation
-  JWT-based login and token storage in `localStorage`
-  Cart functionality with quantity updates and item removal
-  Dynamic rendering of cart items with image, name, price
-  Responsive layout using CSS Grid and Flexbox
-  MongoDB schema for users, products, and cart items

---

##  Dev Notes

- Frontend hosted on Vercel via Git integration
- Backend deployed on Render with environment variables
- CORS configured to allow frontend domain
- API endpoints tested with Postman and browser fetch
- Error handling includes token checks, 401/403 responses, and server logs

---

## Learning Goals

- Understand full-stack routing and request/response lifecycle
- Practice modular backend architecture with Express
- Learn how frontend and backend communicate via REST APIs
- Deploy and debug live environments with Vercel and Render
- Handle authentication and protected routes using JWT

---
