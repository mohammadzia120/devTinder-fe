import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Loader from "./Loader";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.data);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLoggedInUser = async () => {
    if (!userData) return;
    setIsLoading(true);
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (error) {
      if (error.status === 401) navigate("/login");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <div>
      <Navbar />
      <Outlet />{" "}
      {/*  Outlet replace the children components inside Body component */}
      <Footer />
    </div>
  );
};

export default Body;
