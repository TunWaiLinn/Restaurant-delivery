import { Header, MainContainer, CreateContainer } from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase.config";
import { useEffect, useState } from "react";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { getAllFoodItems } from "./utils/firebaseFunctions";

function App() {
  const [{ user, foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      
      dispatch({ type: "SET_FOOD_ITEMS", foodItems: data });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (returnedUser) => {
      if (returnedUser) {
        dispatch({ type: actionType.SET_USER, user: returnedUser });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
      } else {
        // User is signed out
        // ...
        dispatch({ type: actionType.SET_USER, user: null });
      }
    });
  }, [dispatch]);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4  w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
