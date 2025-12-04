import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.data);

  const fetchLoggedInUser = async () => {
    if (!userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (error) {
      if (error.status === 401) navigate("/login");
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <Navbar />
      {/* <div class="flex justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/login")}
        >
          Login to Continue
        </button>
      </div> */}
      <Outlet />{" "}
      {/*  Outlet replace the children components inside Body component */}
      <Footer />
    </div>
  );
};

export default Body;
