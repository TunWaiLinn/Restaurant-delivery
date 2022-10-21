import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { fetchCart } from "../utils/fetchLocalStorageData";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [{ cartItems }, dispatch] = useStateValue();

  const [items, setItems] = useState(fetchCart());

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });

    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items, dispatch]);

  const add = (item) => {
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    const existingCartItem = cartItems[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      existingCartItem.qty += 1;
      updatedItems = [...cartItems];
      updatedItems[existingCartItemIndex] = existingCartItem;
    } else {
      updatedItems = cartItems.concat(item);
    }

    setItems(updatedItems);
  };

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center scroll-smooth gap-3 my-12 ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-auto min-w-[275px] md:min-w-[300px] md:w-300 bg-cardOverlay
             rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL}
                alt=""
                className="w-28 h-28 md:w-36 md:h-36 object-contain -mt-8 drop-shadow-2xl"
              />

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-lg"
                onClick={() => add(item)}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>

              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="" className="h-420"></img>
          <p className="text-xl text-headingColor font-semibold my-4">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
