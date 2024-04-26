# Set Up Instructions:

### install dependencies:

    "axios": "^1.6.8",
    "js-cookie": "^3.0.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.1.0",
    "react-loader-spinner": "^6.1.6",

### Set Up Instructions:

    run "npm start" to run the project

# Functionality and Routes:

### Home Route:

    user can select the role which he was wanted to signup either "seller" or "buyer"

### Buyer Begistration Route:

    user can register by giving some data "name, gmail, password, confirm password" as buyer if he is new customer

### Buyer Login Route:

    after successfully registered user can log in to his account as buyer by using his credentials "gmail, password"
    after logging in successfully buyer have only access to the buyer routes and he do not have access to the seller routes if he login as buyer

### Buyer Portal Route:

    after logged in successfully buyer can see his portal where he can see the products if he is a 'PRIME' user he can see both prime deals and non prime deals, if he is a 'NON PRIME' user he can only see the non prime deals and he can add any products available in his portal and he can log out by clicking log out button in the nav bar which takes to the home route to select the roles

### Buyer Cart Route:

    buyer can see his products which he added to his cart and he can remove the product from cart if he wants to.

### Seller Begistration Route:

    user can register by giving some data "name, gmail, password, confirm password" as Seller if he is new Seller

### Seller Login Route:

    after successfully registered user can log in to his account as seller by using his credentials "gmail, password"
    after logging in successfully seller have only access to the seller portal and he do not have access to the buyer routes he can log out by clicking log out button in the nav bar which takes to the home route to select the roles

### Seller Portal Route:

    after logged in successfully seller he has access only to his products which he added to sell in his portal and he can delete his products from database by clicking delete product button

### Seller Add Product Route:

    Seller can add his products to sell by clicking add product button in the seller portal and giving some info like "title, price, actual price, user("prime or non prime"), image" after successfully giving the data the product will added to his portal and buyers can see his products

# Login Credentials For Prime User:
{
    "mail" : "ganeshkadali0@gmail.com",
    password: "gani7337"
}
