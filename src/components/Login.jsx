import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("asma@gmail.com");
  const [password, setPassword] = useState("Asma@123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
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
      navigate("/feed");
    } catch (err) {
      console.log(err);
      setError(err.response.data.error || "Something went wrong!");
    }
  };
  return (
    <div className="flex justify-center my-5">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl">Login</h2>
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
                type="text"
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
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
