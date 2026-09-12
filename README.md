<div align="center">
Storefront-Commerce — Full-Stack MERN E-Commerce Platform
A production-style shopping app covering browsing, auth, cart, wishlist, checkout, and order history
<br/> <img src="https://skillicons.dev/icons?i=react,vite,tailwind,nodejs,express,mongodb,redux,vercel&theme=dark" />

<br/><br/>

<img src="https://img.shields.io/badge/status-deployed-2e7d32?style=for-the-badge&labelColor=1a1a1a" /> <img src="https://img.shields.io/badge/frontend-React_19_%2B_Vite-646cff?style=for-the-badge&labelColor=1a1a1a" /> <img src="https://img.shields.io/badge/backend-Express_5-000000?style=for-the-badge&labelColor=1a1a1a" /> <img src="https://img.shields.io/badge/database-MongoDB_Atlas-47a248?style=for-the-badge&labelColor=1a1a1a" /> <img src="https://img.shields.io/badge/auth-JWT-fbbf24?style=for-the-badge&labelColor=1a1a1a" /> <img src="https://img.shields.io/badge/state-Redux_Toolkit-764abc?style=for-the-badge&labelColor=1a1a1a" /> </div> <br/>

A visitor browses products, registers or logs in, builds a cart and a wishlist, checks out, and reviews their order history — all backed by a JWT-secured Express API and MongoDB, with the frontend and backend deployed and scaled independently.

<br/>
Table of Contents
What This Project Is
Highlights
System Architecture
Application Flow
Backend — Express API Service
Frontend — React + Vite Application
End-to-End User Flow
Tech Stack
Database Models
API Documentation
Getting the Project Running Locally
Environment Variables
Security Practices
Common Deployment Considerations
Live Demo Links
Known Limitations
Future Improvements
Learning Outcomes
Author
Project Status
<br/>
What This Project Is

Storefront-Commerce is a MERN-style e-commerce application built to demonstrate a complete, production-shaped full-stack workflow. A user can:

Step	What happens
1	Browse the product catalog and open individual product detail pages
2	Register or log in through a JWT-secured auth flow
3	Add products to a personal cart, adjust quantities, or remove items
4	Save products to a wishlist for later
5	Check out, which validates stock and creates an order
6	Review past orders from an order-history page

The project started as a frontend shopping experience and was extended with a custom Express + MongoDB backend. Product, user, cart, wishlist, and order data are all persisted server-side and scoped to the authenticated user — nothing sensitive lives only in the browser.

<br/>
Highlights
<table> <tr> <td width="33%" valign="top">

Full shopping lifecycle

Browse → product detail → cart → wishlist → checkout → order history, all wired to a real backend rather than mock data.

</td> <td width="33%" valign="top">

JWT authentication

Passwords hashed with bcryptjs, sessions backed by a 7-day JWT, and every cart/wishlist/order route scoped to req.user.userId.

</td> <td width="33%" valign="top">

Independent deployments

One GitHub repository, two deployment targets: the React/Vite frontend ships to Vercel, the Express API ships to Render, both talking to MongoDB Atlas.

</td> </tr> </table> <br/>
System Architecture

The project is a single repository containing two independently deployed applications that communicate over a REST API.

deploys
deploys
HTTPS / REST
Mongoose ODM
MongoDB Atlas
Users · ProductsCarts · Wishlists · Orders
Backend — Render
Express 5 REST API
JWT Auth Middleware
Frontend — Vercel
React 19 + Vite
Redux Toolkit+ RTK Query + Axios
GitHubStorefront-Commerce(monorepo)
Layer	Responsibility
Frontend	React 19 SPA (Vite) — product browsing, auth screens, cart, wishlist, checkout, and order history, styled with Tailwind CSS.
Backend	Express 5 REST API — issues and verifies JWTs, enforces per-user data isolation, and runs all cart/wishlist/order business logic.
Database	MongoDB Atlas — five collections (User, Product, Cart, Wishlist, Order) accessed through Mongoose models.
<br/>
Application Flow
Registration & Login
MongoDB
Auth Middleware
Express API
React Frontend
User
MongoDB
Auth Middleware
Express API
React Frontend
User
Submit registration form
1
POST /user/register { name, email, password }
2
bcrypt.hash(password)
3
Save new user
4
user created
5
201 Created
6
Submit login form
7
POST /user/login { email, password }
8
Find user by email
9
user document
10
bcrypt.compare(password, hash)
11
sign JWT (7-day expiry)
12
{ token, user }
13
Store token in auth state
14
Request a protected resource
15
GET /cart (Authorization: Bearer token)
16
verify JWT
17
attach req.user.userId
18
fetch cart scoped to userId
19
cart document
20
cart JSON
21
Stage	Module	Responsibility
Registration	controllers/authController.js	Hashes the incoming password with bcryptjs before creating the User document.
Login	controllers/authController.js	Verifies credentials with bcrypt.compare, then signs a JWT valid for seven days.
Auth middleware	middleware/auth.js, middleware/authMiddleware.js	Verifies the Authorization: Bearer <token> header on every protected route and attaches req.user.userId.
Current user	GET /user/me	Returns the authenticated user's profile, using the token rather than a client-supplied ID.

Every cart, wishlist, and order route reads req.user.userId from the verified token — never from a client-supplied field — so one user can never read or modify another user's data.

<br/>
Cart & Checkout
No
Yes
Product page
Add to Cart
In stock &within limit?
Blocked client-side
MongoDB Cart
Cart Page
Checkout
Validate products,quantity & stock
Create Order+ fixed delivery charge
MongoDB Order
Clear Cart
Order History

The current order implementation validates product existence, requested quantity, and available stock before creating the order — it does not decrement product stock after checkout (see Known Limitations).

<br/>
Backend — Express API Service

Location: Backend/

<details> <summary><b>Backend folder structure</b></summary>
Backend/
├── .gitignore
├── package.json
├── package-lock.json
│
├── config/
│   └── db.js                     # MongoDB connection setup
│
└── src/
    ├── controllers/
    │   ├── authController.js       # Register, login, current user
    │   ├── cartController.js       # Add/update/remove/clear cart
    │   ├── orderController.js      # Create order, order history
    │   ├── productController.js    # List/create/fetch products
    │   └── wishlistController.js   # Add/remove/clear wishlist
    │
    ├── middleware/
    │   ├── auth.js                  # JWT verification
    │   └── authMiddleware.js        # Route-level auth guard
    │
    ├── models/
    │   ├── cart.js
    │   ├── orders.js
    │   ├── product.js
    │   ├── user.js
    │   └── wishlist.js
    │
    ├── routes/
    │   ├── authRoute.js
    │   ├── cartRoute.js
    │   ├── orderRoute.js
    │   ├── productRoutes.js
    │   └── wishlistRoute.js
    │
    └── server.js                    # Express app entry point
</details>
Request Lifecycle
Request
Express Route
Auth Middleware(when required)
Controller
Mongoose Model
MongoDB
JSON Response

Routes are grouped by domain: /user, /product, /cart, /wishlist, /order.

<br/>
Frontend — React + Vite Application

Location: Client/my-project/

<details> <summary><b>Frontend folder structure</b></summary>
Client/my-project/
├── .gitignore
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
│
├── public/
│
└── src/
    ├── Components/
    │   ├── BottomNavbar.jsx
    │   ├── ButtonComp.jsx
    │   ├── Footer.jsx
    │   ├── Loader.jsx
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── QuantityBtn.jsx
    │   ├── ScrollTop.jsx
    │   └── WishlistBtn.jsx
    │
    ├── Layout/
    │   └── Layout.jsx
    │
    ├── Pages/
    │   ├── Cart/          # CartPage.jsx, CartBill.jsx, CartSlice.js, cartAPI.js
    │   ├── ErrorPage/      # ErrorPage.jsx
    │   ├── Home/            # Home.jsx, CategoryCard.jsx
    │   ├── Login/            # LoginPage.jsx, LoginForm.jsx, RegisterForm.jsx, authSlice.js, authService.js
    │   ├── Order/             # OrderPage.jsx, orderSlice.js, orderService.js
    │   ├── Product/            # Products.jsx, CategoryAccordion.jsx, ProductApi.js
    │   ├── ProductPage/         # ProductPage.jsx
    │   ├── Search/               # Search.jsx
    │   └── Wishlist/               # Wishlist.jsx, WishlistSlice.js, wishlistAPI.js
    │
    ├── Store/
    │   └── Store.js                  # Redux store configuration
    │
    ├── Utils/
    │   └── localStorage.js
    │
    ├── __test__/
    │   ├── form.test.jsx
    │   ├── quantityBtn.test.js
    │   └── setup.js
    │
    ├── App.jsx
    ├── index.css
    └── main.jsx
</details>
Pages
Area	Page(s)	Notes
Home	Home.jsx, CategoryCard.jsx	Landing page, category browsing
Product	Products.jsx, ProductPage.jsx	Catalog listing and product detail view
Auth	LoginPage.jsx, RegisterForm.jsx, SigninForm.jsx, UserPage.jsx	Registration, login, and profile
Cart	CartPage.jsx, CartBill.jsx	Cart contents and order summary
Wishlist	Wishlist.jsx	Saved-for-later products
Orders	OrderPage.jsx	Order history
Search	Search.jsx	Client-side product search
Error	ErrorPage.jsx	Fallback / 404 route
State Management
Redux Store
Auth state(authSlice)
Order state(orderSlice)
Product API(RTK Query)
Cart API(RTK Query)
Wishlist API(RTK Query)
Concern	Library
Global state (auth, orders)	Redux Toolkit
Server-state fetching/caching (products, cart, wishlist)	RTK Query
Auth & order HTTP requests	Axios
Client-side routing	React Router
Notifications	React Hot Toast
Animation	Framer Motion
Icons	React Icons

The frontend reads its API base URL from import.meta.env.VITE_API_URL, avoiding a hardcoded backend URL anywhere in the codebase.

<br/>
End-to-End User Flow
No
Yes
Save for later
Buy now
User visits site
Has account?
RegisterPOST /user/register
LoginPOST /user/login
Browse Products
Product Details
What next?
Add to Wishlist
Add to Cart
Checkout
Order Created
Order History
A new visitor registers, or a returning visitor logs in, through the Express /user routes.
Once authenticated, the user browses the catalog and opens product detail pages.
From a product page, the user can save it to their wishlist or add it straight to their cart.
The cart page lets the user adjust quantities or remove items before checking out.
Checkout re-validates product existence, quantity, and stock, then creates an order with a fixed delivery charge.
The order appears in the user's order history, scoped entirely to their account.
<br/>
Tech Stack
<div align="center">
Layer	Technology
Frontend framework	React 19 + Vite
Frontend styling	Tailwind CSS
Frontend state	Redux Toolkit + RTK Query
Frontend HTTP	Axios (auth & orders)
Routing	React Router
Notifications / animation	React Hot Toast, Framer Motion
Testing (frontend)	Vitest, React Testing Library
Backend framework	Express 5 (Node.js)
Database	MongoDB (Mongoose ODM)
Authentication	JWT (jsonwebtoken) + bcryptjs
Cross-origin handling	CORS, Cookie Parser
Config	dotenv
Deployment (frontend)	Vercel
Deployment (backend)	Render
Deployment (database)	MongoDB Atlas
Source control	GitHub
</div> <br/>
Database Models
Model	Key Fields	Notes
User	name, email (unique), password, createdAt, updatedAt	Passwords stored as bcrypt hashes
Product	title, price, description, category, stock, image, rating.rate, rating.count	Backs the catalog and product detail views
Cart	user, items[] → { product, quantity, price }	One cart per user
Wishlist	user, products[] → { _id, title, price, image, category, description }	Stores a product snapshot, not just a reference
Order	user, products[] → { productId, title, price, quantity }, totalAmount, createdAt, updatedAt	Snapshot of ordered items at time of purchase
<br/>
API Documentation

Base production API: https://storefront-commerce.onrender.com

Authentication
Method	Endpoint	Auth	Description
GET	/user/sign-in	No	Sign-in form route
POST	/user/register	No	Register a new user
GET	/user/login	No	Login form route
POST	/user/login	No	Authenticate user, returns JWT
GET	/user/me	Yes	Get current authenticated user
Product
Method	Endpoint	Auth	Description
GET	/product/addProduct	No	Product creation form route
POST	/product/addProduct	No	Create a product
GET	/product/products	No	Get all products
GET	/product/product/:id	No	Get a single product by ID
Cart
Method	Endpoint	Auth	Description
GET	/cart	Yes	Get current user's cart
POST	/cart/add	Yes	Add a product to the cart
PUT	/cart/update	Yes	Update item quantity (must be ≥ 1)
DELETE	/cart/remove/:productId	Yes	Remove a single product
DELETE	/cart/clear	Yes	Clear the entire cart
Wishlist
Method	Endpoint	Auth	Description
POST	/wishlist	Yes	Add a product to the wishlist
GET	/wishlist	Yes	Get the wishlist
DELETE	/wishlist/:id	Yes	Remove a wishlist item
DELETE	/wishlist	Yes	Clear the wishlist
Order
Method	Endpoint	Auth	Description
GET	/order/order	No	Order form route
POST	/order/createOrder	Yes	Create an order from cart items
GET	/order/orders	Yes	Get the current user's order history

Product creation note: POST /product/addProduct is currently unauthenticated — see Known Limitations.

<br/>
Getting the Project Running Locally
Step 1 — Prerequisites

Install Node.js, npm, Git, and either a MongoDB Atlas account or a local MongoDB instance.

Step 2 — Clone the Repository
bash
git clone https://github.com/DeepakChauhan33/Storefront-Commerce.git
cd Storefront-Commerce
Step 3 — Backend Setup
bash
cd Backend
npm install

# create Backend/.env with:
#   MONGO_URI=your_mongodb_connection_string
#   JWT_SECRET=your_jwt_secret
#   CLIENT_URL=http://localhost:5173
#   PORT=8000

npm run dev

The API will be live on the configured port (default 8000).

Step 4 — Frontend Setup
bash
cd Client/my-project
npm install

# create Client/my-project/.env with:
#   VITE_API_URL=http://localhost:8000

npm run dev

The app will be live at http://localhost:5173.

Step 5 — Verify
Register a new account from the frontend.
Add a product to the cart and to the wishlist.
Complete checkout and confirm the order appears in order history.
Step 6 — Deploy to Production
Backend (Render) — root directory Backend; build command npm install; start command npm start; set MONGO_URI, JWT_SECRET, and CLIENT_URL (the deployed Vercel URL).
Frontend (Vercel) — root directory Client/my-project; framework Vite; build command npm run build; output directory dist; set VITE_API_URL to the deployed Render URL, and redeploy after changing it, since Vite injects env vars at build time.
<br/>
Environment Variables
Backend — Backend/.env
env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=8000

For production, CLIENT_URL should be the deployed Vercel frontend URL.

Frontend — Client/my-project/.env
env
VITE_API_URL=http://localhost:8000

For production:

env
VITE_API_URL=https://storefront-commerce.onrender.com

Because Vite exposes every VITE_* variable to the client bundle, never place private secrets — database credentials, JWT signing secrets — in a frontend environment file.

<br/>
Security Practices
Safeguard	Description
Password hashing	All passwords are hashed with bcryptjs before being stored; plain-text passwords are never persisted.
JWT authentication	Every protected resource requires a valid, unexpired JWT.
Per-user data isolation	Cart, wishlist, and order routes use req.user.userId from the verified token rather than a client-supplied ID.
Restricted CORS	The backend allows only the configured CLIENT_URL origin, with credentials enabled.
Environment variables	.env files are excluded via .gitignore; secrets never enter source control.
Frontend secrets	The frontend only ever holds the public VITE_API_URL; database and JWT secrets stay backend-only.
<br/>
Common Deployment Considerations
Consideration	Detail
No localhost in production	Frontend requests must resolve through import.meta.env.VITE_API_URL, pointing at the deployed Render URL — never a hardcoded http://localhost:8000.
Case-sensitive imports	Vercel builds on Linux, so an import like wishlistAPI.js must match the file's exact capitalization; this can silently work on Windows and fail in production.
Never commit env files	.env, .env.local, and .env.production should never be committed — set production values directly in the Render/Vercel dashboards.
<br/>
Live Demo Links
<div align="center">

Live Demo Source Code

</div>
Link	URL
Frontend	https://YOUR-VERCEL-APP.vercel.app (replace with your deployment URL)
Backend API	https://storefront-commerce.onrender.com
Products API	https://storefront-commerce.onrender.com/product/products
Source Code	https://github.com/DeepakChauhan33/Storefront-Commerce
<br/>
Known Limitations
No stock decrement on order — checkout validates available stock but does not reduce it after the order is created.
Unauthenticated product creation — POST /product/addProduct is not currently protected by the auth middleware.
Client-side search only — the search UI filters in the browser rather than querying the backend.
No admin dashboard — there is no protected interface for managing products, stock, or orders.
No payment integration — checkout creates an order record but does not process a real payment.
No order status tracking — orders don't carry a status field (e.g. pending, shipped, delivered).
<br/>
Future Improvements
Inventory management — decrement product stock on order creation using a transaction-safe operation to avoid race conditions.
Order status — add a status field (pending → confirmed → processing → shipped → delivered → cancelled).
Payment integration — connect a real provider such as Stripe or Razorpay.
Admin dashboard — protected screens for adding/editing/deleting products, managing stock, and updating order status.
Product discovery — filtering by price, category, rating, and availability, plus sorting and server-side pagination.
Backend search — move product search from the client to the API for larger catalogs.
Stronger validation — adopt a schema-validation library and centralized Express error-handling middleware.
API documentation — add Swagger/OpenAPI docs.
Expanded testing — cover authentication, product/cart/wishlist/order APIs, protected routes, and error cases.
Performance — response caching, image optimization, lazy loading, and database indexes.
<br/>
Learning Outcomes

This project reflects hands-on experience with React, Vite, Tailwind CSS, React Router, Redux Toolkit, and RTK Query on the frontend; Node.js, Express, MongoDB, Mongoose, JWT authentication, password hashing, and middleware-based route protection on the backend; and the surrounding practices of REST API design, CRUD operations, environment-variable management, CORS, Git/GitHub workflows, and independent Vercel + Render deployment with production frontend–backend communication.

<br/>
Author
	
Name	Deepak Chauhan
Role	Full Stack / MERN Developer
Stack	React · Vite · Tailwind CSS · Redux Toolkit · RTK Query · Node.js · Express.js · MongoDB · Mongoose · JWT · Git · GitHub
<br/>
Project Status
<div align="center">

This repository represents the current deployed state of Storefront-Commerce — a working, end-to-end MERN shopping application spanning authentication, product catalog, cart, wishlist, checkout, and order history, with the frontend and backend deployed independently.

<br/> <img src="https://img.shields.io/badge/lifecycle-browse--to--order-534AB7?style=for-the-badge&labelColor=1a1a1a" /> <img src="https://img.shields.io/badge/auth-JWT%20%2B%20bcrypt-3ecf8e?style=for-the-badge&labelColor=1a1a1a" /> <img src="https://img.shields.io/badge/deploy-Vercel%20%2B%20Render-0F6E56?style=for-the-badge&labelColor=1a1a1a" /> </div>
