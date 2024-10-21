import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Imageslide from "./Imageslides";
import Header from "../header/header";
import "../header/header.css";
import Indianfood from "./categories/Indianfood/Indianfood";
import Footer from "../footer/footer";
import Italianfood from "./categories/Italian food/Italianfood";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../cart/cartslice";
import Categories from "./categories/categories";
import Koreanfood from "./categories/korean food/Koreanfood";

// Import images
import slide1 from "../image/slide1.jpg";
import slide2 from "../image/slide2.jpg";
import slide3 from "../image/slide3.jpg";

function Home() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch]); // Removed `cart` from dependency to prevent infinite loop

  const slides = [
    { url: slide1, title: "slide1" },
    { url: slide2, title: "slide2" },
    { url: slide3, title: "slide3" },
  ];

  return (
    <div className="home">
      <Header />
      <div className="bg">
        <div className="main-slice">
          <Imageslide slides={slides} />
        </div>
      </div>
      <Categories />
      <div className="categories">
        <Indianfood />
        <Italianfood />
        <Koreanfood />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
