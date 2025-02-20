# book-store-server

# Book Shop

### **Description:**

This is an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Book Store. This application Ensures data integrity using Mongoose schema validation.

---

### **Project Overview:**

- Created with Express and TypeScript.
- Uses MongoDB database to store **Products** (books) and **Orders**.
- Uses Mongoose for schema definition and data operations.
- Implemented CRUD operations for both books and orders.

---

### **Used Packages:**

- Express (for creating server)
- Typescript (for type checking)
- Mongoose (for MongoDB operations and validations)
- Cors (for enabling CORS)
- Dotenv (for environment variables)
- zod (for schema validation)
- Eslint (for code linting and bug fixing)

---

### **Models:**

1. **Product Model (Book)**
   - **title** (string): The title of the book.
   - **author** (string): The author of the book.
   - **price** (number): Price of the book.
   - **category** (string): The genre or category of the book (e.g., Fiction, Science). use `enum`, exact value (Fiction, Science, SelfDevelopment, Poetry, Religious)
   - **description** (string): A brief description of the book.
   - **quantity** (number): Quantity of the book available.
   - **inStock** (boolean): Indicates if the book is in stock.
2. **Order Model**
   - **email** (string): The email address of the customer.
   - **product** (ObjectId): The book ordered. (`unused ref` )(enter the created productId from your database which product you would love to buy)
   - **quantity** (number): The quantity of the ordered book.
   - **totalPrice** (number): The total price (product price \* quantity).

---

###

---

### **1. Create a Book**

- **FULL URL:** **`https://book-store-omega-wine.vercel.app/api/products/`**
- **Endpoint:** **`/api/products`**
- **Method:** `POST`
- **Request Body:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 10,
  "category": "Fiction",
  "description": "A story about the American dream.",
  "quantity": 100,
  "inStock": true
}
```

- **Response:** Success message and created book details.

```jsx
{
  "message": "Book created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z",
  }
}
```

---

### **2. Get All Books**

- **FULL URL:** **`https://book-store-omega-wine.vercel.app/api/products/`**
- **Endpoint:** **`/api/products`**
- **Method:** `GET`
- **Response:** A list of all books with details like name, author, price, category, etc.

- Query: A list of all books from the same category, you’ll take this as `/api/products?searchTerm=category` searchTerm can be `title, author, category`

```jsx
{
  "message": "Books retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": 10,
      "category": "Fiction",
      "description": "A story about the American dream.",
      "quantity": 100,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z",
    },
    // ... rest data
  ]
}
```

---

### **3. Get a Specific Book**

- **FULL URL:** **`https://book-store-omega-wine.vercel.app/api/products/:productId`**
- **Endpoint:** **`/api/products/:productId`**
- **Method:** `GET`
- **Response:** The details of a specific book by ID.

```jsx
{
  "message": "Book retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z",
  }
}
```

---

### **4. Update a Book**

- **FULL URL:** **`https://book-store-omega-wine.vercel.app/api/products/:productId`**
- **Endpoint:** **`/api/products/:productId`**
- **Method:** `PUT`
- **Request Body:** (Book details to update)

```json
{
  "price": 15,
  "quantity": 25
}
```

- **Response:** Success message and updated book details.

```jsx
{
  "message": "Book updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 15,  // Price updated
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 25,  // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z",  // Updated timestamp
  }
}
```

---

### **5. Delete a Book**

- **FULL URL:** **`https://book-store-omega-wine.vercel.app/api/products/:productId`**
- **Endpoint:** **`/api/products/:productId`**
- **Method:** `DELETE`
- **Response:** Success message confirming the book has been deleted.

```jsx
{
  "message": "Book deleted successfully",
  "status": true,
  "data": {}
}
```

---

### **6. Order a Book**

- **FULL URL:** **`https://book-store-omega-wine.vercel.app/api/orders/`**
- **Endpoint:** **`/api/orders`**
- **Method:** `POST`

- **Request Body:**

```json
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 30
}
```

- **Response:** Success message confirming the order.

```jsx
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 30,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z",
  }
}
```

---

### **7. Calculate Revenue from Orders (Aggregation)**

- **FULL URL:** **`https://book-store-omega-wine.vercel.app/api/orders/revenue`**
- **Endpoint:** **`/api/orders/revenue`**
- **Method:** `GET`-
- **Response:** The total revenue from all orders.

```jsx
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 450  // Total revenue calculated from all orders
  }
}
```
