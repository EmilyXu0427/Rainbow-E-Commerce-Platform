
# Rainbow E-Commerce Platform

## Overview

Rainbow E-Commerce Platform is a responsive online shopping website tailored for women to explore and purchase skincare, clothes, and books. The website is built with MangoDB, Express.js, React and Redux, Node.js. 

## Key Features

- **Home Page**
  - A navigation bar that links to different pages.
  - A "Rainbow" button on the home page changes the background color to a randomly selected rainbow-themed color.
  - Display 3 best-seller products
- **Category Page**
  - Displays products filtered by category.
  - Each product includes a "Show Details" button linking to the product detail page.
- **Product Details Page**
  - Shows product image, name, description, price, and other attributes.
  - Includes an "Add to Cart" button to add product to shopping cart and direct user to shopping cart.
- **Search**:
  - Supports keyword search on product name, description, category and variant.
- **Shopping Cart Page**
  - Displays all added items.
  - Users can:
    - Adjust item quantity using "+" or "−" buttons.
    - Enter quantity directly into an input box.
    - Remove individual items from the cart.
  - Total price of all added items is calculated and displayed on the bottom of shopping cart page
- **Checkout Page**:
  - Website prompts to ask user enter their name when checkout shopping cart
  - Captures customer name to the order
  - Converts cart to order and returns unique order number
- **Admin Page**:
  - View all active shopping carts and their items
  - View list of completed orders with order details
  - Product management by creating a new product/deleting an existing product

#### MongoDB Data Models
- Cart
- Category
- CategoryProduct
- Order
- Product
- ProductAttribute
- ProductAttributePrice

## Instruction for run the app with Docker

Clone the repository. After downloading the app, ensure you are under **my-app** folder to run the following command to start the app with Docker:

```bash
docker-compose up --build  # start container
docker-compose down        # tear down container
```

