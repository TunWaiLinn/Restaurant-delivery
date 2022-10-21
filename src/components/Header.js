import React, { useState } from "react";
import Logo from "../img/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "../img/avatar.png";
import { animate, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  //handle SignIn
  const login = () => {
    if (!user) {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          // const user = result.user;
          // ...
        })
        .catch((error) => {
          // alert(error.message);
          // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // The email of the user's account used.
          // const email = error.customData.email;
          // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } else {
      setIsMenu(!isMenu);
    }
  };

  //Handle Sign Out
  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsMenu(false);
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  const showCart = () => {
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
  };

  const findLen = () => {
    let l = 0;
    cartItems.forEach((item) => {
      l += item.qty;
    });
    return l;
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop and tablets */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                <p className="text-xs text-white font-semibold">{findLen()}</p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="userprofile"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {user && user.email === "tun111278@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all 
                duration-100 ease-in-out text-textColor text-base"
                      onClick={() => {
                        setIsMenu(false);
                      }}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  onClick={handleSignOut}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all
               duration-100 ease-in-out text-textColor text-base"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden flex items-center justify-between w-full h-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
              <p className="text-xs text-white font-semibold">{findLen()}</p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="userprofile"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {user && user.email === "tun111278@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all 
                duration-100 ease-in-out text-textColor text-base"
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li
                  onClick={() => {
                    setIsMenu(false);
                  }}
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2  hover:bg-slate-100"
                >
                  Home
                </li>
                <li
                  onClick={() => {
                    setIsMenu(false);
                  }}
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2  hover:bg-slate-100"
                >
                  Menu
                </li>
                <li
                  onClick={() => {
                    setIsMenu(false);
                  }}
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2  hover:bg-slate-100"
                >
                  About Us
                </li>
                <li
                  onClick={() => {
                    setIsMenu(false);
                  }}
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2  hover:bg-slate-100"
                >
                  Service
                </li>
              </ul>

              <p
                onClick={handleSignOut}
                className="m-2 p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer hover:bg-gray-300 transition-all
               duration-100 ease-in-out text-textColor text-base justify-center bg-gray-200"
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
