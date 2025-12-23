import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import Loader from "./Loader";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("zia@gmail.com");
  const [password, setPassword] = useState("Zia@123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // to store the token in browser's cookie
        }
      );
      dispatch(addUser(user.data.data));
      return navigate("/feed");
    } catch (err) {
      setError(err.response.data.error || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const user = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      console.log("userrrr", user);
      dispatch(addUser(user.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err.response.data || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl font-bold">
            {!isLoggedIn ? "Create an account" : "Welcome Back"}
          </h2>
          {!isLoggedIn && (
            <>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend my-1">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend my-1">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
          <div className="">
            <fieldset className="fieldset">
              <legend className="fieldset-legend my-1">Email</legend>
              <input
                type="text"
                className="input"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="">
            <fieldset className="fieldset">
              <legend className="fieldset-legend my-1">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={isLoggedIn ? handleLogin : handleSignUp}
            >
              {!isLoggedIn ? "Sign Up" : "Login"}
            </button>
          </div>
          <p
            className="cursor-pointer btn btn-link"
            onClick={() => {
              setIsLoggedIn(!isLoggedIn);
            }}
          >
            {isLoggedIn
              ? "New User? Create an account"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
