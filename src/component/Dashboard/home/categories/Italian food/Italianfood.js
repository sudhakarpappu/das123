import React, { useEffect, useState } from "react"; // Import useEffect and useState
import "../categories.css";
import Food from "../../../../foodimage"; // Ensure this is correctly exported
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTocart } from "../../../cart/cartslice";
import "../../../header/header.css";
import axios from "axios"; // Import axios
import { getImageUrl } from "../../../../foodimage";

function Italianfood() {
  const dispatch = useDispatch();
  const [foods, setFoods] = useState([]); // Initialize state to store food items
  let Food2 = Food.filter((ele) => ele.titlename === "ItalianFood"); // Check if Food is an array or object
  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/getItalianFood")
      .then((response) => {
        const items = response.data.Items || [];
        if (Array.isArray(items)) {
          const formattedFoods = items.map((item) => ({
            foodID: item.foodID,
            food_name: item.food_name,
            quantity: item.quantity,
            price: item.price,
            url: getImageUrl(item.foodID), // Dynamically fetch image URL using foodID
            titleId: item.titleId,
          }));

          setFoods(formattedFoods);
        } else {
          console.error("No food items found.");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the food items!", error);
      });
  }, []);

  function AddtoCart(ele) {
    const item = {
      id: ele.foodID, // Passing foodID
      name: ele.food_name, // Passing food name
      quantity: ele.quantity,
      price: ele.price,
    };

    console.log("Adding to cart:", item); // Check the object passed to AddtoCart
    dispatch(addTocart(item)); // Dispatch action with the full item object
  }

  function prevImage() {
    let box = document.querySelector(".itali-card-image");
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
  }

  function nextImage() {
    let box = document.querySelector(".itali-card-image");
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
  }

  function detail(id) {
    history.push(`/singledish?id=${id}`);
  }

  function Alldish(titleId) {
    if (titleId) {
      history.push(`/alldish?id=${titleId}`);
    }
  }

  function order() {
    history.push("/cart");
  }

  const filteredFoods = foods.filter((food) => food.titleId === 2);

  return (
    <div className="indi-css">
      <h3>Italian Food</h3>

      <div className="main-image">
        <button className="leftImageArrowStyles" onClick={() => prevImage()}>
          {" "}
          ❰❰
        </button>
        <button className="rightImageArrowStyles" onClick={() => nextImage()}>
          {" "}
          ❱❱
        </button>
        <div className="itali-card-image">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((ele) => (
              <div key={ele.foodID} className="Perslide">
                <img
                  src={ele.url} // Use the image URL fetched from food.js
                  alt={ele.food_name}
                  onClick={() => detail(ele.foodID)}
                />
                <p>
                  {ele.food_name} [{ele.quantity}]
                </p>
                <span style={{ display: "block" }}>₹{ele.price}</span>
                <button className="slide-cart-button" onClick={order}>
                  Order
                </button>
                <button
                  className="slide-cart-button"
                  onClick={() => AddtoCart(ele)}
                >
                  +Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No Italian Food available</p>
          )}
          {Food2.length > 0 && (
            <button onClick={() => Alldish(Food2[0]?.titleId)} className="imsa">
              See more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Italianfood;
