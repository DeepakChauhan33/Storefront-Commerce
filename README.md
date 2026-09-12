Storefront-Commerce

A full-stack e-commerce web application built with React, Vite,
Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication.

The project provides a complete shopping flow for users: browsing
products, viewing product details, registering and logging in, managing
a cart, managing a wishlist, checking out, and viewing order history.

The application is organized as a single repository containing separate
frontend and backend applications and is deployed independently:

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Live Application

Replace the frontend URL below with your actual Vercel deployment URL.

Frontend: https://YOUR-VERCEL-APP.vercel.app

Backend API: https://storefront-commerce.onrender.com

Products API:
https://storefront-commerce.onrender.com/product/products

Table of Contents

Project Overview

Key Features

Application Flow

Architecture

Technology Stack

Project Structure

Frontend Architecture

Backend Architecture

Authentication

Product Management

Cart Management

Wishlist Management

Order Management

Database Models

API Documentation

Environment Variables

Local Development Setup

Running the Project

Testing

Production Deployment

CORS Configuration

Security Practices

Common Deployment
Considerations

Future Improvements

Learning Outcomes

Author

Project Overview

Storefront-Commerce is a MERN-style e-commerce application designed
to demonstrate a complete full-stack development workflow.

The project started with a frontend shopping experience and was extended
with a custom Express/MongoDB backend. Product data, users, carts,
wishlists, and orders are handled through backend APIs and persisted in
MongoDB.

The frontend communicates with the backend using:

Axios for authentication and order service requests

Redux Toolkit Query (RTK Query) for product, cart, and wishlist
API communication

Redux Toolkit for application state such as authentication and
order history

The backend exposes REST-style endpoints and protects user-specific
resources with JWT authentication.

Main user journey

Browse Products
      ↓
View Product Details
      ↓
Register / Login
      ↓
Add Products to Cart
      ↓
Update Quantity / Remove Items
      ↓
Manage Wishlist
      ↓
Checkout
      ↓
Create Order
      ↓
View Order History

Key Features

Authentication

User registration

User login

Password hashing with bcryptjs

JWT-based authentication

Protected API routes

Current-user endpoint

Seven-day JWT expiration

Logout through frontend authentication state

Product Features

Product listing

Product detail page

Product categories

Product search UI

Product images

Product pricing

Product ratings

Product stock information

Product API integration

Shopping Cart

Add product to cart

Prevent adding unavailable products

Prevent increasing quantity beyond available stock

Update product quantity

Remove individual products

Clear entire cart

Cart persistence through MongoDB

User-specific carts

Cart data populated with product information

Wishlist

Add products to wishlist

Prevent duplicate wishlist entries

View wishlist

Remove individual wishlist products

Clear wishlist

User-specific wishlist

Orders

Create an order from cart items

Validate products before creating an order

Validate requested quantity

Validate available stock

Add delivery charge

Store order history per user

Display previous orders

UI / UX

Responsive React interface

Tailwind CSS styling

Responsive navigation

Mobile bottom navigation

Product cards

Loading states

Error page

Toast notifications

Quantity controls

Scroll-to-top behavior

Product category UI

Animated UI elements using Framer Motion

Development

Vite development environment

ESLint configuration

Vitest test setup

React Testing Library

Environment-based API URL configuration

Separate frontend and backend deployment

Application Flow

1. User Registration

The user submits:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
}

The backend hashes the password using bcryptjs before storing the
user.

Frontend
   ↓
POST /user/register
   ↓
Express Controller
   ↓
bcrypt password hashing
   ↓
MongoDB User collection

2. User Login

The user submits email and password.

The backend:

Finds the user by email.

Compares the submitted password with the hashed password.

Creates a JWT if the credentials are valid.

Returns the token and basic user information.

Frontend
   ↓
POST /user/login
   ↓
Validate credentials
   ↓
bcrypt.compare()
   ↓
JWT creation
   ↓
Token returned to frontend

3. Authenticated Requests

For protected APIs, the frontend sends:

Authorization: Bearer <JWT_TOKEN>

The authentication middleware verifies the token and attaches the user
ID to:

req.user.userId

This allows the backend to retrieve only the authenticated user's cart,
wishlist, and orders.

4. Cart and Checkout

Product
   ↓
Add to Cart
   ↓
MongoDB Cart
   ↓
Cart Page
   ↓
Checkout
   ↓
Create Order
   ↓
MongoDB Order
   ↓
Clear Cart
   ↓
Order History

The current order implementation validates product existence and stock
before creating the order. It does not decrement product stock after
checkout.

Architecture

                         ┌───────────────────────┐
                         │       GitHub           │
                         │ Storefront-Commerce    │
                         └───────────┬───────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                    ▼                                 ▼
          ┌──────────────────┐              ┌──────────────────┐
          │ Vercel           │              │ Render           │
          │ React + Vite     │              │ Node + Express   │
          └────────┬─────────┘              └────────┬─────────┘
                   │                                  │
                   │ HTTP / REST API                  │
                   └─────────────────────────────────►
                                                      │
                                                      ▼
                                             ┌──────────────────┐
                                             │ MongoDB Atlas     │
                                             │                  │
                                             │ Users             │
                                             │ Products          │
                                             │ Carts             │
                                             │ Wishlists         │
                                             │ Orders            │
                                             └──────────────────┘

Technology Stack

Frontend

Technology              Purpose

React 19                UI development
Vite                    Development server and production build
Tailwind CSS            Styling
Redux Toolkit           Application state
RTK Query               API data fetching and caching
Axios                   HTTP requests
React Router            Client-side routing
React Hot Toast         Notifications
Framer Motion           UI animations
React Icons             Icons
Vitest                  Testing
React Testing Library   Component testing

Backend

Technology      Purpose

Node.js         JavaScript runtime
Express 5       REST API framework
MongoDB         Database
Mongoose        MongoDB ODM
JWT             Authentication
bcryptjs        Password hashing
CORS            Cross-origin communication
Cookie Parser   Cookie parsing
dotenv          Environment configuration

Deployment

Service         Responsibility

GitHub          Source code repository
Vercel          React/Vite frontend
Render          Express backend
MongoDB Atlas   Cloud database

Project Structure

Storefront-Commerce/
│
├── Backend/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   │
│   ├── config/
│   │   └── db.js
│   │
│   └── src/
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── cartController.js
│       │   ├── orderController.js
│       │   ├── productController.js
│       │   └── wishlistController.js
│       │
│       ├── middleware/
│       │   ├── auth.js
│       │   └── authMiddleware.js
│       │
│       ├── models/
│       │   ├── cart.js
│       │   ├── orders.js
│       │   ├── product.js
│       │   ├── user.js
│       │   └── wishlist.js
│       │
│       ├── routes/
│       │   ├── authRoute.js
│       │   ├── cartRoute.js
│       │   ├── orderRoute.js
│       │   ├── productRoutes.js
│       │   └── wishlistRoute.js
│       │
│       └── server.js
│
├── Client/
│   └── my-project/
│       ├── .gitignore
│       ├── package.json
│       ├── package-lock.json
│       ├── index.html
│       ├── vite.config.js
│       │
│       ├── public/
│       │
│       └── src/
│           ├── Components/
│           │   ├── BottomNavbar.jsx
│           │   ├── ButtonComp.jsx
│           │   ├── Footer.jsx
│           │   ├── Loader.jsx
│           │   ├── Navbar.jsx
│           │   ├── ProductCard.jsx
│           │   ├── QuantityBtn.jsx
│           │   ├── ScrollTop.jsx
│           │   └── WishlistBtn.jsx
│           │
│           ├── Images/
│           │
│           ├── Layout/
│           │   └── Layout.jsx
│           │
│           ├── Pages/
│           │   ├── Cart/
│           │   │   ├── CartBill.jsx
│           │   │   ├── CartPage.jsx
│           │   │   ├── CartSlice.js
│           │   │   └── cartAPI.js
│           │   │
│           │   ├── ErrorPage/
│           │   │   └── ErrorPage.jsx
│           │   │
│           │   ├── Home/
│           │   │   ├── CategoryCard.jsx
│           │   │   └── Home.jsx
│           │   │
│           │   ├── Login/
│           │   │   ├── LoginForm.jsx
│           │   │   ├── LoginPage.jsx
│           │   │   ├── RegisterForm.jsx
│           │   │   ├── SigninForm.jsx
│           │   │   ├── UserPage.jsx
│           │   │   ├── authService.js
│           │   │   └── authSlice.js
│           │   │
│           │   ├── Order/
│           │   │   ├── OrderPage.jsx
│           │   │   ├── orderService.js
│           │   │   └── orderSlice.js
│           │   │
│           │   ├── Product/
│           │   │   ├── CategoryAccordion.jsx
│           │   │   ├── ProductApi.js
│           │   │   └── Products.jsx
│           │   │
│           │   ├── ProductPage/
│           │   │   └── ProductPage.jsx
│           │   │
│           │   ├── Search/
│           │   │   └── Search.jsx
│           │   │
│           │   └── Wishlist/
│           │       ├── Wishlist.jsx
│           │       ├── WishlistSlice.js
│           │       └── wishlistAPI.js
│           │
│           ├── Store/
│           │   └── Store.js
│           │
│           ├── Utils/
│           │   └── localStorage.js
│           │
│           ├── __test__/
│           │   ├── form.test.jsx
│           │   ├── quantityBtn.test.js
│           │   └── setup.js
│           │
│           ├── App.jsx
│           ├── index.css
│           └── main.jsx
│
└── README.md

Frontend Architecture

The frontend follows a feature/page-oriented structure.

Components

Reusable UI components are stored in:

src/Components/

Examples include:

Navbar

Footer

ProductCard

QuantityBtn

WishlistBtn

Loader

ButtonComp

Pages

Application screens are organized under:

src/Pages/

Main areas include:

Home

Login

Products

Product Details

Cart

Wishlist

Orders

Search

Error Page

State Management

Redux Toolkit is used for global application state.

The project also uses RTK Query for server-side API data.

Redux Store
│
├── Authentication state
├── Order state
├── Product API
├── Cart API
└── Wishlist API

API Communication

The frontend uses:

import.meta.env.VITE_API_URL

as the production API base URL.

This avoids hardcoding the deployed backend URL throughout the
application.

Backend Architecture

The backend follows a controller-route-model structure.

Request
   ↓
Express Route
   ↓
Authentication Middleware (when required)
   ↓
Controller
   ↓
Mongoose Model
   ↓
MongoDB
   ↓
JSON Response

Routes

Routes are grouped by domain:

/user
/product
/cart
/wishlist
/order

Controllers

Controllers contain request handling and business logic.

controllers/
├── authController.js
├── cartController.js
├── orderController.js
├── productController.js
└── wishlistController.js

Models

Mongoose models represent database collections:

models/
├── User
├── Product
├── Cart
├── Wishlist
└── Order

Authentication

Authentication is implemented using:

bcryptjs

jsonwebtoken

Express middleware

Registration

POST /user/register

Request:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

The password is hashed before it is stored.

Login

POST /user/login

Response contains:

{
  "message": "login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

The JWT expires after seven days.

Current User

GET /user/me

Requires:

Authorization: Bearer <token>

Product Management

Products are stored in MongoDB and exposed through the product API.

Product fields

title
price
description
category
stock
image
rating.rate
rating.count

Get all products

GET /product/products

Production endpoint:

https://storefront-commerce.onrender.com/product/products

Get product by ID

GET /product/product/:id

Product creation

POST /product/addProduct

The current backend route is available for product creation and is not
protected by the authentication middleware.

Cart Management

Each authenticated user has a unique cart.

The cart stores:

user
items[]
    product
    quantity
    price

Get Cart

GET /cart

Authentication required.

Add to Cart

POST /cart/add

Request:

{
  "productId": "PRODUCT_ID"
}

The backend checks:

Product ID exists

Product exists

Product is in stock

Requested quantity does not exceed available stock when increasing
an existing cart item

Update Quantity

PUT /cart/update

Request:

{
  "productId": "PRODUCT_ID",
  "quantity": 2
}

Quantity must be an integer greater than or equal to 1.

Remove Product

DELETE /cart/remove/:productId

Clear Cart

DELETE /cart/clear

All cart endpoints require authentication.

Wishlist Management

Wishlist data is associated with the authenticated user.

Get Wishlist

GET /wishlist

Add to Wishlist

POST /wishlist

Remove Wishlist Item

DELETE /wishlist/:id

Clear Wishlist

DELETE /wishlist

All wishlist endpoints require authentication.

The wishlist stores product snapshot information such as:

_id
title
price
image
category
description

Order Management

Orders belong to the authenticated user.

Create Order

POST /order/createOrder

Request structure:

{
  "products": [
    {
      "productId": "PRODUCT_ID",
      "title": "Product Name",
      "price": 100,
      "quantity": 2
    }
  ]
}

The backend validates:

Order contains at least one product

Product ID exists

Quantity is at least 1

Product exists

Requested quantity does not exceed current stock

A fixed delivery charge of 50 is added to the calculated product
total.

The order stores a snapshot of:

productId
title
price
quantity

Get Order History

GET /order/orders

Only the authenticated user's orders are returned.

Current stock behavior

The order creation process checks stock availability but does not
currently decrement the product's stock after an order is created.

This can be implemented as a future enhancement.

Database Models

User

User
├── name
├── email
├── password
├── createdAt
└── updatedAt

The email field is unique.

Passwords are stored as bcrypt hashes.

Product

Product
├── title
├── price
├── description
├── category
├── stock
├── image
└── rating
    ├── rate
    └── count

Cart

Cart
├── user
└── items[]
    ├── product
    ├── quantity
    └── price

Each user has one unique cart.

Wishlist

Wishlist
├── user
└── products[]
    ├── _id
    ├── title
    ├── price
    ├── image
    ├── category
    └── description

Order

Order
├── user
├── products[]
│   ├── productId
│   ├── title
│   ├── price
│   └── quantity
├── totalAmount
├── createdAt
└── updatedAt

API Documentation

Base production API:

https://storefront-commerce.onrender.com

Authentication APIs

Method   Endpoint             Auth Description

GET      /user/sign-in        No Sign-in form route
POST     /user/register       No Register user
GET      /user/login          No Login form route
POST     /user/login          No Authenticate user
GET      /user/me            Yes Get current user

Product APIs

Method   Endpoint                   Auth Description

GET      /product/addProduct        No Product form route
POST     /product/addProduct        No Create product
GET      /product/products          No Get all products
GET      /product/product/:id       No Get product by ID

Cart APIs

Method   Endpoint                      Auth Description

GET      /cart                        Yes Get current user's cart
POST     /cart/add                    Yes Add product to cart
PUT      /cart/update                 Yes Update quantity
DELETE   /cart/remove/:productId      Yes Remove product
DELETE   /cart/clear                  Yes Clear cart

Wishlist APIs

Method   Endpoint            Auth Description

POST     /wishlist          Yes Add product
GET      /wishlist          Yes Get wishlist
DELETE   /wishlist/:id      Yes Remove wishlist item
DELETE   /wishlist          Yes Clear wishlist

Order APIs

Method   Endpoint                 Auth Description

GET      /order/order             No Order form route
POST     /order/createOrder      Yes Create order
GET      /order/orders           Yes Get user's orders

Environment Variables

Environment variables are intentionally excluded from Git.

Backend

Create:

Backend/.env

Example:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=8000

For production, CLIENT_URL should contain the deployed Vercel frontend
URL:

CLIENT_URL=https://your-vercel-app.vercel.app

Do not commit .env files.

Frontend

Create:

Client/my-project/.env

Example:

VITE_API_URL=http://localhost:8000

For production:

VITE_API_URL=https://storefront-commerce.onrender.com

Because Vite exposes VITE_* variables to the client bundle, never put
private secrets such as database passwords or JWT signing secrets in
frontend environment variables.

Local Development Setup

Prerequisites

Install:

Node.js

npm

MongoDB Atlas account or a local MongoDB instance

Git

Clone the Repository

git clone https://github.com/DeepakChauhan33/Storefront-Commerce.git

cd Storefront-Commerce

Backend Setup

Navigate to the backend:

cd Backend

Install dependencies:

npm install

Create:

.env

Add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=8000

Start the development server:

npm run dev

Or run the production-style start command:

npm start

The backend will run locally on the configured port.

Frontend Setup

Open another terminal.

Navigate to:

cd Client/my-project

Install dependencies:

npm install

Create:

.env

Add:

VITE_API_URL=http://localhost:8000

Start Vite:

npm run dev

The frontend will normally be available at:

http://localhost:5173

Running the Project

You need two development processes.

Terminal 1 --- Backend

cd Backend
npm run dev

Terminal 2 --- Frontend

cd Client/my-project
npm run dev

Then open the Vite development URL shown in the terminal.

Testing

The frontend contains a Vitest test setup with React Testing Library.

Tests are located in:

Client/my-project/src/__test__/

Current test files include:

form.test.jsx
quantityBtn.test.js
setup.js

Run the test suite with:

npm test

The frontend also provides:

npm run lint

for ESLint checks.

Build the production frontend with:

npm run build

Preview the production build with:

npm run preview

Production Deployment

The repository intentionally contains both applications in one GitHub
repository.

Storefront-Commerce/
├── Backend/
└── Client/
    └── my-project/

They are deployed independently.

Backend Deployment --- Render

Create a Render Web Service connected to:

DeepakChauhan33/Storefront-Commerce

Use:

Root Directory:
Backend

Build command:

npm install

Start command:

npm start

Required environment variables:

MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=https://your-vercel-app.vercel.app

The deployed backend is currently available at:

https://storefront-commerce.onrender.com

Frontend Deployment --- Vercel

Create a Vercel project from the same GitHub repository.

Set:

Root Directory:
Client/my-project

Framework:

Vite

Install command:

npm install

Build command:

npm run build

Output directory:

dist

Add the production environment variable:

VITE_API_URL

Value:

https://storefront-commerce.onrender.com

After changing Vite environment variables, redeploy the frontend because
the value is injected during the Vite build.

CORS Configuration

The backend uses the frontend URL from the environment:

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

Local development:

CLIENT_URL=http://localhost:5173

Production:

CLIENT_URL=https://your-vercel-app.vercel.app

This allows the deployed React frontend to communicate with the deployed
Express backend.

Security Practices

The project follows several basic security practices:

Environment variables

Sensitive configuration is kept outside the source code.

.env

files are excluded through .gitignore.

Password hashing

Passwords are hashed using:

bcryptjs

Plain-text passwords are not intentionally stored in the database.

JWT authentication

Protected resources require a valid JWT.

User-specific resources

Cart, wishlist, and order endpoints use the authenticated user's ID
rather than accepting an arbitrary user ID from the client.

CORS

The backend restricts cross-origin requests to the configured frontend
origin.

Frontend secrets

The frontend only uses the public API URL through:

VITE_API_URL

Private database credentials and JWT secrets remain on the backend.

Common Deployment Considerations

Localhost should not be used in production

Frontend API requests should use:

https://storefront-commerce.onrender.com

instead of:

http://localhost:8000

The frontend uses:

import.meta.env.VITE_API_URL

to support this separation.

Case-sensitive imports

Vercel builds on a Linux environment, where filenames are
case-sensitive.

For example:

wishlistAPI.js

must be imported using matching capitalization:

import ... from "../Pages/Wishlist/wishlistAPI";

rather than:

import ... from "../Pages/Wishlist/wishlistApi";

This may work on a case-insensitive local Windows filesystem but fail
during production builds.

Environment variables

Never commit:

.env
.env.local
.env.production

The deployment platforms should receive production environment variables
through their environment-variable configuration.

Future Improvements

The current project is functional, but several production-level
improvements could be added.

Inventory management

The order flow currently validates stock but does not decrement
inventory.

Future implementation:

Order Created
      ↓
Reduce Product Stock
      ↓
Save Order

This should ideally be handled using safe database
operations/transactions to avoid race conditions.

Order status

Add fields such as:

pending
confirmed
processing
shipped
delivered
cancelled

Payment integration

Add a real payment provider such as Stripe or Razorpay.

Admin dashboard

Create protected admin functionality for:

Adding products

Editing products

Deleting products

Managing stock

Viewing orders

Updating order status

Managing users

Product filtering

Improve product discovery with:

Price range

Category

Rating

Availability

Sorting

Pagination

Add server-side pagination for larger product collections.

Search

Move from client-side search toward backend search for larger datasets.

Validation

Add stronger request validation using a schema validation library.

Error handling

Create centralized Express error-handling middleware.

API documentation

Add Swagger/OpenAPI documentation.

Automated testing

Expand backend and frontend tests to cover:

Authentication

Product APIs

Cart APIs

Wishlist APIs

Order APIs

Protected routes

Error cases

Performance

Potential improvements include:

API response caching

Image optimization

Lazy loading

Pagination

Database indexes

Code splitting

Learning Outcomes

This project demonstrates practical experience with:

React component development

Vite-based frontend development

Responsive UI development

Tailwind CSS

React Router

Redux Toolkit

RTK Query

Axios

REST API development

Node.js

Express.js

MongoDB

Mongoose

JWT authentication

Password hashing

Middleware

Protected routes

CRUD operations

Cart management

Wishlist management

Order management

Environment variables

CORS

Git and GitHub

Vercel deployment

Render deployment

Production frontend/backend communication

Basic automated testing

Git Workflow

The project uses Git for source control.

Typical workflow:

git status

git add .

git commit -m "Describe your changes"

git push

The main branch is connected to the production GitHub repository.

Production Repository

GitHub:

https://github.com/DeepakChauhan33/Storefront-Commerce

Backend:

https://storefront-commerce.onrender.com

Products API:

https://storefront-commerce.onrender.com/product/products

Author

Deepak Chauhan

Full Stack / MERN Developer

Technologies

React
Vite
Tailwind CSS
Redux Toolkit
RTK Query
Node.js
Express.js
MongoDB
Mongoose
JWT
Git
GitHub

Project Summary

Storefront-Commerce is a full-stack e-commerce application that
demonstrates how a React frontend can communicate with a custom
Express/MongoDB backend in a production deployment.

The project covers the complete basic shopping lifecycle:

Authentication
      ↓
Product Discovery
      ↓
Product Details
      ↓
Cart
      ↓
Wishlist
      ↓
Checkout
      ↓
Order History

The application is maintained as a monorepo-style GitHub repository
while the frontend and backend are deployed independently, providing a
practical structure for full-stack development and deployment.