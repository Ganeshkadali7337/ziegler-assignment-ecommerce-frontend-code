import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyerLogin from "./BuyerLogin";
import SellerLogin from "./SellerLogin";
import SellerRegistration from "./SellerRegistration";
import BuyerRegistration from "./BuyerRegistration";
import ProtectedRoute from "./ProtectedRoute";
import AuthenticatedUser from "./AuthenticatedUser";
import BuyerPortal from "./BuyerPortal";
import SellerPortal from "./SellerPortal";
import Cart from "./Cart";
import Home from "./Home";
import AddProduct from "./AddProduct";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AuthenticatedUser>
              <Home />
            </AuthenticatedUser>
          }
        />
        <Route
          exact
          path="/buyer/login"
          element={
            <AuthenticatedUser user="buyer">
              <BuyerLogin />
            </AuthenticatedUser>
          }
        />
        <Route
          exact
          path="/seller/login"
          element={
            <AuthenticatedUser user="seller">
              <SellerLogin />
            </AuthenticatedUser>
          }
        />
        <Route
          exact
          path="/buyer/registration"
          element={
            <AuthenticatedUser user="buyer">
              <BuyerRegistration />
            </AuthenticatedUser>
          }
        />
        <Route
          exact
          path="/seller/registration"
          element={
            <AuthenticatedUser user="seller">
              <SellerRegistration />
            </AuthenticatedUser>
          }
        />
        <Route
          exact
          path="/buyer/portal"
          element={
            <ProtectedRoute user="buyer">
              <BuyerPortal />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/seller/portal"
          element={
            <ProtectedRoute user="seller">
              <SellerPortal />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/seller/addProduct"
          element={
            <ProtectedRoute user="seller">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/buyer/cart"
          element={
            <ProtectedRoute user="buyer">
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
