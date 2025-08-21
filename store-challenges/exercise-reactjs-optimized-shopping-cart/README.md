# React Coding Exercise: The Optimized Shopping Cart

## The Goal

You will build a simple e-commerce interface. The primary challenge is not the UI itself, but how you efficiently manage the state of the shopping cart for quick additions and lookups, and how you apply discounts from a predefined set of coupon codes.

## The Data Structure Challenge

This exercise is designed to test your ability to choose and use the right data structures for the job. You will primarily use an **Array** to display data and a **Hash Map (JavaScript Object)** for efficient cart management and coupon lookups.

---

## API & Data

### Online API: DummyJSON (Product List)

*   **API Documentation:** [https://dummyjson.com/docs/products](https://dummyjson.com/docs/products)
*   **Endpoint:** `https://dummyjson.com/products?limit=10`
*   **Example Response Snippet:**
    ```json
    {
      "products": [
        {
          "id": 1,
          "title": "iPhone 9",
          "price": 549,
          "images": ["..."]
        }
      ],
      "total": 100, "skip": 0, "limit": 10
    }
    ```

---

## Core Requirements

### 1. Data Fetching & Display
*   On component mount, fetch the list of 10 products from the DummyJSON API.
*   Display these products in a simple list (`ProductList` component). Each item should show the product's `title`, `price`, and an "Add to Cart" button.

### 2. Cart State Management with `useReducer`
*   You **must** use a single `useReducer` hook to manage all cart-related state.
*   Your reducer's state object **must** track:
    *   `cartItems`: This **must be a Hash Map (a JavaScript object)** where the *keys* are the product IDs and the *values* are objects containing the product details and the current `quantity`.
    *   `totalPrice`: The calculated total price of all items in the cart.
    *   `appliedCoupon`: The details of any successfully applied coupon, or `null`.

### 3. Efficient Cart Logic (The Hash Map Challenge)
*   When a user clicks "Add to Cart" for a product, you must dispatch an `ADD_ITEM` action.
*   Inside your reducer, for the `ADD_ITEM` action:
    *   You must perform an **O(1) lookup** in your `cartItems` hash map to check if the product ID already exists as a key.
    *   If it exists, you must **increment the quantity** of the existing entry.
    *   If it does not exist, you must **add a new entry** to the hash map.
    *   After modifying the `cartItems` map, you must recalculate the `totalPrice`.

### 4. Coupon System (The Second Hash Map)
*   You are given a predefined hash map of coupon codes. You should hardcode this in your component.
    ```javascript
    const COUPON_CODES = {
      SAVE10: { type: 'percentage', value: 10 }, // 10% off
      GIVEME5: { type: 'fixed', value: 5 },      // $5 off
    };
    ```
*   In your UI, provide a text input for a coupon code and an "Apply Coupon" button.
*   When the user clicks "Apply," dispatch an `APPLY_COUPON` action with the code.
*   Inside the reducer, perform an **O(1) lookup** in the `COUPON_CODES` hash map.
*   If the code is valid, update the `appliedCoupon` state and recalculate the `totalPrice` with the discount. If invalid, you can simply ignore it or handle it in the UI.

### 5. Component Structure
*   `ProductList.tsx`: A simple component that receives the array of products and a function to add an item to the cart.
*   `CartDisplay.tsx`: A component that displays the items in the cart (by converting your `cartItems` hash map to an array for rendering), the subtotal, the applied coupon discount, and the final total.

---

## What We're Looking For

*   **Correct Data Structure Choice:** A clear demonstration that you understand *why* a hash map is superior to an array for managing the cart items' state (i.e., avoiding slow `.find()` or `.map()` operations on every addition).
*   **`useReducer` Logic:** A clean reducer that handles the state transitions immutably and correctly performs the cart and coupon logic.
*   **Immutability:** When updating the `cartItems` hash map in your reducer, you **must** create a new object, not mutate the existing one.
*   **Data Transformation:** Your ability to take the `cartItems` hash map and convert it into an array for easy rendering in your `CartDisplay` component (e.g., using `Object.values()`).