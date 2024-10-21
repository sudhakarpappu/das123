import React, { useEffect, useState } from "react";
import Header from "../header/header";
import "../cart/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import {
  addTocart,
  clearCartItem,
  decreaseCart,
  getTotals,
  removeCartItem,
} from "./cartslice";
import axios from "axios"; // Import Axios

function Cart() {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState(null); // State for order data

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  // Effect to handle order submission
  useEffect(() => {
    if (orderData) {
      axios
        .post("http://localhost:8000/submitdata", orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Your order has been placed successfully!!");
            dispatch(clearCartItem()); // Clear cart after successful order
          } else {
            alert("Failed to place order: " + response.data.message);
          }
        })
        .catch((error) => {
          console.error(
            "Error placing order:",
            error.response ? error.response.data : error
          );
          alert("Error placing the order.");
        });
    }
  }, [orderData, dispatch]); // Dependency on orderData

  const handleOrder = () => {
    const customerName = localStorage.getItem(
      "CognitoIdentityServiceProvider.5i8900dta48q73gns6006v3u1c.LastAuthUser"
    );

    if (customerName) {
      // Prepare the order data
      const orderData = {
        customerName,
        cartItems: cart.cartItems.map((item) => ({
          foodID: Math.floor(item.id), // Ensure this matches the backend
          food_name: item.title, // Ensure this matches the backend
          quantity: item.cartQuantity,
          price: parseFloat(item.rate).toFixed(2),
        })),
        totalAmount: cart.cartItems
          .reduce((total, item) => total + item.cartQuantity * item.rate, 0)
          .toFixed(2), // Calculate and fix to two decimal places
      };
      console.log(orderData);

      console.log(
        "foodID type: " +
          typeof orderData.cartItems[0].foodID +
          ", food_name type: " +
          typeof orderData.cartItems[0].food_name +
          ", price type: " +
          typeof orderData.cartItems[0].price +
          ", total amount type: " +
          typeof orderData.totalAmount
      );

      setOrderData(orderData); // This will trigger the effect to submit the order
    } else {
      alert("Customer name not found!");
    }
  };

  return (
    <div className="cart-bg">
      <Header />
      <div className="cart">
        <h1 style={{ padding: "10px" }}>Shopping cart</h1>
        {cart.cartItems.length === 0 ? (
          <div style={{ marginBottom: "165px", padding: "10px" }}>
            <p>Your cart is currently empty</p>
          </div>
        ) : (
          <div className="cart-main">
            <div className="cart-main-head">
              <h3 className="cart-main-head-h3">Product</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total</h3>
            </div>

            {cart.cartItems?.map((cartItems) => (
              <div key={cartItems.id} className="cart-main-body">
                <div className="cart-main-body-div">
                  <img
                    src={cartItems.url}
                    alt={cartItems.title}
                    onClick={() =>
                      history.push(`/singledish?id=${cartItems.id}`)
                    }
                  />
                  <div style={{ paddingLeft: "5px" }}>
                    <h3>{cartItems.title}</h3>
                    <button onClick={() => dispatch(removeCartItem(cartItems))}>
                      Delete
                    </button>
                  </div>
                </div>

                <div className="cart-main-body-div2">
                  <h5>₹{cartItems.rate}</h5>
                </div>

                <div className="quantity">
                  <button onClick={() => dispatch(decreaseCart(cartItems))}>
                    -
                  </button>
                  <span>{cartItems.cartQuantity}</span>
                  <button onClick={() => dispatch(addTocart(cartItems))}>
                    +
                  </button>
                </div>

                <div className="cart-main-body-div2">
                  <div style={{ color: "green", fontSize: "23px" }}>
                    ₹{cartItems.cartQuantity * cartItems.rate}
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "1100px",
                marginLeft: "10px",
              }}
            >
              <div>
                <button
                  className="clearCart-button"
                  onClick={() => dispatch(clearCartItem())}
                >
                  Clear cart
                </button>
              </div>
              <div>
                <p>
                  Subtotal{" "}
                  <span style={{ fontSize: "12px" }}>
                    *including all taxes*
                  </span>
                  :{" "}
                  <b>
                    <span style={{ fontSize: "23px" }}>
                      ₹{cart.totalAmount}/-
                    </span>
                  </b>
                </p>

                <button className="Order-button" onClick={handleOrder}>
                  Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
